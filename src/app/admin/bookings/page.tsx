"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  CalendarIcon,
  SearchIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  ScaleIcon,
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

  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleStatusChange = (booking: Booking, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === booking.id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    dispatchDualActionNotification({
      title: `تحديث حالة الحجز #${booking.code}`,
      message: `تم تغيير حالة الحجز (${booking.program}) إلى (${newStatus}) عبر الإدارة.`,
      actionType: "UPDATE",
      targetEmail: booking.clientEmail,
      targetName: booking.client,
      targetRole: "Client",
    });

    showToast(isAr ? `تم تحديث حالة الحجز #${booking.code} إلى (${newStatus}) وإرسال إشعار فوري للعميل والمرشد.` : `Booking #${booking.code} updated.`);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = selectedFilter === "all" || b.status === selectedFilter;
    const matchesSearch =
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.client.includes(searchQuery) ||
      b.guide.includes(searchQuery) ||
      b.program.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-modal-bg)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <CalendarIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "مركز العمليات والحجوزات الفورية" : "Bookings Operations & Overrides"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "إدارة جميع الحجوزات والعمليات 🎫" : "Bookings & Admin Override Ops"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "مراقبة الحجوزات، التحقق من رصيد الضمان المحتجز (Escrow)، وتغيير الحالات استثنائياً." : "Real-time bookings surveillance, escrow snapshot inspection, and manual override controls."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: isAr ? "الكل" : "All" },
            { id: "confirmed", label: isAr ? "مؤكدة" : "Confirmed" },
            { id: "pending_payment", label: isAr ? "قيد الدفع" : "Pending" },
            { id: "completed", label: isAr ? "مكتملة" : "Completed" },
            { id: "disputed", label: isAr ? "النزاعات" : "Disputed" },
            { id: "cancelled", label: isAr ? "ملغاة" : "Cancelled" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: `1px solid ${selectedFilter === f.id ? "transparent" : "var(--color-border)"}`,
                background: selectedFilter === f.id ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                color: selectedFilter === f.id ? "#0f172a" : "var(--color-text-primary)",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث بكود الحجز، العميل، المرشد..." : "Search booking code, client, guide..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "9px 14px", paddingInlineStart: "36px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={15} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "كود الحجز" : "Code"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "البرنامج السياحي" : "Tour Program"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "العميل المسافر" : "Client"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المرشد المحلي" : "Guide"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المبلغ (SAR)" : "Amount"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "التحكم" : "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>
                  #{b.code}
                </td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{b.program}</td>
                <td style={{ padding: "14px 16px" }}>{b.client}</td>
                <td style={{ padding: "14px 16px" }}>{b.guide}</td>
                <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10B981" }}>{b.amount}</td>
                <td style={{ padding: "14px 16px" }}>{getStatusBadge(b.status)}</td>
                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <IconButton
                    variant="gold"
                    size="sm"
                    title={isAr ? "معاينة وتعديل حالة الحجز" : "Inspect Booking"}
                    icon={<EyeIcon size={15} />}
                    onClick={() => setSelectedBooking(b)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details & Override Modal with Theme-Aware Container */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={selectedBooking ? (isAr ? `تفاصيل الحجز #${selectedBooking.code}` : `Booking Details #${selectedBooking.code}`) : ""}
        subtitle={selectedBooking?.program}
        maxWidth="560px"
      >
        {selectedBooking && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Info Box */}
            <div className="rafeeq-modal-box" style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "العميل المسافر:" : "Client:"}</span>
                <strong>{selectedBooking.client} ({selectedBooking.clientEmail})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "المرشد السياحي:" : "Guide:"}</span>
                <strong>{selectedBooking.guide} ({selectedBooking.guideEmail})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "الحالة الحالية:" : "Status:"}</span>
                <div>{getStatusBadge(selectedBooking.status)}</div>
              </div>
            </div>

            {/* Price Snapshot Breakdown */}
            <div className="rafeeq-modal-box" style={{ background: "rgba(200, 169, 110, 0.08)", borderColor: "rgba(200, 169, 110, 0.25)" }}>
              <h5 style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "10px" }}>
                {isAr ? "لقطة التسعير والحسابات (Price Snapshot Breakdown):" : "Price Snapshot Breakdown:"}
              </h5>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "إجمالي الحجز:" : "Total:"}</span>
                  <strong>{selectedBooking.amount}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "عمولة رفيق (15%):" : "Commission:"}</span>
                  <strong style={{ color: "#10B981" }}>57.00 ر.س</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "ضريبة الـ VAT (15%):" : "VAT (15%):"}</span>
                  <strong>57.00 ر.س</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>{isAr ? "صافي المرشد:" : "Net Guide:"}</span>
                  <strong style={{ color: "#3B82F6" }}>266.00 ر.س</strong>
                </div>
              </div>
            </div>

            {/* Override Controls */}
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 800, marginBottom: "10px", color: "var(--color-gold-heading)" }}>
                {isAr ? "تغيير حالة الحجز استثنائياً (Admin Override):" : "Admin Override Status:"}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <Button variant="secondary" size="sm" onClick={() => handleStatusChange(selectedBooking, "confirmed")}>
                  {isAr ? "تأكيد الحجز ✓" : "Confirm Booking"}
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleStatusChange(selectedBooking, "completed")}>
                  {isAr ? "إكمال وإفراج عن المبلغ 🎉" : "Complete & Release Escrow"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedBooking, "disputed")}>
                  {isAr ? "تحويل للنزاع ⚠️" : "Move to Dispute"}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleStatusChange(selectedBooking, "cancelled")}>
                  {isAr ? "إلغاء وإعادة المبلغ ✕" : "Cancel & Refund"}
                </Button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
