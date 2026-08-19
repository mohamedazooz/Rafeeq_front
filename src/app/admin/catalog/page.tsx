"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useLanguage } from "@/lib/language-provider";
import {
  FolderIcon,
  MapPinIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  LayersIcon,
} from "@/components/icons";

interface CategoryItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  programsCount: number;
  sortOrder: number;
  isActive: boolean;
}

interface DestinationItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  programsCount: number;
  sortOrder: number;
  isActive: boolean;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: "c-1", slug: "hiking-adventure", nameAr: "مغامرات الهايكنج والجبال", nameEn: "Hiking & Adventure", descriptionAr: "رحلات صعود القمم، واستكشاف الأودية والصخور التراثية في المملكة.", programsCount: 14, sortOrder: 1, isActive: true },
  { id: "c-2", slug: "cultural-heritage", nameAr: "التراث والآثار التاريخية", nameEn: "Cultural & Heritage", descriptionAr: "جولات المواقع الأثرية، التراث العالمي اليونسكو، والمتاحف الحية.", programsCount: 22, sortOrder: 2, isActive: true },
  { id: "c-3", slug: "marine-diving", nameAr: "الأنشطة البحرية والغوص", nameEn: "Marine & Diving", descriptionAr: "استكشاف الشعاب المرجانية الحية ورحلات الجزر وسواحل البحر الأحمر.", programsCount: 9, sortOrder: 3, isActive: true },
  { id: "c-4", slug: "desert-camping", nameAr: "التخييم وتأمل النجوم في الصحراء", nameEn: "Desert Camping", descriptionAr: "تجارب سهرات الصحراء، الفلك والتأمل تحت السماء المفتوحة.", programsCount: 18, sortOrder: 4, isActive: true },
];

const INITIAL_DESTINATIONS: DestinationItem[] = [
  { id: "d-1", slug: "alula", nameAr: "العلا ومداين صالح", nameEn: "AlUla", regionAr: "المنطقة الشمالية الغربية", programsCount: 28, sortOrder: 1, isActive: true },
  { id: "d-2", slug: "diriyah-riyadh", nameAr: "الدرعية التاريخية والرياض", nameEn: "Diriyah & Riyadh", regionAr: "منطقة نجد والوسطى", programsCount: 42, sortOrder: 2, isActive: true },
  { id: "d-3", slug: "al-ahsa", nameAr: "واحة الأحساء", nameEn: "Al Ahsa Oasis", regionAr: "المنطقة الشرقية", programsCount: 16, sortOrder: 3, isActive: true },
  { id: "d-4", slug: "asir-abha", nameAr: "عسير والسودة وأبها", nameEn: "Asir & Abha", regionAr: "المنطقة الجنوبية", programsCount: 19, sortOrder: 4, isActive: true },
  { id: "d-5", slug: "historic-jeddah", nameAr: "جدة التاريخية (البلد)", nameEn: "Historic Jeddah", regionAr: "المنطقة الغربية", programsCount: 25, sortOrder: 5, isActive: true },
];

export default function AdminCatalogPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [activeTab, setActiveTab] = useState<"categories" | "destinations">("categories");
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [destinations, setDestinations] = useState<DestinationItem[]>(INITIAL_DESTINATIONS);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  // New Category Form State
  const [catNameAr, setCatNameAr] = useState("");
  const [catNameEn, setCatNameEn] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");

  // New Destination Form State
  const [destNameAr, setDestNameAr] = useState("");
  const [destNameEn, setDestNameEn] = useState("");
  const [destSlug, setDestSlug] = useState("");
  const [destRegion, setDestRegion] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast(isAr ? "تم تحديث حالة القسم بنجاح." : "Category status updated.");
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(isAr ? "تم حذف القسم من الكتالوج." : "Category deleted.");
  };

  const toggleDestinationStatus = (id: string) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
    showToast(isAr ? "تم تحديث حالة الوجهة بنجاح." : "Destination status updated.");
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    showToast(isAr ? "تم حذف الوجهة من الكتالوج." : "Destination deleted.");
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameAr.trim()) return;

    const newCat: CategoryItem = {
      id: `c-${Date.now()}`,
      slug: catSlug || catNameEn.toLowerCase().replace(/\s+/g, "-") || `cat-${Date.now()}`,
      nameAr: catNameAr,
      nameEn: catNameEn || catNameAr,
      descriptionAr: catDesc,
      programsCount: 0,
      sortOrder: categories.length + 1,
      isActive: true,
    };

    setCategories([...categories, newCat]);
    setShowCategoryModal(false);
    setCatNameAr("");
    setCatNameEn("");
    setCatSlug("");
    setCatDesc("");
    showToast(isAr ? "تمت إضافة القسم السياحي الجديد بنجاح." : "Category created.");
  };

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destNameAr.trim()) return;

    const newDest: DestinationItem = {
      id: `d-${Date.now()}`,
      slug: destSlug || destNameEn.toLowerCase().replace(/\s+/g, "-") || `dest-${Date.now()}`,
      nameAr: destNameAr,
      nameEn: destNameEn || destNameAr,
      regionAr: destRegion || "المملكة العربية السعودية",
      programsCount: 0,
      sortOrder: destinations.length + 1,
      isActive: true,
    };

    setDestinations([...destinations, newDest]);
    setShowDestinationModal(false);
    setDestNameAr("");
    setDestNameEn("");
    setDestSlug("");
    setDestRegion("");
    showToast(isAr ? "تمت إضافة الوجهة السياحية الجديدة بنجاح." : "Destination created.");
  };

  const categoryColumns: DataTableColumn<CategoryItem>[] = [
    {
      key: "name",
      headerAr: "اسم القسم السياحي",
      headerEn: "Category Name",
      render: (row) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FolderIcon size={16} color="var(--color-gold-heading)" />
            <span style={{ fontWeight: 800, fontSize: "13px" }}>{row.nameAr}</span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.nameEn} • /{row.slug}</span>
        </div>
      ),
    },
    {
      key: "desc",
      headerAr: "الوصف",
      headerEn: "Description",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.descriptionAr}</span>,
    },
    {
      key: "programs",
      headerAr: "البرامج النشطة",
      headerEn: "Active Tours",
      render: (row) => (
        <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)" }}>
          {row.programsCount} برنامج
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الظهور",
      headerEn: "Visibility",
      render: (row) => (
        <span
          style={{
            background: row.isActive ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
            color: row.isActive ? "#10B981" : "#EF4444",
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.isActive ? "ظاهر بالكتالوج" : "مخفي"}
        </span>
      ),
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Button variant={row.isActive ? "outline" : "primary"} size="sm" onClick={() => toggleCategoryStatus(row.id)}>
            <span>{row.isActive ? "إخفاء" : "إظهار"}</span>
          </Button>
          <IconButton icon={<TrashIcon size={14} />} title="حذف" size="sm" variant="ghost" onClick={() => deleteCategory(row.id)} style={{ color: "#EF4444" }} />
        </div>
      ),
    },
  ];

  const destinationColumns: DataTableColumn<DestinationItem>[] = [
    {
      key: "name",
      headerAr: "اسم الوجهة السياحية",
      headerEn: "Destination",
      render: (row) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPinIcon size={16} color="var(--color-gold-heading)" />
            <span style={{ fontWeight: 800, fontSize: "13px" }}>{row.nameAr}</span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.nameEn} • /{row.slug}</span>
        </div>
      ),
    },
    {
      key: "region",
      headerAr: "المنطقة الجغرافية",
      headerEn: "Region",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.regionAr}</span>,
    },
    {
      key: "programs",
      headerAr: "البرامج والرحلات",
      headerEn: "Tour Count",
      render: (row) => (
        <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)" }}>
          {row.programsCount} رحلة
        </span>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الظهور",
      headerEn: "Visibility",
      render: (row) => (
        <span
          style={{
            background: row.isActive ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
            color: row.isActive ? "#10B981" : "#EF4444",
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.isActive ? "نشط بالكتالوج" : "مخفي"}
        </span>
      ),
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Button variant={row.isActive ? "outline" : "primary"} size="sm" onClick={() => toggleDestinationStatus(row.id)}>
            <span>{row.isActive ? "إخفاء" : "إظهار"}</span>
          </Button>
          <IconButton icon={<TrashIcon size={14} />} title="حذف" size="sm" variant="ghost" onClick={() => deleteDestination(row.id)} style={{ color: "#EF4444" }} />
        </div>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            الكتالوج والأقسام والوجهات السياحية
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            التحكم بهيكل تصنيف البرامج، الوجهات السياحية، وترتيب ظهورها في الصفحة الرئيسية والبحث
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {activeTab === "categories" ? (
            <Button variant="primary" size="md" onClick={() => setShowCategoryModal(true)}>
              <PlusIcon size={16} />
              <span>إضافة قسم سياحي جديد</span>
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={() => setShowDestinationModal(true)}>
              <PlusIcon size={16} />
              <span>إضافة وجهة سياحية جديدة</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            fontWeight: 800,
            color: activeTab === "categories" ? "var(--color-gold-heading)" : "var(--color-text-muted)",
            borderBottom: activeTab === "categories" ? "2px solid var(--color-gold-heading)" : "none",
            paddingBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LayersIcon size={16} />
          <span>الأقسام والتصنيفات ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("destinations")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
            fontWeight: 800,
            color: activeTab === "destinations" ? "var(--color-gold-heading)" : "var(--color-text-muted)",
            borderBottom: activeTab === "destinations" ? "2px solid var(--color-gold-heading)" : "none",
            paddingBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <MapPinIcon size={16} />
          <span>الوجهات والمناطق ({destinations.length})</span>
        </button>
      </div>

      {/* Content Table */}
      {activeTab === "categories" ? (
        <DataTable
          data={categories}
          columns={categoryColumns}
          searchPlaceholder="بحث في الأقسام والتصنيفات..."
          searchFilter={(row, query) =>
            row.nameAr.toLowerCase().includes(query) ||
            row.nameEn.toLowerCase().includes(query) ||
            row.descriptionAr.toLowerCase().includes(query)
          }
        />
      ) : (
        <DataTable
          data={destinations}
          columns={destinationColumns}
          searchPlaceholder="بحث في الوجهات والمناطق..."
          searchFilter={(row, query) =>
            row.nameAr.toLowerCase().includes(query) ||
            row.nameEn.toLowerCase().includes(query) ||
            row.regionAr.toLowerCase().includes(query)
          }
        />
      )}

      {/* Modal: Create Category */}
      <Modal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} title="إضافة قسم سياحي جديد" maxWidth="500px">
        <form onSubmit={handleCreateCategory} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالعربية</label>
            <input
              type="text"
              placeholder="مثال: السياحة الفلكية والصحراوية"
              value={catNameAr}
              onChange={(e) => setCatNameAr(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالإنجليزية</label>
            <input
              type="text"
              placeholder="e.g. Astro & Desert Tourism"
              value={catNameEn}
              onChange={(e) => setCatNameEn(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الوصف المختصر</label>
            <textarea
              placeholder="وصف القسم السياحي وما يتضمنه من أنشطة..."
              value={catDesc}
              onChange={(e) => setCatDesc(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowCategoryModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">إضافة وتفعيل القسم</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Destination */}
      <Modal isOpen={showDestinationModal} onClose={() => setShowDestinationModal(false)} title="إضافة وجهة سياحية جديدة" maxWidth="500px">
        <form onSubmit={handleCreateDestination} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>اسم الوجهة بالعربية</label>
            <input
              type="text"
              placeholder="مثال: حائل وجبال أجا وسلمى"
              value={destNameAr}
              onChange={(e) => setDestNameAr(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>اسم الوجهة بالإنجليزية</label>
            <input
              type="text"
              placeholder="e.g. Hail & Aja Mountains"
              value={destNameEn}
              onChange={(e) => setDestNameEn(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>المنطقة الإدارية</label>
            <input
              type="text"
              placeholder="مثال: منطقة حائل والشمال"
              value={destRegion}
              onChange={(e) => setDestRegion(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowDestinationModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">إضافة الوجهة وتفعيلها</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
