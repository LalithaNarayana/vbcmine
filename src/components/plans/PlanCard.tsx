"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Star, Zap } from "lucide-react";
import type { Plan, PlanDuration, PlanBullet } from "@/types/plan";
import { usePlanRequest } from "./PlanRequestProvider";
import { useUserSession } from "@/components/auth/UserSessionProvider";
import UpgradePlanModal from "./UpgradePlanModal";

interface PlanCardProps {
  plan: Plan;
  showRenew?: boolean;
}

export default function PlanCard({ plan, showRenew }: PlanCardProps) {
  const { openPlanRequest } = usePlanRequest();
  const { user } = useUserSession();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  // An existing customer with a live connection gets the "upgrade" popup +
  // payment link instead of the new-connection request form.
  const isExistingCustomer = !!user && user.connectionStatus === "active" && !!user.accountId;

  function handleGetPlan() {
    if (isExistingCustomer) {
      setUpgradeOpen(true);
    } else {
      openPlanRequest(plan._id);
    }
  }
  // prices/bullets are populated server-side, so duration/text are objects, not ids
  const sortedPrices = [...plan.prices].sort((a, b) => {
    const aMonths = typeof a.duration === "object" ? (a.duration as PlanDuration).months : 0;
    const bMonths = typeof b.duration === "object" ? (b.duration as PlanDuration).months : 0;
    return aMonths - bMonths;
  });
  const primary = sortedPrices[0];
  const alternates = sortedPrices.slice(1);

  const bullets = (plan.bullets as (string | PlanBullet)[]).filter(
    (b): b is PlanBullet => typeof b === "object"
  );

  return (
    <div
      className="plan-card"
      style={{
        background: "#ffffff",
        border: plan.mostPopular ? "1px solid rgba(204,0,0,0.3)" : "1px solid rgba(20,33,61,0.08)",
        padding: "36px 28px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 16px 36px rgba(20, 33, 61, 0.06)",
      }}
    >
      {plan.mostPopular && (
        <div style={{ position: "absolute", top: "-1px", right: "24px" }}>
          <div style={{ background: "linear-gradient(135deg, #CC0000, #880000)", padding: "6px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Star size={11} fill="white" color="white" />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "11px", color: "white", letterSpacing: "1px", textTransform: "uppercase" }}>
              Most Popular
            </span>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#667085" }}>
          {plan.name}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <Zap size={16} color="#CC0000" />
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: plan.mostPopular ? "#FF3333" : "#CC0000", letterSpacing: "1px" }}>
          {plan.speed} {plan.speedUnit}
        </span>
      </div>

      {primary && (
        <div style={{ marginBottom: "12px" }}>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "48px", color: "#152238", letterSpacing: "1px" }}>
            ₹{primary.price}
          </span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#667085" }}>
            /{typeof primary.duration === "object" ? (primary.duration as PlanDuration).label : ""}
          </span>
        </div>
      )}

      {alternates.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {alternates.map((p, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#667085",
                background: "#F2F4F7",
                borderRadius: "999px",
                padding: "4px 10px",
              }}
            >
              ₹{p.price}/{typeof p.duration === "object" ? (p.duration as PlanDuration).label : ""}
            </span>
          ))}
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {bullets.map((b) => (
          <div key={b._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Check size={14} color="#CC0000" strokeWidth={3} />
            <span style={{ fontSize: "13px", color: "#475467" }}>{b.text}</span>
          </div>
        ))}
      </div>

      {plan.ottList && plan.ottList.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {plan.ottList.map((ott, i) => (
            <div
              key={i}
              title={ott.name}
              style={{ width: "32px", height: "32px", borderRadius: "6px", overflow: "hidden", background: "#F2F4F7", border: "1px solid rgba(20,33,61,0.06)" }}
            >
              {ott.image && (
                <Image src={ott.image} alt={ott.name} width={32} height={32} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              )}
            </div>
          ))}
        </div>
      )}

      {showRenew ? (
        <Link
          href="/renew"
          className="btn-primary"
          style={{ textDecoration: "none", display: "block", textAlign: "center" }}
        >
          Renew Now
        </Link>
      ) : (
        <button
          onClick={handleGetPlan}
          className={plan.mostPopular ? "btn-primary" : "btn-outline"}
          style={{ display: "block", width: "100%", textAlign: "center", border: plan.mostPopular ? "none" : undefined, cursor: "pointer" }}
        >
          {isExistingCustomer ? "Upgrade To This Plan" : "Get Started"}
        </button>
      )}

      <UpgradePlanModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        planId={plan._id}
        planName={plan.name}
        planSpeed={plan.speed}
        planSpeedUnit={plan.speedUnit}
      />
    </div>
  );
}