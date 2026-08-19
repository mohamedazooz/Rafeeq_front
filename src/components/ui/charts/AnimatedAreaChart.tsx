"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AreaChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly secondaryValue?: number;
  readonly formattedValue?: string;
  readonly formattedSecondaryValue?: string;
}

interface AnimatedAreaChartProps {
  readonly data: readonly AreaChartDataPoint[];
  readonly height?: number;
  readonly primaryColor?: string;
  readonly secondaryColor?: string;
  readonly primaryLabel?: string;
  readonly secondaryLabel?: string;
  readonly valuePrefix?: string;
  readonly valueSuffix?: string;
}

export function AnimatedAreaChart({
  data,
  height = 220,
  primaryColor = "var(--color-gold-heading)",
  secondaryColor = "#10B981",
  primaryLabel = "القيمة الرئيسية",
  secondaryLabel = "القيمة الثانوية",
  valuePrefix = "",
  valueSuffix = " ر.س",
}: AnimatedAreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
        لا توجد بيانات متاحة لعرض الرسم البياني
      </div>
    );
  }

  const paddingX = 40;
  const paddingY = 30;
  const svgWidth = 600;
  const svgHeight = height;

  const allValues = data.flatMap((d) => [d.value, d.secondaryValue ?? 0]);
  const maxValue = Math.max(...allValues, 1) * 1.15;
  const minValue = 0;

  const getX = (index: number) => {
    if (data.length <= 1) return svgWidth / 2;
    return paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
  };

  const getY = (val: number) => {
    const ratio = (val - minValue) / (maxValue - minValue);
    return svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
  };

  // Build SVG path strings
  const primaryPoints = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const primaryLinePath = `M ${primaryPoints.join(" L ")}`;
  const primaryAreaPath = `M ${getX(0)},${svgHeight - paddingY} L ${primaryPoints.join(" L ")} L ${getX(data.length - 1)},${svgHeight - paddingY} Z`;

  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);
  let secondaryLinePath = "";
  let secondaryAreaPath = "";

  if (hasSecondary) {
    const secondaryPoints = data.map((d, i) => `${getX(i)},${getY(d.secondaryValue ?? 0)}`);
    secondaryLinePath = `M ${secondaryPoints.join(" L ")}`;
    secondaryAreaPath = `M ${getX(0)},${svgHeight - paddingY} L ${secondaryPoints.join(" L ")} L ${getX(data.length - 1)},${svgHeight - paddingY} Z`;
  }

  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div style={{ width: "100%", position: "relative", userSelect: "none" }}>
      {/* Legend & Tooltip Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: primaryColor, boxShadow: `0 0 6px ${primaryColor}` }} />
            <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{primaryLabel}</span>
          </div>
          {hasSecondary && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}` }} />
              <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{secondaryLabel}</span>
            </div>
          )}
        </div>

        <AnimatePresence>
          {activePoint && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-gold-royal)",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                display: "flex",
                gap: "12px",
              }}
            >
              <span style={{ color: "var(--color-gold-heading)" }}>{activePoint.label}</span>
              <span style={{ color: primaryColor }}>
                {activePoint.formattedValue ?? `${valuePrefix}${activePoint.value.toLocaleString("en-US")}${valueSuffix}`}
              </span>
              {hasSecondary && activePoint.secondaryValue !== undefined && (
                <span style={{ color: secondaryColor }}>
                  {activePoint.formattedSecondaryValue ?? `${valuePrefix}${activePoint.secondaryValue.toLocaleString("en-US")}${valueSuffix}`}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="primaryAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.38" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.0" />
          </linearGradient>

          {hasSecondary && (
            <linearGradient id="secondaryAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
            </linearGradient>
          )}
        </defs>

        {/* Horizontal Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = paddingY + pct * (svgHeight - paddingY * 2);
          const valLabel = Math.round(maxValue - pct * (maxValue - minValue));
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="var(--color-border)"
                strokeDasharray="4 4"
                strokeOpacity="0.5"
              />
              <text
                x={paddingX - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--color-text-muted)"
                fontWeight="600"
              >
                {valLabel >= 1000 ? `${Math.round(valLabel / 1000)}k` : valLabel}
              </text>
            </g>
          );
        })}

        {/* Secondary Area & Line */}
        {hasSecondary && (
          <>
            <motion.path
              d={secondaryAreaPath}
              fill="url(#secondaryAreaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={secondaryLinePath}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </>
        )}

        {/* Primary Area & Line */}
        <motion.path
          d={primaryAreaPath}
          fill="url(#primaryAreaGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={primaryLinePath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Vertical Crosshair Line */}
        {hoveredIndex !== null && (
          <line
            x1={getX(hoveredIndex)}
            y1={paddingY}
            x2={getX(hoveredIndex)}
            y2={svgHeight - paddingY}
            stroke="var(--color-gold-heading)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Interactive Data Dots & Hover Hitboxes */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.value);
          const isHovered = hoveredIndex === i;

          return (
            <g key={i}>
              {/* Primary Dot */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                fill="var(--color-bg-card)"
                stroke={primaryColor}
                strokeWidth={isHovered ? 3 : 2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
                style={{ cursor: "pointer" }}
              />

              {/* Secondary Dot */}
              {hasSecondary && d.secondaryValue !== undefined && (
                <motion.circle
                  cx={cx}
                  cy={getY(d.secondaryValue)}
                  r={isHovered ? 5 : 3.5}
                  fill="var(--color-bg-card)"
                  stroke={secondaryColor}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  style={{ cursor: "pointer" }}
                />
              )}

              {/* X Axis Label */}
              <text
                x={cx}
                y={svgHeight - paddingY + 18}
                textAnchor="middle"
                fontSize="11"
                fill={isHovered ? "var(--color-gold-heading)" : "var(--color-text-muted)"}
                fontWeight={isHovered ? "800" : "600"}
              >
                {d.label}
              </text>

              {/* Invisible Wide Hitbox for touch/mouse */}
              <rect
                x={cx - (svgWidth - paddingX * 2) / (data.length * 2)}
                y={0}
                width={(svgWidth - paddingX * 2) / data.length}
                height={svgHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
