// src/app/about/page.tsx
import type { Metadata } from "next";
import { Award, CheckCircle, Users } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { getOrCreateAbout } from "@/models/About";
import AboutStat from "@/models/AboutStat";
import TimelineItem from "@/models/TimelineItem";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us — VBC On Fiber",
  description:
    "Learn about VBC (Vizag Broadcasting Company) — Andhra Pradesh's trusted ISP delivering fiber broadband, IPTV, and enterprise connectivity.",
};

export default async function AboutPage() {
  await connectDB();

  const [about, stats, timeline] = await Promise.all([
    getOrCreateAbout(),
    AboutStat.find().sort({ order: 1, createdAt: 1 }).lean(),
    TimelineItem.find().sort({ order: 1, createdAt: 1 }).lean(),
  ]);

  return (
    <div style={{ paddingTop: "0px", background: "#ffffff" }}>
      {/* Hero */}
      <section
        style={{
          padding: "100px 24px 80px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            background: "linear-gradient(135deg, transparent, rgba(204,0,0,0.05))",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>
            {about.aboutVbc.mainTitle || "About VBC"}
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(50px, 8vw, 100px)",
              letterSpacing: "2px",
              lineHeight: 0.95,
              color: "#152238",
              maxWidth: "700px",
            }}
          >
            {about.aboutVbc.titlePart1 || "CONNECTING"}
            <br />
            <span style={{ color: "#CC0000" }}>{about.aboutVbc.titlePart2 || "Andhra Pradesh"}</span>
            <br />
            {about.aboutVbc.titlePart3 || "SINCE 2012"}
          </h1>
          <div className="red-divider" style={{ marginTop: "20px", marginBottom: "24px" }} />
          {about.aboutVbc.description ? (
            <div
              className="about-rich"
              style={{ color: "#475467", fontSize: "15px", lineHeight: "1.8", maxWidth: "600px" }}
              dangerouslySetInnerHTML={{ __html: about.aboutVbc.description }}
            />
          ) : (
            <p style={{ color: "#475467", fontSize: "15px", lineHeight: "1.8", maxWidth: "600px" }}>
              Delivering fiber broadband, Digital TV, IPTV and enterprise connectivity to Andhra Pradesh since 2012.
            </p>
          )}
        </div>
      </section>

      {/* Stats — red band */}
      {stats.length > 0 && (
        <section style={{ background: "#CC0000", padding: "0" }}>
          <div
            className="about-stats-grid"
            style={{
              maxWidth: "1420px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{ padding: "32px 16px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(22px, 3vw, 36px)",
                    color: "white",
                    letterSpacing: "1px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Company Profile + Why Choose Us */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            {/* Left column — Company Profile */}
            <div>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>
                {about.companyProfile.mainTitle || "Company Profile"}
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(36px, 5vw, 60px)",
                  letterSpacing: "2px",
                  color: "#152238",
                  marginBottom: "32px",
                  lineHeight: 1,
                }}
              >
                {about.companyProfile.titlePart1 || "WHO WE"}{" "}
                <span style={{ color: "#CC0000" }}>{about.companyProfile.titlePart2 || "ARE"}</span>
              </h2>
              {about.companyProfile.description && (
                <div
                  className="about-rich"
                  style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}
                  dangerouslySetInnerHTML={{ __html: about.companyProfile.description }}
                />
              )}
            </div>

            {/* Right column — Why Choose Us */}
            <div>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>
                {about.whySection.mainTitle || "WHY"}
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(36px, 5vw, 60px)",
                  letterSpacing: "2px",
                  color: "#152238",
                  marginBottom: "32px",
                  lineHeight: 1,
                }}
              >
                {about.whySection.titlePart1 || "WHY CHOOSE"}{" "}
                <span style={{ color: "#CC0000" }}>{about.whySection.titlePart2 || "VBC"}</span>
              </h2>
              {about.whySection.description && (
                <div
                  className="about-rich"
                  style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}
                  dangerouslySetInnerHTML={{ __html: about.whySection.description }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Success Story & Timeline */}
      <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
        <div
          className="success-grid"
          style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
        >
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>
              {about.successStory.mainTitle || "Our Success Story"}
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: "2px",
                color: "#152238",
                marginBottom: "24px",
                lineHeight: 1,
              }}
            >
              {about.successStory.titlePart1 || "FROM A SMALL SETUP"}
              <br />
              <span style={{ color: "#CC0000" }}>{about.successStory.titlePart2 || "TO AP'S BACKBONE"}</span>
            </h2>
            {about.successStory.description && (
              <div
                className="about-rich"
                style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}
                dangerouslySetInnerHTML={{ __html: about.successStory.description }}
              />
            )}
          </div>

          {/* Timeline */}
          {timeline.length > 0 && (
            <div style={{ position: "relative", paddingLeft: "32px" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20px",
                  bottom: "20px",
                  width: "2px",
                  background: "linear-gradient(180deg, #CC0000 0%, rgba(204,0,0,0.1) 100%)",
                }}
              />
              {timeline.map((item, i) => (
                <div key={i} style={{ marginBottom: i < timeline.length - 1 ? "40px" : "0", position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "-39px",
                      top: "8px",
                      width: "14px",
                      height: "14px",
                      background: "#CC0000",
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "20px",
                      color: "#CC0000",
                      letterSpacing: "2px",
                      marginBottom: "6px",
                    }}
                  >
                    {item.year}
                  </div>
                  <p style={{ color: "#475467", fontSize: "13px", lineHeight: "1.7" }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section style={{ background: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="mvv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(204,0,0,0.15)" }}>
            {[
              { icon: <Award size={28} />, title: "Our Mission", desc: about.mission.description },
              { icon: <CheckCircle size={28} />, title: "Our Vision", desc: about.vision.description },
              { icon: <Users size={28} />, title: "Our Values", desc: about.values.description },
            ].map((item, i) => (
              <div key={i} style={{ background: "#ffffff", padding: "48px 36px" }}>
                <div style={{ color: "#CC0000", marginBottom: "20px" }}>{item.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#152238",
                    marginBottom: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.title}
                </h3>
                {item.desc ? (
                  <div className="about-rich" style={{ color: "#666", fontSize: "14px", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-rich p { margin: 0 0 20px 0; }
        .about-rich p:last-child { margin-bottom: 0; }
        .about-rich ul { list-style: none; padding: 0; margin: 0 0 20px 0; }
        .about-rich li { position: relative; padding-left: 17px; margin-bottom: 10px; font-family: 'DM Sans', sans-serif; }
        .about-rich li::before { content: ""; position: absolute; left: 0; top: 7px; width: 7px; height: 7px; border-radius: 50%; background: #CC0000; }
        .about-rich ol { padding-left: 20px; margin: 0 0 20px 0; }
        .about-rich h1, .about-rich h2, .about-rich h3, .about-rich h4 {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          color: #152238;
          margin: 0.6em 0 0.4em;
          line-height: 1.25;
        }
        .about-rich h1 { font-size: 1.8em; }
        .about-rich h2 { font-size: 1.5em; }
        .about-rich h3 { font-size: 1.25em; }
        .about-rich h4 { font-size: 1.1em; }
        .about-rich a { color: #CC0000; text-decoration: underline; }
        .about-rich strong { font-weight: 700; }

        @media (max-width: 768px) {
          .about-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .profile-grid { grid-template-columns: 1fr !important; }
          .success-grid { grid-template-columns: 1fr !important; }
          .mvv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}