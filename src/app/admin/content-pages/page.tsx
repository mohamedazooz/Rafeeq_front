"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  FileTextIcon,
  EditIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface ContentPageItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  isPublished: boolean;
  updatedAt: string;
}

const INITIAL_PAGES: ContentPageItem[] = [
  {
    id: "cp-1",
    slug: "terms-and-conditions",
    titleAr: "الشروط والأحكام العامة",
    titleEn: "Terms and Conditions",
    bodyAr: "شروط الخدمة والالتزام بحساب الضمان (Escrow) وضوابط الحجز والإلغاء لمنصة رفيق السياحية...",
    bodyEn: "General Terms of Service and Escrow policy for Rafeeq tourism platform...",
    isPublished: true,
    updatedAt: "2026-08-01",
  },
  {
    id: "cp-2",
    slug: "privacy-policy",
    titleAr: "سياسة الخصوصية وحماية البيانات",
    titleEn: "Privacy Policy",
    bodyAr: "التزام منصة رفيق بحماية بيانات الحسابات، الوثائق الوطنية وتشفير الهويات وسجلات المعاملات...",
    bodyEn: "Rafeeq's commitment to PHI/PII data security and transaction encryption...",
    isPublished: true,
    updatedAt: "2026-08-05",
  },
  {
    id: "cp-3",
    slug: "about-us",
    titleAr: "عن منصة رفيق والسياحة المحلية",
    titleEn: "About Rafeeq",
    bodyAr: "منصة رفيق هي البوابة الأولى لتمكين أبطال السياحة المحلية والمستكشفين بالمملكة العربية السعودية...",
    bodyEn: "Rafeeq is the premier platform empowering local Saudi tour heroes and explorers...",
    isPublished: true,
    updatedAt: "2026-07-20",
  },
];

export default function AdminContentPagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [pages, setPages] = useState<ContentPageItem[]>(INITIAL_PAGES);
  const [selectedPage, setSelectedPage] = useState<ContentPageItem | null>(null);
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editBodyAr, setEditBodyAr] = useState("");
  const [editBodyEn, setEditBodyEn] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenEdit = (page: ContentPageItem) => {
    setSelectedPage(page);
    setEditTitleAr(page.titleAr);
    setEditTitleEn(page.titleEn);
    setEditBodyAr(page.bodyAr);
    setEditBodyEn(page.bodyEn);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;

    setPages((prev) =>
      prev.map((p) =>
        p.id === selectedPage.id
          ? {
              ...p,
              titleAr: editTitleAr,
              titleEn: editTitleEn,
              bodyAr: editBodyAr,
              bodyEn: editBodyEn,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : p
      )
    );

    dispatchDualActionNotification({
      title: `تحديث محتوى الصفحة القانونية / التعريفية: ${editTitleAr}`,
      message: `تم حفظ وتطبيق التعديلات الجديدة على صفحة (${editTitleAr} - /${selectedPage.slug}).`,
      actionType: "UPDATE",
      targetEmail: "content@rafeeq.sa",
      targetName: "فريق المحتوى والامتثال",
      targetRole: "Admin",
    });

    showToast(isAr ? `تم حفظ وتأكيد تعديلات الصفحة (${editTitleAr}) بنجاح! 📜` : `Content page updated.`);
    setSelectedPage(null);
  };

  const togglePublishStatus = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
    showToast(isAr ? "تم تحديث حالة نشر الصفحة العامة بنجاح! ✓" : "Publish status toggled.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <FileTextIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "نظام إدارة المحتوى والصفحات القانونية CMS" : "Static Content Pages & Legal CMS"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "إدارة الصفحات الثابتة والقانونية 📜" : "Content Management (CMS)"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "تحرير وتحديث نصوص الشروط والأحكام، سياسة الخصوصية وحماية البيانات، والصفحات التعريفية باللغتين." : "Manage legal terms, privacy policies, and informative pages in Arabic and English."}
        </p>
      </div>

      {/* Pages Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "عنوان الصفحة" : "Page Title"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الرابط (Slug)" : "Slug"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "حالة النشر" : "Status"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "آخر تحديث" : "Last Modified"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "التحكم والتحرير" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{p.titleAr}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{p.titleEn}</div>
                </td>

                <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "var(--color-gold-heading)", direction: "ltr", textAlign: "start" }}>
                  /{p.slug}
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: p.isPublished ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: p.isPublished ? "#10B981" : "#EF4444",
                    }}
                  >
                    {p.isPublished ? (isAr ? "منشورة ومتاحة ✓" : "Published") : (isAr ? "مسودة غير معروضة ✕" : "Draft")}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{p.updatedAt}</td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    <IconButton
                      variant="gold"
                      size="sm"
                      title={isAr ? "تحرير محتوى الصفحة" : "Edit Page"}
                      icon={<EditIcon size={15} />}
                      onClick={() => handleOpenEdit(p)}
                    />
                    <IconButton
                      variant={p.isPublished ? "danger" : "secondary"}
                      size="sm"
                      title={p.isPublished ? (isAr ? "إلغاء النشر" : "Unpublish") : (isAr ? "نشر الصفحة" : "Publish")}
                      icon={p.isPublished ? <XCircleIcon size={15} /> : <CheckCircleIcon size={15} />}
                      onClick={() => togglePublishStatus(p.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Page Modal */}
      <Modal
        isOpen={!!selectedPage}
        onClose={() => setSelectedPage(null)}
        title={selectedPage ? (isAr ? `تحرير: ${selectedPage.titleAr}` : `Edit: ${selectedPage.titleEn}`) : ""}
        subtitle={selectedPage ? `/${selectedPage.slug}` : ""}
        maxWidth="640px"
      >
        {selectedPage && (
          <form onSubmit={handleSavePage}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "العنوان بالعربية" : "Arabic Title"}</label>
                  <input type="text" required value={editTitleAr} onChange={(e) => setEditTitleAr(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "العنوان بالإنجليزية" : "English Title"}</label>
                  <input type="text" required value={editTitleEn} onChange={(e) => setEditTitleEn(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "المحتوى والفقرات (باللغة العربية)" : "Arabic Content"}</label>
                <textarea rows={5} required value={editBodyAr} onChange={(e) => setEditBodyAr(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px", lineHeight: 1.6 }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "المحتوى والفقرات (باللغة الإنجليزية)" : "English Content"}</label>
                <textarea rows={4} required value={editBodyEn} onChange={(e) => setEditBodyEn(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px", lineHeight: 1.6, direction: "ltr" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="ghost" size="md" type="button" onClick={() => setSelectedPage(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
              <Button variant="primary" size="md" type="submit">{isAr ? "حفظ التعديلات والنشر 📜" : "Save Changes"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
