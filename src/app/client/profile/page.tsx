import { Button } from "@/components/ui/Button";

export default function ClientProfilePage() {
  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "700px" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>الملف الشخصي 👤</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>تعديل بياناتك الشخصية وإعدادات الأمان والتنبيهات</p>

      <form className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>الاسم الكامل</label>
          <input type="text" defaultValue="محمد العتيبي" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>رقم الجوال</label>
          <input type="tel" defaultValue="+966 55 333 4444" disabled style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", opacity: 0.7 }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>البريد الإلكتروني</label>
          <input type="email" defaultValue="m.otaibi@domain.sa" style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
        </div>

        <Button variant="primary" size="md">حفظ التغييرات</Button>
      </form>
    </div>
  );
}
