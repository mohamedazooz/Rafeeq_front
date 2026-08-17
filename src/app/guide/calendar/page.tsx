export default function GuideCalendarPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>تقويم التوافر 🗓️</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>حدد أيام توافرك واستقبالك للحجوزات لتجنب أي تداخل في الرحلات</p>

      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800 }}>أكتوبر 2026</h2>
          <div style={{ display: "flex", gap: "var(--space-3)", fontSize: "var(--text-xs)" }}>
            <span style={{ color: "var(--color-saudi-green)", fontWeight: 700 }}>🟩 متاح للرحلات</span>
            <span style={{ color: "var(--color-error)", fontWeight: 700 }}>🟥 محجوز مؤكد</span>
            <span style={{ color: "var(--color-text-muted)" }}>⬜ غير متاح</span>
          </div>
        </div>

        {/* Mock Interactive Calendar Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "var(--space-2)", fontSize: "var(--text-sm)" }}>
          {["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day) => (
            <div key={day} style={{ fontWeight: 800, padding: "var(--space-2)", color: "var(--color-gold-royal)" }}>{day}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "var(--space-4)",
                borderRadius: "var(--radius-md)",
                background: i === 23 ? "rgba(220,53,69,0.2)" : i % 2 === 0 ? "rgba(0,108,53,0.15)" : "rgba(255,255,255,0.05)",
                border: "1px solid var(--color-border)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
