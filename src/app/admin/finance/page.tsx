"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  WalletIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SearchIcon,
  CreditCardIcon,
} from "@/components/icons";

interface PayoutRequest {
  id: string;
  guideName: string;
  guideEmail: string;
  bankName: string;
  iban: string;
  amountSar: number;
  date: string;
  status: "pending" | "completed" | "rejected";
  transferRef?: string;
}

const INITIAL_PAYOUTS: PayoutRequest[] = [
  {
    id: "payout-101",
    guideName: "عبد العزيز الشمري",
    guideEmail: "abdulaziz.alshammari@rafeeq.sa",
    bankName: "مصرف الراجحي",
    iban: "SA4210000001234567890101",
    amountSar: 9250,
    date: "2026-08-16",
    status: "pending",
  },
  {
    id: "payout-102",
    guideName: "خالد الحربي",
    guideEmail: "khaled.harbi@example.com",
    bankName: "البنك الأهلي السعودي (SNB)",
    iban: "SA9820000009876543210982",
    amountSar: 4120,
    date: "2026-08-15",
    status: "pending",
  },
  {
    id: "payout-100",
    guideName: "ريم العلي",
    guideEmail: "reem.ali@example.com",
    bankName: "بنك الرياض",
    iban: "SA1220000004561237890112",
    amountSar: 6800,
    date: "2026-08-10",
    status: "completed",
    transferRef: "SARIE-994021-TX",
  },
];

export default function AdminFinancePage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { decrementPayoutsQueue } = useDashboardMetrics();

  const [payouts, setPayouts] = useState<PayoutRequest[]>(INITIAL_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [transferRef, setTransferRef] = useState<string>("");
  const [isSettling, setIsSettling] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredPayouts = payouts.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesSearch =
      p.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.iban.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.guideEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleConfirmPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayout) return;
    setIsSettling(true);

    const ref = transferRef || `SARIE-${Date.now().toString().slice(-6)}`;

    setPayouts((prev) =>
      prev.map((p) =>
        p.id === selectedPayout.id ? { ...p, status: "completed", transferRef: ref } : p
      )
    );

    // Decrement the payout queue counter
    decrementPayoutsQueue();

    try {
      await adminService.settlePayout(selectedPayout.id, ref);
    } catch {
      // simulated
    } finally {
      setIsSettling(false);
      setSelectedPayout(null);
      setTransferRef("");
    }

    showToast(isAr ? `تمت تسوية التحويل البنكي للمرشد (${selectedPayout.guideName}) بمبلغ ${selectedPayout.amountSar} ر.س.` : `Payout transfer settled successfully.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast */}
      {toastMsg && (
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
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
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
            <WalletIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "الإدارة المالية والـ Escrow" : "Finance & Escrow Management"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "الإدارة المالية وحساب الضمان" : "Finance & Escrow Operations"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "متابعة تسويات الأرباح البنكية عبر نظام سريع (SARIE)، رصيد الضمان المعلق، وصافي عمولات المنصة."
              : "Monitor SARIE bank transfers, held escrow balances, and net platform commissions."}
          </p>
        </div>
      </div>

      {/* Financial KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div style={{ padding: "20px", background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>
            {isAr ? "رصيد الـ Escrow المعلق" : "Held Escrow Balance"}
          </span>
          <h3 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-gold-heading)", margin: "4px 0" }}>38,400 {isAr ? "ر.س" : "SAR"}</h3>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
            {isAr ? "مبالغ ضامنة لـ 42 رحلة قائمة" : "Protected funds for 42 tours"}
          </span>
        </div>

        <div style={{ padding: "20px", background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>
            {isAr ? "طلبات السحب المعلقة" : "Pending Payout Requests"}
          </span>
          <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#F59E0B", margin: "4px 0" }}>13,370 {isAr ? "ر.س" : "SAR"}</h3>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
            {isAr ? "بانتظار التحويل عبر سريع" : "Awaiting SARIE transfer"}
          </span>
        </div>

        <div style={{ padding: "20px", background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>
            {isAr ? "صافي إيرادات المنصة المحققة" : "Net Platform Earnings"}
          </span>
          <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#10B981", margin: "4px 0" }}>22,275 {isAr ? "ر.س" : "SAR"}</h3>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
            {isAr ? "عمولة 15% صافية" : "15% net commission"}
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث باسم المرشد، الآيبان، أو البريد..." : "Search guide, IBAN or email..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="all">{isAr ? "كافة الحالات" : "All Statuses"}</option>
          <option value="pending">{isAr ? "معلقة بانتظار التحويل" : "Pending Payout"}</option>
          <option value="completed">{isAr ? "مكتملة ومحولة" : "Completed"}</option>
        </select>
      </div>

      {/* Payouts Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "المرشد السياحي والبريد" : "Guide"}</th>
              <th>{isAr ? "البنك والآيبان (IBAN)" : "Bank & IBAN"}</th>
              <th>{isAr ? "المبلغ المطلوب" : "Amount"}</th>
              <th>{isAr ? "تاريخ الطلب" : "Date"}</th>
              <th>{isAr ? "حالة التحويل" : "Status"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayouts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا توجد طلبات تحويل تطابق البحث." : "No payouts found."}
                </td>
              </tr>
            ) : (
              filteredPayouts.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{row.guideName}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      {row.guideEmail}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700 }}>{row.bankName}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-gold-heading)", fontFamily: "monospace", direction: "ltr", textAlign: "start" }}>
                      {row.iban}
                    </div>
                  </td>

                  <td>
                    <span style={{ fontWeight: 900, color: "#10B981", fontSize: "14px" }}>
                      {row.amountSar.toLocaleString("en-US")} {isAr ? "ر.س" : "SAR"}
                    </span>
                  </td>

                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.date}</td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: row.status === "completed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                        color: row.status === "completed" ? "#10B981" : "#F59E0B",
                      }}
                    >
                      {row.status === "completed" ? (isAr ? "تم التحويل بنجاح" : "Completed") : (isAr ? "بانتظار التحويل" : "Pending")}
                    </span>
                    {row.transferRef && (
                      <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-secondary)", marginTop: "2px", fontFamily: "monospace" }}>
                        Ref: {row.transferRef}
                      </span>
                    )}
                  </td>

                  <td style={{ textAlign: "end" }}>
                    {row.status === "completed" ? (
                      <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>
                        {isAr ? "معتمد ومسوى" : "Settled"}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedPayout(row)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "var(--gradient-gold)",
                          color: "#0f172a",
                          border: "none",
                        }}
                      >
                        <ShieldCheckIcon size={14} color="#0f172a" />
                        <span>{isAr ? "تأكيد التحويل البنكي" : "Settle Payout"}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Confirm Payout */}
      {selectedPayout && (
        <Modal
          isOpen={Boolean(selectedPayout)}
          onClose={() => setSelectedPayout(null)}
          title={isAr ? "تأكيد التحويل البنكي للمرشد (IBAN Payout)" : "Confirm IBAN Payout"}
          subtitle={`${selectedPayout.guideName} • ${selectedPayout.amountSar} SAR`}
        >
          <form onSubmit={handleConfirmPayout} style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "بيانات المستفيد:" : "Beneficiary Details:"}</span>
              <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "4px 0" }}>{selectedPayout.guideName}</h4>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
                {selectedPayout.bankName} • <span style={{ direction: "ltr", display: "inline-block", fontFamily: "monospace", color: "var(--color-gold-heading)", fontWeight: 800 }}>{selectedPayout.iban}</span>
              </p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                {isAr ? "الرقم المرجعي للحوالة بنظام سريع (SARIE Ref):" : "SARIE Transfer Reference:"}
              </label>
              <input
                type="text"
                value={transferRef}
                onChange={(e) => setTransferRef(e.target.value)}
                placeholder="SARIE-994021-TX"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontFamily: "monospace", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedPayout(null)} type="button">
                {isAr ? "إلغاء" : "Cancel"}
              </Button>
              <Button variant="primary" size="sm" type="submit" disabled={isSettling}>
                <CheckCircleIcon size={14} />
                <span>{isSettling ? (isAr ? "جاري الاعتماد..." : "Processing...") : (isAr ? "اعتماد وتسجيل التحويل" : "Confirm Transfer")}</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
