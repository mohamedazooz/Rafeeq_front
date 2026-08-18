"use client";

import Link from "next/link";
import Image from "next/image";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";

const GUIDE_LINKS = [
  { href: "/guide/dashboard", labelAr: "📈 لوحة الأداء", labelEn: "📈 Overview" },
  { href: "/guide/programs", labelAr: "📋 برامجي السياحية", labelEn: "📋 Tour Programs" },
  { href: "/guide/programs/create", labelAr: "➕ إنشاء برنامج جديد", labelEn: "➕ Create Tour" },
  { href: "/guide/bookings", labelAr: "🎫 حجوزات المسافرين", labelEn: "🎫 Bookings" },
  { href: "/guide/calendar", labelAr: "🗓️ تقويم التوافر", labelEn: "🗓️ Availability" },
  { href: "/guide/wallet", labelAr: "💰 المحفظة والأرباح", labelEn: "💰 Wallet & Earnings" },
  { href: "/guide/profile", labelAr: "👤 الملف الاحترافي", labelEn: "👤 Guide Profile" },
] as const;

export default function GuideLayout({ children }: { readonly children: React.ReactNode }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar roleTitleAr="لوحة المرشد المحلي المعتمد" roleTitleEn="Certified Guide Dashboard" profileHref="/guide/profile" />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "250px",
            background: "var(--color-bg-card)",
            borderInlineEnd: "1px solid var(--color-border)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Image src="/logo-emblem.png" alt="Rafeeq Logo" width={28} height={28} style={{ objectFit: "contain" }} />
            <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)" }}>
              {isAr ? "لوحة المرشد" : "Guide Portal"}
            </span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(16,185,129,0.15)", color: "#10B981", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, marginBottom: "20px", width: "fit-content" }}>
            ✓ {isAr ? "مرشد سياحي معتمد" : "MOT Certified Guide"}
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {GUIDE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }}>
            <Link href="/" style={{ color: "var(--color-gold-heading)", fontSize: "12px", textDecoration: "none", fontWeight: 700 }}>
              {isAr ? "← العودة للموقع العام" : "← Back to Website"}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flexGrow: 1, padding: "28px", minWidth: 0, overflowX: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
