"use client";
import { useState } from "react";
import Link from "next/link";
import { broadbandPlans, tvPlans, comboPlans } from "@/constants/plans";
import { Check, Zap, Star } from "lucide-react";

type Tab = "broadband" | "tv" | "combo";

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>("broadband");

  const planMap = { broadband: broadbandPlans, tv: tvPlans, combo: comboPlans };
  const plans = planMap[activeTab];

  return (
    <div style={{ paddingTop: "0px", background: "#ffffff", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(180deg, #fff7f5 0%, #ffffff 100%)",
          textAlign: "center",
        }}
      >
        <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Plans & Pricing</div>
        <h1
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(50px, 8vw, 90px)",
            letterSpacing: "2px",
            color: "#152238",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          SIMPLE, TRANSPARENT
          <br />
          <span style={{ color: "#CC0000" }}>PRICING</span>
        </h1>
        <p style={{ color: "#475467", fontSize: "15px", maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          No contracts. No hidden fees. Just blazing fast internet and crystal-clear TV at prices that make sense.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "inline-flex",
            background: "#ffffff",
            border: "1px solid rgba(204,0,0,0.16)",
            padding: "4px",
            gap: "4px",
          }}
        >
          {(["broadband", "tv", "combo"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 28px",
                background: activeTab === tab ? "#CC0000" : "transparent",
                color: activeTab === tab ? "white" : "#475467",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                transition: "all 0.2s",
                clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              }}
            >
              {tab === "broadband" ? "🌐 Broadband" : tab === "tv" ? "📺 TV / IPTV" : "⚡ Combo"}
            </button>
          ))}
        </div>
      </section>

      {/* Plans Grid */}
      <section style={{ padding: "40px 24px 100px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="plan-card glass-card"
              style={{
                background: "#2e2e2e",
                border: plan.popular ? "1px solid rgba(204,0,0,0.55)" : "1px solid #242424",
                padding: "36px 28px",
                position: "relative",
                boxShadow: plan.popular ? "0 22px 48px rgba(204, 0, 0, 0.18)" : "0 18px 42px rgba(0, 0, 0, 0.18)",
              }}
            >
              {/* Popular badge */}
              {plan.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: plan.popular ? "#CC0000" : "#1F1F1F",
                    color: "white",
                    border: plan.popular ? "none" : "1px solid #333333",
                    padding: "4px 20px",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  {plan.popular && <Star size={10} fill="white" />} {plan.tag}
                </div>
              )}

              {/* Plan name */}
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#CC0000",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {plan.name}
              </div>

              {/* Speed/Channel */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(36px,4vw,48px)",
                  letterSpacing: "2px",
                  color: "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Zap size={24} color="#CC0000" />
                {plan.speed}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "24px", marginTop: "16px" }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(40px,5vw,56px)",
                    color: plan.popular ? "#FF3333" : "#CC0000",
                    letterSpacing: "1px",
                  }}
                >
                  ₹{plan.price}
                </span>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#A7AEB8", marginLeft: "6px" }}>
                  / {plan.duration}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />

              {/* Features */}
              <ul style={{ listStyle: "none", marginBottom: "28px" }}>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "7px 0",
                      color: "#D7DCE3",
                      fontSize: "13px",
                      borderBottom: i < plan.features.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <Check size={14} color="#CC0000" style={{ flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/login"
                className={plan.popular ? "btn-primary" : "btn-outline"}
                style={{ display: "block", textDecoration: "none", textAlign: "center" }}
              >
                {plan.popular ? "Get This Plan" : "Select Plan"}
              </Link>
            </div>
          ))}
        </div>

        {/* Annual note */}
        <div style={{ maxWidth: "1280px", margin: "40px auto 0", textAlign: "center" }}>
          <p style={{ color: "#475467", fontSize: "13px" }}>
            💡 Annual plans available with up to 2 months FREE. Contact us or log into your account for long-term pricing.
          </p>
        </div>
      </section>
    </div>
  );
}
