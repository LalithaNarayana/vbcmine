"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Shield, RefreshCw } from "lucide-react";

type Step = "mobile" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (mobile.length === 10) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep("otp"); }, 1200);
    }
  };

  const handleOTPChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "0px",
        background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
      }}
    >
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

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "440px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              marginBottom: "16px",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="VBC Logo"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "32px",
              letterSpacing: "3px",
              color: "#152238",
            }}
          >
            MY ACCOUNT
          </h1>
          <p style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>VBC On Fiber — Self Care Portal</p>
        </div>

        {/* Card */}
        <div
          className="glass-card"
          style={{
            padding: "40px",
            background: "#ffffff",
            border: "1px solid rgba(20,33,61,0.08)",
            boxShadow: "0 20px 50px rgba(20, 33, 61, 0.08)",
          }}
        >
          {step === "mobile" ? (
            <>
              <h2
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#152238",
                  marginBottom: "8px",
                }}
              >
                Login with Mobile OTP
              </h2>
              <p style={{ color: "#667085", fontSize: "13px", marginBottom: "32px", lineHeight: "1.6" }}>
                Enter your registered mobile number to receive a one-time password.
              </p>

              <label
                style={{
                  display: "block",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#667085",
                  marginBottom: "8px",
                }}
              >
                Mobile Number
              </label>
              <div style={{ position: "relative", marginBottom: "24px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#CC0000",
                  }}
                >
                  <Phone size={16} />
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

              <button
                onClick={handleSendOTP}
                disabled={mobile.length !== 10 || loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  opacity: mobile.length !== 10 ? 0.5 : 1,
                  cursor: mobile.length !== 10 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  clipPath: "none",
                  padding: "14px",
                }}
              >
                {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={16} />}
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid rgba(20,33,61,0.06)", textAlign: "center" }}>
                <p style={{ color: "#667085", fontSize: "13px" }}>
                  New customer?{" "}
                  <Link href="/register" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>
                    Register Here
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("mobile")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#CC0000",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                  padding: 0,
                }}
              >
                ← Back
              </button>

              <h2
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#152238",
                  marginBottom: "8px",
                }}
              >
                Enter OTP
              </h2>
              <p style={{ color: "#667085", fontSize: "13px", marginBottom: "32px", lineHeight: "1.6" }}>
                We&apos;ve sent a 6-digit OTP to <strong style={{ color: "#152238" }}>+91 {mobile}</strong>
              </p>

              {/* OTP Boxes */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "24px", justifyContent: "center" }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(e.target.value, idx)}
                    style={{
                      width: "48px",
                      height: "56px",
                      textAlign: "center",
                      background: "#ffffff",
                      border: digit ? "1px solid #CC0000" : "1px solid rgba(20,33,61,0.12)",
                      color: "#152238",
                      fontSize: "22px",
                      fontFamily: "'Bebas Neue', cursive",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                ))}
              </div>

              <Link
                href="/dashboard"
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none",
                  padding: "14px",
                  clipPath: "none",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Shield size={16} />
                Verify & Login
              </Link>

              <p style={{ textAlign: "center", color: "#667085", fontSize: "13px", marginTop: "20px" }}>
                Didn&apos;t receive?{" "}
                <button
                  style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}
                >
                  Resend OTP
                </button>
              </p>
            </>
          )}
        </div>

        {/* Security note */}
        <div style={{ textAlign: "center", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Shield size={12} color="#667085" />
          <span style={{ color: "#667085", fontSize: "11px" }}>Secured with 256-bit encryption</span>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
