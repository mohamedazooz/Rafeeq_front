import React from "react";
import type { Metadata } from "next";
import { HeroVideoPlaylist } from "@/features/home/components/HeroVideoPlaylist";
import { HeroSearchBar } from "@/features/home/components/HeroSearchBar";
import { DestinationsShowcase } from "@/features/home/components/DestinationsShowcase";
import { FeaturedProgramsSection } from "@/features/home/components/FeaturedProgramsSection";
import { WhyRafeeqFeatures } from "@/features/home/components/WhyRafeeqFeatures";
import { SaudiHeritageBanner } from "@/features/home/components/SaudiHeritageBanner";
import { TopGuidesSection } from "@/features/home/components/TopGuidesSection";
import { TestimonialsMarquee } from "@/features/home/components/TestimonialsMarquee";

export const metadata: Metadata = {
  title: "رفيق | المنصة السعودية لتجارب السفر والإرشاد السياحي المرخص",
  description: "اكتشف مدائن صالح بالعلا، قصور الدرعية بالرياض، وحارة البلد بجدة، مع نخبة من المرشدين السياحيين السعوديين المعتمدين وحماية مالية كاملة Escrow.",
  keywords: ["سياحة السعودية", "مرشد سياحي", "العلا", "الرياض", "جدة", "حجوزات رحلات", "رفيق"],
  openGraph: {
    title: "رفيق | المنصة السعودية لتجارب السفر والإرشاد السياحي المرخص",
    description: "اكتشف روائع المملكة وتراث اليونسكو برفقة مرشدين محليين معتمدين.",
    images: ["/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"],
  },
};

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* 1. Hero Dynamic Video Playlist */}
      <HeroVideoPlaylist />

      {/* 2. Instant Search & Filters Bar */}
      <HeroSearchBar />

      {/* 3. Destinations & UNESCO Sites Showcase */}
      <DestinationsShowcase />

      {/* 4. Featured Curated Tourism Programs */}
      <FeaturedProgramsSection />

      {/* 5. Why Rafeeq & Escrow Protection */}
      <WhyRafeeqFeatures />

      {/* 6. Saudi Heritage & Vision 2030 Banner */}
      <SaudiHeritageBanner />

      {/* 7. Top Verified Tour Guides */}
      <TopGuidesSection />

      {/* 8. Verified Traveler Testimonials */}
      <TestimonialsMarquee />
    </main>
  );
}
