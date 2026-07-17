"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import { Wifi, WifiOff, Power, Loader2 } from "lucide-react";

interface SalesPlan {
  _id: string;
  name: string;
  speed: number;
  speedUnit: string;
}

interface SalesPayment {
  _id: string;
  totalAmount: number;
  status: "created" | "success" | "failed";
}

interface SalesRequest {
  _id: string;
  name: string;
  mobile: string;
  city: string;
  address: string;
  landmark: string;
  plan: SalesPlan | null;
  status: "pending" | "payment_pending" | "payment_done" | "assigned" | "not_serviceable";
  payment: SalesPayment | null;
  accountId: string | null;
  createdAt: string;
}

function formatRequestedOn(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

const STATUS_STYLES: Record<SalesRequest["status"], { label: string; bg: string; color: string }> = {
  pending: { label: "Pending Review", bg: "#fff4e5", color: "#b54708" },
  payment_pending: { label: "Payment Sent", bg: "#eff8ff", color: "#175cd3" },
  payment_done: { label: "Paid — Ready to Assign", bg: "#f4f3ff", color: "#5925dc" },
  assigned: { label: "Assigned", bg: "#ecfdf3", color: "#067647" },
  not_serviceable: { label: "Not Serviceable", bg: "#fef3f2", color: "#B42318" },
};

export default function AdminSalesPage() {
  const [items, setItems] = useState<SalesRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<SalesRequest | null>(null);
  const [accountId, setAccountId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ispStatus, setIspStatus] = useState<Record<string, "active" | "inactive">>({});
  const [ispBusy, setIspBusy] = useState<string | null>(null);
  const [sendingLinkFor, setSendingLinkFor] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<Record<string, string>>({});
  const [markingNotServiceableFor, setMarkingNotServiceableFor] = useState<string | null>(null);
  const { pageItems, currentPage, setCurrentPage, totalItems, pageSize } = usePagination(items, 10);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/connection-requests");
    if (res.ok) {
      const data: SalesRequest[] = await res.json();
      setItems(data);
      loadIspStatuses(data);
    }
    setLoading(false);
  }

  async function loadIspStatuses(list: SalesRequest[]) {
    const assigned = list.filter((i) => i.status === "assigned" && i.accountId);
    const results = await Promise.all(
      assigned.map(async (i) => {
        const res = await fetch(`/api/isp/status?accountId=${encodeURIComponent(i.accountId!)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return { accountId: i.accountId as string, status: data.status as "active" | "inactive" };
      })
    );
    setIspStatus((prev) => {
      const next = { ...prev };
      for (const r of results) {
        if (r) next[r.accountId] = r.status;
      }
      return next;
    });
  }

  async function handleIspToggle(item: SalesRequest) {
    if (!item.accountId || ispBusy) return;
    const targetAction = ispStatus[item.accountId] === "active" ? "deactivate" : "activate";
    setIspBusy(item.accountId);
    try {
      const res = await fetch(`/api/isp/${targetAction}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: item.accountId }),
      });
      if (res.ok) {
        const data = await res.json();
        setIspStatus((prev) => ({ ...prev, [item.accountId as string]: data.status }));
      }
    } finally {
      setIspBusy(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSendPaymentLink(item: SalesRequest) {
    if (sendingLinkFor) return;
    setSendingLinkFor(item._id);
    setLinkError((prev) => ({ ...prev, [item._id]: "" }));
    try {
      const res = await fetch(`/api/connection-requests/${item._id}/send-payment-link`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setLinkError((prev) => ({ ...prev, [item._id]: data.error || "Failed to send payment link." }));
        return;
      }
      await load();
    } finally {
      setSendingLinkFor(null);
    }
  }

  async function handleMarkNotServiceable(item: SalesRequest) {
    if (markingNotServiceableFor) return;
    if (!window.confirm(`Mark ${item.name}'s request as not serviceable? They'll be notified and can submit a new request.`)) {
      return;
    }
    setMarkingNotServiceableFor(item._id);
    setLinkError((prev) => ({ ...prev, [item._id]: "" }));
    try {
      const res = await fetch(`/api/connection-requests/${item._id}/not-serviceable`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setLinkError((prev) => ({ ...prev, [item._id]: data.error || "Failed to update request." }));
        return;
      }
      await load();
    } finally {
      setMarkingNotServiceableFor(null);
    }
  }

  function openAssign(item: SalesRequest) {
    setAssigning(item);
    setAccountId(item.accountId || "");
    setError(null);
  }

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!assigning) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/connection-requests/${assigning._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to assign Account ID.");
        return;
      }
      setAssigning(null);
      await load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Sales — Connection Requests</h1>
        <p className="admin-page-subtitle">
          New connection requests submitted from the website. Verify feasibility and send a
          payment link first — once the customer pays, assign an Account ID to activate their
          dashboard.
        </p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            Requests {!loading && `(${items.length})`}
          </h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : items.length === 0 ? (
            <p className="admin-page-subtitle">No connection requests yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Customer Details</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Requested On</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Account ID</th>
                  <th className="px-3 py-2">Live Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => {
                  const requestedOn = formatRequestedOn(item.createdAt);
                  return (
                  <tr key={item._id} className="border-t border-gray-100">
                    <td className="px-3 py-3" style={{ minWidth: "220px", maxWidth: "280px" }}>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}>{item.mobile}</div>
                      {item.city && (
                        <div style={{ fontSize: "12px", color: "#B42318", fontWeight: 600, marginTop: "4px" }}>
                          {item.city}
                        </div>
                      )}
                      <div style={{ fontSize: "12px", color: "#667085", marginTop: "4px", lineHeight: 1.4 }}>
                        {item.address}
                        {item.landmark && (
                          <span style={{ color: "#98a2b3" }}> · near {item.landmark}</span>
                        )}
                      </div>                    </td>
                    <td className="px-3 py-3">
                      {item.plan ? `${item.plan.name} (${item.plan.speed} ${item.plan.speedUnit})` : "—"}
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                      <div style={{ color: "#344054", fontWeight: 500 }}>{requestedOn.date}</div>
                      <div style={{ fontSize: "12px", color: "#98a2b3" }}>{requestedOn.time}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          background: STATUS_STYLES[item.status].bg,
                          color: STATUS_STYLES[item.status].color,
                        }}
                      >
                        {STATUS_STYLES[item.status].label}
                      </span>
                      {item.payment && item.status === "payment_pending" && (
                        <div style={{ fontSize: "11px", color: "#98a2b3", marginTop: "4px" }}>
                          ₹{item.payment.totalAmount.toLocaleString("en-IN")} due
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">{item.accountId || "—"}</td>
                    <td className="px-3 py-3">
                      {item.status !== "assigned" || !item.accountId ? (
                        <span style={{ color: "#98a2b3", fontSize: "12px" }}>—</span>
                      ) : ispStatus[item.accountId] ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {ispStatus[item.accountId] === "active" ? (
                            <Wifi size={14} color="#067647" />
                          ) : (
                            <WifiOff size={14} color="#B42318" />
                          )}
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              color: ispStatus[item.accountId] === "active" ? "#067647" : "#B42318",
                            }}
                          >
                            {ispStatus[item.accountId]}
                          </span>
                        </div>
                      ) : (
                        <Loader2 size={14} className="animate-spin" style={{ color: "#98a2b3" }} />
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {item.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleSendPaymentLink(item)}
                              disabled={sendingLinkFor === item._id || markingNotServiceableFor === item._id}
                              className="admin-btn-secondary"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {sendingLinkFor === item._id ? "Sending…" : "Verify & Send Payment Link"}
                            </button>
                            <button
                              onClick={() => handleMarkNotServiceable(item)}
                              disabled={sendingLinkFor === item._id || markingNotServiceableFor === item._id}
                              className="admin-btn-secondary"
                              style={{ whiteSpace: "nowrap", color: "#B42318", borderColor: "#fda29b" }}
                            >
                              {markingNotServiceableFor === item._id ? "Updating…" : "Not Serviceable"}
                            </button>
                          </>
                        )}
                        {item.status === "payment_pending" && (
                          <span style={{ color: "#98a2b3", fontSize: "12px" }}>Awaiting customer payment</span>
                        )}
                        {(item.status === "payment_done" || item.status === "assigned") && (
                          <button
                            onClick={() => openAssign(item)}
                            className="admin-btn-secondary"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {item.status === "assigned" ? "Update ID" : "Assign Account ID"}
                          </button>
                        )}
                        {item.status === "assigned" && item.accountId && (
                          <button
                            onClick={() => handleIspToggle(item)}
                            disabled={ispBusy === item.accountId}
                            className="admin-btn-secondary"
                            style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}
                          >
                            <Power size={13} />
                            {ispBusy === item.accountId
                              ? "…"
                              : ispStatus[item.accountId] === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        )}
                      </div>
                      {linkError[item._id] && (
                        <div style={{ color: "#B42318", fontSize: "11px", marginTop: "6px" }}>{linkError[item._id]}</div>
                      )}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="admin-card-body" style={{ paddingTop: 0 }}>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            itemLabel="requests"
          />
        </div>
      </div>

      <Modal
        open={!!assigning}
        onClose={() => setAssigning(null)}
        title="Assign Account ID"
        width="420px"
      >
        {assigning && (
          <form onSubmit={handleAssign} className="flex flex-col gap-4">
            <p className="admin-page-subtitle" style={{ marginTop: 0 }}>
              Assigning an Account ID activates <strong>{assigning.name}</strong>&apos;s
              connection and unlocks their dashboard.
            </p>
            <div>
              <label className="admin-label">Account ID</label>
              <input
                required
                autoFocus
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="e.g. VBC-10234"
                className="admin-input"
              />
            </div>

            {error && <p className="admin-alert-error">{error}</p>}

            <button type="submit" disabled={saving} className="admin-btn-primary w-full">
              {saving ? "Saving…" : "Save & Activate"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
