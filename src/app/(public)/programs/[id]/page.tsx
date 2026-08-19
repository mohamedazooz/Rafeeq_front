import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { ProgramBookingSidebar } from "@/features/programs/components/ProgramBookingSidebar";

interface ProgramDetail {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly durationText: string;
  readonly groupSizeText: string;
  readonly priceSar: number;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly images: readonly string[];
  readonly description: string;
  readonly guide: {
    readonly id: string;
    readonly name: string;
    readonly title: string;
    readonly avatar: string;
    readonly rating: number;
    readonly tripsCount: number;
  };
  readonly itinerary: readonly {
    readonly step: number;
    readonly title: string;
    readonly desc: string;
  }[];
  readonly inclusions: readonly string[];
  readonly exclusions: readonly string[];
}

const MOCK_PROGRAM: ProgramDetail = {
  id: "prog-alula-history",
  title: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
  location: "العلا — المنطقة الشمالية الغربية",
  durationText: "يومان (8 ساعات مع استراحات)",
  groupSizeText: "من 1 إلى 6 مشاركين",
  priceSar: 850,
  rating: 4.9,
  reviewsCount: 42,
  images: [
    "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
  ],
  description: "انضم إلينا في تجربة تاريخية واستثنائية لعجائب العلا التراثية والطبيعية. تشمل هذه الجولة زيارة حصن الحِجر (مدائن صالح)، والتجول في أزقة البلدة القديمة التراثية، بالإضافة إلى جلسة تأمل النجوم تحت سماء العلا الصافية مع الضيافة السعودية الأصيلة.",
  guide: {
    id: "guide-1",
    name: "عبد العزيز الشمري",
    title: "مرشد سياحي معتمد متخصص في آثار العلا",
    avatar: "/media/brand/avatar-guide.jpg",
    rating: 4.95,
    tripsCount: 128,
  },
  itinerary: [
    { step: 1, title: "التجمع والضيافة", desc: "الالتقاء في نقطة التجمع في العلا وتناول القهوة السعودية والتمر وتوزيع الإرشادات." },
    { step: 2, title: "زيارة مدائن صالح (الحجر)", desc: "جولة استكشافية موجهة لمقابر الأنباط الأثرية مع شرح مفصل عن تاريخ ونقوش العصر النبطي." },
    { step: 3, title: "البلدة القديمة ومسرح مرايا", desc: "التجول في أسواق البلدة القديمة والتعرف على المنتجات اليدوية وتأمل المسرح الزجاجي مرايا." },
    { step: 4, title: "جلسة العشاء والتأمل النجوم", desc: "عشاء تقليدي في المخيم الصحراوي ومراقبة النجوم بالمنظار الفلكي." },
  ],
  inclusions: [
    "مرشد سياحي سعودي مرخص معتمد",
    "سيارة دفع رباعي حديثة ومكيفة للتنقلات",
    "تذاكر دخول كافة المواقع الأثرية ومسرح مرايا",
    "وجبة عشاء تقليدية وضيافة قهوة وشاي ومياه",
  ],
  exclusions: [
    "تذاكر الطيران إلى العلا",
    "الإقامة الفندقية (تتوفر خيارات ترشيح)",
    "المشتريات الشخصية والهدايا",
  ],
};

export default async function ProgramDetailPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prog = MOCK_PROGRAM; // Bound dynamically in API client

  return (
    <>

      {/* Hero Image Slider / Gallery */}
      <section style={{ paddingTop: "var(--header-height)", background: "var(--color-midnight-blue)", position: "relative" }}>
        <div style={{ position: "absolute", top: "calc(var(--header-height) + var(--space-4))", right: "var(--space-8)", zIndex: 10 }}>
          <BackButton fallbackHref="/programs" labelAr="العودة للبرامج" />
        </div>
        <div style={{ position: "relative", width: "100%", height: "450px" }}>
          <Image
            src={prog.images[0]}
            alt={prog.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,27,42,0.9) 100%)" }} />
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-12)" }}>
            {/* Left Content */}
            <div>
              <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-dark)", fontWeight: 600 }}>📍 {prog.location}</span>
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>⭐ {prog.rating} ({prog.reviewsCount} تقييم)</span>
              </div>

              <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-6)", lineHeight: "var(--leading-tight)" }}>
                {prog.title}
              </h1>

              {/* Quick Specs */}
              <div
                className="glass"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "var(--space-4)",
                  padding: "var(--space-5)",
                  borderRadius: "var(--radius-xl)",
                  marginBottom: "var(--space-8)",
                  textAlign: "center",
                }}
              >
                <div>
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>المدة</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{prog.durationText}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>حجم المجموعة</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{prog.groupSizeText}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>اللغة</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>العربية / الإنجليزية</span>
                </div>
              </div>

              {/* Description */}
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-3)" }}>وصف التجربة</h2>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-10)" }}>
                {prog.description}
              </p>

              {/* Itinerary Timeline */}
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-6)" }}>📋 مسار الرحلة</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
                {prog.itinerary.map((step) => (
                  <div key={step.step} style={{ display: "flex", gap: "var(--space-4)" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--gradient-gold)",
                        color: "var(--color-midnight-blue)",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-1)" }}>{step.title}</h3>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-normal)" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inclusions & Exclusions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
                <div style={{ background: "rgba(0, 108, 53, 0.05)", padding: "var(--space-5)", borderRadius: "var(--radius-xl)", border: "1px solid rgba(0, 108, 53, 0.15)" }}>
                  <h3 style={{ color: "var(--color-saudi-green)", fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                    ✓ السعر يشمل
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-sm)" }}>
                    {prog.inclusions.map((inc) => (
                      <li key={inc}>• {inc}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "rgba(220, 53, 69, 0.05)", padding: "var(--space-5)", borderRadius: "var(--radius-xl)", border: "1px solid rgba(220, 53, 69, 0.15)" }}>
                  <h3 style={{ color: "var(--color-error)", fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                    ✕ السعر لا يشمل
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-sm)" }}>
                    {prog.exclusions.map((exc) => (
                      <li key={exc}>• {exc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Guide Profile Card */}
              <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-dark)", fontWeight: 600 }}>المرشد السياحي المسؤول</span>
                  <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginTop: "var(--space-1)" }}>{prog.guide.name}</h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{prog.guide.title}</p>
                </div>
                <Link href={`/guides/${prog.guide.id}`}>
                  <Button variant="outline" size="sm">
                    الملف الشخصي
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Sticky Booking Calculator Widget */}
            <div>
              <ProgramBookingSidebar programId={prog.id} priceSar={prog.priceSar} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
