"use client";

import React from "react";

export type IconButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost" | "gold" | "success";
export type IconButtonSize = "xs" | "sm" | "md" | "lg";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  title: string; // Tooltip / accessibility label
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "ghost",
  size = "sm",
  title,
  icon,
  style,
  disabled,
  ...props
}) => {
  const sizeStyles: Record<IconButtonSize, { width: string; height: string; padding: string; fontSize: string }> = {
    xs: { width: "28px", height: "28px", padding: "4px", fontSize: "14px" },
    sm: { width: "34px", height: "34px", padding: "6px", fontSize: "16px" },
    md: { width: "40px", height: "40px", padding: "8px", fontSize: "18px" },
    lg: { width: "48px", height: "48px", padding: "10px", fontSize: "20px" },
  };

  const variantStyles: Record<IconButtonVariant, React.CSSProperties> = {
    primary: {
      background: "var(--gradient-gold, linear-gradient(135deg, #C8A96E 0%, #DFCA9B 100%))",
      color: "#0f172a",
      border: "1px solid transparent",
    },
    secondary: {
      background: "rgba(16, 185, 129, 0.15)",
      color: "#10B981",
      border: "1px solid rgba(16, 185, 129, 0.3)",
    },
    success: {
      background: "rgba(16, 185, 129, 0.2)",
      color: "#10B981",
      border: "1px solid rgba(16, 185, 129, 0.4)",
    },
    danger: {
      background: "rgba(239, 68, 68, 0.15)",
      color: "#EF4444",
      border: "1px solid rgba(239, 68, 68, 0.3)",
    },
    gold: {
      background: "rgba(200, 169, 110, 0.15)",
      color: "#C8A96E",
      border: "1px solid rgba(200, 169, 110, 0.3)",
    },
    outline: {
      background: "transparent",
      color: "var(--color-text-primary, #ffffff)",
      border: "1px solid var(--color-border, rgba(255,255,255,0.15))",
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "var(--color-text-secondary, rgba(255,255,255,0.7))",
      border: "1px solid transparent",
    },
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: disabled ? 0.5 : 1,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-1.5px) scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
      {...props}
    >
      {icon}
    </button>
  );
};
