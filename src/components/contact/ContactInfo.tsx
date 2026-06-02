import { Phone, Mail, MapPin, Clock } from "lucide-react";

const info = [
  { icon: <Phone size={20} />, label: "Phone", lines: ["+91 891 000 0000", "1800-XXX-XXXX (Toll Free)"] },
  { icon: <Mail size={20} />, label: "Email", lines: ["support@vbconfiber.com", "sales@vbconfiber.com"] },
  { icon: <MapPin size={20} />, label: "Head Office", lines: ["VBC House, MVP Colony", "Visakhapatnam – 530017, AP"] },
  { icon: <Clock size={20} />, label: "Support Hours", lines: ["Technical: 24/7", "Sales: Mon–Sat, 9AM–7PM"] },
];

export default function ContactInfo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {info.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "20px", padding: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(204,0,0,0.1)", alignItems: "flex-start" }}>
          <div style={{ width: "44px", height: "44px", background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#CC0000", flexShrink: 0, clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}>
            {item.icon}
          </div>
          <div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#CC0000", marginBottom: "8px" }}>{item.label}</div>
            {item.lines.map((line, j) => (
              <div key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: j === 0 ? "#E8E8E8" : "#666", lineHeight: "1.6" }}>{line}</div>
            ))}
          </div>
        </div>
      ))}

      {/* Map placeholder */}
      <div style={{ height: "200px", background: "rgba(204,0,0,0.05)", border: "1px solid rgba(204,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
        <MapPin size={32} color="rgba(204,0,0,0.3)" />
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#444", letterSpacing: "1px", textTransform: "uppercase" }}>Map — MVP Colony, Vizag</span>
      </div>
    </div>
  );
}
