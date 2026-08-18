"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  ScaleIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface Dispute {
  id: string;
  bookingCode: string;
  client: string;
  clientEmail: string;
  guide: string;
  guideEmail: string;
  reason: string;
  escrowAmount: string;
  status: "open" | "resolved_refund" | "resolved_payout" | "resolved_split";
  date: string;
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "dsp-1",
    bookingCode: "RFQ-8823",
    client: "فهد السليمان",
    clientEmail: "fahad.sulaiman@example.com",
    guide: "ريم العلي",
    guideEmail: "reem.ali@example.com",
    reason: "تأخر المرشد عن الموعد المحدد لمدة ساعتين مع التغيير في خطة المسار بدون اتفاق مسبق.",
    escrowAmount: "1,100.00 ر.س",
    status: "open",
    date: "2026-08-15",
  },
  {
    id: "dsp-2",
    bookingCode: "RFQ-8790",
    client: "منى بن سعيد",
    clientEmail: "mona.saeed@example.com",
    guide: "خالد الحربي",
    guideEmail: "khaled.harbi@example.com",
    reason: "عدم حضور المرشد للموقع المتفق عليه وتأثر المسار بالكامل.",
    escrowAmount: "850.00 ر.س",
    status: "open",
    date: "2026-08-14",
  },
];

export default function AdminDisputesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleResolveRefund = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "resolved_refund" } : d))
    );
    setSelectedDispute(null);

    dispatchDualActionNotification({
      title: `تسوية النزاع #${dispute.bookingCode} — استرداد كامل للعميل`,
      message: `تم البت في النزاع وإصدار استرداد مالي بنسبة 100% (${dispute.escrowAmount}) لحساب العميل.`,
      actionType: "REFUND",
      targetEmail: dispute.clientEmail,
      targetName: dispute.client,
      targetRole: "Client",
    });

    showToast(isAr ? "تم استرجاع 100% من المبلغ لحساب العميل وإرسال إشعار للطرفين! ✓" : "100% refund issued to client.");
  };

  const handleResolvePayout = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "resolved_payout" } : d))
    );
    setSelectedDispute(null);

    dispatchDualActionNotification({
      title: `تسوية النزاع #${dispute.bookingCode} — صرف المستحقات للمرشد`,
      message: `تم البت في النزاع لصالح المرشد والإفراج عن رصيد الضمان المحتجز (${dispute.escrowAmount}).`,
      actionType: "PAYOUT",
      targetEmail: dispute.guideEmail,
      targetName: dispute.guide,
      targetRole: "Guide",
    });

    showToast(isAr ? "تم رفض الشكوى وتحويل المستحقات لمحفظة المرشد بنجاح!" : "Dispute resolved in guide favor.");
  };

  const handleResolveSplit = (dispute: Dispute) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispute.id ? { ...d, status: "resolved_split" } : d))
    );
    setSelectedDispute(null);

    dispatchDualActionNotification({
      title: `تسوية النزاع #${dispute.bookingCode} — مناصفة 50% / 50%`,
      message: `تم اعتماد تسوية مالية منصفة بتحويل 50% للعميل و 50% للمرشد.`,
      actionType: "REFUND",
      targetEmail: dispute.clientEmail,
      targetName: dispute.client,
      targetRole: "Client",
    });

    showToast(isAr ? "تم اعتماد التسوية النصفية (50% للعميل / 50% للمرشد) وإشعار الطرفين!" : "50/50 split settlement confirmed.");
  };

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
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#EF4444", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <AlertTriangleIcon size={14} color="#EF4444" />
          {isAr ? "مركز فض النزاعات والتسويات المالية" : "Dispute Resolution Center"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "إدارة النزاعات والشكاوى والتسوية ⚖️" : "Dispute Settlements"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "مراجعة شكاوى المسافرين، التحقق من مبالغ الضمان المحتجزة (Escrow)، والبت النهائي في استرداد الأموال." : "Investigate claims, arbitrate disputes, and release escrow funds."}
        </p>
      </div>

      {/* Disputes Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "رمز الحجز" : "Booking Code"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "العميل المشتكي" : "Client"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المرشد المشكو بحقه" : "Guide"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "مبلغ الضمان Escrow" : "Escrow Amount"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "حالة النزاع" : "Status"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "التاريخ" : "Date"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "البت في النزاع" : "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>
                  #{d.bookingCode}
                </td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{d.client}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{d.guide}</td>
                <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10B981" }}>{d.escrowAmount}</td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: d.status === "open" ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
                      color: d.status === "open" ? "#EF4444" : "#10B981",
                    }}
                  >
                    {d.status === "open" ? (isAr ? "مفتوح ⚠️" : "Open") : (isAr ? "تم البت والتسوية ✓" : "Resolved")}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{d.date}</td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <IconButton
                    variant="gold"
                    size="sm"
                    title={isAr ? "البت في النزاع والتسوية" : "Resolve Dispute"}
                    icon={<ScaleIcon size={15} />}
                    onClick={() => setSelectedDispute(d)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resolution Modal */}
      <Modal
        isOpen={!!selectedDispute}
        onClose={() => setSelectedDispute(null)}
        title={selectedDispute ? (isAr ? `البت في الشكوى #${selectedDispute.bookingCode}` : `Resolve Dispute #${selectedDispute.bookingCode}`) : ""}
        subtitle={selectedDispute ? `${selectedDispute.client} • ${selectedDispute.guide}` : ""}
        maxWidth="580px"
      >
        {selectedDispute && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ fontSize: "13px" }}>
              <p style={{ marginBottom: "8px" }}><strong>{isAr ? "سبب الشكوى:" : "Reason:"}</strong> {selectedDispute.reason}</p>
              <p style={{ marginBottom: "8px" }}><strong>{isAr ? "العميل المشتكي:" : "Client:"}</strong> {selectedDispute.client} ({selectedDispute.clientEmail})</p>
              <p style={{ marginBottom: "8px" }}><strong>{isAr ? "المرشد المشكو بحقه:" : "Guide:"}</strong> {selectedDispute.guide} ({selectedDispute.guideEmail})</p>
              <p><strong>{isAr ? "مبلغ الضمان المحتجز (Escrow):" : "Escrow Balance:"}</strong> <span style={{ color: "#10B981", fontWeight: 900 }}>{selectedDispute.escrowAmount}</span></p>
            </div>

            <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "4px" }}>{isAr ? "القرار المالي النهائي وإجراء الصرف:" : "Arbitration Decision:"}</h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button variant="danger" size="md" onClick={() => handleResolveRefund(selectedDispute)}>
                {isAr ? "🔄 استرجاع 100% لحساب المسافر (Full Refund)" : "100% Client Refund"}
              </Button>
              <Button variant="outline" size="md" onClick={() => handleResolveSplit(selectedDispute)}>
                {isAr ? "⚖️ تسوية مناصفة 50% للعميل / 50% للمرشد" : "50/50 Split Settlement"}
              </Button>
              <Button variant="primary" size="md" onClick={() => handleResolvePayout(selectedDispute)}>
                {isAr ? "💰 رفض الشكوى وتحويل المستحقات للمرشد" : "Release to Guide"}
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDispute(null)}>
                {isAr ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
