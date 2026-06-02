"use client";
import { useState } from "react";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [done, setDone] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#c1c1c1", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #CC0000, #880000)", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: "white" }}>VBC</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: "#000000", letterSpacing: "3px" }}>ON FIBER</div>
          </div>
        </div>

        {done ? (
          <div style={{ background: "#111", border: "1px solid rgba(0,200,100,0.2)", padding: "60px 40px", textAlign: "center" }}>
            <CheckCircle size={56} color="#00C864" style={{ margin: "0 auto 20px" }} />
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#E8E8E8", marginBottom: "12px" }}>WELCOME TO VBC!</h2>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.7", marginBottom: "32px" }}>Your account has been created. Our team will contact you within 24 hours for setup.</p>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>Go to Dashboard</Link>
          </div>
        ) : (
          <div style={{ background: "#111", border: "1px solid rgba(204,0,0,0.12)", padding: "40px 32px" }}>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>New Customer</div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "36px", letterSpacing: "2px", color: "#E8E8E8", marginBottom: "8px" }}>CREATE ACCOUNT</h1>
            <p style={{ color: "#555", fontSize: "13px", marginBottom: "32px" }}>Set up your VBC self-care account</p>
            <RegisterForm mobile="9999999999" onSuccess={() => setDone(true)} />
            <p style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "#555" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>Sign In</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
