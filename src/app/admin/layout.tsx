"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { useLanguage } from "@/lib/language-provider";
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

interface NavGroup {
  sectionTitleAr: string;
  sectionTitleEn: string;
  links: {
    href: string;
    labelAr: string;
    labelEn: string;
    icon: React.FC<{ size?: number; color?: string }>;
    badge?: string;
  }[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    sectionTitleAr: "نظرة عامة والتحليلات",
    sectionTitleEn: "Overview & Analytics",
    links: [
      { href: "/admin/dashboard", labelAr: "لوحة المؤشرات العامة", labelEn: "Overview Dashboard", icon: LayoutDashboardIcon, badge: "Live" },
    ],
  },
  {
    sectionTitleAr: "إدارة الحسابات والمستخدمين",
    sectionTitleEn: "Account & User Management",
    links: [
      { href: "/admin/guides", labelAr: "المرشدون السياحيون", labelEn: "Tour Guides", icon: CompassIcon, badge: "مرشد" },
      { href: "/admin/clients", labelAr: "العملاء والمسافرون", labelEn: "Clients & Travelers", icon: UserIcon, badge: undefined },
      { href: "/admin/admins", labelAr: "فريق الإدارة والمسؤولون", labelEn: "Admin Team & Staff", icon: ShieldIcon, badge: "فريق" },
      { href: "/admin/guides-approval", labelAr: "اعتماد وتوثيق التراخيص", labelEn: "MOT License Approvals", icon: ShieldCheckIcon, badge: "3" },
      { href: "/admin/users", labelAr: "سجل المستخدمين الموحد", labelEn: "Unified Users Directory", icon: UsersIcon, badge: undefined },
    ],
  },
  {
    sectionTitleAr: "العمليات والبرامج السياحية",
    sectionTitleEn: "Operations & Tour Catalog",
    links: [
      { href: "/admin/programs-review", labelAr: "مراجعة ونشر البرامج", labelEn: "Program Approvals", icon: FileTextIcon, badge: "2" },
      { href: "/admin/bookings", labelAr: "إدارة الحجوزات والعمليات", labelEn: "Bookings Ops", icon: CalendarIcon, badge: undefined },
      { href: "/admin/catalog", labelAr: "الكتالوج والوجهات والتصنيفات", labelEn: "Destinations & Categories", icon: FolderIcon, badge: undefined },
      { href: "/admin/reviews", labelAr: "تقييمات ومراجعات البرامج", labelEn: "Reviews Moderation", icon: StarIcon, badge: undefined },
      { href: "/admin/messages", labelAr: "مركز المراسلات والبلاغات", labelEn: "Support & Inquiries", icon: MessageSquareIcon, badge: undefined },
    ],
  },
  {
    sectionTitleAr: "المالية والضمان والنزاعات",
    sectionTitleEn: "Finance, Escrow & Disputes",
    links: [
      { href: "/admin/finance", labelAr: "المحفظة وحساب الضمان Escrow", labelEn: "Escrow & IBAN Payouts", icon: WalletIcon, badge: "طلب" },
      { href: "/admin/disputes", labelAr: "النزاعات والتسوية المالية", labelEn: "Dispute Settlements", icon: ScaleIcon, badge: "1" },
    ],
  },
  {
    sectionTitleAr: "الحوكمة والنظام والأمان",
    sectionTitleEn: "System Governance & Security",
    links: [
      { href: "/admin/settings", labelAr: "إعدادات الرسوم والعمولة والضرائب", labelEn: "Commission & Policies", icon: SettingsIcon, badge: undefined },
      { href: "/admin/roles", labelAr: "الأدوار والصلاحيات (RBAC)", labelEn: "Roles & RBAC Matrix", icon: ShieldIcon, badge: "جديد" },
      { href: "/admin/content-pages", labelAr: "إدارة المحتوى والصفحات (CMS)", labelEn: "Content CMS", icon: FileTextIcon, badge: undefined },
      { href: "/admin/audit", labelAr: "سجل الرقابة والتدقيق (Audit)", labelEn: "Audit Trail", icon: ActivityIcon, badge: undefined },
      { href: "/admin/endpoints", labelAr: "مركز تحكم واختبار الـ APIs", labelEn: "API Gateway & Tests", icon: ServerIcon, badge: "50+" },
    ],
  },
];

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Top Navbar */}
      <DashboardNavbar roleTitleAr="لوحة الحوكمة والتحكم الإداري الأعلى" roleTitleEn="Master System Governance" profileHref="/admin/settings" />

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
            <Link href="/admin/dashboard" style={{ fontSize: "17px", fontWeight: 900, color: "var(--color-gold-heading)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <Image src="/logo-emblem.png" alt="Rafeeq Logo" width={26} height={26} style={{ objectFit: "contain" }} />
              <span>{isAr ? "إدارة رفيق Admin" : "Rafeeq Admin"}</span>
            </Link>
            <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              {isAr ? "مركز الحوكمة والتحكم الإداري الشامل" : "Platform Governance & Control Center"}
            </p>
          </div>

          {/* System Status Pill */}
          <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10B981", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px", width: "fit-content" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }}></span>
            Gateway: Operational 🟢
          </div>

          {/* Grouped Navigation */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1, overflowY: "auto", paddingInlineEnd: "4px" }}>
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.sectionTitleEn} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-gold-heading)", opacity: 0.8, paddingInline: "8px", marginBottom: "4px" }}>
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
                        border: isActive ? "1px solid transparent" : "1px solid transparent",
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
                        <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "100px", background: isActive ? "#0f172a" : "rgba(200,169,110,0.2)", color: isActive ? "#FFDF9E" : "var(--color-gold-heading)", fontWeight: 800 }}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>v2.4.0 • Production</span>
            <Link href="/api-docs" target="_blank" style={{ fontSize: "11px", color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 700 }}>
              Swagger API ↗
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flexGrow: 1, padding: "28px 32px", overflowY: "auto", maxWidth: "1600px", width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
