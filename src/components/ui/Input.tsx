"use client";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
}

export default function Input({ label, error, prefix, style, ...props }: InputProps) {
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label style={{
          display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
          color: "#666", marginBottom: "8px",
        }}>{label}</label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && (
          <div style={{
            position: "absolute", left: "14px", color: "#555",
            display: "flex", alignItems: "center",
          }}>{prefix}</div>
        )}
        <input
          style={{
            width: "100%", background: "rgba(255,255,255,0.05)",
            border: error ? "1px solid #CC0000" : "1px solid rgba(255,255,255,0.08)",
            color: "#E8E8E8", padding: prefix ? "12px 16px 12px 44px" : "12px 16px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none",
            transition: "border-color 0.3s ease", ...style,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#CC0000" : "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          {...props}
        />
      </div>
      {error && <p style={{ color: "#FF3333", fontSize: "12px", marginTop: "6px" }}>{error}</p>}
    </div>
  );
}
