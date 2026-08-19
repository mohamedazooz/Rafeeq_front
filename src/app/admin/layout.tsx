"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import { RafeeqLogo } from "@/components/brand";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CompassIcon,
  UserIcon,
  ShieldIcon,
  ShieldCheckIcon,
  FileTextIcon,
  CalendarIcon,
  FolderIcon,
  StarIcon,
  MessageSquareIcon,
  WalletIcon,
  ScaleIcon,
  SettingsIcon,
  ActivityIcon,
  ServerIcon,
} from "@/components/icons";

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { metrics } = useDashboardMetrics();

  const navGroups = [
    {
      sectionTitleAr: "نظرة عامة والتحليلات",
      sectionTitleEn: "Overview & Analytics",
      links: [
        {
          href: "/admin/dashboard",
          labelAr: "لوحة المؤشرات العامة",
          labelEn: "Overview Dashboard",
          icon: LayoutDashboardIcon,
          badge: undefined,
        },
      ],
    },
    {
      sectionTitleAr: "إدارة الحسابات والمستخدمين",
      sectionTitleEn: "Account & User Management",
      links: [
        {
          href: "/admin/guides",
          labelAr: "المرشدون السياحيون",
          labelEn: "Tour Guides",
          icon: CompassIcon,
          badge: undefined,
        },
        {
          href: "/admin/clients",
          labelAr: "العملاء والمسافرون",
          labelEn: "Clients & Travelers",
          icon: UserIcon,
          badge: undefined,
        },
        {
          href: "/admin/admins",
          labelAr: "فريق الإدارة والمسؤولون",
          labelEn: "Admin Team & Staff",
          icon: ShieldIcon,
          badge: undefined,
        },
        {
          href: "/admin/guides-approval",
          labelAr: "اعتماد وتوثيق التراخيص",
          labelEn: "License Approvals",
          icon: ShieldCheckIcon,
          badge: metrics.pendingGuidesCount > 0 ? String(metrics.pendingGuidesCount) : undefined,
        },
        {
          href: "/admin/users",
          labelAr: "سجل المستخدمين الموحد",
          labelEn: "Unified Users Directory",
          icon: UsersIcon,
          badge: undefined,
        },
      ],
    },
    {
      sectionTitleAr: "العمليات والبرامج السياحية",
      sectionTitleEn: "Operations & Tour Catalog",
      links: [
        {
          href: "/admin/programs-review",
          labelAr: "مراجعة ونشر البرامج",
          labelEn: "Program Approvals",
          icon: FileTextIcon,
          badge: metrics.pendingProgramsCount > 0 ? String(metrics.pendingProgramsCount) : undefined,
        },
        {
          href: "/admin/bookings",
          labelAr: "إدارة الحجوزات والعمليات",
          labelEn: "Bookings Ops",
          icon: CalendarIcon,
          badge: undefined,
        },
        {
          href: "/admin/catalog",
          labelAr: "الكتالوج والوجهات والتصنيفات",
          labelEn: "Destinations & Categories",
          icon: FolderIcon,
          badge: undefined,
        },
        {
          href: "/admin/reviews",
          labelAr: "تقييمات ومراجعات البرامج",
          labelEn: "Reviews Moderation",
          icon: StarIcon,
          badge: undefined,
        },
        {
          href: "/admin/messages",
          labelAr: "مركز المراسلات والشات الجماعي",
          labelEn: "Messages & Mediation",
          icon: MessageSquareIcon,
          badge: metrics.unreadMessagesCount > 0 ? String(metrics.unreadMessagesCount) : undefined,
        },
      ],
    },
    {
      sectionTitleAr: "المالية والضمان والنزاعات",
      sectionTitleEn: "Finance, Escrow & Disputes",
      links: [
        {
          href: "/admin/finance",
          labelAr: "المحفظة وحساب الضمان Escrow",
          labelEn: "Escrow & IBAN Payouts",
          icon: WalletIcon,
          badge: metrics.pendingPayoutsCount > 0 ? String(metrics.pendingPayoutsCount) : undefined,
        },
        {
          href: "/admin/disputes",
          labelAr: "النزاعات والتسوية المالية",
          labelEn: "Dispute Settlements",
          icon: ScaleIcon,
          badge: metrics.pendingDisputesCount > 0 ? String(metrics.pendingDisputesCount) : undefined,
        },
      ],
    },
    {
      sectionTitleAr: "الحوكمة والنظام والأمان",
      sectionTitleEn: "System Governance & Security",
      links: [
        {
          href: "/admin/settings",
          labelAr: "إعدادات الرسوم والعمولة والضرائب",
          labelEn: "Commission & Policies",
          icon: SettingsIcon,
          badge: undefined,
        },
        {
          href: "/admin/roles",
          labelAr: "الأدوار والصلاحيات (RBAC)",
          labelEn: "Roles & RBAC Matrix",
          icon: ShieldIcon,
          badge: undefined,
        },
        {
          href: "/admin/content-pages",
          labelAr: "إدارة المحتوى والصفحات (CMS)",
          labelEn: "Content CMS",
          icon: FileTextIcon,
          badge: undefined,
        },
        {
          href: "/admin/audit",
          labelAr: "سجل الرقابة والتدقيق (Audit)",
          labelEn: "Audit Trail",
          icon: ActivityIcon,
          badge: undefined,
        },
        {
          href: "/admin/endpoints",
          labelAr: "مركز تحكم واختبار الـ APIs",
          labelEn: "API Gateway & Tests",
          icon: ServerIcon,
          badge: undefined,
        },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar
        roleTitleAr="لوحة الحوكمة والتحكم الإداري الأعلى"
        roleTitleEn="Master System Governance"
        profileHref="/admin/settings"
      />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "280px",
            background: "var(--color-bg-card)",
            borderInlineEnd: "1px solid var(--color-border)",
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Brand Header */}
          <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
            <RafeeqLogo
              variant="horizontal"
              size={30}
              href="/admin/dashboard"
              showSubtitle
              customSubtitle={isAr ? "مركز الحوكمة والتحكم الإداري" : "Platform Governance Center"}
            />
          </div>

          {/* System Status Indicator (Clean, No Emojis) */}
          <div
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#10B981",
              padding: "4px 10px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 800,
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#10B981",
                boxShadow: "0 0 6px #10B981",
              }}
            />
            <span>{isAr ? "البوابة التشغيلية: نشطة ومستقرة" : "Gateway: Operational"}</span>
          </div>

          {/* Grouped Navigation */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flexGrow: 1,
              overflowY: "auto",
              paddingInlineEnd: "4px",
            }}
          >
            {navGroups.map((group) => (
              <div key={group.sectionTitleEn} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--color-gold-heading)",
                    opacity: 0.85,
                    paddingInline: "8px",
                    marginBottom: "4px",
                  }}
                >
                  {isAr ? group.sectionTitleAr : group.sectionTitleEn}
                </span>

                {group.links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        color: isActive ? "#0f172a" : "var(--color-text-primary)",
                        background: isActive ? "var(--gradient-gold)" : "transparent",
                        border: "1px solid transparent",
                        textDecoration: "none",
                        fontSize: "12px",
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
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Icon size={16} color={isActive ? "#0f172a" : "var(--color-gold-heading)"} />
                        <span>{isAr ? link.labelAr : link.labelEn}</span>
                      </div>

                      {link.badge && (
                        <span
                          style={{
                            fontSize: "10px",
                            minWidth: "18px",
                            height: "18px",
                            padding: "0 6px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "100px",
                            background: isActive ? "#0f172a" : "rgba(200,169,110,0.2)",
                            color: isActive ? "#FFDF9E" : "var(--color-gold-heading)",
                            fontWeight: 900,
                            fontFamily: "monospace",
                          }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>v2.5.0 • Production</span>
            <Link
              href="/api-docs"
              target="_blank"
              style={{
                fontSize: "11px",
                color: "var(--color-gold-heading)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {isAr ? "وثائق الـ API" : "Swagger API"}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            padding: "28px 32px",
            overflowY: "auto",
            maxWidth: "1600px",
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
