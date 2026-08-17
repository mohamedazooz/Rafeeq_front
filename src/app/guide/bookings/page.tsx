import { Button } from "@/components/ui/Button";

export default function GuideBookingsPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>حجوزات العملاء 🎫</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>متابعة وقبول الحجوزات المستقبلة والتواصل مع المسافرين</p>

      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "var(--space-3)" }}>رقم الحجز</th>
              <th style={{ padding: "var(--space-3)" }}>اسم المسافر</th>
              <th style={{ padding: "var(--space-3)" }}>البرنامج</th>
              <th style={{ padding: "var(--space-3)" }}>التاريخ</th>
              <th style={{ padding: "var(--space-3)" }}>المشاركين</th>
              <th style={{ padding: "var(--space-3)" }}>صافي المستحق</th>
              <th style={{ padding: "var(--space-3)" }}>حالة الدفع بالضمان</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px dashed var(--color-border)" }}>
              <td style={{ padding: "var(--space-3)", fontWeight: 700 }}>RFQ-2026-9042</td>
              <td style={{ padding: "var(--space-3)" }}>محمد العتيبي</td>
              <td style={{ padding: "var(--space-3)" }}>جولة مدائن صالح بالعلا</td>
              <td style={{ padding: "var(--space-3)" }}>2026-10-24</td>
              <td style={{ padding: "var(--space-3)" }}>2 أشخاص</td>
              <td style={{ padding: "var(--space-3)", fontWeight: 800, color: "var(--color-saudi-green)" }}>1,445.00 ر.س (بعد تخصيم 15% عمولة)</td>
              <td style={{ padding: "var(--space-3)" }}>
                <span style={{ color: "var(--color-gold-royal)", fontWeight: 700, fontSize: "var(--text-xs)" }}>محجوز في Escrow 🔒</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
