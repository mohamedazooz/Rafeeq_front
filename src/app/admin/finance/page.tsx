"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface PayoutRequest {
  id: string;
  guideName: string;
  bankName: string;
  iban: string;
  amount: string;
  date: string;
  status: "pending" | "completed" | "rejected";
}

const INITIAL_PAYOUTS: PayoutRequest[] = [
  {
    id: "payout-101",
    guideName: "عبد العزيز الشمري",
    bankName: "مصرف الراجحي",
    iban: "SA4210000001234567890101",
    amount: "9,250.00 ر.س",
    date: "2026-08-16",
    status: "pending",
  },
  {
    id: "payout-102",
    guideName: "خالد الحربي",
    bankName: "البنك الأهلي السعودي (SNB)",
    iban: "SA9820000009876543210982",
    amount: "4,120.00 ر.س",
    date: "2026-08-15",
    status: "pending",
  },
];

export default function AdminFinancePage() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(INITIAL_PAYOUTS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleConfirmPayout = (id: string, name: string, amount: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p))
    );
    showToast(`تم تأكيد التحويل البنكي للمرشد (${name}) بمبلغ ${amount} بنجاح! ✓`);
  };

  const pendingPayouts = payouts.filter((p) => p.status === "pending");

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>المالية والـ Escrow والعمولات 💰</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>مراقبة مبالغ الضمان المحتجزة ومراجعة طلبات سحب الأرباح للمصارف السعودية واعتمادها</p>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>رصيد Escrow المحتجز الكلي</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-gold-royal)", marginBlock: "var(--space-2)" }}>38,400.00 ر.س</h2>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>لـ 42 حجز قائم</span>
        </div>

        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>إجمالي عمولات المنصة المحصلة</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-saudi-green)", marginBlock: "var(--space-2)" }}>22,275.00 ر.س</h2>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>نسبة 15% صافي إيراد</span>
        </div>

        <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>طلبات السحب المعلقة</span>
          <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-info)", marginBlock: "var(--space-2)" }}>
            {pendingPayouts.length} طلبات
          </h2>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>بانتظار التحويل لـ IBAN</span>
        </div>
      </div>

      {/* Payout Requests Section */}
      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>طلبات التحويل للمصارف السعودية المعلقة</h3>

        {payouts.length === 0 ? (
          <div style={{ padding: "var(--space-6)", textAlign: "center", color: "var(--color-text-muted)" }}>
            لا توجد طلبات سحب معلقة حالياً.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {payouts.map((p) => (
              <div key={p.id} style={{ padding: "var(--space-4)", background: "var(--color-bg-primary)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{p.guideName} • {p.bankName}</h4>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-1)" }}>
                    IBAN: <span style={{ direction: "ltr", display: "inline-block" }}>{p.iban}</span> • المبلغ: <strong style={{ color: "var(--color-gold-royal)" }}>{p.amount}</strong> • تاريخ الطلب: {p.date}
                  </p>
                </div>

                <div>
                  {p.status === "pending" ? (
                    <Button variant="primary" size="sm" onClick={() => handleConfirmPayout(p.id, p.guideName, p.amount)}>
                      تأكيد التحويل البنكي ✓
                    </Button>
                  ) : (
                    <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "6px 14px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                      تم التحويل البنكي بنجاح ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
