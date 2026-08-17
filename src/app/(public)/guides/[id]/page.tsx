import { ProgramCard } from "@/components/domain/ProgramCard";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default async function PublicGuideProfilePage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <section style={{ background: "var(--gradient-midnight)", paddingBlock: "var(--space-28) var(--space-12)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <BackButton fallbackHref="/programs" labelAr="العودة للبرامج" />
          </div>

          <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "var(--radius-full)",
                background: "var(--gradient-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--text-3xl)",
                fontWeight: 800,
                color: "var(--color-midnight-blue)",
                flexShrink: 0,
              }}
            >
              ع
            </div>

            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-1)" }}>
                <h1 style={{ color: "var(--color-warm-white)", fontSize: "var(--text-3xl)", fontWeight: 800 }}>عبد العزيز الشمري</h1>
                <span style={{ background: "var(--color-saudi-green)", color: "white", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                  ✓ مرشد معتمد
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-sm)", marginBottom: "var(--space-3)" }}>
                مرشد سياحي مرخص من وزارة السياحة السعودية — متمرس في تراث العلا وآثار الأنباط.
              </p>
              <div style={{ display: "flex", gap: "var(--space-4)", color: "var(--color-gold-light)", fontSize: "var(--text-xs)" }}>
                <span>⭐ 4.95 (128 رحلة)</span>
                <span>🗣️ العربية / الإنجليزية</span>
                <span>📍 العلا / الرياض</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "var(--space-6)" }}>
            البرامج المنشورة من هذا المرشد
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            <ProgramCard
              id="prog-alula-1"
              title="جولة مدائن صالح وتكوينات الحجر الصخرية في العلا"
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
      </section>
    </>
  );
}
