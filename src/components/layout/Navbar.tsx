"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Smartphone } from "lucide-react";
import { navLinks } from "@/constants/nav";
import MobileMenu from "@/components/layout/MobileMenu";
import Image from "next/image";

interface NavbarProps {
  siteName?: string;
  logo?: string;
  contact1?: string;
  topBarTitle?: string;
  topBarNumber?: string;
}

export default function Navbar({ siteName, logo, contact1, topBarTitle, topBarNumber }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const barTitle = topBarTitle || "👉🏻 Click here to book connection online";
  const barNumber = topBarNumber || contact1 || "(0891) 6677-123";
  const telHref = `tel:${(barNumber || "08916677123").replace(/[\s-]/g, "")}`;
  const logoSrc = logo || "/images/logo.png";
  const siteLabel = siteName || "VBC On Fiber";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div style={{
        background: "#161616",
        padding: "10px 16px",
        textAlign: "center",
        fontSize: "13px",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.3px",
      }}>
        <Link href="/plans" style={{ color: "#fff", textDecoration: "none" }}>
         {barTitle}
        </Link>
        <span style={{ margin: "0 16px", opacity: 0.6 }}>|</span>
        <Link href={telHref} style={{ color: "#fff", textDecoration: "none" }}>
          <Phone size={12} style={{ display: "inline", marginRight: 4 }} />
          Call {barNumber}
        </Link>
      </div>

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
        <nav
          style={{
            maxWidth: "1920px",
            margin: "0 auto",
            padding: "14px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src={logoSrc}
              alt={siteLabel}
              width={180}
              height={60}
              priority
              style={{ width: "auto", height: "48px", display: "block" }}
            />
          </Link>

          <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: active ? "#CC0000" : "#344054",
                    textDecorationLine: active ? "underline" : "none",
                    textDecorationColor: "#CC0000",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "6px",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#CC0000")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#CC0000" : "#344054")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              title="Android app coming soon"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: "#152238",
                cursor: "default",
                opacity: 0.7,
              }}
            >
              <span style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(20,33,61,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Smartphone size={16} color="#CC0000" />
              </span>
              <span style={{ lineHeight: 1.2 }}>
                <span style={{ display: "block", fontSize: "9px", color: "#667085", fontFamily: "'DM Sans', sans-serif" }}>Get our App</span>
                <span style={{ display: "block", fontSize: "12px", fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>Coming Soon for Android</span>
              </span>
            </div>
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
        @media (max-width: 1100px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}