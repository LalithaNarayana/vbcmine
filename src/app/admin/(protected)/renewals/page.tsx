"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, RefreshCw } from "lucide-react";

interface RenewalRow {
  userId: string;
  name: string;
  mobile: string;
  accountId: string;
  plan: { name: string; speed: number; speedUnit: string; price: number };
  expiresAt: string;
  daysLeft: number;
}

type FilterTab = "all" | "expiring" | "overdue";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function daysLeftStyle(daysLeft: number): React.CSSProperties {
  if (daysLeft < 0) return { background: "#fef3f2", color: "#b42318" };
  if (daysLeft <= 5) return { background: "#fff4e5", color: "#b54708" };
  return { background: "#ecfdf3", color: "#067647" };
}

function daysLeftLabel(daysLeft: number): string {
  if (daysLeft < 0) return `Overdue by ${Math.abs(daysLeft)}d`;
  if (daysLeft === 0) return "Expires today";
  return `${daysLeft}d left`;
}

export default function AdminRenewalsPage() {
  const [items, setItems] = useState<RenewalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FilterTab>("all");
  const [renewing, setRenewing] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/renewals");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (tab === "expiring") return items.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 5);
    if (tab === "overdue") return items.filter((i) => i.daysLeft < 0);
    return items;
  }, [items, tab]);

  const counts = useMemo(
    () => ({
      all: items.length,
      expiring: items.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 5).length,
      overdue: items.filter((i) => i.daysLeft < 0).length,
    }),
    [items]
  );

  async function handleMarkRenewed(userId: string) {
    setRenewing(userId);
    try {
      const res = await fetch(`/api/admin/renewals/${userId}/mark-renewed`, { method: "POST" });
      if (res.ok) {
        await load();
      }
    } finally {
      setRenewing(null);
    }
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "expiring", label: `Expiring Soon (${counts.expiring})` },
    { key: "overdue", label: `Overdue (${counts.overdue})` },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Renewals</h1>
        <p className="admin-page-subtitle">
          All active customers sorted by days left to expiry. Mark a user as renewed if the
          payment was handled outside the normal flow.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={t.key === tab ? "admin-btn-primary" : "admin-btn-secondary"}
            style={{ padding: "6px 16px", fontSize: "13px" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            Customers {!loading && `(${filtered.length})`}
          </h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="admin-page-subtitle">No customers in this filter.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Expires On</th>
                  <th className="px-3 py-2">Days Left</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.userId} className="border-t border-gray-100">
                    <td className="px-3 py-3" style={{ minWidth: "180px" }}>
                      <div className="font-medium text-gray-900">{row.name}</div>
                      <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}>
                        {row.mobile} · {row.accountId}
                      </div>
                    </td>
                    <td className="px-3 py-3" style={{ minWidth: "160px" }}>
                      {row.plan.name} ({row.plan.speed} {row.plan.speedUnit}) — ₹{row.plan.price}/mo
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap", color: "#344054" }}>
                      {formatDate(row.expiresAt)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        style={{
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.3px",
                          whiteSpace: "nowrap",
                          ...daysLeftStyle(row.daysLeft),
                        }}
                      >
                        {daysLeftLabel(row.daysLeft)}
                      </span>
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleMarkRenewed(row.userId)}
                        disabled={renewing === row.userId}
                        className="admin-btn-secondary"
                        style={{ padding: "5px 14px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        {renewing === row.userId ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                        Mark Renewed
                      </button>
                      <Link
                        href={`/admin/users/${row.userId}`}
                        className="admin-btn-secondary"
                        style={{ padding: "5px 14px", fontSize: "13px" }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
