"use client";

import React, { useState } from "react";
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { useLanguage } from "@/lib/language-provider";

export interface DataTableColumn<T> {
  readonly key: string;
  readonly headerAr: string;
  readonly headerEn: string;
  readonly width?: string;
  readonly align?: "left" | "center" | "right";
  readonly render: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  readonly data: readonly T[];
  readonly columns: readonly DataTableColumn<T>[];
  readonly searchPlaceholder?: string;
  readonly searchFilter?: (row: T, query: string) => boolean;
  readonly filtersSlot?: React.ReactNode;
  readonly actionsSlot?: React.ReactNode;
  readonly pageSize?: number;
  readonly emptyMessageAr?: string;
  readonly emptyMessageEn?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchPlaceholder = "بحث في السجلات...",
  searchFilter,
  filtersSlot,
  actionsSlot,
  pageSize = 10,
  emptyMessageAr = "لا توجد سجلات مطابقة",
  emptyMessageEn = "No matching records found",
}: DataTableProps<T>) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim() || !searchFilter) return data;
    return data.filter((row) => searchFilter(row, searchQuery.trim().toLowerCase()));
  }, [data, searchQuery, searchFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-2xl)",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Bar with Search & Filters */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          background: "var(--color-bg-secondary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexGrow: 1, maxWidth: "450px" }}>
          {searchFilter && (
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  padding: "9px 36px 9px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  insetInlineEnd: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)",
                  pointerEvents: "none",
                }}
              >
                <SearchIcon size={16} />
              </div>
            </div>
          )}

          {filtersSlot}
        </div>

        {actionsSlot && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>{actionsSlot}</div>}
      </div>

      {/* Table Body */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: isAr ? "right" : "left", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "12px 16px",
                    fontWeight: 800,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    width: col.width,
                    textAlign: col.align ?? (isAr ? "right" : "left"),
                  }}
                >
                  {isAr ? col.headerAr : col.headerEn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: "40px 16px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  {isAr ? emptyMessageAr : emptyMessageEn}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id ? String(row.id) : idx}
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-secondary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "12px 16px",
                        textAlign: col.align ?? (isAr ? "right" : "left"),
                        verticalAlign: "middle",
                      }}
                    >
                      {col.render(row, idx)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          background: "var(--color-bg-secondary)",
        }}
      >
        <div>
          {isAr ? `إجمالي السجلات: ${filteredData.length}` : `Total records: ${filteredData.length}`}
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.4 : 1,
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isAr ? <ChevronRightIcon size={14} /> : <ChevronLeftIcon size={14} />}
            </button>

            <span style={{ fontWeight: 800, color: "var(--color-gold-heading)", paddingInline: "4px" }}>
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.4 : 1,
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isAr ? <ChevronLeftIcon size={14} /> : <ChevronRightIcon size={14} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
