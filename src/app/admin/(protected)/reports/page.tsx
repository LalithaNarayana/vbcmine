"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, Wifi, IndianRupee, RefreshCw } from "lucide-react";

type ReportType = "users" | "subscriptions" | "revenue" | "renewals";

interface SeriesPoint {
  date: string;
  value: number;
  secondaryValue?: number;
}

interface ReportData {
  type: ReportType;
  from: string;
  to: string;
  summary: { label: string; value: string | number }[];
  series: SeriesPoint[];
  seriesLabel: string;
  secondaryLabel?: string;
}

const REPORT_TABS: { key: ReportType; label: string; icon: typeof Users }[] = [
  { key: "users", label: "Users", icon: Users },
  { key: "subscriptions", label: "Subscriptions", icon: Wifi },
  { key: "revenue", label: "Revenue", icon: IndianRupee },
  { key: "renewals", label: "Renewals", icon: RefreshCw },
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function formatAxisLabel(raw: string, type: ReportType): string {
  if (type === "subscriptions") return raw; // plan name, not a date
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

/** Simple dependency-free bar chart rendered as inline SVG. */
function BarChart({ data, type, seriesLabel, secondaryLabel }: { data: SeriesPoint[]; type: ReportType; seriesLabel: string; secondaryLabel?: string }) {
  if (data.length === 0) {
    return <p className="admin-page-subtitle">No data for this range.</p>;
  }

  const width = 900;
  const height = 260;
  const padding = { top: 16, right: 16, bottom: 40, left: 16 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(1, ...data.map((d) => Math.max(d.value, d.secondaryValue || 0)));
  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);
  const groupWidth = chartWidth / data.length;
  const barWidth = hasSecondary ? Math.max(4, groupWidth * 0.32) : Math.max(6, groupWidth * 0.55);

  // Show at most ~14 x-axis labels to avoid overlap on long ranges.
  const labelEvery = Math.max(1, Math.ceil(data.length / 14));

  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", minWidth: "600px", height: "auto" }}>
        {data.map((d, i) => {
          const x = padding.left + i * groupWidth;
          const barH = (d.value / maxValue) * chartHeight;
          const secH = hasSecondary ? ((d.secondaryValue || 0) / maxValue) * chartHeight : 0;
          return (
            <g key={d.date}>
              <rect
                x={x + groupWidth / 2 - (hasSecondary ? barWidth + 2 : barWidth / 2)}
                y={padding.top + chartHeight - barH}
                width={barWidth}
                height={barH}
                rx={2}
                fill="#cc0000"
              >
                <title>{`${d.date}: ${seriesLabel} ${d.value}`}</title>
              </rect>
              {hasSecondary && (
                <rect
                  x={x + groupWidth / 2 + 2}
                  y={padding.top + chartHeight - secH}
                  width={barWidth}
                  height={secH}
                  rx={2}
                  fill="#14213D"
                >
                  <title>{`${d.date}: ${secondaryLabel} ${d.secondaryValue}`}</title>
                </rect>
              )}
              {i % labelEvery === 0 && (
                <text
                  x={x + groupWidth / 2}
                  y={height - padding.bottom + 18}
                  fontSize="10"
                  fill="#667085"
                  textAnchor="middle"
                >
                  {formatAxisLabel(d.date, type).slice(0, 10)}
                </text>
              )}
            </g>
          );
        })}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={width - padding.right}
          y2={padding.top + chartHeight}
          stroke="rgba(0,0,0,0.1)"
        />
      </svg>
      <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "12px", color: "#475467" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", background: "#cc0000", display: "inline-block", borderRadius: "2px" }} />
          {seriesLabel}
        </span>
        {hasSecondary && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", background: "#14213D", display: "inline-block", borderRadius: "2px" }} />
            {secondaryLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AdminReportsPage() {
  const [type, setType] = useState<ReportType>("users");
  const [from, setFrom] = useState(daysAgoISO(30));
  const [to, setTo] = useState(todayISO());
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams({ type, from, to });
    const res = await fetch(`/api/admin/reports?${params.toString()}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const tableRows = useMemo(() => data?.series || [], [data]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Reports &amp; Analytics</h1>
        <p className="admin-page-subtitle">
          Pick a report type and date range to see a summary and trend for that period.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {REPORT_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={type === t.key ? "admin-btn-primary" : "admin-btn-secondary"}
            style={{ padding: "6px 16px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "20px" }}>
        <div>
          <label className="admin-label" style={{ display: "block", marginBottom: "4px" }}>From</label>
          <input type="date" className="admin-input" value={from} onChange={(e) => setFrom(e.target.value)} style={{ minWidth: "160px" }} />
        </div>
        <div>
          <label className="admin-label" style={{ display: "block", marginBottom: "4px" }}>To</label>
          <input type="date" className="admin-input" value={to} onChange={(e) => setTo(e.target.value)} style={{ minWidth: "160px" }} />
        </div>
        <button onClick={load} className="admin-btn-primary" style={{ padding: "8px 20px", fontSize: "13px" }}>
          Apply
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {data.summary.map((s) => (
            <div key={s.label} className="admin-card p-5">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="admin-card mb-8">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Trend</h2>
        </div>
        <div className="admin-card-body">
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : (
            <BarChart
              data={data?.series || []}
              type={type}
              seriesLabel={data?.seriesLabel || ""}
              secondaryLabel={data?.secondaryLabel}
            />
          )}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            {type === "subscriptions" ? "By Plan" : "By Day"} {!loading && `(${tableRows.length})`}
          </h2>
        </div>
        <div className="admin-card-body" style={{ overflowX: "auto" }}>
          {loading ? (
            <p className="admin-page-subtitle">Loading…</p>
          ) : tableRows.length === 0 ? (
            <p className="admin-page-subtitle">No data for this range.</p>
          ) : (
            <table className="admin-table w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="px-3 py-2">{type === "subscriptions" ? "Plan" : "Date"}</th>
                  <th className="px-3 py-2">{data?.seriesLabel}</th>
                  {data?.secondaryLabel && <th className="px-3 py-2">{data.secondaryLabel}</th>}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.date} className="border-t border-gray-100">
                    <td className="px-3 py-3">{formatAxisLabel(row.date, type)}</td>
                    <td className="px-3 py-3 font-medium text-gray-900">{row.value}</td>
                    {data?.secondaryLabel && <td className="px-3 py-3">{row.secondaryValue ?? 0}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
