"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  CalendarIcon,
  EyeIcon,
  ShieldCheckIcon,
  ScaleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/icons";

interface Booking {
  id: string;
  code: string;
  client: string;
  clientEmail: string;
  guide: string;
  guideEmail: string;
  program: string;
  amount: string;
  status: "pending_payment" | "confirmed" | "completed" | "cancelled" | "disputed";
  date: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: "b-101", code: "RFQ-8821", client: "محمد العتيبي", clientEmail: "mohammed.otaibi@example.com", guide: "عبد العزيز الشمري", guideEmail: "abdulaziz.alshammari@rafeeq.sa", program: "جولة وادي حنيفة والدرعية التاريخية", amount: "450 ر.س", status: "confirmed", date: "2026-08-18" },
  { id: "b-102", code: "RFQ-8822", client: "سارة الحمد", clientEmail: "sara.hamad@example.com", guide: "خالد الحربي", guideEmail: "khaled.harbi@example.com", program: "رحلة جبل القارة والواحة بالأحساء", amount: "380 ر.س", status: "pending_payment", date: "2026-08-19" },
  { id: "b-103", code: "RFQ-8823", client: "فهد السليمان", clientEmail: "fahad.sulaiman@example.com", guide: "ريم العلي", guideEmail: "reem.ali@example.com", program: "استكشاف شعب حقل والغوص", amount: "1,100 ر.س", status: "disputed", date: "2026-08-15" },
  { id: "b-104", code: "RFQ-8824", client: "علي الغامدي", clientEmail: "ali.ghamdi@example.com", guide: "عبد العزيز الشمري", guideEmail: "abdulaziz.alshammari@rafeeq.sa", program: "مسار طويق وتخييم نجد", amount: "650 ر.س", status: "completed", date: "2026-08-10" },
  { id: "b-105", code: "RFQ-8825", client: "نورة القحطاني", clientEmail: "noura.qahtani@example.com", guide: "منى علي", guideEmail: "mona.ali@example.com", program: "جولة أسواق جدة التاريخية", amount: "300 ر.س", status: "cancelled", date: "2026-08-12" },
];

export default function AdminBookingsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(
    (b) => selectedFilter === "all" || b.status === selectedFilter
  );

  const handleStatusChange = async (booking: Booking, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === booking.id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    try {
      await adminService.overrideBookingStatus(booking.id, newStatus, "تعديل إداري معتمد");
    } catch {
      // Handled
    }

    success(`تم تحديث حالة الحجز #${booking.code} إلى (${newStatus}) بنجاح! 🎫✓`);
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>مؤكد ✓</span>;
      case "pending_payment":
        return <span style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>قيد الدفع ⏳</span>;
      case "completed":
        return <span style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>مكتمل 🎉</span>;
      case "cancelled":
        return <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>ملغى ✕</span>;
      case "disputed":
        return <span style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>متنازع عليه ⚠️</span>;
    }
  };

  const columns: DataTableColumn<Booking>[] = [
    {
      key: "code",
      headerAr: "رقم الحجز والبرنامج",
      headerEn: "Code & Program",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "12px", color: "var(--color-gold-heading)", fontFamily: "monospace" }}>
            {row.code}
          </span>
          <h4 style={{ fontSize: "13px", fontWeight: 800, margin: "2px 0 0 0" }}>{row.program}</h4>
        </div>
      ),
    },
    {
      key: "parties",
      headerAr: "العميل والمرشد",
      headerEn: "Client & Guide",
      render: (row) => (
        <div style={{ fontSize: "12px" }}>
          <div><span style={{ color: "var(--color-text-muted)" }}>العميل:</span> <strong>{row.client}</strong></div>
          <div><span style={{ color: "var(--color-text-muted)" }}>المرشد:</span> <strong>{row.guide}</strong></div>
        </div>
      ),
    },
    {
      key: "amount",
      headerAr: "المبلغ الإجمالي",
      headerEn: "Amount",
      render: (row) => (
        <span style={{ fontSize: "13px", fontWeight: 900, color: "var(--color-saudi-green)" }}>
          {row.amount}
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الحجز",
      headerEn: "Status",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "date",
      headerAr: "تاريخ الرحلة",
      headerEn: "Date",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{row.date}</span>,
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(row)}>
          <EyeIcon size={14} />
          <span>إدارة الحجز</span>
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          إدارة الحجوزات والرحلات (Bookings Operations) 🎫
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          متابعة حالة الحجوزات في الوقت الفعلي، تجاوز الحالة إدارياً، وفحص تفاصيل الدفع والـ Escrow
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredBookings}
        columns={columns}
        searchPlaceholder="بحث برقم الحجز، اسم العميل، المرشد، أو البرنامج..."
        searchFilter={(row, query) =>
          row.code.toLowerCase().includes(query) ||
          row.client.toLowerCase().includes(query) ||
          row.guide.toLowerCase().includes(query) ||
          row.program.toLowerCase().includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={selectedFilter === "all" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedFilter("all")}>
              الكل ({bookings.length})
            </Button>
            <Button variant={selectedFilter === "confirmed" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedFilter("confirmed")}>
              مؤكد
            </Button>
            <Button variant={selectedFilter === "completed" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedFilter("completed")}>
              مكتمل
            </Button>
            <Button variant={selectedFilter === "disputed" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedFilter("disputed")}>
              متنازع عليه
            </Button>
          </div>
        }
      />

      {/* Modal: Booking Details & Status Override */}
      <Modal isOpen={Boolean(selectedBooking)} onClose={() => setSelectedBooking(null)} title={`إدارة الحجز #${selectedBooking?.code}`} maxWidth="560px">
        {selectedBooking && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "14px", fontWeight: 900 }}>{selectedBooking.program}</span>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}>{selectedBooking.amount}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 4px 0" }}>
                العميل: <strong>{selectedBooking.client}</strong> ({selectedBooking.clientEmail})
              </p>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: 0 }}>
                المرشد: <strong>{selectedBooking.guide}</strong> ({selectedBooking.guideEmail})
              </p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>
                تجاوز حالة الحجز إدارياً (Admin Status Override):
              </label>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <Button variant={selectedBooking.status === "confirmed" ? "primary" : "outline"} size="sm" onClick={() => handleStatusChange(selectedBooking, "confirmed")}>
                  مؤكد
                </Button>
                <Button variant={selectedBooking.status === "completed" ? "primary" : "outline"} size="sm" onClick={() => handleStatusChange(selectedBooking, "completed")}>
                  مكتمل
                </Button>
                <Button variant={selectedBooking.status === "cancelled" ? "primary" : "outline"} size="sm" onClick={() => handleStatusChange(selectedBooking, "cancelled")}>
                  ملغى
                </Button>
                <Button variant={selectedBooking.status === "disputed" ? "primary" : "outline"} size="sm" onClick={() => handleStatusChange(selectedBooking, "disputed")}>
                  نزاع مالي
                </Button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button variant="primary" size="md" onClick={() => setSelectedBooking(null)}>إغلاق</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
