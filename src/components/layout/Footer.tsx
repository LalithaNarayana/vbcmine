"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Radio, ShieldCheck, Tv, Wifi, Server, PhoneCall, Globe } from "lucide-react";

const businessServices = [
  { label: "Internet Leased Lines (ILL)", icon: Wifi, href: "/services/ill" },
  { label: "MPLS Connectivity", icon: Globe, href: "/services/mpls" },
  { label: "Hosting & Server Colocation", icon: Server, href: "/services/hosting" },
  { label: "VOIP / IBS Solutions", icon: PhoneCall, href: "/services/voip" },
  { label: "Optical Fiber Lease", icon: ShieldCheck, href: "/services/optical-fiber" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Plans & Pricing", href: "/plans" },
  { label: "Renew Plan", href: "/renew" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "0px",
        background: "#000",
        borderTop: "1px solid #1F1F1F",
      }}
    >
      <div style={{ maxWidth: "1920px", margin: "0 auto", padding: "56px 90px 28px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1.2fr 1fr 1.2fr",
            gap: "32px",
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
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
            </div>
            <p style={{ color: "#B7BDC6", lineHeight: 1.8, fontSize: "14px", maxWidth: "360px", marginBottom: "20px" }}>
              VBC delivers reliable fiber broadband, TV and enterprise network services with local support, transparent pricing and fast installation.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "16px",
                background: "#111",
                border: "1px solid #242424",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.28)",
              }}
            >
              <Phone size={18} color="#CC0000" />
              <div>
                <div style={{ color: "#9CA3AF", fontSize: "12px" }}>24/7 customer care</div>
                <div style={{ color: "#FFFFFF", fontWeight: 700 }}>(0891) 6677-123</div>
              </div>
            </div>
          </div>

          {/* Business Services */}
          <div>
            <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFFFFF", marginBottom: "16px" }}>Business Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {businessServices.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="footer-service-link"
                >
                  <Icon size={14} color="#CC0000" style={{ flexShrink: 0 }} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFFFFF", marginBottom: "16px" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ color: "#B7BDC6", textDecoration: "none", fontSize: "14px" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFFFFF", marginBottom: "16px" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: "#B7BDC6", fontSize: "14px", lineHeight: 1.7 }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <MapPin size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>#47-10-20, 401, 4th Floor, Dwaraka Plaza, Dwaraka Nagar, Visakhapatnam – 530016</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Phone size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>(0891) 6677-123, 6677-124</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Mail size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>sales@vbctv.in | support@vbctv.in</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "36px",
            paddingTop: "20px",
            borderTop: "1px solid #242424",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            color: "#9CA3AF",
            fontSize: "13px",
          }}
        >
          <p>(c) {new Date().getFullYear()} VBC On Fiber. All rights reserved.</p>
          <p style={{ color: "#9CA3AF", fontSize: "13px" }}>
            Designed and Developed by{" "}
            <a href="https://www.thecolourmoon.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#CC0000", textDecoration: "none", fontWeight: 600 }}>Colourmoon Technologies</a>
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms-conditions" style={{ color: "#9CA3AF", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="/refund-policy" style={{ color: "#9CA3AF", textDecoration: "none" }}>Refund Policy</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-service-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #B7BDC6;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-service-link:hover {
          color: #CC0000;
        }
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}