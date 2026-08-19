"use client";

import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

const FAQS = [
  {
    qAr: "كيف تضمن منصة رفيق حقي المالي عند الحجز؟",
    qEn: "How does Rafeeq guarantee my funds during booking?",
    aAr: "يتم حجز مبلغ الرحلة بالكامل في حساب ضمان مؤمّن ومحمي (Escrow)، ولا يتم تحويل المستحقات للمرشد السياحي إلا بعد اكتمال تنفيذ البرنامج وتأكيد رضاك التام.",
    aEn: "The full trip amount is held in a protected bank Escrow account and is only released to the local guide after the tour is successfully completed.",
  },
  {
    qAr: "هل يحتاج العميل لإنشاء حساب لتصفح البرامج والوجهات؟",
    qEn: "Do travelers need an account to browse destinations and tours?",
    aAr: "لا، الاستكشاف والبحث وتصفح كافة التفاصيل والوجهات متاح مجاناً وبدون حساب. يلزم تسجيل الدخول فقط عند إتمام الحجز أو المراسلة.",
    aEn: "No, browsing programs, itineraries, and destinations is completely free without an account. Registration is only required when booking or messaging.",
  },
  {
    qAr: "ما هي شروط الانضمام كمرشد سياحي في رفيق؟",
    qEn: "What are the requirements to join as a licensed tour guide?",
    aAr: "يجب أن تكون حاملاً لرخصة إرشاد سياحي رسمية وسارية من وزارة السياحة بالمملكة العربية السعودية، ولديك حساب بنكي سعودي (آيبان) نشط.",
    aEn: "You must hold an active tour guide license issued by the Saudi Ministry of Tourism and a verified Saudi bank account (IBAN).",
  },
  {
    qAr: "ما هي طرق الدفع المتاحة على المنصة بالريال والهللات؟",
    qEn: "What payment methods are supported on Rafeeq?",
    aAr: "ندعم بوابة الدفع الإلكترونية المعتمدة بما يشمل بطاقات مدى السعودية، أبل باي، وبطاقات فيزا وماستركارد بجميع فئات الريال والهللات.",
    aEn: "We support Mada cards, Apple Pay, Visa, and Mastercard with exact SAR and Halala ledger calculation.",
  },
];

export default function FaqPage() {
  const { lang, isAr } = useLanguage();

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
          {FAQS.map((faq, idx) => (
            <div key={idx} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
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
