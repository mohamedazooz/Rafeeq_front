"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/design-system/primitives";
import { useLanguage } from "@/lib/language-provider";

export const HeroSearchBar: React.FC = () => {
  const router = useRouter();
  const { isAr, t } = useLanguage();
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination_slug", destination);
    if (category) params.set("category_slug", category);
    if (date) params.set("date", date);

    router.push(`/programs?${params.toString()}`);
  };

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--color-bg-primary)",
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <form
          onSubmit={handleSearch}
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-2xl)",
            padding: "1.25rem 1.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) auto",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* Destination Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)" }}>
              {t.home.search.destinationLabel}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "0.6rem 0.85rem",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">{t.home.search.allDestinations}</option>
              <option value="alula">{t.home.search.destAlula}</option>
              <option value="riyadh">{t.home.search.destRiyadh}</option>
              <option value="jeddah">{t.home.search.destJeddah}</option>
              <option value="the-red-sea">{t.home.search.destRedSea}</option>
              <option value="aseer">{t.home.search.destAseer}</option>
              <option value="al-ahsa">{t.home.search.destAlAhsa}</option>
            </select>
          </div>

          {/* Category Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)" }}>
              {t.home.search.categoryLabel}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "0.6rem 0.85rem",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">{t.home.search.allCategories}</option>
              <option value="heritage">{t.home.search.catHeritage}</option>
              <option value="safari">{t.home.search.catSafari}</option>
              <option value="sea-luxury">{t.home.search.catSeaLuxury}</option>
              <option value="nature-hiking">{t.home.search.catNatureHiking}</option>
              <option value="culinary">{t.home.search.catCulinary}</option>
            </select>
          </div>

          {/* Date Picker */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)" }}>
              {t.home.search.dateLabel}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "0.6rem 0.85rem",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-sm)",
                outline: "none",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Submit Button */}
          <div style={{ alignSelf: "flex-end" }}>
            <Button type="submit" variant="primary" size="md" fullWidth>
              {t.home.search.searchBtn}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
