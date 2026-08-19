"use client";

import React, { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramCard, type ProgramCardProps } from "@/components/domain/ProgramCard";
import { Button, Skeleton, EmptyState, Badge } from "@/design-system/primitives";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import { programsService } from "@/features/programs/services/programs.service";
import { FEATURED_PROGRAMS } from "@/features/home/components/FeaturedProgramsSection";

function ProgramsContent() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedDest, setSelectedDest] = useState(searchParams.get("destination_slug") || "");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("category_slug") || "");
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "popular");
  const [isLoading, setIsLoading] = useState(false);
  const [programsList, setProgramsList] = useState<readonly ProgramCardProps[]>(FEATURED_PROGRAMS);

  const applyFilters = () => {
    setIsLoading(true);
    // Filter programs locally and through API
    let filtered = [...FEATURED_PROGRAMS];
    if (selectedDest) {
      filtered = filtered.filter((p) => {
        if (selectedDest === "alula") return p.location.includes("العلا");
        if (selectedDest === "riyadh") return p.location.includes("الرياض");
        if (selectedDest === "jeddah") return p.location.includes("جدة");
        if (selectedDest === "red-sea" || selectedDest === "the-red-sea") return p.location.includes("البحر الأحمر");
        if (selectedDest === "aseer") return p.location.includes("عسير");
        if (selectedDest === "al-ahsa") return p.location.includes("الأحساء");
        return true;
      });
    }
    if (query) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.priceSar - b.priceSar);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.priceSar - a.priceSar);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setTimeout(() => {
      setProgramsList(filtered);
      setIsLoading(false);
    }, 250);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedDest, selectedCat, sortBy]);

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
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
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
            🧭 {isAr ? "كتالوج البرامج السياحية المعتمدة" : "Verified Tourism Programs"}
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
            {isAr ? "استكشف تجارب سياحية فريدة لا تُنسى" : "Explore Unique & Unforgettable Tours"}
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
              placeholder={isAr ? "ابحث عن برنامج أو مدينة..." : "Search program or city..."}
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
              <option value="">{isAr ? "جميع الوجهات" : "All Destinations"}</option>
              <option value="alula">{isAr ? "العلا" : "AlUla"}</option>
              <option value="riyadh">{isAr ? "الرياض" : "Riyadh"}</option>
              <option value="jeddah">{isAr ? "جدة" : "Jeddah"}</option>
              <option value="red-sea">{isAr ? "البحر الأحمر" : "The Red Sea"}</option>
              <option value="aseer">{isAr ? "عسير" : "Asir"}</option>
              <option value="al-ahsa">{isAr ? "الأحساء" : "Al Ahsa"}</option>
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
              <option value="popular">{isAr ? "الأكثر طلباً" : "Most Popular"}</option>
              <option value="rating">{isAr ? "الأعلى تقييماً" : "Highest Rated"}</option>
              <option value="price_asc">{isAr ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
              <option value="price_desc">{isAr ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
            </select>

            <Button variant="primary" size="md" onClick={applyFilters}>
              {isAr ? "تطبيق البحث" : "Apply Search"}
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
              title="لم يتم العثور على برامج تطابق بحثك"
              description="جرب اختيار وجهة أخرى أو إزالة بعض الفلاتر لاستعراض كافة التجارب المتاحة."
              actionLabel="إعادة تعيين الفلاتر"
              onAction={() => {
                setQuery("");
                setSelectedDest("");
                setSelectedCat("");
                setSortBy("popular");
              }}
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
                <ProgramCard key={program.id} {...program} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProgramsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div className="container" style={{ padding: "4rem" }}><Skeleton height="400px" /></div>}>
          <ProgramsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
