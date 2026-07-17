"use client";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";

interface PlanRef {
  name: string;
  speed: number;
  speedUnit: string;
}

interface HistoryEntry {
  _id: string;
  oldPlan: PlanRef | null;
  newPlan: PlanRef;
  reason: "new-connection" | "renewal" | "upgrade" | "downgrade" | "admin-change";
  note: string;
  createdAt: string;
}

interface SubscriptionHistoryTimelineProps {
  history: HistoryEntry[];
}

const REASON_LABEL: Record<HistoryEntry["reason"], string> = {
  "new-connection": "New Connection",
  renewal: "Renewed",
  upgrade: "Upgraded",
  downgrade: "Downgraded",
  "admin-change": "Plan Changed",
};

const REASON_COLOR: Record<HistoryEntry["reason"], string> = {
  "new-connection": "#175cd3",
  renewal: "#067647",
  upgrade: "#067647",
  downgrade: "#b54708",
  "admin-change": "#475467",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function planLabel(plan: PlanRef | null): string {
  if (!plan) return "—";
  return `${plan.name} (${plan.speed} ${plan.speedUnit})`;
}

export default function SubscriptionHistoryTimeline({ history }: SubscriptionHistoryTimelineProps) {
  const { pageItems, currentPage, setCurrentPage, totalItems, pageSize } = usePagination(history, 5);

  return (
    <div>
      <h3
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--vbc-muted)",
          marginBottom: "16px",
        }}
      >
        Subscription History
      </h3>

      {history.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--vbc-muted)",
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          No plan changes recorded yet.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {pageItems.map((entry, i) => (
              <div
                key={entry._id}
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingBottom: i === pageItems.length - 1 ? 0 : "18px",
                  marginBottom: i === pageItems.length - 1 ? 0 : "18px",
                  borderBottom: i === pageItems.length - 1 ? "none" : "1px solid var(--vbc-border)",
                }}
              >
                <div style={{ flexShrink: 0, paddingTop: "3px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                      background: REASON_COLOR[entry.reason],
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: "13px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        color: REASON_COLOR[entry.reason],
                      }}
                    >
                      {REASON_LABEL[entry.reason]}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--vbc-muted)" }}>{formatDate(entry.createdAt)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--vbc-text)", marginBottom: "2px" }}>
                    {entry.oldPlan ? (
                      <>
                        {planLabel(entry.oldPlan)} <span style={{ color: "var(--vbc-muted)" }}>→</span> {planLabel(entry.newPlan)}
                      </>
                    ) : (
                      planLabel(entry.newPlan)
                    )}
                  </p>
                  {entry.note && <p style={{ fontSize: "12px", color: "var(--vbc-muted)" }}>{entry.note}</p>}
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            itemLabel="entries"
          />
        </>
      )}
    </div>
  );
}
