"use client";
import { useState } from "react";
import Link from "next/link";
import { broadbandPlans, tvPlans, comboPlans } from "@/constants/plans";
import PlanCard from "@/components/plans/PlanCard";
import PlanTabs from "@/components/plans/PlanTabs";
import { Check, CreditCard, Shield, Smartphone, ArrowLeft } from "lucide-react";

const tabs = [
  { label: "Broadband", value: "broadband", count: broadbandPlans.length },
  { label: "TV / IPTV", value: "tv", count: tvPlans.length },
  { label: "Combo", value: "combo", count: comboPlans.length },
];

const allPlans = { broadband: broadbandPlans, tv: tvPlans, combo: comboPlans };

export default function RenewPage() {
  const [tab, setTab] = useState("broadband");
  const [selectedPlan, setSelectedPlan] = useState<string | null>("bb-standard");
  const [step, setStep] = useState<"select" | "payment" | "done">("select");

  const plans = allPlans[tab as keyof typeof allPlans];
  const currentPlan = [...broadbandPlans, ...tvPlans, ...comboPlans].find((p) => p.id === selectedPlan);

  if (step === "done") {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ width: "80px", height: "80px", background: "rgba(0,200,100,0.1)", border: "1px solid rgba(0,200,100,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check size={36} color="#00C864" />
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "48px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>PAYMENT SUCCESSFUL!</h1>
          <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.7", marginBottom: "32px" }}>
            Your {currentPlan?.name} plan has been renewed. Enjoy uninterrupted connectivity!
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none" }}>Go to Dashboard</Link>
            <Link href="/" className="btn-outline" style={{ textDecoration: "none" }}>Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment" && currentPlan) {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", padding: "100px 24px 60px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button onClick={() => setStep("select")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#667085", cursor: "pointer", marginBottom: "32px", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", letterSpacing: "1px" }}>
            <ArrowLeft size={14} /> Back to Plans
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px" }}>
            <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", padding: "32px", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", letterSpacing: "1px", color: "#152238", marginBottom: "24px" }}>ORDER SUMMARY</h2>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "#152238" }}>{currentPlan.name}</div>
                <div style={{ fontSize: "13px", color: "#CC0000", marginTop: "4px" }}>{currentPlan.speed}</div>
              </div>
              {currentPlan.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <Check size={13} color="#CC0000" />
                  <span style={{ fontSize: "13px", color: "#475467" }}>{f}</span>
                </div>
              ))}
              <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "24px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Plan Price</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {currentPlan.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>GST (18%)</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {Math.round(currentPlan.price * 0.18)}</span>
              </div>
              <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#152238" }}>Total</span>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: "#CC0000", letterSpacing: "1px" }}>Rs. {currentPlan.price + Math.round(currentPlan.price * 0.18)}</span>
              </div>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", padding: "32px", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", letterSpacing: "1px", color: "#152238", marginBottom: "24px" }}>PAYMENT METHOD</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { icon: <CreditCard size={18} />, label: "Credit / Debit Card", id: "card" },
                  { icon: <Smartphone size={18} />, label: "UPI / GPay / PhonePe", id: "upi" },
                  { icon: <Shield size={18} />, label: "Net Banking", id: "netbanking" },
                ].map((m) => (
                  <label key={m.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", cursor: "pointer" }}>
                    <input type="radio" name="payment" defaultChecked={m.id === "card"} style={{ accentColor: "#CC0000" }} />
                    <span style={{ color: "#CC0000" }}>{m.icon}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#152238" }}>{m.label}</span>
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {[
                  { label: "Card Number", placeholder: "XXXX XXXX XXXX XXXX" },
                  { label: "Cardholder Name", placeholder: "As on card" },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#667085", marginBottom: "8px" }}>{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      style={{ width: "100%", background: "#ffffff", border: "1px solid rgba(20,33,61,0.12)", color: "#152238", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(20,33,61,0.12)"; }}
                    />
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[{ label: "Expiry", placeholder: "MM / YY" }, { label: "CVV", placeholder: "..." }].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#667085", marginBottom: "8px" }}>{f.label}</label>
                      <input
                        placeholder={f.placeholder}
                        style={{ width: "100%", background: "#ffffff", border: "1px solid rgba(20,33,61,0.12)", color: "#152238", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(20,33,61,0.12)"; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep("done")} className="btn-primary" style={{ width: "100%", border: "none", cursor: "pointer", fontSize: "15px", padding: "14px" }}>
                Pay Rs. {currentPlan.price + Math.round(currentPlan.price * 0.18)} Securely
              </button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                <Shield size={12} color="#667085" />
                <span style={{ fontSize: "11px", color: "#667085" }}>256-bit SSL Encrypted · Powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){div > div > div:last-child{grid-template-columns:1fr!important;}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#667085", textDecoration: "none", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", marginBottom: "24px" }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Renew / Upgrade</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "2px", color: "#152238" }}>
            CHOOSE YOUR <span style={{ color: "#CC0000" }}>PLAN</span>
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <PlanTabs tabs={tabs} active={tab} onChange={setTab} />
          <p style={{ color: "#667085", fontSize: "13px" }}>Click a plan to select, then proceed to payment</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {plans.map((p) => (
            <div key={p.id} onClick={() => setSelectedPlan(p.id)} style={{ cursor: "pointer", outline: selectedPlan === p.id ? "2px solid #CC0000" : "2px solid transparent", outlineOffset: "2px" }}>
              <PlanCard plan={p} showRenew />
            </div>
          ))}
        </div>

        {selectedPlan && currentPlan && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setStep("payment")} className="btn-primary" style={{ border: "none", cursor: "pointer", fontSize: "15px", padding: "14px 40px" }}>
              Continue with {currentPlan.name} - Rs. {currentPlan.price}/mo {"->"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
