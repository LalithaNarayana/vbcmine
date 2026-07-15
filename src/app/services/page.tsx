import Link from "next/link";
import connectDB from "@/lib/mongodb";
import BusinessService from "@/models/BusinessService";
import { getOrCreateSettings } from "@/models/Settings";
import { getOrCreateSectionHeadings } from "@/models/SectionHeading";
import AppIcon from "@/components/admin/DynamicIcon";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  await connectDB();

  const [services, settings, headings] = await Promise.all([
    BusinessService.find().sort({ order: 1, createdAt: 1 }).lean(),
    getOrCreateSettings(),
    getOrCreateSectionHeadings(),
  ]);

  const heading = JSON.parse(JSON.stringify(headings.servicesPage));

  const phone = settings.contact1 || settings.contact2 || "";
  const email = settings.mail1 || settings.mail2 || "";

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
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
            {heading.tag || "Business Services"}
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
            {heading.titlePart1 || "ENTERPRISE"}{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>{heading.titlePart2 || "SOLUTIONS"}</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#475467", lineHeight: 1.8 }}>
            {heading.description || "Reliable, high-performance connectivity and infrastructure services for businesses across Andhra Pradesh."}
          </p>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section style={{ padding: "80px 24px 100px", background: "#ffffff", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(204,0,0,0.09) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {services.length === 0 ? (
            <p style={{ textAlign: "center", color: "#98A2B3" }}>
              Our business services are being updated. Please check back shortly.
            </p>
          ) : (
            <div className="services-grid" style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
              {services.map((service) => (
                <div
                  key={String(service._id)}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    minHeight: 420,
                    width: "calc(33.333% - 20px)",
                    minWidth: 300,
                    maxWidth: 420,
                  }}
                  className="business-service-card"
                >
                  {/* BG image */}
                  {service.image && (
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
                    />
                  )}
                  {!service.image && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #14213D, #1e3a5f)",
                      }}
                    />
                  )}
                  {/* Dark overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(160deg, rgba(46, 56, 78, 0.75) 0%, rgba(8, 14, 28, 0.67) 100%)",
                    }}
                  />
                  {/* Content — centered */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: "44px 32px 40px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {/* Badge */}
                    {service.badge && (
                      <span
                        style={{
                          display: "inline-block",
                          background: "rgba(204,0,0,0.9)",
                          color: "#fff",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          padding: "4px 12px",
                          borderRadius: 999,
                          marginBottom: 16,
                        }}
                      >
                        {service.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 72,
                        height: 72,
                        borderRadius: 18,
                        background: "rgba(255,255,255,0.94)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                        marginBottom: 20,
                        color: "#14213D",
                      }}
                    >
                      <AppIcon name={service.icon} size={36} />
                    </div>

                    {/* Red divider */}
                    <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 16 }} />

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 24,
                        letterSpacing: 1,
                        color: "#FFFFFF",
                        marginBottom: 6,
                        lineHeight: 1.1,
                        textTransform: "uppercase",
                      }}
                    >
                      {service.name}
                    </h3>

                    {/* Subtitle in red-tinted white */}
                    {service.tagline && (
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          color: "#ffffffd1",
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginBottom: 22,
                        }}
                      >
                        {service.tagline}
                      </p>
                    )}

                    {/* Bullet points */}
                    {service.bulletPoints && service.bulletPoints.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", width: "100%", maxWidth: 280, textAlign: "left" }}>
                        {service.bulletPoints.slice(0, 6).map((h: string, j: number) => (
                          <li
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 10,
                              marginBottom: 9,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13,
                              color: "#dee8ff",
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: 6 }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Contact box */}
                    {(phone || email) && (
                      <div
                        style={{
                          padding: "14px 20px",
                          background: "rgba(212, 97, 97, 0.31)",
                          border: "1px solid rgba(204,0,0,0.25)",
                          borderRadius: 8,
                          fontSize: 12,
                          color: "#dee8ff",
                          fontFamily: "'DM Sans', sans-serif",
                          lineHeight: 1.8,
                          width: "100%",
                          marginBottom: 20,
                          textAlign: "center",
                        }}
                      >
                        <strong style={{ color: "#f98888", fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: 0.5 }}>
                          For more details:
                        </strong>
                        <br />
                        {phone && (
                          <>
                            Call:{" "}
                            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} style={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>
                              {phone}
                            </a>
                            <br />
                          </>
                        )}
                        {email && (
                          <>
                            Email:{" "}
                            <a href={`mailto:${email}`} style={{ color: "#ffffff", textDecoration: "none" }}>
                              {email}
                            </a>
                          </>
                        )}
                      </div>
                    )}

                    {/* View Service Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      style={{
                        display: "inline-block",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 800,
                        fontSize: 12,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        textDecoration: "none",
                        background: "linear-gradient(135deg, #CC0000, #E43B2C)",
                        color: "#fff",
                        padding: "11px 28px",
                        borderRadius: 999,
                        boxShadow: "0 6px 20px rgba(204,0,0,0.4)",
                      }}
                    >
                      View Service
                    </Link>
                  </div>

                  {/* Bottom accent */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "linear-gradient(90deg, transparent, #CC0000, transparent)",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .services-grid > div { width: 100% !important; max-width: 100% !important; }
        }
        .business-service-card {
          cursor: default;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .business-service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 60px rgba(0,0,0,0.55);
        }
      `}</style>
    </div>
  );
}
