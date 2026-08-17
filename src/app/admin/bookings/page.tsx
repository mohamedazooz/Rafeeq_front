"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Booking {
  id: string;
  code: string;
  client: string;
  guide: string;
  program: string;
  amount: string;
  status: "pending_payment" | "confirmed" | "completed" | "cancelled" | "disputed";
  date: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: "b-101", code: "RFQ-8821", client: "محمد العتيبي", guide: "عبد العزيز الشمري", program: "جولة وادي حنيفة والدرعية التاريخية", amount: "450 ر.س", status: "confirmed", date: "2026-08-18" },
  { id: "b-102", code: "RFQ-8822", client: "سارة الحمد", guide: "خالد الحربي", program: "رحلة جبل القارة والواحة بالأحساء", amount: "380 ر.س", status: "pending_payment", date: "2026-08-19" },
  { id: "b-103", code: "RFQ-8823", client: "فهد السليمان", guide: "ريم العلي", program: "استكشاف شعب حقل والغوص", amount: "1,100 ر.س", status: "disputed", date: "2026-08-15" },
  { id: "b-104", code: "RFQ-8824", client: "علي الغامدي", guide: "عبد العزيز الشمري", program: "مسار طويق وتخييم نجد", amount: "650 ر.س", status: "completed", date: "2026-08-10" },
  { id: "b-105", code: "RFQ-8825", client: "نورة القحطاني", guide: "منى علي", program: "جولة أسواق جدة التاريخية", amount: "300 ر.س", status: "cancelled", date: "2026-08-12" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleStatusChange = (id: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    showToast(`تم تغيير حالة الحجز (${id}) إلى ${newStatus} بنجاح عبر Admin Override! ✓`);
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
        return <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>مؤكد ✓</span>;
      case "pending_payment":
        return <span style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>قيد الدفع ⏳</span>;
      case "completed":
        return <span style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>مكتمل 🎉</span>;
      case "cancelled":
        return <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>ملغى ✕</span>;
      case "disputed":
        return <span style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>متنازع عليه ⚠️</span>;
    }
  };

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "linear-gradient(90deg, #10B981 0%, #059669 100%)", color: "#fff", padding: "14px 28px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", zIndex: 9999, fontWeight: 800, fontSize: "14px" }}>
          {toast}
        </div>
      )}

      {/* Page Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#C8A96E" }}>إدارة جميع الحجوزات والـ Admin Override 🎫</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>مراقبة الحجوزات، تحديث الحالات استثنائياً، واستعراض مبالغ الضمان (Escrow)</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px", borderRadius: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "all", label: "الكل" },
            { id: "confirmed", label: "مؤكدة" },
            { id: "pending_payment", label: "قيد الدفع" },
            { id: "completed", label: "مكتملة" },
            { id: "disputed", label: "النزاعات" },
            { id: "cancelled", label: "ملغاة" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: selectedFilter === f.id ? "#C8A96E" : "rgba(255,255,255,0.05)",
                color: selectedFilter === f.id ? "#0f172a" : "#fff",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="ابحث بكود الحجز، العميل، المرشد..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "12px",
            width: "280px",
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <th style={{ padding: "12px" }}>رمز الحجز</th>
              <th style={{ padding: "12px" }}>البرنامج السياحي</th>
              <th style={{ padding: "12px" }}>العميل</th>
              <th style={{ padding: "12px" }}>المرشد</th>
              <th style={{ padding: "12px" }}>المبلغ</th>
              <th style={{ padding: "12px" }}>الحالة</th>
              <th style={{ padding: "12px" }}>التاريخ</th>
              <th style={{ padding: "12px" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px", fontWeight: 800, color: "#C8A96E", fontFamily: "monospace" }}>{b.code}</td>
                <td style={{ padding: "12px", fontWeight: 700 }}>{b.program}</td>
                <td style={{ padding: "12px" }}>{b.client}</td>
                <td style={{ padding: "12px" }}>{b.guide}</td>
                <td style={{ padding: "12px", fontWeight: 700 }}>{b.amount}</td>
                <td style={{ padding: "12px" }}>{getStatusBadge(b.status)}</td>
                <td style={{ padding: "12px", fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{b.date}</td>
                <td style={{ padding: "12px" }}>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBooking(b)}>
                    تعديل / Admin Override
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details & Override Modal */}
      {selectedBooking && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "24px" }}>
          <div style={{ width: "520px", background: "#0b1329", padding: "28px", borderRadius: "24px", border: "1px solid rgba(200, 169, 110, 0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#C8A96E", marginBottom: "16px" }}>تفاصيل الحجز #{selectedBooking.code}</h3>
            
            <div style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px", background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "12px" }}>
              <p><strong>البرنامج:</strong> {selectedBooking.program}</p>
              <p><strong>العميل:</strong> {selectedBooking.client}</p>
              <p><strong>المرشد:</strong> {selectedBooking.guide}</p>
              <p><strong>المبلغ المحتجز بالـ Escrow:</strong> {selectedBooking.amount}</p>
              <p><strong>الحالة الحالية:</strong> {getStatusBadge(selectedBooking.status)}</p>
            </div>

            <h4 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px", color: "#C8A96E" }}>تغيير حالة الحجز استثنائياً (Admin Override):</h4>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
              <Button variant="secondary" size="sm" onClick={() => handleStatusChange(selectedBooking.id, "confirmed")}>
                تأكيد الحجز ✓
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleStatusChange(selectedBooking.id, "completed")}>
                إكمال وإفراج عن المبلغ 🎉
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedBooking.id, "disputed")}>
                تحويل للنزاع ⚠️
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleStatusChange(selectedBooking.id, "cancelled")}>
                إلغاء وإعادة المبلغ ✕
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
