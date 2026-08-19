"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/design-system/motion/variants";

export const TOP_GUIDES = [
  {
    id: "g-1",
    name: "سعود بن فهد الدوسري",
    location: "الرياض ونجد",
    license: "مرخص من وزارة السياحة #TG-9920",
    rating: 4.95,
    reviewsCount: 68,
    tripsCount: 142,
    avatar: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    specialty: "تاريخ الجزيرة وسفاري نجد",
  },
  {
    id: "g-2",
    name: "منى علي الغامدي",
    location: "جدة والمنطقة الغربية",
    license: "مرخصة رسمياً #TG-8810",
    rating: 4.98,
    reviewsCount: 94,
    tripsCount: 210,
    avatar: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    specialty: "تراث جدة القديمة والجولات الثقافية",
  },
  {
    id: "g-3",
    name: "تركي بن طلال العتيبي",
    location: "العلا وحائل",
    license: "مرخص من الهيئة الملكية #TG-7729",
    rating: 5.0,
    reviewsCount: 45,
    tripsCount: 89,
    avatar: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    specialty: "حضارة الأنباط والنقوش الصخرية",
  },
];

export const TopGuidesSection: React.FC = () => {
  return (
    <section style={{ paddingBlock: "4rem 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              سفراء الكرم والضيافة
            </span>
            <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
              نخبة المرشدين المحليين المعتمدين
            </h2>
          </div>
          <Link
            href="/guides"
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
            <span>استعراض كافة المرشدين</span>
            <span>←</span>
          </Link>
        </div>

        {/* Guides Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {TOP_GUIDES.map((guide) => (
            <motion.div
              key={guide.id}
              variants={cardHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-2xl)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  position: "relative",
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid var(--color-gold-royal)",
                  marginBottom: "1rem",
                }}
              >
                <Image src={guide.avatar} alt={guide.name} fill style={{ objectFit: "cover" }} />
              </div>

              {/* Verified Badge */}
              <span
                style={{
                  background: "rgba(0, 108, 53, 0.1)",
                  color: "var(--color-saudi-green)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  padding: "0.2rem 0.6rem",
                  marginBottom: "0.5rem",
                }}
              >
                ✓ {guide.license}
              </span>

              {/* Name & Specialty */}
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, fontFamily: "var(--font-heading)", margin: "0 0 0.25rem" }}>
                {guide.name}
              </h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: "0 0 1rem" }}>
                📍 {guide.location} • {guide.specialty}
              </p>

              {/* Stats */}
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  background: "var(--color-bg-primary)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>
                    التقييم العام
                  </span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "#F59E0B" }}>
                    ★ {guide.rating} ({guide.reviewsCount})
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>
                    الرحلات المكتملة
                  </span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--color-saudi-green)" }}>
                    {guide.tripsCount} رحلة
                  </span>
                </div>
              </div>

              <Link href={`/guides/${guide.id}`} style={{ width: "100%" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    background: "transparent",
                    border: "1px solid var(--color-border-strong)",
                    borderRadius: "var(--radius-lg)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  استعراض الملف والتجارب
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
