"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-provider";

export function Footer() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--gradient-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              fontWeight: 900,
              fontSize: "14px",
            }}
          >
            ر
          </div>
          <span style={{ fontWeight: 900, fontSize: "18px", color: "var(--color-gold-heading)" }}>
            {isAr ? "رفيق" : "Rafeeq"}
          </span>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginInlineStart: "8px" }}>
            {isAr ? "© 2026 رفيق. جميع الحقوق محفوظة — منصة السياحة السعودية المرخصة 🇸🇦" : "© 2026 Rafeeq. Licensed Saudi Tourism Platform 🇸🇦"}
          </span>
        </div>

        {/* Compact Essential Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <Link href="/programs" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {isAr ? "البرامج" : "Programs"}
          </Link>
          <Link href="/guides" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {isAr ? "المرشدون" : "Guides"}
          </Link>
          <Link href="/become-guide" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {isAr ? "انضم كمرشد" : "Become a Guide"}
          </Link>
          <Link href="/about" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {isAr ? "من نحن" : "About"}
          </Link>
          <Link href="/contact" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none" }}>
            {isAr ? "تواصل" : "Contact"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
