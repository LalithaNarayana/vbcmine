"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/constants/nav";
import MobileMenu from "@/components/layout/MobileMenu";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 10px 30px rgba(20, 33, 61, 0.08)" : "none",
          borderBottom: "1px solid rgba(20,33,61,0.06)",
        }}
      >
        <div
          className="nav-utility"
          style={{
            borderBottom: "1px solid #EEF2F6",
            background: "#000000",
          }}
        >
          <div
            style={{
              maxWidth: "1920px",
              margin: "0 auto",
              padding: "10px 65px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#ffffff", fontSize: "13px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={14} color="#ffffff" /> Serving Visakhapatnam and surrounding areas
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <Link href="tel:+918910000000" style={{ color: "#ffffff", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Phone size={14} color="#ffffff" /> +91 891 000 0000
                </span>
              </Link>
              <Link href="/contact" style={{ color: "#ff5b5b", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
                Support Center
              </Link>
            </div>
          </div>
        </div>

        <nav
          style={{
            maxWidth: "1920px",
            margin: "0 auto",
            padding: "18px 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/images/logo.png"
              alt="VBC On Fiber"
              width={180}
              height={60}
              priority
              style={{
                width: "auto",
                height: "48px",
                display: "block",
              }}
            />
          </Link>

          <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#344054",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#CC0000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#344054")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/login" className="btn-outline" style={{ textDecoration: "none", padding: "10px 20px" }}>
              My Account
            </Link>
            <Link href="/plans" className="btn-primary" style={{ textDecoration: "none", padding: "10px 22px" }}>
              Explore Plans
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="navbar-mobile-toggle"
            style={{
              display: "none",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1px solid #E4E7EC",
              background: "#fff",
              color: "#152238",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop,
          .utility-hide {
            display: none !important;
          }

          .navbar-mobile-toggle {
            display: inline-flex !important;
          }
        }

        @media (max-width: 640px) {
          .nav-utility {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
