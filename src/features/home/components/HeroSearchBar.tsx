"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/design-system/primitives";
import { MapPinIcon, CompassIcon } from "@/components/icons";

export const HeroSearchBar: React.FC = () => {
  const router = useRouter();
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
    <div
      style={{
        position: "relative",
        zIndex: 10,
        marginTop: "-2.5rem",
        marginBottom: "3rem",
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
              الوجهة السياحية
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
              <option value="">كافة مناطق المملكة</option>
              <option value="alula">العلا (مدائن صالح)</option>
              <option value="riyadh">الرياض والدرعية</option>
              <option value="jeddah">جدة التاريخية</option>
              <option value="the-red-sea">البحر الأحمر وأمالا</option>
              <option value="aseer">عسير والسودة</option>
              <option value="al-ahsa">الأحساء وجبل القارة</option>
            </select>
          </div>

          {/* Category Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)" }}>
              نوع التجربة
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
              <option value="">جميع التجارب</option>
              <option value="heritage">تراث وحضارة</option>
              <option value="safari">سفاري ومغامرات</option>
              <option value="sea-luxury">بحرية وغوص فاخر</option>
              <option value="nature-hiking">طبيعة وهايكنج</option>
              <option value="culinary">تذوق وأكلات شعبية</option>
            </select>
          </div>

          {/* Date Picker */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)" }}>
              تاريخ الرحلة
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
              🔍 ابحث عن رحلة
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
