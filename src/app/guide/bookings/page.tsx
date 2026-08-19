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
  CheckCircleIcon,
  EyeIcon,
  UserIcon,
  DownloadIcon,
} from "@/components/icons";

interface GuideBookingItem {
  id: string;
  bookingNumber: string;
  travelerName: string;
  travelerPhone: string;
  programTitle: string;
  date: string;
  participants: number;
  netPayoutSar: number;
  status: "مؤكد" | "مكتمل" | "ملغي";
  escrowStatus: "محجوز بالضمان" | "محرر للمحفظة";
}

const INITIAL_GUIDE_BOOKINGS: GuideBookingItem[] = [
  {
    id: "gb-101",
    bookingNumber: "RFQ-2026-9042",
    travelerName: "محمد العتيبي",
    travelerPhone: "+966553334444",
    programTitle: "جولة مدائن صالح والبلدة القديمة بالعلا",
    date: "2026-10-24",
    participants: 2,
    netPayoutSar: 1445,
    status: "مؤكد",
    escrowStatus: "محجوز بالضمان",
  },
  {
    id: "gb-100",
    bookingNumber: "RFQ-2026-8721",
    travelerName: "سارة محمد",
    travelerPhone: "+966501122334",
    programTitle: "جولة البلدة القديمة وسوق الحرف",
    date: "2026-08-05",
    participants: 1,
    netPayoutSar: 1020,
    status: "مكتمل",
    escrowStatus: "محرر للمحفظة",
  },
];

export default function GuideBookingsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [bookings, setBookings] = useState<GuideBookingItem[]>(INITIAL_GUIDE_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<GuideBookingItem | null>(null);

  const handleMarkCompleted = (id: string, name: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "مكتمل", escrowStatus: "محرر للمحفظة" }
          : b
      )
    );
    success(`تم تسجيل اكتمال رحلة (${name}) وتحرير المبلغ لمحفظتك بعد انتهاء فترة الضمان.`);
  };

  const columns: DataTableColumn<GuideBookingItem>[] = [
    {
      key: "booking",
      headerAr: "رقم الحجز والمسافر",
      headerEn: "Booking & Guest",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "12px", color: "var(--color-gold-heading)", fontFamily: "monospace" }}>
            {row.bookingNumber}
          </span>
          <h4 style={{ fontSize: "14px", fontWeight: 800, margin: "2px 0 0 0" }}>{row.travelerName}</h4>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.travelerPhone}</span>
        </div>
      ),
    },
    {
      key: "program",
      headerAr: "البرنامج السياحي",
      headerEn: "Tour Program",
      render: (row) => (
        <div>
          <span style={{ fontSize: "13px", fontWeight: 700 }}>{row.programTitle}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block" }}>
            {row.date} • {row.participants} مشاركين
          </span>
        </div>
      ),
    },
    {
      key: "payout",
      headerAr: "صافي مستحقاتك",
      headerEn: "Net Payout",
      render: (row) => (
        <div>
          <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)", display: "block" }}>
            {row.netPayoutSar.toLocaleString("en-US")} ر.س
          </span>
          <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>بعد خصم عمولة المنصة 15%</span>
        </div>
      ),
    },
    {
      key: "escrow",
      headerAr: "حالة الضمان",
      headerEn: "Escrow Status",
      render: (row) => (
        <span
          style={{
            background: row.escrowStatus === "محرر للمحفظة" ? "rgba(16, 185, 129, 0.12)" : "rgba(200, 169, 110, 0.15)",
            color: row.escrowStatus === "محرر للمحفظة" ? "#10B981" : "var(--color-gold-heading)",
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <ShieldCheckIcon size={13} />
          <span>{row.escrowStatus}</span>
        </span>
      ),
    },
    {
      key: "actions",
      headerAr: "الإجراءات والعمليات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "nowrap" }}>
          <button
            type="button"
            onClick={() => setSelectedBooking(row)}
            className="rafeeq-action-btn"
            title="عرض كامل بيانات الحجز وتذكرة المسافر"
          >
            <EyeIcon size={14} color="var(--color-gold-heading)" />
            <span>تفاصيل الحجز</span>
          </button>

          <Link href="/client/messages" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm">
              <MessageSquareIcon size={14} />
              <span>محادثة الضيف</span>
            </Button>
          </Link>

          {row.status === "مؤكد" && (
            <Button variant="primary" size="sm" onClick={() => handleMarkCompleted(row.id, row.travelerName)}>
              <CheckCircleIcon size={14} />
              <span>تأكيد الإتمام</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert(`جاري طباعة وتوليد تذكرة الحجز PDF رقم #${row.bookingNumber}`)}
            title="تحميل تذكرة الحجز"
          >
            <DownloadIcon size={14} />
            <span>تذكرة PDF</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          حجوزات رحلاتي والمسافرين
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          متابعة قوائم المشاركين بالرحلات، التواصل المباشر مع الضيوف، وتأكيد اكتمال الرحلات لتحرير مستحقات الـ Escrow
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="بحث باسم المسافر، رقم الحجز، أو البرنامج..."
        searchFilter={(row, query) =>
          row.travelerName.toLowerCase().includes(query) ||
          row.bookingNumber.toLowerCase().includes(query) ||
          row.programTitle.toLowerCase().includes(query)
        }
      />

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`تفاصيل الحجز رقم #${selectedBooking.bookingNumber}`}
          subtitle={`المسافر: ${selectedBooking.travelerName} • ${selectedBooking.date}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>اسم المسافر الرئيسية:</span>
                <p style={{ fontWeight: 800, margin: "2px 0 0 0" }}>{selectedBooking.travelerName}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>رقم الجوال:</span>
                <p style={{ fontWeight: 800, margin: "2px 0 0 0", direction: "ltr", textAlign: "start" }}>{selectedBooking.travelerPhone}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>البرنامج السياحي:</span>
                <p style={{ fontWeight: 800, margin: "2px 0 0 0" }}>{selectedBooking.programTitle}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>عدد الضيوف:</span>
                <p style={{ fontWeight: 800, margin: "2px 0 0 0" }}>{selectedBooking.participants} أشخاص</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>صافي المستحقات المحررة:</span>
                <p style={{ fontWeight: 900, color: "var(--color-saudi-green)", margin: "2px 0 0 0", fontSize: "15px" }}>{selectedBooking.netPayoutSar.toLocaleString("en-US")} ر.س</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>حالة الضمان المالي Escrow:</span>
                <p style={{ fontWeight: 800, color: "var(--color-gold-heading)", margin: "2px 0 0 0" }}>{selectedBooking.escrowStatus}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>إغلاق</Button>
              <Button variant="primary" size="sm" onClick={() => alert(`جاري توليد وتصدير التذكرة الرقمية رقم #${selectedBooking.bookingNumber}`)}>تحميل التذكرة PDF</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
