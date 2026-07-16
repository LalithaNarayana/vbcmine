"use client";

import { useEffect, useMemo, useState } from "react";
import { IndianRupee, Clock, XCircle } from "lucide-react";

interface PaymentUser {
  name: string;
  mobile: string;
  accountId: string | null;
}

interface PaymentPlan {
  name: string;
  speed: number;
  speedUnit: string;
}

interface PaymentRow {
  _id: string;
  user: PaymentUser | null;
  plan: PaymentPlan | null;
  purpose: string;
  totalAmount: number;
  status: "created" | "success" | "failed";
  provider: string;
  createdAt: string;
}

interface Totals {
  collectedThisMonth: number;
  pendingAmount: number;
  pendingCount: number;
  failedAmount: number;
  failedCount: number;
}

const STATUS_OPTIONS = ["all", "success", "created", "failed"] as const;

function statusStyle(status: string): React.CSSProperties {
  if (status === "success") return { background: "#ecfdf3", color: "#067647" };
  if (status === "failed") return { background: "#fef3f2", color: "#b42318" };
  return { background: "#fff4e5", color: "#b54708" };
}

function statusLabel(status: string): string {
  if (status === "success") return "Success";
  if (status === "failed") return "Failed";
  return "Pending";
}

function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function AdminPaymentsPage() {
  const [items, setItems] = useState<PaymentRow[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/payments");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotals(data.totals);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      const created = new Date(p.createdAt);
      if (fromDate && created < new Date(fromDate)) return false;
      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        if (created > to) return false;
      }
      return true;
    });
  }, [items, statusFilter, fromDate, toDate]);

  const STAT_CARDS = totals
    ? [
        {
          label: "Collected This Month",
          value: `₹${totals.collectedThisMonth.toLocaleString("en-IN")}`,
          icon: IndianRupee,
          tone: "#067647",
        },
        {
          label: "Pending",
          value: `₹${totals.pendingAmount.toLocaleString("en-IN")} (${totals.pendingCount})`,
          icon: Clock,
          tone: "#b54708",
        },
        {
          label: "Failed",
          value: `₹${totals.failedAmount.toLocaleString("en-IN")} (${totals.failedCount})`,
          icon: XCircle,
          tone: "#b42318",
        },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Payments</h1>
        <p className="admin-page-subtitle">
          Every transaction across all users. Filter by status or date range.
        </p>
      </div>

      {totals && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {STAT_CARDS.map((s) => (
            <div key={s.label} className="admin-card p-5">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.tone}14`, color: s.tone }}
              >
                <s.icon size={18} />
              </span>
              <div className="mt-4 text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={statusFilter === s ? "admin-btn-primary" : "admin-btn-secondary"}
              style={{ padding: "6px 16px", fontSize: "13px", textTransform: "capitalize" }}
            >
              {s === "created" ? "Pending" : s}
            </button>
          ))}
        </div>
        <div>
          <label className="admin-label" style={{ display: "block", marginBottom: "4px" }}>From</label>
          <input type="date" className="admin-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ minWidth: "160px" }} />
        </div>
        <div>
          <label className="admin-label" style={{ display: "block", marginBottom: "4px" }}>To</label>
          <input type="date" className="admin-input" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ minWidth: "160px" }} />
        </div>
        {(fromDate || toDate) && (
          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
            className="admin-btn-secondary"
            style={{ padding: "6px 16px", fontSize: "13px" }}
          >
            Clear Dates
          </button>
        )}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Transactions {!loading && `(${filtered.length})`}</h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="admin-page-subtitle">No transactions match this filter.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">User</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Purpose</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const d = formatDate(p.createdAt);
                  return (
                    <tr key={p._id} className="border-t border-gray-100">
                      <td className="px-3 py-3" style={{ minWidth: "160px" }}>
                        <div className="font-medium text-gray-900">{p.user?.name || "—"}</div>
                        <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}>
                          {p.user?.mobile}
                          {p.user?.accountId ? ` · ${p.user.accountId}` : ""}
                        </div>
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "140px" }}>
                        {p.plan ? `${p.plan.name} (${p.plan.speed} ${p.plan.speedUnit})` : "—"}
                      </td>
                      <td className="px-3 py-3" style={{ textTransform: "capitalize" }}>
                        {p.purpose.replace("-", " ")}
                      </td>
                      <td className="px-3 py-3" style={{ fontWeight: 600 }}>₹{p.totalAmount}</td>
                      <td className="px-3 py-3">
                        <span
                          style={{
                            borderRadius: "999px",
                            padding: "3px 10px",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            ...statusStyle(p.status),
                          }}
                        >
                          {statusLabel(p.status)}
                        </span>
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        <div style={{ color: "#344054", fontWeight: 500 }}>{d.date}</div>
                        <div style={{ fontSize: "12px", color: "#98a2b3" }}>{d.time}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
