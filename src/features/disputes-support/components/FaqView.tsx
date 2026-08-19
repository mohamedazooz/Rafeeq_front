"use client";

import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import { SupportService } from "../services/support.service";

export function FaqView() {
  const { isAr } = useLanguage();
  const faqs = SupportService.getFaqs();

  return (
    <>
      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "100px 40px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" labelEn="Back to Home" />
          </div>

          <h1 style={{ color: "var(--color-text-primary)", fontSize: "var(--text-4xl)", fontWeight: 900 }}>
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg)", maxWidth: "600px", marginInline: "auto", marginTop: "var(--space-3)" }}>
            {isAr ? "كل ما تود معرفته عن الحجز، الدفع بالضمان، وتوثيق المرشدين في رفيق." : "Everything you need to know about booking, Escrow protection, and verified guides."}
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {faqs.map((faq) => (
            <div key={faq.id} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "var(--space-2)", color: "var(--color-gold-heading)" }}>
                {isAr ? faq.qAr : faq.qEn}
              </h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", margin: 0 }}>
                {isAr ? faq.aAr : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
