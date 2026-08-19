"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";

export interface TableColumn<T> {
  readonly key: string;
  readonly header: string;
  readonly render?: (row: T, index: number) => React.ReactNode;
  readonly width?: string;
  readonly align?: "right" | "left" | "center";
}

export interface TableProps<T> {
  readonly columns: readonly TableColumn<T>[];
  readonly data: readonly T[];
  readonly isLoading?: boolean;
  readonly emptyTitle?: string;
  readonly emptyDescription?: string;
  readonly onRowClick?: (row: T) => void;
  readonly rowKey: (row: T) => string | number;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyTitle = "لا توجد بيانات متاحة",
  emptyDescription,
  onRowClick,
  rowKey,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton height="45px" borderRadius="var(--radius-lg)" />
        <Skeleton height="55px" borderRadius="var(--radius-lg)" />
        <Skeleton height="55px" borderRadius="var(--radius-lg)" />
        <Skeleton height="55px" borderRadius="var(--radius-lg)" />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-primary)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "right",
          fontSize: "var(--text-sm)",
        }}
      >
        <thead>
          <tr
            style={{
              background: "var(--color-bg-secondary)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "0.85rem 1.25rem",
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-heading)",
                  textAlign: col.align || "right",
                  width: col.width,
                  whiteSpace: "nowrap",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              style={{
                borderBottom: idx === data.length - 1 ? "none" : "1px solid var(--color-border)",
                cursor: onRowClick ? "pointer" : "default",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
              }}
              onMouseLeave={(e) => {
                if (onRowClick) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "1rem 1.25rem",
                    color: "var(--color-text-primary)",
                    textAlign: col.align || "right",
                    verticalAlign: "middle",
                  }}
                >
                  {col.render ? col.render(row, idx) : ((row as Record<string, unknown>)[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
