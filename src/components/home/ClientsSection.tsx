"use client";
import Image from "next/image";

export interface ClientItem {
  name: string;
  logo: string;
}

interface ClientsSectionProps {
  items?: ClientItem[];
  tag?: string;
  titlePart1?: string;
  titlePart2?: string;
}

export default function ClientsSection({ items, tag, titlePart1, titlePart2 }: ClientsSectionProps = {}) {
  const list = (items || []).map((c) => ({ name: c.name, img: c.logo }));
  // Duplicate the list so the marquee can loop seamlessly (translate exactly -50%).
  const loopList = list.length > 0 ? [...list, ...list] : [];

  const eyebrow = tag || "Trusted By";
  const heading1 = titlePart1 || "OUR";
  const heading2 = titlePart2 || "CLIENTS";

  return (
    <section style={{ background: "#f9fafb", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#CC0000", marginBottom: 10 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: 2, color: "#14213D", lineHeight: 0.95 }}>
            {heading1} <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>{heading2}</span>
          </h2>
        </div>

        {list.length === 0 && (
          <p style={{ textAlign: "center", color: "#98A2B3", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            Client logos will appear here once added from the admin panel.
          </p>
        )}
      </div>

      {/* Continuous marquee row — scrolls slowly from one end to the other on
          its own; hovering anywhere over the row pauses it in place. */}
      {list.length > 0 && (
        <div className="clients-marquee-viewport">
          <div
            className="clients-marquee-track"
            style={{ ["--client-count" as string]: list.length }}
          >
            {loopList.map((client, i) => (
              <div key={i} className="clients-marquee-card">
                <div
                  style={{
                    width: "100%",
                    height: 90,
                    borderRadius: 8,
                    background: "#ffffff",
                    border: "1px solid rgba(20,33,61,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <Image
                    src={client.img}
                    alt={client.name}
                    width={160}
                    height={90}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#344054",
                    textAlign: "center",
                    lineHeight: 1.4,
                    letterSpacing: 0.3,
                  }}
                >
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .clients-marquee-viewport {
          width: 100%;
          overflow: hidden;
        }
        .clients-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: clients-marquee-scroll calc(var(--client-count, 6) * 4s) linear infinite;
        }
        .clients-marquee-viewport:hover .clients-marquee-track {
          animation-play-state: paused;
        }
        .clients-marquee-card {
          min-width: 200px;
          max-width: 200px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid rgba(20,33,61,0.08);
          border-radius: 12px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 12px rgba(20,33,61,0.04);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .clients-marquee-card:hover {
          box-shadow: 0 8px 24px rgba(20,33,61,0.1);
          transform: translateY(-3px);
        }
        @keyframes clients-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
