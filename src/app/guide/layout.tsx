import Link from "next/link";

const GUIDE_LINKS = [
  { href: "/guide/dashboard", label: "📈 لوحة الأداء" },
  { href: "/guide/programs", label: "📋 برامجي" },
  { href: "/guide/programs/create", label: "➕ إنشاء برنامج" },
  { href: "/guide/bookings", label: "🎫 حجوزات العملاء" },
  { href: "/guide/calendar", label: "🗓️ تقويم التوافر" },
  { href: "/guide/wallet", label: "💰 المحفظة والأرباح" },
  { href: "/guide/profile", label: "👤 الملف الاحترافي" },
] as const;

export default function GuideLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "var(--color-midnight-blue)",
          borderInlineEnd: "1px solid rgba(255,255,255,0.08)",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <Link href="/" style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-gold-royal)", textDecoration: "none", marginBottom: "var(--space-2)", display: "block" }}>
          رفيق Rafeeq
        </Link>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", background: "rgba(0,108,53,0.2)", color: "var(--color-saudi-green-light)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "var(--space-6)", width: "fit-content" }}>
          ✓ مرشد معتمد
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {GUIDE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "var(--space-3)",
                borderRadius: "var(--radius-lg)",
                color: "var(--color-warm-white)",
                textDecoration: "none",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ color: "var(--color-gold-light)", fontSize: "var(--text-xs)", textDecoration: "none" }}>
            ← العودة للموقع العام
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, minWidth: 0, overflowX: "auto" }}>
        {children}
      </main>
    </div>
  );
}
