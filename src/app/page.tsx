"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import {
  SEED_CATEGORIES,
  SEED_PROGRAMS,
  SEED_GUIDES,
} from "@/lib/mock-data";
import styles from "./(public)/home.module.css";

/* ═══════════════════════════════════════════════════════════
   HERO DESTINATION VIDEO PLAYLIST WITH DYNAMIC DESTINATION HEADLINES
   ═══════════════════════════════════════════════════════════ */
const HERO_VIDEOS = [
  {
    id: "alula",
    src: "/media/destinations/alula/videos/01-alula-vid-6d2154a9.mp4",
    nameAr: "العلا",
    nameEn: "AlUla",
    badgeAr: "حضارة الأنباط ومدائن صالح",
    badgeEn: "Hegra & Ancient Heritage",
    titleAr: (
      <>
        اكتشف <span className={styles["hero__title-highlight"]}>مدائن صالح</span>
        <br />
        وحضارة الأنباط الخالدة بالعلا
      </>
    ),
    titleEn: (
      <>
        Discover <span className={styles["hero__title-highlight"]}>Hegra Tombs</span>
        <br />
        & Ancient Nabataean Wonders
      </>
    ),
    subtitleAr: "استكشف مقابر الأنباط النادرة المنحوتة في الصخر وقصر الفريد والبلدة القديمة برفقة مرشد محلي معتمد.",
    subtitleEn: "Explore rock-cut Nabataean tombs, Qasr al-Farid, and AlUla Old Town with a certified local guide.",
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
        عِش سحر <span className={styles["hero__title-highlight"]}>الرياض</span>
        <br />
        بين عراقة نجد وعاصمة المستقبل
      </>
    ),
    titleEn: (
      <>
        Experience <span className={styles["hero__title-highlight"]}>Riyadh Magic</span>
        <br />
        Where Najdi Heritage Meets Future
      </>
    ),
    subtitleAr: "من قصور الدرعية التاريخية والمصمك إلى كشتات صحراء الثمامة وتأمل النجوم تحت سماء نجد.",
    subtitleEn: "From historic Diriyah and Masmak Fortress to desert safaris and stargazing under Najdi skies.",
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
        استكشف <span className={styles["hero__title-highlight"]}>جدة التاريخية</span>
        <br />
        وعروس البحر الأحمر الساحرة
      </>
    ),
    titleEn: (
      <>
        Explore <span className={styles["hero__title-highlight"]}>Historic Jeddah</span>
        <br />
        & The Enchanting Red Sea Bride
      </>
    ),
    subtitleAr: "تجوّل في حارة البلد بين رواشين الخشب التاريخية واستمتع بالغوص والجولات البحرية الفاخرة.",
    subtitleEn: "Wander through UNESCO Al-Balad rawashin alleyways and enjoy Red Sea diving and luxury boat tours.",
  },
  {
    id: "aseer",
    src: "/media/destinations/aseer/videos/01-aseer-vid-new-2c15419d.mp4",
    nameAr: "عسير",
    nameEn: "Aseer",
    badgeAr: "قمم السودة وطبيعة الجنوب",
    badgeEn: "Soodah Mountain & Mist",
    titleAr: (
      <>
        تأمل <span className={styles["hero__title-highlight"]}>قمم عسير</span>
        <br />
        وطبيعة جبال السودة الضبابية
      </>
    ),
    titleEn: (
      <>
        Marvel at <span className={styles["hero__title-highlight"]}>Aseer Peaks</span>
        <br />
        & Misty Soodah Mountain Nature
      </>
    ),
    subtitleAr: "رحلات هايكنج بين جبال السودة والقرى التراثية في رجال ألمع وتذوق أطباق الحنيذ العسيري الأصيل.",
    subtitleEn: "Mountain hiking across Soodah peaks, Rijal Almaa heritage village, and authentic Aseeri cuisine.",
  },
  {
    id: "red-sea",
    src: "/media/destinations/the-red-sea/videos/01-red-sea-summer-21148704.mp4",
    nameAr: "البحر الأحمر",
    nameEn: "The Red Sea",
    badgeAr: "الجزر الفاخرة والشعاب العذراء",
    badgeEn: "Luxury Islands & Corals",
    titleAr: (
      <>
        انغمس في <span className={styles["hero__title-highlight"]}>أرخبيل البحر الأحمر</span>
        <br />
        والمنتجعات الفاخرة والشعاب البكر
      </>
    ),
    titleEn: (
      <>
        Immerse in <span className={styles["hero__title-highlight"]}>The Red Sea Archipelago</span>
        <br />
        Pristine Coral Reefs & Luxury Resorts
      </>
    ),
    subtitleAr: "تجربة سياحة فاخرة ومستدامة بين أكثر من 90 جزيرة بكراً وشعاب مرجانية مذهلة.",
    subtitleEn: "Ultra-luxury sustainable tourism experience across 90 pristine islands and untouched reefs.",
  },
];

/* ═══════════════════════════════════════════════════════════
   MINIMALIST LINE SVG ICONS
   ═══════════════════════════════════════════════════════════ */
const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CoffeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2v20" />
    <path d="M4 2v10a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V2" />
    <path d="M8 2v20" />
  </svg>
);

const LandmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7 12 2" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const LicenseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="13" y2="12" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PayoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default function HomePage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [activeFlowTab, setActiveFlowTab] = useState<"client" | "guide" | "evolution">("client");
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = HERO_VIDEOS[activeVideoIndex];

  // Guaranteed video autoplay trigger
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay video play trigger error:", err);
      });
    }
  }, [activeVideoIndex]);

  const handleVideoEnded = () => {
    setActiveVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  return (
    <>
      <Header />

      {/* ═══════════════════════════════════════════════════════════
         1. HERO SECTION (MULTI-VIDEO PLAYLIST WITH DYNAMIC TEXT)
         ═══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles["hero__video-wrap"]}>
          <video
            ref={videoRef}
            key={currentVideo.id}
            className={styles.hero__video}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          >
            <source src={currentVideo.src} type="video/mp4" />
          </video>
          <div className={styles.hero__overlay} />
        </div>

        <div className={styles.hero__content}>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentVideo.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className={styles.hero__title}
            >
              {isAr ? currentVideo.titleAr : currentVideo.titleEn}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentVideo.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className={styles.hero__subtitle}
            >
              {isAr ? currentVideo.subtitleAr : currentVideo.subtitleEn}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.hero__actions}
          >
            <Link href="/programs">
              <Button variant="primary" size="xl" style={{ paddingInline: "32px" }}>
                {isAr ? "استكشف البرامج" : "Explore Programs"}
              </Button>
            </Link>
            <Link href="/guides">
              <Button variant="glass" size="xl" style={{ paddingInline: "32px" }}>
                {isAr ? "دليل المرشدين" : "Guides Directory"}
              </Button>
            </Link>
          </motion.div>

          {/* Destination Video Playlist Selector Bar */}
          <div className={styles.hero__playlist}>
            {HERO_VIDEOS.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => setActiveVideoIndex(idx)}
                className={`${styles["hero__playlist-btn"]} ${
                  idx === activeVideoIndex ? styles["hero__playlist-btn--active"] : ""
                }`}
              >
                <PlayIcon />
                <span>{isAr ? vid.nameAr : vid.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         2. TOURISM CATEGORIES SECTION (DEEP LUXURY SAUDI NAVY & OASIS GRADIENT)
         ═══════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(135deg, #1B2D45 0%, #0D1B2A 50%, #0A4D3C 100%)", paddingBlock: "84px" }}>
        <div className="container">
          <div className={styles["section-header"]}>
            <div className={styles["section-eyebrow"]} style={{ color: "#C8A96E" }}>
              {isAr ? "أنواع التجارب" : "Experience Types"}
            </div>
            <h2 className={styles["section-title"]} style={{ color: "#FFFFFF" }}>
              {isAr ? (
                <>أقسام <span className="text-gradient">السياحة السعودية</span></>
              ) : (
                <>Saudi Tourism <span className="text-gradient">Categories</span></>
              )}
            </h2>
            <p className={styles["section-subtitle"]} style={{ color: "rgba(255,255,255,0.85)" }}>
              {isAr ? "اختر الأسلوب والنشاط المفضل لك واستكشف البرامج المتاحة من مرشدين معتمدين" : "Choose your favorite style and explore tours from certified local guides"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {SEED_CATEGORIES.map((cat, idx) => {
              // Custom vibrant gradient background per category slug
              const categoryGradients: Record<string, string> = {
                "cultural-heritage": "linear-gradient(135deg, rgba(200, 169, 110, 0.4) 0%, rgba(13, 27, 42, 0.9) 100%)",
                "adventure-outdoor": "linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(13, 27, 42, 0.9) 100%)",
                "marine-diving": "linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(13, 27, 42, 0.9) 100%)",
                "culinary-tasting": "linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(13, 27, 42, 0.9) 100%)",
                "family-entertainment": "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(13, 27, 42, 0.9) 100%)",
              };

              const cardGradient = categoryGradients[cat.slug] || "linear-gradient(135deg, rgba(200, 169, 110, 0.3) 0%, rgba(13, 27, 42, 0.9) 100%)";

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/programs?cat=${cat.slug}`}
                    style={{
                      position: "relative",
                      height: "260px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "20px",
                      border: "1px solid rgba(200, 169, 110, 0.4)",
                      background: cardGradient,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                    }}
                  >
                    <Image src={cat.coverImageUrl || ""} alt={isAr ? cat.name.ar : cat.name.en} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,77,60,0.1) 0%, rgba(13,27,42,0.92) 100%)" }} />

                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.35)", color: "#FFDF9E", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
                        <CompassIcon />
                        <span>{cat.publishedProgramsCount} {isAr ? "تجربة متاحة" : "Available Tours"}</span>
                      </div>
                      <h3 style={{ fontSize: "19px", fontWeight: 900, color: "#fff", marginBottom: "4px" }}>{isAr ? cat.name.ar : cat.name.en}</h3>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {isAr ? cat.description?.ar : cat.description?.en}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         3. FEATURED TOUR PROGRAMS SECTION (ROYAL SANDSTONE THEME)
         ═══════════════════════════════════════════════════════════ */}
      <section className={styles["programs-section"]} style={{ background: "var(--color-bg-primary)", paddingBlock: "80px" }}>
        <div className={styles["section-header"]}>
          <div className={styles["section-eyebrow"]} style={{ color: "var(--color-gold-heading)" }}>
            {isAr ? "التجارب المميزة" : "Featured Experiences"}
          </div>
          <h2 className={styles["section-title"]}>
            {isAr ? (
              <>برامج سياحية <span className="text-gradient">مختارة</span></>
            ) : (
              <>Handpicked <span className="text-gradient">Tours</span></>
            )}
          </h2>
          <p className={styles["section-subtitle"]}>
            {isAr ? "تجارب مصممة باحترافية ينفذها مرشدون محليون معتمدون" : "Crafted experiences operated by certified local guides"}
          </p>
        </div>

        <div className={styles["programs-grid"]}>
          {SEED_PROGRAMS.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", height: "210px" }}>
                <Image src={prog.coverImageUrl || ""} alt={isAr ? prog.title.ar : prog.title.en} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "14px", right: isAr ? "14px" : "auto", left: isAr ? "auto" : "14px", background: "var(--gradient-gold)", color: "#0f172a", padding: "4px 12px", borderRadius: "100px", fontWeight: 800, fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <StarIcon />
                  <span>{prog.ratingAvg} ({prog.reviewsCount})</span>
                </div>
                <div style={{ position: "absolute", bottom: "12px", right: isAr ? "12px" : "auto", left: isAr ? "auto" : "12px", background: "rgba(0,0,0,0.75)", color: "#fff", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPinIcon />
                  <span>{isAr ? prog.destinationName?.ar : prog.destinationName?.en}</span>
                </div>
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "8px", lineHeight: "1.4" }}>
                  {isAr ? prog.title.ar : prog.title.en}
                </h3>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "16px", flexGrow: 1, lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {isAr ? prog.description.ar : prog.description.en}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
                  <div>
                    <span style={{ fontSize: "10px", color: "var(--color-gold-heading)", display: "block" }}>{isAr ? "السعر للشخص" : "Price per person"}</span>
                    <strong style={{ fontSize: "20px", fontWeight: 900, color: "var(--color-gold-heading)" }}>{prog.priceSar} {isAr ? "ر.س" : "SAR"}</strong>
                  </div>
                  <Link href={`/programs/${prog.slug}`}>
                    <Button variant="primary" size="sm">
                      {isAr ? "تفاصيل والحجز" : "View & Book"}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         4. CERTIFIED LOCAL GUIDES SPOTLIGHT (MIDNIGHT SAPPHIRE BLUE THEME)
         ═══════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #152A42 100%)", paddingBlock: "80px", borderTop: "1px solid rgba(200, 169, 110, 0.3)" }}>
        <div className="container">
          <div className={styles["section-header"]}>
            <div className={styles["section-eyebrow"]} style={{ color: "#C8A96E" }}>
              {isAr ? "المرشدون المعتمدون" : "Certified Local Guides"}
            </div>
            <h2 className={styles["section-title"]} style={{ color: "#FFFFFF" }}>
              {isAr ? (
                <>نخبة المرشدين <span className="text-gradient">المرخصين</span></>
              ) : (
                <>Meet Our <span className="text-gradient">Top Guides</span></>
              )}
            </h2>
            <p className={styles["section-subtitle"]} style={{ color: "rgba(255,255,255,0.85)" }}>
              {isAr ? "مرشدون محليون مؤهلون برخص معتمدة من وزارة السياحة لنقل صورة حقيقية عن تراث وثقافة المملكة" : "Licensed local experts dedicated to sharing authentic Saudi heritage"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {SEED_GUIDES.map(({ user, profile }, idx) => {
              const guideName = typeof user.fullName === "object" ? (isAr ? user.fullName.ar : user.fullName.en) : user.fullName;
              const specs = Array.isArray(profile.specialties) ? profile.specialties : (isAr ? profile.specialties.ar : profile.specialties.en);

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{
                    padding: "24px",
                    borderRadius: "24px",
                    border: "1px solid rgba(200, 169, 110, 0.3)",
                    background: "rgba(27, 45, 69, 0.8)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--gradient-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 900, color: "#0f172a" }}>
                      {guideName[0]}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", marginBottom: "2px" }}>{guideName}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#10B981", padding: "2px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", gap: "4px" }}>
                          <LicenseIcon />
                          <span>{profile.licenseNumber}</span>
                        </span>
                        <span style={{ fontSize: "12px", color: "#C8A96E", fontWeight: 800, display: "flex", alignItems: "center", gap: "2px" }}>
                          <StarIcon />
                          <span>{user.guideRatingAvg}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginBottom: "16px", lineHeight: "1.6" }}>
                    {isAr ? profile.bio.ar : profile.bio.en}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {specs.map((spec, sIdx) => (
                      <span key={sIdx} style={{ background: "rgba(200, 169, 110, 0.15)", color: "#C8A96E", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", fontWeight: 700 }}>
                        #{spec}
                      </span>
                    ))}
                  </div>

                  <Link href={`/guides/${user.id}`}>
                    <Button variant="glass" fullWidth size="md">
                      {isAr ? "عرض الملف والجولات" : "View Profile & Tours"}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         5. SAUDI HERITAGE & HOSPITALITY SPOTLIGHT (WARM COFFEE & HERITAGE GOLD THEME)
         ═══════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(135deg, rgba(200, 169, 110, 0.15) 0%, var(--color-bg-primary) 100%)", paddingBlock: "80px", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <div className={styles["section-header"]}>
            <div className={styles["section-eyebrow"]} style={{ color: "var(--color-gold-heading)" }}>
              {isAr ? "الأصالة والضيافة" : "Saudi Heritage & Hospitality"}
            </div>
            <h2 className={styles["section-title"]}>
              {isAr ? (
                <>عِش أصالة <span className="text-gradient">الكرم السعودي</span></>
              ) : (
                <>Experience Authentic <span className="text-gradient">Saudi Hospitality</span></>
              )}
            </h2>
            <p className={styles["section-subtitle"]}>
              {isAr ? "رحلاتنا لا تقتصر على زيارة الأماكن، بل تنقلك لقلب الثقافة والتراث وتذوق القهوة والمأكولات السعودية العريقة" : "Our tours go beyond sightseeing to immerse you in authentic Saudi traditions, coffee, and culinary heritage"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <div style={{ padding: "28px", borderRadius: "24px", border: "1px solid rgba(200, 169, 110, 0.5)", background: "linear-gradient(135deg, rgba(200, 169, 110, 0.25) 0%, rgba(13, 27, 42, 0.92) 100%)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ color: "#FFDF9E", marginBottom: "14px" }}>
                <CoffeeIcon />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#FFDF9E", marginBottom: "8px" }}>{isAr ? "ضيافة القهوة السعودية" : "Saudi Coffee Ceremony"}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
                {isAr ? "استمتع بتحضير القهوة السعودية بالهيل والزعفران مع أجود أنواع التمور في كل جولة" : "Enjoy authentic Saudi coffee infused with cardamom and saffron alongside premium local dates."}
              </p>
            </div>

            <div style={{ padding: "28px", borderRadius: "24px", border: "1px solid rgba(16, 185, 129, 0.5)", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(13, 27, 42, 0.92) 100%)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ color: "#6EE7B7", marginBottom: "14px" }}>
                <UtensilsIcon />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#6EE7B7", marginBottom: "8px" }}>{isAr ? "تذوق المأكولات المحلية" : "Traditional Culinary Feast"}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
                {isAr ? "تذوق الأطباق التقليدية العريقة من الحنيذ العسيري والكبسة النجدية والكبدة الحجازية" : "Taste authentic regional dishes like Aseeri Haneeth, Najdi Kabsa, and Hejazi street food delicacies."}
              </p>
            </div>

            <div style={{ padding: "28px", borderRadius: "24px", border: "1px solid rgba(59, 130, 246, 0.5)", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(13, 27, 42, 0.92) 100%)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ color: "#93C5FD", marginBottom: "14px" }}>
                <LandmarkIcon />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#93C5FD", marginBottom: "8px" }}>{isAr ? "سحر العمارة التاريخية" : "Historic Hejazi & Najdi Architecture"}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
                {isAr ? "تأمل رواشين جدة البلد وقصور الطين بالدرعية ومباني العسيري الملونة برفقة المرشد" : "Explore Hejazi Rawashin, Diriyah mud-brick palaces, and colorful Aseeri heritage homes with expert guides."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         6. INTERACTIVE USER ROADMAP & TRANSFORMATION TREE
         ═══════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1B2D45 100%)", paddingBlock: "80px", borderTop: "1px solid rgba(200, 169, 110, 0.3)" }}>
        <div className="container">
          <div className={styles["section-header"]}>
            <div className={styles["section-eyebrow"]} style={{ color: "#C8A96E" }}>
              {isAr ? "مسارات المنصة" : "Platform Roadmaps"}
            </div>
            <h2 className={styles["section-title"]} style={{ color: "#FFFFFF" }}>
              {isAr ? (
                <>شجرة الطرق والتحول <span className="text-gradient">في رفيق</span></>
              ) : (
                <>User Journey <span className="text-gradient">& Transformation</span></>
              )}
            </h2>
            <p className={styles["section-subtitle"]} style={{ color: "rgba(255,255,255,0.85)" }}>
              {isAr ? "تتبع خطوات رحلتك سواءً كنت مسافراً مستكشفاً أو مرشداً سياحياً محلياً أو ترغب بالتحول من عميل إلى مرشد" : "Follow your roadmap whether you are an explorer, a local guide, or transforming into a certified guide"}
            </p>
          </div>

          {/* Flow Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveFlowTab("client")}
              style={{
                padding: "10px 24px",
                borderRadius: "100px",
                border: "none",
                background: activeFlowTab === "client" ? "var(--gradient-gold)" : "rgba(255,255,255,0.1)",
                color: activeFlowTab === "client" ? "#0f172a" : "#FFFFFF",
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {isAr ? "1. مسار المسافر المستكشف" : "1. Explorer Journey"}
            </button>

            <button
              onClick={() => setActiveFlowTab("guide")}
              style={{
                padding: "10px 24px",
                borderRadius: "100px",
                border: "none",
                background: activeFlowTab === "guide" ? "var(--gradient-gold)" : "rgba(255,255,255,0.1)",
                color: activeFlowTab === "guide" ? "#0f172a" : "#FFFFFF",
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {isAr ? "2. مسار المرشد المحلي" : "2. Local Guide Roadmap"}
            </button>

            <button
              onClick={() => setActiveFlowTab("evolution")}
              style={{
                padding: "10px 24px",
                borderRadius: "100px",
                border: "none",
                background: activeFlowTab === "evolution" ? "var(--gradient-gold)" : "rgba(255,255,255,0.1)",
                color: activeFlowTab === "evolution" ? "#0f172a" : "#FFFFFF",
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {isAr ? "3. رحلة التحول: من عميل إلى مرشد" : "3. Client to Guide Transformation"}
            </button>
          </div>

          {/* Flow Content */}
          {activeFlowTab === "client" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(200, 169, 110, 0.4)", background: "linear-gradient(135deg, rgba(200, 169, 110, 0.25) 0%, rgba(13, 27, 42, 0.95) 100%)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                <div style={{ color: "#FFDF9E", marginBottom: "12px" }}><SearchIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#FFDF9E", marginBottom: "8px" }}>{isAr ? "1. الاستكشاف والفلترة" : "1. Explore & Filter"}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{isAr ? "تصفح البرامج والوجهات، وقارن تقييمات المرشدين والتخصصات" : "Browse tours and destinations, compare guide reviews and specialties"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.4)", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(13, 27, 42, 0.95) 100%)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                <div style={{ color: "#6EE7B7", marginBottom: "12px" }}><ShieldCheckIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#6EE7B7", marginBottom: "8px" }}>{isAr ? "2. الحجز بحساب الضمان المحمي" : "2. Escrow Booking"}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{isAr ? "ادفع مبلّغ الحجز بأمان عبر بوابة محمية لحفظ أموالك بحساب الضمان" : "Securely pay with funds held in Escrow protection until trip completion"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(59, 130, 246, 0.4)", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(13, 27, 42, 0.95) 100%)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                <div style={{ color: "#93C5FD", marginBottom: "12px" }}><ChatIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#93C5FD", marginBottom: "8px" }}>{isAr ? "3. التنسيق والتواصل" : "3. Direct Guide Chat"}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{isAr ? "تواصل مباشرة مع مرشدك المحلي لتنسيق موعد ومكان الالتقاء" : "Directly message your local guide to coordinate meeting points"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(245, 158, 11, 0.4)", background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(13, 27, 42, 0.95) 100%)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                <div style={{ color: "#FDE68A", marginBottom: "12px" }}><StarIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#FDE68A", marginBottom: "8px" }}>{isAr ? "4. التجربة والتقييم" : "4. Experience & Review"}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{isAr ? "استمتع بالرحلة ثم شارك تجربتك وقيّم المرشد للتوثيق" : "Enjoy your unique trip and post your verified review"}</p>
              </div>
            </div>
          )}

          {activeFlowTab === "guide" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "var(--color-bg-card)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ color: "#10B981", marginBottom: "12px" }}><LicenseIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>{isAr ? "1. تقديم ورخصة السياحة" : "1. License Submission"}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{isAr ? "أدخل بياناتك وارفاق ترخيص وزارة السياحة السعودية والهوية" : "Upload your Ministry of Tourism license and national ID"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "var(--color-bg-card)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ color: "#10B981", marginBottom: "12px" }}><CompassIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>{isAr ? "2. تصميم البرامج والأسعار" : "2. Craft Tour Programs"}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{isAr ? "أضف خط سير الرحلات والأنشطة والمشتملات وسعر المجموعة" : "Build itineraries, inclusions, and group pricing"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "var(--color-bg-card)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ color: "#10B981", marginBottom: "12px" }}><UsersIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>{isAr ? "3. تنفيذ الجولة مع العملاء" : "3. Operate Tour Safely"}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{isAr ? "استقبل المسافرين وقدم تجربتك السياحية المتميزة بأمان" : "Host travelers and deliver authentic local experiences"}</p>
              </div>

              <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "var(--color-bg-card)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ color: "#10B981", marginBottom: "12px" }}><PayoutIcon /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>{isAr ? "4. تحويل المستحقات لحساب آيبان" : "4. Direct IBAN Payout"}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{isAr ? "استلم أرباحك الصافية فور اكتمال الرحلة مباشرة لحسابك البنكي" : "Receive net trip payout directly to your bank IBAN"}</p>
              </div>
            </div>
          )}

          {activeFlowTab === "evolution" && (
            <div style={{ padding: "32px", borderRadius: "24px", border: "1px solid var(--color-border)", background: "var(--color-bg-card)", boxShadow: "var(--shadow-lg)" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--color-gold-heading)", marginBottom: "12px", textAlign: "center" }}>
                {isAr ? "رحلة التحول: كيف تصبح مرشداً سياحياً محترفاً في رفيق؟" : "Transformation Roadmap: Become a Certified Guide in Rafeeq"}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", textAlign: "center", maxWidth: "750px", margin: "0 auto 28px" }}>
                {isAr
                  ? "إذا كنت مسافراً وعاشقاً لاكتشاف مناطق المملكة، تتيح لك منصة رفيق التحول إلى مرشد سياحي معتمد ومصدر دخل مستدام عبر خطوات واضحة:"
                  : "If you love exploring Saudi Arabia, Rafeeq enables your transformation from traveler to certified guide with sustainable income:"}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-gold-heading)", fontSize: "13px", marginBottom: "6px" }}>{isAr ? "خطوة 1: شغف الاستكشاف" : "Step 1: Local Passion"}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "امتلاك معرفة واسعة بالوجهات المحلية والتراث والجغرافيا" : "Deep knowledge of Saudi heritage and destinations"}</div>
                </div>

                <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-gold-heading)", fontSize: "13px", marginBottom: "6px" }}>{isAr ? "خطوة 2: استخراج الترخيص" : "Step 2: Get Tourism License"}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "الحصول على رخصة الإرشاد السياحي الرسمية من وزارة السياحة" : "Obtain official guide license from Ministry of Tourism"}</div>
                </div>

                <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-gold-heading)", fontSize: "13px", marginBottom: "6px" }}>{isAr ? "خطوة 3: التسجيل برفيق" : "Step 3: Join Rafeeq"}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "رفع الترخيص والهوية وتأكيد الحساب كمرشد محلي معتمد" : "Upload license and verify guide profile"}</div>
                </div>

                <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-gold-heading)", fontSize: "13px", marginBottom: "6px" }}>{isAr ? "خطوة 4: انطلاق الدخل" : "Step 4: Earn Income"}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? "استقبال الحجوزات وبناء سمعة وتقييمات عالية بين المسافرين" : "Host travelers, receive payouts, and build reputation"}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         7. INTERACTIVE FREQUENTLY ASKED QUESTIONS (FAQ)
         ═══════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--color-bg-primary)", paddingBlock: "80px", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className={styles["section-header"]}>
            <div className={styles["section-eyebrow"]} style={{ color: "var(--color-gold-heading)" }}>
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </div>
            <h2 className={styles["section-title"]}>
              {isAr ? (
                <>كل ما تحتاج معرفته <span className="text-gradient">عن رفيق</span></>
              ) : (
                <>Everything You Need to Know <span className="text-gradient">About Rafeeq</span></>
              )}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <details style={{ padding: "20px 24px", borderRadius: "18px", border: "1px solid var(--color-border)", cursor: "pointer", background: "var(--color-bg-card)", boxShadow: "var(--shadow-sm)" }}>
              <summary style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)", outline: "none" }}>
                {isAr ? "كيف يضمن حساب الضمان المحمي حماية أموالي؟" : "How does Escrow protect my booking funds?"}
              </summary>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.7" }}>
                {isAr
                  ? "عند الدفع، تظل أموالك محتجزة بأمان في حساب محمي لدى رفيق، ولا يُصرف المبلغ للمرشد إلا بعد اكتمال الرحلة بنجاح وتأكيد حضورك ورضاك عن التجربة."
                  : "When you book, funds are securely held in Escrow and released to the guide only after trip completion and your verified confirmation."}
              </p>
            </details>

            <details style={{ padding: "20px 24px", borderRadius: "18px", border: "1px solid var(--color-border)", cursor: "pointer", background: "var(--color-bg-card)", boxShadow: "var(--shadow-sm)" }}>
              <summary style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)", outline: "none" }}>
                {isAr ? "هل جميع المرشدين السياحيين في المنصة معتمدون؟" : "Are all guides officially licensed?"}
              </summary>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.7" }}>
                {isAr
                  ? "نعم، تخضع كافة طلبات المرشدين للتدقيق الآلي واليدوي للتأكد من سريان رخصة الإرشاد السياحي الصادرة من وزارة السياحة السعودية والهوية الوطنية قبل تفعيل حساباتهم."
                  : "Yes! Every guide must submit their official Saudi Ministry of Tourism license and national ID for verified approval."}
              </p>
            </details>

            <details style={{ padding: "20px 24px", borderRadius: "18px", border: "1px solid var(--color-border)", cursor: "pointer", background: "var(--color-bg-card)", boxShadow: "var(--shadow-sm)" }}>
              <summary style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)", outline: "none" }}>
                {isAr ? "هل يمكنني التواصل المباشر مع المرشد قبل الحجز؟" : "Can I message the guide before booking?"}
              </summary>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.7" }}>
                {isAr
                  ? "نعم! تتيح لك المنصة نظام محادثة فورية مدمج للاستفسار عن تفاصيل البرنامج وملاءمة الجدول وتحديد مكان الالتقاء مباشرة."
                  : "Yes! Rafeeq includes built-in instant messaging to coordinate meeting points and tour itineraries directly with local guides."}
              </p>
            </details>

            <details style={{ padding: "20px 24px", borderRadius: "18px", border: "1px solid var(--color-border)", cursor: "pointer", background: "var(--color-bg-card)", boxShadow: "var(--shadow-sm)" }}>
              <summary style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-gold-heading)", outline: "none" }}>
                {isAr ? "ما هي سياسة الإلغاء والاسترداد المالي؟" : "What is the cancellation & refund policy?"}
              </summary>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.7" }}>
                {isAr
                  ? "يمكنك الإلغاء واسترداد مبالغك وفق السياسة المحددة للبرنامج، وفي حال حدوث أي خلاف يتم رفع بلاغ ليتولى فريق النزاعات الفصل العادل بحيادية."
                  : "You can cancel per program rules for automatic refund. In case of any dispute, our support team steps in for fair claim resolution."}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         8. CALL TO ACTION & REGISTRATION BANNER (ROYAL SAUDI EMERALD & GOLD BANNER)
         ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #064E3B 0%, #0D1B2A 50%, #8C6E28 100%)", paddingBlock: "80px", borderTop: "1px solid rgba(200, 169, 110, 0.4)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span style={{ color: "#C8A96E", fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            {isAr ? "انضم إلى مجتمع السياحة السعودية" : "Join Saudi Tourism Platform"}
          </span>
          <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "16px" }}>
            {isAr ? (
              <>جاهز لاكتشاف <span className="text-gradient">السعودية بشكل مختلف؟</span></>
            ) : (
              <>Ready to Experience <span className="text-gradient">Saudi Arabia?</span></>
            )}
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: "1.8", marginBottom: "32px" }}>
            {isAr
              ? "سجل الآن كمستكشف لحجز أجمل الجولات، أو كمرشد محلي معتمد لبدء استقبال الحجوزات وبناء مصدر دخل مستدام"
              : "Register as an explorer to book authentic tours, or join as a certified local guide to host travelers."}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/register">
              <Button variant="primary" size="xl" style={{ paddingInline: "36px" }}>
                {isAr ? "سجل كعميل مسافر" : "Register as Explorer"}
              </Button>
            </Link>
            <Link href="/become-guide">
              <Button variant="glass" size="xl" style={{ paddingInline: "36px" }}>
                {isAr ? "انضم كمرشد معتمد" : "Become Certified Guide"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
