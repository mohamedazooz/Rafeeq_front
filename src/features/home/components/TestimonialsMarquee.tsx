"use client";

import React from "react";

export const TESTIMONIALS = [
  {
    id: "t-1",
    author: "فيصل بن ناصر القحطاني",
    trip: "جولة مدائن صالح بالعلا",
    rating: 5,
    date: "أغسطس 2026",
    content: "تجربة خيالية لا تُنسى! المرشد كان متمكناً جداً من تفاصيل حضارة الأنباط ونقوش الحجر، والتنظيم والدفع عبر رفيق كان في غاية السلاسة والأمان.",
  },
  {
    id: "t-2",
    author: "سارة بنت عبد الله المنصور",
    trip: "كشتة وسفاري صحراء نجد",
    rating: 5,
    date: "يوليو 2026",
    content: "أجمل سهرة شواء وتأمل للنجوم في سماء نجد، كرم الضيافة والقهوة السعودية الأصيلة شعرتنا وكأننا مع أهلنا. شكراً لمنصة رفيق على هذا المستوى الرفيع.",
  },
  {
    id: "t-3",
    author: "الدكتور محمد الشريف",
    trip: "تاريخ حارة البلد بجدة",
    rating: 5,
    date: "أغسطس 2026",
    content: "جولة ثقافية ومعمارية مبهرة في أزقة البلد العتيقة، معرفة المرشدة منى بالرواشين وبيوت جدة القديمة أضافت قيمة استثنائية للرحلة.",
  },
];

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section style={{ paddingBlock: "4rem 6rem", background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "600px", marginInline: "auto", marginBottom: "3.5rem" }}>
          <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
            آراء وتجارب المسافرين
          </span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, fontFamily: "var(--font-heading)", marginTop: "0.25rem" }}>
            قصص حقيقية من أرض الضيافة
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
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
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
                  {"★".repeat(t.rating)}
                </div>

                {/* Content */}
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author & Trip info */}
              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 800, margin: 0 }}>
                    {t.author}
                  </h4>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {t.trip}
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
                  ✓ حجز مؤكد
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
