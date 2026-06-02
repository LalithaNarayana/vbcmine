"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, HeadphonesIcon, Zap } from "lucide-react";

export function SpeedHighlight() {
  const features = [
    { icon: Zap, title: "Consistent throughput", desc: "Built for streaming, work calls and multiple connected devices." },
    { icon: Clock, title: "Reliable uptime", desc: "A support-led service model that keeps interruptions to a minimum." },
    { icon: CheckCircle, title: "Simple onboarding", desc: "Clear installation and renewal workflows without unnecessary friction." },
    { icon: HeadphonesIcon, title: "Local support", desc: "Help from a team that understands the area and responds quickly." },
  ];

  return (
    <section style={{ padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #152238 0%, #1D3557 100%)",
          borderRadius: "36px",
          padding: "42px clamp(24px, 4vw, 44px)",
          color: "#fff",
          boxShadow: "0 28px 70px rgba(20, 33, 61, 0.14)",
        }}
      >
        <div className="speed-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "34px", alignItems: "center" }}>
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", background: "rgba(255,255,255,0.08)", color: "#fff", borderColor: "rgba(255,255,255,0.14)" }}>
              Performance
            </div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.1, marginBottom: "14px" }}>
              Speed where it matters, with a setup that feels practical and dependable.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "15px", lineHeight: 1.8, maxWidth: "500px", marginBottom: "24px" }}>
              This section now behaves more like a real service highlight block: one key message, clear support points and a direct path into the plans page.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "26px" }}>
              <div style={{ padding: "16px 18px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", minWidth: "150px" }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "30px" }}>1 Gbps</div>
                <div style={{ color: "rgba(255,255,255,0.66)", fontSize: "13px" }}>Top plan speed</div>
              </div>
              <div style={{ padding: "16px 18px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", minWidth: "150px" }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "30px" }}>24 hrs</div>
                <div style={{ color: "rgba(255,255,255,0.66)", fontSize: "13px" }}>Fast connection target</div>
              </div>
            </div>
            <Link href="/plans" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
              Compare available plans <ArrowRight size={16} />
            </Link>
          </div>

          <div className="speed-feature-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "22px", padding: "22px" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: "rgba(242, 101, 74, 0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <Icon size={20} color="#F8B4A7" />
                  </div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>{feature.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", lineHeight: 1.7 }}>{feature.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .speed-grid,
          .speed-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export function WhyVBC() {
  const reasons = [
    { num: "01", title: "Established local presence", desc: "The copy already positions VBC as a long-running provider, so this section now presents that trust more clearly." },
    { num: "02", title: "Multiple service categories", desc: "Broadband, TV, IPTV and business services sit together in a way that feels organized rather than overloaded." },
    { num: "03", title: "Transparent customer journey", desc: "The page now supports a real website flow: discover, compare, contact and manage account." },
    { num: "04", title: "Support-first positioning", desc: "Phone, account and help actions are surfaced earlier so the site feels useful, not just promotional." },
  ];

  return (
    <section style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "28px", alignItems: "start" }}>
          <div style={{ paddingTop: "8px" }}>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
              Why VBC
            </div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15, color: "#152238", marginBottom: "14px" }}>
              A more grounded website structure for the same project content.
            </h2>
            <p style={{ color: "#667085", fontSize: "16px", lineHeight: 1.8, maxWidth: "520px" }}>
              Instead of leaning on a full black visual treatment, this section explains the value proposition with lighter cards, cleaner typography and a more credible company voice.
            </p>
          </div>

          <div className="why-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            {reasons.map((reason) => (
              <div
                key={reason.num}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E4E7EC",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 14px 40px rgba(20, 33, 61, 0.05)",
                }}
              >
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#CC0000", marginBottom: "10px" }}>{reason.num}</div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238", marginBottom: "10px" }}>{reason.title}</h3>
                <p style={{ color: "#667085", fontSize: "14px", lineHeight: 1.75 }}>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid,
          .why-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
