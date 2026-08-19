"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  FileTextIcon,
  EyeIcon,
  CheckCircleIcon,
  EditIcon,
  XCircleIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ClockIcon,
  FolderIcon,
} from "@/components/icons";

interface ProgramToReview {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  guide: string;
  guideEmail: string;
  price: string;
  imagesCount: number;
  duration: string;
  city: string;
  category: string;
  description: string;
  meetingPoint: string;
  inclusions: string[];
}

const INITIAL_PROGRAMS: ProgramToReview[] = [
  {
    id: "prog-1",
    code: "PRG-8812",
    title: "رحلة جبل القارة والواحة بالأحساء",
    titleEn: "Al-Qarah Mountain & Al-Ahsa Oasis Discovery",
    guide: "خالد الحربي",
    guideEmail: "khaled.harbi@example.com",
    price: "380 ر.س",
    imagesCount: 5,
    duration: "8 ساعات",
    city: "الأحساء",
    category: "تراث ومغامرة",
    description: "جولة استكشافية لكهوف جبل القارة الطبيعية وزيارة الواحة ومزارع النخيل مع وجبة غداء تراثية أحسائية ومشروبات باردة.",
    meetingPoint: "مركز زوار جبل القارة، الهفوف",
    inclusions: ["المرشد السياحي المرخص", "وجبة غداء شعبية", "رسوم دخول الكهوف", "المواصلات الداخلية"],
  },
  {
    id: "prog-2",
    code: "PRG-9941",
    title: "جولة الغوص واستكشاف شعب حقل البحرية",
    titleEn: "Haql Coral Reefs & Shipwreck Diving Expedition",
    guide: "ريم العلي",
    guideEmail: "reem.ali@example.com",
    price: "550 ر.س",
    imagesCount: 8,
    duration: "6 ساعات",
    city: "حقل / تبوك",
    category: "غوص وبحري",
    description: "رحلة غوص احترافية مع مرشد غوص معتمد لرؤية السفينة الغارقة والحيوانات البحرية النادرة في خليج العقبة.",
    meetingPoint: "مرسى حقل السياحي، منطقة تبوك",
    inclusions: ["معدات الغوص الكاملة", "مدرب غوص مرخص", "قارب بحري سريع", "تصوير تحت الماء"],
  },
];

export default function AdminProgramsReviewPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { decrementProgramsQueue } = useDashboardMetrics();

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
    decrementProgramsQueue();

    dispatchDualActionNotification({
      title: isAr ? "اعتماد ونشر البرنامج السياحي" : "Tour Program Published",
      message: isAr
        ? `تم اعتماد ونشر برنامجك (${prog.title}) في الكتالوج العام لمنصة رفيق وهو متاح للحجز الآن!`
        : `Your tour (${prog.titleEn}) has been verified and published to the public catalog.`,
      actionType: "APPROVE",
      targetEmail: prog.guideEmail,
      targetName: prog.guide,
      targetRole: "Guide",
    });

    showToast(
      isAr
        ? `تم اعتماد ونشر (${prog.title}) بنجاح وتحديث الكتالوج والسايد بار فورياً.`
        : `Program (${prog.titleEn}) approved and published successfully.`
    );
  };

  const handleRequestChanges = (prog: ProgramToReview) => {
    setPrograms((prev) => prev.filter((p) => p.id !== prog.id));
    setSelectedProg(null);
    decrementProgramsQueue();

    dispatchDualActionNotification({
      title: isAr ? "طلب تعديل وتحديث بيانات البرنامج السياحي" : "Changes Requested on Tour Program",
      message: isAr
        ? `يرجى مراجعة تفاصيل برنامجك (${prog.title}) وإضافة تفاصيل المحطات ومطابقة اشتراطات السلامة.`
        : `Please update your tour (${prog.titleEn}) with safety protocols and itinerary stops.`,
      actionType: "REJECT",
      targetEmail: prog.guideEmail,
      targetName: prog.guide,
      targetRole: "Guide",
    });

    showToast(
      isAr
        ? `تم إرسال طلب التعديل لبريد المرشد (${prog.guide}).`
        : `Changes requested from guide.`
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            color: "var(--color-text-primary)",
            padding: "14px 24px",
            borderRadius: "14px",
            boxShadow: "var(--shadow-xl)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircleIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(200, 169, 110, 0.15)",
            border: "1px solid rgba(200, 169, 110, 0.3)",
            padding: "4px 12px",
            borderRadius: "100px",
            color: "var(--color-gold-heading)",
            fontSize: "11px",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          <FileTextIcon size={14} color="var(--color-gold-heading)" />
          <span>{isAr ? "طابور مراجعة واعتماد البرامج السياحية" : "Tour Program Review Queue"}</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "مراجعة ونشر البرامج السياحية" : "Program Approvals & Publishing"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr
            ? "تدقيق جودة المحتوى، المحطات، المشتملات، ونقاط التجمع قبل إتاحة الحجز في الكتالوج العام."
            : "Audit itinerary details, inclusions, pricing, and meeting points before making tours bookable."}
        </p>
      </div>

      {/* Structured Data Table */}
      {programs.length === 0 ? (
        <div
          style={{
            padding: "48px",
            textAlign: "center",
            borderRadius: "18px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <CheckCircleIcon size={30} color="#10B981" />
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            {isAr ? "كافة البرامج معتمدة ومنشورة" : "All Programs Published"}
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
            {isAr
              ? "جميع البرامج المرفوعة من المرشدين تمت مراجعتها بنجاح ولا توجد طلبات معلقة."
              : "All pending programs have been audited and approved."}
          </p>
        </div>
      ) : (
        <div className="rafeeq-table-wrapper">
          <table className="rafeeq-table">
            <thead>
              <tr>
                <th>{isAr ? "رمز البرنامج" : "Tour Code"}</th>
                <th>{isAr ? "عنوان البرنامج السياحي" : "Program Title"}</th>
                <th>{isAr ? "المرشد المسؤول" : "Tour Guide"}</th>
                <th>{isAr ? "المدينة والتصنيف" : "City & Category"}</th>
                <th>{isAr ? "المدة والسعر" : "Duration & Price"}</th>
                <th>{isAr ? "الصور المرفقة" : "Photos"}</th>
                <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات والقرار" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 800, fontFamily: "monospace", color: "var(--color-gold-heading)" }}>
                    {p.code}
                  </td>
                  <td>
                    <div style={{ fontWeight: 900, color: "var(--color-text-primary)", fontSize: "13px" }}>
                      {isAr ? p.title : p.titleEn}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      {p.meetingPoint}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>{p.guide}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{p.guideEmail}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        fontWeight: 700,
                      }}
                    >
                      {p.city} • {p.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-gold-heading)" }}>{p.price}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{p.duration}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {p.imagesCount} {isAr ? "صور عالية الدقة" : "HQ Photos"}
                    </span>
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedProg(p)}
                        className="rafeeq-action-btn"
                        title={isAr ? "معاينة تفاصيل البرنامج" : "View Details"}
                      >
                        <EyeIcon size={14} color="var(--color-gold-heading)" />
                        <span>{isAr ? "معاينة" : "Review"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePublish(p)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          borderColor: "rgba(16, 185, 129, 0.3)",
                          color: "#10B981",
                        }}
                      >
                        <CheckCircleIcon size={14} color="#10B981" />
                        <span>{isAr ? "اعتماد ونشر" : "Publish"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRequestChanges(p)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          borderColor: "rgba(239, 68, 68, 0.25)",
                          color: "#EF4444",
                        }}
                      >
                        <XCircleIcon size={14} color="#EF4444" />
                        <span>{isAr ? "طلب تعديل" : "Request Edit"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Program Detailed Audit Modal */}
      {selectedProg && (
        <Modal
          isOpen={!!selectedProg}
          onClose={() => setSelectedProg(null)}
          title={isAr ? selectedProg.title : selectedProg.titleEn}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                background: "var(--color-bg-secondary)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--color-border)",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "المرشد:" : "Guide:"}</span>
                <p style={{ fontWeight: 800 }}>{selectedProg.guide}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "المدينة:" : "City:"}</span>
                <p style={{ fontWeight: 800 }}>{selectedProg.city}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "السعر للشخص:" : "Price/Person:"}</span>
                <p style={{ fontWeight: 900, color: "var(--color-gold-heading)" }}>{selectedProg.price}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "المدة:" : "Duration:"}</span>
                <p style={{ fontWeight: 800 }}>{selectedProg.duration}</p>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, marginBottom: "6px", color: "var(--color-gold-heading)" }}>
                {isAr ? "الوصف التفصيلي للجولة:" : "Tour Itinerary & Overview:"}
              </h4>
              <p style={{ lineHeight: 1.6, color: "var(--color-text-primary)" }}>{selectedProg.description}</p>
            </div>

            <div>
              <h4 style={{ fontWeight: 800, marginBottom: "6px", color: "var(--color-gold-heading)" }}>
                {isAr ? "مشتملات البرنامج السياحي:" : "Included Amenities:"}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedProg.inclusions.map((inc, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(16, 185, 129, 0.12)",
                      color: "#10B981",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    ✓ {inc}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                paddingTop: "16px",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <Button
                variant="outline"
                onClick={() => handleRequestChanges(selectedProg)}
                style={{ borderColor: "#EF4444", color: "#EF4444" }}
              >
                {isAr ? "طلب تعديلات من المرشد" : "Request Changes"}
              </Button>
              <Button variant="primary" onClick={() => handlePublish(selectedProg)}>
                {isAr ? "اعتماد ونشر في الكتالوج" : "Approve & Publish"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
