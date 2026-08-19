"use client";

import React from "react";
import { HeroVideoPlaylist } from "./HeroVideoPlaylist";
import { HeroSearchBar } from "./HeroSearchBar";
import { DestinationsShowcase } from "./DestinationsShowcase";
import { FeaturedProgramsSection } from "./FeaturedProgramsSection";
import { WhyRafeeqFeatures } from "./WhyRafeeqFeatures";
import { SaudiHeritageBanner } from "./SaudiHeritageBanner";
import { TopGuidesSection } from "./TopGuidesSection";
import { TestimonialsMarquee } from "./TestimonialsMarquee";

export function HomeView() {
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
