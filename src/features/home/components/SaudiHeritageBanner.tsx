"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/design-system/primitives";
import { useLanguage } from "@/lib/language-provider";

export const SaudiHeritageBanner: React.FC = () => {
  const { isAr, t } = useLanguage();

  return (
    <section
      style={{
        marginBlock: "3rem",
        background: "linear-gradient(135deg, var(--color-deep-emerald) 0%, #004D25 100%)",
        borderTop: "1px solid rgba(200, 169, 110, 0.3)",
        borderBottom: "1px solid rgba(200, 169, 110, 0.3)",
        paddingBlock: "4.5rem",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Ornament Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <span
              style={{
                color: "var(--color-gold-royal)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>🇸🇦</span>
              <span>{t.home.heritage.badge}</span>
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                fontFamily: "var(--font-heading)",
                marginTop: "0.5rem",
                marginBottom: "1rem",
                lineHeight: 1.3,
              }}
            >
              {isAr ? (
                <>
                  هل أنت مرشد سياحي محلي؟
                  <br />
                  شارك العالم أصالة كرم الضيافة السعودية
                </>
              ) : (
                <>
                  Are You a Local Tour Guide?
                  <br />
                  Share Authentic Saudi Hospitality with the World
                </>
              )}
            </h2>
            <p style={{ fontSize: "var(--text-base)", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.7 }}>
              {isAr
                ? "انضم إلى منصة رفيق المعتمدة، واستقبل المسافرين من مختلف دول العالم، ونظّم برامجك السياحية واستلم عوائدك المالية بكل أمان وموثوقية."
                : "Join Rafeeq's verified platform, welcome domestic and international travelers from around the globe, and receive guaranteed payouts."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/become-guide">
              <Button variant="gold" size="lg">
                {isAr ? "تقديم طلب انضمام كمرشد" : "Apply as a Tour Guide"}
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="glass" size="lg">
                {isAr ? "تعرف على قصة رفيق" : "Discover Rafeeq Story"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
