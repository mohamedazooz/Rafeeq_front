import { BackButton } from "@/components/ui/BackButton";

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-midnight)", paddingBlock: "var(--space-28) var(--space-12)", textAlign: "center" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: "right" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-4xl)", fontWeight: 800 }}>عن منصة <span className="text-gradient">رفيق</span></h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-lg)", maxWidth: "600px", marginInline: "auto", marginTop: "var(--space-3)" }}>
            المنصة الرقمية السعودية الوسيطة لربط المسافرين بالمرشدين السياحيين المعتمدين لتنفيذ برامج سياحية موثوقة بحساب الضمان المحمي.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>رؤيتنا واختصاصنا</h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)", marginBottom: "var(--space-6)" }}>
            تأتي منصة رفيق تماشياً مع مستهدفات رؤية المملكة 2030 في تعزيز السياحة الوطنية وتوفير فرص عمل مستدامة للمرشدين السياحيين المرخصين والمحترفين. تتيح المنصة للمسافرين من داخل وخارج المملكة اكتشاف السعودية الحقيقية من خلال تجارب محلية موثوقة ودفع آمن بحساب الضمان المحمي.
          </p>
        </div>
      </section>
    </>
  );
}
