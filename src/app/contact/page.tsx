"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";

const cities = ["Visakhapatnam", "Gajuwaka", "Pendurthi", "Bheemunipatnam"];
const areas: Record<string, string[]> = {
  "Visakhapatnam": ["MVP Colony", "Dwaraka Nagar", "Seethammadhara", "Rushikonda", "Maddilapalem", "Akkayyapalem", "Gopalapatnam", "Waltair Uplands", "Siripuram", "Kommadi"],
  "Gajuwaka": ["Gajuwaka Main", "Steel Plant Area", "NAD Junction"],
  "Pendurthi": ["Pendurthi Main", "Kommadi", "Gambheeram"],
  "Bheemunipatnam": ["Beach Road", "Bheemunipatnam Main"],
};

const fieldStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #E4E7EC",
  borderRadius: 8,
  fontSize: 14,
  color: "#344054",
  fontFamily: "'DM Sans', sans-serif",
  background: "#fff",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  fontSize: 11,
  color: "#667085",
  letterSpacing: 1.5,
  textTransform: "uppercase" as const,
  marginBottom: 6,
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"sales" | "support">("sales");
  const [salesForm, setSalesForm] = useState({ city: "", area: "", mobile: "", message: "" });
  const [supportForm, setSupportForm] = useState({ city: "", area: "", mobile: "", type: "complaint", message: "" });
  const [salesSubmitted, setSalesSubmitted] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleSalesSubmit = () => {
    if (salesForm.city && salesForm.mobile && salesForm.message) setSalesSubmitted(true);
  };
  const handleSupportSubmit = () => {
    if (supportForm.city && supportForm.mobile && supportForm.message) setSupportSubmitted(true);
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgb(255, 255, 255)", color: "#ff0000", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, padding: "6px 16px", borderRadius: 999, textTransform: "uppercase", marginBottom: 16 }}>Contact Us</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: 2, color: "#fff", lineHeight: 0.95, marginBottom: 20 }}>
            WE&apos;RE HERE <span style={{ color: "#CC0000" }}>TO HELP</span>
          </h1>
        </div>
      </section>

      {/* Main */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48 }} className="contact-grid">

          {/* Left: Info */}
          <div>
            {[
              { icon: <MapPin size={20} />, title: "Visit Us", lines: ["VIZAG BROADCASTING COMPANY PVT. LTD. (VBC on Fiber)", "#47-10-20, 401, 4th Floor, Dwaraka Plaza,", "Dwaraka Nagar, Visakhapatnam – 530016"] },
              { icon: <Phone size={20} />, title: "Call Us", lines: ["(0891) 6677-123", "(0891) 6677-124"] },
              { icon: <Mail size={20} />, title: "Email Us", lines: ["sales@vbctv.in", "support@vbctv.in"] },
              { icon: <Clock size={20} />, title: "Working Hours", lines: ["Mon–Sat: 9:00 AM – 8:00 PM", "Sun: 10:00 AM – 5:00 PM", "Support: 24/7"] },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(20,33,61,0.08)", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, minWidth: 44, background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#CC0000", borderRadius: 8 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: "#CC0000", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{item.title}</div>
                  {item.lines.map((line, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#475467", lineHeight: 1.8 }}>{line}</div>
                  ))}
                </div>
              </div>
            ))}

            <a href="https://wa.me/918790999649" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, padding: "16px 20px", background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none", borderRadius: 8 }}>
              <MessageCircle size={24} color="#25D366" />
              <div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#25D366" }}>Chat on WhatsApp</div>
                <div style={{ fontSize: 12, color: "#667085" }}>Quick replies during business hours</div>
              </div>
            </a>
          </div>

          {/* Right: Tabbed forms */}
          <div style={{ background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 18px 40px rgba(20,33,61,0.06)", borderRadius: 12, overflow: "hidden" }}>
            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: "2px solid #f0f0f0" }}>
              {(["sales", "support"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ flex: 1, padding: "18px", border: "none", background: "none", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 0.5, color: activeTab === tab ? "#CC0000" : "#667085", borderBottom: activeTab === tab ? "3px solid #CC0000" : "3px solid transparent", marginBottom: -2, textTransform: "capitalize" }}>
                  {tab === "sales" ? "📋 Sales Enquiry" : "🛠️ Support Request"}
                </button>
              ))}
            </div>

            <div style={{ padding: "36px 40px" }}>
              {/* SALES FORM */}
              {activeTab === "sales" && !salesSubmitted && (
                <>
                  <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 22, color: "#152238", marginBottom: 6 }}>New Connection / Sales</h2>
                  <p style={{ color: "#667085", fontSize: 13, marginBottom: 28 }}>Interested in a new connection? Fill this form and our sales team will contact you.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Select City *</label>
                      <select value={salesForm.city} onChange={(e) => setSalesForm({ ...salesForm, city: e.target.value, area: "" })} style={fieldStyle}>
                        <option value="">Choose city...</option>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Select Area</label>
                      <select value={salesForm.area} onChange={(e) => setSalesForm({ ...salesForm, area: e.target.value })} style={{ ...fieldStyle, color: salesForm.area ? "#344054" : "#9CA3AF" }} disabled={!salesForm.city}>
                        <option value="">{salesForm.city ? "Choose area..." : "Select city first"}</option>
                        {(areas[salesForm.city] || []).map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Mobile Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={salesForm.mobile}
                      onChange={(e) => setSalesForm({ ...salesForm, mobile: e.target.value })}
                      style={fieldStyle} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea rows={4} placeholder="Tell us about your requirements..." value={salesForm.message}
                      onChange={(e) => setSalesForm({ ...salesForm, message: e.target.value })}
                      style={{ ...fieldStyle, resize: "vertical" }} />
                  </div>
                  <button onClick={handleSalesSubmit}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: "#CC0000", color: "#fff", border: "none", borderRadius: 8, padding: "13px 32px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>
                    <Send size={16} /> Submit to Sales
                  </button>
                  <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 12 }}>Form will be sent to sales@vbctv.in</p>
                </>
              )}
              {activeTab === "sales" && salesSubmitted && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 64, height: 64, background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle size={28} color="#CC0000" />
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: "#14213D", marginBottom: 10 }}>Enquiry Submitted!</h3>
                  <p style={{ color: "#667085", fontSize: 13 }}>Our sales team will call you within 2 hours.</p>
                </div>
              )}

              {/* SUPPORT FORM */}
              {activeTab === "support" && !supportSubmitted && (
                <>
                  <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 22, color: "#152238", marginBottom: 6 }}>Support Request</h2>
                  <p style={{ color: "#667085", fontSize: 13, marginBottom: 28 }}>Facing an issue? Raise a request and our support team will assist you.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Select City *</label>
                      <select value={supportForm.city} onChange={(e) => setSupportForm({ ...supportForm, city: e.target.value, area: "" })} style={fieldStyle}>
                        <option value="">Choose city...</option>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Select Area</label>
                      <select value={supportForm.area} onChange={(e) => setSupportForm({ ...supportForm, area: e.target.value })} style={{ ...fieldStyle, color: supportForm.area ? "#344054" : "#9CA3AF" }} disabled={!supportForm.city}>
                        <option value="">{supportForm.city ? "Choose area..." : "Select city first"}</option>
                        {(areas[supportForm.city] || []).map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Mobile Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={supportForm.mobile}
                      onChange={(e) => setSupportForm({ ...supportForm, mobile: e.target.value })}
                      style={fieldStyle} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Request Type</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["complaint", "I need help", "feedback"].map((t) => (
                        <button key={t} onClick={() => setSupportForm({ ...supportForm, type: t })}
                          style={{ padding: "8px 18px", borderRadius: 999, border: "1px solid", borderColor: supportForm.type === t ? "#CC0000" : "#E4E7EC", background: supportForm.type === t ? "rgba(204,0,0,0.08)" : "#fff", color: supportForm.type === t ? "#CC0000" : "#667085", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea rows={4} placeholder="Describe your issue..." value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      style={{ ...fieldStyle, resize: "vertical" }} />
                  </div>
                  <button onClick={handleSupportSubmit}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: "#14213D", color: "#fff", border: "none", borderRadius: 8, padding: "13px 32px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}>
                    <Send size={16} /> Submit Request
                  </button>
                  <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 12 }}>Form will be sent to support@vbctv.in</p>
                </>
              )}
              {activeTab === "support" && supportSubmitted && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 64, height: 64, background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle size={28} color="#CC0000" />
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: "#14213D", marginBottom: 10 }}>Request Submitted!</h3>
                  <p style={{ color: "#667085", fontSize: 13 }}>Our support team will respond within 2 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
