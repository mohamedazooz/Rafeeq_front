"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";
import { RafeeqLogo } from "@/components/brand";
import {
  LayoutDashboardIcon,
  CalendarIcon,
  HeartIcon,
  MessageSquareIcon,
  CreditCardIcon,
  UserIcon,
} from "@/components/icons";

const CLIENT_LINKS = [
  { href: "/client/dashboard", labelAr: "نظرة عامة والملخص", labelEn: "Overview & Summary", icon: LayoutDashboardIcon },
  { href: "/client/bookings", labelAr: "حجوزاتي والرحلات القادمة", labelEn: "My Bookings", icon: CalendarIcon },
  { href: "/client/wishlist", labelAr: "المفضلة والبرامج المحفوظة", labelEn: "Wishlist", icon: HeartIcon },
  { href: "/client/messages", labelAr: "المراسلات وغرفة الوساطة", labelEn: "Messages & Support", icon: MessageSquareIcon },
  { href: "/client/payments", labelAr: "الفواتير والمدفوعات", labelEn: "Payments & Invoices", icon: CreditCardIcon },
  { href: "/client/profile", labelAr: "الملف الشخصي ووثائق السفر", labelEn: "Profile Settings", icon: UserIcon },
];

export default function ClientLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar
        roleTitleAr="لوحة المسافر والعميل"
        roleTitleEn="Traveler Client Dashboard"
        profileHref="/client/profile"
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
          <div style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>
            <RafeeqLogo
              variant="horizontal"
              size={28}
              href="/client/dashboard"
              showSubtitle
              customSubtitle={isAr ? "بوابة المسافر" : "Client Portal"}
            />
          </div>

          {/* Navigation */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
            {CLIENT_LINKS.map((link) => {
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
