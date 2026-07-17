import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import BusinessService from "@/models/BusinessService";
import SalesCity from "@/models/SalesCity";
import { getOrCreateSettings } from "@/models/Settings";
import AppIcon from "@/components/admin/DynamicIcon";
import ServiceEnquireButton from "@/components/services/ServiceEnquireButton";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();

  const [service, allServices, settings, cityDocs] = await Promise.all([
    BusinessService.findOne({ slug }).lean(),
    BusinessService.find().sort({ order: 1, createdAt: 1 }).lean(),
    getOrCreateSettings(),
    SalesCity.find().sort({ order: 1, createdAt: 1 }).lean(),
  ]);

  if (!service) {
    notFound();
  }

  const serviceOptions = allServices.map((s) => ({ _id: String(s._id), name: s.name }));
  const cityNames = cityDocs.map((c) => c.name);

  const phone = settings.contact1 || settings.contact2 || "";
  const email = settings.mail1 || settings.mail2 || "";

  const otherServices = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <section
        style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
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

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#CC0000",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: 24,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Services
          </Link>
          <br />

          {service.badge && (
            <div
              style={{
                display: "inline-block",
                background: "rgba(221, 81, 81, 0.14)",
                color: "#ff0000",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 2,
                padding: "5px 14px",
                borderRadius: 999,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {service.badge}
            </div>
          )}

          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(42px, 6vw, 80px)",
              letterSpacing: 2,
              color: "#152238",
              lineHeight: 0.95,
              marginBottom: 16,
            }}
          >
            {service.name}
          </h1>

          {service.tagline && (
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#CC0000",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {service.tagline}
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}
            className="service-detail-grid"
          >
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  marginBottom: 32,
                  height: 260,
                  background: "linear-gradient(135deg, #14213D, #1e3a5f)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {service.image ? (
                  <Image src={service.image} alt={service.name} fill style={{ objectFit: "cover", opacity: 0.85 }} />
                ) : (
                  <div style={{ color: "rgba(255,255,255,0.85)" }}>
                    <AppIcon name={service.icon} size={64} />
                  </div>
                )}
              </div>

              {(phone || email) && (
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(204,0,0,0.04)",
                    border: "1px solid rgba(204,0,0,0.15)",
                    borderRadius: 10,
                  }}
                >
                  <strong style={{ color: "#CC0000", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, display: "block", marginBottom: 10 }}>
                    For more details:
                  </strong>
                  {phone && (
                    <p style={{ color: "#475467", fontSize: 14, margin: "0 0 4px 0" }}>
                      Call:{" "}
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} style={{ color: "#14213D", fontWeight: 700, textDecoration: "none" }}>
                        {phone}
                      </a>
                    </p>
                  )}
                  {email && (
                    <p style={{ color: "#475467", fontSize: 14, margin: 0 }}>
                      Email:{" "}
                      <a href={`mailto:${email}`} style={{ color: "#CC0000", textDecoration: "none" }}>
                        {email}
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div style={{ marginTop: 24, textAlign: "center" }}>
                <ServiceEnquireButton
                  serviceId={String(service._id)}
                  services={serviceOptions}
                  cities={cityNames}
                />
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, letterSpacing: 1, color: "#14213D", marginBottom: 6 }}>
                {service.name}
              </h2>
              {service.tagline && (
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#CC0000",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  At VBC
                </p>
              )}

              {service.description && (
                <div
                  className="ck-content"
                  style={{ color: "#475467", fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              )}

              {service.bulletPoints && service.bulletPoints.length > 0 && (
                <>
                  <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 17, color: "#14213D", marginBottom: 10 }}>
                    Key Features
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
                    {service.bulletPoints.map((point: string, i: number) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, fontSize: 14, color: "#475467" }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: 7 }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      {otherServices.length > 0 && (
        <section style={{ padding: "0 24px 100px", background: "#ffffff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ width: 4, height: 32, background: "linear-gradient(180deg, #CC0000, #E43B2C)", borderRadius: 2, flexShrink: 0 }} />
                <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, letterSpacing: 2, color: "#14213D", margin: 0 }}>
                  OTHER{" "}
                  <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>SERVICES</span>
                </h2>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#475467", marginLeft: 20, lineHeight: 1.7 }}>
                Explore more enterprise solutions from VBC.
              </p>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "flex-start" }}>
              {otherServices.map((s) => (
                <div
                  key={String(s._id)}
                  className="other-service-card"
                  style={{
                    position: "relative",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    minHeight: 300,
                    width: "calc(33.333% - 16px)",
                    minWidth: 260,
                    maxWidth: 360,
                  }}
                >
                  {s.image ? (
                    <img
                      src={s.image}
                      alt=""
                      aria-hidden="true"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                    />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #14213D, #1e3a5f)" }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(20,33,61,0.82) 0%, rgba(8,14,28,0.75) 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: "32px 28px 28px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 60,
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.93)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
                        marginBottom: 16,
                        color: "#14213D",
                      }}
                    >
                      <AppIcon name={s.icon} size={28} />
                    </div>
                    <div style={{ width: 30, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 12 }} />
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 20,
                        letterSpacing: 1,
                        color: "#FFFFFF",
                        marginBottom: 6,
                        lineHeight: 1.1,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.name}
                    </h3>
                    {s.tagline && (
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          color: "rgba(255,255,255,0.75)",
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginBottom: 20,
                        }}
                      >
                        {s.tagline}
                      </p>
                    )}
                    <Link
                      href={`/services/${s.slug}`}
                      style={{
                        display: "inline-block",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 800,
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        textDecoration: "none",
                        background: "linear-gradient(135deg, #CC0000, #E43B2C)",
                        color: "#fff",
                        padding: "10px 24px",
                        borderRadius: 999,
                        boxShadow: "0 5px 16px rgba(204,0,0,0.4)",
                        marginTop: "auto",
                      }}
                    >
                      View Service
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36, textAlign: "center" }}>
              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#CC0000",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(204,0,0,0.3)",
                  paddingBottom: 2,
                }}
              >
                View All Business Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media(max-width:768px){.service-detail-grid{grid-template-columns:1fr!important;}}
        .other-service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .other-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px rgba(0,0,0,0.45);
        }
      `}</style>
    </div>
  );
}
