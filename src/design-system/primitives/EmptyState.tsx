"use client";

import React from "react";
import { Button } from "./Button";
import { CompassIcon } from "@/components/icons";

export interface EmptyStateProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3.5rem 1.5rem",
        background: "var(--color-bg-secondary)",
        borderRadius: "var(--radius-2xl)",
        border: "1px dashed var(--color-border)",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(0, 108, 53, 0.08)",
          color: "var(--color-saudi-green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {icon || <CompassIcon size={28} color="var(--color-gold-heading)" />}
      </div>

      <h4
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: "0.4rem",
          fontFamily: "var(--font-heading)",
        }}
      >
        {title}
      </h4>

      {description && (
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            maxWidth: "420px",
            marginBottom: actionLabel ? "1.25rem" : 0,
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
