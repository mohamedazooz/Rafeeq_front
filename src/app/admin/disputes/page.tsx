"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Dispute {
  id: string;
  bookingCode: string;
  client: string;
  guide: string;
  reason: string;
  escrowAmount: string;
  status: "open" | "resolved_refund" | "resolved_payout" | "resolved_split";
  date: string;
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "dsp-1",
    bookingCode: "RFQ-8823",
    client: "فهد السليمان",
    guide: "ريم العلي",
    reason: "تأخر المرشد عن الموعد المحدد لمدة ساعتين مع التغيير في خطة المسار بدون اتفاق مسبق.",
    escrowAmount: "1,100.00 ر.س",
    status: "open",
    date: "2026-08-15",
  },
  {
    id: "dsp-2",
    bookingCode: "RFQ-8790",
    client: "منى بن سعيد",
    guide: "خالد الحربي",
    reason: "عدم حضور المرشد للموقع المتفق عليه وتأثر المسار بالكامل.",
    escrowAmount: "850.00 ر.س",
    status: "open",
    date: "2026-08-14",
  },
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleResolveRefund = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "resolved_refund" } : d))
    );
    setSelectedDispute(null);
    showToast("تم اعتماد إرجاع المبلغ كاملاً للعميل (100% Full Refund)! 🔄");
  };

  const handleResolvePayout = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "resolved_payout" } : d))
    );
    setSelectedDispute(null);
    showToast("تم رفض الشكوى وتحويل المستحقات لحساب المرشد البنكي! 💰");
  };

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>إدارة النزاعات والشكاوى 🔔</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>مراجعة شكاوى الحجوزات، اتخاذ القرارات المالية، والإفراج عن مبالغ الـ Escrow</p>
        </div>
      </div>

      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "var(--space-3)" }}>رمز الحجز</th>
              <th style={{ padding: "var(--space-3)" }}>العميل المشتكي</th>
              <th style={{ padding: "var(--space-3)" }}>المرشد المشكو بحقه</th>
              <th style={{ padding: "var(--space-3)" }}>مبلغ الـ Escrow</th>
              <th style={{ padding: "var(--space-3)" }}>حالة النزاع</th>
              <th style={{ padding: "var(--space-3)" }}>تاريخ الشكوى</th>
              <th style={{ padding: "var(--space-3)" }}>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px dashed var(--color-border)" }}>
                <td style={{ padding: "var(--space-3)", fontWeight: 800, color: "var(--color-gold-royal)" }}>{d.bookingCode}</td>
                <td style={{ padding: "var(--space-3)" }}>{d.client}</td>
                <td style={{ padding: "var(--space-3)" }}>{d.guide}</td>
                <td style={{ padding: "var(--space-3)", fontWeight: 700, color: "var(--color-info)" }}>{d.escrowAmount}</td>
                <td style={{ padding: "var(--space-3)" }}>
                  {d.status === "open" && (
                    <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                      قيد النظر ⚠️
                    </span>
                  )}
                  {d.status === "resolved_refund" && (
                    <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                      تم المسترجع للعميل ✓
                    </span>
                  )}
                  {d.status === "resolved_payout" && (
                    <span style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                      مستحقات محولة للمرشد ✓
                    </span>
                  )}
                </td>
                <td style={{ padding: "var(--space-3)", fontSize: "var(--text-xs)" }}>{d.date}</td>
                <td style={{ padding: "var(--space-3)" }}>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedDispute(d)}>
                    مراجعة واتخاذ القرار
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "var(--space-4)" }}>
          <div className="glass" style={{ width: "550px", background: "var(--color-midnight-blue)", padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>البت في الشكوى #{selectedDispute.bookingCode}</h3>

            <div style={{ padding: "var(--space-4)", background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-6)", fontSize: "var(--text-sm)" }}>
              <p style={{ marginBottom: "var(--space-2)" }}><strong>سبب الشكوى:</strong> {selectedDispute.reason}</p>
              <p style={{ marginBottom: "var(--space-2)" }}><strong>العميل:</strong> {selectedDispute.client}</p>
              <p style={{ marginBottom: "var(--space-2)" }}><strong>المرشد:</strong> {selectedDispute.guide}</p>
              <p><strong>مبلغ الضمان المحتجز (Escrow):</strong> <span style={{ color: "var(--color-gold-royal)", fontWeight: 800 }}>{selectedDispute.escrowAmount}</span></p>
            </div>

            <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, marginBottom: "var(--space-3)" }}>القرار المالي والتسوية:</h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
              <Button variant="danger" size="md" onClick={() => handleResolveRefund(selectedDispute.id)}>
                🔄 إعادة المبلغ 100% لحساب العميل
              </Button>
              <Button variant="primary" size="md" onClick={() => handleResolvePayout(selectedDispute.id)}>
                💰 رفض الشكوى والإفراج عن المستحقات للمرشد
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDispute(null)}>
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
