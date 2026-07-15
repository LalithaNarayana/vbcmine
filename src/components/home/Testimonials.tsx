"use client";

export interface TestimonialItem {
  name: string;
  role?: string;
  image?: string;
  quote: string;
  rating: number;
}

interface TestimonialsProps {
  items?: TestimonialItem[];
  tag?: string;
  titlePart1?: string;
  titlePart2?: string;
  titlePart3?: string;
  description?: string;
}

const PALETTE = ["#CC0000", "#0055CC", "#006633", "#CC8800"];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function Testimonials({ items, tag, titlePart1, titlePart2, titlePart3, description }: TestimonialsProps = {}) {
  const cards = (items || []).map((item, i) => ({
    name: item.name,
    initials: initialsOf(item.name),
    plan: item.role || "",
    color: PALETTE[i % PALETTE.length],
    review: item.quote,
    image: item.image,
  }));

  return (
    <section style={{ background: "#ffffff", padding: "110px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 22, letterSpacing: 4, textTransform: "uppercase",
            color: "#CC0000", marginBottom: 14,
          }}>{tag || "Customer Stories"}</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 7vw, 88px)",
            letterSpacing: 2, lineHeight: 0.95, marginBottom: 24, color: "#14213D",
          }}>
            {titlePart1 || "TRUSTED BY"}{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>{titlePart2 || "30,000+"}</span>
            <br />{titlePart3 || "HOUSEHOLDS"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#667085", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8 }}>
            {description || "Real experiences from VBC subscribers across Visakhapatnam."}
          </p>
        </div>

        {/* Cards */}
        {cards.length === 0 ? (
          <p style={{ textAlign: "center", color: "#98A2B3", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            Customer testimonials will appear here once added from the admin panel.
          </p>
        ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 26 }}>
          {cards.map((t, i) => (
            <div key={i}
              style={{
                background: "#ffeeeed3", borderRadius: 18, padding: "36px 30px",
                border: "1px solid rgba(20,33,61,0.07)",
                boxShadow: "0 4px 20px rgba(20,33,61,0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 48px rgba(20,33,61,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(20,33,61,0.05)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${t.color}, ${t.color}55)` }} />
              <div style={{ fontFamily: "Georgia, serif", fontSize: 72, color: t.color, lineHeight: 0.8, marginBottom: 20, opacity: 0.18 }}>&ldquo;</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#334155", lineHeight: 1.85, marginBottom: 28, fontStyle: "italic" }}>{t.review}</p>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${t.color}44, transparent)`, marginBottom: 22 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: t.image ? "transparent" : `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15,
                  color: "#fff", flexShrink: 0, boxShadow: `0 4px 12px ${t.color}44`,
                  overflow: "hidden",
                }}>
                  {t.image ? (
                    <img src={t.image} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: "#14213D", letterSpacing: 0.5 }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: t.color, fontWeight: 600, marginTop: 3 }}>{t.plan}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

interface CTABannerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export function CTABanner({ title, description, ctaLabel, ctaLink }: CTABannerProps = {}) {
  const heading = title || "READY TO EXPERIENCE\nREAL FIBER SPEED?";
  const [headingLine1, headingLine2] = heading.split("\n");
  const desc =
    description ||
    "Join 30,000+ happy subscribers in Vizag. Installation in as little as 24 hours.";
  const primaryLabel = ctaLabel || "Get Connected";
  const primaryLink = ctaLink || "/contact";

  return (
    <section style={{
      background: "linear-gradient(135deg, #CC0000 0%, #8B1A1A 60%, #14213D 100%)",
      padding: "80px 24px", position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: 2, color: "#fff", lineHeight: 1.05, marginBottom: 16 }}>
          {headingLine1}{headingLine2 ? <><br />{headingLine2}</> : null}
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36, lineHeight: 1.7 }}>
          {desc}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={primaryLink} style={{
            display: "inline-block", background: "#fff", color: "#CC0000",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none",
            padding: "14px 36px", borderRadius: 999, transition: "all 0.2s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "none")}
          >{primaryLabel}</a>
        </div>
      </div>
    </section>
  );
}