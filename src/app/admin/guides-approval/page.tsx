"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  ShieldCheckIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileTextIcon,
  CompassIcon,
} from "@/components/icons";

interface Applicant {
  id: string;
  name: string;
  email: string;
  nationalId: string;
  licenseNo: string;
  city: string;
  date: string;
  docs: { title: string; status: string }[];
}

const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: "app-1",
    name: "سعود فهد الدوسري",
    email: "saud.aldosari@example.com",
    nationalId: "1098234120",
    licenseNo: "TG-992014",
    city: "الرياض",
    date: "2026-08-16",
    docs: [
      { title: "بطاقة الهوية الوطنية السعودية", status: "مكتملة المراجعة ✓" },
      { title: "رخصة ممارسة الإرشاد السياحي (وزارة السياحة TG)", status: "سارية المفعول ✓" },
      { title: "شهادة الإسعافات الأولية المعتمدة", status: "معتمدة ✓" },
    ],
  },
  {
    id: "app-2",
    name: "منى علي القحطاني",
    email: "mona.qahtani@example.com",
    nationalId: "1087123901",
    licenseNo: "TG-884019",
    city: "أبها وعسير",
    date: "2026-08-15",
    docs: [
      { title: "بطاقة الهوية الوطنية", status: "مكتملة المراجعة ✓" },
      { title: "رخصة الإرشاد السياحي TG", status: "سارية المفعول ✓" },
    ],
  },
];

export default function AdminGuidesApprovalPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApp, setSelectedApp] = useState<Applicant | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleApprove = (app: Applicant) => {
    setApplicants((prev) => prev.filter((a) => a.id !== app.id));
    setSelectedApp(null);

    dispatchDualActionNotification({
      title: "اعتماد وتفعيل حساب المرشد السياحي",
      message: `تهانينا! تم تدقيق واعتماد رخصة وزارة السياحة (${app.licenseNo}) بنجاح. حسابك نشط الآن ويمكنك نشر برامجك.`,
      actionType: "APPROVE",
      targetEmail: app.email,
      targetName: app.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم اعتماد وتوثيق حساب المرشد (${app.name}) وإرسال إشعار وبريد الترحيب!` : `Guide approved successfully.`);
  };

  const handleReject = (app: Applicant) => {
    setApplicants((prev) => prev.filter((a) => a.id !== app.id));
    setSelectedApp(null);

    dispatchDualActionNotification({
      title: "طلب تعديل وثائق ترخيص الإرشاد السياحي",
      message: `يرجى إعادة إرفاق نسخة واضحة وسارية من رخصة الإرشاد السياحي أو الهوية الوطنية.`,
      actionType: "REJECT",
      targetEmail: app.email,
      targetName: app.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم إرسال إشعار التعديل لبريد المرشد (${app.name}).` : `Rejection notification sent.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <ShieldCheckIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "طابور اعتماد وتدقيق المرشدين الجدد" : "Guide Verification Queue"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "اعتماد وتوثيق تراخيص المرشدين 📄" : "Guide License Verifications"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "فحص الهوية الوطنية ومطابقة ترخيص وزارة السياحة (TG) لاعتماد ملف المرشد وتفعيل صلاحيات نشر البرامج." : "Verify Ministry of Tourism licenses (TG) and national IDs to activate guide privileges."}
        </p>
      </div>

      {/* List */}
      {applicants.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", borderRadius: "20px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircleIcon size={32} color="#10B981" />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            {isAr ? "لا توجد طلبات معلقة الآن" : "All Applications Reviewed"}
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
            {isAr ? "جميع طلبات الاعتماد المقدمة تم البت فيها ومراجعتها بالكامل." : "All pending guide applications have been processed."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {applicants.map((app) => (
            <div key={app.id} style={{ padding: "20px 24px", borderRadius: "18px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CompassIcon size={18} color="var(--color-gold-heading)" />
                  <h3 style={{ fontSize: "16px", fontWeight: 900, color: "var(--color-text-primary)" }}>{app.name}</h3>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--color-gold-heading)", background: "var(--color-bg-secondary)", padding: "2px 8px", borderRadius: "6px", border: "1px solid var(--color-border)" }}>{app.licenseNo}</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "6px" }}>
                  {isAr ? `المدينة: ${app.city} • الهوية: ${app.nationalId} • تاريخ التقديم: ${app.date}` : `City: ${app.city} • ID: ${app.nationalId} • Submitted: ${app.date}`}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <IconButton
                  variant="gold"
                  size="md"
                  title={isAr ? "معاينة الوثائق والمستندات" : "Inspect Documents"}
                  icon={<EyeIcon size={16} />}
                  onClick={() => setSelectedApp(app)}
                />
                <IconButton
                  variant="success"
                  size="md"
                  title={isAr ? "اعتماد الحساب وتفعيل الترخيص" : "Approve License"}
                  icon={<CheckCircleIcon size={16} />}
                  onClick={() => handleApprove(app)}
                />
                <IconButton
                  variant="danger"
                  size="md"
                  title={isAr ? "رفض الطلب وطلب تعديل الوثائق" : "Reject Application"}
                  icon={<XCircleIcon size={16} />}
                  onClick={() => handleReject(app)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Documents Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? (isAr ? `وثائق المتقدم: ${selectedApp.name}` : `Applicant Documents: ${selectedApp.name}`) : ""}
        subtitle={selectedApp ? `${selectedApp.licenseNo} • ${selectedApp.city}` : ""}
        maxWidth="540px"
      >
        {selectedApp && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {selectedApp.docs.map((d, i) => (
                <div key={i} className="rafeeq-modal-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileTextIcon size={16} color="var(--color-gold-heading)" />
                    <span style={{ fontSize: "13px", fontWeight: 700 }}>{d.title}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 800 }}>{d.status}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "8px" }}>
              <Button variant="primary" size="md" onClick={() => handleApprove(selectedApp)}>
                {isAr ? "تأكيد الاعتماد المباشر ✓" : "Confirm Direct Approval"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
