"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, User, LogOut, Wifi, Loader2 } from "lucide-react";
import ActivePlanCard from "@/components/dashboard/ActivePlanCard";
import RenewalAlert from "@/components/dashboard/RenewalAlert";
import TransactionTable from "@/components/dashboard/TransactionTable";
import SubscriptionHistoryTimeline from "@/components/dashboard/SubscriptionHistoryTimeline";
import QuickActions from "@/components/dashboard/QuickActions";
import IspStatusCard from "@/components/dashboard/IspStatusCard";
import NotificationsModal, { NotificationItem } from "@/components/dashboard/NotificationsModal";
import ConnectionPaymentModal from "@/components/dashboard/ConnectionPaymentModal";
import { usePlanRequest } from "@/components/plans/PlanRequestProvider";
import { useUserSession } from "@/components/auth/UserSessionProvider";

interface SessionUser {
  id: string;
  name: string;
  mobile: string;
  accountId: string | null;
  connectionStatus: "pending" | "active";
}

interface ConnectionStatusPlan {
  id: string;
  name: string;
  speed: number;
  speedUnit: string;
  price: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "success" | "pending" | "failed";
  method: string;
}

interface ConnectionStatus {
  hasConnection: boolean;
  requestStatus: "pending" | "payment_pending" | "payment_done" | "assigned" | null;
  plan: ConnectionStatusPlan | null;
  expiresAt: string | null;
  daysLeft: number | null;
  payments: Transaction[];
}

interface IspLiveState {
  status: "active" | "inactive" | null;
  dataUsedGb: number | null;
  dataLimitGb: number | null;
  lastSynced: string | null;
  loading: boolean;
}

interface SubscriptionHistoryEntry {
  _id: string;
  oldPlan: { name: string; speed: number; speedUnit: string } | null;
  newPlan: { name: string; speed: number; speedUnit: string };
  reason: "new-connection" | "renewal" | "upgrade" | "downgrade" | "admin-change";
  note: string;
  createdAt: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const { openPlanRequest } = usePlanRequest();
  const { logout: sessionLogout } = useUserSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isp, setIsp] = useState<IspLiveState>({
    status: null,
    dataUsedGb: null,
    dataLimitGb: null,
    lastSynced: null,
    loading: false,
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [subscriptionHistory, setSubscriptionHistory] = useState<SubscriptionHistoryEntry[]>([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  async function loadConnectionStatus() {
    const res = await fetch("/api/user/connection-status");
    if (res.ok) setStatus(await res.json());
  }

  async function loadNotifications() {
    const res = await fetch("/api/notifications");
    if (res.ok) {
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    }
  }

  async function handleMarkRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    await fetch("/api/notifications/mark-all-read", { method: "POST" });
  }

  useEffect(() => {
    (async () => {
      try {
        const [meRes, statusRes] = await Promise.all([
          fetch("/api/user/me"),
          fetch("/api/user/connection-status"),
        ]);
        const meData = await meRes.json();
        if (!meData.user) {
          router.replace("/login?next=/dashboard");
          return;
        }
        setUser(meData.user);
        if (statusRes.ok) {
          setStatus(await statusRes.json());
        }
        loadNotifications();
        fetch("/api/subscription-history")
          .then((res) => (res.ok ? res.json() : []))
          .then((data: SubscriptionHistoryEntry[]) => setSubscriptionHistory(data))
          .catch(() => setSubscriptionHistory([]));
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  // Once the account is active, pull live status + usage from the ISP provider.
  useEffect(() => {
    if (!status?.hasConnection) return;
    let cancelled = false;
    setIsp((prev) => ({ ...prev, loading: true }));
    (async () => {
      const [statusRes, usageRes] = await Promise.all([
        fetch("/api/isp/status"),
        fetch("/api/isp/data-usage"),
      ]);
      if (cancelled) return;
      const statusData = statusRes.ok ? await statusRes.json() : null;
      const usageData = usageRes.ok ? await usageRes.json() : null;
      setIsp({
        status: statusData?.status ?? null,
        dataUsedGb: usageData?.dataUsedGb ?? null,
        dataLimitGb: usageData?.dataLimitGb ?? null,
        lastSynced: usageData?.lastSynced ?? null,
        loading: false,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [status?.hasConnection]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await sessionLogout();
    } finally {
      router.push("/");
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--vbc-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vbc-muted)" }}>
        <Loader2 size={22} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--vbc-dark)" }}>
      {/* Top Bar */}
      <div style={{ background: "var(--vbc-black)", borderBottom: "1px solid rgba(204,0,0,0.25)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", letterSpacing: "1px", textTransform: "uppercase" }}>Welcome back</div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#FFFFFF" }}>{user.name.toUpperCase()}</h1>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={() => setNotificationsOpen(true)}
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", position: "relative" }}
              title="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#CC0000",
                    border: "1px solid var(--vbc-black)",
                  }}
                />
              )}
            </button>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #CC0000, #880000)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
              <User size={18} color="white" />
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", cursor: "pointer", borderRadius: "6px", padding: "8px 12px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", letterSpacing: "0.5px" }}
            >
              <LogOut size={14} /> {loggingOut ? "..." : "Logout"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {!status?.hasConnection ? (
          /* No account yet — connection request pending / not started */
          <div style={{
            background: "var(--vbc-surface)",
            border: "1px solid var(--vbc-border)",
            borderRadius: "12px",
            boxShadow: "var(--vbc-shadow)",
            padding: "48px 32px",
            textAlign: "center",
          }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(204,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Wifi size={28} color="#CC0000" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "1px", color: "var(--vbc-text)", marginBottom: "10px" }}>
              {status?.requestStatus === "payment_pending"
                ? "PAYMENT REQUIRED TO PROCEED"
                : status?.requestStatus === "payment_done"
                ? "INSTALLATION IN PROGRESS"
                : "CONNECTION NOT YET ACTIVATED"}
            </h2>
            <p style={{ color: "var(--vbc-muted)", fontSize: "14px", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 24px" }}>
              {status?.requestStatus === "payment_pending"
                ? "We've verified your connection request. Please complete the payment below so our team can proceed with installation."
                : status?.requestStatus === "payment_done"
                ? "Payment received! Our team will install your router and assign your Account ID shortly — this usually only takes a short while."
                : status?.requestStatus === "pending"
                ? "We've received your connection request and it's being reviewed by our sales team. We'll notify you here as soon as it's verified."
                : user.connectionStatus === "pending"
                ? "We haven't received a connection request from this account yet, or it's still being reviewed by our sales team. Once an Account ID is assigned, your plan and billing details will appear here."
                : "Your connection is being set up. Hang tight — this usually only takes a short while."}
            </p>
            {status?.requestStatus === "payment_pending" ? (
              <button onClick={() => setPaymentModalOpen(true)} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                Pay Now
              </button>
            ) : !status?.requestStatus ? (
              <button onClick={() => openPlanRequest()} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
                Request a Connection
              </button>
            ) : null}
          </div>
        ) : (
          <>
            {status.daysLeft !== null && status.plan && (
              <div style={{ marginBottom: "24px" }}>
                <RenewalAlert daysLeft={status.daysLeft} planName={status.plan.name} />
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "28px" }}>
              {status.plan && (
                <ActivePlanCard
                  plan={{
                    name: `${status.plan.name} — ${status.plan.speed} ${status.plan.speedUnit}`,
                    speed: `${status.plan.speed} ${status.plan.speedUnit}`,
                    price: status.plan.price,
                    expiresAt: status.expiresAt ? formatDate(status.expiresAt) : "—",
                    daysLeft: status.daysLeft ?? 0,
                  }}
                />
              )}

              <div
                style={{
                  background: "var(--vbc-surface)",
                  border: "1px solid var(--vbc-border)",
                  borderRadius: "12px",
                  boxShadow: "var(--vbc-shadow)",
                  padding: "28px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "var(--vbc-muted)",
                    display: "block",
                    marginBottom: "18px",
                  }}
                >
                  Account Info
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--vbc-muted)" }}>Account ID</span>
                    <span style={{ color: "var(--vbc-text)", fontWeight: 600 }}>
                      {user.accountId}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--vbc-muted)" }}>Mobile</span>
                    <span style={{ color: "var(--vbc-text)", fontWeight: 600 }}>
                      +91 {user.mobile}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--vbc-muted)" }}>Status</span>
                    <span
                      style={{
                        color: "#067647",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {user.connectionStatus}
                    </span>
                  </div>
                </div>
              </div>

              <IspStatusCard
                status={isp.status}
                dataUsedGb={isp.dataUsedGb}
                dataLimitGb={isp.dataLimitGb}
                lastSynced={isp.lastSynced}
                loading={isp.loading}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <QuickActions />
            </div>

            <div style={{ background: "var(--vbc-surface)", border: "1px solid var(--vbc-border)", borderRadius: "12px", boxShadow: "var(--vbc-shadow)", padding: "28px" }}>
              <TransactionTable transactions={status.payments} />
            </div>

            <div style={{ background: "var(--vbc-surface)", border: "1px solid var(--vbc-border)", borderRadius: "12px", boxShadow: "var(--vbc-shadow)", padding: "28px", marginTop: "28px" }}>
              <SubscriptionHistoryTimeline history={subscriptionHistory} />
            </div>
          </>
        )}
      </div>

      <ConnectionPaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaid={() => {
          loadConnectionStatus();
          loadNotifications();
        }}
      />

      <NotificationsModal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onMarkAllRead={handleMarkAllRead}
      />
    </div >
  );
}