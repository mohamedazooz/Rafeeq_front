"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [commissionRate, setCommissionRate] = useState<number>(15);
  const [escrowHoldDays, setEscrowHoldDays] = useState<number>(3);
  const [cancellationFeePercent, setCancellationFeePercent] = useState<number>(10);
  const [vatActive, setVatActive] = useState<boolean>(true);
  const [serviceFeeActive, setServiceFeeActive] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("تم تحديث وحفظ إعدادات الحوكمة والتسعير على مستوى المنصة بنجاح! ⚙️✓");
  };

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "800px" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom: "var(--space-8)" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>إعدادات الحوكمة والتسعير ⚙️</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>ضبط نسبة العمولة، إضافات الأدمن (رسوم وضرائب)، وفترة احتجاز الضمان والسياسات المالية</p>
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800 }}>1. إعدادات العمولة والضمان البنكي</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>نسبة عمولة المنصة (%)</label>
            <input
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "rgba(0,0,0,0.2)", color: "#fff" }}
            />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>تخصم من مستحق المرشد</span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>فترة احتجاز الضمان (أيام)</label>
            <input
              type="number"
              value={escrowHoldDays}
              onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
              style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "rgba(0,0,0,0.2)", color: "#fff" }}
            />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>المدة بعد مكتمل الرحلة حتى الإفراج</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>رسوم الإلغاء المتأخر (%)</label>
          <input
            type="number"
            value={cancellationFeePercent}
            onChange={(e) => setCancellationFeePercent(Number(e.target.value))}
            style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "rgba(0,0,0,0.2)", color: "#fff" }}
          />
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>تقتطع عند الإلغاء قبل أقل من 24 ساعة</span>
        </div>

        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginTop: "var(--space-4)" }}>2. إضافات أدمن التسعير (الضرائب والرسوم)</h2>

        <div style={{ padding: "var(--space-4)", background: "var(--color-bg-primary)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>ضريبة القيمة المضافة (VAT 15%)</h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>نوع: ضريبة رسمية • قيمة: 15% عائمة</p>
          </div>
          <button
            type="button"
            onClick={() => setVatActive(!vatActive)}
            style={{
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: vatActive ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              color: vatActive ? "var(--color-saudi-green)" : "var(--color-text-muted)",
              fontWeight: 700,
              fontSize: "var(--text-xs)",
              cursor: "pointer",
            }}
          >
            {vatActive ? "مفعلة ✓" : "معطلة ✕"}
          </button>
        </div>

        <div style={{ padding: "var(--space-4)", background: "var(--color-bg-primary)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>رسوم خدمة المنصة والضمان البنكي</h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>نوع: رسوم تشغيلية • قيمة: 25 ر.س ثابتة لكل حجز</p>
          </div>
          <button
            type="button"
            onClick={() => setServiceFeeActive(!serviceFeeActive)}
            style={{
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: serviceFeeActive ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              color: serviceFeeActive ? "var(--color-saudi-green)" : "var(--color-text-muted)",
              fontWeight: 700,
              fontSize: "var(--text-xs)",
              cursor: "pointer",
            }}
          >
            {serviceFeeActive ? "مفعلة ✓" : "معطلة ✕"}
          </button>
        </div>

        <Button type="submit" variant="primary" size="lg">
          حفظ إعدادات الحوكمة والتسعير ⚙️
        </Button>
      </form>
    </div>
  );
}
