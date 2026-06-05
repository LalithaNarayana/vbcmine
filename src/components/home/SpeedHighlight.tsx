"use client";
import type { JSX } from "react";

const plans = [
  {
    name: "Starter", price: "₹399", speed: "30 Mbps", color: "#94A3B8",
    ott: { "Aha": true, "Sun NXT": true, "Hungama Play": true, "Epic ON": true, "ShemarooMe": true, "Disney+ Hotstar": false, "Sony LIV": false, "ZEE5": false, "Amazon Prime": false, "Lionsgate Play": false, "IPTV 550+": false },
  },
  {
    name: "Silver", price: "₹599", speed: "50 Mbps", color: "#7EC8E3",
    ott: { "Aha": true, "Sun NXT": true, "Hungama Play": true, "Epic ON": true, "ShemarooMe": true, "Disney+ Hotstar": true, "Sony LIV": true, "ZEE5": true, "Amazon Prime": false, "Lionsgate Play": true, "IPTV 550+": false },
  },
  {
    name: "Gold", price: "₹699", speed: "75 Mbps", color: "#F5A623", popular: true,
    ott: { "Aha": true, "Sun NXT": true, "Hungama Play": true, "Epic ON": true, "ShemarooMe": true, "Disney+ Hotstar": true, "Sony LIV": true, "ZEE5": true, "Amazon Prime": false, "Lionsgate Play": true, "IPTV 550+": false },
  },
  {
    name: "Premium", price: "₹799", speed: "100 Mbps", color: "#E05C5C",
    ott: { "Aha": true, "Sun NXT": true, "Hungama Play": true, "Epic ON": true, "ShemarooMe": true, "Disney+ Hotstar": true, "Sony LIV": true, "ZEE5": true, "Amazon Prime": true, "Lionsgate Play": true, "IPTV 550+": true },
  },
  {
    name: "Ultimate", price: "₹999", speed: "200 Mbps", color: "#CC0000",
    ott: { "Aha": true, "Sun NXT": true, "Hungama Play": true, "Epic ON": true, "ShemarooMe": true, "Disney+ Hotstar": true, "Sony LIV": true, "ZEE5": true, "Amazon Prime": true, "Lionsgate Play": true, "IPTV 550+": true },
  },
];

const ottColumns = ["Aha","Sun NXT","Hungama Play","Epic ON","ShemarooMe","Disney+ Hotstar","Sony LIV","ZEE5","Amazon Prime","Lionsgate Play","IPTV 550+"];

const ottLogos: Record<string, string> = {
  "Aha": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Aha_OTT_Logo.svg",
  "Sun NXT": "https://cdn.brandfetch.io/id_KZi_KXq/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  "Hungama Play": "https://play-lh.googleusercontent.com/-3gyIwChvq6I8Ra9AJzm9txK49ttPpolPimdR79szZXy-wFLWlt8Rrwb3FQhx_fMnciI",
  "Epic ON": "https://cdn.brandfetch.io/idp2z3BuPu/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  "ShemarooMe": "https://image.pngaaa.com/593/7139593-middle.png",
  "Disney+ Hotstar": "https://cdn.brandfetch.io/idh5Jct7tV/w/3840/h/2811/theme/light/idRhWuwdh-.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "Sony LIV": "https://cdn.brandfetch.io/idzv1z05h1/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  "ZEE5": "https://cdn.brandfetch.io/idG83-n-Gw/w/512/h/512/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
  "Amazon Prime": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Amazon_Prime_Video_blue_logo_1.svg",
  "Lionsgate Play": "https://cdn.brandfetch.io/idetipNrU2/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  "IPTV 550+": "https://play-lh.googleusercontent.com/qVBLymJyAWhGFYUKlGS3pvXmKrLRu3D19YnJSumDcYLypXWvKoZ9qceaKJhJwXd3J9A",
};

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

// ─── TRIPLE PLAY / PLANS TABLE ───────────────────────────────────────────────
export function SpeedHighlight() {
  return (
    <section style={{ background: "#293451", padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      {/* subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)", width: 700, height: 350, background: "radial-gradient(ellipse, rgba(204,0,0,0.12) 0%, transparent 70%)", zIndex: 0 }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 22, letterSpacing: 4, textTransform: "uppercase",
            color: "#CC0000", marginBottom: 14,
          }}>Triple Play</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 7vw, 88px)",
            letterSpacing: 2, lineHeight: 0.95, marginBottom: 24, color: "#FFFFFF",
          }}>
            INTERNET{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>·</span>
            {" "}PHONE{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>·</span>
            {" "}OTT
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#becada", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8 }}>
            All plans include phone calls + high-speed fiber. Pick a plan, unlock your OTT bundle.
          </p>
        </div>

        {/* ── TABLE ── */}
        <div style={{ overflowX: "auto", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
            <thead>
              <tr>
                {/* Label column header */}
                <th style={{
                  background: "#060E1C",
                  padding: "28px 28px", textAlign: "left",
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                  color: "#becada", width: 180,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                }}>Platform</th>

                {plans.map((p, i) => (
                  <th key={i} style={{
                    background: p.popular ? "linear-gradient(160deg, #1a0808 0%, #2a0808 100%)" : "#060E1C",
                    padding: "0", textAlign: "center", position: "relative",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    borderRight: i < plans.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    verticalAlign: "top",
                  }}>
                    {p.popular && (
                      <div style={{
                        background: "linear-gradient(135deg, #CC0000, #E43B2C)",
                        color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                        fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                        padding: "6px 0", textAlign: "center",
                        boxShadow: "0 4px 20px rgba(204,0,0,0.5)",
                      }}>⭐ MOST POPULAR</div>
                    )}
                    <div style={{ padding: "24px 16px 28px" }}>
                      {/* Price */}
                      <div style={{
                        fontFamily: "'Bebas Neue', cursive", fontSize: 40,
                        color: p.color, letterSpacing: 1, lineHeight: 1,
                        textShadow: `0 0 30px ${p.color}55`,
                      }}>{p.price}</div>
                      {/* Plan name */}
                      <div style={{
                        fontFamily: "'Rajdhani', sans-serif", fontWeight: 800,
                        fontSize: 14, letterSpacing: 3, textTransform: "uppercase",
                        color: "#FFFFFF", marginTop: 6,
                      }}>{p.name}</div>
                      {/* Speed chip */}
                      <div style={{
                        display: "inline-block", marginTop: 10,
                        background: `${p.color}22`,
                        border: `1px solid ${p.color}55`,
                        borderRadius: 999, padding: "4px 14px",
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                        fontSize: 12, color: p.color,
                      }}>{p.speed}</div>
                    </div>
                    {/* bottom color stripe */}
                    <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ottColumns.map((col, ri) => (
                <tr key={col}
                  style={{ background: ri % 2 === 0 ? "#0D1A2D" : "#0A1525", transition: "background 0.15s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = "#132040")}
                  onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = ri % 2 === 0 ? "#0D1A2D" : "#0A1525")}
                >
                  <td style={{
                    padding: "14px 24px",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {ottLogos[col] ? (
                        <div style={{ width: 45, height: 45, background: "rgba(255,255,255,0.06)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 3 }}>
                          <img src={ottLogos[col]} alt={col}
                            style={{ maxWidth: 45, maxHeight: 45, objectFit: "contain" }}
                            onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                          />
                        </div>
                      ) : (
                        <div style={{
                          width: 44, height: 26, borderRadius: 6,
                          background: "linear-gradient(135deg, #14213D, #1e3a6e)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                          fontSize: 8, color: "#fff", letterSpacing: 0.5, flexShrink: 0,
                        }}>IPTV</div>
                      )}
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#C8D6E8", fontWeight: 600 }}>{col}</span>
                    </div>
                  </td>
                  {plans.map((p, pi) => (
                    <td key={pi} style={{
                      padding: "14px 16px", textAlign: "center",
                      background: p.popular ? "rgba(204,0,0,0.04)" : "transparent",
                      borderRight: pi < plans.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      {p.ott[col as keyof typeof p.ott] ? (
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 30, height: 30, borderRadius: "50%",
                          background: "linear-gradient(135deg, rgba(204, 0, 0, 0.57), rgba(204,0,0,0.08))",
                          border: "1px solid rgba(204,0,0,0.3)",
                          color: "#E05C5C", fontSize: 14, fontWeight: 800,
                        }}>✓</span>
                      ) : (
                        <span style={{ display: "inline-block", width: 20, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1 }} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {/* CTA row */}
              <tr style={{ background: "#060E1C" }}>
                <td style={{
                  padding: "24px 28px",
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#becada",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}>Get Started</td>
                {plans.map((p, i) => (
                  <td key={i} style={{
                    padding: "18px 16px", textAlign: "center",
                    background: p.popular ? "rgba(204,0,0,0.06)" : "transparent",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <a href="/plans" style={{
                      display: "inline-block",
                      fontFamily: "'Rajdhani', sans-serif", fontWeight: 800,
                      fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                      textDecoration: "none",
                      background: p.popular ? "linear-gradient(135deg, #CC0000, #E43B2C)" : "transparent",
                      color: p.popular ? "#fff" : "#CC0000",
                      border: p.popular ? "none" : "1px solid rgba(204, 0, 0, 0.77)",
                      padding: "10px 24px", borderRadius: 999,
                      boxShadow: p.popular ? "0 6px 20px rgba(204,0,0,0.4)" : "none",
                      transition: "all 0.2s",
                    }}>Select</a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const whyItems = [
  { img: "/images/why1.jpeg", iconKey: "lightning", title: "Lightning Fast Speeds", desc: "True fiber-optic infrastructure with symmetric upload and download speeds — no throttling, no fair usage caps." },
  { img: "/images/why2.jpeg", iconKey: "shield", title: "99.9% Uptime SLA", desc: "Our redundant network architecture and 24/7 NOC monitoring guarantee near-zero downtime for homes and businesses." },
  { img: "/images/why4.jpeg", iconKey: "film", title: "21+ OTT Platforms", desc: "Disney+ Hotstar, Sony LIV, ZEE5, Aha, Sun NXT, Amazon Prime and more — bundled at no extra subscription cost." },
  { img: "/images/why5.jpeg", iconKey: "headset", title: "24/7 Expert Support", desc: "Our local Vizag-based support team is available round the clock via phone, WhatsApp, and in-person visits." },
  { img: "/images/why6.jpeg", iconKey: "globe", title: "City-Wide Coverage", desc: "50+ zones across Visakhapatnam covered with our fiber backbone — expanding every quarter to new areas." },
  { img: "/images/why3.jpeg", iconKey: "tv", title: "Home Connection", desc: "Fast fiber internet for your home with free installation and same-day activation. Symmetric speeds, no throttling, no hidden charges." },
  { img: "/images/why1.jpeg", iconKey: "lightning", title: "Business Connection", desc: "Dedicated leased lines, static IPs, and SLA-backed plans tailored for businesses. Priority support and guaranteed uptime around the clock." },
  { img: "/images/why2.jpeg", iconKey: "shield", title: "Bulk / Apartments", desc: "Special group packages for apartments, hostels, and commercial complexes. One connection, whole building — managed effortlessly." },
];

export function WhyVBC() {
  return (
    <section style={{ background: "#14213D", padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, background: "radial-gradient(circle, rgba(204,0,0,0.09) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, background: "radial-gradient(circle, rgba(204,0,0,0.06) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Heading ── */}
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
            12+ years of delivering Vizag&apos;s most trusted fiber broadband experience.
          </p>
        </div>

        {/* ── Cards grid ── */}
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
              {/* BG image — light transparent */}
              <img src={item.img} alt="" aria-hidden="true"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.80, filter: "grayscale(0%)" }}
                onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              {/* Dark overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(46, 56, 78, 0.68) 0%, rgba(8, 14, 28, 0.59) 100%)" }} />

              {/* Content — centered layout */}
              <div style={{
                position: "relative", zIndex: 1,
                padding: "44px 30px 40px",
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              }}>
                {/* Icon centered */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 68, height: 68, borderRadius: 18,
                  background: "rgba(255,255,255,0.94)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
                  marginBottom: 24,
                }}>
                  {whyIcons[item.iconKey]}
                </div>

                {/* Red divider below icon */}
                <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 18 }} />

                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20,
                  letterSpacing: 1, textTransform: "uppercase", color: "#F0F4F8", marginBottom: 14,
                }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#dee8ff", lineHeight: 1.8 }}>{item.desc}</p>

                {/* Bottom accent */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}