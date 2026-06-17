"use client";
import { useState } from "react";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [done, setDone] = useState(false);

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
            <RegisterForm mobile="9999999999" onSuccess={() => setDone(true)} />
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
