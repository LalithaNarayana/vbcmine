"use client";
import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import { CircleCheck, Zap, X } from "lucide-react";
import type { Plan as CmsPlan } from "@/types/plan";
import AppIcon from "@/components/admin/DynamicIcon";
import { usePlanRequest } from "@/components/plans/PlanRequestProvider";
import { useUserSession } from "@/components/auth/UserSessionProvider";
import UpgradePlanModal from "@/components/plans/UpgradePlanModal";

interface DisplayPlan {
  _id: string;
  name: string;
  speedValue: number;
  speedUnit: string;
  speed: string;
  price: number;
  ott: { name: string; image: string } | null;
  popular: boolean;
  features: string[];
}

interface SpeedHighlightProps {
  plans?: CmsPlan[];
  categoryName?: string;
  tag?: string;
  title?: string;
  description?: string;
  topTagline?: string;
  bottomTagline?: string;
}

function toDisplayPlans(plans?: CmsPlan[]): DisplayPlan[] | null {
  if (!plans || plans.length === 0) return null;
  return plans.map((p) => {
    const prices = p.prices || [];
    const cheapest = prices.length
      ? [...prices].sort((a, b) => a.price - b.price)[0].price
      : 0;
    const bullets = (p.bullets || []).filter(
      (b): b is Exclude<typeof b, string> => typeof b === "object"
    ) as { text: string }[];
    return {
      _id: p._id,
      name: p.name,
      speedValue: p.speed,
      speedUnit: p.speedUnit,
      speed: `${p.speed} ${p.speedUnit}`,
      price: cheapest,
      // Only plans that actually have OTT apps attached get an ott object.
      // Plain internet-only plans get null, so the OTT line/popup never shows for them.
      ott: p.ottList && p.ottList.length > 0 ? p.ottList[0] : null,
      popular: p.mostPopular,
      features: bullets.map((b) => b.text),
    };
  });
}

export function SpeedHighlight({
  plans: cmsPlans,
  categoryName,
  tag,
  title,
  description,
  topTagline,
  bottomTagline,
}: SpeedHighlightProps = {}) {
  const [ottPopup, setOttPopup] = useState<{ name: string; image: string } | null>(null);
  const { openPlanRequest } = usePlanRequest();
  const { user } = useUserSession();
  const [upgradePlan, setUpgradePlan] = useState<DisplayPlan | null>(null);
  const displayPlans: DisplayPlan[] = toDisplayPlans(cmsPlans) || [];
  const eyebrow = categoryName || tag || "Internet + OTT";

  // Mirrors the /plans page: an existing customer with a live connection
  // gets the "upgrade" flow (in-session plan switch + payment) instead of
  // the new-connection request form.
  const isExistingCustomer = !!user && user.connectionStatus === "active" && !!user.accountId;

  function handleGetPlan(plan: DisplayPlan) {
    if (isExistingCustomer) {
      setUpgradePlan(plan);
    } else {
      openPlanRequest(plan._id);
    }
  }

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
            {eyebrow}
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
            {title || "FIBER SPEED + OTT BUNDLE"}
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
            {description || "High-speed unlimited fiber internet bundled with your favourite OTT streaming apps — all in one plan."}
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
            {topTagline || "6+1 or 12+2 months offer available. Router & Installation free on 6/12 month plans. Non-refundable installation: ₹1500 for monthly plans. GST @18% extra."}
          </span>
        </div>

        {/* Plan Cards */}
        {displayPlans.length === 0 ? (
          <p style={{ textAlign: "center", color: "#becada", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            Plans will appear here once added from the admin panel.
          </p>
        ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              width: "100%",
              maxWidth: 1320,
            }}
          >
            {displayPlans.map((plan, i) => (
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

                {/* OTT app name — only shown for plans that actually bundle an OTT app; clickable to open popup */}
                {plan.ott && (
                  <button
                    onClick={() => setOttPopup(plan.ott)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "block",
                      marginBottom: 16,
                      textAlign: "left",
                    }}
                    title="Click to see OTT app"
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
                      {plan.ott.name}
                    </span>
                  </button>
                )}

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
                      <CircleCheck
                        size={14}
                        color="#CC0000"
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleGetPlan(plan)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    background: "#CC0000",
                    color: "#fff",
                    border: plan.popular ? "none" : "1px solid rgba(204,0,0,0.6)",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    padding: "12px 20px",
                    borderRadius: 10,
                    transition: "all 0.2s",
                    boxShadow: plan.popular ? "0 6px 20px rgba(204,0,0,0.4)" : "none",
                    cursor: "pointer",
                  }}
                >
                  {isExistingCustomer ? "Upgrade To This Plan" : "Get This Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
        )}
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

        {/* Bottom tagline — mirrors the Plans page footnote */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#8b9ab0",
            marginTop: 28,
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
          }}
        >
          *{" "}
          {bottomTagline ||
            "All prices are exclusive of GST @18%. Non-refundable installation charges: ₹1500 (for monthly plans). For 6/12 month plans, router & installation charges free — confirm at time of booking."}
        </p>
      </div>

      {/* OTT Apps Image Popup — matches the /plans page popup design */}
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

      <UpgradePlanModal
        open={!!upgradePlan}
        onClose={() => setUpgradePlan(null)}
        planId={upgradePlan?._id || ""}
        planName={upgradePlan?.name || ""}
        planSpeed={upgradePlan?.speedValue}
        planSpeedUnit={upgradePlan?.speedUnit}
      />
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

export interface WhyChooseCardItem {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface WhyVBCProps {
  items?: WhyChooseCardItem[];
  tag?: string;
  title?: string;
  description?: string;
}

export function WhyVBC({ items, tag, title, description }: WhyVBCProps = {}) {
  const cards = (items || []).map((item) => ({
    img: item.image || "",
    iconKey: "",
    title: item.title,
    desc: item.description,
    icon: item.icon,
  }));

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
          }}>{tag || "Why Choose Us"}</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 7vw, 88px)",
            letterSpacing: 2, lineHeight: 0.95, marginBottom: 24, color: "#FFFFFF",
          }}>
            {title || "THE VBC DIFFERENCE"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#becada", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8 }}>
            {description || "14+ years of delivering Vizag's most trusted fiber broadband experience."}
          </p>
        </div>

        {/* Cards grid */}
        {cards.length === 0 ? (
          <p style={{ textAlign: "center", color: "#becada", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            Highlight cards will appear here once added from the admin panel.
          </p>
        ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 26 }}>
          {cards.map((item, i) => (
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
              {item.img ? (
                <img src={item.img} alt="" aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.80 }}
                  onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
              ) : null}
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
                  {item.iconKey ? (
                    whyIcons[item.iconKey]
                  ) : (
                    <span style={{ color: "#14213D" }}>
                      <AppIcon name={item.icon} size={32} />
                    </span>
                  )}
                </div>

                <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 18 }} />

                <h3 style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20,
                  letterSpacing: 1, textTransform: "uppercase", color: "#F0F4F8", marginBottom: 14,
                }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#dee8ff", lineHeight: 1.8 }}>{item.desc}</p>
              </div>

              {/* Bottom accent — pinned to the card's actual bottom edge (sibling of content, not nested inside it) so short descriptions never leave it floating mid-card */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}