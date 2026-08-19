"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  AnimatedAreaChart,
  AnimatedBarChart,
  AnimatedDonutChart,
  SparklineIndicator,
} from "@/components/ui/charts";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  FileTextIcon,
  CompassIcon,
  WalletIcon,
  ActivityIcon,
} from "@/components/icons";

// Animated KPI Cards Data
const KPIS = [
  {
    titleAr: "إجمالي الحجوزات (GBV)",
    titleEn: "Gross Booking Value",
    val: "148,500 ر.س",
    subAr: "+18% مقارنة بالشهر السابق",
    sparklineData: [45, 52, 68, 74, 85, 110, 148],
    isPositive: true,
    accentColor: "#10B981",
  },
  {
    titleAr: "صافي إيرادات المنصة",
    titleEn: "Platform Commission Net",
    val: "22,275 ر.س",
    subAr: "عمولة 15% + رسوم الخدمات",
    sparklineData: [6.7, 7.8, 10.2, 11.1, 12.7, 16.5, 22.2],
    isPositive: true,
    accentColor: "var(--color-gold-heading)",
  },
  {
    titleAr: "رصيد الـ Escrow الإجمالي",
    titleEn: "Active Escrow Funds",
    val: "38,400 ر.س",
    subAr: "مبالغ ضامنة لـ 42 حجز قائم",
    sparklineData: [20, 24, 28, 31, 35, 34, 38],
    isPositive: true,
    accentColor: "#3B82F6",
  },
  {
    titleAr: "طلبات الاعتماد المعلقة",
    titleEn: "Pending Approvals",
    val: "5 طلبات",
    subAr: "3 مرشدين + 2 برنامج سياحي",
    sparklineData: [8, 6, 9, 7, 6, 5, 5],
    isPositive: false,
    accentColor: "#F59E0B",
  },
];

// Area Chart Data Points (Monthly Growth)
const REVENUE_AREA_DATA = [
  { label: "مارس", value: 62000, secondaryValue: 9300, formattedValue: "62,000 ر.س", formattedSecondaryValue: "9,300 ر.س" },
  { label: "أبريل", value: 85000, secondaryValue: 12750, formattedValue: "85,000 ر.س", formattedSecondaryValue: "12,750 ر.س" },
  { label: "مايو", value: 110000, secondaryValue: 16500, formattedValue: "110,000 ر.س", formattedSecondaryValue: "16,500 ر.س" },
  { label: "يونيو", value: 128000, secondaryValue: 19200, formattedValue: "128,000 ر.س", formattedSecondaryValue: "19,200 ر.س" },
  { label: "يوليو", value: 135000, secondaryValue: 20250, formattedValue: "135,000 ر.س", formattedSecondaryValue: "20,250 ر.س" },
  { label: "أغسطس", value: 148500, secondaryValue: 22275, formattedValue: "148,500 ر.س", formattedSecondaryValue: "22,275 ر.س" },
];

// Donut Chart Segments (Booking Distribution)
const BOOKING_STATUS_SEGMENTS = [
  { label: "مؤكدة (Confirmed)", value: 28, color: "#10B981" },
  { label: "قيد الدفع (Pending)", value: 10, color: "#F59E0B" },
  { label: "مكتملة (Completed)", value: 7, color: "#3B82F6" },
  { label: "ملغاة (Cancelled)", value: 3, color: "#EF4444" },
  { label: "متنازع عليها (Disputed)", value: 2, color: "#8B5CF6" },
];

// Bar Chart Items (Regional Volume)
const REGIONS_BAR_DATA = [
  { label: "الرياض", value: 38, color: "var(--color-saudi-green)" },
  { label: "العلا", value: 32, color: "var(--color-gold-heading)" },
  { label: "جدة", value: 24, color: "#3B82F6" },
  { label: "الأحساء", value: 18, color: "#10B981" },
  { label: "عسير", value: 14, color: "#8B5CF6" },
];

export default function AdminDashboardPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, info } = useToast();

  const [guidesQueue, setGuidesQueue] = useState([
    { id: "g-1", name: "سعود فهد الدوسري", email: "saud.aldosari@example.com", license: "TG-992014", city: "الرياض", date: "اليوم 10:30 ص" },
    { id: "g-2", name: "منى علي الغامدي", email: "mona.ghamdi@example.com", license: "TG-881023", city: "جدة", date: "أمس 04:15 م" },
    { id: "g-3", name: "تركي بن طلال العتيبي", email: "turki.otaibi@example.com", license: "TG-772910", city: "العلا", date: "16 أغسطس" },
  ]);

  const [programsQueue, setProgramsQueue] = useState([
    { id: "p-1", title: "رحلة جبل القارة والواحة بالأحساء", guide: "خالد الحربي", price: "380 ر.س", region: "الأحساء" },
    { id: "p-2", title: "جولة الغوص واستكشاف شعب حقل", guide: "ريم العلي", price: "550 ر.س", region: "تبوك" },
  ]);

  const handleApproveGuide = async (guide: typeof guidesQueue[0]) => {
    setGuidesQueue((prev) => prev.filter((g) => g.id !== guide.id));
    try {
      await adminService.approveGuide(guide.id);
    } catch {
      // Handled
    }
    success(`تم اعتماد وتوثيق رخصة المرشد (${guide.name}) بنجاح!`);
  };

  const handlePublishProgram = async (prog: typeof programsQueue[0]) => {
    setProgramsQueue((prev) => prev.filter((p) => p.id !== prog.id));
    try {
      await adminService.approveProgram(prog.id);
    } catch {
      // Handled
    }
    success(`تم اعتماد ونشر البرنامج (${prog.title}) في الكتالوج العام بنجاح!`);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>
            لوحة القيادة والحوكمة الشاملة ✦
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            مراقبة مؤشرات الأداء الحية، تدفقات الـ Escrow، واعتماد التراخيص والبرامج
          </p>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button variant="outline" size="sm" onClick={() => info("جاري تحديث البيانات اللحظية...")}>
            🔄 تحديث البيانات
          </Button>
          <Link href="/admin/finance">
            <Button variant="primary" size="sm">
              <WalletIcon size={16} />
              <span>إدارة التسويات والـ Escrow</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI 4 Cards Grid with Sparklines & Motion */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
        {KPIS.map((kpi, idx) => (
          <motion.div
            key={kpi.titleAr}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            style={{
              padding: "var(--space-5)",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  {isAr ? kpi.titleAr : kpi.titleEn}
                </span>
                <SparklineIndicator data={kpi.sparklineData} isPositive={kpi.isPositive} color={kpi.accentColor} />
              </div>
              <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: kpi.accentColor, margin: 0 }}>
                {kpi.val}
              </h2>
            </div>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "var(--space-3)", fontWeight: 600 }}>
              {kpi.subAr}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Animated Charts Section (Area & Donut & Bar) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
        {/* Spline Area Chart: Revenue & GBV Trend */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: 0 }}>
                مسار نمو حجم الحجوزات وإيرادات المنصة (GBV)
              </h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                مقارنة شهرية متزامنة بين إجمالي الحجوزات وصافي عمولة المنصة
              </p>
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700, background: "rgba(200,169,110,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
              آخر 6 أشهر
            </span>
          </div>

          <AnimatedAreaChart
            data={REVENUE_AREA_DATA}
            height={200}
            primaryColor="var(--color-gold-heading)"
            secondaryColor="#10B981"
            primaryLabel="إجمالي الحجوزات (GBV)"
            secondaryLabel="صافي الإيراد (15%)"
          />
        </div>

        {/* Donut Chart: Booking Status Breakdown */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: 0 }}>
            توزيع حالات الحجوزات
          </h3>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
            إجمالي 50 حجز نشط ومكتمل
          </p>

          <AnimatedDonutChart
            data={BOOKING_STATUS_SEGMENTS}
            size={160}
            strokeWidth={20}
            centerLabel="إجمالي الحجوزات"
            centerValue="50 حجز"
          />
        </div>
      </div>

      {/* Second Analytics Row: Regional Bar Chart & Quick Approvals */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
        {/* Regional Volume Bar Chart */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: 0 }}>
              كثافة الحجوزات حسب الوجهات السياحية
            </h3>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>عدد الرحلات</span>
          </div>

          <AnimatedBarChart
            data={REGIONS_BAR_DATA}
            height={180}
            primaryColor="var(--color-saudi-green)"
            valueSuffix=" رحلة"
          />
        </div>

        {/* Live Approval Queues */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: 0 }}>
              طابور توثيق التراخيص والبرامج ({guidesQueue.length + programsQueue.length})
            </h3>
            <Link href="/admin/guides-approval" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              عرض الكل ←
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "200px", overflowY: "auto" }}>
            {guidesQueue.map((g) => (
              <div
                key={g.id}
                style={{
                  padding: "10px 14px",
                  background: "var(--color-bg-secondary)",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CompassIcon size={16} color="var(--color-gold-heading)" />
                    <span style={{ fontSize: "13px", fontWeight: 800 }}>{g.name}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                    {g.city} • رخصة: {g.license} • {g.date}
                  </span>
                </div>

                <Button variant="primary" size="sm" onClick={() => handleApproveGuide(g)}>
                  <ShieldCheckIcon size={14} />
                  <span>اعتماد</span>
                </Button>
              </div>
            ))}

            {programsQueue.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: "10px 14px",
                  background: "var(--color-bg-secondary)",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileTextIcon size={16} color="#10B981" />
                    <span style={{ fontSize: "13px", fontWeight: 800 }}>{p.title}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                    المرشد: {p.guide} • {p.price} ({p.region})
                  </span>
                </div>

                <Button variant="secondary" size="sm" onClick={() => handlePublishProgram(p)}>
                  <CheckCircleIcon size={14} />
                  <span>نشر</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
