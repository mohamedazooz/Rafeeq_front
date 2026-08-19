"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly startIcon?: React.ReactNode;
  readonly endIcon?: React.ReactNode;
  readonly fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = true,
      className = "",
      style,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

    return (
      <div style={{ width: fullWidth ? "100%" : "auto", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: error ? "var(--color-error)" : "var(--color-text-secondary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {label}
          </label>
        )}

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {startIcon && (
            <span
              style={{
                position: "absolute",
                right: "0.85rem",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              {startIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              paddingRight: startIcon ? "2.5rem" : "1rem",
              paddingLeft: endIcon ? "2.5rem" : "1rem",
              background: "var(--color-bg-secondary)",
              border: error ? "1.5px solid var(--color-error)" : "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-text-primary)",
              fontSize: "var(--text-base)",
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              opacity: disabled ? 0.6 : 1,
              ...style,
            }}
            className={`rafeeq-input ${className}`}
            {...props}
          />

          {endIcon && (
            <span
              style={{
                position: "absolute",
                left: "0.85rem",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {endIcon}
            </span>
          )}
        </div>

        {error ? (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-error)", fontWeight: 500 }}>
            {error}
          </span>
        ) : helperText ? (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
