"use client";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
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
            position: "absolute", left: "14px", color: "#888",
            display: "flex", alignItems: "center",
          }}>{prefix}</div>
        )}
        <input
          style={{
            width: "100%", background: "#F5F5F5",
            border: error ? "1px solid #CC0000" : "1px solid rgba(0,0,0,0.12)",
            color: "#1A1A1A", padding: prefix ? "12px 16px 12px 44px" : "12px 16px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none",
            transition: "border-color 0.3s ease", ...style,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#CC0000" : "rgba(0,0,0,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
          {...props}
        />
      </div>
      {error && <p style={{ color: "#CC0000", fontSize: "12px", marginTop: "6px" }}>{error}</p>}
    </div>
  );
}