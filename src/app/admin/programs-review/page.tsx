"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ProgramToReview {
  id: string;
  title: string;
  guide: string;
  price: string;
  imagesCount: number;
  duration: string;
  city: string;
  description: string;
}

const INITIAL_PROGRAMS: ProgramToReview[] = [
  {
    id: "prog-1",
    title: "رحلة جبل القارة والواحة بالأحساء",
    guide: "خالد الحربي",
    price: "380 ر.س",
    imagesCount: 5,
    duration: "يوم كامل (8 ساعات)",
    city: "الأحساء",
    description: "جولة استكشافية مغامرة لكهوف جبل القارة الطبيعية وزيارة الواحة ومزارع النخيل مع وجبة غداء تراثية أحسائية.",
  },
  {
    id: "prog-2",
    title: "جولة الغوص واستكشاف شعب حقل البحرية",
    guide: "ريم العلي",
    price: "550 ر.س",
    imagesCount: 8,
    duration: "6 ساعات",
    city: "حقل / تبوك",
    description: "رحلة غوص احترافية مع مرشد غوص معتمد لرؤية السفينة الغارقة والحيوانات البحرية النادرة في خليج العقبة.",
  },
];

export default function AdminProgramsReviewPage() {
  const [programs, setPrograms] = useState<ProgramToReview[]>(INITIAL_PROGRAMS);
  const [selectedProg, setSelectedProg] = useState<ProgramToReview | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handlePublish = (id: string, title: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setSelectedProg(null);
    showToast(`تم نشر البرنامج السياحي (${title}) على المنصة العامة بنجاح! 🚀`);
  };

  const handleRequestChanges = (id: string, title: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    setSelectedProg(null);
    showToast(`تم إرجاع البرنامج (${title}) للمرشد لطلب تعديلات على المحتوى.`);
  };

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>مراجعة ونشر البرامج السياحية 📋</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>مراجعة جودة محتوى البرامج السياحية وصورها قبل النشر والإتاحة للمسافرين</p>

      {programs.length === 0 ? (
        <div className="glass" style={{ padding: "var(--space-8)", textAlign: "center", borderRadius: "var(--radius-2xl)", color: "var(--color-text-muted)" }}>
          <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>تم نشر كافة البرامج المعلقة 🚀</h3>
          <p>جميع البرامج المرفوقة معتمدة ومنشورة حالياً في الكتالوج العام.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {programs.map((p) => (
            <div key={p.id} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>{p.title}</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-1)" }}>
                  المرشد: {p.guide} • المدينة: {p.city} • السعر: {p.price} • الصور: {p.imagesCount} صور
                </p>
              </div>

              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                <Button variant="outline" size="sm" onClick={() => setSelectedProg(p)}>
                  معاينة البرنامج 👁️
                </Button>
                <Button variant="primary" size="sm" onClick={() => handlePublish(p.id, p.title)}>
                  نشر على المنصة 🚀
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProg && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "var(--space-4)" }}>
          <div className="glass" style={{ width: "550px", background: "var(--color-midnight-blue)", padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>{selectedProg.title}</h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", fontWeight: 700, marginBottom: "var(--space-4)" }}>
              بواسطة المرشد: {selectedProg.guide} • {selectedProg.city} • {selectedProg.duration}
            </p>

            <div style={{ padding: "var(--space-4)", background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-6)", fontSize: "var(--text-sm)" }}>
              <h4 style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-2)" }}>الوصف الشامل للبرنامج:</h4>
              <p style={{ lineHeight: 1.6 }}>{selectedProg.description}</p>
              <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-saudi-green)" }}>
                <span>السعر المحدد للرحلة: {selectedProg.price}</span>
                <span>عدد الصور المرفقة: {selectedProg.imagesCount} صور عالية الجودة</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <Button variant="primary" size="md" onClick={() => handlePublish(selectedProg.id, selectedProg.title)}>
                نشر البرنامج فوراً 🚀
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleRequestChanges(selectedProg.id, selectedProg.title)}>
                طلب تعديلات من المرشد
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProg(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
