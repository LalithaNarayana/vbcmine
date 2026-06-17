"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Smartphone, X } from "lucide-react";
import { navLinks, androidAppUrl } from "@/constants/nav";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        background: "rgba(15, 23, 42, 0.35)",
        backdropFilter: "blur(10px)",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          minHeight: "100%",
          padding: "24px",
          boxShadow: "0 24px 60px rgba(20, 33, 61, 0.16)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#152238" }}>VBC On Fiber</div>
            <div style={{ fontSize: "13px", color: "#667085", marginTop: "4px" }}>Plans, support and account access</div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              border: "1px solid #E4E7EC",
              background: "#fff",
              color: "#152238",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{
                  textDecorationLine: active ? "underline" : "none",
                  textDecorationColor: "#CC0000",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "4px",
                  color: active ? "#CC0000" : "#152238",
                  fontSize: "18px",
                  fontWeight: 600,
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: active ? "rgba(204,0,0,0.06)" : "#F8FAFC",
                  border: active ? "1px solid rgba(204,0,0,0.25)" : "1px solid #EEF2F6",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "28px" }}>
          <a
            href={androidAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              borderRadius: "20px",
              background: "#F8FAFC",
              border: "1px solid #EEF2F6",
              padding: "14px 16px",
              marginBottom: "14px",
            }}
          >
            <span style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(204,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Smartphone size={18} color="#CC0000" />
            </span>
            <span>
              <span style={{ display: "block", fontSize: "11px", color: "#667085" }}>Get the VBC app</span>
              <span style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "14px", color: "#152238" }}>Download for Android</span>
            </span>
          </a>
          <div
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #FFF4F1 0%, #FFFFFF 100%)",
              border: "1px solid rgba(204,0,0,0.08)",
              padding: "18px",
              marginBottom: "14px",
            }}
          >
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#152238", marginBottom: "6px" }}>Need help choosing a plan?</div>
            <Link href="tel:08916677123" onClick={onClose} style={{ color: "#CC0000", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Phone size={16} /> Call support
            </Link>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/login" onClick={onClose} className="btn-outline" style={{ flex: 1, textAlign: "center", textDecoration: "none" }}>
              My Account
            </Link>
            <Link href="/plans" onClick={onClose} className="btn-primary" style={{ flex: 1, textAlign: "center", textDecoration: "none" }}>
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
