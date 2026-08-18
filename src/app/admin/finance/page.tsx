"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  WalletIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface PayoutRequest {
  id: string;
  guideName: string;
  guideEmail: string;
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
    guideEmail: "abdulaziz.alshammari@rafeeq.sa",
    bankName: "مصرف الراجحي",
    iban: "SA4210000001234567890101",
    amount: "9,250.00 ر.س",
    date: "2026-08-16",
    status: "pending",
  },
  {
    id: "payout-102",
    guideName: "خالد الحربي",
    guideEmail: "khaled.harbi@example.com",
    bankName: "البنك الأهلي السعودي (SNB)",
    iban: "SA9820000009876543210982",
    amount: "4,120.00 ر.س",
    date: "2026-08-15",
    status: "pending",
  },
];

export default function AdminFinancePage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [payouts, setPayouts] = useState<PayoutRequest[]>(INITIAL_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [transferRef, setTransferRef] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleConfirmPayoutModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayout) return;
    setPayouts((prev) =>
      prev.map((p) => (p.id === selectedPayout.id ? { ...p, status: "completed" } : p))
    );

    dispatchDualActionNotification({
      title: `تحويل الأرباح لحسابك البنكي (${selectedPayout.amount})`,
      message: `تم اعتماد التحويل البنكي لحسابك (${selectedPayout.bankName} - ${selectedPayout.iban}) بالرقم المرجعي (${transferRef || "TRX-88910"}).`,
      actionType: "PAYOUT",
      targetEmail: selectedPayout.guideEmail,
      targetName: selectedPayout.guideName,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم تأكيد التحويل البنكي للمرشد (${selectedPayout.guideName}) بمبلغ ${selectedPayout.amount} وإرسال إشعار فوري!` : `Bank transfer confirmed.`);
    setSelectedPayout(null);
    setTransferRef("");
  };

  const pendingPayouts = payouts.filter((p) => p.status === "pending");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#10B981", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <WalletIcon size={14} color="#10B981" />
          {isAr ? "مركز الرقابة المالية وحساب الضمان" : "Finance & Escrow Operations"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "المالية وحساب الضمان Escrow والسحوبات 💰" : "Finance, Escrow & Payouts"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "مراقبة مبالغ الضمان المحتجزة ومراجعة طلبات سحب الأرباح للمصارف السعودية واعتمادها." : "Monitor Escrow balances and execute guide bank payouts to Saudi IBAN accounts."}
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "18px" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{isAr ? "رصيد Escrow المحتجز الكلي" : "Total Escrow Locked"}</span>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#3B82F6", marginBlock: "6px" }}>38,400.00 ر.س</h2>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "لـ 42 حجز قائم لم ينتهِ بعد" : "For 42 active trips"}</span>
        </div>

        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "18px" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{isAr ? "إجمالي عمولات المنصة المحصلة" : "Platform Net Commission"}</span>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#10B981", marginBlock: "6px" }}>22,275.00 ر.س</h2>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "نسبة 15% عمولة صافية" : "15% net fee"}</span>
        </div>

        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "18px" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{isAr ? "طلبات السحب المعلقة" : "Pending Payout Requests"}</span>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#F59E0B", marginBlock: "6px" }}>
            {pendingPayouts.length} {isAr ? "طلبات" : "requests"}
          </h2>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "بانتظار التأكيد والتحويل لـ IBAN" : "Awaiting IBAN disbursement"}</span>
        </div>
      </div>

      {/* Payouts Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المرشد المستحق" : "Guide"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "البنك ورقم الآيبان (IBAN)" : "Bank & IBAN"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المبلغ المطلوب" : "Amount"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "تاريخ الطلب" : "Date"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراء الصرف" : "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{p.guideName}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{p.guideEmail}</div>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700 }}>{p.bankName}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-gold-heading)", direction: "ltr", textAlign: "start" }}>{p.iban}</div>
                </td>

                <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10B981" }}>{p.amount}</td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: p.status === "completed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                      color: p.status === "completed" ? "#10B981" : "#F59E0B",
                    }}
                  >
                    {p.status === "completed" ? (isAr ? "مكتمل التحويل ✓" : "Completed") : (isAr ? "قيد التدقيق ⏳" : "Pending")}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{p.date}</td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  {p.status === "pending" ? (
                    <IconButton
                      variant="success"
                      size="sm"
                      title={isAr ? "تأكيد التحويل البنكي وإدخال المرجع" : "Disburse Payout"}
                      icon={<CheckCircleIcon size={15} />}
                      onClick={() => setSelectedPayout(p)}
                    />
                  ) : (
                    <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>{isAr ? "تم التحويل ✓" : "Paid ✓"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!selectedPayout}
        onClose={() => setSelectedPayout(null)}
        title={isAr ? "تأكيد التحويل البنكي لـ IBAN" : "Confirm Bank Payout"}
        subtitle={selectedPayout ? `${selectedPayout.guideName} • ${selectedPayout.bankName}` : ""}
        maxWidth="520px"
      >
        {selectedPayout && (
          <form onSubmit={handleConfirmPayoutModal}>
            <div className="rafeeq-modal-box" style={{ fontSize: "13px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "المرشد المستفيد:" : "Guide:"}</span>
                <strong>{selectedPayout.guideName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "الحساب البنكي (IBAN):" : "IBAN:"}</span>
                <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>{selectedPayout.iban}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "المبلغ المطلوب صرفه:" : "Payout Amount:"}</span>
                <strong style={{ color: "#10B981", fontSize: "14px" }}>{selectedPayout.amount}</strong>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>{isAr ? "رقم المرجع البنكي للتحويل (Bank Reference Code)" : "Bank Reference Code"}</label>
              <input
                type="text"
                required
                placeholder="TRX-992014881023"
                value={transferRef}
                onChange={(e) => setTransferRef(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px", fontFamily: "monospace" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="ghost" size="md" type="button" onClick={() => setSelectedPayout(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
              <Button variant="primary" size="md" type="submit">{isAr ? "تأكيد وإتمام التحويل ✓" : "Confirm Payout"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
