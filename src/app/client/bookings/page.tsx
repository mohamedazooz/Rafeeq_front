"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  CalendarIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  StarIcon,
  XCircleIcon,
  EyeIcon,
} from "@/components/icons";

interface ClientBookingItem {
  id: string;
  bookingNumber: string;
  programTitle: string;
  guideName: string;
  date: string;
  participants: number;
  totalSar: number;
  status: "مؤكد" | "مكتمل" | "ملغي";
  canCancel: boolean;
}

const INITIAL_BOOKINGS: ClientBookingItem[] = [
  {
    id: "book-101",
    bookingNumber: "RFQ-2026-9042",
    programTitle: "جولة مدائن صالح والبلدة القديمة بالعلا",
    guideName: "عبد العزيز الشمري",
    date: "24 أكتوبر 2026",
    participants: 2,
    totalSar: 1700,
    status: "مؤكد",
    canCancel: true,
  },
  {
    id: "book-100",
    bookingNumber: "RFQ-2026-8811",
    programTitle: "جولة تاريخية في حارة البلد بجدة",
    guideName: "مريم الغامدي",
    date: "12 أغسطس 2026",
    participants: 1,
    totalSar: 300,
    status: "مكتمل",
    canCancel: false,
  },
  {
    id: "book-099",
    bookingNumber: "RFQ-2026-7412",
    programTitle: "سهرة التخييم وتأمل النجوم في صحراء الثمامة",
    guideName: "تركي العتيبي",
    date: "20 يوليو 2026",
    participants: 3,
    totalSar: 750,
    status: "ملغي",
    canCancel: false,
  },
];

export default function ClientBookingsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [bookings, setBookings] = useState<ClientBookingItem[]>(INITIAL_BOOKINGS);
  const [selectedForCancel, setSelectedForCancel] = useState<ClientBookingItem | null>(null);
  const [selectedForReview, setSelectedForReview] = useState<ClientBookingItem | null>(null);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBookings = bookings.filter(
    (b) => statusFilter === "all" || b.status === statusFilter
  );

  const handleConfirmCancel = () => {
    if (!selectedForCancel) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedForCancel.id
          ? { ...b, status: "ملغي", canCancel: false }
          : b
      )
    );

    const refundAmount = selectedForCancel.totalSar * 0.9; // 90% refund, 10% late fee
    setSelectedForCancel(null);
    warning(`تم إلغاء الحجز (${selectedForCancel.bookingNumber}) وسيتم استرداد مبلغ ${refundAmount} ر.س إلى حسابك البنكي خلال 3-5 أيام عمل.`);
  };

  const handleConfirmReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForReview) return;

    setSelectedForReview(null);
    setReviewComment("");
    success(`شكراً لك! تم إرسال تقييمك (${reviewStars} نجوم) للمرشد (${selectedForReview.guideName}) بنجاح.`);
  };

  const columns: DataTableColumn<ClientBookingItem>[] = [
    {
      key: "booking",
      headerAr: "رقم الحجز والبرنامج",
      headerEn: "Booking & Tour",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "12px", color: "var(--color-gold-heading)", fontFamily: "monospace" }}>
            {row.bookingNumber}
          </span>
          <h4 style={{ fontSize: "14px", fontWeight: 800, margin: "2px 0 0 0" }}>{row.programTitle}</h4>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>المرشد: {row.guideName}</span>
        </div>
      ),
    },
    {
      key: "date",
      headerAr: "تاريخ الرحلة",
      headerEn: "Tour Date",
      render: (row) => (
        <div>
          <span style={{ fontSize: "13px", fontWeight: 700 }}>{row.date}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block" }}>{row.participants} مشاركين</span>
        </div>
      ),
    },
    {
      key: "amount",
      headerAr: "المبلغ الإجمالي",
      headerEn: "Total (SAR)",
      render: (row) => (
        <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
          {row.totalSar.toLocaleString("en-US")} ر.س
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الحجز",
      headerEn: "Status",
      render: (row) => {
        const isConfirmed = row.status === "مؤكد";
        const isCompleted = row.status === "مكتمل";
        const isCancelled = row.status === "ملغي";

        const bg = isConfirmed
          ? "rgba(16, 185, 129, 0.12)"
          : isCompleted
          ? "rgba(200, 169, 110, 0.15)"
          : "rgba(239, 68, 68, 0.12)";

        const color = isConfirmed ? "#10B981" : isCompleted ? "var(--color-gold-heading)" : "#EF4444";

        return (
          <span style={{ background: bg, color, padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>
            {row.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Link href={`/client/bookings/${row.id}`}>
            <Button variant="outline" size="sm">
              <EyeIcon size={14} />
              <span>التذكرة</span>
            </Button>
          </Link>

          {row.canCancel && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedForCancel(row)}>
              <XCircleIcon size={14} />
              <span style={{ color: "#EF4444" }}>إلغاء</span>
            </Button>
          )}

          {row.status === "مكتمل" && (
            <Button variant="primary" size="sm" onClick={() => setSelectedForReview(row)}>
              <StarIcon size={14} />
              <span>تقييم الرحلة</span>
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          سجل حجوزاتي ورحلاتي
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          متابعة التذاكر المؤكدة، تفاصيل مسار الرحلة، المحادثات مع المرشد، وإلغاء الحجز مع الاسترداد الفوري
        </p>
      </div>

      {/* Bookings Table */}
      <DataTable
        data={filteredBookings}
        columns={columns}
        searchPlaceholder="بحث برقم الحجز، اسم البرنامج، أو المرشد..."
        searchFilter={(row, query) =>
          row.bookingNumber.toLowerCase().includes(query) ||
          row.programTitle.toLowerCase().includes(query) ||
          row.guideName.toLowerCase().includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={statusFilter === "all" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("all")}>
              الكل ({bookings.length})
            </Button>
            <Button variant={statusFilter === "مؤكد" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("مؤكد")}>
              مؤكدة
            </Button>
            <Button variant={statusFilter === "مكتمل" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("مكتمل")}>
              مكتملة
            </Button>
            <Button variant={statusFilter === "ملغي" ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter("ملغي")}>
              ملغاة
            </Button>
          </div>
        }
      />

      {/* Modal: Cancel Booking */}
      <Modal isOpen={Boolean(selectedForCancel)} onClose={() => setSelectedForCancel(null)} title="تأكيد إلغاء الحجز واسترداد الأموال" maxWidth="500px">
        {selectedForCancel && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5", margin: 0 }}>
              هل أنت متأكد من رغبتك في إلغاء حجز <strong>({selectedForCancel.programTitle})</strong>؟
            </p>

            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span>المبلغ الأصلي المدفوع:</span>
                <strong>{selectedForCancel.totalSar} ر.س</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#EF4444" }}>
                <span>رسوم الإلغاء (10%):</span>
                <span>-{selectedForCancel.totalSar * 0.1} ر.س</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid var(--color-border)", fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                <span>المبلغ المسترد لحسابك:</span>
                <span>{selectedForCancel.totalSar * 0.9} ر.س</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedForCancel(null)}>تراجع</Button>
              <Button variant="secondary" size="md" onClick={handleConfirmCancel}>
                <span style={{ color: "#EF4444" }}>تأكيد الإلغاء والاسترداد</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Review Booking */}
      <Modal isOpen={Boolean(selectedForReview)} onClose={() => setSelectedForReview(null)} title="إضافة تقييم ومراجعة للرحلة" maxWidth="500px">
        {selectedForReview && (
          <form onSubmit={handleConfirmReview} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>البرنامج:</span>
              <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "2px 0 0 0" }}>{selectedForReview.programTitle}</h4>
              <span style={{ fontSize: "12px", color: "var(--color-gold-heading)" }}>المرشد: {selectedForReview.guideName}</span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>تقييمك الإجمالي:</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewStars(star)}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "24px",
                      cursor: "pointer",
                      filter: star <= reviewStars ? "grayscale(0)" : "grayscale(100%)",
                      opacity: star <= reviewStars ? 1 : 0.4,
                      transition: "all 0.15s ease",
                    }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>رأيك وتجربتك مع المرشد:</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="شاركنا تفاصيل تجربتك وانطباعك عن الجولة والخدمة..."
                rows={4}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedForReview(null)} type="button">إلغاء</Button>
              <Button variant="primary" size="md" type="submit">نشر التقييم ⭐</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
