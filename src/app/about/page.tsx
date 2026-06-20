import type { Metadata } from "next";
import { Award, MapPin, Calendar, Users, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — VBC On Fiber | Vizag's Trusted ISP Since 2012",
  description:
    "Learn about VBC (Vizag Broadcasting Company) — 14+ years serving Visakhapatnam with fiber broadband, IPTV, and enterprise connectivity. 640 km fiber network, 30K+ customers, 99%+ uptime.",
};

const stats = [
  { value: "14+", label: "Years of Service" },
  { value: "30K+", label: "Broadband Customers" },
  { value: "640 Km", label: "Fiber Network" },
  { value: "99%+", label: "Uptime" },
  { value: "Class B", label: "ISP License" },
  { value: "24/7", label: "Support" },
];

const profileServices = [
  "Fixed Broadband Services with FTTH connectivity",
  "Wireless Broadband Solutions",
  "Internet Leased Lines (ILL)",
  "MPLS P2P & P2MP Connectivity",
  "VOIP / IBS Solutions",
  "Hosting / Co-location Services",
  "CATV / IPTV Services",
];

const successServices = [
  "Fiber Broadband Services",
  "Wireless Broadband Connectivity",
  "Internet Leased Lines (ILL)",
  "MPLS P2P & P2MP Connectivity",
  "VOIP / IBS Solutions",
  "Server Co-location Services",
  "CATV / IPTV Services",
];

const timelineItems = [
  { year: "2012", event: "VBC on Fiber was established in Visakhapatnam with a vision to provide reliable, high-speed internet connectivity to homes and businesses across Andhra Pradesh. At a time when quality broadband infrastructure was limited, the company focused on building a strong and future-ready optical fiber network." },
  { year: "2015", event: "Launched Digital TV / CATV services. Became a licensed operator. Expanded across 15 areas in Vizag." },
  { year: "2018", event: "Introduced IPTV and expanded fiber backbone across Vizag. Launched full IPTV platform with 400+ channels and VOD library." },
  { year: "2020", event: "Expanded to enterprise services — Leased Lines, MPLS & VoIP. Upgraded network infrastructure to deliver 1 Gbps speeds citywide." },
  { year: "2022", event: "20,000+ subscribers. Major network expansion across the city. Launched enterprise hosting for businesses." },
  { year: "2025", event: "Expanded 640 Km fiber network. Increased to 30,000+ broadband customers. 30% increase in ILL and MPLS business. Increased backbone capacity and redundancy links." },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "0px", background: "#ffffff" }}>

      {/* Hero */}
      <section style={{
        padding: "100px 24px 80px",
        background: "linear-gradient(135deg, #fff7f5 0%, #ffffff 55%, #f7fafc 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", background: "linear-gradient(135deg, transparent, rgba(204,0,0,0.05))" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>About VBC</div>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(50px, 8vw, 100px)", letterSpacing: "2px", lineHeight: 0.95, color: "#152238", maxWidth: "700px" }}>
            CONNECTING<br />
            <span style={{ color: "#CC0000" }}>Andhra Pradesh</span><br />
            SINCE 2012
          </h1>
          <div className="red-divider" style={{ marginTop: "20px", marginBottom: "24px" }} />
          <p style={{ color: "#475467", fontSize: "15px", lineHeight: "1.8", maxWidth: "600px" }}>
            VBC on Fiber (Vizag Broadcasting Company Pvt. Ltd.) started with a single mission: give Andhra Pradesh the internet it deserves. Today we&apos;re the state&apos;s most trusted ISP, serving over 30,000 homes and businesses with fiber broadband, Digital TV, and IPTV.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#CC0000", padding: "0" }}>
        <div style={{ maxWidth: "1420px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ padding: "32px 16px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(22px, 3vw, 36px)", color: "white", letterSpacing: "1px" }}>{s.value}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){section > div{grid-template-columns:repeat(3,1fr)!important;}}`}</style>
      </section>

      {/* Company Profile */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>

            {/* Left column */}
            <div>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>Company Profile</div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "2px", color: "#152238", marginBottom: "32px", lineHeight: 1 }}>
                WHO WE <span style={{ color: "#CC0000" }}>ARE</span>
              </h2>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "20px" }}>
                Established in 2012, VBC on Fiber is a Visakhapatnam-based Internet Service Provider (ISP) operating under a Class B license in Andhra Pradesh.
              </p>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "20px" }}>
                We have built a state-of-the-art Optical Fiber Network infrastructure that enables us to deliver reliable, high-speed connectivity to customers across the city and throughout the state.
              </p>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
                Our comprehensive range of services includes:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                {profileServices.map((s, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#475467" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: "7px" }} />
                    {s}
                  </li>
                ))}
              </ul>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}>
                With a strong focus on performance, reliability, and customer satisfaction, VBC on Fiber continues to provide advanced networking and communication solutions for residential, business, and enterprise customers across Andhra Pradesh.
              </p>
            </div>

            {/* Right column */}
            <div>
              <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>WHY</div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "2px", color: "#152238", marginBottom: "32px", lineHeight: 1 }}>
                WHY CHOOSE <span style={{ color: "#CC0000" }}>VBC</span>
              </h2>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
                VBC on Fiber operates a high-performance network infrastructure designed to deliver reliable, high-speed, and fully redundant internet connectivity. Our services are backed by robust, load-balanced backbone internet connections that ensure superior network stability and performance.
              </p>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
                With network uptime consistently maintained at 99% and above, we are committed to providing maximum availability and uninterrupted connectivity to our customers.
              </p>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
                One of our core strengths is our dedicated after-sales service and technical support. With our own in-house team managing the last-mile connectivity and extensive network, we ensure prompt response and efficient issue resolution.
              </p>
              <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}>
                At VBC on Fiber, customer satisfaction remains at the heart of everything we do. We treat every complaint with utmost priority and strive to resolve issues as quickly as possible through our customer-centric approach.
              </p>
            </div>

          </div>
          <style>{`@media(max-width:768px){.profile-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* Success Story & Timeline */}
      <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <div className="badge-red" style={{ display: "inline-block", marginBottom: "16px", fontSize: 13 }}>Our Success Story</div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "2px", color: "#152238", marginBottom: "24px", lineHeight: 1 }}>
              FROM A SMALL SETUP<br />
              <span style={{ color: "#CC0000" }}>TO AP&apos;S BACKBONE</span>
            </h2>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
              Established in 2012 in Visakhapatnam, VBC on Fiber began with a vision to provide reliable, high-speed internet connectivity to homes and businesses across Andhra Pradesh. At a time when quality broadband infrastructure was limited in many regions, the company focused on building a strong and future-ready optical fiber network capable of delivering uninterrupted digital connectivity.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
              Over the years, VBC on Fiber invested in developing a state-of-the-art fiber optic backbone with high redundancy and load-balanced internet architecture. This robust infrastructure enabled the company to provide stable and high-speed internet services with uptime consistently maintained at 99% and above.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
              What started as a regional ISP steadily expanded its footprint through a customer-first approach, reliable service delivery, and strong technical support. Unlike many providers that depend heavily on third-party support, VBC on Fiber built its own dedicated last-mile service and support teams, allowing faster issue resolution and better customer experience.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
              Today, VBC on Fiber serves a diverse range of customers including residential users, small businesses, enterprises, educational institutions, and corporate organizations. The company offers a complete suite of services:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
              {successServices.map((s, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#475467" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#CC0000", flexShrink: 0, marginTop: "7px" }} />
                  {s}
                </li>
              ))}
            </ul>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9", marginBottom: "16px" }}>
              The company&apos;s commitment to quality, reliability, and customer satisfaction has helped it earn trust and recognition across Andhra Pradesh. By continuously upgrading its network infrastructure and adapting to evolving technology demands, VBC on Fiber continues to strengthen its position as a dependable and growing ISP in the region.
            </p>
            <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.9" }}>
              Driven by innovation and customer-centric values, VBC on Fiber remains committed to bridging the digital divide and empowering individuals and businesses with seamless connectivity solutions for the future.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{ position: "absolute", left: 0, top: "20px", bottom: "20px", width: "2px", background: "linear-gradient(180deg, #CC0000 0%, rgba(204,0,0,0.1) 100%)" }} />
            {timelineItems.map((item, i) => (
              <div key={i} style={{ marginBottom: i < timelineItems.length - 1 ? "40px" : "0", position: "relative" }}>
                <div style={{ position: "absolute", left: "-39px", top: "8px", width: "14px", height: "14px", background: "#CC0000", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "20px", color: "#CC0000", letterSpacing: "2px", marginBottom: "6px" }}>{item.year}</div>
                <p style={{ color: "#475467", fontSize: "13px", lineHeight: "1.7" }}>{item.event}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.success-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Mission Vision Values */}
      <section style={{ background: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(204,0,0,0.15)" }}>
            {[
              { icon: <Award size={28} />, title: "Our Mission", desc: "To provide Andhra Pradesh with world-class connectivity at affordable prices, empowering every household and business to thrive in the digital age." },
              { icon: <CheckCircle size={28} />, title: "Our Vision", desc: "To be Andhra Pradesh's most trusted broadband and media provider — known for speed, reliability, and exceptional customer care." },
              { icon: <Users size={28} />, title: "Our Values", desc: "Transparency in pricing. Accountability in service. Commitment to the communities we serve. Local heart, global standards." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#ffffff", padding: "48px 36px" }}>
                <div style={{ color: "#CC0000", marginBottom: "20px" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "22px", color: "#152238", marginBottom: "14px", letterSpacing: "0.5px" }}>{item.title}</h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.8" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){div > div{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>
    </div>
  );
}