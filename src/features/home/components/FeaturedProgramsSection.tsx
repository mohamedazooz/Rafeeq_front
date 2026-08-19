"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/design-system/primitives";
import { cardHoverVariants } from "@/design-system/motion/variants";

export const FEATURED_PROGRAMS = [
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
    guideName: "عبد العزيز الشمري",
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
    guideName: "سعود الدوسري",
  },
  {
    id: "prog-jeddah-1",
    title: "جولة تاريخية في حارة البلد والرواشين القديمة بجدة",
    location: "جدة",
    duration: "4 ساعات",
    groupSize: "حتى 8 أشخاص",
    rating: 4.95,
    reviewsCount: 56,
    priceSar: 300,
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    badge: "ثقافي وتراثي",
    guideName: "منى الغامدي",
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
    badge: "فاخر وحصري",
    guideName: "تركي العتيبي",
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
    guideName: "فاطمة عسيري",
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
    guideName: "خالد الحربي",
  },
];

export const FeaturedProgramsSection: React.FC = () => {
  return (
    <section style={{ paddingBlock: "4rem 5rem", background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "var(--color-saudi-green)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              تجارب استثنائية معتمدة
            </span>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
              أفضل البرامج السياحية المختارة
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
            <span>استعراض كافة البرامج</span>
            <span>←</span>
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
          {FEATURED_PROGRAMS.map((prog) => (
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
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "0.85rem",
                    right: "0.85rem",
                    background: "rgba(13, 27, 42, 0.8)",
                    backdropFilter: "blur(8px)",
                    color: "var(--color-gold-royal)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.25rem 0.65rem",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                  }}
                >
                  {prog.badge}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "0.85rem",
                    right: "0.85rem",
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
                  📍 {prog.location}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Rating & Guide */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                    <span>المرشد:</span>
                    <strong style={{ color: "var(--color-text-primary)" }}>{prog.guideName}</strong>
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
                  {prog.title}
                </h3>

                {/* Trip Specs */}
                <div style={{ display: "flex", gap: "0.75rem", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
                  <span>⏱ {prog.duration}</span>
                  <span>•</span>
                  <span>👥 {prog.groupSize}</span>
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
                      السعر للشخص
                    </span>
                    <span style={{ fontSize: "var(--text-lg)", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                      {prog.priceSar} ر.س
                    </span>
                  </div>

                  <Link href={`/programs/${prog.id}`}>
                    <Button variant="primary" size="sm">
                      تفاصيل الحجز
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
