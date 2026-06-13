import { Award, MapPin, Calendar, Users } from "lucide-react";

const milestones = [
  { year: "2012", title: "VBC Founded", desc: "Started operations in MVP Colony, Visakhapatnam with a small fiber network." },
  { year: "2015", title: "10,000 Subscribers", desc: "Expanded across 15 areas in Vizag. Launched Digital TV services." },
  { year: "2018", title: "IPTV Launch", desc: "Launched full IPTV platform with 400+ channels and VOD library." },
  { year: "2020", title: "1 Gbps Fiber", desc: "Upgraded network infrastructure to deliver 1 Gbps speeds citywide." },
  { year: "2022", title: "Enterprise Solutions", desc: "Launched leased lines, VoIP, and enterprise hosting for businesses." },
  { year: "2024", title: "30,000+ Customers", desc: "Largest fiber ISP in Visakhapatnam. Covering all major zones." },
];

export default function CompanyStory() {
  return (
    <section style={{ background: "#ffffff", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Our Story</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,5vw,64px)",
              letterSpacing: "2px", lineHeight: 1, color: "#152238", marginBottom: "24px",
            }}>
              VIZAG'S MOST<br /><span style={{ color: "#CC0000" }}>TRUSTED ISP</span><br />SINCE 2012
            </h2>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "20px" }}>
              VBC (Vizag Broadcasting Company) was born from a simple idea — that Visakhapatnam deserved world-class internet. In 2012, a small team of engineers laid the first fiber cables in MVP Colony, believing that fast, reliable connectivity would transform the city.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "32px" }}>
              Today, we're Vizag's largest multi-service operator — delivering fiber broadband, Digital TV, IPTV, enterprise solutions and more to over 30,000 homes and businesses across every major area of the city.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: <Calendar size={18} />, label: "Established", value: "2012" },
                { icon: <MapPin size={18} />, label: "Headquarters", value: "MVP Colony, Vizag" },
                { icon: <Users size={18} />, label: "Customers", value: "30,000+" },
                { icon: <Award size={18} />, label: "Coverage Areas", value: "50+ Zones" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#ffffff", border: "1px solid rgba(204,0,0,0.12)", padding: "20px", boxShadow: "0 12px 30px rgba(20, 33, 61, 0.06)" }}>
                  <div style={{ color: "#CC0000", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: "#152238", letterSpacing: "1px" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "24px" }}>Our Journey</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "19px", top: 0, bottom: 0, width: "1px", background: "rgba(204,0,0,0.2)" }} />
              {milestones.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: "24px", marginBottom: "32px", position: "relative" }}>
                  <div style={{
                    width: "40px", height: "40px", background: "linear-gradient(135deg, #CC0000, #880000)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                    zIndex: 1,
                  }}>
                    <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "11px", color: "white", letterSpacing: "0.5px" }}>{m.year}</span>
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#152238", marginBottom: "6px" }}>{m.title}</h4>
                    <p style={{ color: "#475467", fontSize: "13px", lineHeight: "1.6" }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){section > div > div{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
