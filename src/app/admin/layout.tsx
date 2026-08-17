"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "📊 نظرة عامة والتحليلات" },
  { href: "/admin/endpoints", label: "⚡ إدارة الـ Endpoints والـ APIs" },
  { href: "/admin/users", label: "👥 إدارة المستخدمين والصلاحيات" },
  { href: "/admin/guides-approval", label: "📄 اعتماد وتوثيق المرشدين" },
  { href: "/admin/programs-review", label: "📋 مراجعة ونشر البرامج" },
  { href: "/admin/bookings", label: "🎫 جميع الحجوزات والـ Override" },
  { href: "/admin/disputes", label: "🔔 النزاعات والتسوية المالية" },
  { href: "/admin/finance", label: "💰 تحويلات IBAN والـ Escrow" },
  { href: "/admin/audit", label: "🛡️ سجل التدقيق والأمان" },
  { href: "/admin/settings", label: "⚙️ إعدادات التسعير والعمولة" },
] as const;

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060913", color: "#f8fafc", fontFamily: "var(--font-sans, system-ui, sans-serif)", direction: "rtl" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "280px",
          background: "linear-gradient(180deg, #0b1329 0%, #060a17 100%)",
          borderInlineEnd: "1px solid rgba(200, 169, 110, 0.2)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxShadow: "4px 0 25px rgba(0,0,0,0.5)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Brand Header */}
        <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/admin/dashboard" style={{ fontSize: "22px", fontWeight: 900, color: "#C8A96E", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🏛️</span>
            <span>رفيق Rafeeq Admin</span>
          </Link>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>مركز الحوكمة والتحكم الإداري الأعلى</p>
        </div>

        {/* System Health Badge */}
        <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10B981", padding: "6px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", width: "fit-content" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }}></span>
          API Gateway: Healthy 🟢
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: isActive
                    ? "linear-gradient(90deg, #C8A96E 0%, #A68648 100%)"
                    : "rgba(255, 255, 255, 0.03)",
                  color: isActive ? "#0b1329" : "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: isActive ? 800 : 600,
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: isActive ? "0 4px 15px rgba(200, 169, 110, 0.35)" : "none",
                  border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ color: "#C8A96E", fontSize: "12px", textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
            ← العودة للموقع العام
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, minWidth: 0, overflowX: "auto", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}
