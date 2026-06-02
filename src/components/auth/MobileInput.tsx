"use client";
import { Phone } from "lucide-react";

interface MobileInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function MobileInput({ value, onChange, disabled }: MobileInputProps) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "10px" }}>
        Mobile Number
      </label>
      <div style={{ display: "flex", gap: "0" }}>
        <div style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", borderRight: "none", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Phone size={14} color="#CC0000" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#CC0000" }}>+91</span>
        </div>
        <input
          type="tel" maxLength={10} value={value} disabled={disabled}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 10-digit number"
          style={{
            flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            color: "#E8E8E8", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
            outline: "none", letterSpacing: "2px",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        />
      </div>
    </div>
  );
}
