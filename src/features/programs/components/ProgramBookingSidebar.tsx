"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";

interface ProgramBookingSidebarProps {
  programId: string;
  priceSar: number;
  priceHalalas?: number | bigint;
}

export function ProgramBookingSidebar({ programId, priceSar, priceHalalas }: ProgramBookingSidebarProps) {
  const router = useRouter();
  const { lang, isAr, t } = useLanguage();
  
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [participants, setParticipants] = useState<number>(2);

  const unitHalalas = priceHalalas ? BigInt(priceHalalas) : BigInt(priceSar * 100);
  const totalHalalas = unitHalalas * BigInt(participants);

  const formattedUnitPrice = formatPrice(unitHalalas, lang, true);
  const formattedTotalPrice = formatPrice(totalHalalas, lang, true);

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
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            {t.programDetails.pricePerPerson}
          </span>
          <div>
            <span style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-saudi-green)" }}>
              {formattedUnitPrice}
            </span>
          </div>
        </div>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: 600 }}>
          {t.common.escrowBadge}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>
            {t.programDetails.tripDate}
          </label>
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
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600, marginBottom: "var(--space-1)" }}>
            {t.programDetails.selectParticipants}
          </label>
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
              outline: "none",
              cursor: "pointer",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
              <option key={num} value={num}>
                {num} {isAr ? (num === 1 ? "مسافر" : num === 2 ? "مسافران" : "مسافرين") : (num === 1 ? "Traveler" : "Travelers")}
                {" "} ({formatPrice(unitHalalas * BigInt(num), lang, true)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ background: "rgba(200, 169, 110, 0.08)", padding: "10px", borderRadius: "8px", marginBottom: "var(--space-4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
          {t.programDetails.subtotal}:
        </span>
        <strong style={{ fontSize: "var(--text-base)", color: "var(--color-gold-heading)" }}>
          {formattedTotalPrice}
        </strong>
      </div>

      <Button variant="primary" fullWidth size="lg" onClick={handleStartBooking}>
        {t.programDetails.bookNowBtn}
      </Button>

      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textAlign: "center", marginTop: "var(--space-3)" }}>
        {t.programDetails.softLockNotice}
      </p>
    </div>
  );
}
