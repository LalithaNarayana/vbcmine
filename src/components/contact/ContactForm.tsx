"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const areas = [
    "Visakhapatnam (City)", "MVP Colony", "Gajuwaka", "Madhurawada", "Rushikonda",
    "Seethammadhara", "Dwaraka Nagar", "Yendada", "Kommadi", "Bheemunipatnam",
    "Anakapalle", "Narsipatnam", "Bhimavaram", "Rajahmundry",
  ];
  const [form, setForm] = useState({ name: "", email: "", mobile: "", area: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "#E8E8E8", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#555", marginBottom: "8px" };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = "#CC0000"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(204,0,0,0.08)"; };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; };

  if (submitted) {
    return (
      <div style={{ padding: "60px 32px", textAlign: "center" }}>
        <CheckCircle size={48} color="#00C864" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", letterSpacing: "2px", color: "#E8E8E8", marginBottom: "12px" }}>MESSAGE SENT!</h3>
        <p style={{ color: "#666", fontSize: "14px" }}>Our team will get back to you within 2 business hours.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#111", border: "1px solid rgba(204,0,0,0.12)", padding: "40px 32px" }}>
      <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#E8E8E8", marginBottom: "8px" }}>SEND US A MESSAGE</h3>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "32px" }}>We typically respond within 2 hours</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={labelStyle}>Mobile Number</label>
            <input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+91 XXXXX XXXXX" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Select Area</label>
          <select value={form.area} onChange={(e) => set("area", e.target.value)} style={{ ...inputStyle, appearance: "none" }} onFocus={focus} onBlur={blur}>
            <option value="">Select your area</option>
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Subject</label>
          <select value={form.subject} onChange={(e) => set("subject", e.target.value)} style={{ ...inputStyle, appearance: "none" }} onFocus={focus} onBlur={blur}>
            <option value="">Select a topic</option>
            <option>New Connection Request</option>
            <option>Technical Support</option>
            <option>Billing & Payment</option>
            <option>Plan Upgrade</option>
            <option>Complaint</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Message</label>
          <textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Describe your query in detail..." rows={5}
            style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }} onFocus={focus} onBlur={blur} />
        </div>
        <button onClick={() => setSubmitted(true)} className="btn-primary"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", border: "none", cursor: "pointer", fontSize: "14px" }}>
          <Send size={15} /> Send Message
        </button>
      </div>
    </div>
  );
}
