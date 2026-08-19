"use client";

import React, { use } from "react";
import Image from "next/image";
import { BackButton } from "@/components/ui/BackButton";
import { ProgramBookingSidebar } from "@/features/programs/components/ProgramBookingSidebar";
import { useLanguage } from "@/lib/language-provider";

interface ProgramDetail {
  readonly id: string;
  readonly titleAr: string;
  readonly titleEn: string;
  readonly locationAr: string;
  readonly locationEn: string;
  readonly durationTextAr: string;
  readonly durationTextEn: string;
  readonly groupSizeTextAr: string;
  readonly groupSizeTextEn: string;
  readonly priceSar: number;
  readonly priceHalalas: bigint;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly images: readonly string[];
  readonly descriptionAr: string;
  readonly descriptionEn: string;
  readonly guide: {
    readonly id: string;
    readonly nameAr: string;
    readonly nameEn: string;
    readonly titleAr: string;
    readonly titleEn: string;
    readonly avatar: string;
    readonly rating: number;
    readonly tripsCount: number;
  };
  readonly itinerary: readonly {
    readonly step: number;
    readonly titleAr: string;
    readonly titleEn: string;
    readonly descAr: string;
    readonly descEn: string;
  }[];
  readonly inclusionsAr: readonly string[];
  readonly inclusionsEn: readonly string[];
  readonly exclusionsAr: readonly string[];
  readonly exclusionsEn: readonly string[];
}

const MOCK_PROGRAMS: Record<string, ProgramDetail> = {
  "prog-alula-1": {
    id: "prog-alula-1",
    titleAr: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
    titleEn: "Comprehensive Historic Tour of Hegra UNESCO Site & AlUla Old Town",
    locationAr: "العلا — المنطقة الشمالية الغربية",
    locationEn: "AlUla — Northwestern Province",
    durationTextAr: "يومان (8 ساعات مع استراحات)",
    durationTextEn: "2 Days (8 hours with rest intervals)",
    groupSizeTextAr: "من 1 إلى 6 مشاركين",
    groupSizeTextEn: "1 to 6 Participants",
    priceSar: 850,
    priceHalalas: BigInt(85000),
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
      "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
      "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    ],
    descriptionAr: "انضم إلينا في تجربة تاريخية واستثنائية لعجائب العلا التراثية والطبيعية. تشمل هذه الجولة زيارة حصن الحِجر (مدائن صالح)، والتجول في أزقة البلدة القديمة التراثية، بالإضافة إلى جلسة تأمل النجوم تحت سماء العلا الصافية مع الضيافة السعودية الأصيلة.",
    descriptionEn: "Join us on an extraordinary heritage journey exploring the wonders of AlUla. This tour includes the UNESCO Hegra tombs, ancient Dadan inscriptions, AlUla Old Town, and evening stargazing under pristine desert skies with authentic Saudi hospitality.",
    guide: {
      id: "guide-1",
      nameAr: "عبد العزيز الشمري",
      nameEn: "Abdulaziz Al-Shammari",
      titleAr: "مرشد سياحي معتمد متخصص في آثار وتاريخ العلا",
      titleEn: "Ministry of Tourism Certified Guide specializing in AlUla Archaeology",
      avatar: "/media/brand/avatar-guide.jpg",
      rating: 4.95,
      tripsCount: 128,
    },
    itinerary: [
      { step: 1, titleAr: "الاستقبال والضيافة السعودية", titleEn: "Welcome & Authentic Saudi Hospitality", descAr: "الالتقاء في نقطة التجمع وتناول القهوة السعودية والتمر وتوزيع الإرشادات.", descEn: "Meeting at rendezvous point, tasting Saudi coffee & dates, and safety briefing." },
      { step: 2, titleAr: "استكشاف مدائن صالح (الحِجر)", titleEn: "Hegra UNESCO Archaeological Exploration", descAr: "جولة موجهة لمقابر الأنباط الأثرية مع شرح مفصل عن تاريخ ونقوش العصر النبطي.", descEn: "Guided tour of rock-carved royal tombs and monumental Nabataean architecture." },
      { step: 3, titleAr: "البلدة القديمة ومسرح مرايا", titleEn: "AlUla Old Town & Maraya Concert Hall", descAr: "التجول في أسواق البلدة القديمة والتعرف على المنتجات اليدوية وتأمل المسرح الزجاجي مرايا.", descEn: "Walking through heritage mud-brick alleys and admiring the mirrored Maraya building." },
      { step: 4, titleAr: "عشاء صحراوي وتأمل النجوم", titleEn: "Desert Camp Dinner & Stargazing", descAr: "عشاء تقليدي في المخيم الصحراوي ومراقبة النجوم بالمنظار الفلكي تحت سماء العلا.", descEn: "Traditional Bedouin dinner and telescope-guided celestial stargazing under desert skies." },
    ],
    inclusionsAr: [
      "مرشد سياحي سعودي مرخص ومعتمد من وزارة السياحة",
      "سيارة دفع رباعي حديثة ومكيفة للتنقلات طوال الجولة",
      "تذاكر دخول كافة المواقع الأثرية ومسرح مرايا",
      "وجبة عشاء تقليدية وضيافة قهوة وشاي ومياه نقية",
    ],
    inclusionsEn: [
      "Ministry of Tourism Officially Licensed Saudi Tour Guide",
      "Modern Air-Conditioned 4x4 SUV Transportation throughout the tour",
      "Entry permits & tickets to all archaeological sites and Maraya",
      "Traditional dinner, Saudi coffee, dates, and bottled refreshments",
    ],
    exclusionsAr: [
      "تذاكر الطيران إلى العلا",
      "الإقامة الفندقية (تتوفر خيارات ترشيح)",
      "المشتريات الشخصية والهدايا",
    ],
    exclusionsEn: [
      "Flight tickets to/from AlUla",
      "Hotel accommodation (recommendations provided)",
      "Personal purchases and souvenirs",
    ],
  },
};

export default function ProgramDetailPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isAr, t } = useLanguage();

  const prog = MOCK_PROGRAMS[id] || MOCK_PROGRAMS["prog-alula-1"];

  const title = isAr ? prog.titleAr : prog.titleEn;
  const location = isAr ? prog.locationAr : prog.locationEn;
  const durationText = isAr ? prog.durationTextAr : prog.durationTextEn;
  const groupSizeText = isAr ? prog.groupSizeTextAr : prog.groupSizeTextEn;
  const description = isAr ? prog.descriptionAr : prog.descriptionEn;
  const guideName = isAr ? prog.guide.nameAr : prog.guide.nameEn;
  const guideTitle = isAr ? prog.guide.titleAr : prog.guide.titleEn;
  const inclusions = isAr ? prog.inclusionsAr : prog.inclusionsEn;
  const exclusions = isAr ? prog.exclusionsAr : prog.exclusionsEn;

  return (
    <>
      {/* Hero Image Gallery */}
      <section style={{ paddingTop: "var(--header-height)", background: "var(--color-midnight-blue)", position: "relative" }}>
        <div style={{ position: "absolute", top: "calc(var(--header-height) + var(--space-4))", [isAr ? "right" : "left"]: "var(--space-8)", zIndex: 10 }}>
          <BackButton fallbackHref="/programs" labelAr="العودة للبرامج" labelEn="Back to Programs" />
        </div>
        <div style={{ position: "relative", width: "100%", height: "450px" }}>
          <Image
            src={prog.images[0]}
            alt={title}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr)) 380px", gap: "var(--space-12)", alignItems: "start" }}>
            {/* Left Content */}
            <div>
              <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-dark)", fontWeight: 600 }}>📍 {location}</span>
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>⭐ {prog.rating} ({prog.reviewsCount} {t.programDetails.reviewsCount})</span>
              </div>

              <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-6)", lineHeight: "var(--leading-tight)" }}>
                {title}
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
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{t.programDetails.duration}</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{durationText}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{t.programDetails.groupSize}</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{groupSizeText}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{t.programDetails.languages}</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{isAr ? "العربية / الإنجليزية" : "Arabic / English"}</span>
                </div>
              </div>

              {/* Guide Card */}
              <div
                style={{
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-8)",
                }}
              >
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--color-gold-royal)", flexShrink: 0 }}>
                  <Image src={prog.guide.avatar} alt={guideName} width={60} height={60} style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-saudi-green)", fontWeight: 700 }}>
                    ✓ {t.programDetails.verifiedGuideBadge}
                  </span>
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "2px 0" }}>
                    {guideName}
                  </h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0 }}>
                    {guideTitle} • ★ {prog.guide.rating} ({prog.guide.tripsCount} {isAr ? "رحلة منجزة" : "completed tours"})
                  </p>
                </div>
              </div>

              {/* Description */}
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-3)" }}>{t.programDetails.description}</h2>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-10)" }}>
                {description}
              </p>

              {/* Itinerary Timeline */}
              <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-6)" }}>📋 {t.programDetails.itinerary}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
                {prog.itinerary.map((step) => {
                  const stepTitle = isAr ? step.titleAr : step.titleEn;
                  const stepDesc = isAr ? step.descAr : step.descEn;

                  return (
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
                        <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-1)" }}>{stepTitle}</h3>
                        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-normal)" }}>{stepDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inclusions & Exclusions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
                <div style={{ background: "rgba(0, 108, 53, 0.05)", padding: "var(--space-5)", borderRadius: "var(--radius-xl)", border: "1px solid rgba(0, 108, 53, 0.15)" }}>
                  <h3 style={{ color: "var(--color-saudi-green)", fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                    ✓ {t.programDetails.inclusions}
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-sm)", padding: 0, listStyle: "none" }}>
                    {inclusions.map((inc) => (
                      <li key={inc}>• {inc}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "rgba(220, 53, 69, 0.05)", padding: "var(--space-5)", borderRadius: "var(--radius-xl)", border: "1px solid rgba(220, 53, 69, 0.15)" }}>
                  <h3 style={{ color: "var(--color-error)", fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                    ✕ {t.programDetails.exclusions}
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-sm)", padding: 0, listStyle: "none" }}>
                    {exclusions.map((exc) => (
                      <li key={exc}>• {exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Booking & Escrow */}
            <div>
              <ProgramBookingSidebar
                programId={prog.id}
                priceSar={prog.priceSar}
                priceHalalas={prog.priceHalalas}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
