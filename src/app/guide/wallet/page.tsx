"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const TRANSACTIONS = [
  { id: "tx-1", date: "2026-08-15", desc: "رحلة مدائن صالح (حجز #RFQ-9042)", amountSar: 1530, type: "إيداع أرباح", status: "مكتمل" },
  { id: "tx-2", date: "2026-08-10", desc: "سحب إلى حساب البنك الأهلي السعودي (SA4210...)", amountSar: -5000, type: "تحويل IBAN", status: "معتمد" },
];

export default function GuideWalletPage() {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("5000");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayoutModal(false);
    showToast(`تم تقديم طلب سحب مبلغ ${payoutAmount} ر.س إلى حسابك البنكي المعتمد بنجاح! 💸`);
  };

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-modal-bg)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 28px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.25)", zIndex: 9999, fontWeight: 800, fontSize: "14px" }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--color-text-primary)" }}>المحفظة والأرباح 💳</h1>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>متابعة العوائد المالية، رصيد الضمان وعمليات السحب إلى الآيبان البنكي</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowPayoutModal(true)}>
          طلب سحب أرباح 💸
        </Button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-gold-royal)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>الرصيد المتاح للسحب الفوري</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--color-saudi-green)", marginBlock: "var(--space-2)" }}>9,250.00 ر.س</h2>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>جاهز للتحويل الفوري إلى حسابك البنكي</p>
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

      {/* Payout Modal */}
      <Modal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        title="طلب سحب أرباح إلى الآيبان البنكي"
        subtitle="الحساب المستهدف: مصرف الراجحي (SA80000000608010167519)"
        maxWidth="480px"
      >
        <form onSubmit={handleRequestPayout}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>المبلغ المطلوب سحبه (ر.س)</label>
            <input
              type="number"
              required
              min={100}
              max={9250}
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "18px", fontWeight: 900, outline: "none" }}
            />
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
              الحد الأقصى للسحب: 9,250.00 ر.س (الحد الأدنى 100 ر.س)
            </span>
          </div>

          <div
            style={{
              padding: "12px 16px",
              background: "rgba(201, 162, 39, 0.08)",
              borderRadius: "10px",
              border: "1px solid rgba(201, 162, 39, 0.2)",
              fontSize: "12px",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--color-gold-royal)", display: "block", marginBottom: "4px" }}>
              الحساب البنكي المستلم:
            </strong>
            البنك الأهلي السعودي (SNB) - SA4210000001234567890123
          </div>

          <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end", marginTop: "var(--space-2)" }}>
            <Button variant="ghost" type="button" onClick={() => setShowPayoutModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit">
              تأكيد طلب السحب
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
