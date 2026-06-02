import { stats } from "@/constants/testimonials";
import { CheckCircle, Award, Users, MapPin } from "lucide-react";

export default function AboutPage() {
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
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>About VBC</div>
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
            CONNECTING
            <br />
            <span style={{ color: "#CC0000" }}>VIZAG</span>
            <br />
            SINCE 2012
          </h1>
          <div className="red-divider" style={{ marginTop: "20px", marginBottom: "24px" }} />
          <p style={{ color: "#475467", fontSize: "15px", lineHeight: "1.8", maxWidth: "600px" }}>
            VBC (Vizag Broadcasting Company) started with a single mission: give Visakhapatnam the internet it deserves. Today we're the city's most trusted ISP, serving over 50,000 homes and businesses with fiber broadband, Digital TV, and IPTV.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#CC0000", padding: "0" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "32px 16px",
                textAlign: "center",
                borderRight: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(22px, 3vw, 36px)", color: "white", letterSpacing: "1px" }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){section > div{grid-template-columns:repeat(3,1fr)!important;}}`}</style>
      </section>

      {/* Story */}
      <section style={{ padding: "100px 24px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Our Story</div>
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
              FROM A SMALL SETUP
              <br />
              <span style={{ color: "#CC0000" }}>TO VIZAG'S BACKBONE</span>
            </h2>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "20px" }}>
              Founded in 2012 in MVP Colony, VBC started as a local cable and internet operator. Recognizing Vizag's growing need for high-speed connectivity, we invested early in fiber infrastructure — before anyone else in the city.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "20px" }}>
              By 2015, we had become a multi-system operator (MSO), offering Digital TV alongside broadband. By 2018, IPTV was added, and by 2020, we expanded into enterprise leased lines and VoIP for businesses across Visakhapatnam.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}>
              Today, VBC On Fiber is a household name in Vizag — trusted for reliability, speed, and genuine local service.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(180deg, #CC0000, transparent)",
              }}
            />
            {[
              { year: "2012", event: "VBC founded in MVP Colony, Visakhapatnam. First 500 subscribers." },
              { year: "2015", event: "Launched Digital TV services. Became a licensed MSO." },
              { year: "2018", event: "Introduced IPTV with 400+ channels and VOD library." },
              { year: "2020", event: "Expanded to enterprise services — Leased Lines & VoIP." },
              { year: "2022", event: "50,000+ subscribers milestone. Launched 1 Gbps fiber plans." },
              { year: "2024", event: "Self-care portal & mobile app launch for seamless account management." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "32px", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-39px",
                    top: "4px",
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
                    marginBottom: "4px",
                  }}
                >
                  {item.year}
                </div>
                <p style={{ color: "#475467", fontSize: "13px", lineHeight: "1.6" }}>{item.event}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){section > div{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Mission Vision */}
      <section style={{ background: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(204,0,0,0.15)" }}>
            {[
              {
                icon: <Award size={28} />,
                title: "Our Mission",
                desc: "To provide Visakhapatnam with world-class connectivity at affordable prices, empowering every household and business to thrive in the digital age.",
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Our Vision",
                desc: "To be Andhra Pradesh's most trusted broadband and media provider — known for speed, reliability, and exceptional customer care.",
              },
              {
                icon: <Users size={28} />,
                title: "Our Values",
                desc: "Transparency in pricing. Accountability in service. Commitment to the communities we serve. Local heart, global standards.",
              },
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
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.8" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){div{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* Coverage */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Coverage</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(36px,5vw,60px)",
              letterSpacing: "2px",
              color: "#152238",
              marginBottom: "48px",
            }}
          >
            SERVING ALL OF <span style={{ color: "#CC0000" }}>VISAKHAPATNAM</span>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {["MVP Colony", "Rushikonda", "Gajuwaka", "Maddilapalem", "Seethammadhara", "Dwaraka Nagar", "Akkayyapalem", "Pendurthi", "Bheemunipatnam", "Kommadi", "Gopalapatnam", "Waltair Uplands", "Vizag Port Area", "Siripuram"].map((area) => (
              <div
                key={area}
                style={{
                  background: "rgb(255, 255, 255)",
                  border: "1px solid rgba(204,0,0,0.2)",
                  padding: "8px 20px",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#344054",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <MapPin size={12} color="#CC0000" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
