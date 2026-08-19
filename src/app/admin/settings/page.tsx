"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import {
  SettingsIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  WalletIcon,
  ScaleIcon,
} from "@/components/icons";

interface PricingAddition {
  id: string;
  nameAr: string;
  nameEn: string;
  kind: "tax" | "fee";
  calc: "percent" | "fixed";
  value: number;
  isActive: boolean;
}

const INITIAL_ADDITIONS: PricingAddition[] = [
  { id: "pa-1", nameAr: "ضريبة القيمة المضافة (VAT)", nameEn: "Value Added Tax", kind: "tax", calc: "percent", value: 15, isActive: true },
  { id: "pa-2", nameAr: "رسوم الخدمة والتشغيل التقني", nameEn: "Service Fee", kind: "fee", calc: "fixed", value: 25, isActive: true },
  { id: "pa-3", nameAr: "رسوم تنمية السياحة البلدية", nameEn: "Municipal Tourism Fee", kind: "fee", calc: "percent", value: 2.5, isActive: true },
];

export default function AdminSettingsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // Platform Rates & Governance Settings State
  const [commissionRate, setCommissionRate] = useState<number>(15);
  const [escrowHoldDays, setEscrowHoldDays] = useState<number>(3);
  const [cancellationFeePercent, setCancellationFeePercent] = useState<number>(10);
  const [softLockMinutes, setSoftLockMinutes] = useState<number>(15);
  const [minPayoutSar, setMinPayoutSar] = useState<number>(500);

  // Pricing Additions (Taxes & Fees)
  const [pricingAdditions, setPricingAdditions] = useState<PricingAddition[]>(INITIAL_ADDITIONS);
  const [showAdditionModal, setShowAdditionModal] = useState(false);
  const [newAddNameAr, setNewAddNameAr] = useState("");
  const [newAddNameEn, setNewAddNameEn] = useState("");
  const [newAddKind, setNewAddKind] = useState<"tax" | "fee">("fee");
  const [newAddCalc, setNewAddCalc] = useState<"percent" | "fixed">("percent");
  const [newAddValue, setNewAddValue] = useState<number>(5);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      showToast(isAr ? "تم تطبيق وتحديث نسب وعمولات المنصة وسياسات الـ Escrow بنجاح! ⚙️✓" : "Settings saved.");
    }, 600);
  };

  const handleToggleAddition = (id: string) => {
    setPricingAdditions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    showToast(isAr ? "تم تحديث حالة تفعيل الرسم / الضريبة!" : "Fee status updated.");
  };

  const handleDeleteAddition = (id: string) => {
    setPricingAdditions((prev) => prev.filter((a) => a.id !== id));
    showToast(isAr ? "تم حذف الرسم من هيكل التسعير!" : "Fee removed.");
  };

  const handleCreateAddition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddNameAr.trim()) return;

    const newAddition: PricingAddition = {
      id: `pa-${Date.now()}`,
      nameAr: newAddNameAr,
      nameEn: newAddNameEn || newAddNameAr,
      kind: newAddKind,
      calc: newAddCalc,
      value: Number(newAddValue),
      isActive: true,
    };

    setPricingAdditions([...pricingAdditions, newAddition]);
    setShowAdditionModal(false);
    setNewAddNameAr("");
    setNewAddNameEn("");
    setNewAddValue(5);
    showToast(isAr ? "تمت إضافة الرسم / الضريبة الجديدة بنجاح! 🏷️✓" : "Pricing addition added.");
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "1000px" }}>
      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            color: "var(--color-text-primary)",
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          إعدادات المنصة وتحديد النسب والعمولات ⚙️
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          ضبط نسبة عمولة المنصة، فترة احتجاز الضمان البنكي Escrow، الضرائب والرسوم المضافة
        </p>
      </div>

      <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        {/* Section 1: Platform Commission & Rates */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <WalletIcon size={20} color="var(--color-gold-heading)" />
            <h2 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
              1. نسبة عمولة المنصة والضمان البنكي (Platform Rates & Escrow)
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                نسبة عمولة المنصة الأساسية (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "14px", fontWeight: 800, color: "var(--color-gold-heading)" }}
              />
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
                تُقتطع تلقائياً من إجمالي مبلغ الحجز عند تحرير مستحقات المرشد السياحي
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                فترة احتجاز الضمان البنكي Escrow (أيام)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={escrowHoldDays}
                onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "14px", fontWeight: 800, color: "#10B981" }}
              />
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
                المدة اللازمة بعد انتهاء الرحلة قبل السماح للمرشد بطلب تحويل الـ IBAN
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                مهلة تجميد المقعد Soft-Lock (دقائق)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={softLockMinutes}
                onChange={(e) => setSoftLockMinutes(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                رسوم الإلغاء المتأخر (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={cancellationFeePercent}
                onChange={(e) => setCancellationFeePercent(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                الحد الأدنى لطلب السحب البنكي (ر.س)
              </label>
              <input
                type="number"
                min="100"
                max="5000"
                value={minPayoutSar}
                onChange={(e) => setMinPayoutSar(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Dynamic Pricing Additions (Taxes & Fees) */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ScaleIcon size={20} color="var(--color-gold-heading)" />
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
                2. الضرائب والرسوم وإضافات التسعير (Taxes & Pricing Additions)
              </h2>
            </div>
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAdditionModal(true)}>
              <PlusIcon size={14} />
              <span>إضافة رسم / ضريبة جديدة</span>
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {pricingAdditions.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800 }}>{item.nameAr}</span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: "4px",
                        background: item.kind === "tax" ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.15)",
                        color: item.kind === "tax" ? "#F59E0B" : "#3B82F6",
                      }}
                    >
                      {item.kind === "tax" ? "ضريبة حكومية" : "رسوم خدمة"}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{item.nameEn}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-gold-heading)" }}>
                    {item.calc === "percent" ? `${item.value}%` : `${item.value} ر.س`}
                  </span>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button variant={item.isActive ? "primary" : "ghost"} size="sm" type="button" onClick={() => handleToggleAddition(item.id)}>
                      {item.isActive ? "مفعل ✓" : "معطل"}
                    </Button>
                    <IconButton icon={<TrashIcon size={14} />} title="حذف" size="sm" variant="ghost" type="button" onClick={() => handleDeleteAddition(item.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
            <ShieldCheckIcon size={18} />
            <span>{isSaving ? "جاري حفظ وتطبيق الإعدادات..." : "حفظ ونشر إعدادات الحوكمة ⚙️✓"}</span>
          </Button>
        </div>
      </form>

      {/* Modal: Add Pricing Addition */}
      <Modal isOpen={showAdditionModal} onClose={() => setShowAdditionModal(false)} title="إضافة رسم أو ضريبة جديدة لهيكل التسعير" maxWidth="480px">
        <form onSubmit={handleCreateAddition} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالعربية</label>
            <input
              type="text"
              placeholder="مثال: رسوم التأمين السياحي"
              value={newAddNameAr}
              onChange={(e) => setNewAddNameAr(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالإنجليزية</label>
            <input
              type="text"
              placeholder="e.g. Travel Insurance Fee"
              value={newAddNameEn}
              onChange={(e) => setNewAddNameEn(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>نوع الإضافة</label>
              <select
                value={newAddKind}
                onChange={(e) => setNewAddKind(e.target.value as "tax" | "fee")}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              >
                <option value="fee">رسوم خدمة (Fee)</option>
                <option value="tax">ضريبة (Tax)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>طريقة الحساب</label>
              <select
                value={newAddCalc}
                onChange={(e) => setNewAddCalc(e.target.value as "percent" | "fixed")}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              >
                <option value="percent">نسبة مئوية (%)</option>
                <option value="fixed">مبلغ ثابت (SAR)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
              القيمة ({newAddCalc === "percent" ? "%" : "ر.س"})
            </label>
            <input
              type="number"
              step="0.1"
              value={newAddValue}
              onChange={(e) => setNewAddValue(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowAdditionModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">إضافة وتفعيل</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
