"use client";

interface Tab { label: string; value: string; count?: number; }

interface PlanTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (val: string) => void;
}

export default function PlanTabs({ tabs, active, onChange }: PlanTabsProps) {
  return (
    <div style={{ display: "flex", gap: "0", background: "#ffffff", border: "1px solid rgba(20,33,61,0.08)", width: "fit-content" }}>
      {tabs.map((tab) => (
        <button key={tab.value} onClick={() => onChange(tab.value)}
          style={{
            padding: "12px 28px", border: "none", cursor: "pointer",
            background: active === tab.value ? "linear-gradient(135deg, #CC0000, #880000)" : "transparent",
            color: active === tab.value ? "white" : "#475467",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px",
            letterSpacing: "1.5px", textTransform: "uppercase", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: "8px",
          }}
          onMouseEnter={(e) => { if (active !== tab.value) (e.currentTarget as HTMLButtonElement).style.color = "#152238"; }}
          onMouseLeave={(e) => { if (active !== tab.value) (e.currentTarget as HTMLButtonElement).style.color = "#475467"; }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span style={{ background: active === tab.value ? "rgba(255,255,255,0.2)" : "rgba(204,0,0,0.15)", color: active === tab.value ? "white" : "#CC0000", padding: "1px 7px", fontSize: "10px", borderRadius: "2px" }}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
