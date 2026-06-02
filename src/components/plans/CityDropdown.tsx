"use client";
import { MapPin, ChevronDown } from "lucide-react";
import { cities } from "@/constants/cities";

interface CityDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export default function CityDropdown({ value, onChange }: CityDropdownProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000", zIndex: 1, pointerEvents: "none" }}>
        <MapPin size={15} />
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(204,0,0,0.2)",
          color: "#E8E8E8", padding: "10px 44px 10px 40px", fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600, fontSize: "13px", letterSpacing: "0.5px", cursor: "pointer", outline: "none",
          minWidth: "200px",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(204,0,0,0.2)"; }}
      >
        <option value="">All Areas</option>
        {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" }}>
        <ChevronDown size={14} />
      </div>
    </div>
  );
}
