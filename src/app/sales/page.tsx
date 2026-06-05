"use client";
import { useState } from "react";
import Link from "next/link";

const connectionTypes = [
  {
    emoji: "🏠",
    title: "Home Connection",
    subtitle: "For Families & Individuals",
    desc: "Fast fiber internet for your home with free installation and same-day activation. Symmetric speeds, no throttling, no hidden charges.",
    features: ["Free Installation", "Same-Day Activation", "24/7 Support", "No Fair Usage Policy"],
    bg: "/images/sales1.png",
    accent: "#CC0000",
    popular: false,
  },
  {
    emoji: "🏢",
    title: "Business Connection",
    subtitle: "For Offices & Enterprises",
    desc: "Dedicated leased lines, static IPs, and SLA-backed plans tailored for businesses. Priority support and guaranteed uptime for critical operations.",
    features: ["Dedicated Leased Line", "Static IP Included", "SLA Guarantee", "Priority Support"],
    bg: "/images/sales2.png",
    accent: "#CC0000",
    popular: true,
  },
  {
    emoji: "🏗️",
    title: "Bulk / Apartments",
    subtitle: "For Complexes & Hostels",
    desc: "Special group packages for apartments, hostels, and commercial complexes. One connection, whole building — managed effortlessly.",
    features: ["Building-Wide Coverage", "Centralized Billing", "Multi-Unit Discounts"],
    bg: "/images/sales3.png",
    accent: "#CC0000",
    popular: false,
  },
];

const whyCards = [
  { icon: "⚡", title: "Lightning Fast", desc: "Speeds up to 1 Gbps over pure fiber optic — no copper, no compromise." },
  { icon: "🛡️", title: "99.9% Uptime SLA", desc: "Redundant network with 24/7 NOC monitoring for near-zero downtime." },
  { icon: "📺", title: "550+ Live Channels", desc: "HD/4K IPTV bundled with your connection at no extra cost." },
  { icon: "🎬", title: "21+ OTT Platforms", desc: "Disney+ Hotstar, Prime, ZEE5, Sony LIV & more included free." },
  { icon: "🛠️", title: "Free Installation", desc: "Professional fiber installation at zero charge with same-day setup." },
  { icon: "📞", title: "24/7 Local Support", desc: "Vizag-based engineers available round the clock via call or WhatsApp." },
];

function ConnectionCard({ card, index }: { card: typeof connectionTypes[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        background: "#fff",
        border: card.popular
          ? "2px solid #CC0000"
          : hovered ? "2px solid rgba(204,0,0,0.3)" : "2px solid #F0F0F0",
        boxShadow: hovered
          ? "0 28px 64px rgba(204,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Popular badge */}
      {card.popular && (
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          background: "#CC0000", color: "#fff",
          padding: "5px 22px", borderRadius: "0 0 14px 14px",
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
          zIndex: 3,
        }}>
          Most Popular
        </div>
      )}

      {/* Image area with texture */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {/* bg image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${card.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s ease",
          filter: "brightness(0.45)",
        }} />
        {/* noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }} />
        {/* gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(204,0,0,0.25) 0%, rgba(20,33,61,0.6) 100%)",
        }} />
        {/* emoji + subtitle */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{ fontSize: 52, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>
            {card.emoji}
          </span>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}>
            {card.subtitle}
          </span>
        </div>
        {/* bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
          background: "linear-gradient(to top, #fff, transparent)",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* accent line */}
        <div style={{
          width: 40, height: 3,
          background: "linear-gradient(90deg, #CC0000, rgba(204,0,0,0.2))",
          borderRadius: 2, marginBottom: 16,
        }} />

        <h3 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 32, letterSpacing: 1.5,
          color: "#14213D", marginBottom: 12,
        }}>
          {card.title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14.5, color: "#667085", lineHeight: 1.75,
          marginBottom: 22,
        }}>
          {card.desc}
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {card.features.map((f) => (
            <span key={f} style={{
              background: "#FFF5F5",
              border: "1px solid rgba(204,0,0,0.15)",
              borderRadius: 999,
              padding: "4px 14px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 600, color: "#CC0000",
            }}>
              ✓ {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "auto" }}>
          <Link
            href="/contact"
            style={{
              display: "block", textAlign: "center",
              background: card.popular
                ? "#CC0000"
                : hovered ? "#CC0000" : "#14213D",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: 14,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: 14, letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s, box-shadow 0.25s",
              boxShadow: hovered ? "0 8px 24px rgba(204,0,0,0.35)" : "none",
            }}
          >
            Enquire Now →
          </Link>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        height: 4,
        background: card.popular || hovered
          ? "linear-gradient(90deg, #CC0000, #ff6b6b, #CC0000)"
          : "linear-gradient(90deg, #E4E7EC, transparent)",
        transition: "background 0.35s",
      }} />
    </div>
  );
}

function WhyCard({ card }: { card: typeof whyCards[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#14213D" : "#fff",
        border: "1px solid",
        borderColor: hovered ? "transparent" : "#EEF2F6",
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: hovered ? "0 16px 48px rgba(20,33,61,0.18)" : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex", flexDirection: "column", gap: 12,
      }}
    >
      <span style={{ fontSize: 34 }}>{card.icon}</span>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
        fontSize: 17, color: hovered ? "#fff" : "#14213D",
        transition: "color 0.3s",
      }}>
        {card.title}
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
        color: hovered ? "rgba(255,255,255,0.7)" : "#667085",
        lineHeight: 1.7, transition: "color 0.3s",
      }}>
        {card.desc}
      </p>
    </div>
  );
}

export default function SalesPage() {
  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #14213D 0%, #1a0a0a 100%)",
        padding: "100px 24px 90px",
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 360,
          background: "radial-gradient(ellipse, rgba(204,0,0,0.2) 0%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(204,0,0,0.15)",
            border: "1px solid rgba(204,0,0,0.4)",
            borderRadius: 999, padding: "6px 22px", marginBottom: 22,
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
            color: "#FF8080",
          }}>
            New Connections
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 8vw, 100px)",
            letterSpacing: 2, lineHeight: 0.92,
            color: "#fff", marginBottom: 22,
          }}>
            GET A NEW{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              CONNECTION
            </span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.8,
          }}>
            Ready to switch to VBC ON FIBER? Our sales team will get you connected quickly with zero hassle.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["Free Installation", "Same-Day Activation", "Zero Lock-In"].map((t) => (
              <span key={t} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999, padding: "6px 18px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, color: "rgba(255,255,255,0.75)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connection Type Cards ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: 4, textTransform: "uppercase",
            color: "#CC0000", marginBottom: 12,
          }}>Choose Your Connection Type</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(40px, 5vw, 64px)",
            letterSpacing: 2, color: "#14213D",
          }}>
            PLANS FOR EVERY NEED
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28, alignItems: "start",
        }}>
          {connectionTypes.map((card, i) => (
            <ConnectionCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>
      
      {/* ── Bottom CTA ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          borderRadius: 24,
          background: "linear-gradient(135deg, #14213D 0%, #2a0808 100%)",
          border: "1px solid rgba(204,0,0,0.2)",
          padding: "56px 48px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: 28, flexWrap: "wrap",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -80, top: -80,
            width: 320, height: 320,
            background: "radial-gradient(circle, rgba(204,0,0,0.14) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
              color: "#CC0000", marginBottom: 10,
            }}>Talk to Our Team</p>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: 44,
              letterSpacing: 2, color: "#fff", marginBottom: 10,
            }}>
              NOT SURE WHICH PLAN FITS?
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.6)", maxWidth: 480,
            }}>
              Our sales experts in Visakhapatnam will help you pick the right plan for your home or business — free consultation, zero pressure.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <Link href="/contact" style={{
              background: "#CC0000", color: "#fff",
              padding: "14px 32px", borderRadius: 14,
              textDecoration: "none",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: 15, letterSpacing: 1.5,
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(204,0,0,0.4)",
            }}>
              Contact Sales →
            </Link>
            <Link href="/plans" style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "14px 32px", borderRadius: 14,
              textDecoration: "none",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: 15, letterSpacing: 1.5,
              textTransform: "uppercase",
            }}>
              Browse Plans
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}