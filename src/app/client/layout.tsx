import Link from "next/link";

const CLIENT_LINKS = [
  { href: "/client/dashboard", label: "📊 نظرة عامة" },
  { href: "/client/bookings", label: "🎫 حجوزاتي" },
  { href: "/client/wishlist", label: "❤️ المفضلة" },
  { href: "/client/messages", label: "💬 المراسلات" },
  { href: "/client/payments", label: "💳 الفواتير" },
  { href: "/client/profile", label: "👤 الملف الشخصي" },
] as const;

export default function ClientLayout({ children }: { readonly children: React.ReactNode }) {
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
        <Link href="/" style={{ fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-gold-royal)", textDecoration: "none", marginBottom: "var(--space-8)", display: "block" }}>
          رفيق Rafeeq
        </Link>

        <div style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
          لوحة العميل المسافر
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {CLIENT_LINKS.map((link) => (
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
                transition: "background var(--duration-fast)",
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
