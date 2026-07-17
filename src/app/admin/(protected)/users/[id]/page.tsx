"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Wifi, WifiOff, Power } from "lucide-react";

interface UserDetail {
  _id: string;
  name: string;
  mobile: string;
  accountId: string | null;
  connectionStatus: "pending" | "active" | "inactive";
  createdAt: string;
}

interface PlanInfo {
  name: string;
  speed: number;
  speedUnit: string;
}

interface PaymentRow {
  _id: string;
  plan: PlanInfo | null;
  purpose: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface HistoryEntry {
  _id: string;
  oldPlan: PlanInfo | null;
  newPlan: PlanInfo;
  reason: "new-connection" | "renewal" | "upgrade" | "downgrade" | "admin-change";
  note: string;
  createdAt: string;
}

interface PlanOption {
  _id: string;
  name: string;
  speed: number;
  speedUnit: string;
}

interface AccountEntry {
  accountId: string;
  connectionStatus: "active" | "inactive";
  city: string;
  plan: PlanInfo | null;
  isActive: boolean;
  createdAt: string;
}

function statusStyle(status: string): React.CSSProperties {
  if (status === "active") return { background: "#ecfdf3", color: "#067647" };
  if (status === "inactive") return { background: "#fef3f2", color: "#b42318" };
  return { background: "#fff4e5", color: "#b54708" };
}

const REASON_LABEL: Record<HistoryEntry["reason"], string> = {
  "new-connection": "New Connection",
  renewal: "Renewed",
  upgrade: "Upgraded",
  downgrade: "Downgraded",
  "admin-change": "Plan Changed",
};

const REASON_COLOR: Record<HistoryEntry["reason"], string> = {
  "new-connection": "#175cd3",
  renewal: "#067647",
  upgrade: "#067647",
  downgrade: "#b54708",
  "admin-change": "#475467",
};

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [accounts, setAccounts] = useState<AccountEntry[]>([]);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [planOptions, setPlanOptions] = useState<PlanOption[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [changingPlan, setChangingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planSuccess, setPlanSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [accountId, setAccountId] = useState("");

  const [ispStatus, setIspStatus] = useState<Record<string, "active" | "inactive">>({});
  const [ispBusy, setIspBusy] = useState<string | null>(null);

  async function loadIspStatuses(accountIds: string[]) {
    const results = await Promise.all(
      accountIds.map(async (accId) => {
        const res = await fetch(`/api/isp/status?accountId=${encodeURIComponent(accId)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return { accountId: accId, status: data.status as "active" | "inactive" };
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

  async function handleIspToggle(accId: string) {
    if (!accId || ispBusy) return;
    const targetAction = ispStatus[accId] === "active" ? "deactivate" : "activate";
    setIspBusy(accId);
    try {
      const res = await fetch(`/api/isp/${targetAction}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accId }),
      });
      if (res.ok) {
        const data = await res.json();
        setIspStatus((prev) => ({ ...prev, [accId]: data.status }));
      }
    } finally {
      setIspBusy(null);
    }
  }

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${id}`);
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setAccounts(data.accounts || []);
      setPlan(data.plan);
      setPayments(data.payments);
      setHistory(data.history || []);
      setName(data.user.name);
      setMobile(data.user.mobile);
      setAccountId(data.user.accountId || "");

      const allAccountIds: string[] = (data.accounts || [])
        .map((a: { accountId: string }) => a.accountId)
        .filter(Boolean);
      if (allAccountIds.length > 0) {
        loadIspStatuses(allAccountIds);
      } else if (data.user.accountId) {
        loadIspStatuses([data.user.accountId]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PlanOption[]) => setPlanOptions(data))
      .catch(() => setPlanOptions([]));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          accountId: accountId.trim() === "" ? null : accountId.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update user.");
        return;
      }
      setUser(data.user);
      setSuccess("User details updated.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus() {
    if (!user) return;
    const nextStatus = user.connectionStatus === "active" ? "inactive" : "active";
    setToggling(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionStatus: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update status.");
        return;
      }
      setUser(data.user);
      setSuccess(
        data.user.connectionStatus === "inactive"
          ? "User deactivated — their dashboard access is now blocked."
          : "User reactivated — dashboard access restored."
      );
    } finally {
      setToggling(false);
    }
  }

  async function handleChangePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlanId) return;
    setChangingPlan(true);
    setPlanError(null);
    setPlanSuccess(null);
    try {
      const res = await fetch(`/api/admin/users/${id}/change-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlanId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPlanError(data.error || "Failed to change plan.");
        return;
      }
      setPlanSuccess(
        `Plan ${data.reason === "upgrade" ? "upgraded" : "downgraded"} to ${data.plan.name}.`
      );
      setSelectedPlanId("");
      await load();
    } finally {
      setChangingPlan(false);
    }
  }

  if (loading) {
    return <p className="admin-page-subtitle">Loading…</p>;
  }

  if (!user) {
    return <p className="admin-page-subtitle">User not found.</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.push("/admin/users")}
          className="admin-btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", fontSize: "13px", marginBottom: "16px" }}
        >
          <ArrowLeft size={14} /> Back to Users
        </button>
        <h1 className="admin-page-title">{user.name}</h1>
        <p className="admin-page-subtitle">
          {user.mobile} {user.accountId ? `· Account ID: ${user.accountId}` : ""}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: "24px" }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Edit Details</h2>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="admin-label">Full Name</label>
                <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="admin-label">Mobile Number</label>
                <input className="admin-input" value={mobile} onChange={(e) => setMobile(e.target.value)} required maxLength={10} />
              </div>
              <div>
                <label className="admin-label">Account ID</label>
                <input
                  className="admin-input"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Not assigned yet"
                />
              </div>

              {error && <p style={{ color: "#b42318", fontSize: "13px" }}>{error}</p>}
              {success && <p style={{ color: "#067647", fontSize: "13px" }}>{success}</p>}

              <button type="submit" className="admin-btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                {saving && <Loader2 size={14} className="animate-spin" />}
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Account Status</h2>
          </div>
          <div className="admin-card-body">
            <p className="admin-label" style={{ marginBottom: "8px" }}>Current Status</p>
            <span
              style={{
                borderRadius: "999px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                ...statusStyle(user.connectionStatus),
              }}
            >
              {user.connectionStatus}
            </span>

            <p style={{ fontSize: "13px", color: "#667085", marginTop: "16px", lineHeight: 1.6 }}>
              {user.connectionStatus === "inactive"
                ? "This user is deactivated. They cannot access their dashboard until reactivated."
                : "Deactivating this user will immediately block their dashboard access."}
            </p>

            {(user.connectionStatus === "active" || user.connectionStatus === "inactive") && (
              <button
                onClick={handleToggleStatus}
                disabled={toggling}
                className={user.connectionStatus === "active" ? "admin-btn-secondary" : "admin-btn-primary"}
                style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                {toggling && <Loader2 size={14} className="animate-spin" />}
                {user.connectionStatus === "active" ? "Deactivate User" : "Reactivate User"}
              </button>
            )}
            {user.connectionStatus === "pending" && (
              <p style={{ fontSize: "12px", color: "#98a2b3", marginTop: "16px" }}>
                Assign an Account ID via Connection Requests before activating this user.
              </p>
            )}

            {user.accountId && (
              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="admin-label" style={{ marginBottom: "8px" }}>Live Connection ({user.accountId})</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  {ispStatus[user.accountId] ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {ispStatus[user.accountId] === "active" ? (
                        <Wifi size={14} color="#067647" />
                      ) : (
                        <WifiOff size={14} color="#B42318" />
                      )}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: ispStatus[user.accountId] === "active" ? "#067647" : "#B42318",
                        }}
                      >
                        {ispStatus[user.accountId]}
                      </span>
                    </div>
                  ) : (
                    <Loader2 size={14} className="animate-spin" style={{ color: "#98a2b3" }} />
                  )}
                  <button
                    onClick={() => handleIspToggle(user.accountId as string)}
                    disabled={ispBusy === user.accountId}
                    className="admin-btn-secondary"
                    style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <Power size={13} />
                    {ispBusy === user.accountId
                      ? "…"
                      : ispStatus[user.accountId] === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </div>
                <p style={{ fontSize: "12px", color: "#98a2b3", marginTop: "8px", lineHeight: 1.5 }}>
                  This controls the actual internet connection with the ISP provider — separate from the
                  dashboard access status above.
                </p>
              </div>
            )}

            {plan && (
              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="admin-label" style={{ marginBottom: "6px" }}>Current Plan</p>
                <p style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 600 }}>
                  {plan.name} — {plan.speed} {plan.speedUnit}
                </p>

                <form onSubmit={handleChangePlan} style={{ marginTop: "16px" }}>
                  <label className="admin-label" style={{ display: "block", marginBottom: "6px" }}>
                    Change Plan (Upgrade / Downgrade)
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      className="admin-input"
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      style={{ flex: 1 }}
                    >
                      <option value="">Select a plan…</option>
                      {planOptions.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} — {p.speed} {p.speedUnit}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={!selectedPlanId || changingPlan}
                      className="admin-btn-primary"
                      style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      {changingPlan && <Loader2 size={14} className="animate-spin" />}
                      Change
                    </button>
                  </div>
                  {planError && <p style={{ color: "#b42318", fontSize: "13px", marginTop: "8px" }}>{planError}</p>}
                  {planSuccess && <p style={{ color: "#067647", fontSize: "13px", marginTop: "8px" }}>{planSuccess}</p>}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {accounts.length > 1 && (
        <div className="admin-card" style={{ marginTop: "24px" }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Connections ({accounts.length})</h2>
          </div>
          <div className="admin-card-body" style={{ overflowX: "auto" }}>
            <p className="admin-page-subtitle" style={{ marginBottom: "12px" }}>
              This mobile number has requested more than one connection. The one marked
              &ldquo;Active on dashboard&rdquo; is what shows up when the customer logs in — they can
              switch between them from their dashboard.
            </p>
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Account ID</th>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Dashboard</th>
                  <th className="px-3 py-2">Live Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.accountId} className="border-t border-gray-100">
                    <td className="px-3 py-3" style={{ fontWeight: 600 }}>{a.accountId}</td>
                    <td className="px-3 py-3">{a.plan ? `${a.plan.name} (${a.plan.speed} ${a.plan.speedUnit})` : "—"}</td>
                    <td className="px-3 py-3">{a.city || "—"}</td>
                    <td className="px-3 py-3" style={{ textTransform: "capitalize" }}>
                      <span
                        style={{
                          borderRadius: "999px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          ...statusStyle(a.connectionStatus),
                        }}
                      >
                        {a.connectionStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {a.isActive ? (
                        <span style={{ color: "#067647", fontWeight: 600, fontSize: "12px" }}>Active on dashboard</span>
                      ) : (
                        <span style={{ color: "#98a2b3", fontSize: "12px" }}>—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {ispStatus[a.accountId] ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {ispStatus[a.accountId] === "active" ? (
                            <Wifi size={14} color="#067647" />
                          ) : (
                            <WifiOff size={14} color="#B42318" />
                          )}
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              color: ispStatus[a.accountId] === "active" ? "#067647" : "#B42318",
                            }}
                          >
                            {ispStatus[a.accountId]}
                          </span>
                        </div>
                      ) : (
                        <Loader2 size={14} className="animate-spin" style={{ color: "#98a2b3" }} />
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => handleIspToggle(a.accountId)}
                        disabled={ispBusy === a.accountId}
                        className="admin-btn-secondary"
                        style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        <Power size={13} />
                        {ispBusy === a.accountId
                          ? "…"
                          : ispStatus[a.accountId] === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ marginTop: "24px" }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Payments {payments.length > 0 && `(${payments.length})`}</h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {payments.length === 0 ? (
            <p className="admin-page-subtitle">No payments recorded yet.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">Plan</th>
                  <th className="px-3 py-2">Purpose</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-t border-gray-100">
                    <td className="px-3 py-3">{p.plan ? `${p.plan.name} (${p.plan.speed} ${p.plan.speedUnit})` : "—"}</td>
                    <td className="px-3 py-3" style={{ textTransform: "capitalize" }}>{p.purpose.replace("-", " ")}</td>
                    <td className="px-3 py-3">₹{p.totalAmount}</td>
                    <td className="px-3 py-3" style={{ textTransform: "capitalize" }}>{p.status}</td>
                    <td className="px-3 py-3" style={{ whiteSpace: "nowrap" }}>
                      <div style={{ color: "#344054", fontWeight: 500 }}>
                        {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                      <div style={{ fontSize: "12px", color: "#98a2b3" }}>
                        {new Date(p.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: "24px" }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Subscription History {history.length > 0 && `(${history.length})`}</h2>
        </div>
        <div className="admin-card-body">
          {history.length === 0 ? (
            <p className="admin-page-subtitle">No plan changes recorded yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {history.map((h, i) => (
                <div
                  key={h._id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    paddingBottom: i === history.length - 1 ? 0 : "16px",
                    marginBottom: i === history.length - 1 ? 0 : "16px",
                    borderBottom: i === history.length - 1 ? "none" : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: REASON_COLOR[h.reason],
                      flexShrink: 0,
                      marginTop: "5px",
                    }}
                  />
                  <div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: REASON_COLOR[h.reason] }}>
                        {REASON_LABEL[h.reason]}
                      </span>
                      <span style={{ fontSize: "12px", color: "#98a2b3" }}>
                        {new Date(h.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        {", "}
                        {new Date(h.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#344054", marginTop: "3px" }}>
                      {h.oldPlan ? (
                        <>
                          {h.oldPlan.name} ({h.oldPlan.speed} {h.oldPlan.speedUnit}) → {h.newPlan.name} ({h.newPlan.speed} {h.newPlan.speedUnit})
                        </>
                      ) : (
                        <>{h.newPlan.name} ({h.newPlan.speed} {h.newPlan.speedUnit})</>
                      )}
                    </p>
                    {h.note && <p style={{ fontSize: "12px", color: "#98a2b3", marginTop: "2px" }}>{h.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Link href="/admin/sales" style={{ fontSize: "13px", color: "#cc0000", fontWeight: 600 }}>
          View this user&apos;s connection requests in Sales →
        </Link>
      </div>
    </div>
  );
}
