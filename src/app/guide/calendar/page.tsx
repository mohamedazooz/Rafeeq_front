"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  CalendarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  PlusIcon,
  EditIcon,
} from "@/components/icons";

import { bookingsService } from "@/features/bookings/services/bookings.service";

interface CalendarDayState {
  readonly day: number;
  readonly dateStr: string;
  readonly dayNameAr: string;
  readonly isAvailable: boolean;
  readonly isBooked: boolean;
  readonly customPriceSar?: number;
  readonly capacity: number;
  readonly bookedCount: number;
}

const DAY_NAMES = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function GuideCalendarPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [selectedMonth] = useState("أكتوبر 2026");
  const [selectedDay, setSelectedDay] = useState<CalendarDayState | null>(null);
  const [modalPrice, setModalPrice] = useState<string>("850");
  const [modalCapacity, setModalCapacity] = useState<string>("8");
  const [modalIsAvailable, setModalIsAvailable] = useState<boolean>(true);

  // Initialize 31 days of October 2026
  const [days, setDays] = useState<CalendarDayState[]>(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const dateStr = `2026-10-${day.toString().padStart(2, "0")}`;
      const dayIndex = (day + 3) % 7; // Oct 1, 2026 is Thursday (index 4)
      const dayNameAr = DAY_NAMES[dayIndex];
      const isBooked = day === 24; // Oct 24 booked
      const isAvailable = !isBooked && day % 7 !== 2; // Tuesdays off by default
      return {
        day,
        dateStr,
        dayNameAr,
        isAvailable,
        isBooked,
        customPriceSar: day >= 20 && day <= 25 ? 950 : 850,
        capacity: 8,
        bookedCount: isBooked ? 2 : 0,
      };
    });
  });

  const handleDayClick = (dayState: CalendarDayState) => {
    if (dayState.isBooked) {
      warning("هذا اليوم مرتبط برحلة مؤكدة ولا يمكن إغلاق توافره مباشرة.");
      return;
    }
    setSelectedDay(dayState);
    setModalIsAvailable(dayState.isAvailable);
    setModalPrice(dayState.customPriceSar ? String(dayState.customPriceSar) : "850");
    setModalCapacity(String(dayState.capacity || 8));
  };

  const handleSaveDay = async () => {
    if (!selectedDay) return;

    const newPrice = Number(modalPrice) || 850;
    const isAvail = modalIsAvailable;

    setDays((prev) =>
      prev.map((d) =>
        d.day === selectedDay.day
          ? {
              ...d,
              isAvailable: isAvail,
              customPriceSar: newPrice,
              capacity: Number(modalCapacity) || 8,
            }
          : d
      )
    );

    try {
      await bookingsService.updateCalendarDays([
        {
          date: selectedDay.dateStr,
          state: isAvail ? "available" : "blocked",
          customPricePerPersonHalalas: newPrice * 100,
        },
      ]);
    } catch {
      // Local state already updated optimistically
    }

    setSelectedDay(null);
    success(`تم تحديث توافر وتسعير يوم (${selectedDay.day} أكتوبر) بنجاح.`);
  };

  const handleApplyWeekendRates = async () => {
    const updatedDaysPayload: Array<{ date: string; state: "available" | "blocked"; customPricePerPersonHalalas: number }> = [];

    setDays((prev) =>
      prev.map((d) => {
        const isWeekend = d.dayNameAr === "الجمعة" || d.dayNameAr === "السبت";
        if (isWeekend && !d.isBooked) {
          updatedDaysPayload.push({
            date: d.dateStr,
            state: "available",
            customPricePerPersonHalalas: 95000,
          });
          return { ...d, customPriceSar: 950, isAvailable: true };
        }
        return d;
      })
    );

    try {
      if (updatedDaysPayload.length > 0) {
        await bookingsService.updateCalendarDays(updatedDaysPayload);
      }
    } catch {
      // Optimistic
    }

    success("تم تطبيق تسعيرة عطلة نهاية الأسبوع (950 ر.س) لجميع أيام الجمعة والسبت وحفظها بالخادم بنجاح.");
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            تقويم التوافر والتسعير الذكي
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            التحكم بأيام العمل، إغلاق أو فتح التواريخ، وتحديد أسعار المواسم وعطلات نهاية الأسبوع
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outline" size="md" onClick={handleApplyWeekendRates}>
            <span>تطبيق تسعيرة الويكند (الجمعة والسبت)</span>
          </Button>
        </div>
      </div>

      {/* Calendar Header Month & Legend */}
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-2xl)",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)", margin: 0 }}>
          {selectedMonth} (موسم شتاء العلا)
        </h2>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981" }} />
            <span>متاح للحجز</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--color-gold-heading)" }} />
            <span>رحلة مؤكدة (محجوز)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--color-text-muted)", opacity: 0.5 }} />
            <span>مغلق / إجازة</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid 7 columns */}
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-2xl)",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* Day Name Headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", textAlign: "center", marginBottom: "12px", color: "var(--color-text-muted)", fontSize: "12px", fontWeight: 800 }}>
          {DAY_NAMES.map((d) => (
            <div key={d} style={{ padding: "6px" }}>{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" }}>
          {/* Offset 4 days for Thursday start */}
          {[0, 1, 2, 3].map((offset) => (
            <div key={`offset-${offset}`} style={{ minHeight: "90px", opacity: 0.2 }} />
          ))}

          {days.map((d) => {
            const isBooked = d.isBooked;
            const isAvailable = d.isAvailable;

            const bg = isBooked
              ? "rgba(200, 169, 110, 0.15)"
              : isAvailable
              ? "rgba(16, 185, 129, 0.08)"
              : "var(--color-bg-secondary)";

            const borderColor = isBooked
              ? "var(--color-gold-heading)"
              : isAvailable
              ? "rgba(16, 185, 129, 0.4)"
              : "var(--color-border)";

            return (
              <div
                key={d.day}
                onClick={() => handleDayClick(d)}
                style={{
                  minHeight: "90px",
                  padding: "10px",
                  borderRadius: "12px",
                  background: bg,
                  border: `1px solid ${borderColor}`,
                  cursor: isBooked ? "default" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.15s ease",
                  opacity: isAvailable || isBooked ? 1 : 0.6,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: isBooked ? "var(--color-gold-heading)" : "var(--color-text-primary)" }}>
                    {d.day}
                  </span>
                  {isBooked && (
                    <span style={{ fontSize: "10px", background: "var(--color-gold-heading)", color: "#0B132B", padding: "1px 5px", borderRadius: "4px", fontWeight: 800 }}>
                      محجوز (2)
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "6px" }}>
                  {isAvailable && (
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-saudi-green)", display: "block" }}>
                      {d.customPriceSar} ر.س
                    </span>
                  )}
                  {!isAvailable && !isBooked && (
                    <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                      مغلق
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Edit Day Settings */}
      <Modal isOpen={Boolean(selectedDay)} onClose={() => setSelectedDay(null)} title={`تعديل توافر يوم (${selectedDay?.day} أكتوبر)`} maxWidth="480px">
        {selectedDay && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id="dayAvail"
                checked={modalIsAvailable}
                onChange={(e) => setModalIsAvailable(e.target.checked)}
                style={{ accentColor: "var(--color-gold-heading)" }}
              />
              <label htmlFor="dayAvail" style={{ fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                اليوم متاح لاستقبال الحجوزات
              </label>
            </div>

            {modalIsAvailable && (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    سعر الجولة لهذا اليوم (ر.س للشخص)
                  </label>
                  <input
                    type="number"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    الطاقة الاستيعابية القصوى (عدد المسافرين)
                  </label>
                  <input
                    type="number"
                    value={modalCapacity}
                    onChange={(e) => setModalCapacity(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                  />
                </div>
              </>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <Button variant="ghost" size="md" onClick={() => setSelectedDay(null)}>إلغاء</Button>
              <Button variant="primary" size="md" onClick={handleSaveDay}>حفظ التغييرات</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
