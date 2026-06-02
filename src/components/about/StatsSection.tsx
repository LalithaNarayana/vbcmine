const bigStats = [
  { value: "50K+", label: "Active Subscribers", sub: "Homes & Businesses" },
  { value: "12+", label: "Years of Service", sub: "Est. 2012, Vizag" },
  { value: "50+", label: "Coverage Areas", sub: "Across all Vizag zones" },
  { value: "1 Gbps", label: "Max Speed", sub: "Fastest in the city" },
  { value: "99.9%", label: "Network Uptime", sub: "SLA-backed reliability" },
  { value: "400+", label: "TV Channels", sub: "Digital & IPTV" },
  { value: "24/7", label: "Customer Support", sub: "Always available" },
  { value: "2 hrs", label: "Avg. Response Time", sub: "Technical complaints" },
];

export default function StatsSection() {
  return (
    <section style={{ background: "#0D0D0D", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>By the Numbers</div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "2px", color: "#E8E8E8" }}>
            THE SCALE OF <span style={{ color: "#CC0000" }}>VBC</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "rgba(204,0,0,0.1)" }}>
          {bigStats.map((s, i) => (
            <div key={i} style={{ background: "#0D0D0D", padding: "40px 24px", textAlign: "center", transition: "background 0.3s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#141414")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#0D0D0D")}
            >
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px,4vw,52px)", color: "#CC0000", letterSpacing: "1px", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#E8E8E8", marginTop: "8px", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "0.5px" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
