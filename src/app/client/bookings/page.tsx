import Link from "next/link";
import { Button } from "@/components/ui/Button";

const BOOKINGS = [
  {
    id: "book-101",
    bookingNumber: "RFQ-2026-9042",
    programTitle: "جولة مدائن صالح والبلدة القديمة بالعلا",
    guideName: "عبد العزيز الشمري",
    date: "24 أكتوبر 2026",
    participants: 2,
    totalSar: 1700,
    status: "مؤكد",
    statusBadgeColor: "var(--color-saudi-green)",
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
    statusBadgeColor: "var(--color-gold-dark)",
  },
] as const;

export default function ClientBookingsPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>حجوزاتي</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>متابعة حالة حجوزاتك الحالية والسابقة</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {BOOKINGS.map((b) => (
          <div key={b.id} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
            <div>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>رقم الحجز: {b.bookingNumber}</span>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginTop: "var(--space-1)" }}>{b.programTitle}</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>
                المرشد: {b.guideName} • التاريخ: {b.date} • {b.participants} مشاركين
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <span style={{ background: "rgba(0, 108, 53, 0.1)", color: b.statusBadgeColor, padding: "var(--space-1) var(--space-3)", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                {b.status}
              </span>
              <span style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-saudi-green)" }}>{b.totalSar} ر.س</span>
              <Link href={`/client/bookings/${b.id}`}>
                <Button variant="outline" size="sm">تفاصيل الرحلة</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
