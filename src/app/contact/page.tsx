"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.mobile && form.message) {
      setSubmitted(true);
    }
  };

  const contactItems = [
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
  ];

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
            Get in Touch
          </div>
          <h1 className="contact-hero-title">
            WE'RE HERE
            <br />
            <span style={{ color: "#CC0000" }}>TO HELP</span>
          </h1>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="contact-main">
        <div className="contact-grid">

          {/* ── Left: Contact Info ── */}
          <div className="contact-info-col">
            {contactItems.map((item, i) => (
              <div key={i} className="contact-info-row">
                <div className="contact-icon-box">
                  {item.icon}
                </div>
                <div>
                  <div className="contact-item-label">{item.title}</div>
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
              className="whatsapp-btn"
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

          {/* ── Right: Contact Form ── */}
          <div className="contact-form-card">
            {!submitted ? (
              <>
                <h2 className="contact-form-title">Send us a Message</h2>
                <p style={{ color: "#667085", fontSize: "13px", marginBottom: "28px" }}>
                  Have a question or need support? Fill the form and we'll get back to you within 2 hours.
                </p>

                {/* Name + Mobile — stacked on mobile, side-by-side on desktop */}
                <div className="form-row-2col">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="vbc-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Mobile Number *</label>
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
                  <label className="form-label">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="vbc-input"
                    style={{ background: "#ffffff", color: form.subject ? "#152238" : "#667085" }}
                  >
                    <option value="">Select a topic</option>
                    <option value="new-connection">New Connection</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Query</option>
                    <option value="upgrade">Plan Upgrade</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label className="form-label">Message *</label>
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
                  className="btn-primary contact-submit-btn"
                  style={{
                    opacity: !form.name || !form.mobile || !form.message ? 0.5 : 1,
                    cursor: !form.name || !form.mobile || !form.message ? "not-allowed" : "pointer",
                  }}
                >
                  <Send size={16} />
                  Send Message
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div className="contact-success-icon">
                  <CheckCircle size={32} color="#CC0000" />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "28px", letterSpacing: "2px", color: "#152238", marginBottom: "10px" }}>
                  MESSAGE SENT!
                </h3>
                <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.7" }}>
                  Thank you, <strong style={{ color: "#152238" }}>{form.name}</strong>! We've received your
                  message and will respond within 2 hours to{" "}
                  <strong style={{ color: "#CC0000" }}>{form.mobile}</strong>.
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
      </section>

      {/* ── Scoped CSS ── */}
      <style>{`
        /* Hero */
        .contact-hero {
  padding: 72px 24px 48px;
  background: linear-gradient(180deg, #fff7f5 0%, #ffffff 100%);
}
.contact-hero-inner {
  max-width: 1280px;
  margin: 0 auto;
}
.contact-hero-title {
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(48px, 7vw, 90px);
  letter-spacing: 2px;
  color: #152238;
  line-height: 1;
}

        /* Main section */
        .contact-main {
          padding: 32px 20px 100px;
        }

        /* Grid: single column on mobile → two columns on desktop */
        .contact-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 900px) {
          .contact-main { padding: 40px 24px 100px; }
          .contact-grid { grid-template-columns: 1fr 2fr; gap: 48px; }
        }

        /* Info column */
        .contact-info-col {
          display: flex;
          flex-direction: column;
        }

        /* Each info row */
        .contact-info-row {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(20,33,61,0.08);
          align-items: flex-start;
        }

        /* Icon box */
        .contact-icon-box {
          width: 44px;
          height: 44px;
          min-width: 44px;
          background: rgba(204,0,0,0.1);
          border: 1px solid rgba(204,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CC0000;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .contact-item-label {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #CC0000;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* WhatsApp button */
        .whatsapp-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          padding: 16px 20px;
          background: rgba(37,211,102,0.08);
          border: 1px solid rgba(37,211,102,0.2);
          text-decoration: none;
          transition: background 0.2s;
          border-radius: 4px;
        }
        .whatsapp-btn:hover {
          background: rgba(37,211,102,0.15);
        }

        /* Form card */
        .contact-form-card {
          background: #ffffff;
          border: 1px solid rgba(20,33,61,0.08);
          box-shadow: 0 18px 40px rgba(20,33,61,0.06);
          padding: 24px 20px;
          border-radius: 4px;
        }
        @media (min-width: 480px) {
          .contact-form-card { padding: 32px 28px; }
        }
        @media (min-width: 900px) {
          .contact-form-card { padding: 40px; }
        }

        .contact-form-title {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #152238;
          margin-bottom: 8px;
        }

        /* Form label */
        .form-label {
          display: block;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 11px;
          color: #667085;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* 2-col row → stacked on mobile, side-by-side on sm+ */
        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (min-width: 500px) {
          .form-row-2col { grid-template-columns: 1fr 1fr; }
        }

        /* Submit button — full-width on mobile */
        .contact-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          clip-path: none;
          padding: 14px 32px;
          width: 100%;
        }
        @media (min-width: 500px) {
          .contact-submit-btn { width: auto; }
        }

        /* Success icon */
        .contact-success-icon {
          width: 64px;
          height: 64px;
          background: rgba(204,0,0,0.1);
          border: 1px solid rgba(204,0,0,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
      `}</style>
    </div>
  );
}