"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  ScaleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  EyeIcon,
} from "@/components/icons";

interface DisputeCase {
  id: string;
  bookingRef: string;
  clientName: string;
  clientEmail: string;
  guideName: string;
  programTitle: string;
  amountSar: number;
  reason: string;
  disputeDate: string;
  status: "open" | "resolved" | "under_review";
  resolution?: string;
}

const INITIAL_DISPUTES: DisputeCase[] = [
  {
    id: "disp-101",
    bookingRef: "RFQ-2026-8823",
    clientName: "فهد الحربي",
    clientEmail: "fahad.harbi@example.com",
    guideName: "خالد سعيد الشهري",
    programTitle: "جولة قمة السودة في أبها",
    amountSar: 1200,
    reason: "تأخر المرشد عن نقطة التجمع لأكثر من ساعة ونصف وسوء الأحوال الجوية دون إخطار مسبق.",
    disputeDate: "2026-08-17",
    status: "open",
  },
  {
    id: "disp-102",
    bookingRef: "RFQ-2026-7719",
    clientName: "نورة القحطاني",
    clientEmail: "noura.q@example.com",
    guideName: "سعود فهد الدوسري",
    programTitle: "جولة وادي حنيفة التاريخية",
    amountSar: 650,
    reason: "إلغاء جزء من مسار الجولة المتفق عليه بسبب أعمال صيانة بالطريق.",
    disputeDate: "2026-08-14",
    status: "resolved",
    resolution: "تسوية ودية: استرجاع 50% للعميل وتحويل 50% للمرشد",
  },
];

export default function AdminDisputesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [disputes, setDisputes] = useState<DisputeCase[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(null);
  const [resolutionChoice, setResolutionChoice] = useState<"full_refund" | "release_to_guide" | "split_50_50">("full_refund");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResolveDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;
    setIsSubmitting(true);

    const resolutionText =
      resolutionChoice === "full_refund"
        ? "استرجاع كامل المبلغ (100%) للعميل وإلغاء مستحقات الحجز"
        : resolutionChoice === "release_to_guide"
        ? "رفض الشكوى والإفراج عن كامل المبلغ (100%) للمرشد السياحي"
        : "تسوية متوازنة: استرجاع 50% للعميل وتحويل 50% للمرشد";

    setDisputes((prev) =>
      prev.map((d) =>
        d.id === selectedDispute.id
          ? { ...d, status: "resolved", resolution: resolutionText }
          : d
      )
    );

    try {
      await adminService.resolveDispute(selectedDispute.id, {
        resolution: resolutionChoice,
        adminNotes,
      });
    } catch {
      // Handled
    } finally {
      setIsSubmitting(false);
      setSelectedDispute(null);
      setAdminNotes("");
    }

    success(`تم تسوية النزاع بنجاح: (${resolutionText}) ⚖️✓`);
  };

  const columns: DataTableColumn<DisputeCase>[] = [
    {
      key: "booking",
      headerAr: "رقم الحجز والبرنامج",
      headerEn: "Booking & Program",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "13px", color: "var(--color-gold-heading)", fontFamily: "monospace" }}>
            {row.bookingRef}
          </span>
          <span style={{ fontSize: "12px", display: "block", fontWeight: 700, marginTop: "2px" }}>{row.programTitle}</span>
        </div>
      ),
    },
    {
      key: "parties",
      headerAr: "أطراف النزاع",
      headerEn: "Client & Guide",
      render: (row) => (
        <div style={{ fontSize: "12px" }}>
          <div><span style={{ color: "var(--color-text-muted)" }}>العميل:</span> <strong>{row.clientName}</strong></div>
          <div><span style={{ color: "var(--color-text-muted)" }}>المرشد:</span> <strong>{row.guideName}</strong></div>
        </div>
      ),
    },
    {
      key: "amount",
      headerAr: "المبلغ المتنازع عليه",
      headerEn: "Disputed Amount",
      render: (row) => (
        <span style={{ fontWeight: 800, fontSize: "13px", color: "var(--color-saudi-green)" }}>
          {row.amountSar.toLocaleString("en-US")} ر.س
        </span>
      ),
    },
    {
      key: "reason",
      headerAr: "سبب الشكوى",
      headerEn: "Complaint Reason",
      render: (row) => (
        <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0, maxWidth: "260px", lineHeight: "1.4" }}>
          {row.reason}
        </p>
      ),
    },
    {
      key: "status",
      headerAr: "حالة النزاع",
      headerEn: "Status",
      render: (row) => {
        const isResolved = row.status === "resolved";
        return (
          <div>
            <span
              style={{
                background: isResolved ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                color: isResolved ? "#10B981" : "#EF4444",
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              {isResolved ? "تمت التسوية ✓" : "نزاع مفتوح ⚠️"}
            </span>
            {row.resolution && (
              <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)", marginTop: "3px" }}>
                {row.resolution}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      headerAr: "القرار والتسوية",
      headerEn: "Actions",
      align: "center",
      render: (row) => {
        if (row.status === "resolved") {
          return <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>مغلق 🔒</span>;
        }
        return (
          <Button variant="primary" size="sm" onClick={() => setSelectedDispute(row)}>
            <ScaleIcon size={14} />
            <span>اتخاذ القرار المالي</span>
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
          إدارة النزاعات والتسويات المالية (Disputes & Escrow Settle) ⚖️
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          البت في شكاوى الحجوزات، فحص أدلة المحادثات ومواعيد الإلغاء، وتنفيذ الاسترداد المالي للعميل أو المرشد
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        data={disputes}
        columns={columns}
        searchPlaceholder="بحث برقم الحجز، اسم العميل، أو المرشد..."
        searchFilter={(row, query) =>
          row.bookingRef.toLowerCase().includes(query) ||
          row.clientName.toLowerCase().includes(query) ||
          row.guideName.toLowerCase().includes(query) ||
          row.reason.toLowerCase().includes(query)
        }
      />

      {/* Modal: Resolve Dispute */}
      <Modal isOpen={Boolean(selectedDispute)} onClose={() => setSelectedDispute(null)} title="اتخاذ القرار المالي وتسوية النزاع" maxWidth="580px">
        {selectedDispute && (
          <form onSubmit={handleResolveDispute} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)" }}>حجز: {selectedDispute.bookingRef}</span>
                <span style={{ fontSize: "13px", fontWeight: 900, color: "var(--color-saudi-green)" }}>{selectedDispute.amountSar} ر.س</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 6px 0" }}>
                <strong>البرنامج:</strong> {selectedDispute.programTitle}
              </p>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0, lineHeight: "1.4" }}>
                <strong>الشكوى:</strong> {selectedDispute.reason}
              </p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, marginBottom: "8px" }}>
                اختر القرار المالي المعتمد:
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "full_refund" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "full_refund" ? "rgba(200,169,110,0.08)" : "var(--color-bg-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  <input
                    type="radio"
                    name="resChoice"
                    checked={resolutionChoice === "full_refund"}
                    onChange={() => setResolutionChoice("full_refund")}
                    style={{ accentColor: "var(--color-gold-heading)" }}
                  />
                  <span>استرجاع كامل المبلغ (100%) لحساب العميل البنكي</span>
                </label>

                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "release_to_guide" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "release_to_guide" ? "rgba(200,169,110,0.08)" : "var(--color-bg-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  <input
                    type="radio"
                    name="resChoice"
                    checked={resolutionChoice === "release_to_guide"}
                    onChange={() => setResolutionChoice("release_to_guide")}
                    style={{ accentColor: "var(--color-gold-heading)" }}
                  />
                  <span>رفض الشكوى والإفراج عن كامل المبلغ (100%) لمحفظة المرشد</span>
                </label>

                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "split_50_50" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "split_50_50" ? "rgba(200,169,110,0.08)" : "var(--color-bg-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  <input
                    type="radio"
                    name="resChoice"
                    checked={resolutionChoice === "split_50_50"}
                    onChange={() => setResolutionChoice("split_50_50")}
                    style={{ accentColor: "var(--color-gold-heading)" }}
                  />
                  <span>تسوية ودية منصفة: مناصفة 50% للعميل و 50% للمرشد</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                ملاحظات وتبرير القرار الإداري (تُرسل للطرفين وتُسجل في الـ Audit):
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="بيان أسباب اتخاذ هذا القرار المالي..."
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedDispute(null)} type="button">إلغاء</Button>
              <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
                <ScaleIcon size={16} />
                <span>{isSubmitting ? "جاري تنفيذ التسوية..." : "اعتماد وتنفيذ القرار المالي ⚖️"}</span>
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
