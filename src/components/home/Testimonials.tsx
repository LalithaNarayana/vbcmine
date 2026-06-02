"use client";
import { useState } from "react";
import Link from "next/link";
import { testimonials, stats } from "@/constants/testimonials";
import { ArrowRight, Star, Zap } from "lucide-react";

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                border: "1px solid #E4E7EC",
                borderRadius: "22px",
                padding: "22px 18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "28px", color: "#CC0000" }}>{stat.value}</div>
              <div style={{ color: "#667085", fontSize: "12px", marginTop: "6px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: "700px", marginBottom: "24px" }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
            Customer Stories
          </div>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15, color: "#152238", marginBottom: "10px" }}>
            Real feedback presented like a service website, not a flashy landing experiment.
          </h2>
          <p style={{ color: "#667085", fontSize: "16px", lineHeight: 1.8 }}>
            The testimonials already existed. The improvement here is mostly structural: better spacing, clearer hierarchy and a more trustworthy presentation.
          </p>
        </div>

        <div className="testimonial-layout" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActive(index)}
                style={{
                  textAlign: "left",
                  borderRadius: "20px",
                  border: active === index ? "1px solid rgba(204,0,0,0.2)" : "1px solid #E4E7EC",
                  background: active === index ? "#FFF5F3" : "#FFFFFF",
                  padding: "18px 20px",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 700, color: "#152238", marginBottom: "4px" }}>{testimonial.name}</div>
                <div style={{ color: "#667085", fontSize: "13px" }}>{testimonial.area}</div>
              </button>
            ))}
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid #E4E7EC", borderRadius: "28px", padding: "30px", boxShadow: "0 18px 40px rgba(20, 33, 61, 0.05)" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
              {Array.from({ length: testimonials[active].rating }).map((_, index) => (
                <Star key={index} size={16} fill="#CC0000" color="#CC0000" />
              ))}
            </div>
            <blockquote style={{ color: "#344054", fontSize: "18px", lineHeight: 1.9, marginBottom: "24px" }}>
              "{testimonials[active].text}"
            </blockquote>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#152238" }}>{testimonials[active].name}</div>
                <div style={{ color: "#667085", fontSize: "13px" }}>{testimonials[active].area}</div>
              </div>
              <div className="badge-red">{testimonials[active].plan}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 900px) {
          .testimonial-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export function CTABanner() {
  return (
    <section style={{ padding: "48px 24px 0" }}>
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "38px clamp(24px, 4vw, 44px)",
          borderRadius: "32px",
          background: "linear-gradient(135deg, #FFF1EE 0%, #FFFFFF 100%)",
          border: "1px solid rgba(204,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px" }}>
          Get Started
        </div>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.15, color: "#152238", marginBottom: "12px" }}>
          A stronger site structure with the same project content, ready to feel more like a real brand.
        </h2>
        <p style={{ color: "#667085", fontSize: "16px", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto 24px" }}>
          The major shift is tone and layout: clear actions, calmer sections and a more practical visual system instead of keeping everything dark.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/plans" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} /> View Plans <ArrowRight size={14} />
          </Link>
          <Link href="/contact" className="btn-outline" style={{ textDecoration: "none" }}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
