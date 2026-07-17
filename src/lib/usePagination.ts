"use client";
import { useEffect, useMemo, useState } from "react";

/**
 * Client-side pagination helper: slices `items` into pages of `pageSize`
 * and keeps `currentPage` in range as the underlying list changes (e.g.
 * after a filter, search, or delete shrinks the list).
 */
export function usePagination<T>(items: T[], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pageItems,
    totalItems: items.length,
    pageSize,
  };
}
