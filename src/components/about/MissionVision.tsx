import { Target, Eye, Heart } from "lucide-react";

export default function MissionVision() {
  const items = [
    {
      icon: <Target size={28} />,
      label: "Our Mission",
      title: "Connect Every Home in Vizag",
      desc: "To provide world-class fiber internet, TV, and communication services to every home and business in Visakhapatnam — making digital inclusion a reality for all.",
    },
    {
      icon: <Eye size={28} />,
      label: "Our Vision",
      title: "Vizag's Digital Backbone",
      desc: "To be the undisputed digital infrastructure provider of Visakhapatnam — the network that powers the city's homes, businesses, smart infrastructure, and future growth.",
    },
    {
      icon: <Heart size={28} />,
      label: "Our Values",
      title: "Reliability, Transparency, Community",
      desc: "We believe in delivering what we promise, pricing that's fair and clear, and investing in the communities where our customers live and work.",
    },
  ];

  return (
    <section style={{ background: "#ffffff", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(60deg, rgba(204,0,0,0.03) 25%, transparent 25%), linear-gradient(-60deg, rgba(204,0,0,0.03) 25%, transparent 25%)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px,5vw,60px)", letterSpacing: "3px", color: "#152238" }}>
            PURPOSE DRIVEN,<br /><span style={{ color: "#667085" }}>COMMUNITY FOCUSED</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "#ffffff", border: "1px solid rgba(204,0,0,0.12)", padding: "40px 32px", boxShadow: "0 16px 40px rgba(20, 33, 61, 0.06)" }}>
              <div style={{ color: "#CC0000", marginBottom: "16px" }}>{item.icon}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#667085", marginBottom: "8px" }}>{item.label}</div>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "16px" }}>{item.title}</h3>
              <p style={{ color: "#475467", fontSize: "13px", lineHeight: "1.8" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
