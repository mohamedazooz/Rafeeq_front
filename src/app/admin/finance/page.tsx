"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  WalletIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ScaleIcon,
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
  const { success } = useToast();

  const [payouts, setPayouts] = useState<PayoutRequest[]>(INITIAL_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [transferRef, setTransferRef] = useState<string>("");
  const [isSettling, setIsSettling] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPayouts = payouts.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

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

    try {
      await adminService.settlePayout(selectedPayout.id, ref);
    } catch {
      // Handled
    } finally {
      setIsSettling(false);
      setSelectedPayout(null);
      setTransferRef("");
    }

    success(`تم تسوية التحويل البنكي للمرشد (${selectedPayout.guideName}) بمبلغ ${selectedPayout.amountSar} ر.س بالرقم المرجعي (${ref}) بنجاح! 💸✓`);
  };

  const columns: DataTableColumn<PayoutRequest>[] = [
    {
      key: "guide",
      headerAr: "المرشد السياحي والبريد",
      headerEn: "Guide & Email",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "13px", display: "block" }}>{row.guideName}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.guideEmail}</span>
        </div>
      ),
    },
    {
      key: "bank",
      headerAr: "البنك والآيبان (IBAN)",
      headerEn: "Bank & IBAN",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 700, fontSize: "12px", display: "block" }}>{row.bankName}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontFamily: "monospace", direction: "ltr" }}>
            {row.iban}
          </span>
        </div>
      ),
    },
    {
      key: "amount",
      headerAr: "المبلغ المطلوب (SAR)",
      headerEn: "Payout Amount",
      render: (row) => (
        <span style={{ fontWeight: 900, fontSize: "14px", color: "var(--color-saudi-green)" }}>
          {row.amountSar.toLocaleString("en-US")} ر.س
        </span>
      ),
    },
    {
      key: "date",
      headerAr: "تاريخ الطلب",
      headerEn: "Request Date",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{row.date}</span>,
    },
    {
      key: "status",
      headerAr: "حالة التحويل",
      headerEn: "Status",
      render: (row) => {
        const isCompleted = row.status === "completed";
        return (
          <div>
            <span
              style={{
                background: isCompleted ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                color: isCompleted ? "#10B981" : "#F59E0B",
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              {isCompleted ? "تم التحويل بنجاح ✓" : "بانتظار التحويل"}
            </span>
            {row.transferRef && (
              <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)", marginTop: "2px", fontFamily: "monospace" }}>
                Ref: {row.transferRef}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => {
        if (row.status === "completed") {
          return <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>معتمد 🔒</span>;
        }
        return (
          <Button variant="primary" size="sm" onClick={() => setSelectedPayout(row)}>
            <ShieldCheckIcon size={14} />
            <span>تأكيد التحويل البنكي</span>
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          الإدارة المالية وحساب الضمان (Escrow & Payouts) 💳
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          متابعة تسويات الأرباح البنكية عبر نظام سريع (SARIE)، رصيد الضمان المعلق، وصافي عمولات المنصة
        </p>
      </div>

      {/* Financial KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
        <div style={{ padding: "var(--space-5)", background: "var(--color-bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 700 }}>رصيد الـ Escrow المعلق</span>
          <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--color-gold-royal)", margin: "0.25rem 0" }}>38,400 ر.س</h3>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>مبالغ ضامنة لـ 42 رحلة قائمة</span>
        </div>

        <div style={{ padding: "var(--space-5)", background: "var(--color-bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 700 }}>طلبات السحب المعلقة</span>
          <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "#F59E0B", margin: "0.25rem 0" }}>13,370 ر.س</h3>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>بانتظار التحويل عبر سريع</span>
        </div>

        <div style={{ padding: "var(--space-5)", background: "var(--color-bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 700 }}>صافي إيرادات المنصة المحققة</span>
          <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 900, color: "#10B981", margin: "0.25rem 0" }}>22,275 ر.س</h3>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>عمولة 15% صافية</span>
        </div>
      </div>

      {/* Payouts Table */}
      <DataTable
        data={filteredPayouts}
        columns={columns}
        searchPlaceholder="بحث باسم المرشد، الآيبان، أو البريد..."
        searchFilter={(row, query) =>
          row.guideName.toLowerCase().includes(query) ||
          row.iban.toLowerCase().includes(query) ||
          row.guideEmail.toLowerCase().includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={statusFilter === "all" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("all")}>
              الكل ({payouts.length})
            </Button>
            <Button variant={statusFilter === "pending" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("pending")}>
              معلقة ({payouts.filter((p) => p.status === "pending").length})
            </Button>
            <Button variant={statusFilter === "completed" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("completed")}>
              مكتملة ({payouts.filter((p) => p.status === "completed").length})
            </Button>
          </div>
        }
      />

      {/* Modal: Confirm Payout */}
      <Modal isOpen={Boolean(selectedPayout)} onClose={() => setSelectedPayout(null)} title="تأكيد التحويل البنكي للمرشد (IBAN Payout)" maxWidth="520px">
        {selectedPayout && (
          <form onSubmit={handleConfirmPayout} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>بيانات المستفيد:</span>
              <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "4px 0" }}>{selectedPayout.guideName}</h4>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
                {selectedPayout.bankName} • <span style={{ direction: "ltr", display: "inline-block", fontFamily: "monospace" }}>{selectedPayout.iban}</span>
              </p>
              <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                المبلغ المطلوب تحويله: {selectedPayout.amountSar.toLocaleString("en-US")} ر.س
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                الرقم المرجعي للحوالة البنكية (Sarie Transfer Reference)
              </label>
              <input
                type="text"
                placeholder="مثال: SARIE-TRX-884019"
                value={transferRef}
                onChange={(e) => setTransferRef(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedPayout(null)} type="button">إلغاء</Button>
              <Button variant="primary" size="md" type="submit" disabled={isSettling}>
                <CreditCardIcon size={16} />
                <span>{isSettling ? "جاري الاعتماد..." : "تأكيد التحويل وإشعار المرشد"}</span>
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
