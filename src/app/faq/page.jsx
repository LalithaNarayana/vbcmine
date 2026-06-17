"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "Plans & Pricing",
    items: [
      {
        q: "What broadband plans does VBC offer?",
        a: "VBC offers three categories of plans: Only Internet (40–150 Mbps, starting ₹399/mo), Internet + OTT (30–200 Mbps with 20–30 OTT apps, starting ₹499/mo), and Internet + CATV (50–200 Mbps with cable TV, starting ₹599/mo). All prices are exclusive of GST @18%.",
      },
      {
        q: "Are there any special offers on long-term plans?",
        a: "Yes! VBC offers 6+1 and 12+2 month deals — meaning if you pay for 6 months, you get 1 month free; pay for 12 months and get 2 months free. Router and installation charges are also waived on 6 and 12-month plans.",
      },
      {
        q: "What are the installation charges?",
        a: "For monthly plans, a non-refundable installation charge of ₹1,500 applies. For 6-month or 12-month plans, installation and router are provided free of charge.",
      },
      {
        q: "Is GST included in the displayed prices?",
        a: "No, all listed prices are exclusive of GST @18%. The final amount payable will include 18% GST on top of the plan price.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, you can change your plan at any time. Contact our customer care at (0891) 6677-123 or email support@vbctv.in and our team will process the change at the earliest.",
      },
    ],
  },
  {
    category: "Internet & Speed",
    items: [
      {
        q: "What type of internet connection does VBC provide?",
        a: "VBC provides true Fiber-to-the-Home (FTTH) connectivity with symmetric upload and download speeds. Our fiber network spans 160 km across Visakhapatnam with 99%+ uptime.",
      },
      {
        q: "Is there any data cap or FUP (Fair Usage Policy)?",
        a: "No! All VBC broadband plans come with unlimited data — no throttling and no FUP caps. You get the internet speed you pay for, every day.",
      },
      {
        q: "What speeds are available?",
        a: "Our plans range from 30 Mbps to 200 Mbps for home broadband. Business customers can avail dedicated Internet Leased Lines (ILL) with symmetrical speeds tailored to their requirements.",
      },
      {
        q: "Do upload and download speeds differ?",
        a: "VBC provides symmetric speeds — meaning your upload speed is equal to your download speed on all fiber broadband plans. This is especially beneficial for video calls, uploads, and gaming.",
      },
    ],
  },
  {
    category: "OTT & Entertainment",
    items: [
      {
        q: "Which OTT platforms are included in Internet + OTT plans?",
        a: "Depending on the plan, you get access to 20–30 OTT apps including Aha, Sun NXT, Hungama Play, Epic ON, ShemarooMe, Disney+ Hotstar, Sony LIV, ZEE5, Amazon Prime, Lionsgate Play, and IPTV with 550+ channels.",
      },
      {
        q: "Do I need separate subscriptions for OTT apps?",
        a: "No. When you subscribe to an Internet + OTT plan, the bundled OTT apps are included at no extra subscription cost. Simply activate via the VBC portal or app.",
      },
      {
        q: "Is CATV available along with internet?",
        a: "Yes, VBC's Internet + CATV plans bundle cable TV (SD or HD) with high-speed internet. A set-top box and installation are provided free of charge on 6 and 12-month plans.",
      },
    ],
  },
  {
    category: "Installation & Activation",
    items: [
      {
        q: "How long does installation take?",
        a: "VBC typically completes installation within 24–48 hours of plan confirmation. In most areas, same-day activation is available, subject to technician availability.",
      },
      {
        q: "What equipment is provided?",
        a: "VBC provides a fiber ONT (Optical Network Terminal) and a Wi-Fi router. On 6 and 12-month plans, these are provided free of cost. Non-refundable installation charges of 1500 for monthly plans",
      },
      {
        q: "How do I know if my area is covered?",
        a: "VBC covers 50+ zones across Visakhapatnam. You can check coverage on our website or call (0891) 6677-123 / 6677-124 to verify availability at your address.",
      },
    ],
  },
  {
    category: "Support & Billing",
    items: [
      {
        q: "How do I renew my plan?",
        a: "You can renew your plan online via our Renew Plan page, or by visiting our office. You can also contact us at (0891) 6677-123 or email billing@vbctv.in for assistance.",
      },
      {
        q: "Is support available 24/7?",
        a: "Yes! VBC's local Vizag-based support team is available 24/7 via phone, WhatsApp, and in-person visits. Call us at (0891) 6677-123 anytime.",
      },
      {
        q: "What should I do if my internet is not working?",
        a: "First, try restarting your router and ONT. If the issue persists, call our support line at (0891) 6677-123 or WhatsApp us. Our technicians are available around the clock and will assist you at the earliest.",
      },
      {
        q: "Do you offer business internet solutions?",
        a: "Yes! VBC provides a range of enterprise services including Internet Leased Lines (ILL), MPLS Connectivity, VOIP/IBS Solutions, Hosting & Server Colocation, and Optical Fiber Leasing. Contact our sales team at sales@vbctv.in.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

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
            Help Center
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
            FREQUENTLY ASKED{" "}
            <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>
              QUESTIONS
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
            Everything you need to know about VBC broadband plans, installation, and support.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {faqs.map((section, si) => (
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
          ))}

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
                Our team is available 24/7. Reach us by phone, WhatsApp, or email.
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
                <a
                  href="tel:08916677123"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    color: "#fff",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "13px 32px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  Call (0891) 6677-123
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}