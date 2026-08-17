import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default function BecomeGuideWizardPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-midnight-blue)", paddingBlock: "var(--space-12)" }}>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "var(--space-6)" }}>
          <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
        </div>

        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <Link href="/" style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-gold-royal)", textDecoration: "none" }}>
            رفيق
          </Link>
          <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "var(--space-3)" }}>
            انضم كمرشد سياحي معتمد
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            حوّل شغفك وتجربتك إلى مصدر دخل مستقل مع حماية حقوقك المالية بحساب الضمان المحمي
          </p>
        </div>

        {/* Wizard Steps Progress Header */}
        <div className="glass" style={{ padding: "var(--space-4)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-around", marginBottom: "var(--space-8)" }}>
          <div style={{ textAlign: "center", color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-xs)" }}>1. البيانات الشخصية ✓</div>
          <div style={{ textAlign: "center", color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-xs)" }}>2. رفع الوثائق ✓</div>
          <div style={{ textAlign: "center", color: "var(--color-warm-white)", fontWeight: 700, fontSize: "var(--text-xs)" }}>3. السيرة واللغات</div>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "var(--text-xs)" }}>4. المراجعة</div>
        </div>

        {/* Wizard Form */}
        <form className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <h2 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-xl)", fontWeight: 800 }}>رفع الوثائق والتراخيص الرسمية</h2>

          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>رقم الهوية الوطنية / الإقامة</label>
            <input type="text" placeholder="1XXXXXXXXX" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.05)", color: "white" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>رقم رخصة المرشد السياحي (وزارة السياحة)</label>
            <input type="text" placeholder="TL-XXXXXX" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.05)", color: "white" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>رفع صورة بطاقة الترخيص الرسمية</label>
            <div style={{ padding: "var(--space-8)", border: "2px dashed var(--color-gold-royal)", borderRadius: "var(--radius-xl)", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.02)" }}>
              <span style={{ fontSize: "var(--text-2xl)", display: "block", marginBottom: "var(--space-2)" }}>📄</span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-light)", fontWeight: 700 }}>انقر لرفع وثيقة رخصة الإرشاد السياحي</span>
            </div>
          </div>

          <Button variant="primary" fullWidth size="lg">إرسال الطلب للاعتماد 🚀</Button>
        </form>
      </div>
    </div>
  );
}
