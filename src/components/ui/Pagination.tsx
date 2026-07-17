"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  /** Optional label for the items being paginated, e.g. "transactions" */
  itemLabel?: string;
}

/**
 * Builds a compact page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 20
 */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "...")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "items",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function goTo(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        padding: "16px 4px 4px",
        marginTop: "8px",
        borderTop: "1px solid var(--vbc-border, #D9E2EC)",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "var(--vbc-muted, #667085)",
          fontFamily: "'Rajdhani', sans-serif",
          letterSpacing: "0.3px",
        }}
      >
        Showing {startItem}–{endItem} of {totalItems} {itemLabel}
      </span>

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              border: "1px solid var(--vbc-border, #D9E2EC)",
              background: "transparent",
              color: currentPage === 1 ? "var(--vbc-muted, #98A2B3)" : "var(--vbc-text, #152238)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={14} />
          </button>

          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <span
                key={`ellipsis-${i}`}
                style={{ padding: "0 4px", fontSize: "12px", color: "var(--vbc-muted, #667085)" }}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => goTo(p)}
                aria-current={p === currentPage ? "page" : undefined}
                style={{
                  minWidth: "30px",
                  height: "30px",
                  padding: "0 6px",
                  borderRadius: "6px",
                  border: p === currentPage ? "1px solid var(--vbc-red, #CC0000)" : "1px solid transparent",
                  background: p === currentPage ? "var(--vbc-red, #CC0000)" : "transparent",
                  color: p === currentPage ? "#fff" : "var(--vbc-text, #152238)",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              border: "1px solid var(--vbc-border, #D9E2EC)",
              background: "transparent",
              color: currentPage === totalPages ? "var(--vbc-muted, #98A2B3)" : "var(--vbc-text, #152238)",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
