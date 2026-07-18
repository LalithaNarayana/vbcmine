"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

interface ContactSettings {
  contact1?: string;
  contact2?: string;
  whatsappNumber?: string;
  mail1?: string;
  mail2?: string;
  address?: string; // CKEditor HTML
  workingHours?: string; // CKEditor HTML
}

interface ContactHeading {
  tag?: string;
  titlePart1?: string;
  titlePart2?: string;
  description?: string;
}

interface ContactPageClientProps {
  settings: ContactSettings;
  cities: string[];
  heading?: ContactHeading;
}

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

export default function ContactPageClient({ settings, cities, heading }: ContactPageClientProps) {
  const [activeTab, setActiveTab] = useState<"sales" | "support">("sales");

  const [salesForm, setSalesForm] = useState({
    city: "",
    address: "",
    mobile: "",
    message: "",
  });

  const [supportForm, setSupportForm] = useState({
    type: "complaint",
    accountId: "",
    mobile: "",
    message: "",
    address: "",
    helpMobile: "",
  });

  const [salesSubmitted, setSalesSubmitted] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleSalesSubmit = () => {
    if (salesForm.city && salesForm.mobile && salesForm.message)
      setSalesSubmitted(true);
  };

  const handleSupportSubmit = () => {
    if (supportForm.type === "complaint") {
      if (supportForm.accountId && supportForm.mobile && supportForm.message)
        setSupportSubmitted(true);
    } else {
      if (supportForm.helpMobile && supportForm.message) setSupportSubmitted(true);
    }
  };

  const infoBlocks = [
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      html: settings.address || "",
      lines: null as string[] | null,
      hrefPrefix: null as string | null,
    },
    {
      icon: <Phone size={20} />,
      title: "Call Us",
      html: "",
      lines: [settings.contact1, settings.contact2].filter(Boolean) as string[],
      hrefPrefix: "tel:",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      html: "",
      lines: [settings.mail1, settings.mail2].filter(Boolean) as string[],
      hrefPrefix: "mailto:",
    },
    {
      icon: <Clock size={20} />,
      title: "Working Hours",
      html: settings.workingHours || "",
      lines: null as string[] | null,
      hrefPrefix: null as string | null,
    },
  ].filter((item) => (item.lines && item.lines.length > 0) || item.html.trim().length > 0);

  const waDigits = (settings.whatsappNumber || "").replace(/[^\d]/g, "");

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero — same structure as Business Services / FAQ pages */}
      <section
        style={{
          padding: "100px 24px 80px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(20,33,61,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,61,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 350,
            background: "radial-gradient(ellipse, rgba(204,0,0,0.10) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 20 }}>
            {heading?.tag || "Contact Us"}
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(48px, 7vw, 88px)",
              letterSpacing: 2,
              color: "#152238",
              lineHeight: 0.95,
              marginBottom: 20,
            }}
          >
            {heading?.titlePart1 || "WE'RE HERE"}{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              {heading?.titlePart2 || "TO HELP"}
            </span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#475467", lineHeight: 1.8 }}>
            {heading?.description || "Sales enquiries, technical support, complaints, or feedback — our team is here to help, 24/7."}
          </p>
        </div>
      </section>

      {/* Main */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 48,
          }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <div>
            {infoBlocks.length === 0 ? (
              <p style={{ textAlign: "center", color: "#98A2B3", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "20px 0" }}>
                Contact details will appear here once added from the admin panel.
              </p>
            ) : (
              infoBlocks.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(20,33,61,0.08)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      minWidth: 44,
                      background: "rgba(204,0,0,0.1)",
                      border: "1px solid rgba(204,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#CC0000",
                      borderRadius: 8,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#CC0000",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    {item.lines ? (
                      item.lines.map((line, j) =>
                        item.hrefPrefix ? (
                          <a
                            key={j}
                            href={`${item.hrefPrefix}${item.hrefPrefix === "tel:" ? line.replace(/[^\d+]/g, "") : line}`}
                            style={{ display: "block", fontSize: 13, color: "#475467", lineHeight: 1.8, textDecoration: "none" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#CC0000")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#475467")}
                          >
                            {line}
                          </a>
                        ) : (
                          <div key={j} style={{ fontSize: 13, color: "#475467", lineHeight: 1.8 }}>
                            {line}
                          </div>
                        )
                      )
                    ) : (
                      <div
                        className="ck-content"
                        style={{ fontSize: 13, color: "#475467", lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      />
                    )}
                  </div>
                </div>
              ))
            )}

            {waDigits && (
              <a
                href={`https://wa.me/${waDigits}?text=Hi%20VBC%2C%20I%20need%20support`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 24,
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  padding: "16px 32px",
                  textDecoration: "none",
                  borderRadius: 8,
                  position: "relative",
                  overflow: "hidden",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "white",
                      letterSpacing: 1,
                    }}
                  >
                    Chat on WhatsApp
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                    Instant response — 24/7 support
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Right: Tabbed forms */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(20,33,61,0.08)",
              boxShadow: "0 18px 40px rgba(20,33,61,0.06)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: "2px solid #f0f0f0" }}>
              {(["sales", "support"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: "18px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: 0.5,
                    color: activeTab === tab ? "#CC0000" : "#667085",
                    borderBottom: activeTab === tab ? "3px solid #CC0000" : "3px solid transparent",
                    marginBottom: -2,
                    textTransform: "capitalize",
                  }}
                >
                  {tab === "sales" ? "📋 Sales Enquiry" : "🛠️ Support Request"}
                </button>
              ))}
            </div>

            <div style={{ padding: "36px 40px" }}>

              {/* ── SALES FORM ─────────────────────────────────────────── */}
              {activeTab === "sales" && !salesSubmitted && (
                <>
                  <h2
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "#152238",
                      marginBottom: 6,
                    }}
                  >
                    New Connection / Sales
                  </h2>
                  <p style={{ color: "#667085", fontSize: 13, marginBottom: 28 }}>
                    Interested in a new connection? Fill this form and our sales team will contact you.
                  </p>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Select City *</label>
                    <select
                      value={salesForm.city}
                      onChange={(e) => setSalesForm({ ...salesForm, city: e.target.value })}
                      style={fieldStyle}
                    >
                      <option value="">Choose city...</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Address with Landmark</label>
                    <textarea
                      rows={3}
                      placeholder="Enter your full address with a nearby landmark..."
                      value={salesForm.address}
                      onChange={(e) => setSalesForm({ ...salesForm, address: e.target.value })}
                      style={{ ...fieldStyle, resize: "vertical" }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={salesForm.mobile}
                      onChange={(e) => setSalesForm({ ...salesForm, mobile: e.target.value })}
                      style={fieldStyle}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      value={salesForm.message}
                      onChange={(e) => setSalesForm({ ...salesForm, message: e.target.value })}
                      style={{ ...fieldStyle, resize: "vertical" }}
                    />
                  </div>

                  <button
                    onClick={handleSalesSubmit}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#CC0000",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "13px 32px",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    <Send size={16} /> Submit to Sales
                  </button>
                </>
              )}

              {activeTab === "sales" && salesSubmitted && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(204,0,0,0.1)",
                      border: "1px solid rgba(204,0,0,0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <CheckCircle size={28} color="#CC0000" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 28,
                      color: "#14213D",
                      marginBottom: 10,
                    }}
                  >
                    Enquiry Submitted!
                  </h3>
                  <p style={{ color: "#667085", fontSize: 13 }}>
                    Our sales team will call you within 2 hours.
                  </p>
                </div>
              )}

              {/* ── SUPPORT FORM ───────────────────────────────────────── */}
              {activeTab === "support" && !supportSubmitted && (
                <>
                  <h2
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "#152238",
                      marginBottom: 6,
                    }}
                  >
                    Support Request
                  </h2>
                  <p style={{ color: "#667085", fontSize: 13, marginBottom: 28 }}>
                    Facing an issue? Raise a request and our support team will assist you.
                  </p>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Request Type</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["complaint", "I need help", "feedback"].map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            setSupportForm({
                              type: t,
                              accountId: "",
                              mobile: "",
                              message: "",
                              address: "",
                              helpMobile: "",
                            })
                          }
                          style={{
                            padding: "8px 18px",
                            borderRadius: 999,
                            border: "1px solid",
                            borderColor: supportForm.type === t ? "#CC0000" : "#E4E7EC",
                            background: supportForm.type === t ? "rgba(204,0,0,0.08)" : "#fff",
                            color: supportForm.type === t ? "#CC0000" : "#667085",
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                            textTransform: "capitalize",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {supportForm.type === "complaint" && (
                    <>
                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Account ID *</label>
                        <input
                          type="text"
                          placeholder="Enter your VBC Account ID"
                          value={supportForm.accountId}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, accountId: e.target.value })
                          }
                          style={fieldStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Mobile Number *</label>
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={supportForm.mobile}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, mobile: e.target.value })
                          }
                          style={fieldStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>Message *</label>
                        <textarea
                          rows={4}
                          placeholder="Describe your complaint..."
                          value={supportForm.message}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, message: e.target.value })
                          }
                          style={{ ...fieldStyle, resize: "vertical" }}
                        />
                      </div>
                    </>
                  )}

                  {(supportForm.type === "I need help" || supportForm.type === "feedback") && (
                    <>
                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Address with Landmark</label>
                        <textarea
                          rows={3}
                          placeholder="Enter your full address with a nearby landmark..."
                          value={supportForm.address}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, address: e.target.value })
                          }
                          style={{ ...fieldStyle, resize: "vertical" }}
                        />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Mobile Number *</label>
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={supportForm.helpMobile}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, helpMobile: e.target.value })
                          }
                          style={fieldStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>Message *</label>
                        <textarea
                          rows={4}
                          placeholder={
                            supportForm.type === "feedback"
                              ? "Share your feedback..."
                              : "Describe your issue..."
                          }
                          value={supportForm.message}
                          onChange={(e) =>
                            setSupportForm({ ...supportForm, message: e.target.value })
                          }
                          style={{ ...fieldStyle, resize: "vertical" }}
                        />
                      </div>
                    </>
                  )}

                  <button
                    onClick={handleSupportSubmit}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#14213D",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "13px 32px",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    <Send size={16} /> Submit Request
                  </button>
                </>
              )}

              {activeTab === "support" && supportSubmitted && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(204,0,0,0.1)",
                      border: "1px solid rgba(204,0,0,0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <CheckCircle size={28} color="#CC0000" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 28,
                      color: "#14213D",
                      marginBottom: 10,
                    }}
                  >
                    Request Submitted!
                  </h3>
                  <p style={{ color: "#667085", fontSize: 13 }}>
                    Our support team will respond within 2 hours.
                  </p>
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