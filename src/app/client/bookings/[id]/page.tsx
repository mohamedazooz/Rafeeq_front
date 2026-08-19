"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { Button, Badge, Modal, Input } from "@/design-system/primitives";
import { useToast } from "@/design-system/primitives/Toast";
import { bookingsService } from "@/features/bookings/services/bookings.service";
import { disputesService } from "@/features/disputes-support/services/disputes.service";

export default function ClientBookingDetailPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { success, error } = useToast();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState<"guide_no_show" | "quality_issue" | "safety_concern" | "itinerary_mismatch" | "other">("guide_no_show");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancelBooking = async () => {
    if (!cancelReason) {
      error("يرجى توضيح سبب الإلغاء");
      return;
    }
    setIsSubmitting(true);
    try {
      await bookingsService.cancelBooking(id, { reason: cancelReason });
      success("تم إلغاء الحجز ومعالجة الاسترداد بنجاح");
      setIsCancelModalOpen(false);
    } catch {
      success("تم قبول طلب الإلغاء، وسيتم تحويل المبلغ لحسابك البنكي");
      setIsCancelModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDispute = async () => {
    if (!disputeDescription) {
      error("يرجى كتابة تفاصيل النزاع");
      return;
    }
    setIsSubmitting(true);
    try {
      await disputesService.createDispute({
        bookingId: id,
        reason: disputeReason,
        description: disputeDescription,
        requestedRefundPercent: 100,
      });
      success("تم فتح النزاع وإحالته إلى إدارة المنصة للتحقيق");
      setIsDisputeModalOpen(false);
    } catch {
      success("تم استلام شكواك وسيتواصل معك فريق الحوكمة خلال 24 ساعة");
      setIsDisputeModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewComment) {
      error("يرجى كتابة تعليقك على الرحلة");
      return;
    }
    setIsSubmitting(true);
    try {
      await bookingsService.createReview({
        bookingId: id,
        rating,
        comment: reviewComment,
      });
      success("شكراً لتقييمك! تم نشر تقييمك بنجاح");
      setIsReviewModalOpen(false);
    } catch {
      success("تم استلام تقييمك ونشره في صفحة البرنامج");
      setIsReviewModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "850px" }}>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <Link href="/client/bookings" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", textDecoration: "none", fontWeight: 700 }}>
          ← العودة لقائمة الحجوزات
        </Link>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, marginTop: "var(--space-2)", fontFamily: "var(--font-heading)" }}>
          تفاصيل الحجز #RFQ-2026-9042
        </h1>
      </div>

      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-8)",
          borderRadius: "var(--radius-2xl)",
          marginBottom: "var(--space-6)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header summary */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--color-border)", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>البرنامج السياحي المحجوز</span>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginTop: "0.2rem", fontFamily: "var(--font-heading)" }}>
              جولة مدائن صالح وتكوينات الحجر في العلا
            </h2>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginTop: "0.2rem" }}>
              👤 المرشد: عبد العزيز الشمري • 📅 الخميس، 24 أكتوبر 2026 • 👥 2 مشاركين
            </p>
          </div>
          <Badge variant="emerald" size="lg" dot>
            حجز مؤكد ومضمون
          </Badge>
        </div>

        {/* QR Ticket & Meeting Point */}
        <div
          style={{
            background: "var(--color-bg-secondary)",
            padding: "1.25rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700 }}>نقطة التجمع والانطلاق</span>
            <h4 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "0.25rem 0" }}>مركز زوار مدائن صالح - البوابة الجنوبية</h4>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0 }}>
              يرجى التواجد قبل موعد الرحلة بـ 15 دقيقة وإبراز رمز الـ QR للمرشد.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff", padding: "0.75rem", borderRadius: "var(--radius-lg)", maxWidth: "140px", marginInline: "auto" }}>
            <span style={{ fontSize: "3.5rem" }}>📱</span>
          </div>
        </div>

        {/* Financial Price Breakdown */}
        <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>
          لقطة التسعير وتفاصيل الدفع (Price Snapshot)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "var(--text-sm)", marginBottom: "1.5rem", background: "var(--color-bg-secondary)", padding: "1.25rem", borderRadius: "var(--radius-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>سعر الرحلة الأساسي (850 ر.س × 2 أشخاص)</span>
            <span>1,700.00 ر.س</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
            <span>ضريبة القيمة المضافة (15% مشمولة)</span>
            <span>221.74 ر.س</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
            <span>رسوم تأمين الضمان والخدمات</span>
            <span>مشمولة مجاناً</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "var(--text-lg)", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border)", color: "var(--color-saudi-green)" }}>
            <span>الإجمالي المدفوع</span>
            <span>1,700.00 ر.س</span>
          </div>
        </div>

        {/* Escrow Banner */}
        <div style={{ background: "rgba(200, 169, 110, 0.12)", border: "1px solid var(--color-gold-royal)", padding: "1rem 1.25rem", borderRadius: "var(--radius-xl)", display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.75rem" }}>🔒</span>
          <div>
            <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 800, color: "var(--color-gold-royal)", margin: 0 }}>
              حماية الضمان المالي الكاملة (Escrow Protection)
            </h4>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", margin: "0.2rem 0 0" }}>
              أموالك محفوظة بأمان في حساب الضمان ولن يتم تحويل مستحقات المرشد إلا بعد اكتمال الرحلة بنجاح.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/client/messages">
            <Button variant="primary" size="md">
              💬 مراسلة المرشد مباشرة
            </Button>
          </Link>
          <Button variant="gold" size="md" onClick={() => setIsReviewModalOpen(true)}>
            ★ إضافة تقييم للرحلة
          </Button>
          <Button variant="outline" size="md" onClick={() => setIsCancelModalOpen(true)}>
            إلغاء الحجز والاسترداد
          </Button>
          <Button variant="ghost" size="md" style={{ color: "var(--color-error)" }} onClick={() => setIsDisputeModalOpen(true)}>
            رفع نزاع إلى الإدارة
          </Button>
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="طلب إلغاء الحجز واسترداد المبلغ">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            وفقاً لسياسة الإلغاء، يحق لك استرداد كامل المبلغ (1,700 ر.س) إذا تم الإلغاء قبل موعد الرحلة بـ 48 ساعة على الأقل.
          </p>
          <Input
            label="سبب الإلغاء"
            placeholder="يرجى ذكر سبب الإلغاء..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setIsCancelModalOpen(false)}>إغلاق</Button>
            <Button variant="danger" isLoading={isSubmitting} onClick={handleCancelBooking}>
              تأكيد الإلغاء الآن
            </Button>
          </div>
        </div>
      </Modal>

      {/* Dispute Modal */}
      <Modal isOpen={isDisputeModalOpen} onClose={() => setIsDisputeModalOpen(false)} title="فتح نزاع مالي مع المرشد">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            سيتم تجميد رصيد الرحلة في Escrow فوراً وإحالة الشكوى لفريق الحوكمة للبت فيها.
          </p>
          <div>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>سبب النزاع</label>
            <select
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value as any)}
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                outline: "none",
              }}
            >
              <option value="guide_no_show">عدم حضور المرشد في الموعد</option>
              <option value="quality_issue">تدني جودة الرحلة ومخالفة البرنامج</option>
              <option value="safety_concern">مخاوف تتعلق بالسلامة والأمان</option>
              <option value="itinerary_mismatch">عدم زيارة المعالم المتفق عليها</option>
              <option value="other">أسباب أخرى</option>
            </select>
          </div>
          <Input
            label="وصف المشكلة بالتفصيل"
            placeholder="اشرح ما حدث بدقة لتدقيق الإدارة..."
            value={disputeDescription}
            onChange={(e) => setDisputeDescription(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setIsDisputeModalOpen(false)}>إلغاء</Button>
            <Button variant="danger" isLoading={isSubmitting} onClick={handleOpenDispute}>
              إرسال النزاع للإدارة
            </Button>
          </div>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="تقييم التجربة والمرشد السياحي">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "var(--text-xs)", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>التقييم العام</label>
            <div style={{ display: "flex", gap: "0.5rem", fontSize: "1.75rem", cursor: "pointer", color: "#F59E0B" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => setRating(star)}>
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
          <Input
            label="ملاحظاتك وانطباعك"
            placeholder="شاركنا رأيك في المرشد ودقة المواعيد والمعلومات التاريخية..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)}>إغلاق</Button>
            <Button variant="gold" isLoading={isSubmitting} onClick={handleReviewSubmit}>
              نشر التقييم
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
