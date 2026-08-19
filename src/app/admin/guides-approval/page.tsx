"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  ShieldCheckIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  FileTextIcon,
  CompassIcon,
  UserIcon,
  CreditCardIcon,
} from "@/components/icons";

interface ApplicantDocument {
  title: string;
  titleEn: string;
  type: string;
  status: "verified" | "pending" | "rejected";
  expiryDate?: string;
  fileUrl?: string;
}

interface Applicant {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  licenseNo: string;
  licenseExpiry: string;
  city: string;
  date: string;
  specialties: string[];
  languages: string[];
  vehicle: string;
  iban: string;
  bankName: string;
  emergencyContact: string;
  docs: ApplicantDocument[];
}

const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: "app-1",
    code: "APP-TG-801",
    name: "سعود فهد الدوسري",
    email: "saud.aldosari@example.com",
    phone: "+966 50 123 4567",
    nationalId: "1098234120",
    licenseNo: "TG-992014",
    licenseExpiry: "2027-11-30",
    city: "الرياض",
    date: "2026-08-16",
    specialties: ["تراث وتاريخ", "مغامرات وهايكنج"],
    languages: ["العربية (Native)", "الإنجليزية (Fluent)"],
    vehicle: "نيسان باترول 2024 (4x4) مجهزة للصحراء",
    iban: "SA4480000456608010123456",
    bankName: "مصرف الراجحي",
    emergencyContact: "فهد الدوسري (الأب) — 0501112233",
    docs: [
      { title: "بطاقة الهوية الوطنية السعودية", titleEn: "Saudi National ID", type: "ID", status: "verified" },
      { title: "رخصة إرشاد سياحي معتمدة (وزارة السياحة)", titleEn: "MOT Tour Guide License (TG)", type: "License", status: "verified", expiryDate: "2027-11-30" },
      { title: "شهادة الإسعافات الأولية CPR المعتمدة", titleEn: "First Aid & CPR Certificate", type: "Cert", status: "verified" },
      { title: "صحيفة الحالة الجنائية (خلو سوابق)", titleEn: "Criminal Clearance Record", type: "Security", status: "verified" },
      { title: "استمارة وتأمين المركبة السياحية", titleEn: "Vehicle Registration & Insurance", type: "Vehicle", status: "verified" },
    ],
  },
  {
    id: "app-2",
    code: "APP-TG-802",
    name: "منى علي القحطاني",
    email: "mona.qahtani@example.com",
    phone: "+966 55 987 6543",
    nationalId: "1087123901",
    licenseNo: "TG-884019",
    licenseExpiry: "2028-04-15",
    city: "أبها وعسير",
    date: "2026-08-15",
    specialties: ["طبيعة وجبال", "طهي شعبي وتراث"],
    languages: ["العربية (Native)", "الإنجليزية (Fluent)", "الفرنسية (Intermediate)"],
    vehicle: "تويوتا لاندكروزر برادو 2023",
    iban: "SA1210000001234567890123",
    bankName: "البنك الأهلي السعودي (SNB)",
    emergencyContact: "علي القحطاني (الأب) — 0554443322",
    docs: [
      { title: "بطاقة الهوية الوطنية السعودية", titleEn: "Saudi National ID", type: "ID", status: "verified" },
      { title: "رخصة وزارة السياحة TG السارية", titleEn: "MOT Tour Guide License", type: "License", status: "verified", expiryDate: "2028-04-15" },
      { title: "شهادة الهلال الأحمر السعودي للإسعاف", titleEn: "Saudi Red Crescent First Aid", type: "Cert", status: "verified" },
      { title: "شهادة خلو السوابق الإلكترونية", titleEn: "Criminal Clearance Certificate", type: "Security", status: "verified" },
    ],
  },
];

export default function AdminGuidesApprovalPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { decrementGuidesQueue } = useDashboardMetrics();

  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApp, setSelectedApp] = useState<Applicant | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "docs" | "vehicle_bank">("overview");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleApprove = (app: Applicant) => {
    setApplicants((prev) => prev.filter((a) => a.id !== app.id));
    setSelectedApp(null);
    decrementGuidesQueue();

    dispatchDualActionNotification({
      title: isAr ? "اعتماد وتفعيل حساب المرشد السياحي" : "Guide License Approved",
      message: isAr
        ? `تهانينا! تم تدقيق واعتماد ترخيص وزارة السياحة (${app.licenseNo}) بنجاح. حسابك نشط الآن ويمكنك نشر برامجك السياحية.`
        : `Congratulations! Your MOT License (${app.licenseNo}) has been verified. Your guide account is now active.`,
      actionType: "APPROVE",
      targetEmail: app.email,
      targetName: app.name,
      targetRole: "Guide",
    });

    showToast(
      isAr
        ? `تم اعتماد ترخيص المرشد (${app.name}) بنجاح وتحديث السايد بار فورياً.`
        : `Guide (${app.name}) approved successfully.`
    );
  };

  const handleReject = (app: Applicant) => {
    setApplicants((prev) => prev.filter((a) => a.id !== app.id));
    setSelectedApp(null);
    decrementGuidesQueue();

    dispatchDualActionNotification({
      title: isAr ? "طلب إعادة رفع وتدقيق وثائق الترخيص" : "Document Resubmission Requested",
      message: isAr
        ? `يرجى إعادة إرفاق نسخة واضحة وسارية من رخصة الإرشاد السياحي أو شهادة الإسعافات الأولية.`
        : `Please upload a clear and valid copy of your MOT guide license or first aid certificate.`,
      actionType: "REJECT",
      targetEmail: app.email,
      targetName: app.name,
      targetRole: "Guide",
    });

    showToast(
      isAr
        ? `تم إرسال طلب استكمال الوثائق لبريد المرشد (${app.name}).`
        : `Resubmission notification sent to guide.`
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
          <ShieldCheckIcon size={14} color="var(--color-gold-heading)" />
          <span>{isAr ? "طابور اعتماد وتدقيق المرشدين الجدد" : "Guide Verification Queue"}</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "اعتماد وتوثيق تراخيص المرشدين" : "Guide License Verifications"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr
            ? "فحص ومطابقة تراخيص وزارة السياحة (TG)، شهادات الإسعافات، وصحيفة السوابق لاعتماد المرشد في المنصة."
            : "Verify Ministry of Tourism licenses (TG), first aid certs, and background checks to activate guide accounts."}
        </p>
      </div>

      {/* Table List */}
      {applicants.length === 0 ? (
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
            {isAr ? "كافة طلبات المرشدين مدققة ومعتمدة" : "All Guide Applications Audited"}
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}>
            {isAr
              ? "جميع طلبات الانضمام تم البت فيها وتدقيق رخص وزارة السياحة بالكامل."
              : "All submitted guide licenses have been audited."}
          </p>
        </div>
      ) : (
        <div className="rafeeq-table-wrapper">
          <table className="rafeeq-table">
            <thead>
              <tr>
                <th>{isAr ? "رقم الطلب" : "App Code"}</th>
                <th>{isAr ? "اسم المرشد السياحي" : "Guide Name"}</th>
                <th>{isAr ? "ترخيص وزارة السياحة (TG)" : "MOT License (TG)"}</th>
                <th>{isAr ? "المدينة والتغطية" : "City / Region"}</th>
                <th>{isAr ? "تاريخ التقديم" : "Submission Date"}</th>
                <th>{isAr ? "اكتمال الوثائق" : "Documents Dossier"}</th>
                <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 800, fontFamily: "monospace", color: "var(--color-gold-heading)" }}>
                    {app.code}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{app.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{app.email}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, fontFamily: "monospace", color: "var(--color-gold-heading)" }}>
                      {app.licenseNo}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                      {isAr ? `ينتهي: ${app.licenseExpiry}` : `Expires: ${app.licenseExpiry}`}
                    </div>
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
                      {app.city}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{app.date}</td>
                  <td>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "3px 8px",
                        borderRadius: "100px",
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "#10B981",
                        fontWeight: 800,
                      }}
                    >
                      {app.docs.length} {isAr ? "وثائق مكتملة" : "Docs Complete"}
                    </span>
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="rafeeq-action-btn"
                        title={isAr ? "فتح الملف الشامل 360°" : "Full 360° Dossier"}
                      >
                        <EyeIcon size={14} color="var(--color-gold-heading)" />
                        <span>{isAr ? "الملف الكامل" : "Dossier"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApprove(app)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          borderColor: "rgba(16, 185, 129, 0.3)",
                          color: "#10B981",
                        }}
                      >
                        <CheckCircleIcon size={14} color="#10B981" />
                        <span>{isAr ? "اعتماد" : "Approve"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReject(app)}
                        className="rafeeq-action-btn"
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          borderColor: "rgba(239, 68, 68, 0.25)",
                          color: "#EF4444",
                        }}
                      >
                        <XCircleIcon size={14} color="#EF4444" />
                        <span>{isAr ? "رفض / استكمال" : "Reject"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Guide 360° Comprehensive Dossier Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={isAr ? `الملف المهني الشامل للمرشد: ${selectedApp.name}` : `Guide Dossier: ${selectedApp.name}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "none",
                  background: activeTab === "overview" ? "var(--color-bg-secondary)" : "transparent",
                  color: activeTab === "overview" ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                }}
              >
                {isAr ? "البيانات والاعتماد" : "Overview & License"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("docs")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "none",
                  background: activeTab === "docs" ? "var(--color-bg-secondary)" : "transparent",
                  color: activeTab === "docs" ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                }}
              >
                {isAr ? "المستندات والشهادات الثبوتية" : "Verified Documents"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vehicle_bank")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "none",
                  background: activeTab === "vehicle_bank" ? "var(--color-bg-secondary)" : "transparent",
                  color: activeTab === "vehicle_bank" ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                }}
              >
                {isAr ? "المركبة والحساب البنكي" : "Vehicle & Banking"}
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    background: "var(--color-bg-secondary)",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الاسم الكامل:" : "Full Name:"}</span>
                    <p style={{ fontWeight: 800 }}>{selectedApp.name}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الهوية الوطنية:" : "National ID:"}</span>
                    <p style={{ fontWeight: 800, fontFamily: "monospace" }}>{selectedApp.nationalId}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رخصة الإرشاد (TG):" : "MOT License:"}</span>
                    <p style={{ fontWeight: 900, color: "var(--color-gold-heading)", fontFamily: "monospace" }}>{selectedApp.licenseNo}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تاريخ انتهاء الرخصة:" : "License Expiry:"}</span>
                    <p style={{ fontWeight: 800 }}>{selectedApp.licenseExpiry}</p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: "6px", color: "var(--color-gold-heading)" }}>
                    {isAr ? "التخصصات السياحية:" : "Specialties:"}
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedApp.specialties.map((s, i) => (
                      <span key={i} style={{ background: "var(--color-bg-secondary)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", border: "1px solid var(--color-border)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: "6px", color: "var(--color-gold-heading)" }}>
                    {isAr ? "لغات تقديم الجولات:" : "Spoken Tour Languages:"}
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedApp.languages.map((l, i) => (
                      <span key={i} style={{ background: "var(--color-bg-secondary)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", border: "1px solid var(--color-border)" }}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: "4px", color: "var(--color-gold-heading)" }}>
                    {isAr ? "جهة الطوارئ:" : "Emergency Contact:"}
                  </h4>
                  <p style={{ color: "var(--color-text-primary)" }}>{selectedApp.emergencyContact}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Docs */}
            {activeTab === "docs" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedApp.docs.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      background: "var(--color-bg-secondary)",
                      borderRadius: "10px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FileTextIcon size={18} color="var(--color-gold-heading)" />
                      <div>
                        <p style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? doc.title : doc.titleEn}</p>
                        {doc.expiryDate && (
                          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                            {isAr ? `تاريخ الصلاحية: ${doc.expiryDate}` : `Valid until: ${doc.expiryDate}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#10B981", background: "rgba(16, 185, 129, 0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                      ✓ {isAr ? "معتمد ومطابق" : "Verified"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Vehicle & Bank */}
            {activeTab === "vehicle_bank" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ padding: "14px", background: "var(--color-bg-secondary)", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
                  <h4 style={{ fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "4px" }}>
                    {isAr ? "بيانات وسيلة النقل الميدانية:" : "Transportation Fleet:"}
                  </h4>
                  <p style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>{selectedApp.vehicle}</p>
                </div>

                <div style={{ padding: "14px", background: "var(--color-bg-secondary)", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
                  <h4 style={{ fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "6px" }}>
                    {isAr ? "الحساب البنكي والآيبان السعودي لتحويل الأرباح:" : "Bank Account & SA IBAN:"}
                  </h4>
                  <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{selectedApp.bankName}</p>
                  <p style={{ fontFamily: "monospace", fontWeight: 900, color: "var(--color-text-primary)", fontSize: "14px", marginTop: "2px" }}>
                    {selectedApp.iban}
                  </p>
                </div>
              </div>
            )}

            {/* Footer Actions */}
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
              <Button variant="outline" onClick={() => handleReject(selectedApp)} style={{ borderColor: "#EF4444", color: "#EF4444" }}>
                {isAr ? "طلب إعادة رفع وثائق" : "Request Resubmission"}
              </Button>
              <Button variant="primary" onClick={() => handleApprove(selectedApp)}>
                {isAr ? "اعتماد وترخيص الحساب" : "Approve & License"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
