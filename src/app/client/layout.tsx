"use client";

import Link from "next/link";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";
import { RafeeqLogo } from "@/components/brand";

const CLIENT_LINKS = [
  { href: "/client/dashboard", labelAr: "📊 نظرة عامة", labelEn: "📊 Overview" },
  { href: "/client/bookings", labelAr: "🎫 حجوزاتي", labelEn: "🎫 My Bookings" },
  { href: "/client/wishlist", labelAr: "❤️ المفضلة", labelEn: "❤️ Wishlist" },
  { href: "/client/messages", labelAr: "💬 المراسلات", labelEn: "💬 Messages" },
  { href: "/client/payments", labelAr: "💳 الفواتير والمدفوعات", labelEn: "💳 Payments" },
  { href: "/client/profile", labelAr: "👤 الملف الشخصي", labelEn: "👤 Profile Settings" },
] as const;

export default function ClientLayout({ children }: { readonly children: React.ReactNode }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar roleTitleAr="لوحة العميل المسافر" roleTitleEn="Traveler Client Dashboard" profileHref="/client/profile" />

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
          <div style={{ marginBottom: "20px" }}>
            <RafeeqLogo
              variant="horizontal"
              size={28}
              href="/client/dashboard"
              showSubtitle
              customSubtitle={isAr ? "لوحة المسافر" : "Client Portal"}
            />
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {CLIENT_LINKS.map((link) => (
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
