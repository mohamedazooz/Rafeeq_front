"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
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
  { id: "pa-1", nameAr: "ضريبة القيمة المضافة (VAT)", nameEn: "Value Added Tax (VAT)", kind: "tax", calc: "percent", value: 15, isActive: true },
  { id: "pa-2", nameAr: "رسوم الخدمة والتشغيل التقني", nameEn: "Technical Platform Fee", kind: "fee", calc: "fixed", value: 25, isActive: true },
  { id: "pa-3", nameAr: "رسوم تنمية السياحة والبلديات", nameEn: "Tourism Development Fee", kind: "fee", calc: "percent", value: 2.5, isActive: true },
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
      showToast(isAr ? "تم تطبيق وتحديث نسب وعمولات المنصة وسياسات الـ Escrow بنجاح." : "Settings updated successfully.");
    }, 500);
  };

  const handleToggleAddition = (id: string) => {
    setPricingAdditions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    showToast(isAr ? "تم تحديث حالة تفعيل الرسم / الضريبة." : "Fee status updated.");
  };

  const handleDeleteAddition = (id: string) => {
    setPricingAdditions((prev) => prev.filter((a) => a.id !== id));
    showToast(isAr ? "تم حذف الرسم من هيكل التسعير." : "Fee removed.");
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
    showToast(isAr ? "تمت إضافة الرسم / الضريبة الجديدة بنجاح." : "Pricing addition added.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px" }}>
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
            padding: "14px 24px",
            borderRadius: "14px",
            boxShadow: "var(--shadow-xl)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircleIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(200, 169, 110, 0.15)",
            border: "1px solid rgba(200, 169, 110, 0.3)",
            padding: "4px 12px",
            borderRadius: "100px",
            color: "var(--color-gold-heading)",
            fontSize: "11px",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          <SettingsIcon size={14} color="var(--color-gold-heading)" />
          <span>{isAr ? "إعدادات المنصة والسياسات المالية" : "Platform Governance Settings"}</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "إعدادات المنصة وتحديد النسب والضرائب" : "Platform Settings, Rates & VAT"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr
            ? "ضبط نسبة عمولة المنصة، فترة احتجاز الضمان البنكي Escrow، الضرائب والرسوم المضافة."
            : "Commission percentage, escrow holding duration, and tax rules."}
        </p>
      </div>

      <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Section 1: Platform Commission & Rates */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "18px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-gold-heading)" }}>
            {isAr ? "النسب والعمولات وسياسات الدفع" : "Commission & Escrow Rules"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                {isAr ? "نسبة عمولة المنصة القياسية (%)" : "Standard Commission Rate (%)"}
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                {isAr ? "فترة احتجاز الضمان بعد انتهاء الجولة (أيام)" : "Escrow Hold Period (Days)"}
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={escrowHoldDays}
                onChange={(e) => setEscrowHoldDays(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                {isAr ? "رسوم الإلغاء المتأخر للمسافر (%)" : "Late Cancellation Penalty (%)"}
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={cancellationFeePercent}
                onChange={(e) => setCancellationFeePercent(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                {isAr ? "الحد الأدنى لطلب التحويل البنكي (SAR)" : "Min Payout Request (SAR)"}
              </label>
              <input
                type="number"
                min={50}
                value={minPayoutSar}
                onChange={(e) => setMinPayoutSar(Number(e.target.value))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing Additions (Taxes & Fees) */}
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "18px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-gold-heading)" }}>
                {isAr ? "الضرائب والرسوم الإلزامية (VAT & Platform Fees)" : "Taxes & Platform Fees"}
              </h2>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                {isAr ? "هيكل الرسوم والضرائب المطبقة تلقائياً عند الدفع النهائي." : "Automatically applied fees and VAT at checkout."}
              </p>
            </div>

            <Button variant="outline" size="sm" type="button" onClick={() => setShowAdditionModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <PlusIcon size={14} />
              <span>{isAr ? "إضافة رسم / ضريبة" : "Add Tax/Fee"}</span>
            </Button>
          </div>

          <div className="rafeeq-table-wrapper">
            <table className="rafeeq-table">
              <thead>
                <tr>
                  <th>{isAr ? "اسم البند" : "Name"}</th>
                  <th>{isAr ? "النوع" : "Kind"}</th>
                  <th>{isAr ? "طريقة الاحتساب" : "Calculation"}</th>
                  <th>{isAr ? "القيمة" : "Value"}</th>
                  <th>{isAr ? "الحالة" : "Status"}</th>
                  <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {pricingAdditions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 800 }}>{isAr ? item.nameAr : item.nameEn}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: item.kind === "tax" ? "var(--color-gold-heading)" : "#3B82F6" }}>
                        {item.kind === "tax" ? (isAr ? "ضريبة رسمية" : "Official Tax") : (isAr ? "رسوم خدمة" : "Service Fee")}
                      </span>
                    </td>
                    <td>{item.calc === "percent" ? (isAr ? "نسبة مئوية (%)" : "Percentage (%)") : (isAr ? "مبلغ ثابت (SAR)" : "Fixed Amount (SAR)")}</td>
                    <td>
                      <span style={{ fontWeight: 900, color: "#10B981" }}>
                        {item.value} {item.calc === "percent" ? "%" : isAr ? "ر.س" : "SAR"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleAddition(item.id)}
                        className="rafeeq-action-btn"
                        style={{
                          background: item.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                          color: item.isActive ? "#10B981" : "#EF4444",
                          borderColor: item.isActive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
                        }}
                      >
                        <span>{item.isActive ? (isAr ? "مفعل" : "Active") : (isAr ? "معطل" : "Disabled")}</span>
                      </button>
                    </td>
                    <td style={{ textAlign: "end" }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteAddition(item.id)}
                        className="rafeeq-action-btn"
                        style={{ color: "#EF4444" }}
                        title={isAr ? "حذف" : "Delete"}
                      >
                        <TrashIcon size={14} color="#EF4444" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" size="lg" type="submit" disabled={isSaving} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <CheckCircleIcon size={16} />
            <span>{isSaving ? (isAr ? "جاري الحفظ والتطبيق..." : "Saving...") : (isAr ? "حفظ ونشر إعدادات الحوكمة" : "Save & Publish Settings")}</span>
          </Button>
        </div>
      </form>

      {/* Add Tax/Fee Modal */}
      <Modal
        isOpen={showAdditionModal}
        onClose={() => setShowAdditionModal(false)}
        title={isAr ? "إضافة رسم أو ضريبة جديدة" : "Add New Tax / Fee"}
      >
        <form onSubmit={handleCreateAddition} style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم بالعربية" : "Name (Arabic)"}</label>
            <input type="text" required value={newAddNameAr} onChange={(e) => setNewAddNameAr(e.target.value)} placeholder="ضريبة القيمة المضافة" style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم بالإنجليزية" : "Name (English)"}</label>
            <input type="text" value={newAddNameEn} onChange={(e) => setNewAddNameEn(e.target.value)} placeholder="VAT" style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "النوع" : "Kind"}</label>
              <select value={newAddKind} onChange={(e) => setNewAddKind(e.target.value as "tax" | "fee")} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }}>
                <option value="tax">{isAr ? "ضريبة" : "Tax"}</option>
                <option value="fee">{isAr ? "رسوم خدمة" : "Service Fee"}</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "طريقة الاحتساب" : "Calculation"}</label>
              <select value={newAddCalc} onChange={(e) => setNewAddCalc(e.target.value as "percent" | "fixed")} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }}>
                <option value="percent">{isAr ? "نسبة مئوية (%)" : "Percentage (%)"}</option>
                <option value="fixed">{isAr ? "مبلغ ثابت (SAR)" : "Fixed (SAR)"}</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "القيمة" : "Value"}</label>
            <input type="number" required value={newAddValue} onChange={(e) => setNewAddValue(Number(e.target.value))} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAdditionModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="sm" type="submit">{isAr ? "إضافة الرسم" : "Add Fee"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
