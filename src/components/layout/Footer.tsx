"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import AppIcon from "@/components/admin/DynamicIcon";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Plans & Pricing", href: "/plans" },
  { label: "Renew Plan", href: "/renew" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

interface FooterBusinessService {
  name: string;
  slug: string;
  icon: string;
}

interface FooterProps {
  siteName?: string;
  logo?: string;
  contact1?: string;
  contact2?: string;
  mail1?: string;
  mail2?: string;
  address?: string; // CKEditor HTML
  description?: string;
  businessServices?: FooterBusinessService[];
}

export default function Footer({
  siteName,
  logo,
  contact1,
  contact2,
  mail1,
  mail2,
  address,
  description,
  businessServices,
}: FooterProps = {}) {
  const logoSrc = logo || "/images/logo.png";
  const siteLabel = siteName || "VBC On Fiber";
  const phoneDisplay = [contact1, contact2].filter(Boolean).join(", ");
  const mailDisplay = [mail1, mail2].filter(Boolean).join(", ");
  const services = businessServices || [];

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
                  src={logoSrc}
                  alt={siteLabel}
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
            <p style={{ color: "#B7BDC6", lineHeight: 1.8, fontSize: "14px", maxWidth: "360px", marginBottom: "20px" }} className="ck-content">
              {description ||
                "VBC delivers reliable fiber broadband, TV and enterprise network services with local support, transparent pricing and fast installation."}
            </p>
          </div>

          {/* Business Services */}
          <div>
            <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "16px", color: "#FFFFFF", marginBottom: "16px" }}>Business Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.length > 0 ? (
                services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="footer-service-link"
                  >
                    <AppIcon name={service.icon} size={14} className="footer-service-icon" />
                    <span>{service.name}</span>
                  </Link>
                ))
              ) : (
                <span style={{ color: "#6B7280", fontSize: "13px" }}>No business services added yet.</span>
              )}
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
                {address ? (
                  <span
                    className="footer-address-html ck-content"
                    dangerouslySetInnerHTML={{ __html: address }}
                  />
                ) : (
                  <span style={{ color: "#6B7280" }}>Address not set.</span>
                )}
              </div>
              {phoneDisplay && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Phone size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                  <span>{phoneDisplay}</span>
                </div>
              )}
              {mailDisplay && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Mail size={16} color="#CC0000" style={{ flexShrink: 0, marginTop: "4px" }} />
                  <span>{mailDisplay}</span>
                </div>
              )}
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
          <p>(c) {new Date().getFullYear()} {siteLabel}. All rights reserved.</p>
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
        .footer-service-icon {
          flex-shrink: 0;
          color: #CC0000;
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