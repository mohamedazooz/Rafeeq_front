"use client";

import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly borderRadius?: string;
  readonly variant?: "text" | "circular" | "rectangular" | "card";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  variant = "rectangular",
  style,
  className = "",
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "text":
        return {
          height: height || "1rem",
          width: width || "100%",
          borderRadius: borderRadius || "var(--radius-sm)",
        };
      case "circular":
        return {
          height: height || "40px",
          width: width || "40px",
          borderRadius: "50%",
        };
      case "card":
        return {
          height: height || "280px",
          width: width || "100%",
          borderRadius: borderRadius || "var(--radius-2xl)",
        };
      case "rectangular":
      default:
        return {
          height: height || "100%",
          width: width || "100%",
          borderRadius: borderRadius || "var(--radius-md)",
        };
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.04) 25%, rgba(255, 255, 255, 0.09) 50%, rgba(255, 255, 255, 0.04) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.6s infinite linear",
        ...getVariantStyles(),
        ...style,
      }}
      className={`rafeeq-skeleton ${className}`}
      {...props}
    />
  );
};
