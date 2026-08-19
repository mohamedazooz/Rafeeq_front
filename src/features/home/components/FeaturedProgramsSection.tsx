"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/design-system/primitives";
import { cardHoverVariants } from "@/design-system/motion/variants";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";

export const FEATURED_PROGRAMS = [
  {
    id: "prog-alula-1",
    titleAr: "جولة مدائن صالح وتكوينات الحجر الصخرية في العلا",
    titleEn: "Hegra UNESCO Tombs & Desert Rock Formations in AlUla",
    locationAr: "العلا",
    locationEn: "AlUla",
    durationAr: "يومان (8 ساعات)",
    durationEn: "2 Days (8 hours)",
    groupSizeAr: "حتى 6 أشخاص",
    groupSizeEn: "Up to 6 guests",
    rating: 4.9,
    reviewsCount: 42,
    priceSar: 850,
    priceHalalas: BigInt(85000),
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    badgeAr: "تراث عالمي",
    badgeEn: "UNESCO Heritage",
    guideNameAr: "عبد العزيز الشمري",
    guideNameEn: "Abdulaziz Al-Shammari",
  },
  {
    id: "prog-riyadh-1",
    titleAr: "سفاري صحراء الرياض وجلسة كشتة نجدي أصيلة",
    titleEn: "Riyadh Desert Dune Safari & Authentic Najdi Campfire",
    locationAr: "الرياض",
    locationEn: "Riyadh",
    durationAr: "6 ساعات",
    durationEn: "6 Hours",
    groupSizeAr: "حتى 10 أشخاص",
    groupSizeEn: "Up to 10 guests",
    rating: 4.8,
    reviewsCount: 38,
    priceSar: 450,
    priceHalalas: BigInt(45000),
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    badgeAr: "الأكثر طلباً",
    badgeEn: "Most Popular",
    guideNameAr: "سعود الدوسري",
    guideNameEn: "Saud Al-Dosari",
  },
  {
    id: "prog-jeddah-1",
    titleAr: "جولة تاريخية في حارة البلد والرواشين القديمة بجدة",
    titleEn: "Historic Jeddah Al-Balad & Ancient Coral Architecture Walk",
    locationAr: "جدة",
    locationEn: "Jeddah",
    durationAr: "4 ساعات",
    durationEn: "4 Hours",
    groupSizeAr: "حتى 8 أشخاص",
    groupSizeEn: "Up to 8 guests",
    rating: 4.95,
    reviewsCount: 56,
    priceSar: 300,
    priceHalalas: BigInt(30000),
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    badgeAr: "ثقافي وتراثي",
    badgeEn: "Cultural & Heritage",
    guideNameAr: "منى الغامدي",
    guideNameEn: "Mona Al-Ghamdi",
  },
  {
    id: "prog-redsea-1",
    titleAr: "رحلة غوص فاخرة وتأمل الشعاب المرجانية في البحر الأحمر",
    titleEn: "Luxury Red Sea Coral Reef Diving & Yacht Exploration",
    locationAr: "البحر الأحمر",
    locationEn: "The Red Sea",
    durationAr: "يوم كامل",
    durationEn: "Full Day",
    groupSizeAr: "حتى 4 أشخاص",
    groupSizeEn: "Up to 4 guests",
    rating: 5.0,
    reviewsCount: 19,
    priceSar: 1200,
    priceHalalas: BigInt(120000),
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    badgeAr: "فاخر وحصري",
    badgeEn: "Luxury & Exclusive",
    guideNameAr: "تركي العتيبي",
    guideNameEn: "Turki Al-Otaibi",
  },
  {
    id: "prog-aseer-1",
    titleAr: "مسار المشي الجبلي واستكشاف قرية رجال ألمع في عسير",
    titleEn: "Aseer Mountain Ridge Hiking & Historic Rijal Almaa Tour",
    locationAr: "عسير",
    locationEn: "Aseer",
    durationAr: "7 ساعات",
    durationEn: "7 Hours",
    groupSizeAr: "حتى 8 أشخاص",
    groupSizeEn: "Up to 8 guests",
    rating: 4.85,
    reviewsCount: 27,
    priceSar: 400,
    priceHalalas: BigInt(40000),
    image: "/media/destinations/aseer/aseer-banner.jpg",
    badgeAr: "مغامرة وطبيعة",
    badgeEn: "Nature & Hiking",
    guideNameAr: "فاطمة عسيري",
    guideNameEn: "Fatima Asiri",
  },
  {
    id: "prog-alahsa-1",
    titleAr: "جولة واحة النخيل وجبل القارة التاريخي بالأحساء",
    titleEn: "Al Ahsa Date Palm Oasis & Al Qarah Mountain Caves Walk",
    locationAr: "الأحساء",
    locationEn: "Al Ahsa",
    durationAr: "5 ساعات",
    durationEn: "5 Hours",
    groupSizeAr: "حتى 12 شخص",
    groupSizeEn: "Up to 12 guests",
    rating: 4.9,
    reviewsCount: 31,
    priceSar: 350,
    priceHalalas: BigInt(35000),
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    badgeAr: "واحة يونسكو",
    badgeEn: "UNESCO Oasis",
    guideNameAr: "خالد الحربي",
    guideNameEn: "Khaled Al-Harbi",
  },
];

export const FeaturedProgramsSection: React.FC = () => {
  const { lang, isAr, t } = useLanguage();

  return (
    <section style={{ paddingBlock: "4rem 5rem", background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "var(--color-saudi-green)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              {t.home.featuredPrograms.badge}
            </span>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
              {t.home.featuredPrograms.title}
            </h2>
          </div>
          <Link
            href="/programs"
            style={{
              color: "var(--color-saudi-green)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
            }}
          >
            <span>{t.home.featuredPrograms.viewAllPrograms}</span>
            <span>{isAr ? "←" : "→"}</span>
          </Link>
        </div>

        {/* Programs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {FEATURED_PROGRAMS.map((prog) => {
            const title = isAr ? prog.titleAr : prog.titleEn;
            const location = isAr ? prog.locationAr : prog.locationEn;
            const duration = isAr ? prog.durationAr : prog.durationEn;
            const groupSize = isAr ? prog.groupSizeAr : prog.groupSizeEn;
            const badge = isAr ? prog.badgeAr : prog.badgeEn;
            const guide = isAr ? prog.guideNameAr : prog.guideNameEn;
            const formattedPrice = formatPrice(prog.priceHalalas, lang, true);

            return (
              <motion.div
                key={prog.id}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-primary)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "210px", width: "100%" }}>
                  <Image
                    src={prog.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      [isAr ? "right" : "left"]: "0.85rem",
                      background: "rgba(13, 27, 42, 0.8)",
                      backdropFilter: "blur(8px)",
                      color: "var(--color-gold-royal)",
                      borderRadius: "var(--radius-full)",
                      padding: "0.25rem 0.65rem",
                      fontSize: "var(--text-xs)",
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      [isAr ? "right" : "left"]: "0.85rem",
                      background: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(8px)",
                      color: "#ffffff",
                      borderRadius: "var(--radius-md)",
                      padding: "0.2rem 0.5rem",
                      fontSize: "var(--text-xs)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    📍 {location}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Rating & Guide */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                      <span>{isAr ? "المرشد:" : "Guide:"}</span>
                      <strong style={{ color: "var(--color-text-primary)" }}>{guide}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F59E0B", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                      <span>★</span>
                      <span>{prog.rating}</span>
                      <span style={{ color: "var(--color-text-muted)" }}>({prog.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.4,
                      marginBottom: "0.85rem",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {title}
                  </h3>

                  {/* Trip Specs */}
                  <div style={{ display: "flex", gap: "0.75rem", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
                    <span>⏱ {duration}</span>
                    <span>•</span>
                    <span>👥 {groupSize}</span>
                  </div>

                  {/* Footer Price & CTA */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid var(--color-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>
                        {t.common.perPerson}
                      </span>
                      <span style={{ fontSize: "var(--text-lg)", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                        {formattedPrice}
                      </span>
                    </div>

                    <Link href={`/programs/${prog.id}`}>
                      <Button variant="primary" size="sm">
                        {t.common.details}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
