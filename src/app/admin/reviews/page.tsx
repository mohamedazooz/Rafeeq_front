"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  StarIcon,
  ShieldCheckIcon,
  EyeIcon,
  CheckCircleIcon,
  SearchIcon,
  BanIcon,
} from "@/components/icons";

interface ReviewItem {
  id: string;
  authorName: string;
  authorEmail: string;
  subjectName: string;
  targetType: "guide" | "client";
  rating: number;
  comment: string;
  status: "published" | "flagged" | "hidden";
  reportsCount: number;
  date: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    authorName: "فهد الحربي",
    authorEmail: "fahad.harbi@example.com",
    subjectName: "عبد العزيز الشمري",
    targetType: "guide",
    rating: 5,
    comment: "تجربة استثنائية في آثار مدائن صالح، معرفة تاريخية عميقة وأسلوب راقٍ وممتع جداً!",
    status: "published",
    reportsCount: 0,
    date: "2026-08-16",
  },
  {
    id: "rev-2",
    authorName: "James Wilson",
    authorEmail: "james.wilson@uk-tours.co.uk",
    subjectName: "مريم الغامدي",
    targetType: "guide",
    rating: 5,
    comment: "Fantastic tour of historic Jeddah! Highly recommend Mariam for English speaking tourists.",
    status: "published",
    reportsCount: 0,
    date: "2026-08-14",
  },
  {
    id: "rev-3",
    authorName: "مجهول / مستخدم غير موثق",
    authorEmail: "spam.bot@external.org",
    subjectName: "سعود الدوسري",
    targetType: "guide",
    rating: 1,
    comment: "عرض إعلاني غير لائق وروابط ترويجية خارجية...",
    status: "flagged",
    reportsCount: 4,
    date: "2026-08-15",
  },
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
      published: isAr ? "تم نشر التقييم بنجاح." : "Review published.",
      flagged: isAr ? "تم وضع التقييم قيد الفحص والتدقيق." : "Review flagged for audit.",
      hidden: isAr ? `تم حجب التقييم بنجاح ${reason ? `بسبب: ${reason}` : ""}` : "Review hidden from public.",
    };
    showToast(statusTexts[newStatus]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
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
            <StarIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "الرقابة على المراجعات والتقييمات" : "Reviews Moderation Queue"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "إدارة التقييمات والمراجعات" : "Reviews Moderation & Quality"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "مراقبة التقييمات المتبادلة بين المسافرين والمرشدين، التعامل مع البلاغات، وحجب المحتوى المخالف."
              : "Moderate tour reviews, respond to abuse reports, and remove infringing feedback."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "all", labelAr: "الكل", labelEn: "All" },
            { id: "published", labelAr: "منشورة", labelEn: "Published" },
            { id: "flagged", labelAr: "بلاغات معلقة", labelEn: "Flagged" },
            { id: "hidden", labelAr: "محجوبة", labelEn: "Hidden" },
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
              {isAr ? st.labelAr : st.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "الكاتب / المراجع" : "Author"}</th>
              <th>{isAr ? "المستهدف" : "Target"}</th>
              <th>{isAr ? "التقييم والتعليق" : "Rating & Review"}</th>
              <th>{isAr ? "الحالة والبلاغات" : "Status"}</th>
              <th>{isAr ? "التاريخ" : "Date"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "إجراءات الرقابة" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا توجد مراجعات مطابقة." : "No reviews found."}
                </td>
              </tr>
            ) : (
              filteredReviews.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 800 }}>{r.authorName}</td>
                  <td style={{ fontWeight: 700, color: "var(--color-gold-heading)" }}>{r.subjectName}</td>

                  <td style={{ maxWidth: "340px" }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <StarIcon key={i} size={12} color="#F59E0B" />
                      ))}
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--color-text-primary)", lineHeight: 1.5, margin: 0 }}>
                      {r.comment}
                    </p>
                  </td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background:
                          r.status === "published"
                            ? "rgba(16, 185, 129, 0.15)"
                            : r.status === "flagged"
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                        color:
                          r.status === "published"
                            ? "#10B981"
                            : r.status === "flagged"
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    >
                      {r.status === "published"
                        ? (isAr ? "منشور" : "Published")
                        : r.status === "flagged"
                        ? (isAr ? "بلاغات معلقة" : "Flagged")
                        : (isAr ? "محجوب" : "Hidden")}
                    </span>
                    {r.reportsCount > 0 && (
                      <span style={{ display: "block", fontSize: "10px", color: "#EF4444", fontWeight: 800, marginTop: "2px" }}>
                        ({r.reportsCount} {isAr ? "بلاغات إساءة" : "reports"})
                      </span>
                    )}
                  </td>

                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{r.date}</td>

                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      {r.status !== "published" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(r, "published")}
                          className="rafeeq-action-btn"
                          style={{
                            background: "rgba(16, 185, 129, 0.15)",
                            borderColor: "rgba(16, 185, 129, 0.3)",
                            color: "#10B981",
                          }}
                        >
                          <CheckCircleIcon size={14} color="#10B981" />
                          <span>{isAr ? "نشر" : "Publish"}</span>
                        </button>
                      )}

                      {r.status !== "hidden" && (
                        <button
                          type="button"
                          onClick={() => setSelectedReview(r)}
                          className="rafeeq-action-btn"
                          style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            borderColor: "rgba(239, 68, 68, 0.25)",
                            color: "#EF4444",
                          }}
                        >
                          <BanIcon size={14} color="#EF4444" />
                          <span>{isAr ? "حجب" : "Hide"}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Hide Review Reason */}
      {selectedReview && (
        <Modal
          isOpen={Boolean(selectedReview)}
          onClose={() => setSelectedReview(null)}
          title={isAr ? "تأكيد حجب التقييم والمراجعة" : "Confirm Hide Review"}
          subtitle={selectedReview ? `${selectedReview.authorName} -> ${selectedReview.subjectName}` : ""}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <p style={{ margin: 0, fontStyle: "italic" }}>"{selectedReview.comment}"</p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-secondary)" }}>
                {isAr ? "سبب الحجب (يُوثق في سجل التدقيق):" : "Reason for Hiding (Recorded in Audit Trail):"}
              </label>
              <textarea
                value={hideReason}
                onChange={(e) => setHideReason(e.target.value)}
                placeholder={isAr ? "محتوى مسيء، لغة غير لائقة، ترويج تجاري خارجي..." : "Offensive language, spam, commercial promotion..."}
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedReview(null)}>
                {isAr ? "إلغاء" : "Cancel"}
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleUpdateStatus(selectedReview, "hidden", hideReason)} style={{ background: "#EF4444", borderColor: "#EF4444", color: "#fff" }}>
                {isAr ? "تأكيد حجب المراجعة" : "Confirm Hide"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
