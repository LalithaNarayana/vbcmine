"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";

interface ComplaintUser {
  _id: string;
  name: string;
  mobile: string;
  accountId: string | null;
}

interface ComplaintItem {
  _id: string;
  user: ComplaintUser | null;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved"] as const;

function formatSubmittedOn(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

function statusStyle(status: string): React.CSSProperties {
  if (status === "Resolved") return { background: "#ecfdf3", color: "#067647" };
  if (status === "In Progress") return { background: "#eff8ff", color: "#175cd3" };
  return { background: "#fff4e5", color: "#b54708" };
}

export default function AdminComplaintsPage() {
  const [items, setItems] = useState<ComplaintItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { pageItems, currentPage, setCurrentPage, totalItems, pageSize } = usePagination(items, 10);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/complaints");
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: status as ComplaintItem["status"] } : item))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Complaints</h1>
        <p className="admin-page-subtitle">
          Tickets raised by users from their dashboard. Update the status as you work through
          each one — the user sees the change live on their dashboard.
        </p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            Tickets {!loading && `(${items.length})`}
          </h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : items.length === 0 ? (
            <p className="admin-page-subtitle">No complaints raised yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">User</th>
                  <th className="px-3 py-2">Subject</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2">Raised On</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => {
                  const raisedOn = formatSubmittedOn(item.createdAt);
                  return (
                    <tr key={item._id} className="border-t border-gray-100">
                      <td className="px-3 py-3" style={{ minWidth: "160px" }}>
                        <div className="font-medium text-gray-900">{item.user?.name || "—"}</div>
                        <div style={{ fontSize: "12px", color: "#667085", marginTop: "2px" }}>
                          {item.user?.mobile}
                          {item.user?.accountId ? ` · ${item.user.accountId}` : ""}
                        </div>
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "160px" }}>
                        <div className="font-medium text-gray-900">{item.subject}</div>
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "220px", maxWidth: "340px" }}>
                        <div style={{ fontSize: "13px", color: "#475467", lineHeight: 1.5 }}>{item.description}</div>
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        <div style={{ color: "#344054", fontWeight: 500 }}>{raisedOn.date}</div>
                        <div style={{ fontSize: "12px", color: "#98a2b3" }}>{raisedOn.time}</div>
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
        <div className="admin-card-body" style={{ paddingTop: 0 }}>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            itemLabel="tickets"
          />
        </div>
      </div>
    </div>
  );
}
