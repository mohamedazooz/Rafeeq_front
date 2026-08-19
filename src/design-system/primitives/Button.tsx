"use client";

import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "gold" | "outline" | "ghost" | "danger" | "glass";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly startIcon?: React.ReactNode;
  readonly endIcon?: React.ReactNode;
  readonly fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case "primary":
          return {
            background: "linear-gradient(135deg, var(--color-saudi-green) 0%, var(--color-deep-emerald) 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 14px rgba(0, 108, 53, 0.35)",
          };
        case "gold":
          return {
            background: "linear-gradient(135deg, var(--color-gold-royal) 0%, var(--color-gold-dark) 100%)",
            color: "#0D1B2A",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 14px rgba(200, 169, 110, 0.35)",
            fontWeight: 700,
          };
        case "secondary":
          return {
            background: "var(--color-midnight-light)",
            color: "var(--color-warm-white)",
            border: "1px solid var(--color-border)",
          };
        case "outline":
          return {
            background: "transparent",
            color: "var(--color-text-primary)",
            border: "1.5px solid var(--color-border-strong)",
          };
        case "ghost":
          return {
            background: "transparent",
            color: "var(--color-text-primary)",
            border: "none",
          };
        case "danger":
          return {
            background: "linear-gradient(135deg, #DC3545 0%, #B02A37 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
          };
        case "glass":
          return {
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "var(--color-text-primary)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          };
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case "xs":
          return { padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "var(--radius-sm)" };
        case "sm":
          return { padding: "0.4rem 0.75rem", fontSize: "0.875rem", borderRadius: "var(--radius-md)" };
        case "md":
          return { padding: "0.6rem 1.25rem", fontSize: "0.95rem", borderRadius: "var(--radius-lg)" };
        case "lg":
          return { padding: "0.8rem 1.75rem", fontSize: "1.05rem", borderRadius: "var(--radius-xl)" };
        case "xl":
          return { padding: "1rem 2.25rem", fontSize: "1.15rem", borderRadius: "var(--radius-2xl)" };
      }
    };

    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontWeight: 600,
      fontFamily: "var(--font-heading)",
      cursor: disabled || isLoading ? "not-allowed" : "pointer",
      opacity: disabled || isLoading ? 0.6 : 1,
      width: fullWidth ? "100%" : "auto",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      textDecoration: "none",
      userSelect: "none",
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={baseStyles}
        className={`rafeeq-btn ${className}`}
        {...props}
      >
        {isLoading ? (
          <span
            style={{
              width: "1.1em",
              height: "1.1em",
              border: "2px solid currentColor",
              borderRightColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }}
          />
        ) : (
          startIcon
        )}
        <span>{children}</span>
        {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
