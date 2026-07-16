import Link from "next/link";
import { AlertTriangle, RefreshCw, Bell } from "lucide-react";

interface RenewalAlertProps {
  daysLeft: number;
  planName: string;
}

export default function RenewalAlert({ daysLeft, planName }: RenewalAlertProps) {
  if (daysLeft > 10) return null;

  const isUrgent = daysLeft <= 3;

  return (
    <div style={{
      padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
      background: isUrgent ? "rgba(255,50,50,0.08)" : "rgba(255,180,0,0.06)",
      border: `1px solid ${isUrgent ? "rgba(255,50,50,0.3)" : "rgba(255,180,0,0.25)"}`,
      borderLeft: `4px solid ${isUrgent ? "#FF3333" : "#FFB400"}`,
      borderRadius: "8px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {isUrgent ? <AlertTriangle size={18} color="#FF3333" /> : <Bell size={18} color="#FFB400" />}
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: isUrgent ? "#FF3333" : "#FFB400" }}>
            {isUrgent ? "URGENT: Plan Expiring Soon!" : "Plan Renewal Reminder"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--vbc-muted)" }}>
            Your {planName} plan expires in <strong style={{ color: "var(--vbc-text)" }}>{daysLeft} day{daysLeft !== 1 ? "s" : ""}</strong>. Renew to stay connected.
          </div>
        </div>
      </div>
      <Link href="/renew" style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: isUrgent ? "#CC0000" : "rgba(255,180,0,0.15)",
        color: isUrgent ? "white" : "#FFB400",
        padding: "8px 20px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
        fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none",
        borderRadius: "6px",
      }}>
        <RefreshCw size={13} /> Renew
      </Link>
    </div>
  );
}