"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleCheck, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugOtp, setDebugOtp] = useState(""); // shown only while mock OTP provider is active

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#667085",
    marginBottom: "8px",
  };

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    background: "#ffffff",
    border: "1px solid rgba(20,33,61,0.12)",
    color: "#152238",
    padding: "12px 16px 12px 44px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#CC0000";
    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.1)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(20,33,61,0.12)";
    e.currentTarget.style.boxShadow = "none";
  };

  const canSendOtp = name.trim().length >= 2 && mobile.length === 10 && !loading;

  const handleSendOtp = async () => {
    if (!canSendOtp) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, purpose: "register" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ? `${data.error} (${data.detail})` : data.error || "Failed to send OTP.");
        return;
      }
      setOtpSent(true);
      if (data.debugOtp) setDebugOtp(data.debugOtp);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp, purpose: "register", name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ? `${data.error} (${data.detail})` : data.error || "OTP verification failed.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {done ? (
          <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 20px 50px rgba(20, 33, 61, 0.08)", padding: "60px 40px", textAlign: "center" }}>
            <CircleCheck size={56} color="#00C864" style={{ margin: "0 auto 20px" }} />
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>WELCOME TO VBC!</h2>
            <p style={{ color: "#667085", fontSize: "14px", lineHeight: "1.7", marginBottom: "32px" }}>Your account has been created and you&apos;re logged in. Choose a plan to request your connection.</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary"
              style={{ border: "none", cursor: "pointer" }}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 20px 50px rgba(20, 33, 61, 0.08)", padding: "40px 32px" }}>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>New Customer</div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#152238", marginBottom: "8px" }}>CREATE ACCOUNT</h1>
            <p style={{ color: "#667085", fontSize: "13px", marginBottom: "32px" }}>Set up your VBC self-care account</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Full Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                    <User size={14} />
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={otpSent}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label style={labelStyle}>Mobile Number</label>
                <div style={{ display: "flex", width: "100%" }}>
                  {/* +91 prefix */}
                  <div style={{
                    flexShrink: 0,
                    width: "68px",
                    background: "rgba(204,0,0,0.06)",
                    border: "1px solid rgba(204,0,0,0.18)",
                    borderRight: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    color: "#CC0000",
                  }}>
                    <Phone size={13} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px" }}>+91</span>
                  </div>
                  {/* Number input */}
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile number"
                    disabled={otpSent}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      boxSizing: "border-box",
                      background: "#ffffff",
                      border: "1px solid rgba(20,33,61,0.12)",
                      color: "#152238",
                      padding: "12px 12px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <p style={{ marginTop: "6px", fontSize: "11px", color: "#667085", fontFamily: "'DM Sans', sans-serif" }}>
                  Mobile number will be verified with OTP.
                </p>
              </div>

              {/* OTP field — appears after Send OTP */}
              {otpSent && (
                <div>
                  <label style={labelStyle}>Enter OTP</label>
                  <input
                    type="tel"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit OTP"
                    style={{ ...inputStyle, paddingLeft: "16px", letterSpacing: "4px" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  {debugOtp && (
                    <p style={{ marginTop: "6px", fontSize: "11px", color: "#00C864", fontFamily: "'DM Sans', sans-serif" }}>
                      Dev mode — OTP: {debugOtp} (SMS provider not yet connected)
                    </p>
                  )}
                  <button
                    onClick={() => { setOtpSent(false); setOtp(""); setDebugOtp(""); setError(""); }}
                    style={{ marginTop: "6px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#CC0000", fontFamily: "'DM Sans', sans-serif", padding: 0 }}
                  >
                    Change number / Resend
                  </button>
                </div>
              )}

              {error && (
                <p style={{ color: "#CC0000", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
              )}

              <button
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                disabled={otpSent ? otp.length !== 6 || loading : !canSendOtp}
                className="btn-primary"
                style={{
                  width: "100%",
                  marginTop: "8px",
                  border: "none",
                  cursor: (otpSent ? otp.length === 6 : canSendOtp) ? "pointer" : "not-allowed",
                  opacity: (otpSent ? otp.length === 6 && !loading : canSendOtp) ? 1 : 0.6,
                }}
              >
                {loading ? "Please wait..." : otpSent ? "Verify & Create Account" : "Send OTP"}
              </button>
            </div>

            <p style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "#667085" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>Sign In</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
