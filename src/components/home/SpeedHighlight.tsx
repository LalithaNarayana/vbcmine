"use client";
import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Zap, X } from "lucide-react";

const ottPlans = [
  {
    speed: "30 Mbps",
    price: 499,
    otts: 20,
    popular: false,
    ottImage: "ott1.jpg",
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
    popular: false,
    ottImage: "ott2.jpg",
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
    otts: 30,
    popular: true,
    ottImage: "ott3.jpg",
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
    popular: false,
    ottImage: "ott3.jpg",
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
    popular: false,
    ottImage: "ott3.jpg",
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
    popular: false,
    ottImage: "ott3.jpg",
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
    popular: false,
    ottImage: "ott3.jpg",
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
    popular: false,
    ottImage: "ott3.jpg",
    features: [
      "30 OTT Apps",
      "Unlimited Data",
      "6+1 or 12+2 Months Offer",
      "Router & Installation Free (6/12 months)",
      "Non-refundable installation: ₹1500 (monthly)",
    ],
  },
];

export function SpeedHighlight() {
  const [ottPopupIndex, setOttPopupIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "#14213D",
        padding: "110px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 350,
          background: "radial-gradient(ellipse, rgba(204,0,0,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: 14,
            }}
          >
            Internet + OTT Plans
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(52px, 7vw, 88px)",
              letterSpacing: 2,
              lineHeight: 0.95,
              marginBottom: 24,
              color: "#FFFFFF",
            }}
          >
            FIBER SPEED{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              +
            </span>{" "}
            OTT BUNDLE
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#becada",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            High-speed unlimited fiber internet bundled with your favourite OTT streaming apps — all in one plan.
          </p>
        </div>

        {/* Offer banner */}
        <div
          style={{
            background: "rgba(204,0,0,0.1)",
            border: "1px solid rgba(204,0,0,0.25)",
            borderRadius: 10,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            maxWidth: 800,
            margin: "0 auto 48px",
          }}
        >
          <Zap size={18} color="#CC0000" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#becada",
            }}
          >
            6+1 or 12+2 months offer available. Router &amp; Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans. GST @18% extra.
          </span>
        </div>

        {/* Plan Cards */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
              alignItems: "start",
              maxWidth: 1320,
            }}
          >
            {ottPlans.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: plan.popular
                    ? "linear-gradient(135deg, #1a0505 0%, #2a0808 100%)"
                    : "rgba(255,255,255,0.04)",
                  border: plan.popular
                    ? "2px solid #CC0000"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "32px 24px",
                  position: "relative",
                  boxShadow: plan.popular
                    ? "0 24px 60px rgba(204,0,0,0.25)"
                    : "0 4px 20px rgba(0,0,0,0.2)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = plan.popular
                    ? "0 32px 80px rgba(204,0,0,0.35)"
                    : "0 20px 60px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = plan.popular
                    ? "0 24px 60px rgba(204,0,0,0.25)"
                    : "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -13,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #CC0000, #E43B2C)",
                      color: "#fff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: 2,
                      padding: "4px 18px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 16px rgba(204,0,0,0.5)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Speed */}
                <div
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 36,
                    color: "#fff",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  {plan.speed}
                </div>

                {/* OTT count — clickable to open popup */}
                <button
                  onClick={() => setOttPopupIndex(i)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "block",
                    marginBottom: 16,
                  }}
                  title="Click to see OTT apps"
                >
                  <span
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#ff0000",
                      letterSpacing: 1,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationStyle: "dotted",
                    }}
                  >
                    {plan.otts} OTT Apps 🎬
                  </span>
                </button>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    ₹
                  </span>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 52,
                      color: "#fff",
                      letterSpacing: 1,
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    /mo
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: plan.popular
                      ? "rgba(204,0,0,0.3)"
                      : "rgba(255,255,255,0.08)",
                    marginBottom: 20,
                  }}
                />

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0" }}>
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        marginBottom: 10,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle
                        size={14}
                        color="#CC0000"
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#CC0000",
                    color: "#fff",
                    border: plan.popular ? "none" : "1px solid rgba(204,0,0,0.6)",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "12px 20px",
                    borderRadius: 10,
                    transition: "all 0.2s",
                    boxShadow: plan.popular ? "0 6px 20px rgba(204,0,0,0.4)" : "none",
                  }}
                >
                  Get This Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* View all plans link */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/plans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#CC0000",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#ffffff",
              textDecoration: "none",
              padding: "12px 32px",
              borderRadius: 999,
              border: "1px solid rgba(204,0,0,0.4)",
              transition: "all 0.2s",
            }}
          >
            View All Plans
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* OTT Popup Modal */}
      {ottPopupIndex !== null && (
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
          onClick={() => setOttPopupIndex(null)}
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
            {/* Close button — fixed: was calling stopPropagation instead of closing */}
            <button
              onClick={() => setOttPopupIndex(null)}
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

            {/* Image — uses per-plan ottImage filename */}
            <img
              src={`/images/${ottPlans[ottPopupIndex].ottImage}`}
              alt="OTT Apps included"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const parent = (e.currentTarget as HTMLImageElement).parentElement;
                if (parent) {
                  parent.style.background = "#14213D";
                  parent.style.padding = "60px 40px";
                  parent.innerHTML = `<div style="text-align:center;color:#fff;font-family:'Rajdhani',sans-serif;font-size:20px;">Image not found.</div>`;
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── WHY VBC ICONS ────────────────────────────────────────────────────────
const whyIcons: Record<string, JSX.Element> = {
  lightning: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  tv: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  film: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  headset: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  globe: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const whyItems = [
  { img: "/images/why1.jpeg", iconKey: "lightning", title: "Lightning Fast Speeds", desc: "True fiber-optic infrastructure with symmetric upload and download speeds — no throttling, no fair usage caps." },
  { img: "/images/why2.jpeg", iconKey: "shield", title: "99.9% Uptime SLA", desc: "Our redundant network architecture and 24/7 NOC monitoring guarantee near-zero downtime for homes and businesses." },
  { img: "/images/why4.jpeg", iconKey: "film", title: "21+ OTT Platforms", desc: "Disney+ Hotstar, Sony LIV, ZEE5, Aha, Sun NXT, Amazon Prime and more — bundled at no extra subscription cost." },
  { img: "/images/why5.png", iconKey: "headset", title: "24/7 Expert Support", desc: "Our local Vizag-based support team is available round the clock via phone, WhatsApp, and in-person visits." },
  { img: "/images/why6.jpeg", iconKey: "globe", title: "State-wide coverage", desc: "50+ zones across Visakhapatnam covered with our fiber backbone — expanding every quarter to new areas." },
  { img: "/images/why3.jpeg", iconKey: "tv", title: "Home Connection", desc: "Fast fiber internet for your home with free installation and same-day activation. Symmetric speeds, no throttling, no hidden charges." },
  { img: "/images/why7.jpeg", iconKey: "lightning", title: "Business Connection", desc: "Dedicated leased lines, static IPs, and SLA-backed plans tailored for businesses. Priority support and guaranteed uptime around the clock." },
  { img: "/images/why8.png", iconKey: "shield", title: "Bulk / Apartments", desc: "Special group packages for apartments, hostels, and commercial complexes. One connection, whole building — managed effortlessly." },
];

export function WhyVBC() {
  return (
    <section style={{ background: "#14213D", padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, background: "radial-gradient(circle, rgba(204,0,0,0.09) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, background: "radial-gradient(circle, rgba(204,0,0,0.06) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 22, letterSpacing: 4, textTransform: "uppercase",
            color: "#CC0000", marginBottom: 14,
          }}>Why Choose Us</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 7vw, 88px)",
            letterSpacing: 2, lineHeight: 0.95, marginBottom: 24, color: "#FFFFFF",
          }}>
            THE{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>VBC</span>
            {" "}DIFFERENCE
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#becada", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8 }}>
            14+ years of delivering Vizag&apos;s most trusted fiber broadband experience.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 26 }}>
          {whyItems.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative", borderRadius: 20, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                cursor: "default", minHeight: 300,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 28px 60px rgba(0,0,0,0.55)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <img src={item.img} alt="" aria-hidden="true"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.80 }}
                onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(46, 56, 78, 0.68) 0%, rgba(8, 14, 28, 0.59) 100%)" }} />

              <div style={{
                position: "relative", zIndex: 1,
                padding: "44px 30px 40px",
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 68, height: 68, borderRadius: 18,
                  background: "rgba(255,255,255,0.94)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
                  marginBottom: 24,
                }}>
                  {whyIcons[item.iconKey]}
                </div>

                <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 18 }} />

                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20,
                  letterSpacing: 1, textTransform: "uppercase", color: "#F0F4F8", marginBottom: 14,
                }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#dee8ff", lineHeight: 1.8 }}>{item.desc}</p>

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}