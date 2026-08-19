"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/design-system/primitives";
import { springs, fadeInVariants, slideUpVariants } from "@/design-system/motion/variants";

export interface DestinationVideo {
  readonly id: string;
  readonly src: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly badgeAr: string;
  readonly badgeEn: string;
  readonly titleAr: React.ReactNode;
  readonly subtitleAr: string;
  readonly programSlug: string;
}

export const DESTINATION_PLAYLIST: readonly DestinationVideo[] = [
  {
    id: "alula",
    src: "/media/destinations/alula/videos/01-alula-vid-6d2154a9.mp4",
    nameAr: "العلا",
    nameEn: "AlUla",
    badgeAr: "حضارة الأنباط ومدائن صالح",
    badgeEn: "Hegra & Ancient Heritage",
    titleAr: (
      <>
        اكتشف <span style={{ color: "var(--color-gold-royal)" }}>مدائن صالح</span>
        <br />
        وحضارة الأنباط الخالدة بالعلا
      </>
    ),
    subtitleAr: "استكشف مقابر الأنباط النادرة المنحوتة في الصخر وقصر الفريد والبلدة القديمة برفقة مرشد محلي معتمد.",
    programSlug: "alula",
  },
  {
    id: "riyadh",
    src: "/media/destinations/riyadh/videos/01-riyadh-summer-f334bff8.mp4",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    badgeAr: "عاصمة المستقبل وسفاري نجد",
    badgeEn: "Capital & Desert Safari",
    titleAr: (
      <>
        عِش سحر <span style={{ color: "var(--color-gold-royal)" }}>الرياض</span>
        <br />
        بين عراقة نجد وعاصمة المستقبل
      </>
    ),
    subtitleAr: "من قصور الدرعية التاريخية والمصمك إلى كشتات صحراء الثمامة وتأمل النجوم تحت سماء نجد.",
    programSlug: "riyadh",
  },
  {
    id: "jeddah",
    src: "/media/destinations/jeddah/videos/01-jeddah-summer-vid-551b49dc.mp4",
    nameAr: "جدة",
    nameEn: "Jeddah",
    badgeAr: "سحر البلد وعروس البحر الأحمر",
    badgeEn: "Historic Al-Balad & Red Sea",
    titleAr: (
      <>
        استكشف <span style={{ color: "var(--color-gold-royal)" }}>جدة التاريخية</span>
        <br />
        وعروس البحر الأحمر الساحرة
      </>
    ),
    subtitleAr: "تجوّل في حارة البلد بين رواشين الخشب التاريخية واستمتع بالغوص والجولات البحرية الفاخرة.",
    programSlug: "jeddah",
  },
  {
    id: "aseer",
    src: "/media/destinations/aseer/videos/01-aseer-vid-new-2c15419d.mp4",
    nameAr: "عسير",
    nameEn: "Aseer",
    badgeAr: "قمم السودة وضباب الجنوب",
    badgeEn: "Soodah Mist & Green Peaks",
    titleAr: (
      <>
        عانق الضباب في <span style={{ color: "var(--color-gold-royal)" }}>قمم عسير</span>
        <br />
        وطبيعة الجنوب الخلابة
      </>
    ),
    subtitleAr: "أجواء عليلة وقرى تراثية كرجال ألمع، ومسارات هايكنج جبلية بين غابات العرعر والغيوم.",
    programSlug: "aseer",
  },
];

export const HeroVideoPlaylist: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = DESTINATION_PLAYLIST[activeIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % DESTINATION_PLAYLIST.length);
          return 0;
        }
        return prev + 2;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [activeIdx]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--color-midnight-blue)",
      }}
    >
      {/* Background Video with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <video
            ref={videoRef}
            src={current.src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(13, 27, 42, 0.4) 0%, rgba(13, 27, 42, 0.75) 75%, var(--color-bg-primary) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "6rem",
          paddingBottom: "4rem",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "780px" }}>
          {/* Badge */}
          <motion.div
            key={`badge-${current.id}`}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              background: "rgba(200, 169, 110, 0.18)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(200, 169, 110, 0.4)",
              borderRadius: "var(--radius-full)",
              color: "var(--color-gold-royal)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            <span>🇸🇦</span>
            <span>{current.badgeAr}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`title-${current.id}`}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-heading)",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {current.titleAr}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${current.id}`}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255, 255, 255, 0.88)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "650px",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {current.subtitleAr}
          </motion.p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href={`/programs?destination_slug=${current.programSlug}`}>
              <Button variant="gold" size="lg">
                استكشف تجارب {current.nameAr}
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="glass" size="lg">
                كافة البرامج السياحية
              </Button>
            </Link>
          </div>
        </div>

        {/* Playlist Destination Switchers */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginTop: "3.5rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          {DESTINATION_PLAYLIST.map((item, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setProgress(0);
                }}
                style={{
                  position: "relative",
                  background: isCurrent ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(12px)",
                  border: isCurrent ? "1.5px solid var(--color-gold-royal)" : "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.75rem 1.25rem",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.25rem",
                  minWidth: "150px",
                  textAlign: "right",
                  transition: "all 0.25s ease",
                  overflow: "hidden",
                }}
              >
                {/* Progress bar for active slide */}
                {isCurrent && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background: "var(--color-gold-royal)",
                        transition: "width 0.15s linear",
                      }}
                    />
                  </div>
                )}
                <span style={{ fontSize: "var(--text-xs)", color: isCurrent ? "var(--color-gold-royal)" : "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                  {item.badgeAr.split(" ")[0]}
                </span>
                <span style={{ fontSize: "var(--text-base)", fontWeight: 800 }}>
                  {item.nameAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
