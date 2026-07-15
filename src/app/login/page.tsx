"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight, Shield, RefreshCw } from "lucide-react";

type Step = "mobile" | "otp";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugOtp, setDebugOtp] = useState(""); // shown only while mock OTP provider is active

  const handleSendOTP = async () => {
    if (mobile.length !== 10 || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, purpose: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ? `${data.error} (${data.detail})` : data.error || "Failed to send OTP.");
        return;
      }
      if (data.debugOtp) setDebugOtp(data.debugOtp);
      setStep("otp");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6 || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: code, purpose: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ? `${data.error} (${data.detail})` : data.error || "OTP verification failed.");
        return;
      }
      router.push(searchParams.get("next") || "/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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

              {error && (
                <p style={{ color: "#CC0000", fontSize: "12px", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
              )}

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
                onClick={() => { setStep("mobile"); setOtp(["", "", "", "", "", ""]); setError(""); setDebugOtp(""); }}
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

              {debugOtp && (
                <p style={{ textAlign: "center", color: "#00C864", fontSize: "12px", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                  Dev mode — OTP: {debugOtp} (SMS provider not yet connected)
                </p>
              )}
              {error && (
                <p style={{ textAlign: "center", color: "#CC0000", fontSize: "12px", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={otp.join("").length !== 6 || loading}
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: "none",
                  padding: "14px",
                  clipPath: "none",
                  width: "100%",
                  textAlign: "center",
                  opacity: otp.join("").length !== 6 || loading ? 0.6 : 1,
                  cursor: otp.join("").length !== 6 || loading ? "not-allowed" : "pointer",
                }}
              >
                <Shield size={16} />
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <p style={{ textAlign: "center", color: "#667085", fontSize: "13px", marginTop: "20px" }}>
                Didn&apos;t receive?{" "}
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}
                >
                  Resend OTP
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
