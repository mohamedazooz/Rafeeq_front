import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ClientDashboardOverviewPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <div style={{ marginBottom: "var(--space-8)" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>مرحباً بك، محمد ✦</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>نظرة عامة على رحلاتك القادمة ومراسلاتك مع المرشدين</p>
      </div>

      {/* Grid Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        {/* Next Trip Card */}
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-gold-royal)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-dark)", fontWeight: 700 }}>رحلتك القادمة</span>
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginTop: "var(--space-2)" }}>جولة مدائن صالح في العلا</h3>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBlock: "var(--space-2)" }}>📅 الخميس، 24 أكتوبر 2026</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-4)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-saudi-green)", fontWeight: 600 }}>🔒 الدفع مؤمّن بالضمان</span>
            <Link href="/client/bookings/book-101">
              <Button variant="primary" size="sm">تفاصيل الحجز</Button>
            </Link>
          </div>
        </div>

        {/* Wishlist Summary */}
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>قائمة الرغبات</span>
          <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "var(--space-2)" }}>4 برامج</h3>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBlock: "var(--space-2)" }}>محفوظة للتخطيط المستقبلي</p>
          <Link href="/client/wishlist" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700 }}>
            عرض القائمة ←
          </Link>
        </div>

        {/* Wallet Receipts */}
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>إجمالي المدفوعات</span>
          <h3 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-saudi-green)", marginTop: "var(--space-2)" }}>1,700 ر.س</h3>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBlock: "var(--space-2)" }}>عبر بوابات دفع محميّة</p>
          <Link href="/client/payments" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700 }}>
            عرض الفواتير ←
          </Link>
        </div>
      </div>
    </div>
  );
}
