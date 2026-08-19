"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import {
  AnimatedAreaChart,
  AnimatedBarChart,
  SparklineIndicator,
} from "@/components/ui/charts";
import {
  CalendarIcon,
  WalletIcon,
  CompassIcon,
  StarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  PlusIcon,
} from "@/components/icons";

const GUIDE_KPIS = [
  {
    labelAr: "إجمالي الأرباح المحققة",
    labelEn: "Total Net Earnings",
    val: "14,250 ر.س",
    sub: "+12% نمو هذا الشهر",
    sparklineData: [4000, 5200, 6800, 8500, 11000, 14250],
    isPositive: true,
    accentColor: "var(--color-saudi-green)",
  },
  {
    labelAr: "رصيد الـ Escrow المعلق",
    labelEn: "Pending Escrow Funds",
    val: "3,400 ر.س",
    sub: "في رحلتين قادمتين مؤكدتين",
    sparklineData: [1200, 1500, 2400, 3000, 3400],
    isPositive: true,
    accentColor: "var(--color-gold-heading)",
  },
  {
    labelAr: "إجمالي الحجوزات المؤكدة",
    labelEn: "Confirmed Bookings",
    val: "28 حجز",
    sub: "نسبة قبول وإتمام 100%",
    sparklineData: [4, 8, 12, 18, 22, 28],
    isPositive: true,
    accentColor: "#3B82F6",
  },
  {
    labelAr: "التقييم العام للمسافرين",
    labelEn: "Average Rating",
    val: "4.95 ⭐",
    sub: "من 128 مسافر موثق",
    sparklineData: [4.8, 4.85, 4.9, 4.92, 4.95],
    isPositive: true,
    accentColor: "#F59E0B",
  },
];

// Guide Monthly Earnings Chart Data
const GUIDE_EARNINGS_DATA = [
  { label: "مايو", value: 4500, formattedValue: "4,500 ر.س" },
  { label: "يونيو", value: 6800, formattedValue: "6,800 ر.س" },
  { label: "يوليو", value: 9200, formattedValue: "9,200 ر.س" },
  { label: "أغسطس", value: 14250, formattedValue: "14,250 ر.س" },
];

// Tour Bookings Bar Chart
const TOURS_PERFORMANCE = [
  { label: "مدائن صالح", value: 18, color: "var(--color-gold-heading)" },
  { label: "البلدة القديمة", value: 12, color: "var(--color-saudi-green)" },
  { label: "تأمل النجوم", value: 8, color: "#3B82F6" },
  { label: "جبل الفيل", value: 6, color: "#8B5CF6" },
];

export default function GuideDashboardPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            لوحة الأداء — المرشد السياحي 🧭
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            متابعة حجوزاتك، أرباحك الصافية، تقويم التوافر وإدارة محفظة الـ Escrow
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/guide/calendar">
            <Button variant="outline" size="md">
              <CalendarIcon size={16} />
              <span>تقويم التوافر والأسعار</span>
            </Button>
          </Link>
          <Link href="/guide/programs/create">
            <Button variant="primary" size="md">
              <PlusIcon size={16} />
              <span>إنشاء برنامج جديد</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI 4 Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
        {GUIDE_KPIS.map((kpi, idx) => (
          <motion.div
            key={kpi.labelAr}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            style={{
              padding: "var(--space-5)",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  {isAr ? kpi.labelAr : kpi.labelEn}
                </span>
                <SparklineIndicator data={kpi.sparklineData} isPositive={kpi.isPositive} color={kpi.accentColor} />
              </div>
              <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: kpi.accentColor, margin: 0 }}>
                {kpi.val}
              </h2>
            </div>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "var(--space-3)", fontWeight: 600 }}>
              {kpi.sub}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Animated Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
        {/* Earnings Growth Area Chart */}
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
                مسار نمو أرباحك الصافية (SAR)
              </h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                مستحقاتك المحررة بعد خصم عمولة المنصة 15%
              </p>
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700, background: "rgba(200,169,110,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
              موسم العلا 2026
            </span>
          </div>

          <AnimatedAreaChart
            data={GUIDE_EARNINGS_DATA}
            height={190}
            primaryColor="var(--color-saudi-green)"
            primaryLabel="صافي أرباح المرشد"
          />
        </div>

        {/* Tour Performance Bar Chart */}
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
            كثافة الحجوزات حسب البرامج
          </h3>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
            عدد الرحلات المحجوزة لكل برنامج
          </p>

          <AnimatedBarChart
            data={TOURS_PERFORMANCE}
            height={160}
            primaryColor="var(--color-gold-heading)"
            valueSuffix=" رحلة"
          />
        </div>
      </div>

      {/* Recent Bookings & Quick Actions Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
        {/* Bookings Queue */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: 0 }}>أحدث الحجوزات المستقبلة</h3>
            <Link href="/guide/bookings" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              عرض جميع الحجوزات ←
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                padding: "14px 16px",
                background: "var(--color-bg-secondary)",
                borderRadius: "12px",
                border: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>جولة مدائن صالح والبلدة القديمة بالعلا</h4>
                <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                  العميل: <strong>محمد العتيبي</strong> • 📅 24 أكتوبر 2026 (مشاركين 2)
                </p>
              </div>

              <div style={{ textAlign: "end" }}>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)", display: "block" }}>
                  1,445.00 ر.س (صافي)
                </span>
                <span style={{ fontSize: "11px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
                  محجوز في Escrow 🔒
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tools & Wallet Balance */}
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "0 0 10px 0" }}>رصيد المحفظة المتاح للسحب</h3>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-saudi-green)", margin: 0 }}>
              9,250.00 ر.س
            </h2>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
              جاهز للتحويل الفوري إلى حسابك البنكي المعتمد (IBAN)
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
            <Link href="/guide/wallet">
              <Button variant="primary" size="md" fullWidth>
                <WalletIcon size={16} />
                <span>طلب سحب أرباح إلى الآيبان</span>
              </Button>
            </Link>
            <Link href="/guide/calendar">
              <Button variant="outline" size="md" fullWidth>
                <CalendarIcon size={16} />
                <span>تعديل التوافر والأسعار</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
