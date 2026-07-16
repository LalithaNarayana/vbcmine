"use client";

import { useEffect, useState } from "react";

interface BusinessServiceRequestItem {
  _id: string;
  businessServiceName: string;
  city: string;
  address: string;
  mobile: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const STATUS_OPTIONS = ["new", "contacted", "closed"] as const;

function formatSubmittedOn(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

function statusStyle(status: string): React.CSSProperties {
  if (status === "closed") return { background: "#ecfdf3", color: "#067647" };
  if (status === "contacted") return { background: "#eff8ff", color: "#175cd3" };
  return { background: "#fff4e5", color: "#b54708" };
}

export default function AdminBusinessRequestsPage() {
  const [items, setItems] = useState<BusinessServiceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/business-service-requests");
    if (res.ok) {
      const data: BusinessServiceRequestItem[] = await res.json();
      setItems(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/business-service-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: status as BusinessServiceRequestItem["status"] } : item))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Business Service Requests</h1>
        <p className="admin-page-subtitle">
          Enquiries submitted from Business Service pages, grouped by the service the visitor
          requested.
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
            <p className="admin-page-subtitle">No business service requests yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Business Service</th>
                  <th className="px-3 py-2">Contact Details</th>
                  <th className="px-3 py-2">City / Address</th>
                  <th className="px-3 py-2">Message</th>
                  <th className="px-3 py-2">Submitted On</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const submittedOn = formatSubmittedOn(item.createdAt);
                  return (
                    <tr key={item._id} className="border-t border-gray-100">
                      <td className="px-3 py-3" style={{ minWidth: "160px" }}>
                        <div className="font-medium text-gray-900">{item.businessServiceName}</div>
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        {item.mobile}
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "200px", maxWidth: "260px" }}>
                        <div style={{ fontWeight: 500, color: "#344054" }}>{item.city}</div>
                        {item.address && (
                          <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px", lineHeight: 1.4 }}>
                            {item.address}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "220px", maxWidth: "320px" }}>
                        <div style={{ fontSize: "13px", color: "#475467", lineHeight: 1.5 }}>{item.message}</div>
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        <div style={{ color: "#344054", fontWeight: 500 }}>{submittedOn.date}</div>
                        <div style={{ fontSize: "12px", color: "#98a2b3" }}>{submittedOn.time}</div>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={item.status}
                          disabled={updating === item._id}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          style={{
                            border: "1px solid rgba(20,33,61,0.12)",
                            borderRadius: "999px",
                            padding: "3px 10px",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            ...statusStyle(item.status),
                          }}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
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
