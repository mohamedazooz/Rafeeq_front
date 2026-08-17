import { ProgramCard, type ProgramCardProps } from "@/components/domain/ProgramCard";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

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
] as const;

export default function ProgramsPage() {
  return (
    <>
      <section
        style={{
          background: "var(--gradient-midnight)",
          paddingBlock: "var(--space-32) var(--space-12)",
          position: "relative",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <span
            style={{
              color: "var(--color-gold-royal)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              display: "block",
              marginBottom: "var(--space-2)",
            }}
          >
            🧭 البرامج السياحية المتاحة
          </span>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: 800,
              color: "var(--color-warm-white)",
              marginBottom: "var(--space-4)",
            }}
          >
            استكشف تجارب سياحية <span className="text-gradient">فريدة لا تُنسى</span>
          </h1>

          {/* Search & Filter Bar */}
          <div
            className="glass"
            style={{
              padding: "var(--space-4)",
              borderRadius: "var(--radius-2xl)",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "var(--space-3)",
              alignItems: "center",
              marginTop: "var(--space-6)",
            }}
          >
            <input
              type="text"
              placeholder="ابحث عن برنامج سياحي أو تجربة..."
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
              }}
            />
            <select
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "#0D1B2A",
                color: "white",
                outline: "none",
              }}
            >
              <option value="">جميع الوجهات</option>
              <option value="alula">العلا</option>
              <option value="riyadh">الرياض</option>
              <option value="jeddah">جدة</option>
              <option value="red-sea">البحر الأحمر</option>
              <option value="aseer">عسير</option>
              <option value="al-ahsa">الأحساء</option>
            </select>

            <select
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "#0D1B2A",
                color: "white",
                outline: "none",
              }}
            >
              <option value="">جميع التصنيفات</option>
              <option value="culture">تراث وثقافة</option>
              <option value="adventure">مغامرة وطبيعة</option>
              <option value="luxury">رفاهية وفاخر</option>
            </select>

            <Button variant="primary" size="md">
              تطبيق البحث 🔍
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
