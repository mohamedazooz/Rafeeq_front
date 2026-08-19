"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import { useDestinations } from "../hooks/useDestinations";

export function DestinationsListView() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { destinations } = useDestinations();

  return (
    <>
      {/* Header Banner */}
      <section
        style={{
          background: "var(--color-bg-primary)",
          paddingBlock: "100px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              color: "var(--color-gold-heading)",
              fontSize: "var(--text-sm)",
              fontWeight: 800,
              marginBottom: "var(--space-3)",
            }}
          >
            🗺️ {isAr ? "وجهات المملكة العربية السعودية" : "Saudi Arabia Destinations"}
          </div>

          <h1
            style={{
              fontSize: "var(--text-5xl)",
              fontWeight: 900,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            {isAr ? "استكشف سحر السعودية" : "Explore Saudi Arabia"}
          </h1>

          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            {isAr
              ? "اختر وجهتك القادمة واستكشف برامج سياحية يقودها مرشدون محليون معتمدون في كل منطقة."
              : "Choose your next destination and explore tours led by certified local guides."}
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section style={{ paddingBlock: "var(--space-16)", background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    borderRadius: "var(--radius-2xl)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div style={{ position: "relative", height: "240px", width: "100%" }}>
                    <Image
                      src={dest.image}
                      alt={isAr ? dest.nameAr : dest.nameEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 40%, rgba(13,27,42,0.85) 100%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "var(--space-4)",
                        right: isAr ? "var(--space-4)" : "auto",
                        left: isAr ? "auto" : "var(--space-4)",
                        padding: "4px 12px",
                        background: "var(--gradient-gold)",
                        color: "#0f172a",
                        borderRadius: "var(--radius-full)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 800,
                      }}
                    >
                      {isAr ? dest.badgeAr : dest.badgeEn}
                    </span>
                  </div>

                  <div style={{ padding: "var(--space-6)", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-heading)", fontWeight: 700 }}>
                      {isAr ? dest.regionAr : dest.regionEn}
                    </span>
                    <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBlock: "var(--space-2)", color: "var(--color-text-primary)" }}>
                      {isAr ? dest.nameAr : dest.nameEn}
                    </h3>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", flexGrow: 1 }}>
                      {isAr ? dest.descriptionAr : dest.descriptionEn}
                    </p>
                    <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                        {dest.programsCount} {isAr ? "برنامج سياحي متاح" : "tours available"}
                      </span>
                      <span style={{ color: "var(--color-gold-heading)", fontWeight: 800, fontSize: "var(--text-sm)" }}>
                        {isAr ? "استكشف الرحلات ←" : "Explore Tours →"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
