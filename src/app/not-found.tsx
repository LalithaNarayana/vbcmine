import Link from "next/link";
import { Home, Search, Wifi } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(204,0,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "600px" }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(120px,20vw,220px)", color: "rgba(204,0,0,0.1)", lineHeight: 1, letterSpacing: "8px", userSelect: "none", marginBottom: "-20px" }}>404</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
          <Wifi size={24} color="#CC0000" />
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "3px", color: "#E8E8E8" }}>CONNECTION LOST</h1>
        </div>
        <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.7", marginBottom: "40px" }}>
          The page you're looking for has gone offline. It may have been moved, deleted, or never existed. Let's get you back on track.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Home size={15} /> Back to Home
          </Link>
          <Link href="/plans" className="btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Search size={15} /> Browse Plans
          </Link>
        </div>
        <div style={{ marginTop: "48px", padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: "12px", color: "#444" }}>
            Need help? Call us at{" "}
            <a href="tel:+918910000000" style={{ color: "#CC0000", textDecoration: "none" }}>+91 891 000 0000</a>
            {" "}or{" "}
            <Link href="/contact" style={{ color: "#CC0000", textDecoration: "none" }}>contact our team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
