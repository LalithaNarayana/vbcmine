"use client";
import { useEffect } from "react";
import { X, CheckCircle2, Wifi, CreditCard, AlertTriangle, Bell, MailCheck } from "lucide-react";

export type NotificationKind = "renewal" | "activation" | "payment" | "broadcast" | "direct";

export interface NotificationItem {
  _id: string;
  type: NotificationKind;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const ICONS: Record<NotificationKind, React.ReactNode> = {
  activation: <CheckCircle2 size={16} color="#00C864" />,
  renewal: <AlertTriangle size={16} color="#F5A623" />,
  payment: <CreditCard size={16} color="#CC0000" />,
  broadcast: <Wifi size={16} color="#3B82F6" />,
  direct: <Wifi size={16} color="#3B82F6" />,
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotificationsModal({
  open,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
}: NotificationsModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          background: "#0D0D0D",
          border: "1px solid rgba(204,0,0,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "notifModalIn 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Bell size={16} color="#CC0000" />
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#E8E8E8",
              }}
            >
              Notifications
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {hasUnread && (
              <button
                onClick={onMarkAllRead}
                title="Mark all as read"
                style={{
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                <MailCheck size={13} /> Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                color: "#999",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ overflowY: "auto", padding: notifications.length ? "8px 0" : "40px 20px" }}>
          {notifications.length === 0 ? (
            <p style={{ color: "#555", fontSize: "13px", textAlign: "center", margin: 0 }}>
              You&apos;re all caught up — no notifications yet.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => !n.read && onMarkRead(n._id)}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: n.read ? "transparent" : "rgba(204,0,0,0.06)",
                  cursor: n.read ? "default" : "pointer",
                }}
              >
                <div style={{ marginTop: "2px", flexShrink: 0 }}>{ICONS[n.type]}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#E8E8E8",
                      letterSpacing: "0.3px",
                      marginBottom: "2px",
                    }}
                  >
                    {n.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, marginBottom: "4px" }}>
                    {n.message}
                  </div>
                  <div style={{ fontSize: "11px", color: "#444" }}>{formatTime(n.createdAt)}</div>
                </div>
                {!n.read && (
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: "5px" }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`@keyframes notifModalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

