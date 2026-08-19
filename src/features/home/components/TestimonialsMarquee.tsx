"use client";

import React from "react";
import { useLanguage } from "@/lib/language-provider";

export const TESTIMONIALS = [
  {
    id: "t-1",
    authorAr: "فيصل بن ناصر القحطاني (الرياض)",
    authorEn: "Faisal Al-Qahtani (Riyadh, KSA)",
    tripAr: "جولة مدائن صالح بالعلا",
    tripEn: "Hegra Nabataean Tour in AlUla",
    rating: 5,
    dateAr: "أغسطس 2026",
    dateEn: "August 2026",
    contentAr: "تجربة خيالية لا تُنسى! المرشد كان متمكناً جداً من تفاصيل حضارة الأنباط ونقوش الحجر، والتنظيم والدفع عبر رفيق كان في غاية السلاسة والأمان.",
    contentEn: "An unforgettable, magical journey! Our local guide was exceptionally knowledgeable about Nabataean history, and booking with Rafeeq's Escrow protection gave us 100% peace of mind.",
  },
  {
    id: "t-2",
    authorAr: "د. ألكسندر ويبر (فرانكفورت، ألمانيا)",
    authorEn: "Dr. Alexander Weber (Frankfurt, Germany)",
    tripAr: "سفاري صحراء نجد والدرعية التاريخية",
    tripEn: "Diriyah UNESCO Heritage & Najd Desert Safari",
    rating: 5,
    dateAr: "يوليو 2026",
    dateEn: "July 2026",
    contentAr: "كسائح قادم من أوروبا، أذهلني كرم الضيافة السعودية والاحترافية العالية للمرشد. التنسيق بالإنجليزية واستقبال المطار كان ممتازاً للغاية.",
    contentEn: "As an international traveler from Europe, I was blown away by genuine Saudi hospitality and guide professionalism. English coordination and airport pickup were world-class.",
  },
  {
    id: "t-3",
    authorAr: "إيما لوران (باريس، فرنسا)",
    authorEn: "Emma Laurent (Paris, France)",
    tripAr: "تاريخ حارة البلد بجدة والغوص الفاخر",
    tripEn: "Historic Jeddah Al-Balad & Red Sea Marine Tour",
    rating: 5,
    dateAr: "أغسطس 2026",
    dateEn: "August 2026",
    contentAr: "جولة معمارية وتراثية ساحرة في أزقة جدة القديمة، ثم رحلة غوص استثنائية في البحر الأحمر. منصة رفيق جعلت زيارتي للسعودية تجربة العمر!",
    contentEn: "Fascinating architectural walk through ancient coral-stone streets, followed by pristine Red Sea diving. Rafeeq made our Saudi adventure a once-in-a-lifetime memory!",
  },
];

export const TestimonialsMarquee: React.FC = () => {
  const { isAr, t } = useLanguage();

  return (
    <section style={{ paddingBlock: "4rem 6rem", background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", marginInline: "auto", marginBottom: "3.5rem" }}>
          <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
            {t.home.testimonials.badge}
          </span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
            {t.home.testimonials.title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {TESTIMONIALS.map((item) => {
            const author = isAr ? item.authorAr : item.authorEn;
            const trip = isAr ? item.tripAr : item.tripEn;
            const content = isAr ? item.contentAr : item.contentEn;

            return (
              <div
                key={item.id}
                style={{
                  background: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-2xl)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.25rem",
                }}
              >
                <div>
                  {/* Stars */}
                  <div style={{ color: "#F59E0B", fontSize: "1.1rem", marginBottom: "0.85rem" }}>
                    {"★".repeat(item.rating)}
                  </div>

                  {/* Content */}
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                    &ldquo;{content}&rdquo;
                  </p>
                </div>

                {/* Author & Trip info */}
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 800, margin: 0 }}>
                      {author}
                    </h4>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                      {trip}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-saudi-green)",
                      fontWeight: 700,
                      background: "rgba(0, 108, 53, 0.08)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    ✓ {isAr ? "حجز مؤكد" : "Verified Booking"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
