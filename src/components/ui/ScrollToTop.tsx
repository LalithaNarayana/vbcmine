"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="scroll-to-top-btn"
        style={{
          position: "fixed",
          right: 20,
          bottom: 24,
          zIndex: 1200,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          background: "#CC0000",
          color: "#fff",
          display: visible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(204,0,0,0.35)",
          cursor: "pointer",
          transition: "opacity 0.25s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </button>

      <style>{`
        /* Lift above the mobile bottom tab bar so it never overlaps it */
        @media (max-width: 1100px) {
          .scroll-to-top-btn {
            bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 16px) !important;
          }
        }
      `}</style>
    </>
  );
}
