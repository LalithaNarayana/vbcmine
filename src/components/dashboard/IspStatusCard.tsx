import { Wifi, WifiOff, Gauge } from "lucide-react";

interface IspStatusCardProps {
  status: "active" | "inactive" | null;
  dataUsedGb: number | null;
  dataLimitGb: number | null;
  lastSynced: string | null;
  loading: boolean;
}

export default function IspStatusCard({
  status,
  dataUsedGb,
  dataLimitGb,
  lastSynced,
  loading,
}: IspStatusCardProps) {
  const pct =
    dataUsedGb !== null && dataLimitGb ? Math.min((dataUsedGb / dataLimitGb) * 100, 100) : 0;
  const isActive = status === "active";

  return (
    <div style={{ background: "var(--vbc-surface)", border: "1px solid var(--vbc-border)", borderRadius: "12px", boxShadow: "var(--vbc-shadow)", padding: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Gauge size={18} color="#CC0000" />
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "var(--vbc-muted)",
            }}
          >
            Live Connection
          </span>
        </div>

        {loading ? (
          <span style={{ fontSize: "11px", color: "var(--vbc-muted)" }}>Syncing…</span>
        ) : status ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {isActive ? <Wifi size={14} color="#00C864" /> : <WifiOff size={14} color="#CC0000" />}
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: isActive ? "#00C864" : "#CC0000",
              }}
            >
              {isActive ? "Online" : "Offline"}
            </span>
          </div>
        ) : null}
      </div>

      {dataUsedGb !== null && dataLimitGb !== null ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "22px", color: "var(--vbc-text)", letterSpacing: "1px" }}>
              {dataUsedGb} GB
            </span>
            <span style={{ fontSize: "12px", color: "var(--vbc-muted)", alignSelf: "flex-end", marginBottom: "3px" }}>
              of {dataLimitGb} GB
            </span>
          </div>
          <div style={{ height: "5px", background: "var(--vbc-gray)", borderRadius: "999px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, #CC0000, #880000)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", color: "var(--vbc-muted)", marginTop: "6px" }}>
            {Math.round(pct)}% used
            {lastSynced && ` · Synced ${new Date(lastSynced).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "12px", color: "var(--vbc-muted)", margin: 0 }}>
          {loading ? "Fetching live data…" : "Usage data will appear here once available."}
        </p>
      )}
    </div>
  );
}