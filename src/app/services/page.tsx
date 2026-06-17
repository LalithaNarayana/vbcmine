"use client";
import Link from "next/link";

const services = [
  {
    id: "ill",
    title: "Internet Leased Lines (ILL)",
    subtitle: "Dedicated High-Speed Symmetric Connectivity",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
      </svg>
    ),
    image: "/images/service1.jpeg",
    highlights: [
      "Dedicated Bandwidth",
      "Symmetrical Upload & Download Speeds",
      "Static Public IP Addresses",
      "SLA-backed uptime guarantee",
      "99%+ network availability",
      "24/7 Monitoring & Technical Support",
    ],
    contact: { phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in" },
  },
  {
    id: "mpls",
    title: "MPLS Connectivity",
    subtitle: "Point-to-Point and Point-to-Multipoint",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
        <line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" />
      </svg>
    ),
    image: "/images/service2.jpeg",
    highlights: [
      "Layer 2 MPLS P2P",
      "Layer 3 MPLS P2P VPN",
      "Layer 2 & 3 P2MP Services",
      "Dedicated Private Connectivity",
      "Quality of Service (QoS)",
      "High Availability & Scalability",
    ],
    contact: { phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in" },
  },
  {
    id: "hosting",
    title: "Hosting & Server Colocation",
    subtitle: "Secure Data Center Services",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    image: "/images/service3.jpeg",
    highlights: [
      "Dedicated Servers",
      "Virtual Private Servers (VPS)",
      "Private & Hybrid Cloud",
      "Rack Space & Power",
      "High-speed Fiber Connectivity",
      "Remote Hands & Managed Services",
    ],
    contact: { phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in" },
  },
  {
    id: "voip",
    title: "VOIP / IBS Solutions",
    subtitle: "Voice over IP and Enterprise Telephony",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.07 6.07l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    image: "/images/service4.jpeg",
    highlights: [
      "Hosted VoIP",
      "SIP Trunking Services",
      "IP Centrex Services",
      "Unified Communications",
      "IP Phones & Soft Phones",
      "IP PBX Solutions",
    ],
    contact: { phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in" },
  },
  {
    id: "optical-fiber",
    title: "Optical Fiber Lease",
    subtitle: "Dedicated Underground Fiber Connectivity",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    image: "/images/service2.jpeg",
    highlights: [
      "Dark Fiber Leasing",
      "Point-to-Point Connectivity",
      "Underground Fiber Infrastructure",
      "Enterprise & Telecom Grade",
      "Scalable Bandwidth",
      "SLA-backed Uptime",
    ],
    contact: { phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in" },
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{
        padding: "100px 24px 80px",
        background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(20,33,61,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,61,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 700, height: 350, background: "radial-gradient(ellipse, rgba(204,0,0,0.10) 0%, transparent 70%)", zIndex: 0 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 20 }}>
            Business Services
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px, 7vw, 88px)", letterSpacing: 2, color: "#152238", lineHeight: 0.95, marginBottom: 20 }}>
            ENTERPRISE <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>SOLUTIONS</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#475467", lineHeight: 1.8 }}>
            Reliable, high-performance connectivity and infrastructure services for businesses across Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section style={{ padding: "80px 24px 100px", background: "#ffffff", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: -120, right: -120, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(204,0,0,0.09) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0,
        }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
            {services.map((service, i) => (
              <div
                key={service.id}
                style={{
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  minHeight: 420,
                  width: "calc(33.333% - 20px)",
                  minWidth: 300,
                  maxWidth: 420,
                  cursor: "default",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 28px 60px rgba(0,0,0,0.55)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* BG image */}
                <img
                  src={service.image}
                  alt=""
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
                  onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                {/* Dark overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(46, 56, 78, 0.75) 0%, rgba(8, 14, 28, 0.67) 100%)" }} />
                {/* Content — centered */}
                <div style={{
                  position: "relative", zIndex: 1,
                  padding: "44px 32px 40px",
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                }}>
                  {/* Icon */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 72, height: 72, borderRadius: 18,
                    background: "rgba(255,255,255,0.94)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    marginBottom: 20,
                  }}>
                    {service.icon}
                  </div>

                  {/* Red divider */}
                  <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 16 }} />

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Bebas Neue', cursive", fontSize: 24, letterSpacing: 1,
                    color: "#FFFFFF", marginBottom: 6, lineHeight: 1.1, textTransform: "uppercase",
                  }}>{service.title}</h3>

                  {/* Subtitle in red */}
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11,
                    color: "#ffffffd1", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 22,
                  }}>{service.subtitle}</p>

                  {/* Bullet points - left aligned with centered container */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", width: "100%", maxWidth: 280, textAlign: "left" }}>
                    {service.highlights.map((h, j) => (
                      <li key={j} style={{
                        display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#dee8ff",
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: 6 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Contact box */}
                  <div style={{
                    padding: "14px 20px", background: "rgba(212, 97, 97, 0.31)",
                    border: "1px solid rgba(204,0,0,0.25)", borderRadius: 8,
                    fontSize: 12, color: "#dee8ff", fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.8, width: "100%", marginBottom: 20, textAlign: "center",
                  }}>
                    <strong style={{ color: "#f98888", fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: 0.5 }}>For more details:</strong><br />
                    Call: <a href="tel:08916677123" style={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>{service.contact.phone}</a><br />
                    Email: <a href={`mailto:${service.contact.email}`} style={{ color: "#ffffff", textDecoration: "none" }}>{service.contact.email}</a>
                  </div>

                  {/* View Service Button */}
                  <Link href={`/services/${service.id}`} style={{
                    display: "inline-block",
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 800,
                    fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                    textDecoration: "none",
                    background: "linear-gradient(135deg, #CC0000, #E43B2C)",
                    color: "#fff",
                    padding: "11px 28px", borderRadius: 999,
                    boxShadow: "0 6px 20px rgba(204,0,0,0.4)",
                    transition: "all 0.2s",
                  }}>
                    View Service
                  </Link>
                </div>

                {/* Bottom accent */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .services-grid > div { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}