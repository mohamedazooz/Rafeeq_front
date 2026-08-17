import { Button } from "@/components/ui/Button";

const TRANSACTIONS = [
  { id: "tx-1", date: "2026-08-15", desc: "رحلة مدائن صالح (حجز #RFQ-9042)", amountSar: 1530, type: "إيداع أرباح", status: "مكتمل" },
  { id: "tx-2", date: "2026-08-10", desc: "سحب إلى حساب البنك الأهلي السعودي (SA4210...)", amountSar: -5000, type: "تحويل IBAN", status: "معتمد" },
] as const;

export default function GuideWalletPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <div style={{ marginBottom: "var(--space-8)" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>المحفظة والأرباح 💰</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>عرض صافي الأرباح والرصيد المتاح وسجل المعاملات وطلبات السحب</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-saudi-green)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>الرصيد المتاح للسحب</span>
          <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--color-saudi-green)", marginBlock: "var(--space-2)" }}>9,250.00 ر.س</h2>
          <Button variant="primary" size="sm" style={{ marginTop: "var(--space-3)" }}>
            طلب سحب إلى الحساب البنكي
          </Button>
        </div>

        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>رصيد الضمان المعلق (Escrow)</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-gold-royal)", marginBlock: "var(--space-2)" }}>3,400.00 ر.س</h2>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>يتحرر تلقائياً بعد اكتمال الرحلات</p>
        </div>

        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>إجمالي المسحوبات السابق</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-text-primary)", marginBlock: "var(--space-2)" }}>15,000.00 ر.س</h2>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>تحويلات IBAN مكتملة</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>سجل المعاملات الحسابية</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "var(--space-3)" }}>التاريخ</th>
              <th style={{ padding: "var(--space-3)" }}>البيان / الوصف</th>
              <th style={{ padding: "var(--space-3)" }}>النوع</th>
              <th style={{ padding: "var(--space-3)" }}>المبلغ (ر.س)</th>
              <th style={{ padding: "var(--space-3)" }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: "1px dashed var(--color-border)" }}>
                <td style={{ padding: "var(--space-3)" }}>{tx.date}</td>
                <td style={{ padding: "var(--space-3)", fontWeight: 600 }}>{tx.desc}</td>
                <td style={{ padding: "var(--space-3)" }}>{tx.type}</td>
                <td style={{ padding: "var(--space-3)", fontWeight: 800, color: tx.amountSar > 0 ? "var(--color-saudi-green)" : "var(--color-text-primary)" }}>
                  {tx.amountSar > 0 ? `+${tx.amountSar}` : tx.amountSar} ر.س
                </td>
                <td style={{ padding: "var(--space-3)" }}>
                  <span style={{ color: "var(--color-saudi-green)", fontWeight: 700, fontSize: "var(--text-xs)" }}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
