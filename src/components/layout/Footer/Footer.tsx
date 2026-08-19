"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-provider";
import { RafeeqLogo } from "@/components/brand";

export function Footer() {
  const { isAr, t } = useLanguage();

  return (
    <footer
      style={{
        background: "var(--color-bg-primary)",
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "24px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Brand Logo & Copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <RafeeqLogo variant="horizontal" size={32} animated={false} />
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
            {t.footer.copyright}
          </span>
        </div>

        {/* Compact Essential Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <Link href="/programs" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {t.nav.programs}
          </Link>
          <Link href="/guides" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {t.nav.guides}
          </Link>
          <Link href="/become-guide" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {t.nav.becomeGuide}
          </Link>
          <Link href="/about" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {t.nav.about}
          </Link>
          <Link href="/contact" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
