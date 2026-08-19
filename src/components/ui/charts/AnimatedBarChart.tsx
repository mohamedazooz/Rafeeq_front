"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface BarChartItem {
  readonly label: string;
  readonly value: number;
  readonly secondaryValue?: number;
  readonly color?: string;
  readonly subLabel?: string;
}

interface AnimatedBarChartProps {
  readonly data: readonly BarChartItem[];
  readonly height?: number;
  readonly primaryColor?: string;
  readonly secondaryColor?: string;
  readonly primaryLabel?: string;
  readonly secondaryLabel?: string;
  readonly valueSuffix?: string;
}

export function AnimatedBarChart({
  data,
  height = 200,
  primaryColor = "var(--color-saudi-green)",
  secondaryColor = "var(--color-gold-heading)",
  primaryLabel,
  secondaryLabel,
  valueSuffix = "",
}: AnimatedBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
        لا توجد بيانات متاحة لعرض الأعمدة البيانية
      </div>
    );
  }

  const allValues = data.flatMap((d) => [d.value, d.secondaryValue ?? 0]);
  const maxValue = Math.max(...allValues, 1) * 1.15;
  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);

  return (
    <div style={{ width: "100%", userSelect: "none" }}>
      {/* Legend & Active Tooltip */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", minHeight: "26px" }}>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          {primaryLabel && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: primaryColor }} />
              <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{primaryLabel}</span>
            </div>
          )}
          {hasSecondary && secondaryLabel && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: secondaryColor }} />
              <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{secondaryLabel}</span>
            </div>
          )}
        </div>

        <AnimatePresence>
          {hoveredIndex !== null && data[hoveredIndex] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--color-gold-heading)",
                background: "var(--color-bg-card)",
                padding: "2px 8px",
                borderRadius: "6px",
                border: "1px solid var(--color-border)",
              }}
            >
              {data[hoveredIndex].label}: {data[hoveredIndex].value.toLocaleString("en-US")} {valueSuffix}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bars Container */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "12px",
          height,
          paddingBottom: "24px",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
        }}
      >
        {data.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;
          const secHeightPercent = item.secondaryValue ? (item.secondaryValue / maxValue) * 100 : 0;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Value Float on Hover */}
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: item.color ?? primaryColor,
                    position: "absolute",
                    top: "-18px",
                  }}
                >
                  {item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value}
                </motion.span>
              )}

              {/* Bar Group */}
              <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                {/* Primary Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: hasSecondary ? "45%" : "100%",
                    maxWidth: "28px",
                    background: isHovered
                      ? "linear-gradient(180deg, var(--color-gold-heading) 0%, var(--color-gold-dark) 100%)"
                      : item.color ?? `linear-gradient(180deg, ${primaryColor} 0%, var(--color-deep-emerald) 100%)`,
                    borderRadius: "4px 4px 0 0",
                    boxShadow: isHovered ? "0 0 10px rgba(200, 169, 110, 0.4)" : "none",
                    transition: "background 0.2s ease, box-shadow 0.2s ease",
                  }}
                />

                {/* Secondary Bar if exists */}
                {hasSecondary && item.secondaryValue !== undefined && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${secHeightPercent}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 + 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: "45%",
                      maxWidth: "28px",
                      background: secondaryColor,
                      opacity: isHovered ? 1 : 0.75,
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                )}
              </div>

              {/* Label below bar */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-22px",
                  fontSize: "11px",
                  fontWeight: isHovered ? 800 : 600,
                  color: isHovered ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
