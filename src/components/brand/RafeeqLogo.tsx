"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./RafeeqLogo.module.css";
import { useLanguage } from "@/lib/language-provider";

export type LogoVariant = "emblem" | "horizontal" | "stacked" | "badge" | "minimal";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;

export interface RafeeqLogoProps {
  /** Logo display variant */
  variant?: LogoVariant;
  /** Size preset or pixel number */
  size?: LogoSize;
  /** Whether to wrap the logo in a Next.js Link to home */
  href?: string | null;
  /** Show subtitle (e.g., 'السياحة السعودية' or 'Saudi Tourism') */
  showSubtitle?: boolean;
  /** Custom subtitle text override */
  customSubtitle?: string;
  /** Optional custom class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Priority loading for above-the-fold headers / favicons */
  priority?: boolean;
  /** Interactive animated glow on hover (Gemini style) */
  animated?: boolean;
}

const SIZE_MAP: Record<string, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 80,
};

export const RafeeqLogo: React.FC<RafeeqLogoProps> = ({
  variant = "horizontal",
  size = "md",
  href = "/",
  showSubtitle = false,
  customSubtitle,
  className = "",
  style,
  priority = true,
  animated = true,
}) => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 40;

  // Typography font sizes derived proportionally from emblem size
  const titleFontSize = Math.max(15, Math.round(pixelSize * 0.52));
  const subFontSize = Math.max(9, Math.round(pixelSize * 0.26));

  const content = (
    <div
      className={[
        styles.rafeeqLogo,
        styles[`rafeeqLogo--${variant}`],
        animated ? styles["rafeeqLogo--animated"] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--logo-size": `${pixelSize}px`,
          ...style,
        } as React.CSSProperties
      }
    >
      {/* Emblem Icon */}
      <div className={styles.rafeeqLogo__emblemWrapper}>
        <div className={styles.rafeeqLogo__glowRing} />
        <Image
          src="/logo-emblem.png"
          alt="Rafeeq Emblem - شعار رفيق"
          width={pixelSize}
          height={pixelSize}
          priority={priority}
          className={styles.rafeeqLogo__emblem}
          style={{
            width: `${pixelSize}px`,
            height: `${pixelSize}px`,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Brand Typography (Hidden in emblem-only variant) */}
      {variant !== "emblem" && (
        <div className={styles.rafeeqLogo__textGroup}>
          <div className={styles.rafeeqLogo__mainRow}>
            <span
              className={styles.rafeeqLogo__titleAr}
              style={{ fontSize: `${titleFontSize}px` }}
            >
              {isAr ? "رفيق" : "Rafeeq"}
            </span>
            <span className={styles.rafeeqLogo__sparkle}>✦</span>
          </div>

          {(showSubtitle || customSubtitle) && (
            <span
              className={styles.rafeeqLogo__subtitle}
              style={{ fontSize: `${subFontSize}px` }}
            >
              {customSubtitle ?? (isAr ? "منصة السياحة السعودية" : "Saudi Tourism Platform")}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles.rafeeqLogo__link}
        aria-label="رفيق — الصفحة الرئيسية"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default RafeeqLogo;
