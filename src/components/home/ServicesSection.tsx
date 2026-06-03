"use client";

const services = [
  {
    img: "/images/service1.jpeg",
    tag: "Broadband",
    title: "FTTH Broadband",
    desc: "VBC's Fiber-to-the-Home (FTTH) technology delivers ultra-fast, stable internet directly to your premises via pure fiber optic cables — no copper, no compromise. Experience symmetric speeds ideal for 4K streaming, remote work, and gaming.",
    highlight: "#CC0000",
  },
  {
    img: "/images/service2.jpeg",
    tag: "Television",
    title: "IPTV / Digital TV",
    desc: "Internet Protocol Television (IPTV) brings you 550+ live channels in HD/4K, on-demand content, time-shift viewing, and multi-screen support — all delivered over your fiber connection with crystal-clear picture quality.",
    highlight: "#0055CC",
  },
  {
    img: "/images/service3.jpeg",
    tag: "Business",
    title: "VoIP / IBS Solutions",
    desc: "Voice-over-Internet Protocol (VoIP) and Internet Business Solutions from VBC empower enterprises with scalable communication infrastructure, SIP trunking, PBX systems, and dedicated leased lines for mission-critical operations.",
    highlight: "#006633",
  },
];

export default function ServicesSection() {
  return (
    <section style={{ background: "#ffffff", padding: "110px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Section Heading ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 22, letterSpacing: 4, textTransform: "uppercase",
            color: "#CC0000", marginBottom: 14,
          }}>What We Offer</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 7vw, 88px)",
            letterSpacing: 2, lineHeight: 0.95, marginBottom: 24, color: "#14213D",
          }}>
            COMPLETE{" "}
            <span style={{
              WebkitTextStroke: "2px #CC0000",
              color: "transparent",
            }}>CONNECTIVITY</span>
            <br />SOLUTIONS
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#667085", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8 }}>
            From high-speed fiber internet to enterprise-grade business solutions — VBC delivers it all under one roof.
          </p>
        </div>

        {/* Service Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {services.map((svc, i) => (
            <div
              key={i}
              style={{
                background: "#fff", borderRadius: 20, overflow: "hidden",
                border: "1px solid rgba(20,33,61,0.07)",
                boxShadow: "0 8px 32px rgba(20,33,61,0.07)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                position: "relative",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 28px 60px rgba(20,33,61,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(20,33,61,0.07)";
              }}
            >
              <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                <img
                  src={svc.img} alt={svc.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const p = (e.currentTarget as HTMLImageElement).parentElement!;
                    p.style.background = "linear-gradient(135deg, #14213D, #0D0D0D)";
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 60%)" }} />
                <div style={{
                  position: "absolute", top: 18, left: 18,
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999,
                  padding: "5px 16px", fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700, fontSize: 11, letterSpacing: 2.5,
                  textTransform: "uppercase", color: "#fff",
                }}>{svc.tag}</div>
                <div style={{
                  position: "absolute", bottom: 18, left: 24,
                  fontFamily: "'Bebas Neue', cursive", fontSize: 26,
                  letterSpacing: 2, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}>{svc.title}</div>
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <div style={{ width: 48, height: 4, background: `linear-gradient(90deg, ${svc.highlight}, ${svc.highlight}55)`, borderRadius: 2, marginBottom: 18 }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#4a5568", lineHeight: 1.8, marginBottom: 26 }}>{svc.desc}</p>
                {/* <a href="#" style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: 1.5, textTransform: "uppercase", color: svc.highlight,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 20px", border: `1.5px solid ${svc.highlight}44`,
                  borderRadius: 999, background: `${svc.highlight}08`, transition: "all 0.25s",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = svc.highlight; el.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = `${svc.highlight}08`; el.style.color = svc.highlight;
                  }}
                >Learn More <span style={{ fontSize: 16 }}>→</span></a> */}
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${svc.highlight}, ${svc.highlight}22, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
