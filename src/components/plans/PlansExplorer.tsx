"use client";

import { useState } from "react";
import { CheckCircle, Zap, X } from "lucide-react";
import AppIcon from "@/components/admin/DynamicIcon";
import { usePlanRequest } from "./PlanRequestProvider";
import type { PlanCategory, Plan, PlanDuration, PlanBullet } from "@/types/plan";

interface PlansExplorerProps {
  categories: PlanCategory[];
  plansByCategory: Record<string, Plan[]>;
  topTagline?: string;
  bottomTagline?: string;
}

function primaryPrice(plan: Plan): number | null {
  const sorted = [...plan.prices].sort((a, b) => {
    const aM = typeof a.duration === "object" ? (a.duration as PlanDuration).months : 0;
    const bM = typeof b.duration === "object" ? (b.duration as PlanDuration).months : 0;
    return aM - bM;
  });
  return sorted[0] ? sorted[0].price : null;
}

function bulletTexts(plan: Plan): string[] {
  return (plan.bullets as (string | PlanBullet)[])
    .filter((b): b is PlanBullet => typeof b === "object")
    .map((b) => b.text);
}

export default function PlansExplorer({ categories, plansByCategory, topTagline, bottomTagline }: PlansExplorerProps) {
  const { openPlanRequest } = usePlanRequest();
  const [activeTab, setActiveTab] = useState(categories[0]?._id || "");
  const [ottPopup, setOttPopup] = useState<{ name: string; image: string } | null>(null);

  if (categories.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#98A2B3", padding: "60px 0" }}>
        Plans are being updated. Please check back shortly.
      </p>
    );
  }

  const activeCategory = categories.find((c) => c._id === activeTab) || categories[0];
  const activePlans = plansByCategory[activeCategory._id] || [];

  return (
    <div>
      {/* Tabs */}
      <div style={{ position: "sticky", top: 64, zIndex: 10, background: "#fff", borderBottom: "2px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => { setActiveTab(cat._id); setOttPopup(null); }}
              style={{
                padding: "16px 32px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 0.5,
                color: activeCategory._id === cat._id ? "#CC0000" : "#667085",
                borderBottom: activeCategory._id === cat._id ? "3px solid #CC0000" : "3px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                marginBottom: -2,
              }}
            >
              <AppIcon name={cat.icon} size={20} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <section style={{ padding: "60px 0 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Site-wide top tagline — matches reference design (light red banner w/ lightning icon) */}
          {topTagline && (
            <div
              style={{
                background: "rgba(204,0,0,0.05)",
                border: "1px solid rgba(204,0,0,0.15)",
                borderRadius: 8,
                padding: "14px 20px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Zap size={18} color="#CC0000" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475467" }}>
                {topTagline}
              </span>
            </div>
          )}

          {/* Offer banner */}
          {activeCategory.description && (
            <div
              style={{
                background: "rgba(204,0,0,0.05)",
                border: "1px solid rgba(204,0,0,0.15)",
                borderRadius: 8,
                padding: "14px 20px",
                marginBottom: 40,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Zap size={18} color="#CC0000" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475467" }}>
                {activeCategory.description}
              </span>
            </div>
          )}

          {activePlans.length === 0 ? (
            <p style={{ textAlign: "center", color: "#98A2B3", padding: "40px 0" }}>
              No plans in this category yet.
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              {activePlans.map((plan) => {
                const price = primaryPrice(plan);
                const features = bulletTexts(plan);
                const ott = plan.ottList && plan.ottList.length > 0 ? plan.ottList[0] : null;
                const popular = plan.mostPopular;

                return (
                  <div
                    key={plan._id}
                    className="plan-tile"
                    style={{
                      background: popular ? "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)" : "#fff4f4",
                      border: popular ? "2px solid #CC0000" : "1px solid rgba(20,33,61,0.1)",
                      borderRadius: 16,
                      padding: "32px 28px",
                      position: "relative",
                      boxShadow: popular ? "0 20px 60px rgba(204,0,0,0.15)" : "0 4px 20px rgba(20,33,61,0.06)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    {popular && (
                      <div
                        style={{
                          position: "absolute",
                          top: -12,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#CC0000",
                          color: "#fff",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: 1.5,
                          padding: "4px 16px",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                          textTransform: "uppercase",
                        }}
                      >
                        Most Popular
                      </div>
                    )}

                    <div
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 32,
                        color: popular ? "#fff" : "#14213D",
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}
                    >
                      {plan.name}
                    </div>

                    {ott && (
                      <button
                        onClick={() => setOttPopup(ott)}
                        title="Click to see OTT apps"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          display: "block",
                          marginBottom: 8,
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#CC0000",
                            letterSpacing: 1,
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                            textDecorationStyle: "dotted",
                          }}
                        >
                          {ott.name}
                        </span>
                      </button>
                    )}

                    {price !== null && (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: popular ? "rgba(255,255,255,0.6)" : "#667085" }}>₹</span>
                        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 52, color: popular ? "#fff" : "#14213D", letterSpacing: 1, lineHeight: 1 }}>{price}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: popular ? "rgba(255,255,255,0.5)" : "#9CA3AF" }}>/mo</span>
                      </div>
                    )}

                    <div style={{ height: 1, background: popular ? "rgba(255,255,255,0.1)" : "rgba(20,33,61,0.08)", marginBottom: 20 }} />

                    {features.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                        {features.map((f, j) => (
                          <li
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 10,
                              marginBottom: 10,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13,
                              color: popular ? "rgba(255,255,255,0.8)" : "#475467",
                              lineHeight: 1.5,
                            }}
                          >
                            <CheckCircle size={14} color="#CC0000" style={{ marginTop: 2, flexShrink: 0 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      onClick={() => openPlanRequest(plan._id)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "center",
                        background: popular ? "#CC0000" : "transparent",
                        color: popular ? "#fff" : "#CC0000",
                        border: popular ? "none" : "1px solid #CC0000",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        padding: "12px 20px",
                        borderRadius: 8,
                        transition: "all 0.2s",
                        cursor: "pointer",
                      }}
                    >
                      Get This Plan
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 40 }}>
            *{" "}
            {bottomTagline ||
              "Prices shown are the starting monthly price for this plan. GST and any applicable installation charges are additional — contact us for full details."}
          </p>
        </div>
      </section>

      {/* OTT Apps Image Popup */}
      {ottPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setOttPopup(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: 700,
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOttPopup(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <X size={18} />
            </button>

            {ottPopup.image ? (
              <img
                src={ottPopup.image}
                alt={ottPopup.name}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              />
            ) : (
              <div style={{ background: "#14213D", padding: "60px 40px", textAlign: "center" }}>
                <p style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontSize: 20, margin: 0 }}>{ottPopup.name}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .plan-tile:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  );
}