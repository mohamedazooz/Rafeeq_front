"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/design-system/motion/variants";

export const DESTINATIONS_DATA = [
  {
    slug: "alula",
    name: "العلا",
    region: "المنطقة الشمالية",
    badge: "موقع يونسكو",
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    tripsCount: 14,
    description: "عاصمة الآثار النبطية ومدائن صالح وواحات النخيل الساحرة.",
  },
  {
    slug: "riyadh",
    name: "الرياض",
    region: "منطقة نجد",
    badge: "عاصمة الأصالة",
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    tripsCount: 22,
    description: "قصور الدرعية التاريخية وحافة العالم ومغامرات سفاري نجد.",
  },
  {
    slug: "jeddah",
    name: "جدة التاريخية",
    region: "المنطقة الغربية",
    badge: "عروس البحر الأحمر",
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    tripsCount: 18,
    description: "حارة البلد والرواشين التراثية والغوص في الشعب المرجانية.",
  },
  {
    slug: "the-red-sea",
    name: "وجهة البحر الأحمر",
    region: "الساحل الغربي",
    badge: "سياحة فاخرة",
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    tripsCount: 9,
    description: "منتجعات الجزر البكر والتجارب البحرية الاستثنائية.",
  },
  {
    slug: "aseer",
    name: "عسير والسودة",
    region: "المنطقة الجنوبية",
    badge: "قمم وضباب",
    image: "/media/destinations/aseer/aseer-banner.jpg",
    tripsCount: 12,
    description: "أعلى قمم المملكة، قرية رجال ألمع التراثية والأجواء الماطرة.",
  },
  {
    slug: "al-ahsa",
    name: "واحة الأحساء",
    region: "المنطقة الشرقية",
    badge: "أكبر واحة نخيل",
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    tripsCount: 8,
    description: "جبل القارة وكهوفه الباردة، قصر إبراهيم وسوق القيصرية.",
  },
];

export const DestinationsShowcase: React.FC = () => {
  return (
    <section style={{ paddingBlock: "5rem 4rem" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              وجهات المملكة الاستثنائية
            </span>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
              استكشف روائع أرض الحضارات
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
            <span>استعراض كافة الوجهات ({DESTINATIONS_DATA.length})</span>
            <span>←</span>
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
          {DESTINATIONS_DATA.map((dest) => (
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
                    alt={dest.name}
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
                      right: "1rem",
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
                    {dest.badge}
                  </span>

                  {/* Bottom Image Info */}
                  <div style={{ position: "absolute", bottom: "1rem", right: "1rem", left: "1rem" }}>
                    <span style={{ fontSize: "var(--text-xs)", color: "rgba(255, 255, 255, 0.75)" }}>
                      {dest.region}
                    </span>
                    <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0, maxWidth: "75%" }}>
                    {dest.description}
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
                    {dest.tripsCount} تجربة
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
