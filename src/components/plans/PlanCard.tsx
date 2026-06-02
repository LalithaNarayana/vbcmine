import Link from "next/link";
import { Check, Star, Zap } from "lucide-react";
import { Plan } from "@/constants/plans";

interface PlanCardProps {
  plan: Plan;
  showRenew?: boolean;
}

export default function PlanCard({ plan, showRenew }: PlanCardProps) {
  return (
    <div
      className="plan-card"
      style={{
        background: "#ffffff",
        border: plan.popular ? "1px solid rgba(204,0,0,0.3)" : "1px solid rgba(20,33,61,0.08)",
        padding: "36px 28px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 16px 36px rgba(20, 33, 61, 0.06)",
      }}
    >
      {plan.popular && (
        <div style={{ position: "absolute", top: "-1px", right: "24px" }}>
          <div style={{ background: "linear-gradient(135deg, #CC0000, #880000)", padding: "6px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Star size={11} fill="white" color="white" />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "11px", color: "white", letterSpacing: "1px", textTransform: "uppercase" }}>
              {plan.tag || "Most Popular"}
            </span>
          </div>
        </div>
      )}

      {!plan.popular && plan.tag && (
        <div className="badge-red" style={{ display: "inline-block", marginBottom: "12px", fontSize: "10px" }}>{plan.tag}</div>
      )}

      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#667085" }}>
          {plan.name}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <Zap size={16} color="#CC0000" />
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: plan.popular ? "#FF3333" : "#CC0000", letterSpacing: "1px" }}>
          {plan.speed}
        </span>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "48px", color: "#152238", letterSpacing: "1px" }}>Rs. {plan.price}</span>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#667085" }}>/{plan.duration.toLowerCase()}</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {plan.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Check size={14} color="#CC0000" strokeWidth={3} />
            <span style={{ fontSize: "13px", color: "#475467" }}>{f}</span>
          </div>
        ))}
      </div>

      <Link
        href={showRenew ? "/renew" : "/login"}
        className={plan.popular ? "btn-primary" : "btn-outline"}
        style={{ textDecoration: "none", display: "block", textAlign: "center" }}
      >
        {showRenew ? "Renew Now" : "Get Started"}
      </Link>
    </div>
  );
}
