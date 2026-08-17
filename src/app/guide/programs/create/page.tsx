import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CreateProgramWizardPage() {
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "900px", marginInline: "auto" }}>
      <div style={{ marginBottom: "var(--space-8)" }}>
        <Link href="/guide/dashboard" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", textDecoration: "none" }}>
          ← العودة للوحة الأداء
        </Link>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "var(--space-2)" }}>إنشاء برنامج سياحي جديد ➕</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>أنشئ برنامجك ومسارك وسعرك، وتخضع جميع البرامج لمراجعة الأدمن قبل النشر</p>
      </div>

      {/* Progress Stepper */}
      <div className="glass" style={{ padding: "var(--space-4)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-around", marginBottom: "var(--space-8)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
        <div style={{ color: "var(--color-gold-royal)" }}>1. المعلومات والوجهة ✓</div>
        <div style={{ color: "var(--color-gold-royal)" }}>2. المسار والأنشطة ✓</div>
        <div style={{ color: "var(--color-saudi-green)" }}>3. الصور والتصاوير (5 صور)</div>
        <div style={{ color: "var(--color-text-muted)" }}>4. التسعير والتقويم</div>
      </div>

      <form className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800 }}>رفع الصور والوسائط (5 صور على الأقل مطلوبة)</h2>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>عنوان البرنامج بالعربية</label>
          <input type="text" placeholder="مثال: جولة تاريخية شاملة في العلا" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>الوجهة السياحية</label>
            <select style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
              <option value="alula">العلا</option>
              <option value="riyadh">الرياض</option>
              <option value="jeddah">جدة</option>
              <option value="the-red-sea">البحر الأحمر</option>
              <option value="aseer">عسير</option>
              <option value="al-ahsa">الأحساء</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>سعر الشخص (بالريال السعودي)</label>
            <input type="number" placeholder="850" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
          </div>
        </div>

        <div style={{ border: "2px dashed var(--color-gold-royal)", padding: "var(--space-8)", borderRadius: "var(--radius-xl)", textAlign: "center", background: "rgba(200, 169, 110, 0.05)" }}>
          <span style={{ fontSize: "var(--text-3xl)", display: "block", marginBottom: "var(--space-2)" }}>📸</span>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, display: "block", color: "var(--color-gold-dark)" }}>
            اسحب صور البرنامج هنا أو تصفح المجلدات
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>يلزم 5 صور على الأقل بنقاء عالي لنشر البرنامج</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outline" type="button">السابق</Button>
          <Button variant="primary" type="button">إرسال البرنامج للمراجعة والاعتماد →</Button>
        </div>
      </form>
    </div>
  );
}
