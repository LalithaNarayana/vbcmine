import Link from "next/link";
import { RefreshCw, FileText, Headphones, Wifi, User, CreditCard } from "lucide-react";

const actions = [
  { icon: <RefreshCw size={20} />, label: "Renew Plan", href: "/renew", primary: true },
  { icon: <FileText size={20} />, label: "Raise Ticket", href: "/contact", primary: false },
  { icon: <Headphones size={20} />, label: "Support", href: "/contact", primary: false },
  { icon: <Wifi size={20} />, label: "Speed Test", href: "#", primary: false },
  { icon: <User size={20} />, label: "Edit Profile", href: "#", primary: false },
  { icon: <CreditCard size={20} />, label: "Pay Bill", href: "/renew", primary: false },
];

export default function QuickActions() {
  return (
    <div>
      <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#555", marginBottom: "16px" }}>Quick Actions</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {actions.map((a, i) => (
          <Link key={i} href={a.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            padding: "20px 12px", textDecoration: "none",
            background: a.primary ? "linear-gradient(135deg, rgba(204,0,0,0.15), rgba(136,0,0,0.1))" : "rgba(255,255,255,0.02)",
            border: a.primary ? "1px solid rgba(204,0,0,0.3)" : "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(204,0,0,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(204,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = a.primary ? "linear-gradient(135deg, rgba(204,0,0,0.15), rgba(136,0,0,0.1))" : "rgba(255,255,255,0.02)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = a.primary ? "rgba(204,0,0,0.3)" : "rgba(255,255,255,0.05)";
            }}
          >
            <span style={{ color: a.primary ? "#CC0000" : "#666" }}>{a.icon}</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.5px", textTransform: "uppercase", color: a.primary ? "#E8E8E8" : "#555", textAlign: "center" }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
