import { Download, Upload, Clock, Wifi } from "lucide-react";

interface UsageStatsProps {
  download: { used: number; total: number; unit: string };
  upload: { used: number; total: number; unit: string };
  sessionTime: string;
  currentSpeed: string;
}

export default function UsageStats({ download, upload, sessionTime, currentSpeed }: UsageStatsProps) {
  const downloadPct = (download.used / download.total) * 100;

  const stats = [
    { icon: <Download size={16} />, label: "Downloaded", value: `${download.used} ${download.unit}`, sub: `of ${download.total} ${download.unit}`, pct: downloadPct, color: "#CC0000" },
    { icon: <Upload size={16} />, label: "Uploaded", value: `${upload.used} ${upload.unit}`, sub: `of ${upload.total} ${upload.unit}`, pct: (upload.used / upload.total) * 100, color: "#8800CC" },
    { icon: <Clock size={16} />, label: "Session Time", value: sessionTime, sub: "Current session", pct: null, color: "#CC6600" },
    { icon: <Wifi size={16} />, label: "Live Speed", value: currentSpeed, sub: "Current download", pct: null, color: "#00C864" },
  ];

  return (
    <div>
      <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#555", marginBottom: "16px" }}>Usage Stats</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ color: s.color }}>{s.icon}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", color: "#555", letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "24px", color: "#E8E8E8", letterSpacing: "1px", lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#444", marginBottom: s.pct !== null ? "12px" : "0" }}>{s.sub}</div>
            {s.pct !== null && (
              <div>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}>
                  <div style={{ height: "100%", width: `${Math.min(s.pct, 100)}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", color: "#444", marginTop: "4px" }}>{Math.round(s.pct)}% used</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
