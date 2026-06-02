"use client";
import { Globe, Phone, Server, Shield, Tv, Wifi } from "lucide-react";

const services = [
  {
    icon: Wifi,
    title: "Fiber Broadband",
    desc: "Home and business internet with dependable speeds, unlimited usage and modern fiber infrastructure.",
    speed: "Up to 1 Gbps",
  },
  {
    icon: Tv,
    title: "Digital TV",
    desc: "A straightforward TV service with entertainment, news and sports packages for daily viewing.",
    speed: "250+ channels",
  },
  {
    icon: Globe,
    title: "IPTV Services",
    desc: "Connected TV experiences with multi-screen viewing, on-demand content and sharper control.",
    speed: "HD and 4K ready",
  },
  {
    icon: Server,
    title: "Leased Lines",
    desc: "Dedicated connectivity for offices and teams that need consistent performance and uptime.",
    speed: "Business SLA",
  },
  {
    icon: Phone,
    title: "VoIP Solutions",
    desc: "Voice services for growing teams that want stable calling over a managed network connection.",
    speed: "HD voice",
  },
  {
    icon: Shield,
    title: "Enterprise Hosting",
    desc: "Infrastructure support for businesses that need secure hosting and stronger local assistance.",
    speed: "99.99% uptime",
  },
];

export default function ServicesSection() {
  return (
    <section style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ maxWidth: "720px", marginBottom: "34px" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
            Services
          </div>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.15, color: "#152238", marginBottom: "14px" }}>
            One provider for internet, TV and business connectivity.
          </h2>
          <p style={{ color: "#667085", fontSize: "16px", lineHeight: 1.8 }}>
            The content already in this project is strong, so the goal here is clarity: cleaner cards, better spacing and a more believable service overview.
          </p>
        </div>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="plan-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E4E7EC",
                  borderRadius: "24px",
                  padding: "26px",
                  boxShadow: "0 14px 40px rgba(20, 33, 61, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "18px",
                    background: "#FFF1EE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <Icon size={24} color="#CC0000" />
                </div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "21px", color: "#152238", marginBottom: "10px" }}>
                  {service.title}
                </h3>
                <p style={{ color: "#667085", fontSize: "14px", lineHeight: 1.75, marginBottom: "18px" }}>{service.desc}</p>
                <div style={{ color: "#CC0000", fontWeight: 700, fontSize: "13px", letterSpacing: "0.3px" }}>{service.speed}</div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
