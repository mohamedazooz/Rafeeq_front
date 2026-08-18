"use client";

import { Header } from "@/components/layout/Header";
import { ProgramCard, type ProgramCardProps } from "@/components/domain/ProgramCard";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

const PROGRAMS: readonly ProgramCardProps[] = [
  {
    id: "prog-alula-1",
    title: "جولة مدائن صالح وتكوينات الحجر الصخرية في العلا",
    location: "العلا",
    duration: "يومان (8 ساعات)",
    groupSize: "حتى 6 أشخاص",
    rating: 4.9,
    reviewsCount: 42,
    priceSar: 850,
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    badge: "تراث عالمي",
  },
  {
    id: "prog-riyadh-1",
    title: "سفاري صحراء الرياض وجلسة كشتة نجدي أصيلة",
    location: "الرياض",
    duration: "6 ساعات",
    groupSize: "حتى 10 أشخاص",
    rating: 4.8,
    reviewsCount: 38,
    priceSar: 450,
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    badge: "الأكثر طلبًا",
  },
  {
    id: "prog-jeddah-1",
    title: "جولة تاريخية في حارة البلد والروواشين القديمة بجدة",
    location: "جدة",
    duration: "4 ساعات",
    groupSize: "حتى 8 أشخاص",
    rating: 4.95,
    reviewsCount: 56,
    priceSar: 300,
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    badge: "ثقافي",
  },
  {
    id: "prog-redsea-1",
    title: "رحلة غوص فاخرة وتأمل الشعاب المرجانية في البحر الأحمر",
    location: "البحر الأحمر",
    duration: "يوم كامل",
    groupSize: "حتى 4 أشخاص",
    rating: 5.0,
    reviewsCount: 19,
    priceSar: 1200,
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    badge: "فاخر",
  },
  {
    id: "prog-aseer-1",
    title: "مسار المشي الجبلي واستكشاف قرية رجال ألمع في عسير",
    location: "عسير",
    duration: "7 ساعات",
    groupSize: "حتى 8 أشخاص",
    rating: 4.85,
    reviewsCount: 27,
    priceSar: 400,
    image: "/media/destinations/aseer/aseer-banner.jpg",
    badge: "مغامرة وطبيعة",
  },
  {
    id: "prog-alahsa-1",
    title: "جولة واحة النخيل وجبل القارة التاريخي بالأحساء",
    location: "الأحساء",
    duration: "5 ساعات",
    groupSize: "حتى 12 شخص",
    rating: 4.9,
    reviewsCount: 31,
    priceSar: 350,
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    badge: "واحة يونسكو",
  },
];

export default function ProgramsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <Header />

      <section
        style={{
          background: "var(--color-bg-primary)",
          paddingBlock: "100px 40px",
          position: "relative",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <span
            style={{
              color: "var(--color-gold-heading)",
              fontWeight: 800,
              fontSize: "var(--text-sm)",
              display: "block",
              marginBottom: "var(--space-2)",
            }}
          >
            🧭 {isAr ? "البرامج السياحية المتاحة" : "Available Tour Programs"}
          </span>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: 900,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-4)",
            }}
          >
            {isAr ? "استكشف تجارب سياحية فريدة لا تُنسى" : "Explore Unique & Unforgettable Tours"}
          </h1>

          {/* Search & Filter Bar */}
          <div
            style={{
              padding: "var(--space-4)",
              borderRadius: "var(--radius-2xl)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--space-3)",
              alignItems: "center",
              marginTop: "var(--space-6)",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <input
              type="text"
              placeholder={isAr ? "ابحث عن برنامج سياحي أو تجربة..." : "Search tour program or experience..."}
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <select
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                outline: "none",
              }}
            >
              <option value="">{isAr ? "جميع الوجهات" : "All Destinations"}</option>
              <option value="alula">{isAr ? "العلا" : "AlUla"}</option>
              <option value="riyadh">{isAr ? "الرياض" : "Riyadh"}</option>
              <option value="jeddah">{isAr ? "جدة" : "Jeddah"}</option>
              <option value="red-sea">{isAr ? "البحر الأحمر" : "The Red Sea"}</option>
              <option value="aseer">{isAr ? "عسير" : "Asir"}</option>
              <option value="al-ahsa">{isAr ? "الأحساء" : "Al Ahsa"}</option>
            </select>

            <select
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                outline: "none",
              }}
            >
              <option value="">{isAr ? "جميع التصنيفات" : "All Categories"}</option>
              <option value="culture">{isAr ? "تراث وثقافة" : "Heritage & Culture"}</option>
              <option value="adventure">{isAr ? "مغامرة وطبيعة" : "Adventure & Nature"}</option>
              <option value="luxury">{isAr ? "رفاهية وفاخر" : "Luxury & Resorts"}</option>
            </select>

            <Button variant="primary" size="md">
              {isAr ? "تطبيق البحث" : "Apply Search"}
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section style={{ paddingBlock: "var(--space-16)", background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {PROGRAMS.map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
