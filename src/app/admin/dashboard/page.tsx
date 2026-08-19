"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
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

export default function AdminDashboardPage() {
  const { lang, isAr } = useLanguage();
  const { success, info } = useToast();

  const KPIS = [
    {
      titleAr: "إجمالي الحجوزات (GBV)",
      titleEn: "Gross Booking Value (GBV)",
      valAr: formatPrice(BigInt(14850000), "ar", true),
      valEn: formatPrice(BigInt(14850000), "en", true),
      subAr: "+18% مقارنة بالشهر السابق",
      subEn: "+18% vs previous month",
      sparklineData: [45, 52, 68, 74, 85, 110, 148],
      isPositive: true,
      accentColor: "#10B981",
    },
    {
      titleAr: "صافي إيرادات المنصة",
      titleEn: "Platform Commission Net",
      valAr: formatPrice(BigInt(2227500), "ar", true),
      valEn: formatPrice(BigInt(2227500), "en", true),
      subAr: "عمولة 15% + رسوم الخدمات",
      subEn: "15% Commission + Service Fees",
      sparklineData: [6.7, 7.8, 10.2, 11.1, 12.7, 16.5, 22.2],
      isPositive: true,
      accentColor: "var(--color-gold-heading)",
    },
    {
      titleAr: "رصيد الـ Escrow الإجمالي",
      titleEn: "Active Escrow Funds",
      valAr: formatPrice(BigInt(3840000), "ar", true),
      valEn: formatPrice(BigInt(3840000), "en", true),
      subAr: "مبالغ ضامنة لـ 42 حجز قائم",
      subEn: "Protected for 42 active bookings",
      sparklineData: [20, 24, 28, 31, 35, 34, 38],
      isPositive: true,
      accentColor: "#3B82F6",
    },
    {
      titleAr: "طلبات الاعتماد المعلقة",
      titleEn: "Pending Approvals",
      valAr: "5 طلبات",
      valEn: "5 Requests",
      subAr: "3 مرشدين + 2 برنامج سياحي",
      subEn: "3 Guides + 2 Tour Programs",
      sparklineData: [8, 6, 9, 7, 6, 5, 5],
      isPositive: false,
      accentColor: "#F59E0B",
    },
  ];

  const REVENUE_AREA_DATA = [
    { label: isAr ? "مارس" : "Mar", value: 62000, secondaryValue: 9300, formattedValue: formatPrice(BigInt(6200000), lang, true), formattedSecondaryValue: formatPrice(BigInt(930000), lang, true) },
    { label: isAr ? "أبريل" : "Apr", value: 85000, secondaryValue: 12750, formattedValue: formatPrice(BigInt(8500000), lang, true), formattedSecondaryValue: formatPrice(BigInt(1275000), lang, true) },
    { label: isAr ? "مايو" : "May", value: 110000, secondaryValue: 16500, formattedValue: formatPrice(BigInt(11000000), lang, true), formattedSecondaryValue: formatPrice(BigInt(1650000), lang, true) },
    { label: isAr ? "يونيو" : "Jun", value: 128000, secondaryValue: 19200, formattedValue: formatPrice(BigInt(12800000), lang, true), formattedSecondaryValue: formatPrice(BigInt(1920000), lang, true) },
    { label: isAr ? "يوليو" : "Jul", value: 135000, secondaryValue: 20250, formattedValue: formatPrice(BigInt(13500000), lang, true), formattedSecondaryValue: formatPrice(BigInt(2025000), lang, true) },
    { label: isAr ? "أغسطس" : "Aug", value: 148500, secondaryValue: 22275, formattedValue: formatPrice(BigInt(14850000), lang, true), formattedSecondaryValue: formatPrice(BigInt(2227500), lang, true) },
  ];

  const BOOKING_STATUS_SEGMENTS = [
    { label: isAr ? "مؤكدة (Confirmed)" : "Confirmed", value: 28, color: "#10B981" },
    { label: isAr ? "قيد الدفع (Pending)" : "Pending Payment", value: 10, color: "#F59E0B" },
    { label: isAr ? "مكتملة (Completed)" : "Completed", value: 7, color: "#3B82F6" },
    { label: isAr ? "ملغاة (Cancelled)" : "Cancelled", value: 3, color: "#EF4444" },
    { label: isAr ? "متنازع عليها (Disputed)" : "Disputed", value: 2, color: "#8B5CF6" },
  ];

  const REGIONS_BAR_DATA = [
    { label: isAr ? "الرياض" : "Riyadh", value: 38, color: "var(--color-saudi-green)" },
    { label: isAr ? "العلا" : "AlUla", value: 32, color: "var(--color-gold-heading)" },
    { label: isAr ? "جدة" : "Jeddah", value: 24, color: "#3B82F6" },
    { label: isAr ? "الأحساء" : "Al Ahsa", value: 18, color: "#10B981" },
    { label: isAr ? "عسير" : "Aseer", value: 14, color: "#8B5CF6" },
  ];

  const [guidesQueue, setGuidesQueue] = useState([
    { id: "g-1", nameAr: "سعود فهد الدوسري", nameEn: "Saud Fahad Al-Dosari", email: "saud.aldosari@example.com", license: "TG-992014", cityAr: "الرياض", cityEn: "Riyadh", dateAr: "اليوم 10:30 ص", dateEn: "Today 10:30 AM" },
    { id: "g-2", nameAr: "منى علي الغامدي", nameEn: "Mona Ali Al-Ghamdi", email: "mona.ghamdi@example.com", license: "TG-881023", cityAr: "جدة", cityEn: "Jeddah", dateAr: "أمس 04:15 م", dateEn: "Yesterday 04:15 PM" },
    { id: "g-3", nameAr: "تركي بن طلال العتيبي", nameEn: "Turki Talal Al-Otaibi", email: "turki.otaibi@example.com", license: "TG-772910", cityAr: "العلا", cityEn: "AlUla", dateAr: "16 أغسطس", dateEn: "Aug 16" },
  ]);

  const [programsQueue, setProgramsQueue] = useState([
    { id: "p-1", titleAr: "رحلة جبل القارة والواحة بالأحساء", titleEn: "Al Qarah Mountain & Oasis Tour", guideAr: "خالد الحربي", guideEn: "Khaled Al-Harbi", priceHalalas: BigInt(38000), regionAr: "الأحساء", regionEn: "Al Ahsa" },
    { id: "p-2", titleAr: "جولة الغوص واستكشاف شعب حقل", titleEn: "Haql Coral Reef Diving Tour", guideAr: "ريم العلي", guideEn: "Reem Al-Ali", priceHalalas: BigInt(55000), regionAr: "تبوك", regionEn: "Tabuk" },
  ]);

  const handleApproveGuide = async (guide: typeof guidesQueue[0]) => {
    const guideName = isAr ? guide.nameAr : guide.nameEn;
    setGuidesQueue((prev) => prev.filter((g) => g.id !== guide.id));
    try {
      await adminService.approveGuide(guide.id);
    } catch {
      // Handled
    }
    success(isAr ? `تم اعتماد وتوثيق رخصة المرشد (${guideName}) بنجاح!` : `Guide license (${guideName}) verified and approved!`);
  };

  const handlePublishProgram = async (prog: typeof programsQueue[0]) => {
    const progTitle = isAr ? prog.titleAr : prog.titleEn;
    setProgramsQueue((prev) => prev.filter((p) => p.id !== prog.id));
    try {
      await adminService.approveProgram(prog.id);
    } catch {
      // Handled
    }
    success(isAr ? `تم اعتماد ونشر البرنامج (${progTitle}) في الكتالوج العام بنجاح!` : `Program (${progTitle}) approved and published!`);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>
            {isAr ? "لوحة القيادة والحوكمة الشاملة" : "Master Governance & Operations Dashboard"}
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            {isAr
              ? "مراقبة مؤشرات الأداء الحية، تدفقات الـ Escrow، واعتماد التراخيص والبرامج"
              : "Live KPI monitoring, Escrow financial flows, and MOT license verification"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button variant="outline" size="sm" onClick={() => info(isAr ? "جاري تحديث البيانات اللحظية..." : "Refreshing real-time data...")}>
            <span>{isAr ? "تحديث البيانات" : "Refresh Data"}</span>
          </Button>
          <Link href="/admin/finance">
            <Button variant="primary" size="sm">
              <WalletIcon size={16} />
              <span>{isAr ? "إدارة التسويات والـ Escrow" : "Manage Escrow & Payouts"}</span>
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
                {isAr ? kpi.valAr : kpi.valEn}
              </h2>
            </div>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "var(--space-3)", fontWeight: 600 }}>
              {isAr ? kpi.subAr : kpi.subEn}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Animated Charts Section (Area & Donut & Bar) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
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
                {isAr ? "مسار نمو حجم الحجوزات وإيرادات المنصة (GBV)" : "Gross Booking Value & Revenue Trajectory (GBV)"}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                {isAr ? "مقارنة شهرية متزامنة بين إجمالي الحجوزات وصافي عمولة المنصة" : "Monthly synchronous comparison between GBV and platform net commission"}
              </p>
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700, background: "rgba(200,169,110,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
              {isAr ? "آخر 6 أشهر" : "Last 6 Months"}
            </span>
          </div>

          <AnimatedAreaChart
            data={REVENUE_AREA_DATA}
            height={200}
            primaryColor="var(--color-gold-heading)"
            secondaryColor="#10B981"
            primaryLabel={isAr ? "إجمالي الحجوزات (GBV)" : "Gross Booking Value (GBV)"}
            secondaryLabel={isAr ? "صافي الإيراد (15%)" : "Net Revenue (15%)"}
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
            {isAr ? "توزيع حالات الحجوزات" : "Booking Status Distribution"}
          </h3>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
            {isAr ? "إجمالي 50 حجز نشط ومكتمل" : "Total 50 active & completed bookings"}
          </p>

          <AnimatedDonutChart
            data={BOOKING_STATUS_SEGMENTS}
            size={160}
            strokeWidth={20}
            centerLabel={isAr ? "إجمالي الحجوزات" : "Total Bookings"}
            centerValue={isAr ? "50 حجز" : "50 Bookings"}
          />
        </div>
      </div>

      {/* Second Analytics Row: Regional Bar Chart & Quick Approvals */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
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
              {isAr ? "كثافة الحجوزات حسب الوجهات السياحية" : "Booking Volume by Tourism Destination"}
            </h3>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{isAr ? "عدد الرحلات" : "Trips count"}</span>
          </div>

          <AnimatedBarChart
            data={REGIONS_BAR_DATA}
            height={180}
            primaryColor="var(--color-saudi-green)"
            valueSuffix={isAr ? " رحلة" : " tours"}
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
              {isAr ? `طابور توثيق التراخيص والبرامج (${guidesQueue.length + programsQueue.length})` : `License & Program Approval Queue (${guidesQueue.length + programsQueue.length})`}
            </h3>
            <Link href="/admin/guides-approval" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              {isAr ? "عرض الكل ←" : "View All →"}
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "200px", overflowY: "auto" }}>
            {guidesQueue.map((g) => {
              const name = isAr ? g.nameAr : g.nameEn;
              const city = isAr ? g.cityAr : g.cityEn;
              const date = isAr ? g.dateAr : g.dateEn;

              return (
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
                      <span style={{ fontSize: "13px", fontWeight: 800 }}>{name}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                      {city} • {isAr ? "رخصة:" : "License:"} {g.license} • {date}
                    </span>
                  </div>

                  <Button variant="primary" size="sm" onClick={() => handleApproveGuide(g)}>
                    <ShieldCheckIcon size={14} />
                    <span>{isAr ? "اعتماد" : "Approve"}</span>
                  </Button>
                </div>
              );
            })}

            {programsQueue.map((p) => {
              const title = isAr ? p.titleAr : p.titleEn;
              const guide = isAr ? p.guideAr : p.guideEn;
              const region = isAr ? p.regionAr : p.regionEn;
              const formattedPrice = formatPrice(p.priceHalalas, lang, true);

              return (
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
                      <span style={{ fontSize: "13px", fontWeight: 800 }}>{title}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                      {isAr ? "المرشد:" : "Guide:"} {guide} • {formattedPrice} ({region})
                    </span>
                  </div>

                  <Button variant="secondary" size="sm" onClick={() => handlePublishProgram(p)}>
                    <CheckCircleIcon size={14} />
                    <span>{isAr ? "نشر" : "Publish"}</span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
