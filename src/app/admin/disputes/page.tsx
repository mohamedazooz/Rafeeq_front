"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  ScaleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SearchIcon,
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
  const { decrementDisputesQueue } = useDashboardMetrics();

  const [disputes, setDisputes] = useState<DisputeCase[]>(INITIAL_DISPUTES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(null);
  const [resolutionChoice, setResolutionChoice] = useState<"full_refund" | "release_to_guide" | "split_50_50">("full_refund");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch =
      d.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResolveDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;
    setIsSubmitting(true);

    const resolutionText =
      resolutionChoice === "full_refund"
        ? isAr ? "استرجاع كامل المبلغ (100%) للعميل وإلغاء مستحقات الحجز" : "100% Refund to client"
        : resolutionChoice === "release_to_guide"
        ? isAr ? "رفض الشكوى والإفراج عن كامل المبلغ (100%) للمرشد السياحي" : "100% Released to guide"
        : isAr ? "تسوية متوازنة: استرجاع 50% للعميل وتحويل 50% للمرشد" : "50/50 Split Settlement";

    setDisputes((prev) =>
      prev.map((d) =>
        d.id === selectedDispute.id
          ? { ...d, status: "resolved", resolution: resolutionText }
          : d
      )
    );

    // Decrement the sidebar counter
    decrementDisputesQueue();

    try {
      await adminService.resolveDispute(selectedDispute.id, {
        resolution: resolutionChoice,
        adminNotes,
      });
    } catch {
      // simulated
    } finally {
      setIsSubmitting(false);
      setSelectedDispute(null);
      setAdminNotes("");
    }

    showToast(isAr ? `تمت تسوية النزاع بنجاح: (${resolutionText})` : `Dispute resolved successfully.`);
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
            <ScaleIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "قسم تسوية النزاعات والـ Escrow" : "Disputes & Escrow Settlement"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "النزاعات والتسويات المالية" : "Disputes & Escrow Settlement"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "البت في شكاوى الحجوزات، فحص أدلة المحادثات ومواعيد الإلغاء، وتنفيذ الاسترداد المالي للعميل أو المرشد."
              : "Review complaints, inspect communication logs, and execute financial dispute resolutions."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث برقم الحجز، اسم العميل، أو المرشد..." : "Search booking ref, client or guide..."}
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
          <option value="ALL">{isAr ? "كافة الحالات" : "All Statuses"}</option>
          <option value="open">{isAr ? "نزاعات مفتوحة" : "Open Disputes"}</option>
          <option value="resolved">{isAr ? "تمت التسوية" : "Resolved"}</option>
        </select>
      </div>

      {/* Disputes Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "رقم الحجز والبرنامج" : "Booking & Tour"}</th>
              <th>{isAr ? "أطراف النزاع" : "Parties"}</th>
              <th>{isAr ? "المبلغ المتنازع عليه" : "Amount"}</th>
              <th>{isAr ? "سبب الشكوى" : "Reason"}</th>
              <th>{isAr ? "حالة النزاع" : "Status"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "القرار والتسوية" : "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisputes.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا توجد نزاعات مفتوحة حالياً." : "No disputes found."}
                </td>
              </tr>
            ) : (
              filteredDisputes.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>
                      {row.bookingRef}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 700, marginTop: "2px" }}>
                      {row.programTitle}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontSize: "12px" }}>
                      <div><span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "العميل:" : "Client:"}</span> <strong>{row.clientName}</strong></div>
                      <div><span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "المرشد:" : "Guide:"}</span> <strong>{row.guideName}</strong></div>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontWeight: 900, color: "#10B981", fontSize: "13px" }}>
                      {row.amountSar.toLocaleString("en-US")} {isAr ? "ر.س" : "SAR"}
                    </span>
                  </td>

                  <td>
                    <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0, maxWidth: "260px", lineHeight: "1.4" }}>
                      {row.reason}
                    </p>
                  </td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: row.status === "resolved" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: row.status === "resolved" ? "#10B981" : "#EF4444",
                      }}
                    >
                      {row.status === "resolved" ? (isAr ? "تمت التسوية" : "Resolved") : (isAr ? "نزاع مفتوح" : "Open Dispute")}
                    </span>
                    {row.resolution && (
                      <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-secondary)", marginTop: "3px" }}>
                        {row.resolution}
                      </span>
                    )}
                  </td>

                  <td style={{ textAlign: "end" }}>
                    {row.status === "resolved" ? (
                      <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>
                        {isAr ? "مغلق ومسوى" : "Settled"}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedDispute(row)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "var(--gradient-gold)",
                          color: "#0f172a",
                          border: "none",
                        }}
                      >
                        <ScaleIcon size={14} color="#0f172a" />
                        <span>{isAr ? "اتخاذ القرار المالي" : "Resolve Dispute"}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Resolve Dispute */}
      {selectedDispute && (
        <Modal
          isOpen={Boolean(selectedDispute)}
          onClose={() => setSelectedDispute(null)}
          title={isAr ? "اتخاذ القرار المالي وتسوية النزاع" : "Dispute Resolution Decision"}
          subtitle={`${selectedDispute.bookingRef} • ${selectedDispute.programTitle}`}
        >
          <form onSubmit={handleResolveDispute} style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)" }}>{isAr ? `حجز: ${selectedDispute.bookingRef}` : `Booking: ${selectedDispute.bookingRef}`}</span>
                <span style={{ fontSize: "13px", fontWeight: 900, color: "#10B981" }}>{selectedDispute.amountSar} {isAr ? "ر.س" : "SAR"}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 6px 0" }}>
                <strong>{isAr ? "البرنامج:" : "Tour:"}</strong> {selectedDispute.programTitle}
              </p>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0, lineHeight: "1.4" }}>
                <strong>{isAr ? "الشكوى:" : "Complaint:"}</strong> {selectedDispute.reason}
              </p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>
                {isAr ? "اختر القرار المالي المعتمد:" : "Select Financial Resolution:"}
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "full_refund" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "full_refund" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-secondary)",
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
                  <span>{isAr ? "استرجاع كامل المبلغ (100%) لحساب العميل البنكي" : "100% Refund to Client"}</span>
                </label>

                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "release_to_guide" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "release_to_guide" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-secondary)",
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
                  <span>{isAr ? "رفض الشكوى والإفراج عن كامل المبلغ (100%) لمحفظة المرشد" : "100% Release to Guide"}</span>
                </label>

                <label
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: resolutionChoice === "split_50_50" ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: resolutionChoice === "split_50_50" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-secondary)",
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
                  <span>{isAr ? "تسوية ودية منصفة: مناصفة 50% للعميل و 50% للمرشد" : "50/50 Equal Settlement"}</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                {isAr ? "ملاحظات وتبرير القرار الإداري:" : "Administrative Notes & Justification:"}
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={isAr ? "بيان أسباب اتخاذ هذا القرار المالي..." : "Reasoning for audit trail..."}
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedDispute(null)} type="button">
                {isAr ? "إلغاء" : "Cancel"}
              </Button>
              <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                <ScaleIcon size={14} />
                <span>{isSubmitting ? (isAr ? "جاري تنفيذ التسوية..." : "Processing...") : (isAr ? "اعتماد وتنفيذ القرار المالي" : "Execute Decision")}</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
