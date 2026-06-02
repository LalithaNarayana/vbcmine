"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  "/images/hero.webp",
  "/images/hero.webp",
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Image
        src={banners[active]}
        alt={`Hero banner ${active + 1}`}
        width={1920}
        height={700}
        priority
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </section>
  );
}