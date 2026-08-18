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
    <div style={{ maxWidth: "850px" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "#10B981", color: "#fff", padding: "14px 28px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", zIndex: 9999, fontWeight: 800, fontSize: "14px" }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#C8A96E" }}>إعدادات الحوكمة والتسعير ⚙️</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>ضبط نسبة العمولة، إضافات الأدمن (رسوم وضرائب)، وفترة احتجاز الضمان والسياسات المالية</p>
      </div>

      <form onSubmit={handleSave} style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "28px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>1. إعدادات العمولة والضمان البنكي</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>نسبة عمولة المنصة (%)</label>
            <input
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)", color: "#fff", outline: "none", fontSize: "13px" }}
            />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", display: "block", marginTop: "4px" }}>تخصم من مستحق المرشد عند الإفراج</span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>فترة احتجاز الضمان (أيام)</label>
            <input
              type="number"
              value={escrowHoldDays}
              onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)", color: "#fff", outline: "none", fontSize: "13px" }}
            />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", display: "block", marginTop: "4px" }}>المدة بعد مكتمل الرحلة حتى الإفراج</span>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>رسوم الإلغاء المتأخر (%)</label>
          <input
            type="number"
            value={cancellationFeePercent}
            onChange={(e) => setCancellationFeePercent(Number(e.target.value))}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)", color: "#fff", outline: "none", fontSize: "13px" }}
          />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", display: "block", marginTop: "4px" }}>تقتطع عند الإلغاء قبل أقل من 24 ساعة</span>
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginTop: "8px" }}>2. إضافات أدمن التسعير (الضرائب والرسوم)</h2>

        <div style={{ padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>ضريبة القيمة المضافة (VAT 15%)</h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>نوع: ضريبة رسمية • قيمة: 15% عائمة</p>
          </div>
          <button
            type="button"
            onClick={() => setVatActive(!vatActive)}
            style={{
              padding: "4px 12px",
              borderRadius: "100px",
              border: "none",
              background: vatActive ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              color: vatActive ? "#10B981" : "rgba(255,255,255,0.4)",
              fontWeight: 800,
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            {vatActive ? "مفعلة ✓" : "معطلة ✕"}
          </button>
        </div>

        <div style={{ padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>رسوم خدمة المنصة والضمان البنكي</h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>نوع: رسوم تشغيلية • قيمة: 25 ر.س ثابتة لكل حجز</p>
          </div>
          <button
            type="button"
            onClick={() => setServiceFeeActive(!serviceFeeActive)}
            style={{
              padding: "4px 12px",
              borderRadius: "100px",
              border: "none",
              background: serviceFeeActive ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
              color: serviceFeeActive ? "#10B981" : "rgba(255,255,255,0.4)",
              fontWeight: 800,
              fontSize: "11px",
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
