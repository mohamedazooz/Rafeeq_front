import Link from "next/link";
import { Button } from "@/components/ui/Button";

const GUIDE_PROGRAMS = [
  { id: "prog-1", title: "جولة مدائن صالح والبلدة القديمة بالعلا", status: "منشور", bookingsCount: 18, priceSar: 850, rating: 4.9 },
  { id: "prog-2", title: "مراقبة الفلك وتأمل النجوم في صحراء العلا", status: "قيد المراجعة", bookingsCount: 0, priceSar: 450, rating: 0 },
] as const;

export default function GuideProgramsPage() {
  return (
    <div style={{ padding: "var(--space-6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>برامجي السياحية 📋</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>عرض وإدارة وتعديل جميع برامجك السياحية</p>
        </div>
        <Link href="/guide/programs/create">
          <Button variant="primary" size="md">+ برنامج جديد</Button>
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {GUIDE_PROGRAMS.map((p) => (
          <div key={p.id} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-1)" }}>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>{p.title}</h3>
                <span style={{ background: p.status === "منشور" ? "rgba(0,108,53,0.1)" : "rgba(200,169,110,0.1)", color: p.status === "منشور" ? "var(--color-saudi-green)" : "var(--color-gold-royal)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                  {p.status}
                </span>
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                السعر: {p.priceSar} ر.س • الحجوزات: {p.bookingsCount} • التقييم: {p.rating > 0 ? `${p.rating} ⭐` : "جديد"}
              </p>
            </div>

            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <Button variant="outline" size="sm">تعديل</Button>
              <Button variant="ghost" size="sm">معاينة</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
