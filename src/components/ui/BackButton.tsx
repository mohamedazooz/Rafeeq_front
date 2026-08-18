"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-provider";

interface BackButtonProps {
  readonly fallbackHref?: string;
  readonly labelAr?: string;
  readonly labelEn?: string;
  readonly lang?: "ar" | "en";
}

export function BackButton({
  fallbackHref = "/",
  labelAr = "العودة",
  labelEn = "Back",
  lang: overrideLang,
}: BackButtonProps) {
  const router = useRouter();
  const { lang: globalLang } = useLanguage();

  const currentLang = overrideLang || globalLang;
  const isRtl = currentLang === "ar";
  const label = isRtl ? labelAr : labelEn;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="glass"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 14px",
        borderRadius: "100px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        background: "rgba(255, 255, 255, 0.08)",
        color: "var(--color-warm-white)",
        fontSize: "12px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isRtl ? "none" : "rotate(180deg)" }}>
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
      <span>{label}</span>
    </button>
  );
}
