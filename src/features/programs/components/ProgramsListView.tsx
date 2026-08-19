"use client";

import React, { Suspense } from "react";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { Button, Skeleton, EmptyState } from "@/design-system/primitives";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import { useProgramsFilter } from "../hooks/useProgramsFilter";

function ProgramsContent() {
  const { isAr, t } = useLanguage();
  const {
    query,
    setQuery,
    selectedDest,
    setSelectedDest,
    sortBy,
    setSortBy,
    isLoading,
    programsList,
    applyFilters,
    resetFilters,
  } = useProgramsFilter();

  return (
    <>
      <section
        style={{
          background: "var(--color-bg-primary)",
          paddingBlock: "100px 40px",
          position: "relative",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" labelEn="Back to Home" />
          </div>

          <span
            style={{
              color: "var(--color-gold-royal)",
              fontWeight: 800,
              fontSize: "var(--text-sm)",
              display: "block",
              marginBottom: "var(--space-2)",
            }}
          >
            🧭 {t.programs.pageTitle}
          </span>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 900,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-4)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {t.programs.pageSubtitle}
          </h1>

          {/* Search & Filter Bar */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-2xl)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr)) auto",
              gap: "1rem",
              alignItems: "center",
              marginTop: "var(--space-6)",
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder={t.programs.searchPlaceholder}
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
              }}
            />

            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">{t.programs.allDestinations}</option>
              <option value="alula">{t.home.search.destAlula}</option>
              <option value="riyadh">{t.home.search.destRiyadh}</option>
              <option value="jeddah">{t.home.search.destJeddah}</option>
              <option value="the-red-sea">{t.home.search.destRedSea}</option>
              <option value="aseer">{t.home.search.destAseer}</option>
              <option value="al-ahsa">{t.home.search.destAlAhsa}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="popular">{t.programs.sortPopular}</option>
              <option value="rating">{t.programs.sortRating}</option>
              <option value="price_asc">{t.programs.sortPriceAsc}</option>
              <option value="price_desc">{t.programs.sortPriceDesc}</option>
            </select>

            <Button variant="primary" size="md" onClick={applyFilters}>
              {t.programs.applySearch}
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section style={{ paddingBlock: "3.5rem 5rem", background: "var(--color-bg-primary)", minHeight: "450px" }}>
        <div className="container">
          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.75rem" }}>
              <Skeleton height="360px" borderRadius="var(--radius-2xl)" />
              <Skeleton height="360px" borderRadius="var(--radius-2xl)" />
              <Skeleton height="360px" borderRadius="var(--radius-2xl)" />
            </div>
          ) : programsList.length === 0 ? (
            <EmptyState
              title={t.programs.emptyTitle}
              description={t.programs.emptyDesc}
              actionLabel={t.programs.resetFilters}
              onAction={resetFilters}
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.75rem",
              }}
            >
              {programsList.map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id}
                  title={program.titleAr}
                  titleEn={program.titleEn}
                  location={program.locationAr}
                  locationEn={program.locationEn}
                  duration={program.durationAr}
                  durationEn={program.durationEn}
                  groupSize={program.groupSizeAr}
                  groupSizeEn={program.groupSizeEn}
                  rating={program.rating}
                  reviewsCount={program.reviewsCount}
                  priceSar={program.priceSar}
                  priceHalalas={program.priceHalalas}
                  image={program.image}
                  badge={program.badgeAr}
                  badgeEn={program.badgeEn}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ProgramsListView() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Suspense fallback={<div className="container" style={{ padding: "4rem" }}><Skeleton height="400px" /></div>}>
        <ProgramsContent />
      </Suspense>
    </main>
  );
}
