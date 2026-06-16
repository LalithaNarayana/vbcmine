"use client";
import { useRef } from "react";
import Image from "next/image";

const clients = [
  { name: "GITAM UNIVERSITY",                          img: "/images/client1.png"  },
  { name: "GAYATRI VIDYA PARISHAD",                    img: "/images/client2.jpg"  },
  { name: "MIRACLE SOFTWARE SYSTEM (I) PVT.LTD",       img: "/images/client3.png"  },
  { name: "SYMBIOSYS TECHNOLOGIES",                    img: "/images/client4.png"  },
  { name: "IMERIT TECHNOLOGY SERVICES PVT. LTD",       img: "/images/client5.png"  },
  { name: "PRECISTAT IT SOLUTION PVT.LTD.",            img: "/images/client6.jpeg"  },
  { name: "MAHATHI SOFTWARE PVT.LTD",                  img: "/images/client7.svg"  },
  { name: "MAPPLE SOFTWARE PVT.LTD",                   img: "/images/client8.jpeg"  },
  { name: "INSPIREDGE IT SOLUTION PVT.LTD",            img: "/images/client9.jpeg"  },
  { name: "XINTHE TECHNOLOGIES",                       img: "/images/client10.webp" },
  { name: "SREE TAMMINA SOFTWARE SOLUTION PVT.LTD",    img: "/images/client11.png" },
  { name: "S.V.B.C GOLD",                              img: "/images/client12.png" },
  { name: "IMAGINOVATE TECHSOLUTIONS INDIA PVT LTD",   img: "/images/client13.png" },
  { name: "AMZUR INFOTECH PVT.LTD.",                   img: "/images/client14.png" },
  { name: "STEEL CITY SECURITIES LIMITED",             img: "/images/client15.png" },
  { name: "VENSAI TECHNOLOGIES (INDIA) PVT. LTD",      img: "/images/client16.jpeg" },
  { name: "APOLLO HOSPITALS",                          img: "/images/client17.jpg" },
  { name: "CONSUMER ELECTRONICS SHOW (CES) LIMITED",   img: "/images/client18.png" },
  { name: "PENNANT TECHNOLOGIES PRIVATE LIMITED",      img: "/images/client19.png" },
  { name: "YALAMANCHILI SOFTWARE EXPORTS LTD",         img: "/images/client20.avif" },
  { name: "BEST WESTERN PLUS TEJVIVAN",                img: "/images/client21.png" },
  { name: "RADISSON BLU RESORT",                       img: "/images/client22.png" },
  { name: "MANUH INFORMATION SYSTEM (I) PVT LTD",      img: "/images/client23.jpeg" },
  { name: "ACN HEALTH CARE",                           img: "/images/client24.jpg" },
  { name: "ANDHRA UNIVERSITY",                         img: "/images/client25.png" },
  { name: "SRI KANYA STEEL CEMENT",                    img: "/images/client26.jpeg" },
  { name: "SANHARABS",                                 img: "/images/client27.avif" },
  { name: "SOFTSOL INDIA LTD",                         img: "/images/client28.png" },
  { name: "SAIL SOFTWARE SOLUTIONS PVT LTD",           img: "/images/client29.png" },
  { name: "TECH MAHINDRA CERIUM PRIVATE LIMITED",      img: "/images/client30.webp" },
  { name: "AROWANA CORPORATION PRIVATE LIMITED",       img: "/images/client31.png" },
  { name: "WHITEHILLS INTERIOR LIMITED (EFC)",         img: "/images/client32.png" },
  { name: "SAI RAM SUPINE RESTAURANT",                 img: "/images/client33.png" },
  { name: "GVMC",                                      img: "/images/client34.jpg" },
  { name: "IMOMENTOUS SOFTWARE PVT LTD",               img: "/images/client35.webp" },
  { name: "SRI TECHNOLOGY SOLUTIONS INDIA PVT LTD",   img: "/images/client36.png" },
  { name: "V&V IT SOFTWARE SOLUTIONS",                 img: "/images/client37.png" },
];

export default function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section style={{ background: "#f9fafb", padding: "80px 24px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#CC0000", marginBottom: 10 }}>Trusted By</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: 2, color: "#14213D", lineHeight: 0.95 }}>
            OUR <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>CLIENTS</span>
          </h2>
        </div>

        {/* Scrollable row */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(204,0,0,0.3)", background: "#fff", color: "#CC0000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >‹</button>

          <div ref={scrollRef} style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {clients.map((client, i) => (
              <div
                key={i}
                style={{
                  minWidth: 200,
                  maxWidth: 200,
                  flexShrink: 0,
                  background: "#fff",
                  border: "1px solid rgba(20,33,61,0.08)",
                  borderRadius: 12,
                  padding: "16px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 2px 12px rgba(20,33,61,0.04)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(20,33,61,0.1)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(20,33,61,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                }}
              >
                {/* Logo image area */}
                <div style={{
                  width: "100%",
                  height: 80,
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#f8f9fb",
                  border: "1px solid rgba(20,33,61,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                }}>
                  <Image
                    src={client.img}
                    alt={client.name}
                    width={120}
                    height={64}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>

                {/* Client name */}
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#344054",
                  textAlign: "center",
                  lineHeight: 1.4,
                  letterSpacing: 0.3,
                }}>{client.name}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(204,0,0,0.3)", background: "#fff", color: "#CC0000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >›</button>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
