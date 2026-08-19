"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/design-system/motion/variants";
import { useLanguage } from "@/lib/language-provider";

export const DESTINATIONS_DATA = [
  {
    slug: "alula",
    nameAr: "العلا",
    nameEn: "AlUla",
    regionAr: "المنطقة الشمالية الغربية",
    regionEn: "Northwestern Region",
    badgeAr: "موقع يونسكو",
    badgeEn: "UNESCO Site",
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    tripsCount: 14,
    descriptionAr: "عاصمة الآثار النبطية ومدائن صالح وواحات النخيل الساحرة.",
    descriptionEn: "Capital of ancient Nabataean civilizations, Hegra tombs, and scenic date palm oases.",
  },
  {
    slug: "riyadh",
    nameAr: "الرياض والدرعية",
    nameEn: "Riyadh & Diriyah",
    regionAr: "منطقة نجد",
    regionEn: "Najd Region",
    badgeAr: "عاصمة الأصالة والمستقبل",
    badgeEn: "Capital of Heritage",
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    tripsCount: 22,
    descriptionAr: "قصور الدرعية التاريخية وحافة العالم ومغامرات سفاري نجد.",
    descriptionEn: "Historic Diriyah castles, Edge of the World cliffs, and exhilarating Najd desert safaris.",
  },
  {
    slug: "jeddah",
    nameAr: "جدة التاريخية",
    nameEn: "Historic Jeddah",
    regionAr: "المنطقة الغربية",
    regionEn: "Western Province",
    badgeAr: "عروس البحر الأحمر",
    badgeEn: "Bride of the Red Sea",
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    tripsCount: 18,
    descriptionAr: "حارة البلد والرواشين التراثية والغوص في الشعب المرجانية.",
    descriptionEn: "Historic Al-Balad coral stone lanes, Rawashin architecture, and pristine reef diving.",
  },
  {
    slug: "the-red-sea",
    nameAr: "وجهة البحر الأحمر وأمالا",
    nameEn: "The Red Sea & Amaala",
    regionAr: "الساحل الغربي",
    regionEn: "West Coastline",
    badgeAr: "سياحة بيئية فاخرة",
    badgeEn: "Ultra-Luxury Eco-Tourism",
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    tripsCount: 9,
    descriptionAr: "منتجعات الجزر البكر والتجارب البحرية الاستثنائية.",
    descriptionEn: "Pristine island archipelago resorts and regenerative luxury marine explorations.",
  },
  {
    slug: "aseer",
    nameAr: "عسير والسودة",
    nameEn: "Aseer & Soodah Peaks",
    regionAr: "المنطقة الجنوبية",
    regionEn: "Southern Highlands",
    badgeAr: "قمم وضباب وضيافة",
    badgeEn: "Mountain Mist & Peaks",
    image: "/media/destinations/aseer/aseer-banner.jpg",
    tripsCount: 12,
    descriptionAr: "أعلى قمم المملكة، قرية رجال ألمع التراثية والأجواء الماطرة.",
    descriptionEn: "Highest peaks in Saudi Arabia, historic Rijal Almaa gingerbread village, and crisp climate.",
  },
  {
    slug: "al-ahsa",
    nameAr: "واحة الأحساء",
    nameEn: "Al Ahsa Oasis",
    regionAr: "المنطقة الشرقية",
    regionEn: "Eastern Province",
    badgeAr: "أكبر واحة نخيل بالعالم",
    badgeEn: "World's Largest Oasis",
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    tripsCount: 8,
    descriptionAr: "جبل القارة وكهوفه الباردة، قصر إبراهيم وسوق القيصرية.",
    descriptionEn: "Al Qarah mountain labyrinth caves, historic Ibrahim Palace, and Al Qaisariyah Souq.",
  },
];

export const DestinationsShowcase: React.FC = () => {
  const { isAr, t } = useLanguage();

  return (
    <section style={{ paddingBlock: "5rem 4rem" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              {t.home.destinations.badge}
            </span>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
              {t.home.destinations.title}
            </h2>
          </div>
          <Link
            href="/destinations"
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
            <span>{isAr ? `استعراض كافة الوجهات (${DESTINATIONS_DATA.length})` : `Browse All Destinations (${DESTINATIONS_DATA.length})`}</span>
            <span>{isAr ? "←" : "→"}</span>
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {DESTINATIONS_DATA.map((dest) => {
            const name = isAr ? dest.nameAr : dest.nameEn;
            const region = isAr ? dest.regionAr : dest.regionEn;
            const badge = isAr ? dest.badgeAr : dest.badgeEn;
            const desc = isAr ? dest.descriptionAr : dest.descriptionEn;

            return (
              <motion.div
                key={dest.slug}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-secondary)",
                  position: "relative",
                }}
              >
                <Link href={`/destinations/${dest.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {/* Image Container */}
                  <div style={{ position: "relative", height: "240px", width: "100%" }}>
                    <Image
                      src={dest.image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)",
                      }}
                    />

                    {/* Badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "1rem",
                        [isAr ? "right" : "left"]: "1rem",
                        background: "rgba(13, 27, 42, 0.8)",
                        backdropFilter: "blur(8px)",
                        color: "var(--color-gold-royal)",
                        border: "1px solid rgba(200, 169, 110, 0.3)",
                        borderRadius: "var(--radius-full)",
                        padding: "0.25rem 0.75rem",
                        fontSize: "var(--text-xs)",
                        fontWeight: 700,
                      }}
                    >
                      {badge}
                    </span>

                    {/* Bottom Image Info */}
                    <div style={{ position: "absolute", bottom: "1rem", right: "1rem", left: "1rem" }}>
                      <span style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.75)" }}>
                        {region}
                      </span>
                      <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                        {name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0, maxWidth: "75%" }}>
                      {desc}
                    </p>
                    <span
                      style={{
                        background: "rgba(0, 108, 53, 0.1)",
                        color: "var(--color-saudi-green)",
                        borderRadius: "var(--radius-full)",
                        padding: "0.3rem 0.65rem",
                        fontSize: "var(--text-xs)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dest.tripsCount} {isAr ? "تجربة" : "tours"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
