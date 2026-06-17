"use client";
import { useState } from "react";
import { User, Mail, MapPin, Home } from "lucide-react";
import { cities } from "@/constants/cities";

interface RegisterFormProps {
  mobile: string;
  onSuccess: () => void;
}

export default function RegisterForm({ mobile, onSuccess }: RegisterFormProps) {
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "" });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#ffffff", border: "1px solid rgba(20,33,61,0.12)",
    color: "#152238", padding: "12px 16px 12px 44px", fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px", outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
    fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#667085", marginBottom: "8px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ padding: "12px 16px", background: "rgba(204,0,0,0.06)", border: "1px solid rgba(204,0,0,0.18)", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#CC0000" }}>
        Registering with: +91 {mobile}
      </div>

      {[
        { key: "name", label: "Full Name", icon: <User size={14} />, placeholder: "Your full name" },
        { key: "email", label: "Email Address", icon: <Mail size={14} />, placeholder: "your@email.com" },
        { key: "address", label: "Address", icon: <Home size={14} />, placeholder: "Door No, Street, Colony" },
      ].map(({ key, label, icon, placeholder }) => (
        <div key={key}>
          <label style={labelStyle}>{label}</label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000" }}>{icon}</div>
            <input value={form[key as keyof typeof form]} onChange={(e) => set(key, e.target.value)}
              placeholder={placeholder} style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(20,33,61,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      ))}

      <div>
        <label style={labelStyle}>Select City</label>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#CC0000" }}><MapPin size={14} /></div>
          <select value={form.city} onChange={(e) => set("city", e.target.value)}
            style={{ ...inputStyle, appearance: "none" }}>
            <option value="">Choose your area</option>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.zone})</option>)}
          </select>
        </div>
      </div>

      <button onClick={onSuccess} className="btn-primary" style={{ width: "100%", marginTop: "8px", border: "none", cursor: "pointer" }}>
        Create Account
      </button>
    </div>
  );
}
