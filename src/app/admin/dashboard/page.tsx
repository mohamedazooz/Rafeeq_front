"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CompassIcon,
  WalletIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  EyeIcon,
  ActivityIcon,
  MapPinIcon,
} from "@/components/icons";

// KPI Cards Data
const INITIAL_KPIS = [
  { titleAr: "إجمالي الحجوزات (GBV)", val: "148,500 ر.س", subAr: "+18% مقارنة بالشهر السابق", color: "#10B981" },
  { titleAr: "صافي إيرادات المنصة", val: "22,275 ر.س", subAr: "عمولة 15% + رسوم الخدمات", color: "var(--color-gold-heading)" },
  { titleAr: "رصيد الـ Escrow الإجمالي", val: "38,400 ر.س", subAr: "مبالغ ضامنة لـ 42 حجز قائم", color: "#3B82F6" },
  { titleAr: "طلبات الاعتماد المعلقة", val: "5 طلبات", subAr: "3 مرشدين + 2 برنامج سياحي", color: "#F59E0B" },
];

// Monthly Revenue Trend Data
const REVENUE_DATA = [
  { month: "مارس", gbv: 62000, revenue: 9300 },
  { month: "أبريل", gbv: 85000, revenue: 12750 },
  { month: "مايو", gbv: 110000, revenue: 16500 },
  { month: "يونيو", gbv: 128000, revenue: 19200 },
  { month: "يوليو", gbv: 135000, revenue: 20250 },
  { month: "أغسطس", gbv: 148500, revenue: 22275 },
];

// Booking Status Distribution Data
const BOOKING_STATUSES = [
  { label: "مؤكدة (Confirmed)", count: 28, percent: 56, color: "#10B981" },
  { label: "قيد الدفع (Pending)", count: 10, percent: 20, color: "#F59E0B" },
  { label: "مكتملة (Completed)", count: 7, percent: 14, color: "#3B82F6" },
  { label: "ملغاة (Cancelled)", count: 3, percent: 6, color: "#EF4444" },
  { label: "متنازع عليها (Disputed)", count: 2, percent: 4, color: "#8B5CF6" },
];

// Regional Distribution Data
const REGIONS = [
  { region: "الرياض ونجد", trips: 18, share: "36%" },
  { region: "العلا والشمال", trips: 14, share: "28%" },
  { region: "جدة والمنطقة الغربية", trips: 10, share: "20%" },
  { region: "الأحساء والمنطقة الشرقية", trips: 8, share: "16%" },
];

export default function AdminDashboardPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [guidesQueue, setGuidesQueue] = useState([
    { id: "g-1", name: "سعود فهد الدوسري", email: "saud.aldosari@example.com", license: "TG-992014", city: "الرياض" },
    { id: "g-2", name: "منى علي الغامدي", email: "mona.ghamdi@example.com", license: "TG-881023", city: "جدة" },
    { id: "g-3", name: "تركي بن طلال العتيبي", email: "turki.otaibi@example.com", license: "TG-772910", city: "العلا" },
  ]);

  const [programsQueue, setProgramsQueue] = useState([
    { id: "p-1", title: "رحلة جبل القارة والواحة بالأحساء", guide: "خالد الحربي", guideEmail: "khaled.harbi@example.com", price: "380 ر.س" },
    { id: "p-2", title: "جولة الغوص واستكشاف شعب حقل", guide: "ريم العلي", guideEmail: "reem.ali@example.com", price: "550 ر.س" },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveGuide = (guide: typeof guidesQueue[0]) => {
    setGuidesQueue((prev) => prev.filter((g) => g.id !== guide.id));

    dispatchDualActionNotification({
      title: "اعتماد وتوثيق رخصة المرشد السياحي",
      message: `تم اعتماد ترخيص الإرشاد (${guide.license}) وتفعيل الحساب.`,
      actionType: "APPROVE",
      targetEmail: guide.email,
      targetName: guide.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم اعتماد وتوثيق رخصة المرشد (${guide.name}) بنجاح!` : `Guide approved.`);
  };

  const handlePublishProgram = (prog: typeof programsQueue[0]) => {
    setProgramsQueue((prev) => prev.filter((p) => p.id !== prog.id));

    dispatchDualActionNotification({
      title: "اعتماد ونشر البرنامج السياحي",
      message: `تم نشر برنامجك (${prog.title}) في الكتالوج العام للمسافرين.`,
      actionType: "APPROVE",
      targetEmail: prog.guideEmail,
      targetName: prog.guide,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم نشر البرنامج السياحي (${prog.title}) في الكتالوج العام للمسافرين!` : `Program published.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <LayoutDashboardIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "لوحة القيادة والمؤشرات الحية للمنصة" : "Executive Governance & Live KPI Dashboard"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "لوحة القيادة والحوكمة العليا 🏛️" : "Executive Governance Dashboard"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "نظرة شاملة ومؤشرات أداء لمنظومة رفيق للسياحة، مراقبة الضمان المالي Escrow، واعتماد المرشدين والبرامج." : "Real-time overview of bookings, escrow liability, guide approvals, and regional distribution."}
        </p>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {INITIAL_KPIS.map((kpi, idx) => (
          <div key={idx} style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{kpi.titleAr}</span>
            <h3 style={{ fontSize: "24px", fontWeight: 900, color: kpi.color, margin: 0 }}>{kpi.val}</h3>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{kpi.subAr}</span>
          </div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Monthly Revenue Breakdown Chart */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)" }}>{isAr ? "نمو الحجوزات وإيرادات المنصة (آخر 6 أشهر)" : "Revenue Growth"}</h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "مقارنة إجمالي قيمة الحجوزات GBV مع صافي عمولة رفيق" : "GBV vs Platform Commission"}</p>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px", fontWeight: 700 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}></span>
                {isAr ? "حجم الحجوزات GBV" : "GBV"}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-gold-heading)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-gold-heading)" }}></span>
                {isAr ? "صافي العمولة (15%)" : "Net 15%"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "180px", paddingTop: "20px", gap: "12px" }}>
            {REVENUE_DATA.map((item, i) => {
              const gbvHeight = (item.gbv / 160000) * 100;
              const revHeight = (item.revenue / 25000) * 100;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "100%", width: "100%", justifyContent: "center" }}>
                    <div style={{ width: "14px", height: `${gbvHeight}%`, background: "#10B981", borderRadius: "4px 4px 0 0" }} title={`GBV: ${item.gbv} SAR`} />
                    <div style={{ width: "14px", height: `${revHeight}%`, background: "var(--color-gold-heading)", borderRadius: "4px 4px 0 0" }} title={`Net: ${item.revenue} SAR`} />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Distribution */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "4px" }}>{isAr ? "توزيع حالات الحجوزات" : "Bookings Distribution"}</h3>
          <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>{isAr ? "الحالة الإجمالية لـ 50 حجز أخير" : "Recent 50 bookings"}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {BOOKING_STATUSES.map((st, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
                  <span style={{ color: "var(--color-text-primary)" }}>{st.label}</span>
                  <span style={{ color: st.color }}>{st.count} ({st.percent}%)</span>
                </div>
                <div style={{ height: "6px", background: "var(--color-bg-secondary)", borderRadius: "100px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${st.percent}%`, background: st.color, borderRadius: "100px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Queues Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Guides Approval Queue */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)" }}>{isAr ? "طابور اعتماد المرشدين 📄" : "Guides Approval Queue"}</h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "طلبات التحقق من رخصة وزارة السياحة" : "MOT license verification"}</p>
            </div>
            <Link href="/admin/guides-approval" style={{ fontSize: "12px", color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 800 }}>
              {isAr ? "عرض الكل ←" : "View All"}
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {guidesQueue.map((g) => (
              <div key={g.id} style={{ background: "var(--color-bg-secondary)", padding: "12px 16px", borderRadius: "14px", border: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 800 }}>{g.name}</h4>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{g.city} • {g.license}</span>
                </div>
                <IconButton
                  variant="success"
                  size="sm"
                  title={isAr ? "اعتماد مباشر" : "Approve"}
                  icon={<CheckCircleIcon size={14} />}
                  onClick={() => handleApproveGuide(g)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Programs Review Queue */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "24px", borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)" }}>{isAr ? "طابور نشر البرامج السياحية 📋" : "Program Review Queue"}</h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "برامج جديدة بانتظار الاعتماد للنشر" : "Pending tours for public release"}</p>
            </div>
            <Link href="/admin/programs-review" style={{ fontSize: "12px", color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 800 }}>
              {isAr ? "عرض الكل ←" : "View All"}
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {programsQueue.map((p) => (
              <div key={p.id} style={{ background: "var(--color-bg-secondary)", padding: "12px 16px", borderRadius: "14px", border: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 800 }}>{p.title}</h4>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{p.guide} • {p.price}</span>
                </div>
                <IconButton
                  variant="success"
                  size="sm"
                  title={isAr ? "نشر مباشر" : "Publish"}
                  icon={<CheckCircleIcon size={14} />}
                  onClick={() => handlePublishProgram(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
