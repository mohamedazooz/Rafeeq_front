import { Button } from "@/components/ui/Button";

export default function GuideProfilePage() {
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>الملف الاحترافي للمرشد 👤</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>تحديث معلوماتك ورخصة الإرشاد السياحي والحساب البنكي</p>

      <form className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>الاسم كما يظهر للمسافرين</label>
          <input type="text" defaultValue="عبد العزيز الشمري" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>رقم رخصة الإرشاد السياحي (وزارة السياحة)</label>
          <input type="text" defaultValue="TL-994021" disabled style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", opacity: 0.7 }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>رقم الحساب البنكي (IBAN) لاستلام الأرباح</label>
          <input type="text" defaultValue="SA4210000001234567890101" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", direction: "ltr" }} />
        </div>

        <Button variant="primary" size="md">حفظ التغييرات</Button>
      </form>
    </div>
  );
}
