"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const banners = [
  "/images/hero1.png",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
  "/images/hero5.png",
  "/images/hero6.png",
  "/images/hero7.png",
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [prev, setPrev] = useState<number | null>(null);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === active) return;
    setPrev(active);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [active, animating]);

  const goPrev = useCallback(() => {
    goTo((active - 1 + banners.length) % banners.length);
  }, [active, goTo]);

  const goNext = useCallback(() => {
    goTo((active + 1) % banners.length);
  }, [active, goTo]);

  useEffect(() => {
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
  }, []);

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
    color: "#fff",
    fontSize: 22,
    transition: "background 0.2s ease",
  };

  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", userSelect: "none" }}>
      <div style={{ position: "relative", width: "100%" }}>

        {/* All slides — each image displayed at its natural ratio */}
        {banners.map((src, i) => (
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
              src={src}
              alt={`Hero banner ${i + 1}`}
              width={1920}
              height={1080}
              priority={i === 0}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        style={{ ...arrowButtonStyle, left: 16 }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(204,0,0,0.75)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Left chevron */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={goNext}
        aria-label="Next slide"
        style={{ ...arrowButtonStyle, right: 16 }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(204,0,0,0.75)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        {/* Right chevron */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}