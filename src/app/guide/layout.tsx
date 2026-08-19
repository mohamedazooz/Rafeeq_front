"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";
import { RafeeqLogo } from "@/components/brand";
import {
  LayoutDashboardIcon,
  CompassIcon,
  PlusIcon,
  CalendarIcon,
  WalletIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@/components/icons";

const GUIDE_LINKS = [
  { href: "/guide/dashboard", labelAr: "لوحة الأداء والمؤشرات", labelEn: "Performance Overview", icon: LayoutDashboardIcon },
  { href: "/guide/programs", labelAr: "البرامج السياحية المسجلة", labelEn: "My Tour Programs", icon: CompassIcon },
  { href: "/guide/programs/create", labelAr: "إنشاء برنامج سياحي جديد", labelEn: "Create New Tour", icon: PlusIcon },
  { href: "/guide/bookings", labelAr: "حجوزات المسافرين والعمليات", labelEn: "Client Bookings", icon: CalendarIcon },
  { href: "/guide/calendar", labelAr: "تقويم التوافر والمواعيد", labelEn: "Availability Calendar", icon: CalendarIcon },
  { href: "/guide/wallet", labelAr: "المحفظة والأرباح والمستحقات", labelEn: "Wallet & Earnings", icon: WalletIcon },
  { href: "/guide/profile", labelAr: "الملف المهني والوثائق", labelEn: "Professional Profile", icon: UserIcon },
];

export default function GuideLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar
        roleTitleAr="لوحة المرشد المحلي المعتمد"
        roleTitleEn="Certified Guide Portal"
        profileHref="/guide/profile"
      />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "270px",
            background: "var(--color-bg-card)",
            borderInlineEnd: "1px solid var(--color-border)",
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Brand Header */}
          <div style={{ marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>
            <RafeeqLogo
              variant="horizontal"
              size={28}
              href="/guide/dashboard"
              showSubtitle
              customSubtitle={isAr ? "بوابة المرشد السياحي المعتمد" : "Certified Guide Portal"}
            />
          </div>

          {/* Verification Badge (Clean, No Emojis) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#10B981",
              padding: "4px 10px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 800,
              marginBottom: "16px",
              width: "fit-content",
            }}
          >
            <ShieldCheckIcon size={14} color="#10B981" />
            <span>{isAr ? "مرشد معتمد — وزارة السياحة" : "MOT Certified Guide"}</span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
            {GUIDE_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    color: isActive ? "#0f172a" : "var(--color-text-primary)",
                    background: isActive ? "var(--gradient-gold)" : "transparent",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: isActive ? 900 : 600,
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--color-bg-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={16} color={isActive ? "#0f172a" : "var(--color-gold-heading)"} />
                  <span>{isAr ? link.labelAr : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
            <Link
              href="/"
              style={{
                color: "var(--color-gold-heading)",
                fontSize: "12px",
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{isAr ? "العودة للموقع العام" : "Back to Website"}</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flexGrow: 1, padding: "28px 32px", minWidth: 0, overflowX: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
