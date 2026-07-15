"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroBanner {
  title?: string;
  subtitle?: string;
  image: string;
  ctaLabel?: string;
  ctaLink?: string;
}

interface HeroSectionProps {
  banners?: HeroBanner[];
}

export default function HeroSection({ banners: bannersProp }: HeroSectionProps = {}) {
  const banners = bannersProp || [];
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [prev, setPrev] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<"prev" | "next" | null>(null);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === active) return;
    setPrev(active);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [active, animating]);

  const goPrev = useCallback(() => {
    if (banners.length === 0) return;
    goTo((active - 1 + banners.length) % banners.length);
  }, [active, goTo, banners.length]);

  const goNext = useCallback(() => {
    if (banners.length === 0) return;
    goTo((active + 1) % banners.length);
  }, [active, goTo, banners.length]);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % banners.length;
        setPrev(a);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
        return next;
      });
    }, 7500);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const arrowButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "transparent",
    border: "none",
    borderRadius: "50%",
    width: 48,
    height: 48,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    transition: "color 0.2s ease",
  };

  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", userSelect: "none" }}>
      <div style={{ position: "relative", width: "100%" }}>

        {/* All slides — each image displayed at its natural ratio */}
        {banners.map((banner, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              inset: 0,
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1.04)" : i === prev ? "scale(1.0)" : "scale(1.04)",
              transition: i === active
                ? "opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 5s cubic-bezier(0.0,0.0,0.2,1)"
                : "opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s ease",
              zIndex: i === active ? 2 : i === prev ? 1 : 0,
            }}
          >
            <Image
              src={banner.image}
              alt={banner.title || `Hero banner ${i + 1}`}
              width={1920}
              height={1080}
              priority={i === 0}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="100vw"
            />
            {/* {(banner.title || banner.ctaLabel) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "0 8%",
                  background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 60%)",
                }}
              >
                {banner.title && (
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "clamp(32px, 5vw, 64px)",
                      color: "#fff",
                      letterSpacing: "1px",
                      lineHeight: 1.05,
                      maxWidth: "600px",
                      marginBottom: "12px",
                    }}
                  >
                    {banner.title}
                  </h2>
                )}
                {banner.subtitle && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.85)",
                      maxWidth: "480px",
                      marginBottom: "20px",
                    }}
                  >
                    {banner.subtitle}
                  </p>
                )}
                {banner.ctaLabel && (
                  <Link
                    href={banner.ctaLink || "/plans"}
                    style={{
                      display: "inline-block",
                      background: "#CC0000",
                      color: "#fff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "12px 32px",
                      borderRadius: "999px",
                    }}
                  >
                    {banner.ctaLabel}
                  </Link>
                )}
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        style={{
          ...arrowButtonStyle,
          left: 16,
          color: hoveredBtn === "prev" ? "#ef4444" : "#fff",
        }}
        onMouseEnter={() => setHoveredBtn("prev")}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={goNext}
        aria-label="Next slide"
        style={{
          ...arrowButtonStyle,
          right: 16,
          color: hoveredBtn === "next" ? "#ef4444" : "#fff",
        }}
        onMouseEnter={() => setHoveredBtn("next")}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}