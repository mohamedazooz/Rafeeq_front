"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DonutSegment {
  readonly label: string;
  readonly value: number;
  readonly color: string;
  readonly subText?: string;
}

interface AnimatedDonutChartProps {
  readonly data: readonly DonutSegment[];
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly centerLabel?: string;
  readonly centerValue?: string;
  readonly showLegend?: boolean;
}

export function AnimatedDonutChart({
  data,
  size = 180,
  strokeWidth = 24,
  centerLabel = "الإجمالي",
  centerValue,
  showLegend = true,
}: AnimatedDonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div style={{ height: size, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
        لا توجد بيانات متاحة
      </div>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let accumulatedPercent = 0;

  const activeSegment = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", justifyContent: "center", userSelect: "none" }}>
      {/* Donut SVG Ring */}
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)", overflow: "visible" }}>
          {/* Base Gray Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--color-bg-secondary)"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {data.map((seg, idx) => {
            const percent = seg.value / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;

            const isHovered = hoveredIndex === idx;

            return (
              <motion.circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                style={{
                  cursor: "pointer",
                  transition: "stroke-width 0.2s ease, filter 0.2s ease",
                  filter: isHovered ? "drop-shadow(0 0 6px rgba(200, 169, 110, 0.4))" : "none",
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* Center Label & Value */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            textAlign: "center",
            padding: "8px",
          }}
        >
          <AnimatePresence mode="wait">
            {activeSegment ? (
              <motion.div
                key={activeSegment.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <span style={{ fontSize: "10px", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  {activeSegment.label}
                </span>
                <span style={{ fontSize: "16px", fontWeight: 900, color: activeSegment.color, marginTop: "2px" }}>
                  {activeSegment.value} ({Math.round((activeSegment.value / total) * 100)}%)
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 600 }}>
                  {centerLabel}
                </span>
                <span style={{ fontSize: "17px", fontWeight: 900, color: "var(--color-gold-heading)", marginTop: "2px" }}>
                  {centerValue ?? total.toLocaleString("en-US")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Column */}
      {showLegend && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1, minWidth: "160px" }}>
          {data.map((seg, idx) => {
            const isHovered = hoveredIndex === idx;
            const pct = Math.round((seg.value / total) * 100);

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: isHovered ? "var(--color-bg-secondary)" : "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: seg.color,
                      boxShadow: isHovered ? `0 0 8px ${seg.color}` : "none",
                    }}
                  />
                  <span style={{ fontSize: "12px", fontWeight: isHovered ? 800 : 600, color: isHovered ? "var(--color-gold-heading)" : "var(--color-text-primary)" }}>
                    {seg.label}
                  </span>
                </div>

                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                  {seg.value} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
