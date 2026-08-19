"use client";

import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "100px 40px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" labelEn="Back to Home" />
          </div>

          <h1 style={{ color: "var(--color-text-primary)", fontSize: "var(--text-4xl)", fontWeight: 900 }}>
            {isAr ? "عن منصة رفيق" : "About Rafeeq Platform"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg)", maxWidth: "700px", marginInline: "auto", marginTop: "var(--space-3)", lineHeight: "1.7" }}>
            {isAr
              ? "المنصة الرقمية السعودية الوسيطة لربط المسافرين بالمرشدين السياحيين المعتمدين لتنفيذ برامج سياحية موثوقة بحساب الضمان المحمي."
              : "The digital Saudi platform connecting travelers with certified local tour guides under 100% Escrow payment protection."}
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "850px" }}>
          <div style={{ padding: "36px", borderRadius: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
            <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, marginBottom: "var(--space-4)", color: "var(--color-gold-heading)" }}>
              {isAr ? "رؤيتنا واختصاصنا في السياحة السعودية" : "Our Vision for Saudi Tourism"}
            </h2>
            <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-6)" }}>
              {isAr
                ? "تأتي منصة رفيق تماشياً مع مستهدفات رؤية المملكة 2030 في تعزيز السياحة الوطنية وتوفير فرص عمل مستدامة للمرشدين السياحيين المرخصين والمحترفين. تتيح المنصة للمسافرين من داخل وخارج المملكة اكتشاف السعودية الحقيقية من خلال تجارب محلية موثوقة ودفع آمن بحساب الضمان المحمي."
                : "Rafeeq aligns with Saudi Vision 2030 to elevate national tourism and empower licensed local guides with sustainable income. We provide authentic, high-quality Saudi experiences backed by bank Escrow security."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
