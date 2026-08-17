"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Applicant {
  id: string;
  name: string;
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
    nationalId: "1098234120",
    licenseNo: "TL-992014",
    city: "الرياض",
    date: "2026-08-16",
    docs: [
      { title: "بطاقة الهوية الوطنية", status: "مكتملة المراجعة ✓" },
      { title: "رخصة ممارسة الإرشاد السياحي (وزارة السياحة)", status: "سارية المفعول ✓" },
      { title: "شهادة الإسعافات الأولية", status: "معتمدة ✓" },
    ],
  },
  {
    id: "app-2",
    name: "منى علي القحطاني",
    nationalId: "1087123901",
    licenseNo: "TL-884019",
    city: "أبها",
    date: "2026-08-15",
    docs: [
      { title: "بطاقة الهوية الوطنية", status: "مكتملة المراجعة ✓" },
      { title: "رخصة الإرشاد السياحي", status: "سارية المفعول ✓" },
    ],
  },
];

export default function AdminGuidesApprovalPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApp, setSelectedApp] = useState<Applicant | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleApprove = (id: string, name: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
    setSelectedApp(null);
    showToast(`تم اعتماد وتوثيق حساب المرشد الرسمي (${name}) بنجاح! 🎉`);
  };

  const handleReject = (id: string, name: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
    setSelectedApp(null);
    showToast(`تم رفض طلب الاعتماد للمقدم (${name}) وإرسال إشعار التعديل.`);
  };

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>اعتماد وتدقيق المرشدين 📄</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>مراجعة الهوية الوطنية ورخصة وزارة السياحة لاعتماد حساب المرشد بالمنصة</p>

      {applicants.length === 0 ? (
        <div className="glass" style={{ padding: "var(--space-8)", textAlign: "center", borderRadius: "var(--radius-2xl)", color: "var(--color-text-muted)" }}>
          <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>لا توجد طلبات معلقة الآن 🎉</h3>
          <p>جميع طلبات الاعتماد المقدمة تم البت فيها ومراجعتها بالكامل.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {applicants.map((app) => (
            <div key={app.id} className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>{app.name}</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "var(--space-1)" }}>
                  المدينة: {app.city} • الهوية الوطنية: {app.nationalId} • رقم رخصة السياحة: {app.licenseNo} • تاريخ التقديم: {app.date}
                </p>
              </div>

              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                  معاينة الوثائق 👁️
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleApprove(app.id, app.name)}>
                  اعتماد الحساب ✓
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleReject(app.id, app.name)}>
                  رفض ✕
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Documents Inspection Modal */}
      {selectedApp && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "var(--space-4)" }}>
          <div className="glass" style={{ width: "520px", background: "var(--color-midnight-blue)", padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-2)" }}>وثائق المتقدم: {selectedApp.name}</h3>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>
              رخصة وزارة السياحة رقم {selectedApp.licenseNo} • مدينة {selectedApp.city}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
              {selectedApp.docs.map((d, i) => (
                <div key={i} style={{ padding: "var(--space-4)", background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 700 }}>{d.title}</span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-saudi-green)", fontWeight: 700 }}>{d.status}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <Button variant="secondary" size="md" onClick={() => handleApprove(selectedApp.id, selectedApp.name)}>
                تأكيد الاعتماد المباشر ✓
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
