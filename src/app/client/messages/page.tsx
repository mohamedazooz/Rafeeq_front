export default function ClientMessagesPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>المراسلات 💬</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>التواصل المباشر مع المرشدين السياحيين قبل الرحلة وبعدها</p>

      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--space-6)", minHeight: "400px" }}>
        {/* Threads List */}
        <div style={{ borderInlineEnd: "1px solid var(--color-border)", paddingInlineEnd: "var(--space-4)" }}>
          <div style={{ padding: "var(--space-3)", background: "rgba(200,169,110,0.1)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-2)" }}>
            <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>عبد العزيز الشمري</h4>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>جولة العلا • أهلاً بك! موعدنا الخميس...</p>
          </div>
        </div>

        {/* Chat Window */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-4)" }}>المحادثة مع عبد العزيز الشمري</h3>
            <div style={{ background: "var(--color-bg-primary)", padding: "var(--space-3)", borderRadius: "var(--radius-lg)", maxWidth: "80%", marginBottom: "var(--space-2)" }}>
              أهلاً بك يا محمد! يسعدنا استضافتك في العلا. يرجى التواجد عند نقطة التجمع الساعة 8 صباحاً.
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
            <input type="text" placeholder="اكتب رسالتك..." style={{ flexGrow: 1, padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
            <button type="button" style={{ padding: "var(--space-3) var(--space-5)", background: "var(--gradient-gold)", color: "var(--color-midnight-blue)", fontWeight: 800, borderRadius: "var(--radius-md)", border: "none" }}>إرسال</button>
          </div>
        </div>
      </div>
    </div>
  );
}
