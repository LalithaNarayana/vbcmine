"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.mobile && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ paddingTop: "0px", background: "#ffffff", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(180deg, #fff7f5 0%, #ffffff 100%)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Get in Touch</div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(50px, 7vw, 90px)",
              letterSpacing: "2px",
              color: "#152238",
              lineHeight: 1,
            }}
          >
            WE'RE HERE
            <br />
            <span style={{ color: "#CC0000" }}>TO HELP</span>
          </h1>
        </div>
      </section>

      {/* Main */}
      <section style={{ padding: "40px 24px 100px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "48px",
          }}
        >
          {/* Left: Contact Info */}
          <div>
            {[
              {
                icon: <MapPin size={20} />,
                title: "Visit Us",
                lines: ["VBC House, MVP Colony,", "Visakhapatnam – 530017", "Andhra Pradesh, India"],
              },
              {
                icon: <Phone size={20} />,
                title: "Call Us",
                lines: ["1800-XXX-XXXX (Toll Free)", "+91 891 000 0000", "+91 891 000 0001"],
              },
              {
                icon: <Mail size={20} />,
                title: "Email Us",
                lines: ["support@vbconfiber.com", "billing@vbconfiber.com", "sales@vbconfiber.com"],
              },
              {
                icon: <Clock size={20} />,
                title: "Working Hours",
                lines: ["Mon–Sat: 9:00 AM – 8:00 PM", "Sun: 10:00 AM – 5:00 PM", "Support: 24/7"],
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(20,33,61,0.08)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(204,0,0,0.1)",
                    border: "1px solid rgba(204,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#CC0000",
                    flexShrink: 0,
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#CC0000",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </div>
                  {item.lines.map((line, j) => (
                    <div key={j} style={{ fontSize: "13px", color: "#475467", lineHeight: "1.8" }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "24px",
                padding: "16px 20px",
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.2)",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.15)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.08)")}
            >
              <MessageCircle size={24} color="#25D366" />
              <div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#25D366" }}>
                  Chat on WhatsApp
                </div>
                <div style={{ fontSize: "12px", color: "#667085" }}>Quick replies during business hours</div>
              </div>
            </a>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
            {!submitted ? (
              <>
                <h2
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#152238",
                    marginBottom: "8px",
                  }}
                >
                  Send us a Message
                </h2>
                <p style={{ color: "#667085", fontSize: "13px", marginBottom: "32px" }}>
                  Have a question or need support? Fill the form and we'll get back to you within 2 hours.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="vbc-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="vbc-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="vbc-input"
                    style={{ background: "#ffffff", color: form.subject ? "#152238" : "#667085" }}
                  >
                    <option value="" style={{ background: "#ffffff", color: "#152238" }}>Select a topic</option>
                    <option value="new-connection" style={{ background: "#ffffff", color: "#152238" }}>New Connection</option>
                    <option value="technical" style={{ background: "#ffffff", color: "#152238" }}>Technical Support</option>
                    <option value="billing" style={{ background: "#ffffff", color: "#152238" }}>Billing Query</option>
                    <option value="upgrade" style={{ background: "#ffffff", color: "#152238" }}>Plan Upgrade</option>
                    <option value="other" style={{ background: "#ffffff", color: "#152238" }}>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your issue or query..."
                    rows={5}
                    className="vbc-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.mobile || !form.message}
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: !form.name || !form.mobile || !form.message ? 0.5 : 1,
                    cursor: !form.name || !form.mobile || !form.message ? "not-allowed" : "pointer",
                    clipPath: "none",
                    padding: "14px 32px",
                  }}
                >
                  <Send size={16} />
                  Send Message
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(204,0,0,0.1)",
                    border: "1px solid rgba(204,0,0,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    color: "#CC0000",
                  }}
                >
                  <Send size={28} />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#152238", marginBottom: "10px" }}>
                  MESSAGE SENT!
                </h3>
                <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.7" }}>
                  Thank you, <strong style={{ color: "#152238" }}>{form.name}</strong>! We've received your message and will respond within 2 hours to <strong style={{ color: "#CC0000" }}>{form.mobile}</strong>.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", subject: "", message: "" }); }}
                  className="btn-outline"
                  style={{ marginTop: "24px", cursor: "pointer" }}
                >
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
        <style>{`@media(max-width:900px){section > div > div[style]{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </div>
  );
}
