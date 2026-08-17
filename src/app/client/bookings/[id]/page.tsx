import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ClientBookingDetailPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "800px" }}>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <Link href="/client/bookings" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", textDecoration: "none" }}>
          ← العودة لحجوزاتي
        </Link>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginTop: "var(--space-2)" }}>تفاصيل الحجز #RFQ-2026-9042</h1>
      </div>

      <div className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", marginBottom: "var(--space-6)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", paddingBottom: "var(--space-4)", borderBottom: "1px solid var(--color-border)" }}>
          <div>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800 }}>جولة مدائن صالح والبلدة القديمة بالعلا</h2>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>المرشد: عبد العزيز الشمري</p>
          </div>
          <span style={{ background: "rgba(0, 108, 53, 0.1)", color: "var(--color-saudi-green)", padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
            تأكيد الحجز تلقائي ✓
          </span>
        </div>

        {/* Financial Snapshot Table */}
        <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-3)" }}>التكلفة المفصلة (لقطة التسعير المجمدة)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>سعر الشخص (850 ر.س × 2 مشاركين)</span>
            <span>1,700.00 ر.س</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
            <span>رسوم المنصة والضريبة (تظهر مفصّلة)</span>
            <span>مشمولة في الإجمالي</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "var(--text-lg)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-border)" }}>
            <span>الإجمالي المدفوع</span>
            <span style={{ color: "var(--color-saudi-green)" }}>1,700.00 ر.س</span>
          </div>
        </div>

        {/* Escrow Banner */}
        <div style={{ background: "rgba(200, 169, 110, 0.1)", border: "1px solid var(--color-gold-royal)", padding: "var(--space-4)", borderRadius: "var(--radius-xl)", display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          <span style={{ fontSize: "var(--text-2xl)" }}>🔒</span>
          <div>
            <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--color-gold-royal)" }}>حماية الضمان (Escrow Protection)</h4>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
              المبلغ محجوز في حساب ضمان المنصة وسيتم تحويله للمرشد بعد اكتمال تنفيذ الرحلة.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
          <Button variant="outline" size="sm">تواصل مع المرشد</Button>
          <Button variant="ghost" size="sm" style={{ color: "var(--color-error)" }}>طلب إلغاء واسترداد</Button>
        </div>
      </div>
    </div>
  );
}
