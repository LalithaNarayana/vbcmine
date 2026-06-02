import Link from "next/link";
import { Zap, Calendar, RefreshCw } from "lucide-react";

interface ActivePlanCardProps {
  plan: { name: string; speed: string; price: number; expiresAt: string; daysLeft: number; };
}

export default function ActivePlanCard({ plan }: ActivePlanCardProps) {
  const urgent = plan.daysLeft <= 7;
  return (
    <div style={{ background: "linear-gradient(135deg, #1a0000 0%, #0f0000 100%)", border: `1px solid ${urgent ? "rgba(204,0,0,0.6)" : "rgba(204,0,0,0.2)"}`, padding: "32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: "radial-gradient(circle at top right, rgba(204,0,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#555", marginBottom: "6px" }}>Active Plan</div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", letterSpacing: "1px", color: "#E8E8E8", marginBottom: "4px" }}>{plan.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} color="#CC0000" />
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: "#CC0000", letterSpacing: "1px" }}>{plan.speed}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "42px", color: "#E8E8E8", letterSpacing: "1px", lineHeight: 1 }}>₹{plan.price}</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#555" }}>per month</div>
        </div>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "24px 0" }} />

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Expires</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={13} color="#CC0000" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#E8E8E8" }}>{plan.expiresAt}</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Days Left</div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", color: urgent ? "#FF3333" : "#CC0000", letterSpacing: "1px" }}>{plan.daysLeft} Days</div>
          </div>
        </div>
        <Link href="/renew" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
          <RefreshCw size={14} /> Renew Now
        </Link>
      </div>

      {urgent && (
        <div style={{ marginTop: "16px", padding: "10px 16px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.3)", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#FF3333", fontWeight: 600 }}>
          ⚠ Your plan expires in {plan.daysLeft} days. Renew to avoid disconnection.
        </div>
      )}
    </div>
  );
}
