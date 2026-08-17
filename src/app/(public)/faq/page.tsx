import { BackButton } from "@/components/ui/BackButton";

const FAQS = [
  { q: "كيف تضمن منصة رفيق حقي المالي عند الحجز؟", a: "يتم حجز مبلغ الرحلة بالكامل في حساب ضمان مؤمّن ومحمي، ولا يتم تحويل المستحقات للمرشد السياحي إلا بعد اكتمال تنفيذ البرنامج وانقضاء فترة الاحتجاز المحددة من الإدارة." },
  { q: "هل يحتاج العميل لإنشاء حساب لتصفح البرامج والوجهات؟", a: "لا، الاستكشاف والبحث وتصفح كافة التفاصيل والوجهات متاح مجاناً وبدون حساب. يلزم تسجيل الدخول فقط عند الحجز أو المراسلة أو التقييم." },
  { q: "ما هي شروط الانضمام كمرشد سياحي في رفيق؟", a: "يجب أن تكون بعمر 18 عاماً فأكثر ومواطناً في المملكة ومتحصلاً على الهوية الوطنية ورخصة مرشد سياحي معتمدة من وزارة السياحة السعودية." },
  { q: "ما هي طرق الدفع المتاحة على المنصة؟", a: "ندعم بوابة الدفع الإلكترونية المعتمدة بما يشمل بطاقات مدى السعودية، الفيزا، الماستركارد، وخدمة أبل باي بالريال السعودي." },
] as const;

export default function FaqPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-midnight)", paddingBlock: "var(--space-28) var(--space-12)", textAlign: "center" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: "right" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-4xl)", fontWeight: 800 }}>الأسئلة <span className="text-gradient">الشائعة</span></h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-lg)", maxWidth: "500px", marginInline: "auto", marginTop: "var(--space-3)" }}>
            كل ما تود معرفته عن الحجز، الدفع بالضمان، والاعتماد في رفيق.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {FAQS.map((faq) => (
            <div key={faq.q} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "var(--space-2)" }}>{faq.q}</h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
