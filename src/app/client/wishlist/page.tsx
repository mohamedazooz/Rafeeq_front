"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  CompassIcon,
  TrashIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
} from "@/components/icons";

interface WishlistItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  priceSar: number;
  rating: number;
  reviewsCount: number;
  image: string;
  guideName: string;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "prog-1",
    title: "جولة مدائن صالح والبلدة القديمة بالعلا",
    location: "العلا",
    duration: "يومان (8 ساعات)",
    priceSar: 850,
    rating: 4.95,
    reviewsCount: 128,
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    guideName: "عبد العزيز الشمري",
  },
  {
    id: "prog-2",
    title: "جولة الدرعية التاريخية وحي الطريف المسائي",
    location: "الرياض",
    duration: "4 ساعات",
    priceSar: 350,
    rating: 4.9,
    reviewsCount: 84,
    image: "/media/destinations/riyadh/diriyah.jpg",
    guideName: "فهد العريفي",
  },
  {
    id: "prog-3",
    title: "رحلة استكشاف مزارع واحة الأحساء وقصر إبراهيم",
    location: "الأحساء",
    duration: "يوم كامل",
    priceSar: 420,
    rating: 4.88,
    reviewsCount: 46,
    image: "/media/destinations/al-ahsa/oasis.jpg",
    guideName: "خالد الحربي",
  },
];

export default function ClientWishlistPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST);

  const handleRemove = (id: string, title: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    success(`تمت إزالة برنامج (${title}) من قائمة رغباتك.`);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            قائمة رغباتي ومفضلاتي ⭐ ({wishlist.length})
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            البرامج السياحية المحفوظة للتخطيط لرحلاتك القادمة وحجزها مباشرة مع المرشد
          </p>
        </div>

        <Link href="/programs">
          <Button variant="outline" size="md">
            <CompassIcon size={16} />
            <span>تصفح المزيد من البرامج</span>
          </Button>
        </Link>
      </div>

      {/* Grid of Wishlist Items */}
      {wishlist.length === 0 ? (
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ margin: "0 auto 12px", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--color-bg-secondary)" }}>
            <CompassIcon size={24} color="var(--color-gold-heading)" />
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>قائمة رغباتك فارغة حالياً</h3>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: "4px 0 16px 0" }}>
            استكشف روائع الوجهات السعودية واحفظ رحلاتك المفضلة لتصل إليها في أي وقت
          </p>
          <Link href="/programs">
            <Button variant="primary" size="md">استكشاف الكتالوج العام</Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
          {wishlist.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--color-saudi-green)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPinIcon size={14} />
                    <span>{item.location}</span>
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--color-gold-heading)", fontWeight: 800 }}>
                    {item.rating} ⭐ ({item.reviewsCount})
                  </span>
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: 800, lineHeight: "1.4", margin: "0 0 8px 0" }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
                  المرشد: <strong>{item.guideName}</strong> • المدة: {item.duration}
                </p>
              </div>

              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid var(--color-border)",
                  background: "var(--color-bg-secondary)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)", display: "block" }}>السعر للشخص</span>
                  <span style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                    {item.priceSar} ر.س
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <Button variant="ghost" size="sm" onClick={() => handleRemove(item.id, item.title)}>
                    <TrashIcon size={14} />
                  </Button>
                  <Link href={`/programs/${item.id}`}>
                    <Button variant="primary" size="sm">
                      <span>حجز فوري</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
