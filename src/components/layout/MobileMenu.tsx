"use client";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { navLinks } from "@/constants/nav";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                textDecoration: "none",
                color: "#152238",
                fontSize: "18px",
                fontWeight: 600,
                padding: "14px 16px",
                borderRadius: "16px",
                background: "#F8FAFC",
                border: "1px solid #EEF2F6",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "28px" }}>
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
            <Link href="tel:+918910000000" onClick={onClose} style={{ color: "#CC0000", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
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
