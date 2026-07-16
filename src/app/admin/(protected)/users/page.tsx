"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface UserPlan {
  name: string;
  speed: number;
  speedUnit: string;
}

interface UserRow {
  _id: string;
  name: string;
  mobile: string;
  accountId: string | null;
  connectionStatus: "pending" | "active" | "inactive";
  createdAt: string;
  plan: UserPlan | null;
}

function formatJoined(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusStyle(status: string): React.CSSProperties {
  if (status === "active") return { background: "#ecfdf3", color: "#067647" };
  if (status === "inactive") return { background: "#fef3f2", color: "#b42318" };
  return { background: "#fff4e5", color: "#b54708" };
}

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) setItems(await res.json());
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.mobile.includes(q) ||
        (u.accountId || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle">
            All registered users. Click a row to edit their details or toggle account access.
          </p>
        </div>
        <div style={{ position: "relative", minWidth: "260px" }}>
          <Search
            size={16}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#98a2b3" }}
          />
          <input
            className="admin-input"
            placeholder="Search name, mobile, account ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: "36px" }}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            All Users {!loading && `(${filtered.length})`}
          </h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="admin-page-subtitle">No users found.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Mobile</th>
                  <th className="px-3 py-2">Account ID</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Joined</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u._id} className="border-t border-gray-100">
                    <td className="px-3 py-3 font-medium text-gray-900" style={{ minWidth: "160px" }}>
                      {u.name}
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>{u.mobile}</td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>{u.accountId || "—"}</td>
                    <td className="px-3 py-3" style={{ minWidth: "140px" }}>
                      {u.plan ? `${u.plan.name} (${u.plan.speed} ${u.plan.speedUnit})` : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        style={{
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          ...statusStyle(u.connectionStatus),
                        }}
                      >
                        {u.connectionStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap", color: "#344054" }}>
                      {formatJoined(u.createdAt)}
                    </td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                      <Link href={`/admin/users/${u._id}`} className="admin-btn-secondary" style={{ padding: "5px 14px", fontSize: "13px" }}>
                        Edit
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
