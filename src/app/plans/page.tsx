"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Zap, Tv, Wifi } from "lucide-react";

const planCategories = [
  {
    id: "internet",
    label: "Only Internet",
    icon: <Wifi size={20} />,
    tagline: "Pure fiber speed, no extras",
    accentColor: "#CC0000",
    plans: [
      {
        speed: "40 Mbps",
        price: 399,
        features: [
          "Unlimited Data",
          "24/7 Support",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "50 Mbps",
        price: 599,
        features: [
          "Unlimited Data",
          "24/7 Support",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "100 Mbps",
        price: 699,
        popular: true,
        features: [
          "Unlimited Data",
          "24/7 Support",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "150 Mbps",
        price: 899,
        features: [
          "Unlimited Data",
          "24/7 Support",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
    ],
    offer: "6+1 or 12+2 months offer available. Router & Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans.",
  },
  {
    id: "ott",
    label: "Internet + OTT",
    icon: <Tv size={20} />,
    tagline: "Internet + streaming apps bundled",
    accentColor: "#0055CC",
    plans: [
      {
        speed: "30 Mbps",
        price: 499,
        otts: 20,
        features: [
          "20 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "50 Mbps",
        price: 599,
        otts: 27,
        features: [
          "27 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "100 Mbps",
        price: 799,
        popular: true,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "150 Mbps",
        price: 899,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "200 Mbps",
        price: 999,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "300 Mbps",
        price: 1499,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "500 Mbps",
        price: 1999,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "1 Gbps",
        price: 3999,
        otts: 30,
        features: [
          "30 OTT Apps",
          "Unlimited Data",
          "6+1 or 12+2 Months Offer",
          "Router & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
    ],
    offer: "6+1 or 12+2 months offer available. Router & Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans.",
  },
  {
    id: "catv",
    label: "Internet + CATV",
    icon: <Tv size={20} />,
    tagline: "Internet + Cable TV combo",
    accentColor: "#006633",
    plans: [
      {
        speed: "50 Mbps + SD",
        price: 599,
        features: [
          "SD Cable TV",
          "Unlimited Internet",
          "6+1 or 12+2 Months Offer",
          "Set-top box & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "100 Mbps + HD",
        price: 799,
        popular: true,
        features: [
          "HD Cable TV",
          "Unlimited Internet",
          "6+1 or 12+2 Months Offer",
          "Set-top box & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "150 Mbps + HD",
        price: 899,
        features: [
          "HD Cable TV",
          "Unlimited Internet",
          "6+1 or 12+2 Months Offer",
          "Set-top box & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
      {
        speed: "200 Mbps + HD",
        price: 999,
        features: [
          "HD Cable TV",
          "Unlimited Internet",
          "6+1 or 12+2 Months Offer",
          "Set-top box & Installation Free (6/12 months)",
          "Non-refundable installation: ₹1500 (monthly)",
        ],
      },
    ],
    offer: "6+1 or 12+2 months offer available. Set-top box & Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans.",
  },
];

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState("internet");
  const active = planCategories.find((c) => c.id === activeTab)!;

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "80px 24px 40px", background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 60%, #f7fafc 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 16, fontSize: 13 }}>Broadband Plans</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px, 7vw, 88px)", letterSpacing: 2, color: "#14213D", lineHeight: 0.95, marginBottom: 20 }}>
            PLANS & <span style={{ color: "#CC0000" }}>PRICING</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#667085", lineHeight: 1.8, marginBottom: 24 }}>
            Choose your perfect plan. All prices per month. <strong>GST @18% extra.</strong>
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ position: "sticky", top: 64, zIndex: 10, background: "#fff", borderBottom: "2px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 0 }}>
          {planCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "16px 32px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 0.5,
                color: activeTab === cat.id ? "#CC0000" : "#667085",
                borderBottom: activeTab === cat.id ? "3px solid #CC0000" : "3px solid transparent",
                display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.2s",
                marginBottom: -2,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Offer banner */}
          <div style={{ background: "rgba(204,0,0,0.05)", border: "1px solid rgba(204,0,0,0.15)", borderRadius: 8, padding: "14px 20px", marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
            <Zap size={18} color="#CC0000" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#475467" }}>{active.offer}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {active.plans.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: plan.popular ? "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)" : "#fff4f4",
                  border: plan.popular ? "2px solid #CC0000" : "1px solid rgba(20,33,61,0.1)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  position: "relative",
                  boxShadow: plan.popular ? "0 20px 60px rgba(204,0,0,0.15)" : "0 4px 20px rgba(20,33,61,0.06)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}
              >
                {plan.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#CC0000", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.5, padding: "4px 16px", borderRadius: 999, whiteSpace: "nowrap", textTransform: "uppercase" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: plan.popular ? "#fff" : "#14213D", letterSpacing: 1, marginBottom: 4 }}>
                  {plan.speed}
                </div>
                {"otts" in plan && (
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: "#CC0000", letterSpacing: 1, marginBottom: 8 }}>
                    {(plan as { otts: number }).otts} OTT Apps Included
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.6)" : "#667085" }}>₹</span>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 52, color: plan.popular ? "#fff" : "#14213D", letterSpacing: 1, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.5)" : "#9CA3AF" }}>/mo</span>
                </div>
                <div style={{ height: 1, background: plan.popular ? "rgba(255,255,255,0.1)" : "rgba(20,33,61,0.08)", marginBottom: 20 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: plan.popular ? "rgba(255,255,255,0.8)" : "#475467", lineHeight: 1.5 }}>
                      <CheckCircle size={14} color="#CC0000" style={{ marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: plan.popular ? "#CC0000" : "transparent",
                    color: plan.popular ? "#fff" : "#CC0000",
                    border: plan.popular ? "none" : "1px solid #CC0000",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "12px 20px",
                    borderRadius: 8,
                    transition: "all 0.2s",
                  }}
                >
                  Get This Plan
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 40 }}>
            * All prices are exclusive of GST @18%. Non-refundable installation charges: ₹1500 (for monthly plans). For 6/12 month plans, router & installation charges free — confirm at time of booking.
          </p>
        </div>
      </section>
    </div>
  );
}
