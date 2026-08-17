import { ProgramCard } from "@/components/domain/ProgramCard";

export default function ClientWishlistPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>قائمة الرغبات ❤️</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>البرامج السياحية التي قمت بحفظها للتخطيط لرحلاتك القادمة</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
        <ProgramCard
          id="prog-alula-history"
          title="جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا"
          location="العلا"
          duration="يومان (8 ساعات)"
          groupSize="حتى 6 أشخاص"
          rating={4.9}
          reviewsCount={42}
          priceSar={850}
          image="/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"
          badge="تراث عالمي"
        />
      </div>
    </div>
  );
}
