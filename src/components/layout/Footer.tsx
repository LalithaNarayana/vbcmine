import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Radio, ShieldCheck, Tv, Wifi } from "lucide-react";

const serviceLinks = [
  { label: "Fiber Broadband", icon: Wifi },
  { label: "Digital TV", icon: Tv },
  { label: "IPTV Services", icon: Radio },
  { label: "Business Connectivity", icon: ShieldCheck },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Plans & Pricing", href: "/plans" },
  { label: "Coverage Areas", href: "/city-selection" },
  { label: "Renew Plan", href: "/renew" },
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
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
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
                <div style={{ color: "#FFFFFF", fontWeight: 700 }}>1800-000-0000</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFFFFF", marginBottom: "16px" }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {serviceLinks.map(({ label, icon: Icon }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#B7BDC6", fontSize: "14px" }}>
                  <Icon size={16} color="#CC0000" />
                  <span>{label}</span>
                </div>
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
                <span>VBC House, MVP Colony, Visakhapatnam, Andhra Pradesh 530017</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Phone size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>+91 891 000 0000</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Mail size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                <span>support@vbconfiber.com</span>
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
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="#" style={{ color: "#9CA3AF", textDecoration: "none" }}>Refund Policy</Link>
          </div>
        </div>
      </div>

      <style>{`
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
