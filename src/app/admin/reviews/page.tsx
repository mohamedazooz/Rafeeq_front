"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  TrashIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface ReviewItem {
  id: string;
  authorName: string;
  authorEmail: string;
  subjectName: string;
  subjectEmail: string;
  programTitle: string;
  direction: "client_to_guide" | "guide_to_client";
  rating: number;
  comment: string;
  status: "published" | "flagged" | "hidden";
  reportsCount: number;
  createdAt: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  { id: "rev-1", authorName: "فيصل الشمري", authorEmail: "faisal.shammari@example.com", subjectName: "خالد الحربي", subjectEmail: "khaled.harbi@example.com", programTitle: "رحلة جبل القارة والواحة بالأحساء", direction: "client_to_guide", rating: 5, comment: "مرشد ممتاز وخلوق جداً، المعلومات التاريخية كانت دقيقة والاستقبال في الواحة رائع!", status: "published", reportsCount: 0, createdAt: "2026-08-15" },
  { id: "rev-2", authorName: "خالد الحربي", authorEmail: "khaled.harbi@example.com", subjectName: "فيصل الشمري", subjectEmail: "faisal.shammari@example.com", programTitle: "رحلة جبل القارة والواحة بالأحساء", direction: "guide_to_client", rating: 5, comment: "ضيف محترم جداً والتزم بمواعيد الانطلاق بدقة.", status: "published", reportsCount: 0, createdAt: "2026-08-15" },
  { id: "rev-3", authorName: "نورة القحطاني", authorEmail: "noura.qahtani@example.com", subjectName: "ريم العلي", subjectEmail: "reem.ali@example.com", programTitle: "جولة الغوص واستكشاف شعب حقل", direction: "client_to_guide", rating: 1, comment: "المرشد لم يلتزم بالمواعيد المحددة وتم إلغاء الفقرة الأخيرة دون توضيح السبب!", status: "flagged", reportsCount: 2, createdAt: "2026-08-17" },
  { id: "rev-4", authorName: "مستخدم مجهول", authorEmail: "anonymous@example.com", subjectName: "سعود فهد الدوسري", subjectEmail: "saud.aldosari@example.com", programTitle: "مسار الهايكنج في جبال السودة", direction: "client_to_guide", rating: 2, comment: "تعليق يحتوي على عبارات غير لائقة وتم الإبلاغ عنه من قبل المرشد.", status: "hidden", reportsCount: 4, createdAt: "2026-08-10" },
];

export default function AdminReviewsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [hideReason, setHideReason] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterStatus === "all") return true;
    return r.status === filterStatus;
  });

  const handleUpdateStatus = (review: ReviewItem, newStatus: ReviewItem["status"], reason?: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: newStatus } : r))
    );
    setSelectedReview(null);
    setHideReason("");

    dispatchDualActionNotification({
      title: newStatus === "published" ? "اعتماد ونشر التقييم" : "حجب التقييم من الظهور",
      message: `تم تحديث حالة التقييم الموجه إلى (${review.subjectName}) إلى (${newStatus}).`,
      actionType: newStatus === "published" ? "APPROVE" : "REJECT",
      targetEmail: review.authorEmail,
      targetName: review.authorName,
      targetRole: "Client",
    });

    const statusTexts = {
      published: isAr ? "تم نشر التقييم بنجاح! ✓" : "Review published!",
      flagged: isAr ? "تم وضع التقييم قيد الفحص! ⚠️" : "Review flagged for audit.",
      hidden: isAr ? `تم حجب التقييم بنجاح ${reason ? `بسبب: ${reason}` : ""}` : "Review hidden from public.",
    };
    showToast(statusTexts[newStatus]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#F59E0B", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <StarIcon size={14} color="#F59E0B" />
            {isAr ? "الرقابة على المراجعات والتقييمات" : "Reviews Moderation Queue"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "إدارة التقييمات والمراجعات ⭐️" : "Reviews Moderation"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "مراقبة التقييمات المتبادلة بين المسافرين والمرشدين، التعامل مع البلاغات، وحجب المحتوى المخالف." : "Moderate tour reviews, respond to abuse reports, and remove infringing feedback."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "all", label: isAr ? "الكل" : "All" },
            { id: "published", label: isAr ? "منشورة" : "Published" },
            { id: "flagged", label: isAr ? "بلاغات معلقة" : "Flagged" },
            { id: "hidden", label: isAr ? "محجوبة" : "Hidden" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: `1px solid ${filterStatus === st.id ? "transparent" : "var(--color-border)"}`,
                background: filterStatus === st.id ? "var(--gradient-gold)" : "var(--color-bg-card)",
                color: filterStatus === st.id ? "#0f172a" : "var(--color-text-primary)",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الكاتب / المراجع" : "Author"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المستهدف" : "Target Subject"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "التقييم والتعليق" : "Rating & Review"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة والبلاغات" : "Status"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "التاريخ" : "Date"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراءات الرقابة" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>{r.authorName}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-gold-heading)" }}>{r.subjectName}</td>

                <td style={{ padding: "14px 16px", maxWidth: "340px" }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <StarIcon key={i} size={12} color="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--color-text-primary)", lineHeight: 1.5 }}>{r.comment}</p>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: r.status === "published" ? "rgba(16, 185, 129, 0.15)" : r.status === "flagged" ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: r.status === "published" ? "#10B981" : r.status === "flagged" ? "#F59E0B" : "#EF4444",
                    }}
                  >
                    {r.status === "published" ? (isAr ? "منشور ✓" : "Published") : r.status === "flagged" ? (isAr ? "بلاغات ⚠️" : "Flagged") : (isAr ? "محجوب ✕" : "Hidden")}
                  </span>
                  {r.reportsCount > 0 && (
                    <span style={{ display: "block", fontSize: "10px", color: "#EF4444", fontWeight: 800, marginTop: "2px" }}>
                      ({r.reportsCount} {isAr ? "بلاغات إساءة" : "reports"})
                    </span>
                  )}
                </td>

                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{r.createdAt}</td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    {r.status !== "published" && (
                      <IconButton
                        variant="success"
                        size="sm"
                        title={isAr ? "اعتماد ونشر المراجعة" : "Approve Review"}
                        icon={<CheckCircleIcon size={15} />}
                        onClick={() => handleUpdateStatus(r, "published")}
                      />
                    )}

                    {r.status !== "hidden" && (
                      <IconButton
                        variant="danger"
                        size="sm"
                        title={isAr ? "حجب المراجعة من المنصة" : "Hide Review"}
                        icon={<XCircleIcon size={15} />}
                        onClick={() => setSelectedReview(r)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hide Reason Modal */}
      <Modal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        title={isAr ? "تأكيد حجب التقييم من المنصة" : "Confirm Hide Review"}
        subtitle={selectedReview ? `${selectedReview.authorName} ➔ ${selectedReview.subjectName}` : ""}
        maxWidth="500px"
      >
        {selectedReview && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ fontSize: "13px" }}>
              <p style={{ marginBottom: "6px" }}><strong>{isAr ? "البرنامج:" : "Tour:"}</strong> {selectedReview.programTitle}</p>
              <p style={{ fontStyle: "italic", color: "var(--color-text-secondary)" }}>&ldquo;{selectedReview.comment}&rdquo;</p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>{isAr ? "سبب الحجب الإداري (Reason)" : "Administrative Reason"}</label>
              <textarea
                rows={3}
                required
                placeholder={isAr ? "أدخل سبب حجب المراجعة (انتهاك سياسة النشر، ألفاظ غير لائقة)..." : "Enter reason for hiding this review..."}
                value={hideReason}
                onChange={(e) => setHideReason(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "4px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedReview(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
              <Button variant="primary" size="md" onClick={() => handleUpdateStatus(selectedReview, "hidden", hideReason)}>
                {isAr ? "تأكيد حجب المراجعة ✕" : "Confirm Hide Review"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
