import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default function ContactPage() {
  return (
    <>
      <section style={{ background: "var(--gradient-midnight)", paddingBlock: "var(--space-28) var(--space-12)", textAlign: "center" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: "right" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-4xl)", fontWeight: 800 }}>تواصل <span className="text-gradient">معنا</span></h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-lg)", maxWidth: "500px", marginInline: "auto", marginTop: "var(--space-3)" }}>
            نحن هنا لمساعدتك والإجابة على أي استفسار حول البرامج والحجوزات.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <form className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-1)" }}>الاسم الكامل</label>
              <input type="text" placeholder="أدخل اسمك" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-1)" }}>البريد الإلكتروني / رقم الجوال</label>
              <input type="text" placeholder="example@domain.com" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: "var(--space-1)" }}>نص الرسالة</label>
              <textarea rows={4} placeholder="اكتب استفسارك هنا..." style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
            </div>
            <Button variant="primary" fullWidth size="lg">إرسال الرسالة</Button>
          </form>
        </div>
      </section>
    </>
  );
}
