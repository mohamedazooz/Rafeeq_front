"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
import {
  CalendarIcon,
  CreditCardIcon,
  CompassIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  StarIcon,
} from "@/components/icons";

export default function ClientDashboardOverviewPage() {
  const { lang, isAr } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const formattedTripPrice = formatPrice(BigInt(170000), lang, true);

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, rgba(200, 169, 110, 0.15) 0%, rgba(0, 108, 53, 0.15) 100%)",
          border: "1px solid var(--color-gold-royal)",
          borderRadius: "var(--radius-2xl)",
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", color: "var(--color-gold-heading)", fontWeight: 800, textTransform: "uppercase" }}>
            {isAr ? "بوابة المسافر المستكشف ✦" : "Explorer Traveler Portal ✦"}
          </span>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)", margin: "4px 0" }}>
            {isAr ? "مرحباً بك مجدداً، محمد العتيبي ✨" : "Welcome back, Mohammed Al-Otaibi ✨"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
            {isAr
              ? "رحلتك القادمة مؤكدة بالضمان البنكي Escrow وموعد انطلاقها بعد 5 أيام"
              : "Your upcoming trip is confirmed with bank Escrow protection, starting in 5 days"}
          </p>
        </div>

        <Link href="/programs">
          <Button variant="primary" size="md">
            <CompassIcon size={16} />
            <span>{isAr ? "استكشاف برامج جديدة" : "Explore New Tours"}</span>
          </Button>
        </Link>
      </motion.div>

      {/* 3 Quick Cards Grid with Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}
      >
        {/* Next Trip Hero Card */}
        <motion.div
          variants={itemVariants}
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            borderRadius: "var(--radius-2xl)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "var(--color-gold-heading)", fontWeight: 800, background: "rgba(200,169,110,0.12)", padding: "2px 8px", borderRadius: "4px" }}>
                {isAr ? "رحلتك القادمة المؤكدة" : "Confirmed Upcoming Trip"}
              </span>
              <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                <ShieldCheckIcon size={14} />
                <span>{isAr ? "ضمان Escrow" : "Escrow Guaranteed"}</span>
              </span>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 900, margin: "10px 0 4px 0" }}>
              {isAr ? "جولة مدائن صالح والبلدة القديمة بالعلا" : "Hegra UNESCO Tombs & AlUla Old Town"}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
              {isAr ? "المرشد:" : "Guide:"} <strong>{isAr ? "عبد العزيز الشمري" : "Abdulaziz Al-Shammari"}</strong> • 📅 {isAr ? "الخميس، 24 أكتوبر 2026" : "Thursday, Oct 24, 2026"}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
              {formattedTripPrice} ({isAr ? "2 مشاركين" : "2 Travelers"})
            </span>
            <Link href="/client/bookings/book-101">
              <Button variant="primary" size="sm">{isAr ? "تفاصيل التذكرة" : "Ticket Details"}</Button>
            </Link>
          </div>
        </motion.div>

        {/* Wishlist Summary Card */}
        <motion.div
          variants={itemVariants}
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 700 }}>{isAr ? "قائمة الرغبات" : "Wishlist"}</span>
              <StarIcon size={16} color="var(--color-gold-heading)" />
            </div>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-gold-heading)", margin: "8px 0 4px 0" }}>
              {isAr ? "4 برامج" : "4 Tours"}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
              {isAr ? "محفوظة للتخطيط وحجز عطلات نهاية الأسبوع القادمة" : "Saved for upcoming weekend itineraries"}
            </p>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
            <Link href="/client/wishlist" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 800 }}>
              {isAr ? "استعراض المفضلة والحجز ←" : "Browse Wishlist & Book →"}
            </Link>
          </div>
        </motion.div>

        {/* Payments Summary Card */}
        <motion.div
          variants={itemVariants}
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 700 }}>{isAr ? "إجمالي المدفوعات" : "Total Payments"}</span>
              <CreditCardIcon size={16} color="#10B981" />
            </div>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-saudi-green)", margin: "8px 0 4px 0" }}>
              {formattedTripPrice}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
              {isAr ? "فواتير ضريبية صادرة ومحمية بحساب الضمان" : "Tax invoices issued under Escrow hold"}
            </p>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
            <Link href="/client/payments" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 800 }}>
              {isAr ? "عرض الفواتير الضريبية PDF ←" : "View Tax Invoices PDF →"}
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Action Hub */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
        {/* Active Chats Preview */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, margin: 0 }}>{isAr ? "محادثاتك مع المرشدين" : "Chats with Local Guides"}</h3>
            <Link href="/client/messages" style={{ fontSize: "12px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              {isAr ? "فتح مركز المراسلات ←" : "Open Message Center →"}
            </Link>
          </div>

          <div style={{ background: "var(--color-bg-secondary)", padding: "12px 14px", borderRadius: "12px", border: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 800, margin: 0 }}>{isAr ? "عبد العزيز الشمري (مرشد العلا)" : "Abdulaziz Al-Shammari (AlUla Guide)"}</h4>
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                {isAr ? "أهلاً بك! تم تأكيد نقطة التجمع عند فندق صحارى العلا الساعة 8:00 ص." : "Welcome! Meeting point confirmed at Sahary AlUla Hotel at 8:00 AM."}
              </p>
            </div>
            <Link href="/client/messages">
              <Button variant="outline" size="sm">
                <MessageSquareIcon size={14} />
                <span>{isAr ? "رد" : "Reply"}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Travel Tips & Escrow Security Notice */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <ShieldCheckIcon size={18} color="#10B981" />
              <h3 style={{ fontSize: "15px", fontWeight: 800, margin: 0 }}>{isAr ? "أمانك المالي مع رفيق Escrow" : "Your Security with Rafeeq Escrow"}</h3>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.5", margin: 0 }}>
              {isAr
                ? "جميع مبالغ حجزك تبقى محفوظة في حساب الضمان البنكي المحمي حتى تكتمل الرحلة وتمنح تقييمك للمرشد. لا يتم تحويل أي مبلغ للمرشد إلا بعد إتمام الخدمة بنجاح."
                : "All booking funds remain held in protected Escrow until your trip is completed. Funds are only released to the guide after verified completion."}
            </p>
          </div>

          <div style={{ marginTop: "12px" }}>
            <Link href="/about" style={{ fontSize: "11px", color: "var(--color-gold-royal)", fontWeight: 700 }}>
              {isAr ? "قراءة شروط وسياسة الضمان المالي ←" : "Read Escrow Policy & Terms →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
