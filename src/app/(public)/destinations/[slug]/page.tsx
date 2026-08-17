import Image from "next/image";
import Link from "next/link";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

interface DestinationDetail {
  readonly slug: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly region: string;
  readonly videoUrl?: string;
  readonly heroImage: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly travelTips: readonly string[];
}

const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  alula: {
    slug: "alula",
    nameAr: "العلا",
    nameEn: "AlUla",
    region: "منطقة المدينة المنورة",
    videoUrl: "/media/destinations/alula/videos/01-alula-vid-6d2154a9.mp4",
    heroImage: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    description: "تعتبر العلا من أقدم المحافظات في شبه الجزيرة العربية وموطناً لمقابر الحجر (مدائن صالح) أول موقع تراث عالمي لليونسكو في السعودية. تمتاز بتكويناتها الصخرية الفريدة مثل صخرة الفيل ومسرح مرايا وعراقتها التاريخية.",
    highlights: [
      "زيارة المقابر النبطية المنحوتة في صخور الحجر (مدائن صالح)",
      "جولة بين التكوينات الصخرية الفريدة وصخرة الفيل الشهيرة",
      "تجربة مرايا — أكبر مبنى مغطى بالمرايا في العالم",
      "الاستمتاع بتجربة المراقبة الفلكية وتأمل النجوم في الصحراء",
    ],
    travelTips: [
      "أفضل وقت للزيارة: من أكتوبر إلى أبريل لحرارة معتدلة وأجواء عليلة.",
      "احرص على حجز التذاكر والرحلات الموجهة مسبقاً قبل سفرك.",
      "ارتدِ ملابس وأجهزة مشي مريحة ومناسبة للمناطق الصخرية والرمالية.",
    ],
  },
  riyadh: {
    slug: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    region: "منطقة الرياض",
    videoUrl: "/media/destinations/riyadh/videos/01-riyadh-summer-f334bff8.mp4",
    heroImage: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    description: "عاصمة المملكة العربية السعودية ومركزها المالي والثقافي. تجمع بين التراث التليد في قصر المصمك وحي الطريف بالدرعية، وبين النهضة العصرية في مركز الملك عبد الله المالي (KAFD) وفعاليات موسم الرياض.",
    highlights: [
      "جولة تاريخية في قصر المصمك وسوق الزل القديم",
      "زيارة الدرعية التاريخية وحي الطريف المسجل لدى اليونسكو",
      "استكشاف مركز الملك عبد الله المالي والافتتاحات الفاخرة",
      "رحلة سفاري وكشتة صحراوية في نفود الثمامة وعين الهيت",
    ],
    travelTips: [
      "مواسم الشتاء والربيع مثالية للكشتات والفعاليات المفتوحة.",
      "تتوفر مواصلات حديثة تشمل حافلات وقطار الرياض بالإضافة للتطبيقات.",
      "جرّب الأكلات النجدية الأصلية مثل الجريش والمطازيز في المطاعم التراثية.",
    ],
  },
  jeddah: {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    region: "منطقة مكة المكرمة",
    videoUrl: "/media/destinations/jeddah/videos/01-jeddah-summer-vid-551b49dc.mp4",
    heroImage: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    description: "عروس البحر الأحمر والميناء التاريخي لضيوف الرحمن. تتميز بحي البلد التاريخي بشوارعه ورواشينه الرائعة، وبكورنيش جدة الفاخر والمجسمات الفنية ومطاعم الأسماك الشهية.",
    highlights: [
      "جولة بين الرواشين في حارة البلد التراثية ومتحف بيت نصيف",
      "الاستمتاع بنزهة على كورنيش جدة الواجهة البحرية",
      "رحلات الغوص وتأمل الشعاب المرجانية في جزيرة بياضة",
      "زيارة نادي اليخوت وحلبة كورنيش جدة للفورمولا 1",
    ],
    travelTips: [
      "أجواء جدة دافئة ولطيفة طوال العام وخاصة في فصل الشتاء.",
      "استمتع بتذوق السقاط والأسماك الطازجة في مرسى الأندلس أو البنقلة.",
      "تعتبر جولتك في البلد التاريخية أفضل في الفترة المسائية وقبل المغرب.",
    ],
  },
};

export default async function SingleDestinationPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = DESTINATION_DETAILS[slug] ?? DESTINATION_DETAILS["alula"];

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          minHeight: "480px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "calc(var(--header-height) + var(--space-4))", right: "var(--space-8)", zIndex: 10 }}>
          <BackButton fallbackHref="/destinations" labelAr="العودة للوجهات" />
        </div>
        {dest.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={dest.heroImage}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={dest.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={dest.heroImage}
            alt={dest.nameAr}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.85) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "var(--space-12)" }}>
          <span
            style={{
              padding: "var(--space-1) var(--space-4)",
              background: "var(--gradient-gold)",
              color: "var(--color-midnight-blue)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              borderRadius: "var(--radius-full)",
              display: "inline-block",
              marginBottom: "var(--space-3)",
            }}
          >
            {dest.region}
          </span>
          <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-6xl)", fontWeight: 800 }}>
            {dest.nameAr}
          </h1>
          <p style={{ color: "var(--color-gold-light)", fontSize: "var(--text-xl)", fontWeight: 500 }}>
            {dest.nameEn}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-12)" }}>
            <div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
                عن {dest.nameAr}
              </h2>
              <p style={{ fontSize: "var(--text-lg)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-8)" }}>
                {dest.description}
              </p>

              <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-4)" }}>
                🌟 أبرز التجارب المعالم
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
                {dest.highlights.map((h) => (
                  <li key={h} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--text-base)", color: "var(--color-text-primary)" }}>
                    <span style={{ color: "var(--color-saudi-green)", fontWeight: 800 }}>✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Tips Sidebar */}
            <div>
              <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-gold-royal)", marginBottom: "var(--space-4)" }}>
                  💡 نصائح للمسافر
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {dest.travelTips.map((tip) => (
                    <p key={tip} style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-normal)" }}>
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs in this destination */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
            <div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>
                برامج سياحية في <span className="text-gradient">{dest.nameAr}</span>
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                احجز رحلتك مباشرة مع المرشد السياحي المعتمد
              </p>
            </div>
            <Link href="/programs">
              <Button variant="outline" size="sm">
                عرض جميع البرامج
              </Button>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            <ProgramCard
              id="prog-1"
              title={`جولة استكشافية متكاملة في ${dest.nameAr}`}
              location={dest.nameAr}
              duration="يوم كامل (7 ساعات)"
              groupSize="حتى 8 أشخاص"
              rating={4.9}
              reviewsCount={34}
              priceSar={650}
              image={dest.heroImage}
              badge="مميز"
            />
            <ProgramCard
              id="prog-2"
              title={`تجربة التراث والطبيعة في ${dest.nameAr}`}
              location={dest.nameAr}
              duration="5 ساعات"
              groupSize="حتى 5 أشخاص"
              rating={4.8}
              reviewsCount={22}
              priceSar={450}
              image={dest.heroImage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
