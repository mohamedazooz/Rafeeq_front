"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  CalendarIcon,
  SearchIcon,
  EyeIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
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
  amountNum: number;
  status: "confirmed" | "pending_payment" | "completed" | "cancelled" | "disputed";
  date: string;
  escrowStatus: "held" | "released" | "refunded";
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "b-1",
    code: "RFQ-2026-9921",
    client: "فهد الحربي",
    clientEmail: "fahad.harbi@example.com",
    guide: "عبد العزيز الشمري",
    guideEmail: "abdulaziz.alshammari@rafeeq.sa",
    program: "جولة آثار الحجر ومدائن صالح الخاصة",
    amount: "1,200 ر.س",
    amountNum: 1200,
    status: "confirmed",
    date: "2026-08-20",
    escrowStatus: "held",
  },
  {
    id: "b-2",
    code: "RFQ-2026-8814",
    client: "James Wilson",
    clientEmail: "james.wilson@uk-tours.co.uk",
    guide: "مريم الغامدي",
    guideEmail: "mariam.ghamdi@example.com",
    program: "جولة جدة التاريخية وتذوق المأكولات الشعبية",
    amount: "850 ر.س",
    amountNum: 850,
    status: "completed",
    date: "2026-08-16",
    escrowStatus: "released",
  },
  {
    id: "b-3",
    code: "RFQ-2026-7732",
    client: "سارة العتيبي",
    clientEmail: "sara.otaibi@example.com",
    guide: "سعود الدوسري",
    guideEmail: "saud.aldosari@example.com",
    program: "سفاري صحراء الثمامة ورصد النجوم التلسكوبي",
    amount: "1,450 ر.س",
    amountNum: 1450,
    status: "disputed",
    date: "2026-08-17",
    escrowStatus: "held",
  },
  {
    id: "b-4",
    code: "RFQ-2026-6610",
    client: "Marc Dupont",
    clientEmail: "marc.dupont@voyage.fr",
    guide: "خالد الشهري",
    guideEmail: "khaled.shehri@example.com",
    program: "هايكنج قمم جبال السودة السحابية",
    amount: "600 ر.س",
    amountNum: 600,
    status: "cancelled",
    date: "2026-08-12",
    escrowStatus: "refunded",
  },
];

export default function AdminBookingsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

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
      // handled
    }

    showToast(isAr ? `تم تحديث حالة الحجز #${booking.code} إلى (${newStatus}) بنجاح.` : `Booking #${booking.code} status updated to ${newStatus}.`);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = selectedFilter === "all" || b.status === selectedFilter;
    const matchesSearch =
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guide.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.program.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            <CalendarIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "سجل الحجوزات والعمليات الميدانية" : "Bookings & Field Operations"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "إدارة الحجوزات والرحلات" : "Bookings & Tours Operations"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "متابعة حالة الحجوزات في الوقت الفعلي، تعديل الحالات استثنائياً، وفحص تفاصيل الدفع والـ Escrow."
              : "Real-time bookings monitoring, administrative overrides, and Escrow inspection."}
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث برقم الحجز، اسم العميل، المرشد، أو البرنامج..." : "Search booking code, client, guide, or tour..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="all">{isAr ? "كافة الحالات" : "All Statuses"}</option>
          <option value="confirmed">{isAr ? "مؤكد" : "Confirmed"}</option>
          <option value="completed">{isAr ? "مكتمل" : "Completed"}</option>
          <option value="disputed">{isAr ? "متنازع عليه" : "Disputed"}</option>
          <option value="cancelled">{isAr ? "ملغى" : "Cancelled"}</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "رقم الحجز والبرنامج" : "Code & Tour"}</th>
              <th>{isAr ? "العميل والمرشد" : "Parties"}</th>
              <th>{isAr ? "المبلغ الإجمالي" : "Amount"}</th>
              <th>{isAr ? "حالة الحجز" : "Status"}</th>
              <th>{isAr ? "تاريخ الرحلة" : "Tour Date"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا توجد حجوزات تطابق البحث." : "No bookings found."}
                </td>
              </tr>
            ) : (
              filteredBookings.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>
                      {row.code}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 700, marginTop: "2px" }}>
                      {row.program}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontSize: "12px" }}>
                      <div><span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "العميل:" : "Client:"}</span> <strong>{row.client}</strong></div>
                      <div><span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "المرشد:" : "Guide:"}</span> <strong>{row.guide}</strong></div>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontWeight: 900, color: "#10B981", fontSize: "13px" }}>
                      {row.amount}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background:
                          row.status === "confirmed"
                            ? "rgba(16, 185, 129, 0.15)"
                            : row.status === "completed"
                            ? "rgba(59, 130, 246, 0.15)"
                            : row.status === "disputed"
                            ? "rgba(139, 92, 246, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                        color:
                          row.status === "confirmed"
                            ? "#10B981"
                            : row.status === "completed"
                            ? "#3B82F6"
                            : row.status === "disputed"
                            ? "#8B5CF6"
                            : "#EF4444",
                      }}
                    >
                      {row.status === "confirmed"
                        ? (isAr ? "مؤكد" : "Confirmed")
                        : row.status === "completed"
                        ? (isAr ? "مكتمل" : "Completed")
                        : row.status === "disputed"
                        ? (isAr ? "متنازع عليه" : "Disputed")
                        : (isAr ? "ملغى" : "Cancelled")}
                    </span>
                  </td>

                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.date}</td>

                  <td style={{ textAlign: "end" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(row)}
                      className="rafeeq-action-btn"
                      title={isAr ? "إدارة الحجز" : "Manage Booking"}
                    >
                      <EyeIcon size={14} color="var(--color-gold-heading)" />
                      <span>{isAr ? "إدارة الحجز" : "Manage"}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: View/Manage Booking */}
      {selectedBooking && (
        <Modal
          isOpen={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          title={isAr ? `إدارة وتفاصيل الحجز: ${selectedBooking.code}` : `Booking Management: ${selectedBooking.code}`}
          subtitle={`${selectedBooking.program} • ${selectedBooking.amount}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "العميل" : "Client"}</span><p style={{ fontWeight: 800 }}>{selectedBooking.client} ({selectedBooking.clientEmail})</p></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "المرشد" : "Guide"}</span><p style={{ fontWeight: 800 }}>{selectedBooking.guide} ({selectedBooking.guideEmail})</p></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تاريخ الرحلة" : "Tour Date"}</span><p style={{ fontWeight: 800 }}>{selectedBooking.date}</p></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "حالة حساب الضمان (Escrow)" : "Escrow Status"}</span><p style={{ fontWeight: 800, color: "var(--color-gold-heading)" }}>{selectedBooking.escrowStatus}</p></div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>
                {isAr ? "تغيير حالة الحجز استثنائياً:" : "Administrative Status Override:"}
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(["confirmed", "completed", "cancelled", "disputed"] as Booking["status"][]).map((st) => (
                  <Button
                    key={st}
                    variant={selectedBooking.status === st ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange(selectedBooking, st)}
                  >
                    {st === "confirmed" ? (isAr ? "مؤكد" : "Confirmed") : st === "completed" ? (isAr ? "مكتمل" : "Completed") : st === "cancelled" ? (isAr ? "ملغى" : "Cancelled") : (isAr ? "متنازع عليه" : "Disputed")}
                  </Button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
