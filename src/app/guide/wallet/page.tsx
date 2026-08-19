"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  WalletIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  DownloadIcon,
} from "@/components/icons";

interface GuideTransaction {
  id: string;
  date: string;
  desc: string;
  grossAmountSar: number;
  commissionSar: number;
  netAmountSar: number;
  type: "إيداع أرباح رحلة" | "سحب بنكي (IBAN)";
  status: "مكتمل" | "قيد التحويل";
}

const INITIAL_TRANSACTIONS: GuideTransaction[] = [
  {
    id: "tx-101",
    date: "2026-08-15",
    desc: "رحلة مدائن صالح (حجز #RFQ-9042)",
    grossAmountSar: 1700,
    commissionSar: 255,
    netAmountSar: 1445,
    type: "إيداع أرباح رحلة",
    status: "مكتمل",
  },
  {
    id: "tx-100",
    date: "2026-08-10",
    desc: "سحب أرباح إلى حساب مصرف الراجحي (SA4210...)",
    grossAmountSar: 5000,
    commissionSar: 0,
    netAmountSar: -5000,
    type: "سحب بنكي (IBAN)",
    status: "مكتمل",
  },
  {
    id: "tx-099",
    date: "2026-08-05",
    desc: "جولة البلدة القديمة (حجز #RFQ-8721)",
    grossAmountSar: 1200,
    commissionSar: 180,
    netAmountSar: 1020,
    type: "إيداع أرباح رحلة",
    status: "مكتمل",
  },
];

export default function GuideWalletPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [availableBalance, setAvailableBalance] = useState(9250);
  const [escrowBalance] = useState(3400);
  const [transactions, setTransactions] = useState<GuideTransaction[]>(INITIAL_TRANSACTIONS);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("5000");

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(payoutAmount);

    if (amount <= 0 || amount > availableBalance) {
      warning("يرجى إدخال مبلغ صحيح لا يتجاوز الرصيد المتاح للسحب.");
      return;
    }

    const newTx: GuideTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      desc: `طلب سحب أرباح إلى مصرف الراجحي (SA4210...)`,
      grossAmountSar: amount,
      commissionSar: 0,
      netAmountSar: -amount,
      type: "سحب بنكي (IBAN)",
      status: "قيد التحويل",
    };

    setAvailableBalance((prev) => prev - amount);
    setTransactions([newTx, ...transactions]);
    setShowPayoutModal(false);
    success(`تم تقديم طلب سحب مبلغ ${amount.toLocaleString("en-US")} ر.س إلى حسابك البنكي بنجاح! 💸✓`);
  };

  const columns: DataTableColumn<GuideTransaction>[] = [
    {
      key: "desc",
      headerAr: "بيان المعاملة",
      headerEn: "Transaction Description",
      render: (row) => (
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 800, margin: 0 }}>{row.desc}</h4>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.date}</span>
        </div>
      ),
    },
    {
      key: "type",
      headerAr: "النوع",
      headerEn: "Type",
      render: (row) => (
        <span
          style={{
            background: row.type.includes("سحب") ? "rgba(59, 130, 246, 0.12)" : "rgba(16, 185, 129, 0.12)",
            color: row.type.includes("سحب") ? "#3B82F6" : "#10B981",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.type}
        </span>
      ),
    },
    {
      key: "commission",
      headerAr: "عمولة المنصة (15%)",
      headerEn: "Commission",
      render: (row) => (
        <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
          {row.commissionSar > 0 ? `-${row.commissionSar} ر.س` : "—"}
        </span>
      ),
    },
    {
      key: "net",
      headerAr: "صافي المبلغ المحرر (SAR)",
      headerEn: "Net Amount",
      render: (row) => (
        <span
          style={{
            fontSize: "14px",
            fontWeight: 900,
            color: row.netAmountSar >= 0 ? "var(--color-saudi-green)" : "#EF4444",
          }}
        >
          {row.netAmountSar >= 0 ? `+${row.netAmountSar.toLocaleString("en-US")}` : row.netAmountSar.toLocaleString("en-US")} ر.س
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "الحالة",
      headerEn: "Status",
      render: (row) => (
        <span
          style={{
            background: row.status === "مكتمل" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
            color: row.status === "مكتمل" ? "#10B981" : "#F59E0B",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            محفظة الأرباح والـ Escrow 💳
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            متابعة العوائد المالية المحررة، رصيد الضمان المعلق، وطلب التحويل المباشر للآيبان البنكي
          </p>
        </div>

        <Button variant="primary" size="lg" onClick={() => setShowPayoutModal(true)}>
          <WalletIcon size={18} />
          <span>طلب سحب أرباح إلى الآيبان</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-royal)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 700 }}>
            الرصيد المتاح للسحب الفوري
          </span>
          <h2 style={{ fontSize: "32px", fontWeight: 900, color: "var(--color-saudi-green)", margin: "8px 0 4px 0" }}>
            {availableBalance.toLocaleString("en-US")}.00 ر.س
          </h2>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
            محرر بالكامل وجاهز للتحويل الفوري إلى حسابك في مصرف الراجحي
          </span>
        </div>

        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 700 }}>
            رصيد الضمان المعلق (Escrow Funds)
          </span>
          <h2 style={{ fontSize: "32px", fontWeight: 900, color: "var(--color-gold-heading)", margin: "8px 0 4px 0" }}>
            {escrowBalance.toLocaleString("en-US")}.00 ر.س
          </h2>
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
            يتحرر تلقائياً إلى رصيدك المتاح فور اكتمال الجولات المؤكدة
          </span>
        </div>
      </div>

      {/* Transactions Ledger */}
      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px" }}>سجل المعاملات والتحويلات المالية</h3>
        <DataTable
          data={transactions}
          columns={columns}
          searchPlaceholder="بحث في المعاملات المالية..."
          searchFilter={(row, query) => row.desc.toLowerCase().includes(query)}
        />
      </div>

      {/* Modal: Request Payout */}
      <Modal isOpen={showPayoutModal} onClose={() => setShowPayoutModal(false)} title="طلب سحب أرباح إلى الآيبان البنكي (IBAN)" maxWidth="500px">
        <form onSubmit={handleRequestPayout} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>الحساب البنكي المعتمد:</span>
            <h4 style={{ fontSize: "14px", fontWeight: 800, margin: "4px 0" }}>مصرف الراجحي (Al Rajhi Bank)</h4>
            <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontFamily: "monospace", direction: "ltr", display: "block" }}>
              SA4210000001234567890101
            </span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
              المبلغ المطلوب سحبه (ر.س) — الحد الأقصى: {availableBalance.toLocaleString("en-US")} ر.س
            </label>
            <input
              type="number"
              min="100"
              max={availableBalance}
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "16px", fontWeight: 900, color: "var(--color-saudi-green)" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowPayoutModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">تأكيد طلب السحب 💸</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
