"use client";

import { useRouter } from "next/navigation";

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
  lang = "ar",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  const isRtl = lang === "ar";
  const label = isRtl ? labelAr : labelEn;
  const arrow = isRtl ? "→" : "←";

  return (
    <button
      type="button"
      onClick={handleBack}
      className="glass"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--glass-border)",
        background: "rgba(255, 255, 255, 0.08)",
        color: "var(--color-warm-white)",
        fontSize: "var(--text-xs)",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all var(--duration-fast)",
      }}
    >
      <span style={{ fontSize: "var(--text-sm)" }}>{arrow}</span>
      <span>{label}</span>
    </button>
  );
}
