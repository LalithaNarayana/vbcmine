"use client";
import { useRef } from "react";

interface OTPInputProps {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function OTPInput({ value, onChange }: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const newVal = [...value];
    newVal[i] = digit;
    onChange(newVal);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "10px" }}>
        Enter OTP
      </label>
      <div style={{ display: "flex", gap: "12px" }}>
        {[0,1,2,3,4,5].map((i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text" inputMode="numeric" maxLength={1} value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{
              width: "48px", height: "56px", textAlign: "center",
              background: value[i] ? "rgba(204,0,0,0.1)" : "rgba(255,255,255,0.04)",
              border: value[i] ? "1px solid rgba(204,0,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: "#E8E8E8", fontFamily: "'Bebas Neue', cursive", fontSize: "24px",
              outline: "none", transition: "all 0.2s", letterSpacing: "1px",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.15)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = value[i] ? "rgba(204,0,0,0.5)" : "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        ))}
      </div>
    </div>
  );
}
