"use client";

import React from "react";
import { motion } from "framer-motion";
import { springs } from "../motion/variants";

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly count?: number;
  readonly icon?: React.ReactNode;
}

export interface TabsProps {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (id: string) => void;
  readonly fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  fullWidth = false,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "var(--color-bg-secondary)",
        padding: "0.35rem",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        width: fullWidth ? "100%" : "auto",
        overflowX: "auto",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "var(--text-sm)",
              fontWeight: isActive ? 700 : 500,
              fontFamily: "var(--font-heading)",
              color: isActive ? "#ffffff" : "var(--color-text-secondary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "var(--radius-lg)",
              flex: fullWidth ? 1 : "initial",
              whiteSpace: "nowrap",
              transition: "color 0.2s",
              zIndex: 1,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, var(--color-saudi-green) 0%, var(--color-deep-emerald) 100%)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "0 2px 10px rgba(0, 108, 53, 0.3)",
                  zIndex: -1,
                }}
                transition={springs.snappy}
              />
            )}
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  padding: "0.1rem 0.45rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-xs)",
                  background: isActive ? "rgba(255, 255, 255, 0.25)" : "var(--color-bg-primary)",
                  color: isActive ? "#ffffff" : "var(--color-text-muted)",
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
