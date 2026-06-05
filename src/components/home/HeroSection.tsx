"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const banners = [
  "/images/hero1.png",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
  "/images/hero5.png",
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
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  }, [active, animating]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % banners.length;
        setPrev(a);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", userSelect: "none" }}>
      {/* Slide container */}
      <div style={{ position: "relative", width: "100%" }}>
        {banners.map((src, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              inset: 0,
              width: "100%",
              height: i === 0 ? "auto" : "100%",
              opacity: i === active ? 1 : 0,
              transform: i === active
                ? "scale(1.04)"
                : i === prev
                  ? "scale(1.0)"
                  : "scale(1.04)",
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
              height={900}
              priority={i === 0}
              style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 10,
        zIndex: 10,
      }}>
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? 32 : 10,
              height: 10,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: i === active ? "#CC0000" : "rgba(255,255,255,0.65)",
              transition: "width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
              padding: 0,
              boxShadow: i === active ? "0 2px 8px rgba(204,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
