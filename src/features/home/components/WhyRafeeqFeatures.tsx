"use client";

import React from "react";
import { useLanguage } from "@/lib/language-provider";

export const WhyRafeeqFeatures: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: "🛡️",
      title: t.home.whyRafeeq.escrowTitle,
      description: t.home.whyRafeeq.escrowDesc,
    },
    {
      icon: "📜",
      title: t.home.whyRafeeq.guidesTitle,
      description: t.home.whyRafeeq.guidesDesc,
    },
    {
      icon: "⏳",
      title: t.home.whyRafeeq.softLockTitle,
      description: t.home.whyRafeeq.softLockDesc,
    },
    {
      icon: "💬",
      title: t.home.whyRafeeq.supportTitle,
      description: t.home.whyRafeeq.supportDesc,
    },
  ];

  return (
    <section style={{ paddingBlock: "5rem 4rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "650px", marginInline: "auto", marginBottom: "3.5rem" }}>
          <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
            {t.home.whyRafeeq.badge}
          </span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
            {t.home.whyRafeeq.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-2xl)",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--radius-xl)",
                  background: "rgba(0, 108, 53, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {item.icon}
              </div>

              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: 0 }}>
                {item.title}
              </h3>

              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
