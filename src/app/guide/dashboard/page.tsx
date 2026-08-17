import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STATS = [
  { label: "إجمالي الأرباح المستلمة", val: "14,250 ر.س", change: "+12% هذا الشهر", color: "var(--color-saudi-green)" },
  { label: "رصيد الـ Escrow المعلق", val: "3,400 ر.س", change: "في رحلتين قادمتين", color: "var(--color-gold-royal)" },
  { label: "إجمالي الحجوزات المؤكدة", val: "28 حجز", change: "نسبة قبول 100%", color: "var(--color-info)" },
  { label: "التقييم العام", val: "4.95 ⭐", change: "من 128 مسافر", color: "var(--color-warning)" },
] as const;

export default function GuideDashboardPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>لوحة الأداء — المرشد السياحي 🧭</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>متابعة حجوزاتك وأرباحك وتقويم التوافر الخاص بك</p>
        </div>
        <Link href="/guide/programs/create">
          <Button variant="primary" size="md">
            + إنشاء برنامج جديد
          </Button>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        {STATS.map((s) => (
          <div key={s.label} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{s.label}</span>
            <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: s.color, marginBlock: "var(--space-2)" }}>{s.val}</h3>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>{s.change}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Bookings */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-8)" }}>
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>أحدث الحجوزات المستقبلة</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ padding: "var(--space-4)", background: "var(--color-bg-primary)", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>جولة مدائن صالح في العلا</h4>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>العميل: محمد العتيبي • 24 أكتوبر 2026 (مشاركين 2)</p>
              </div>
              <span style={{ color: "var(--color-saudi-green)", fontWeight: 800, fontSize: "var(--text-sm)" }}>1,700 ر.س</span>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>إدارة سريعة</h3>
          <Link href="/guide/calendar">
            <Button variant="outline" fullWidth>🗓️ تعديل تقويم التوافر</Button>
          </Link>
          <Link href="/guide/wallet">
            <Button variant="secondary" fullWidth>💰 طلب سحب الأرباح</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
