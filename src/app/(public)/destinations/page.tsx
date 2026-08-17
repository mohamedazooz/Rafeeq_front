import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";

const DESTINATIONS = [
  {
    slug: "alula",
    nameAr: "العلا",
    nameEn: "AlUla",
    region: "منطقة المدينة المنورة",
    description: "متحف مفتوح وتراث عالمي يمتد لآلاف السنين من صخور العُلا العجيبة إلى مدائن صالح.",
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    programsCount: 18,
    badge: "تراث عالمي اليونسكو",
  },
  {
    slug: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    region: "منطقة الرياض",
    description: "عاصمة المملكة الحيوية حيث يلتقي التراث النجدي بالأبراج الحديثة وسفاري الصحراء.",
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    programsCount: 24,
    badge: "العاصمة والترفيه",
  },
  {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    region: "منطقة مكة المكرمة",
    description: "عروس البحر الأحمر وبوابتها التاريخية — من أزقة البلد العتيقة إلى كورنيش جدة الفاخر.",
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    programsCount: 15,
    badge: "ثقافة وبحر",
  },
  {
    slug: "the-red-sea",
    nameAr: "البحر الأحمر",
    nameEn: "The Red Sea",
    region: "الساحل الغربي",
    description: "منتجعات فاخرة وشعاب مرجانية عذراء في أرخبيل الجزر الساحر.",
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    programsCount: 12,
    badge: "سياحة بيئية فاخرة",
  },
  {
    slug: "aseer",
    nameAr: "عسير",
    nameEn: "Aseer",
    region: "منطقة عسير",
    description: "قمم السودة الضبابية وطبيعة قمم الجنوب الساحرة وأزقة رجال ألمع الملونة.",
    image: "/media/destinations/aseer/aseer-banner.jpg",
    programsCount: 10,
    badge: "طبيعة وجبال",
  },
  {
    slug: "al-ahsa",
    nameAr: "الأحساء",
    nameEn: "Al Ahsa",
    region: "المنطقة الشرقية",
    description: "أكبر واحة نخيل مستقلة في العالم وجبل القارة العجيب.",
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    programsCount: 9,
    badge: "واحة تاريخية",
  },
] as const;

export default function DestinationsPage() {
  return (
    <>
      {/* Header Banner */}
      <section
        style={{
          background: "var(--gradient-midnight)",
          paddingBlock: "var(--space-32) var(--space-16)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-6)", textAlign: "right" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              color: "var(--color-gold-royal)",
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              marginBottom: "var(--space-3)",
            }}
          >
            🗺️ وجهات المملكة العربية السعودية
          </div>

          <h1
            style={{
              fontSize: "var(--text-5xl)",
              fontWeight: 800,
              color: "var(--color-warm-white)",
              marginBottom: "var(--space-4)",
            }}
          >
            استكشف <span className="text-gradient">سحر السعودية</span>
          </h1>

          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            اختر وجهتك القادمة واستكشف برامج سياحية يقودها مرشدون محليون معتمدون في كل منطقة.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section style={{ paddingBlock: "var(--space-16)", background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="glass"
                  style={{
                    borderRadius: "var(--radius-2xl)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform var(--duration-normal) var(--ease-out)",
                  }}
                >
                  <div style={{ position: "relative", height: "240px", width: "100%" }}>
                    <Image
                      src={dest.image}
                      alt={dest.nameAr}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 40%, rgba(13,27,42,0.9) 100%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "var(--space-4)",
                        right: "var(--space-4)",
                        padding: "var(--space-1) var(--space-3)",
                        background: "var(--gradient-gold)",
                        color: "var(--color-midnight-blue)",
                        borderRadius: "var(--radius-full)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 800,
                      }}
                    >
                      {dest.badge}
                    </span>
                  </div>

                  <div style={{ padding: "var(--space-6)", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700 }}>
                      {dest.region}
                    </span>
                    <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBlock: "var(--space-2)" }}>
                      {dest.nameAr}
                    </h3>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", flexGrow: 1 }}>
                      {dest.description}
                    </p>
                    <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                        {dest.programsCount} برنامج سياحي متاح
                      </span>
                      <span style={{ color: "var(--color-gold-royal)", fontWeight: 800, fontSize: "var(--text-sm)" }}>
                        استكشف الرحلات ←
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
