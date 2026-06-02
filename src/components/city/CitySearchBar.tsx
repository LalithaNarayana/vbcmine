"use client";
import { Search, X } from "lucide-react";

interface CitySearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CitySearchBar({ value, onChange, placeholder = "Search area or colony..." }: CitySearchBarProps) {
  return (
    <div style={{ position: "relative", maxWidth: "480px", width: "100%" }}>
      <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", pointerEvents: "none" }}>
        <Search size={16} />
      </div>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          color: "#E8E8E8", padding: "14px 44px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
          outline: "none", transition: "border-color 0.3s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.1)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      {value && (
        <button onClick={() => onChange("")} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", padding: "4px" }}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
