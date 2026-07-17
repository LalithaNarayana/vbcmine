"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";

interface AdminUserOption {
  _id: string;
  name: string;
  mobile: string;
  accountId: string | null;
}

interface SentBatch {
  _id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  recipientCount: number;
  readCount: number;
}

function formatSentOn(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function AdminNotificationsPage() {
  const [users, setUsers] = useState<AdminUserOption[]>([]);
  const [batches, setBatches] = useState<SentBatch[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [target, setTarget] = useState<"all" | "user">("all");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { pageItems, currentPage, setCurrentPage, totalItems, pageSize } = usePagination(batches, 10);

  async function loadHistory() {
    setLoadingHistory(true);
    const res = await fetch("/api/admin/notifications");
    if (res.ok) setBatches(await res.json());
    setLoadingHistory(false);
  }

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setUsers(data))
      .catch(() => {});
    loadHistory();
  }, []);

  const canSend =
    title.trim().length >= 2 &&
    message.trim().length >= 2 &&
    (target === "all" || !!userId) &&
    !sending;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, userId: target === "user" ? userId : undefined, title, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send notification.");
        return;
      }
      setSuccess(`Sent to ${data.recipientCount} recipient${data.recipientCount === 1 ? "" : "s"}.`);
      setTitle("");
      setMessage("");
      setUserId("");
      await loadHistory();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Send Notification</h1>
        <p className="admin-page-subtitle">
          Push a message to a single user or broadcast it to everyone — it shows up in their
          dashboard bell instantly.
        </p>
      </div>

      <div className="admin-card" style={{ marginBottom: "24px" }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Compose</h2>
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleSend} className="flex flex-col gap-4" style={{ maxWidth: "560px" }}>
            <div>
              <label className="admin-label">Send To</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {(["all", "user"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTarget(t)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: target === t ? "#CC0000" : "#E4E7EC",
                      background: target === t ? "rgba(204,0,0,0.08)" : "#fff",
                      color: target === t ? "#CC0000" : "#667085",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {t === "all" ? "All Users" : "One User"}
                  </button>
                ))}
              </div>
            </div>

            {target === "user" && (
              <div>
                <label className="admin-label">User</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)} className="admin-input">
                  <option value="">Choose a user...</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} — {u.mobile}
                      {u.accountId ? ` (${u.accountId})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="admin-label">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled maintenance tonight"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write the notification message..."
                rows={4}
                className="admin-input"
                style={{ resize: "vertical" }}
              />
            </div>

            {error && <p className="admin-alert-error">{error}</p>}
            {success && <p style={{ color: "#067647", fontSize: "13px" }}>{success}</p>}

            <button type="submit" disabled={!canSend} className="admin-btn-primary" style={{ alignSelf: "flex-start" }}>
              {sending ? "Sending…" : "Send Notification"}
            </button>
          </form>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Sent History {!loadingHistory && `(${batches.length})`}</h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loadingHistory ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : batches.length === 0 ? (
            <p className="admin-page-subtitle">No notifications sent yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Message</th>
                  <th className="px-3 py-2">Target</th>
                  <th className="px-3 py-2">Read / Sent</th>
                  <th className="px-3 py-2">Sent On</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((b) => {
                  const sentOn = formatSentOn(b.createdAt);
                  return (
                    <tr key={b._id} className="border-t border-gray-100">
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">{b.title}</div>
                      </td>
                      <td className="px-3 py-3" style={{ minWidth: "220px", maxWidth: "340px" }}>
                        <div style={{ fontSize: "13px", color: "#475467", lineHeight: 1.5 }}>{b.message}</div>
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
                            background: b.type === "broadcast" ? "rgba(59,130,246,0.1)" : "#F2F4F7",
                            color: b.type === "broadcast" ? "#175cd3" : "#475467",
                          }}
                        >
                          {b.type === "broadcast" ? "All Users" : "One User"}
                        </span>
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        {b.readCount} / {b.recipientCount}
                      </td>
                      <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                        <div style={{ color: "#344054", fontWeight: 500 }}>{sentOn.date}</div>
                        <div style={{ fontSize: "12px", color: "#98a2b3" }}>{sentOn.time}</div>
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
            itemLabel="notifications"
          />
        </div>
      </div>
    </div>
  );
}
