"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, User, Phone, CreditCard } from "lucide-react";

export default function RegisterPage() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [accountId, setAccountId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

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
            <CheckCircle size={56} color="#00C864" style={{ margin: "0 auto 20px" }} />
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#152238", marginBottom: "12px" }}>WELCOME TO VBC!</h2>
            <p style={{ color: "#667085", fontSize: "14px", lineHeight: "1.7", marginBottom: "32px" }}>Your account has been created. Our team will contact you within 24 hours for setup.</p>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>Go to Dashboard</Link>
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
                      borderRight: otpSent ? undefined : "none",
                      color: "#152238",
                      padding: "12px 12px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  {/* Send OTP */}
                  {!otpSent && (
                    <button
                      onClick={() => { if (mobile.length === 10) setOtpSent(true); }}
                      style={{
                        flexShrink: 0,
                        width: "88px",
                        background: mobile.length === 10 ? "#CC0000" : "rgba(204,0,0,0.3)",
                        color: "#fff",
                        border: "none",
                        cursor: mobile.length === 10 ? "pointer" : "not-allowed",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      SEND OTP
                    </button>
                  )}
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
                  <button
                    onClick={() => { setOtpSent(false); setOtp(""); }}
                    style={{ marginTop: "6px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#CC0000", fontFamily: "'DM Sans', sans-serif", padding: 0 }}
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Account ID */}
              <div>
                <label style={labelStyle}>Account ID</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", display: "flex" }}>
                    <CreditCard size={14} />
                  </div>
                  <input
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    placeholder="Your account ID"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
              </div>

              <button
                onClick={() => setDone(true)}
                className="btn-primary"
                style={{ width: "100%", marginTop: "8px", border: "none", cursor: "pointer" }}
              >
                Create Account
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