"use client";

import React from "react";
import { motion } from "framer-motion";

interface SparklineIndicatorProps {
  readonly data: readonly number[];
  readonly width?: number;
  readonly height?: number;
  readonly color?: string;
  readonly isPositive?: boolean;
}

export function SparklineIndicator({
  data,
  width = 80,
  height = 28,
  color,
  isPositive = true,
}: SparklineIndicatorProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const resolvedColor = color ?? (isPositive ? "#10B981" : "#EF4444");

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 6) + 3;
    const y = height - 4 - ((val - min) / range) * (height - 8);
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(" L ")}`;
  const lastPoint = points[points.length - 1].split(",");
  const lastX = Number(lastPoint[0]);
  const lastY = Number(lastPoint[1]);

  return (
    <div style={{ width, height, position: "relative", display: "inline-flex", alignItems: "center" }}>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`sparkGrad-${resolvedColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={resolvedColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={resolvedColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <motion.path
          d={linePath}
          fill="none"
          stroke={resolvedColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Pulsing End Dot */}
        <motion.circle
          cx={lastX}
          cy={lastY}
          r="3"
          fill={resolvedColor}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
