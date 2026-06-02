"use client";
import Link from "next/link";
import { MapPin, ChevronRight, Wifi } from "lucide-react";
import { City } from "@/constants/cities";

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "48px", color: "rgba(204,0,0,0.2)", marginBottom: "16px" }}>NO AREAS FOUND</div>
        <p style={{ color: "#555", fontSize: "14px" }}>Try a different search term</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(204,0,0,0.08)" }}>
      {cities.map((city) => (
        <Link key={city.id} href={`/plans?city=${city.id}`}
          style={{ textDecoration: "none", display: "block", background: "#0A0A0A", padding: "32px", transition: "background 0.3s", cursor: "pointer" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#141414")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0A0A0A")}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ width: "44px", height: "44px", background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}>
              <MapPin size={18} color="#CC0000" />
            </div>
            <div className="badge-red" style={{ fontSize: "10px" }}>{city.zone}</div>
          </div>
          <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "20px", color: "#E8E8E8", marginBottom: "8px", letterSpacing: "0.3px" }}>{city.name}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {city.areas.slice(0, 3).map((area) => (
              <span key={area} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "3px 10px", fontSize: "11px", color: "#555", fontFamily: "'Rajdhani', sans-serif" }}>
                {area}
              </span>
            ))}
            {city.areas.length > 3 && (
              <span style={{ fontSize: "11px", color: "#CC0000", fontFamily: "'Rajdhani', sans-serif", padding: "3px 10px" }}>+{city.areas.length - 3} more</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Wifi size={12} color="#00C864" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "#00C864", letterSpacing: "1px", textTransform: "uppercase" }}>Active Coverage</span>
            </div>
            <ChevronRight size={16} color="#CC0000" />
          </div>
        </Link>
      ))}
    </div>
  );
}
