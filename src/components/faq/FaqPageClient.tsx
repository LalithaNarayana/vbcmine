"use client";
import { useState } from "react";
import Link from "next/link";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSection {
  category: string;
  items: FaqItem[];
}

interface FaqHeading {
  tag?: string;
  titlePart1?: string;
  titlePart2?: string;
  description?: string;
}

interface FaqPageClientProps {
  sections: FaqSection[];
  heading?: FaqHeading;
}

export default function FaqPageClient({ sections, heading }: FaqPageClientProps) {
  const [openIndex, setOpenIndex] = useState(null as string | null);

  const toggle = (key: string) => setOpenIndex(openIndex === key ? null : key);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "100px 24px 80px",
          background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(20,33,61,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,33,61,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 350,
            background:
              "radial-gradient(ellipse, rgba(204,0,0,0.10) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: 20 }}>
            {heading?.tag || "Help Center"}
          </div>
          <h1
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(48px, 7vw, 88px)",
              letterSpacing: 2,
              color: "#152238",
              lineHeight: 0.95,
              marginBottom: 20,
            }}
          >
            {heading?.titlePart1 || "FREQUENTLY ASKED"}{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              {heading?.titlePart2 || "QUESTIONS"}
            </span>
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #CC0000)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#CC0000" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #CC0000, transparent)" }} />
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#475467",
              lineHeight: 1.8,
            }}
          >
            {heading?.description || "Everything you need to know about VBC broadband plans, installation, and support."}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {sections.length === 0 ? (
            <p style={{ textAlign: "center", color: "#98A2B3", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              FAQs will appear here once added from the admin panel.
            </p>
          ) : (
            sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 56 }}>
                {/* Category heading */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                  <div
                    style={{
                      width: 4,
                      height: 28,
                      background: "linear-gradient(180deg, #CC0000, #E43B2C)",
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 28,
                      letterSpacing: 1,
                      color: "#14213D",
                      margin: 0,
                    }}
                  >
                    {section.category}
                  </h2>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {section.items.map((item, qi) => {
                    const key = `${si}-${qi}`;
                    const isOpen = openIndex === key;
                    return (
                      <div
                        key={qi}
                        style={{
                          border: `1px solid ${isOpen ? "rgba(204,0,0,0.3)" : "rgba(20,33,61,0.1)"}`,
                          borderRadius: 12,
                          overflow: "hidden",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          boxShadow: isOpen ? "0 8px 32px rgba(204,0,0,0.08)" : "none",
                        }}
                      >
                        <button
                          onClick={() => toggle(key)}
                          style={{
                            width: "100%",
                            background: isOpen ? "rgba(204,0,0,0.03)" : "#fff",
                            border: "none",
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 16,
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.2s",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Rajdhani', sans-serif",
                              fontWeight: 700,
                              fontSize: 16,
                              color: isOpen ? "#CC0000" : "#14213D",
                              lineHeight: 1.4,
                              transition: "color 0.2s",
                            }}
                          >
                            {item.q}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: isOpen ? "#CC0000" : "rgba(20,33,61,0.07)",
                              flexShrink: 0,
                              transition: "background 0.2s, transform 0.3s",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={isOpen ? "#fff" : "#14213D"}
                              strokeWidth="2.5"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>

                        {isOpen && (
                          <div
                            style={{
                              padding: "0 24px 20px",
                              background: "rgba(204,0,0,0.03)",
                              borderTop: "1px solid rgba(204,0,0,0.1)",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 14,
                                color: "#475467",
                                lineHeight: 1.9,
                                margin: "16px 0 0 0",
                              }}
                            >
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* CTA */}
          <div
            style={{
              marginTop: 60,
              padding: "40px 48px",
              background: "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)",
              borderRadius: 20,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 32,
                  color: "#fff",
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                Still Have Questions?
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 28,
                  lineHeight: 1.7,
                }}
              >
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    background: "#CC0000",
                    color: "#fff",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "13px 32px",
                    borderRadius: 999,
                    boxShadow: "0 8px 24px rgba(204,0,0,0.4)",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}