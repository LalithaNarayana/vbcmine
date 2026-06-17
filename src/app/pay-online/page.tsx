"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Smartphone,
  Shield,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText,
  CheckCircle,
  Check,
} from "lucide-react";

type Step = "details" | "otp" | "bill" | "payment" | "success";

interface Bill {
  accountId: string;
  name: string;
  plan: string;
  billingPeriod: string;
  dueDate: string;
  amount: number;
}

// Demo-only bill lookup. In production this would call the billing API
// using the verified Account ID to fetch the real outstanding amount.
function getBillForAccount(accountId: string): Bill {
  const seed = accountId.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const amount = 449 + (seed % 12) * 25;
  return {
    accountId: accountId.toUpperCase(),
    name: "VBC Subscriber",
    plan: "FiberMax 100 — Internet + OTT",
    billingPeriod: "16 Jun – 15 Jul 2026",
    dueDate: "25 Jun 2026",
    amount,
  };
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  fontSize: "12px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#667085",
  marginBottom: "8px",
};

export default function PayOnlinePage() {
  const [step, setStep] = useState<Step>("details");
  const [accountId, setAccountId] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const detailsValid = accountId.trim().length >= 4 && mobile.length === 10;

  const handleSendOTP = () => {
    if (!detailsValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOTPChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      const next = document.getElementById(`payotp-${idx + 1}`);
      next?.focus();
    }
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBill(getBillForAccount(accountId));
      setStep("bill");
    }, 1000);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1400);
  };

  const gst = bill ? Math.round(bill.amount * 0.18) : 0;
  const total = bill ? bill.amount + gst : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", padding: "100px 24px 60px", position: "relative" }}>
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "480px", margin: "0 auto" }}>
        {step !== "success" && (
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Pay Online</div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(32px,5vw,48px)", letterSpacing: "2px", color: "#152238" }}>
              PAY YOUR <span style={{ color: "#CC0000" }}>BILL</span>
            </h1>
            <p style={{ color: "#667085", fontSize: "13px", marginTop: "8px" }}>
              Verify your account to view and pay your current bill instantly.
            </p>
          </div>
        )}

        <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 20px 50px rgba(20, 33, 61, 0.08)", padding: "40px" }}>
          {/* Step 1: Account + Mobile */}
          {step === "details" && (
            <>
              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "24px" }}>
                Enter Your Account Details
              </h2>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Account ID</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000" }}>
                    <FileText size={16} />
                  </div>
                  <input
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="e.g. VBC10234"
                    className="vbc-input"
                    style={{ paddingLeft: "44px" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <label style={labelStyle}>Registered Mobile Number</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "6px", color: "#CC0000" }}>
                    <Smartphone size={16} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#667085", borderRight: "1px solid rgba(20,33,61,0.1)", paddingRight: "8px" }}>
                      +91
                    </span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit number"
                    className="vbc-input"
                    style={{ paddingLeft: "80px" }}
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={!detailsValid || loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  opacity: !detailsValid ? 0.5 : 1,
                  cursor: !detailsValid ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: "none",
                  padding: "14px",
                }}
              >
                {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={16} />}
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <p style={{ textAlign: "center", color: "#667085", fontSize: "12px", marginTop: "20px" }}>
                Don&apos;t know your Account ID? Find it on any past bill or{" "}
                <Link href="/contact" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>contact support</Link>.
              </p>
            </>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <>
              <button
                onClick={() => setStep("details")}
                style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "1px", marginBottom: "20px", padding: 0, display: "flex", alignItems: "center", gap: "6px" }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "8px" }}>
                Enter OTP
              </h2>
              <p style={{ color: "#667085", fontSize: "13px", marginBottom: "28px", lineHeight: "1.6" }}>
                We&apos;ve sent a 6-digit OTP to <strong style={{ color: "#152238" }}>+91 {mobile}</strong> for account <strong style={{ color: "#152238" }}>{accountId.toUpperCase()}</strong>
              </p>

              <div style={{ display: "flex", gap: "10px", marginBottom: "24px", justifyContent: "center" }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`payotp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(e.target.value, idx)}
                    style={{
                      width: "44px",
                      height: "52px",
                      textAlign: "center",
                      background: "#ffffff",
                      border: digit ? "1px solid #CC0000" : "1px solid rgba(20,33,61,0.12)",
                      color: "#152238",
                      fontSize: "20px",
                      fontFamily: "'Bebas Neue', cursive",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.some((d) => d === "") || loading}
                className="btn-primary"
                style={{ width: "100%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px" }}
              >
                {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Shield size={16} />}
                {loading ? "Verifying..." : "Verify & View Bill"}
              </button>

              <p style={{ textAlign: "center", color: "#667085", fontSize: "13px", marginTop: "20px" }}>
                Didn&apos;t receive?{" "}
                <button style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
                  Resend OTP
                </button>
              </p>
            </>
          )}

          {/* Step 3: Bill details */}
          {step === "bill" && bill && (
            <>
              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "20px" }}>
                Current Bill
              </h2>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Account ID</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#152238" }}>{bill.accountId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Plan</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>{bill.plan}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Billing Period</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>{bill.billingPeriod}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Due Date</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#CC0000" }}>{bill.dueDate}</span>
              </div>

              <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>Plan Charges</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {bill.amount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", color: "#667085" }}>GST (18%)</span>
                <span style={{ fontSize: "13px", color: "#152238" }}>Rs. {gst}</span>
              </div>

              <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#152238" }}>Amount Due</span>
                <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", color: "#CC0000", letterSpacing: "1px" }}>Rs. {total}</span>
              </div>

              <button
                onClick={() => setStep("payment")}
                className="btn-primary"
                style={{ width: "100%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px" }}
              >
                Proceed to Pay <ArrowRight size={16} />
              </button>
            </>
          )}

          {/* Step 4: Payment gateway */}
          {step === "payment" && bill && (
            <>
              <button
                onClick={() => setStep("bill")}
                style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "1px", marginBottom: "20px", padding: 0, display: "flex", alignItems: "center", gap: "6px" }}
              >
                <ArrowLeft size={14} /> Back to bill
              </button>

              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "20px" }}>
                Payment Method
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { icon: <Smartphone size={18} />, label: "UPI / GPay / PhonePe", id: "upi" },
                  { icon: <CreditCard size={18} />, label: "Credit / Debit Card", id: "card" },
                  { icon: <Shield size={18} />, label: "Net Banking", id: "netbanking" },
                ].map((m) => (
                  <label
                    key={m.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px", padding: "16px",
                      background: paymentMethod === m.id ? "rgba(204,0,0,0.04)" : "#ffffff",
                      border: paymentMethod === m.id ? "1px solid rgba(204,0,0,0.4)" : "1px solid rgba(20,33,61,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymethod"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      style={{ accentColor: "#CC0000" }}
                    />
                    <span style={{ color: "#CC0000" }}>{m.icon}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#152238" }}>{m.label}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", border: "none", cursor: "pointer", fontSize: "15px", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : null}
                {loading ? "Redirecting to gateway..." : `Pay Rs. ${total} Securely`}
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                <Shield size={12} color="#667085" />
                <span style={{ fontSize: "11px", color: "#667085" }}>256-bit SSL Encrypted Payment Gateway</span>
              </div>
            </>
          )}

          {/* Step 5: Success */}
          {step === "success" && bill && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "72px", height: "72px", background: "rgba(0,200,100,0.1)", border: "1px solid rgba(0,200,100,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <CheckCircle size={32} color="#00C864" />
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>PAYMENT SUCCESSFUL!</h1>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
                Rs. {total} has been paid for account <strong>{bill.accountId}</strong>. A receipt has been sent to your registered mobile number.
              </p>
              <div style={{ background: "#F8FAFC", border: "1px solid rgba(20,33,61,0.06)", padding: "16px", marginBottom: "28px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#152238" }}>
                  <Check size={14} color="#00C864" /> Paid via {paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Card" : "Net Banking"}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none" }}>Go to Dashboard</Link>
                <Link href="/" className="btn-outline" style={{ textDecoration: "none" }}>Back to Home</Link>
              </div>
            </div>
          )}
        </div>

        {step !== "success" && (
          <div style={{ textAlign: "center", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <Shield size={12} color="#667085" />
            <span style={{ color: "#667085", fontSize: "11px" }}>Secured with 256-bit encryption</span>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
