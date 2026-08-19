"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
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

export default function GuideDashboardPage() {
  const { lang, isAr } = useLanguage();

  const GUIDE_KPIS = [
    {
      labelAr: "إجمالي الأرباح المحققة",
      labelEn: "Total Net Earnings",
      valAr: formatPrice(BigInt(1425000), "ar", true),
      valEn: formatPrice(BigInt(1425000), "en", true),
      subAr: "+12% نمو هذا الشهر",
      subEn: "+12% growth this month",
      sparklineData: [4000, 5200, 6800, 8500, 11000, 14250],
      isPositive: true,
      accentColor: "var(--color-saudi-green)",
    },
    {
      labelAr: "رصيد الـ Escrow المعلق",
      labelEn: "Pending Escrow Funds",
      valAr: formatPrice(BigInt(340000), "ar", true),
      valEn: formatPrice(BigInt(340000), "en", true),
      subAr: "في رحلتين قادمتين مؤكدتين",
      subEn: "In 2 confirmed upcoming tours",
      sparklineData: [1200, 1500, 2400, 3000, 3400],
      isPositive: true,
      accentColor: "var(--color-gold-heading)",
    },
    {
      labelAr: "إجمالي الحجوزات المؤكدة",
      labelEn: "Confirmed Bookings",
      valAr: "28 حجز",
      valEn: "28 Bookings",
      subAr: "نسبة قبول وإتمام 100%",
      subEn: "100% acceptance & completion",
      sparklineData: [4, 8, 12, 18, 22, 28],
      isPositive: true,
      accentColor: "#3B82F6",
    },
    {
      labelAr: "التقييم العام للمسافرين",
      labelEn: "Average Rating",
      valAr: "4.95 ⭐",
      valEn: "4.95 ⭐",
      subAr: "من 128 مسافر موثق",
      subEn: "From 128 verified travelers",
      sparklineData: [4.8, 4.85, 4.9, 4.92, 4.95],
      isPositive: true,
      accentColor: "#F59E0B",
    },
  ];

  const GUIDE_EARNINGS_DATA = [
    { label: isAr ? "مايو" : "May", value: 4500, formattedValue: formatPrice(BigInt(450000), lang, true) },
    { label: isAr ? "يونيو" : "Jun", value: 6800, formattedValue: formatPrice(BigInt(680000), lang, true) },
    { label: isAr ? "يوليو" : "Jul", value: 9200, formattedValue: formatPrice(BigInt(920000), lang, true) },
    { label: isAr ? "أغسطس" : "Aug", value: 14250, formattedValue: formatPrice(BigInt(1425000), lang, true) },
  ];

  const TOURS_PERFORMANCE = [
    { label: isAr ? "مدائن صالح" : "Hegra Tombs", value: 18, color: "var(--color-gold-heading)" },
    { label: isAr ? "البلدة القديمة" : "Old Town", value: 12, color: "var(--color-saudi-green)" },
    { label: isAr ? "تأمل النجوم" : "Stargazing", value: 8, color: "#3B82F6" },
    { label: isAr ? "جبل الفيل" : "Elephant Rock", value: 6, color: "#8B5CF6" },
  ];

  const availableBalance = formatPrice(BigInt(925000), lang, true);
  const recentTripNet = formatPrice(BigInt(144500), lang, true);

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            {isAr ? "لوحة الأداء — المرشد السياحي 🧭" : "Tour Guide Performance Dashboard 🧭"}
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            {isAr
              ? "متابعة حجوزاتك، أرباحك الصافية، تقويم التوافر وإدارة محفظة الـ Escrow"
              : "Track your bookings, net earnings, calendar availability, and Escrow wallet"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/guide/calendar">
            <Button variant="outline" size="md">
              <CalendarIcon size={16} />
              <span>{isAr ? "تقويم التوافر والأسعار" : "Calendar & Pricing"}</span>
            </Button>
          </Link>
          <Link href="/guide/programs/create">
            <Button variant="primary" size="md">
              <PlusIcon size={16} />
              <span>{isAr ? "إنشاء برنامج جديد" : "Create New Tour"}</span>
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
                {isAr ? kpi.valAr : kpi.valEn}
              </h2>
            </div>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "var(--space-3)", fontWeight: 600 }}>
              {isAr ? kpi.subAr : kpi.subEn}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Animated Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
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
                {isAr ? "مسار نمو أرباحك الصافية (SAR)" : "Net Earnings Growth Trajectory (SAR)"}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                {isAr ? "مستحقاتك المحررة بعد خصم عمولة المنصة 15%" : "Released payouts after 15% platform commission"}
              </p>
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700, background: "rgba(200,169,110,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
              {isAr ? "موسم العلا 2026" : "AlUla Season 2026"}
            </span>
          </div>

          <AnimatedAreaChart
            data={GUIDE_EARNINGS_DATA}
            height={190}
            primaryColor="var(--color-saudi-green)"
            primaryLabel={isAr ? "صافي أرباح المرشد" : "Guide Net Earnings"}
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
            {isAr ? "كثافة الحجوزات حسب البرامج" : "Booking Volume by Tour Program"}
          </h3>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
            {isAr ? "عدد الرحلات المحجوزة لكل برنامج" : "Total booked trips per experience"}
          </p>

          <AnimatedBarChart
            data={TOURS_PERFORMANCE}
            height={160}
            primaryColor="var(--color-gold-heading)"
            valueSuffix={isAr ? " رحلة" : " tours"}
          />
        </div>
      </div>

      {/* Recent Bookings & Quick Actions Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
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
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: 0 }}>
              {isAr ? "أحدث الحجوزات المستقبلة" : "Recent Inbound Bookings"}
            </h3>
            <Link href="/guide/bookings" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              {isAr ? "عرض جميع الحجوزات ←" : "View All Bookings →"}
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
                <h4 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>
                  {isAr ? "جولة مدائن صالح والبلدة القديمة بالعلا" : "Hegra UNESCO & AlUla Old Town"}
                </h4>
                <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                  {isAr ? "العميل:" : "Client:"} <strong>{isAr ? "محمد العتيبي" : "Mohammed Al-Otaibi"}</strong> • 📅 {isAr ? "24 أكتوبر 2026 (مشاركين 2)" : "Oct 24, 2026 (2 Guests)"}
                </p>
              </div>

              <div style={{ textAlign: "end" }}>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)", display: "block" }}>
                  {recentTripNet} ({isAr ? "صافي" : "Net"})
                </span>
                <span style={{ fontSize: "11px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
                  {isAr ? "محجوز في Escrow 🔒" : "Held in Escrow 🔒"}
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
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "0 0 10px 0" }}>
              {isAr ? "رصيد المحفظة المتاح للسحب" : "Available Wallet Balance"}
            </h3>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-saudi-green)", margin: 0 }}>
              {availableBalance}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>
              {isAr ? "جاهز للتحويل الفوري إلى حسابك البنكي المعتمد (IBAN)" : "Ready for instant payout to your verified Saudi IBAN"}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
            <Link href="/guide/wallet">
              <Button variant="primary" size="md" fullWidth>
                <WalletIcon size={16} />
                <span>{isAr ? "طلب سحب أرباح إلى الآيبان" : "Request Payout to IBAN"}</span>
              </Button>
            </Link>
            <Link href="/guide/calendar">
              <Button variant="outline" size="md" fullWidth>
                <CalendarIcon size={16} />
                <span>{isAr ? "تعديل التوافر والأسعار" : "Manage Calendar & Rates"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
