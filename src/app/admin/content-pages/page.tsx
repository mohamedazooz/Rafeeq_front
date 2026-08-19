"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useLanguage } from "@/lib/language-provider";
import {
  FileTextIcon,
  EditIcon,
  CheckCircleIcon,
  LayersIcon,
  GlobeIcon,
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
    titleAr: "الشروط والأحكام العامة للخدمة",
    titleEn: "Terms and Conditions",
    bodyAr: "شروط الخدمة والالتزام بحساب الضمان (Escrow) وضوابط الحجز والإلغاء لمنصة رفيق السياحية بالمملكة العربية السعودية...",
    bodyEn: "General Terms of Service and Escrow policy for Rafeeq tourism platform...",
    isPublished: true,
    updatedAt: "2026-08-01",
  },
  {
    id: "cp-2",
    slug: "privacy-policy",
    titleAr: "سياسة الخصوصية وحماية البيانات",
    titleEn: "Privacy Policy",
    bodyAr: "التزام منصة رفيق بحماية بيانات الحسابات، الوثائق الوطنية وتشفير الهويات وسجلات المعاملات المالية...",
    bodyEn: "Rafeeq's commitment to PHI/PII data security and transaction encryption...",
    isPublished: true,
    updatedAt: "2026-08-05",
  },
  {
    id: "cp-3",
    slug: "about-us",
    titleAr: "عن منصة رفيق والسياحة السعودية",
    titleEn: "About Rafeeq",
    bodyAr: "منصة رفيق هي البوابة الأولى لتمكين أبطال السياحة المحلية والمستكشفين بالمملكة العربية السعودية وفق رؤية 2030...",
    bodyEn: "Rafeeq is the premier platform empowering local Saudi tour heroes and explorers...",
    isPublished: true,
    updatedAt: "2026-07-20",
  },
  {
    id: "cp-4",
    slug: "faq",
    titleAr: "الأسئلة الشائعة وإرشادات المسافر",
    titleEn: "Frequently Asked Questions",
    bodyAr: "إجابات مفصلة حول كيفية الحجز والدفع المحمي بالضمان وسياسة الإلغاء والتواصل مع المرشدين...",
    bodyEn: "Detailed answers on how to book, pay securely with escrow, and contact tour guides...",
    isPublished: true,
    updatedAt: "2026-08-10",
  },
];

export default function AdminContentPagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [activeTab, setActiveTab] = useState<"pages" | "landing_cms">("landing_cms");
  const [pages, setPages] = useState<ContentPageItem[]>(INITIAL_PAGES);
  const [selectedPage, setSelectedPage] = useState<ContentPageItem | null>(null);

  // Edit Page Form State
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editBodyAr, setEditBodyAr] = useState("");
  const [editBodyEn, setEditBodyEn] = useState("");

  // Landing Page CMS Form State
  const [heroTitle, setHeroTitle] = useState("اكتشف سحر المملكة مع أفضل المرشدين السياحيين المرخصين");
  const [heroSubtitle, setHeroSubtitle] = useState("رحلات سياحية خاصة وتجارب أصيلة في العلا، الدرعية، عسير، والأحساء بحماية الضمان المالي Escrow");
  const [statsTravelers, setStatsTravelers] = useState("15,000+ مسافر");
  const [statsGuides, setStatsGuides] = useState("850+ مرشد مرخص");
  const [statsTours, setStatsTours] = useState("1,200+ جولة");
  const [statsRating, setStatsRating] = useState("4.95 ⭐ تقييم عام");
  const [bannerTitle, setBannerTitle] = useState("تراث حي وأصالة لا تُنسى في قلب الجزيرة العربية");
  const [bannerSubtitle, setBannerSubtitle] = useState("برامج استكشافية متكاملة مصممة لنقل القصة الحقيقية لتاريخ وثقافة المملكة");

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

    setSelectedPage(null);
    showToast(isAr ? "تم حفظ وتحديث محتوى الصفحة بنجاح! 📄✓" : "Content page updated.");
  };

  const handleSaveLandingCms = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isAr ? "تم حفظ ونشر تحديثات محتوى الصفحة الرئيسية (Landing Page) بنجاح! 🌐✓" : "Landing CMS published.");
  };

  const pageColumns: DataTableColumn<ContentPageItem>[] = [
    {
      key: "title",
      headerAr: "عنوان الصفحة والمسار",
      headerEn: "Page Title & Slug",
      render: (row) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FileTextIcon size={16} color="var(--color-gold-heading)" />
            <span style={{ fontWeight: 800, fontSize: "13px" }}>{row.titleAr}</span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.titleEn} • /pages/{row.slug}</span>
        </div>
      ),
    },
    {
      key: "status",
      headerAr: "حالة النشر",
      headerEn: "Status",
      render: (row) => (
        <span style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10B981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>
          {row.isPublished ? "منشورة ومحدثة ✓" : "مسودة"}
        </span>
      ),
    },
    {
      key: "updatedAt",
      headerAr: "آخر تعديل",
      headerEn: "Last Updated",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.updatedAt}</span>,
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(row)}>
          <EditIcon size={14} />
          <span>تعديل المحتوى</span>
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            color: "var(--color-text-primary)",
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          إدارة المحتوى واللاندينج (Landing CMS & Pages) 🌐
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          التحكم الكامل بنصوص وصور وبانرات الصفحة الرئيسية، وإدارة صفحات الشروط والسياسات العامة
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("landing_cms")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            fontWeight: 800,
            color: activeTab === "landing_cms" ? "var(--color-gold-heading)" : "var(--color-text-muted)",
            borderBottom: activeTab === "landing_cms" ? "2px solid var(--color-gold-heading)" : "none",
            paddingBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <GlobeIcon size={16} />
          <span>التحكم في اللاندينج (Landing CMS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pages")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            fontWeight: 800,
            color: activeTab === "pages" ? "var(--color-gold-heading)" : "var(--color-text-muted)",
            borderBottom: activeTab === "pages" ? "2px solid var(--color-gold-heading)" : "none",
            paddingBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FileTextIcon size={16} />
          <span>صفحات السياسات والشروط ({pages.length})</span>
        </button>
      </div>

      {/* Landing Page CMS Tab */}
      {activeTab === "landing_cms" && (
        <form onSubmit={handleSaveLandingCms} style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "950px" }}>
          {/* Hero Section Box */}
          <div
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-2xl)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--color-gold-heading)" }}>
              1. الواجهة الرئيسية والبانر الترحيبي (Hero Section)
            </h3>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>العنوان الرئيسي (Hero Title)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "14px", fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>العنوان الفرعي والوصف (Hero Subtitle)</label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={2}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Stats Counters Box */}
          <div
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-2xl)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--color-gold-heading)" }}>
              2. أرقام وإحصائيات المنصة البارزة (Stats Highlights)
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>المسافرون</label>
                <input
                  type="text"
                  value={statsTravelers}
                  onChange={(e) => setStatsTravelers(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "12px", fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>المرشدون المرخصون</label>
                <input
                  type="text"
                  value={statsGuides}
                  onChange={(e) => setStatsGuides(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "12px", fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>الجولات السياحية</label>
                <input
                  type="text"
                  value={statsTours}
                  onChange={(e) => setStatsTours(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "12px", fontWeight: 800 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>التقييم العام</label>
                <input
                  type="text"
                  value={statsRating}
                  onChange={(e) => setStatsRating(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "12px", fontWeight: 800 }}
                />
              </div>
            </div>
          </div>

          {/* Heritage Banner Box */}
          <div
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-2xl)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--color-gold-heading)" }}>
              3. بانر التراث والأصالة السعودية (Heritage Banner)
            </h3>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>عنوان البانر</label>
              <input
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>نص البانر</label>
              <input
                type="text"
                value={bannerSubtitle}
                onChange={(e) => setBannerSubtitle(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" size="lg" type="submit">
              <ShieldCheckIcon size={18} />
              <span>نشر وحفظ تعديلات اللاندينج 🌐✓</span>
            </Button>
          </div>
        </form>
      )}

      {/* Policies & Pages Tab */}
      {activeTab === "pages" && (
        <DataTable
          data={pages}
          columns={pageColumns}
          searchPlaceholder="بحث في صفحات الشروط والمحتوى..."
          searchFilter={(row, query) =>
            row.titleAr.toLowerCase().includes(query) ||
            row.slug.toLowerCase().includes(query) ||
            row.titleEn.toLowerCase().includes(query)
          }
        />
      )}

      {/* Modal: Edit Content Page */}
      <Modal isOpen={Boolean(selectedPage)} onClose={() => setSelectedPage(null)} title="تعديل محتوى الصفحة والسياسة" maxWidth="750px">
        <form onSubmit={handleSavePage} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>العنوان بالعربية</label>
              <input
                type="text"
                value={editTitleAr}
                onChange={(e) => setEditTitleAr(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>العنوان بالإنجليزية</label>
              <input
                type="text"
                value={editTitleEn}
                onChange={(e) => setEditTitleEn(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>نص المحتوى بالعربية</label>
            <textarea
              value={editBodyAr}
              onChange={(e) => setEditBodyAr(e.target.value)}
              rows={8}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", lineHeight: "1.6" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setSelectedPage(null)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">حفظ ونشر التعديل</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
