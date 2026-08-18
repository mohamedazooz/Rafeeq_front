"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  FileTextIcon,
  EyeIcon,
  CheckCircleIcon,
  EditIcon,
  XCircleIcon,
  ShieldCheckIcon,
  FolderIcon,
} from "@/components/icons";

interface ProgramToReview {
  id: string;
  title: string;
  guide: string;
  guideEmail: string;
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
    guideEmail: "khaled.harbi@example.com",
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
    guideEmail: "reem.ali@example.com",
    price: "550 ر.س",
    imagesCount: 8,
    duration: "6 ساعات",
    city: "حقل / تبوك",
    description: "رحلة غوص احترافية مع مرشد غوص معتمد لرؤية السفينة الغارقة والحيوانات البحرية النادرة في خليج العقبة.",
  },
];

export default function AdminProgramsReviewPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [programs, setPrograms] = useState<ProgramToReview[]>(INITIAL_PROGRAMS);
  const [selectedProg, setSelectedProg] = useState<ProgramToReview | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handlePublish = (prog: ProgramToReview) => {
    setPrograms((prev) => prev.filter((p) => p.id !== prog.id));
    setSelectedProg(null);

    dispatchDualActionNotification({
      title: "اعتماد ونشر البرنامج السياحي",
      message: `تم اعتماد ونشر برنامجك (${prog.title}) في الكتالوج العام لمنصة رفيق وهو متاح للحجز الآن!`,
      actionType: "APPROVE",
      targetEmail: prog.guideEmail,
      targetName: prog.guide,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم نشر البرنامج السياحي (${prog.title}) وإرسال إشعار للمرشد!` : `Program published successfully.`);
  };

  const handleRequestChanges = (prog: ProgramToReview) => {
    setPrograms((prev) => prev.filter((p) => p.id !== prog.id));
    setSelectedProg(null);

    dispatchDualActionNotification({
      title: "طلب تعديل وتحديث بيانات البرنامج السياحي",
      message: `يرجى مراجعة تفاصيل برنامجك (${prog.title}) وإضافة صور إضافية أو تدقيق المسار.`,
      actionType: "REJECT",
      targetEmail: prog.guideEmail,
      targetName: prog.guide,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم طلب التعديل على البرنامج (${prog.title}) وإرسال الملاحظات للمرشد.` : `Changes requested from guide.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <FileTextIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "طابور اعتماد الجولات والبرامج الجديدة" : "Tour Review Queue"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "مراجعة ونشر البرامج السياحية 📋" : "Program Approvals & Publishing"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "تدقيق جودة المحتوى، المحطات، المشتملات، والصور المرفقة لضمان معايير الجودة قبل إتاحة الحجز." : "Audit itinerary details, inclusions, pricing, and images before making tours publicly bookable."}
        </p>
      </div>

      {/* Programs List */}
      {programs.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", borderRadius: "20px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircleIcon size={32} color="#10B981" />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            {isAr ? "كافة البرامج معتمدة ومنشورة" : "All Programs Published"}
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
            {isAr ? "جميع البرامج المرفوعة من المرشدين تمت مراجعتها ونشرها بالكتالوج." : "All pending programs have been audited."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {programs.map((p) => (
            <div key={p.id} style={{ padding: "20px 24px", borderRadius: "18px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FolderIcon size={18} color="var(--color-gold-heading)" />
                  <h3 style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-text-primary)" }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "6px" }}>
                  {isAr ? `المرشد: ${p.guide} • المدينة: ${p.city} • السعر: ${p.price} • الصور: ${p.imagesCount} صور` : `Guide: ${p.guide} • City: ${p.city} • Price: ${p.price} • Images: ${p.imagesCount}`}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <IconButton
                  variant="gold"
                  size="md"
                  title={isAr ? "معاينة تفاصيل البرنامج" : "Inspect Program"}
                  icon={<EyeIcon size={16} />}
                  onClick={() => setSelectedProg(p)}
                />
                <IconButton
                  variant="success"
                  size="md"
                  title={isAr ? "نشر البرنامج فوراً في الكتالوج" : "Publish Program"}
                  icon={<CheckCircleIcon size={16} />}
                  onClick={() => handlePublish(p)}
                />
                <IconButton
                  variant="danger"
                  size="md"
                  title={isAr ? "طلب تعديلات من المرشد" : "Request Changes"}
                  icon={<EditIcon size={16} />}
                  onClick={() => handleRequestChanges(p)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Program Details Modal */}
      <Modal
        isOpen={!!selectedProg}
        onClose={() => setSelectedProg(null)}
        title={selectedProg?.title}
        subtitle={selectedProg ? `${selectedProg.guide} • ${selectedProg.city}` : ""}
        maxWidth="580px"
      >
        {selectedProg && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ fontSize: "13px" }}>
              <h4 style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>{isAr ? "الوصف الشامل للجولة:" : "Full Itinerary Description:"}</h4>
              <p style={{ lineHeight: 1.6, color: "var(--color-text-primary)" }}>{selectedProg.description}</p>
              <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 800, color: "#10B981" }}>
                <span>{isAr ? `سعر الشخص: ${selectedProg.price}` : `Price: ${selectedProg.price}`}</span>
                <span>{isAr ? `المدة: ${selectedProg.duration}` : `Duration: ${selectedProg.duration}`}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "8px" }}>
              <Button variant="primary" size="md" onClick={() => handlePublish(selectedProg)}>
                {isAr ? "نشر البرنامج على المنصة 🚀" : "Publish Program"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleRequestChanges(selectedProg)}>
                {isAr ? "طلب تعديلات" : "Request Changes"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProg(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
