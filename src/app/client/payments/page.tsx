export default function ClientPaymentsPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>سجل المدفوعات والفواتير 💳</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>عرض جميع الفواتير الضريبية وتفاصيل عمليات الدفع بالريال السعودي</p>

      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "var(--space-3)" }}>رقم الفاتورة</th>
              <th style={{ padding: "var(--space-3)" }}>البرنامج</th>
              <th style={{ padding: "var(--space-3)" }}>التاريخ</th>
              <th style={{ padding: "var(--space-3)" }}>طريقة الدفع</th>
              <th style={{ padding: "var(--space-3)" }}>المبلغ (ر.س)</th>
              <th style={{ padding: "var(--space-3)" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px dashed var(--color-border)" }}>
              <td style={{ padding: "var(--space-3)", fontWeight: 700 }}>INV-2026-9042</td>
              <td style={{ padding: "var(--space-3)" }}>جولة مدائن صالح بالعلا</td>
              <td style={{ padding: "var(--space-3)" }}>2026-08-15</td>
              <td style={{ padding: "var(--space-3)" }}>بطاقة مدى (Mada)</td>
              <td style={{ padding: "var(--space-3)", fontWeight: 800, color: "var(--color-saudi-green)" }}>1,700.00 ر.س</td>
              <td style={{ padding: "var(--space-3)" }}>
                <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, cursor: "pointer" }}>تحميل PDF 📄</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
