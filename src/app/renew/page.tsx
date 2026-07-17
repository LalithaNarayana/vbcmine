"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Shield, Smartphone, ArrowLeft, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface OrderData {
  paymentId: string;
  providerOrderId: string;
  planName: string;
  baseAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
}

type LoadState = "loading" | "ready" | "error" | "unauthenticated";

export default function RenewPage() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purpose: "renewal" }),
        });
        if (res.status === 401) {
          setLoadState("unauthenticated");
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Could not start renewal.");
          setLoadState("error");
          return;
        }
        setOrder(data);
        setLoadState("ready");
      } catch {
        setErrorMsg("Network error. Please try again.");
        setLoadState("error");
      }
    })();
  }, []);

  async function handlePay() {
    if (!order || paying) return;
    setPaying(true);
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: order.paymentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Payment could not be verified.");
        setLoadState("error");
        return;
      }
      setDone(true);
    } catch {
      setErrorMsg("Network error during payment. Please try again.");
      setLoadState("error");
    } finally {
      setPaying(false);
    }
  }

  if (loadState === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#667085" }}>
        Loading your plan…
      </div>
    );
  }

  if (loadState === "unauthenticated") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px", textAlign: "center" }}>
        <div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", color: "#152238", marginBottom: "12px" }}>PLEASE LOG IN</h1>
          <p style={{ color: "#667085", fontSize: "14px", marginBottom: "24px" }}>You need to be logged in to renew your plan.</p>
          <Link href="/login?next=/renew" className="btn-primary" style={{ textDecoration: "none" }}>Go to Login</Link>
        </div>
      </div>
    );
  }

  if (loadState === "error" && !order) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px", textAlign: "center" }}>
        <div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", color: "#152238", marginBottom: "12px" }}>UNABLE TO RENEW</h1>
          <p style={{ color: "#CC0000", fontSize: "14px", marginBottom: "24px" }}>{errorMsg}</p>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none" }}>Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (done && order) {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ width: "80px", height: "80px", background: "rgba(0,200,100,0.1)", border: "1px solid rgba(0,200,100,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check size={36} color="#00C864" />
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "48px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>PAYMENT SUCCESSFUL!</h1>
          <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.7", marginBottom: "32px" }}>
            Your {order.planName} plan has been renewed for ₹{formatCurrency(order.totalAmount)}. Enjoy uninterrupted connectivity!
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none" }}>Go to Dashboard</Link>
            <Link href="/" className="btn-outline" style={{ textDecoration: "none" }}>Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", padding: "100px 24px 60px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#667085", textDecoration: "none", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", letterSpacing: "1px", marginBottom: "32px" }}>
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div style={{ marginBottom: "32px" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "12px" }}>Renew Plan</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(32px,5vw,56px)", letterSpacing: "2px", color: "#152238" }}>
            COMPLETE YOUR <span style={{ color: "#CC0000" }}>PAYMENT</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px" }}>
          {/* Order Summary */}
          <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", padding: "32px", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", letterSpacing: "1px", color: "#152238", marginBottom: "24px" }}>ORDER SUMMARY</h2>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", color: "#152238" }}>{order.planName}</div>
              <div style={{ fontSize: "13px", color: "#CC0000", marginTop: "4px" }}>Plan Renewal</div>
            </div>
            <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "24px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#667085" }}>Plan Price</span>
              <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {formatCurrency(order.baseAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#667085" }}>GST ({order.gstPercent}%)</span>
              <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {formatCurrency(order.gstAmount)}</span>
            </div>
            <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "16px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#152238" }}>Total</span>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", color: "#CC0000", letterSpacing: "1px" }}>Rs. {formatCurrency(order.totalAmount)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", padding: "32px", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", letterSpacing: "1px", color: "#152238", marginBottom: "24px" }}>PAYMENT METHOD</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {[
                { icon: <CreditCard size={18} />, label: "Credit / Debit Card", id: "card" },
                { icon: <Smartphone size={18} />, label: "UPI / GPay / PhonePe", id: "upi" },
                { icon: <Shield size={18} />, label: "Net Banking", id: "netbanking" },
              ].map((m) => (
                <label key={m.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: paymentMethod === m.id ? "rgba(204,0,0,0.04)" : "#ffffff", border: paymentMethod === m.id ? "1px solid rgba(204,0,0,0.4)" : "1px solid rgba(20,33,61,0.08)", cursor: "pointer" }}>
                  <input type="radio" name="payment" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} style={{ accentColor: "#CC0000" }} />
                  <span style={{ color: "#CC0000" }}>{m.icon}</span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#152238" }}>{m.label}</span>
                </label>
              ))}
            </div>

            {errorMsg && loadState === "error" && (
              <p style={{ color: "#CC0000", fontSize: "13px", marginBottom: "16px" }}>{errorMsg}</p>
            )}

            <button
              onClick={handlePay}
              disabled={paying}
              className="btn-primary"
              style={{ width: "100%", border: "none", cursor: paying ? "not-allowed" : "pointer", fontSize: "15px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              {paying && <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} />}
              {paying ? "Processing…" : `Pay Rs. ${formatCurrency(order.totalAmount)} Securely`}
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              <Shield size={12} color="#667085" />
              <span style={{ fontSize: "11px", color: "#667085" }}>256-bit SSL Encrypted Payment Gateway</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:768px){div > div > div:last-child{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}
