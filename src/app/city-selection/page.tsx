"use client";
import { useState } from "react";
import Link from "next/link";
import { cities } from "@/constants/cities";
import { MapPin, Search, ArrowRight } from "lucide-react";

export default function CitySelectionPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.areas.some((a) => a.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedCity = cities.find((c) => c.id === selected);

  return (
    <div style={{ paddingTop: "0px", background: "#ffffff", minHeight: "100vh" }}>

      {/* Hero */}
      <section
        style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(180deg, #fff7f5 0%, #ffffff 100%)",
          textAlign: "center",
        }}
      >
        <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>Coverage Map</div>
        <h1
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(50px, 7vw, 80px)",
            letterSpacing: "2px",
            color: "#152238",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          SELECT YOUR
          <br />
          <span style={{ color: "#CC0000" }}>AREA IN VIZAG</span>
        </h1>
        <p style={{ color: "#475467", fontSize: "14px", maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          VBC fiber covers all major areas in Visakhapatnam. Same great plans across all locations.
        </p>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "480px", margin: "0 auto" }}>
          <Search size={16} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
          <input
            type="text"
            placeholder="Search your area or locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="vbc-input"
            style={{ paddingLeft: "44px" }}
          />
        </div>
      </section>

      {/* City Grid */}
      <section style={{ padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {!selected ? (
            <>
              <div style={{ marginBottom: "24px", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#667085", letterSpacing: "1px" }}>
                SHOWING {filtered.length} AREAS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                {filtered.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelected(city.id)}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(20,33,61,0.08)",
                      padding: "24px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(204,0,0,0.06)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(204,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(20,33,61,0.08)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                      <MapPin size={18} color="#CC0000" />
                      <span
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "10px",
                          color: "#CC0000",
                          background: "rgba(204,0,0,0.1)",
                          padding: "2px 8px",
                          letterSpacing: "1px",
                        }}
                      >
                        {city.zone}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "#152238",
                        marginBottom: "8px",
                      }}
                    >
                      {city.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#667085" }}>
                      {city.areas.slice(0, 3).join(", ")}{city.areas.length > 3 ? ` +${city.areas.length - 3} more` : ""}
                    </div>
                    <div
                      style={{
                        marginTop: "16px",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#CC0000",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Select Area →
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Selected city detail */
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <button
                onClick={() => setSelected(null)}
                style={{ background: "none", border: "none", color: "#CC0000", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "1px", marginBottom: "24px", padding: 0 }}
              >
                ← Back to all areas
              </button>

              <div className="glass-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <MapPin size={24} color="#CC0000" />
                  <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "32px", letterSpacing: "2px", color: "#152238" }}>
                    {selectedCity?.name}
                  </h2>
                  <span className="badge-red">{selectedCity?.zone} Zone</span>
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "12px", color: "#667085", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                    Available Sub-Areas
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedCity?.areas.map((area) => (
                      <span
                        key={area}
                        style={{
                          background: "rgba(204,0,0,0.08)",
                          border: "1px solid rgba(204,0,0,0.2)",
                          padding: "6px 14px",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "13px",
                          color: "#344054",
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ height: "1px", background: "rgba(20,33,61,0.08)", marginBottom: "28px" }} />

                <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.7", marginBottom: "24px" }}>
                  ✅ Fiber broadband is available in <strong style={{ color: "#E8E8E8" }}>{selectedCity?.name}</strong>. All plans are available at standard pricing with same-day or next-day installation.
                </p>

                <Link
                  href="/plans"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  View Available Plans <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
