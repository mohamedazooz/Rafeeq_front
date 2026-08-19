"use client";

import React from "react";

export type BadgeVariant = "emerald" | "gold" | "sand" | "coral" | "neutral" | "success" | "warning" | "error" | "info" | "outline";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly dot?: boolean;
  readonly icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "emerald",
  size = "md",
  dot = false,
  icon,
  className = "",
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "outline":
        return {
          background: "transparent",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
        };
      case "emerald":
        return {
          background: "rgba(0, 108, 53, 0.12)",
          color: "var(--color-saudi-green)",
          border: "1px solid rgba(0, 108, 53, 0.25)",
        };
      case "gold":
        return {
          background: "rgba(200, 169, 110, 0.15)",
          color: "var(--color-gold-heading)",
          border: "1px solid rgba(200, 169, 110, 0.3)",
        };
      case "sand":
        return {
          background: "rgba(245, 230, 200, 0.2)",
          color: "var(--color-gold-dark)",
          border: "1px solid rgba(245, 230, 200, 0.4)",
        };
      case "coral":
        return {
          background: "rgba(224, 122, 95, 0.15)",
          color: "var(--color-accent-coral)",
          border: "1px solid rgba(224, 122, 95, 0.3)",
        };
      case "success":
        return {
          background: "rgba(40, 167, 69, 0.12)",
          color: "#28A745",
          border: "1px solid rgba(40, 167, 69, 0.25)",
        };
      case "warning":
        return {
          background: "rgba(245, 158, 11, 0.15)",
          color: "#D97706",
          border: "1px solid rgba(245, 158, 11, 0.3)",
        };
      case "error":
        return {
          background: "rgba(220, 53, 69, 0.12)",
          color: "#DC3545",
          border: "1px solid rgba(220, 53, 69, 0.25)",
        };
      case "info":
        return {
          background: "rgba(59, 130, 246, 0.12)",
          color: "#3B82F6",
          border: "1px solid rgba(59, 130, 246, 0.25)",
        };
      case "neutral":
      default:
        return {
          background: "var(--color-bg-secondary)",
          color: "var(--color-text-secondary)",
          border: "1px solid var(--color-border)",
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case "sm":
        return { padding: "0.15rem 0.45rem", fontSize: "0.7rem" };
      case "lg":
        return { padding: "0.35rem 0.85rem", fontSize: "0.875rem" };
      case "md":
      default:
        return { padding: "0.25rem 0.65rem", fontSize: "0.775rem" };
    }
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontWeight: 700,
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-heading)",
        whiteSpace: "nowrap",
        ...getSizeStyles(),
        ...getVariantStyles(),
        ...style,
      }}
      className={`rafeeq-badge ${className}`}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: "0.45em",
            height: "0.45em",
            borderRadius: "50%",
            backgroundColor: "currentColor",
          }}
        />
      )}
      {icon}
      <span>{children}</span>
    </span>
  );
};
