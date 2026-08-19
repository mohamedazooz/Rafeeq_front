"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ProgramBookingSidebarProps {
  programId: string;
  priceSar: number;
}

export function ProgramBookingSidebar({ programId, priceSar }: ProgramBookingSidebarProps) {
  const router = useRouter();
  
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [participants, setParticipants] = useState<number>(2);

  const totalSar = priceSar * participants;

  const handleStartBooking = () => {
    router.push(`/client/checkout/${programId}?date=${selectedDate}&participants=${participants}`);
  };

  return (
    <div
      className="glass"
      style={{
        position: "sticky",
        top: "calc(var(--header-height) + var(--space-6))",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--color-gold-royal)",
        boxShadow: "var(--shadow-gold)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-6)" }}>
        <div>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>سعر الشخص</span>
          <div>
            <span style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-saudi-green)" }}>{priceSar}</span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginInlineStart: "var(--space-1)" }}>ر.س</span>
          </div>
        </div>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 600 }}>🔒 دفع آمن بالضمان Escrow</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>تاريخ الرحلة</label>
          <input
            type="date"
            min={tomorrow}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: "100%",
              padding: "var(--space-3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
              fontSize: "var(--text-sm)",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>عدد المشاركين</label>
          <select
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "var(--space-3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
              fontSize: "var(--text-sm)",
            }}
          >
            <option value="1">1 شخص ({priceSar * 1} ر.س)</option>
            <option value="2">2 شخص ({priceSar * 2} ر.س)</option>
            <option value="3">3 أشخاص ({priceSar * 3} ر.س)</option>
            <option value="4">4 أشخاص ({priceSar * 4} ر.س)</option>
            <option value="5">5 أشخاص ({priceSar * 5} ر.س)</option>
            <option value="6">6 أشخاص ({priceSar * 6} ر.س)</option>
          </select>
        </div>
      </div>

      <div style={{ background: "rgba(200, 169, 110, 0.08)", padding: "10px", borderRadius: "8px", marginBottom: "var(--space-4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>الإجمالي المبدئي:</span>
        <strong style={{ fontSize: "var(--text-base)", color: "var(--color-gold-heading)" }}>{totalSar.toLocaleString("en-US")} ر.س</strong>
      </div>

      <Button variant="primary" fullWidth size="lg" onClick={handleStartBooking}>
        احجز الآن وآمِن مقعدك ⏱️
      </Button>

      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textAlign: "center", marginTop: "var(--space-3)" }}>
        تجميد الموعد لمدة 15 دقيقة مع ضمان استرداد 100%
      </p>
    </div>
  );
}
