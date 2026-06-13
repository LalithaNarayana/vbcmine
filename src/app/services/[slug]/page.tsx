"use client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

type ServiceContent = {
  badge: string;
  badgeBg?: string;
  badgeColor?: string;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  image: string;
  phone: string;
  email: string;
  body: React.ReactNode;
};

function Bullet({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((h, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, fontSize: 14, color: "#475467" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: 7 }} />{h}
        </li>
      ))}
    </ul>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 17, color: "#14213D", marginBottom: 10, marginTop: 0 }}>{children}</h3>;
}

function Para({ children, mb = 20 }: { children: React.ReactNode; mb?: number }) {
  return <p style={{ color: "#475467", fontSize: 14, lineHeight: 1.9, marginBottom: mb }}>{children}</p>;
}

const ill: ServiceContent = {
  badge: "ILL", badgeBg: "rgb(255,255,255)", badgeColor: "#ff0000",
  heroTitle: <>INTERNET LEASED <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>LINES (ILL)</span></>,
  heroSubtitle: "Dedicated High-Speed Symmetric Connectivity",
  image: "/images/service1.jpeg", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, letterSpacing: 1, color: "#14213D", marginBottom: 6 }}>INTERNET LEASED LINES</h2>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, color: "#CC0000", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>At VBC</p>
      <Para>At VBC, we provide an Internet Leased Line (ILL) with a dedicated, high-speed, and symmetric internet connectivity service provided by an Internet Service Provider (ISP) to enterprises, government organizations, educational institutions, and data centers.</Para>
      <Para mb={28}>Unlike broadband connections that are shared among multiple users, a leased line offers exclusive bandwidth between the customer premises and the ISP network, ensuring consistent performance, reliability, and service quality.</Para>
      <H3>Key Features</H3>
      <Bullet items={["Dedicated Bandwidth","Symmetrical Upload & Download Speeds","Static Public IP Addresses","SLA-backed uptime guarantee","99%+ network availability"]} />
    </>
  ),
};

const mpls: ServiceContent = {
  badge: "MPLS", badgeBg: "rgb(255,255,255)", badgeColor: "#ff0000",
  heroTitle: <>MPLS <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>CONNECTIVITY</span></>,
  heroSubtitle: "Point-to-Point and Point-to-Multipoint",
  image: "/images/service2.jpeg", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: "#14213D", marginBottom: 6 }}>MPLS</h2>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, color: "#CC0000", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>VBC P2P and P2MP Connectivity</p>
      <Para>VBC provides customers with P2P and P2MP connectivity. MPLS Point-to-Point (P2P) services provide Layer 2 or Layer 3 connectivity over a service provider&apos;s MPLS backbone, enabling organizations to transport mission-critical data, voice, video, and application traffic with guaranteed performance and security.</Para>
      <Para mb={24}>Unlike traditional internet-based connectivity, MPLS P2P circuits are isolated from the public internet, providing enhanced security, predictable latency, and Quality of Service (QoS) capabilities.</Para>
      <H3>MPLS P2P — Service Types</H3>
      <div style={{ marginBottom: 20 }}><Bullet items={["Layer 2 MPLS P2P","Layer 3 MPLS P2P VPN"]} /></div>
      <H3>MPLS P2P — Key Features</H3>
      <div style={{ marginBottom: 24 }}><Bullet items={["Dedicated Private Connectivity","Quality of Service (QoS)","Scalability","High Availability"]} /></div>
      <div style={{ borderTop: "1px solid rgba(204,0,0,0.15)", paddingTop: 24, marginBottom: 20 }}>
        <H3>MPLS P2MP — Overview</H3>
        <Para>MPLS Point-to-Multipoint (P2MP) connectivity enables data transmission from a single source location (hub) to multiple destination locations (spokes) across a service provider&apos;s MPLS backbone network. It efficiently distributes the same traffic stream to multiple remote sites while optimizing bandwidth utilization.</Para>
        <H3>P2MP Service Types</H3>
        <div style={{ marginBottom: 16 }}><Bullet items={["Layer 2 P2MP Service","Layer 3 P2MP VPN Service"]} /></div>
        <H3>P2MP Key Features</H3>
        <Bullet items={["Efficient Traffic Distribution","Bandwidth Optimization","Quality of Service (QoS)","Scalability"]} />
      </div>
    </>
  ),
};

const hosting: ServiceContent = {
  badge: "Data Center", badgeBg: "rgb(255,255,255)", badgeColor: "#ff0000",
  heroTitle: <>HOSTING &amp; <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>COLOCATION</span></>,
  heroSubtitle: "Secure Data Center Services for Your Business",
  image: "/images/service3.jpeg", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 30, color: "#14213D", marginBottom: 16 }}>HOSTING AND SERVER COLOCATION SERVICES</h2>
      <Para>VBC&apos;s Hosting and Server Colocation are critical data center services that enable organizations to deploy, manage, and operate business applications, websites, databases, and IT infrastructure within secure and highly available environments.</Para>
      <Para>While hosting services provide computing resources managed by a service provider, server colocation allows organizations to place their own servers and network equipment within a professionally managed data center facility. Both services offer robust infrastructure, power redundancy, physical security, environmental controls, and high-speed network connectivity to support business-critical operations.</Para>
      <H3>Hosting Services</H3>
      <Para>Hosting services provide customers with computing, storage, networking, and application infrastructure hosted within a service provider&apos;s data center. The provider manages the underlying infrastructure while customers utilize the resources to run applications and services.</Para>
      <Para>Hosting solutions can be delivered through:</Para>
      <div style={{ marginBottom: 25 }}><Bullet items={["Dedicated Servers","Virtual Private Servers (VPS)","Private Cloud","Public Cloud","Hybrid Cloud Environments"]} /></div>
      <H3>Types of Hosting Services</H3>
      {[
        { title: "Shared Hosting", desc: "Multiple customers share the same server resources.", label: "Suitable for:", items: ["Small websites","Blogs","Low-traffic applications"] },
        { title: "Virtual Private Server (VPS) Hosting", desc: "Virtualized environments with dedicated resource allocation.", label: "Features:", items: ["Independent operating systems","Resource isolation","Cost-effective scalability"] },
        { title: "Dedicated Server Hosting", desc: "A physical server exclusively allocated to a single customer.", label: "Benefits:", items: ["Maximum performance","Enhanced security","Full administrative control"] },
        { title: "Cloud Hosting", desc: "Resources are dynamically allocated from a shared cloud infrastructure.", label: "Advantages:", items: ["Elastic scalability","High availability","Pay-as-you-use model"] },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h4 style={{ color: "#CC0000", marginBottom: 8 }}>{s.title}</h4>
          <p style={{ color: "#475467", fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
          <p style={{ color: "#475467", fontSize: 14 }}>{s.label}</p>
          <ul style={{ marginTop: 8, color: "#475467", fontSize: 14 }}>{s.items.map((x, j) => <li key={j}>{x}</li>)}</ul>
        </div>
      ))}
      <H3>Server Colocation Services</H3>
      <Para>Server Colocation is a service where customers deploy and manage their own servers, storage devices, and networking equipment within a third-party data center facility.</Para>
      <p style={{ color: "#475467", fontSize: 14, marginBottom: 10 }}>The data center provider supplies:</p>
      <div style={{ marginBottom: 25 }}><Bullet items={["Rack Space","Power","Cooling","Physical Security","Network Connectivity","Environmental Monitoring"]} /></div>
      <Para>Customers retain ownership and management control of their equipment.</Para>
      <H3>Network Infrastructure</H3>
      <div style={{ marginBottom: 25 }}><Bullet items={["Internet Leased Lines","MPLS VPN","Dedicated Fiber Connectivity","Cross Connect Services","Cloud Connectivity"]} /></div>
      <H3>Remote Hands and Managed Services</H3>
      <Para>VBC provides remote hands support and managed services to assist customers with server monitoring, troubleshooting, equipment installation, maintenance, upgrades, and operational support without requiring on-site visits.</Para>
      <H3>Managed Hosting Services</H3>
      <Para>Our managed hosting solutions include infrastructure management, security monitoring, backup services, patch management, performance optimization, and technical support to ensure maximum uptime and reliability for mission-critical applications.</Para>
    </>
  ),
};

const voip: ServiceContent = {
  badge: "VoIP / IBS", badgeBg: "rgb(255,255,255)", badgeColor: "#ff0000",
  heroTitle: <>VOIP / <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>IBS SOLUTIONS</span></>,
  heroSubtitle: "Voice over IP and Enterprise Telephony",
  image: "/images/service4.jpeg", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 30, color: "#14213D", marginBottom: 16 }}>VOIP SERVICES</h2>
      <Para>VBC provides Voice over Internet Protocol (VoIP) services — a communication technology that enables voice, video, and multimedia communications to be transmitted over IP networks instead of traditional Public Switched Telephone Networks (PSTN).</Para>
      <Para>VoIP services leverage broadband internet, MPLS networks, and dedicated IP infrastructure to deliver cost-effective, scalable, and feature-rich telephony solutions for enterprises, government organizations, educational institutions, and service providers.</Para>
      <Para mb={24}>For Internet Service Providers (ISPs), VoIP services represent a value-added offering that integrates voice communication with existing data connectivity services, providing unified communication solutions to customers.</Para>
      <H3>Core Components</H3>
      <div style={{ marginBottom: 20 }}><Bullet items={["IP Phones","Soft Phones","IP PBX"]} /></div>
      <H3>VoIP Service Types</H3>
      <Bullet items={["Hosted VoIP","SIP Trunking Services","IP Centrex Services","Unified Communications"]} />
    </>
  ),
};

const fiber: ServiceContent = {
  badge: "Fiber FTTH", badgeBg: "rgba(204,0,0,0.2)", badgeColor: "#ff6b6b",
  heroTitle: "FIBER BROADBAND (FTTH)",
  heroSubtitle: "Lightning-Fast Home and Business Internet",
  image: "/images/service6.png", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 30, color: "#14213D", marginBottom: 16 }}>FIBER BROADBAND (FTTH)</h2>
      <Para mb={24}>VBC delivers true Fiber-to-the-Home (FTTH) connectivity with symmetric upload and download speeds. With no throttling and no fair usage policy caps, you get the internet speeds you pay for — every single day. Our fiber network spans 160 Km across Visakhapatnam with 99%+ uptime.</Para>
      <H3>Key Features</H3>
      <Bullet items={["True Fiber-to-the-Home (FTTH)","Symmetric Upload & Download","No Throttling or FUP Caps","Plans from 30 Mbps to 1 Gbps","Free Installation","24/7 Local Support"]} />
    </>
  ),
};

const opticalFiber: ServiceContent = {
  badge: "Optical Fiber Lease", badgeBg: "rgb(255, 255, 255)", badgeColor: "#ff0000",
  heroTitle: "OPTICAL FIBER LEASE SERVICES",
  heroSubtitle: "Dedicated Fiber Connectivity for Business",
  image: "/images/service5.jpeg", phone: "(0891) 6677-123, 6677-124", email: "sales@vbctv.in",
  body: (
    <>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 30, color: "#14213D", marginBottom: 16 }}>OPTICAL FIBER LEASE SERVICES</h2>
      <Para>Our Optical Fiber Lease service provides secure, reliable, and underground fiber connectivity for enterprises, telecom operators, data centers, government organizations, and service providers. Leveraging our extensive fiber network, we deliver dedicated communication infrastructure to support your critical business operations.</Para>
      <Para mb={24}>We provide robust underground fiber connectivity solutions designed to deliver secure, high-speed, and uninterrupted network services. Our underground fiber infrastructure ensures superior protection against environmental factors while supporting scalable bandwidth requirements for businesses, residential communities, educational institutions, and enterprise networks.</Para>
      <H3>Our Services</H3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { name: "Dark Fiber Leasing", detail: "Lease dedicated fiber strands and deploy your own network equipment to build a customized, high-capacity communication network." },
          { name: "Point-to-Point Connectivity", detail: "Establish secure, high-speed links between offices, branches, campuses, data centers, and business locations." },
        ].map((s, i) => (
          <div key={i} style={{ padding: "14px 18px", background: "rgba(204,0,0,0.04)", border: "1px solid rgba(204,0,0,0.12)", borderRadius: 8 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#14213D", marginBottom: 4 }}>{s.name}</div>
            <p style={{ fontSize: 13, color: "#475467", margin: 0, lineHeight: 1.7 }}>{s.detail}</p>
          </div>
        ))}
      </div>
    </>
  ),
};

const servicesMap: Record<string, ServiceContent> = {
  ill, mpls, hosting, voip, fiber,
  "optical-fiber": opticalFiber,
};

// Cards data for "Other Services" section (mirrors services/page.tsx)
const allServiceCards = [
  {
    id: "ill",
    title: "Internet Leased Lines (ILL)",
    subtitle: "Dedicated High-Speed Symmetric Connectivity",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
      </svg>
    ),
    image: "/images/service1.jpeg",
  },
  {
    id: "mpls",
    title: "MPLS Connectivity",
    subtitle: "Point-to-Point and Point-to-Multipoint",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
        <line x1="12" y1="7" x2="5" y2="17" /><line x1="12" y1="7" x2="19" y2="17" />
      </svg>
    ),
    image: "/images/service2.jpeg",
  },
  {
    id: "hosting",
    title: "Hosting & Server Colocation",
    subtitle: "Secure Data Center Services",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    image: "/images/service3.jpeg",
  },
  {
    id: "voip",
    title: "VOIP / IBS Solutions",
    subtitle: "Voice over IP and Enterprise Telephony",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.07 6.07l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    image: "/images/service4.jpeg",
  },
  {
    id: "optical-fiber",
    title: "Optical Fiber Lease",
    subtitle: "Dedicated Underground Fiber Connectivity",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    image: "/images/service2.jpeg",
  },
];

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = servicesMap[slug];
  if (!service) return notFound();

  // Pick 3 other services (exclude current)
  const otherServices = allServiceCards.filter((s) => s.id !== slug).slice(0, 3);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <section style={{ padding: "80px 24px 60px", background: "linear-gradient(135deg, #14213D 0%, #1e3a5f 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#CC0000", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", marginBottom: 24 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Services
          </Link><br />
          <div style={{ display: "inline-block", background: service.badgeBg || "rgba(204,0,0,0.2)", color: service.badgeColor || "#ff6b6b", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, padding: "5px 14px", borderRadius: 999, textTransform: "uppercase", marginBottom: 16 }}>{service.badge}</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(42px, 6vw, 80px)", letterSpacing: 2, color: "#fff", lineHeight: 0.95, marginBottom: 16 }}>{service.heroTitle}</h1>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#CC0000", letterSpacing: 1.5, textTransform: "uppercase" }}>{service.heroSubtitle}</p>
        </div>
      </section>

      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="service-detail-grid">
            <div>
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: 32, height: 260, background: "linear-gradient(135deg, #14213D, #1e3a5f)" }}>
                <Image src={service.image} alt={service.badge} fill style={{ objectFit: "cover", opacity: 0.8 }} onError={() => {}} />
              </div>
              <div style={{ padding: "24px", background: "rgba(204,0,0,0.04)", border: "1px solid rgba(204,0,0,0.15)", borderRadius: 10 }}>
                <strong style={{ color: "#CC0000", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, display: "block", marginBottom: 10 }}>For more details:</strong>
                <p style={{ color: "#475467", fontSize: 14, margin: "0 0 4px 0" }}>Call: <a href="tel:08916677123" style={{ color: "#14213D", fontWeight: 700, textDecoration: "none" }}>{service.phone}</a></p>
                <p style={{ color: "#475467", fontSize: 14, margin: 0 }}>Email: <a href={`mailto:${service.email}`} style={{ color: "#CC0000", textDecoration: "none" }}>{service.email}</a></p>
              </div>
            </div>
            <div>{service.body}</div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section style={{ padding: "0 24px 100px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ width: 4, height: 32, background: "linear-gradient(180deg, #CC0000, #E43B2C)", borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, letterSpacing: 2, color: "#14213D", margin: 0 }}>
                OTHER{" "}
                <span style={{ WebkitTextStroke: "2px #CC0000", color: "transparent" }}>SERVICES</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#475467", marginLeft: 20, lineHeight: 1.7 }}>
              Explore more enterprise solutions from VBC.
            </p>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "flex-start" }}>
            {otherServices.map((s) => (
              <div
                key={s.id}
                style={{
                  position: "relative",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  minHeight: 300,
                  width: "calc(33.333% - 16px)",
                  minWidth: 260,
                  maxWidth: 360,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 50px rgba(0,0,0,0.45)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* BG image */}
                <img
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                {/* Dark overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(20,33,61,0.82) 0%, rgba(8,14,28,0.75) 100%)" }} />
                {/* Bottom red accent */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #CC0000, transparent)" }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1, padding: "32px 28px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                  {/* Icon */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 14, background: "rgba(255,255,255,0.93)", boxShadow: "0 6px 20px rgba(0,0,0,0.22)", marginBottom: 16 }}>
                    {s.icon}
                  </div>
                  {/* Red divider */}
                  <div style={{ width: 30, height: 3, background: "linear-gradient(90deg, #CC0000, #E43B2C)", borderRadius: 2, marginBottom: 12 }} />
                  {/* Title */}
                  <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: 1, color: "#FFFFFF", marginBottom: 6, lineHeight: 1.1, textTransform: "uppercase" }}>{s.title}</h3>
                  {/* Subtitle */}
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>{s.subtitle}</p>
                  {/* Button */}
                  <Link href={`/services/${s.id}`} style={{ display: "inline-block", fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", background: "linear-gradient(135deg, #CC0000, #E43B2C)", color: "#fff", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 16px rgba(204,0,0,0.4)", marginTop: "auto" }}>
                    View Service
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View all services link */}
          <div style={{ marginTop: 36, textAlign: "center" }}>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#CC0000", textDecoration: "none", borderBottom: "1px solid rgba(204,0,0,0.3)", paddingBottom: 2 }}>
              View All Business Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){.service-detail-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
