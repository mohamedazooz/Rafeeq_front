"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  FolderIcon,
  MapPinIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
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
  { id: "c-1", slug: "hiking-adventure", nameAr: "مغامرات الهايكنج والجبال", nameEn: "Hiking & Mountain Adventure", descriptionAr: "رحلات صعود القمم، واستكشاف الأودية والصخور التراثية في المملكة.", programsCount: 14, sortOrder: 1, isActive: true },
  { id: "c-2", slug: "cultural-heritage", nameAr: "التراث والآثار التاريخية", nameEn: "Cultural & Heritage", descriptionAr: "جولات المواقع الأثرية، التراث العالمي اليونسكو، والمتاحف الحية.", programsCount: 22, sortOrder: 2, isActive: true },
  { id: "c-3", slug: "marine-diving", nameAr: "الأنشطة البحرية والغوص", nameEn: "Marine & Red Sea Diving", descriptionAr: "استكشاف الشعاب المرجانية الحية ورحلات الجزر وسواحل البحر الأحمر.", programsCount: 9, sortOrder: 3, isActive: true },
  { id: "c-4", slug: "desert-camping", nameAr: "التخييم وتأمل النجوم في الصحراء", nameEn: "Desert Camping & Stargazing", descriptionAr: "تجارب سهرات الصحراء، الفلك والتأمل تحت السماء المفتوحة.", programsCount: 18, sortOrder: 4, isActive: true },
];

const INITIAL_DESTINATIONS: DestinationItem[] = [
  { id: "d-1", slug: "alula", nameAr: "العلا والأثلب", nameEn: "AlUla", regionAr: "المنطقة الشمالية الغربية", programsCount: 28, sortOrder: 1, isActive: true },
  { id: "d-2", slug: "diriyah-riyadh", nameAr: "الدرعية التاريخية والرياض", nameEn: "Diriyah & Riyadh", regionAr: "منطقة نجد والوسطى", programsCount: 42, sortOrder: 2, isActive: true },
  { id: "d-3", slug: "al-ahsa", nameAr: "واحة الأحساء وحاسبة", nameEn: "Al Ahsa Oasis", regionAr: "المنطقة الشرقية", programsCount: 16, sortOrder: 3, isActive: true },
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
    showToast(isAr ? "تم تحديث حالة القسم السياحي بنجاح! ✓" : "Category status updated.");
  };

  const toggleDestinationStatus = (id: string) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
    showToast(isAr ? "تم تحديث حالة الوجهة السياحية بنجاح! ✓" : "Destination status updated.");
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: CategoryItem = {
      id: `c-${Date.now()}`,
      slug: catSlug || catNameEn.toLowerCase().replace(/\s+/g, "-"),
      nameAr: catNameAr,
      nameEn: catNameEn,
      descriptionAr: catDesc || "قسم سياحي جديد مضاف للكتالوج.",
      programsCount: 0,
      sortOrder: categories.length + 1,
      isActive: true,
    };
    setCategories((prev) => [...prev, newCat]);
    setShowCategoryModal(false);
    setCatNameAr("");
    setCatNameEn("");
    setCatSlug("");
    setCatDesc("");

    dispatchDualActionNotification({
      title: "إضافة تصنيف سياحي جديد للكتالوج",
      message: `تم إنشاء التصنيف (${newCat.nameAr} - ${newCat.nameEn}) وإتاحته للمرشدين.`,
      actionType: "CREATE",
      targetEmail: "catalog@rafeeq.sa",
      targetName: "فريق الكتالوج السياحي",
      targetRole: "Admin",
    });

    showToast(isAr ? `تم إضافة القسم السياحي (${newCat.nameAr}) بنجاح!` : `Category created.`);
  };

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const newDest: DestinationItem = {
      id: `d-${Date.now()}`,
      slug: destSlug || destNameEn.toLowerCase().replace(/\s+/g, "-"),
      nameAr: destNameAr,
      nameEn: destNameEn,
      regionAr: destRegion || "المملكة العربية السعودية",
      programsCount: 0,
      sortOrder: destinations.length + 1,
      isActive: true,
    };
    setDestinations((prev) => [...prev, newDest]);
    setShowDestinationModal(false);
    setDestNameAr("");
    setDestNameEn("");
    setDestSlug("");
    setDestRegion("");

    dispatchDualActionNotification({
      title: "إضافة وجهة سياحية سعودية جديدة",
      message: `تم إضافة الوجهة (${newDest.nameAr} - ${newDest.nameEn}) لمنظومة الاستكشاف.`,
      actionType: "CREATE",
      targetEmail: "catalog@rafeeq.sa",
      targetName: "فريق الكتالوج السياحي",
      targetRole: "Admin",
    });

    showToast(isAr ? `تم إضافة الوجهة السياحية (${newDest.nameAr}) بنجاح!` : `Destination created.`);
  };

  const handleDeleteCategory = (cat: CategoryItem) => {
    if (confirm(isAr ? `حذف القسم (${cat.nameAr})؟` : `Delete category ${cat.nameAr}?`)) {
      setCategories(categories.filter((c) => c.id !== cat.id));
      showToast(isAr ? `تم حذف القسم (${cat.nameAr}) بنجاح.` : `Category deleted.`);
    }
  };

  const handleDeleteDestination = (dest: DestinationItem) => {
    if (confirm(isAr ? `حذف الوجهة (${dest.nameAr})؟` : `Delete destination ${dest.nameAr}?`)) {
      setDestinations(destinations.filter((d) => d.id !== dest.id));
      showToast(isAr ? `تم حذف الوجهة (${dest.nameAr}) بنجاح.` : `Destination deleted.`);
    }
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <FolderIcon size={14} color="var(--color-gold-heading)" />
            {isAr ? "كتالوج الوجهات والتصنيفات السياحية السعودية" : "Tourism Destinations & Categories Catalog"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "الكتالوج والوجهات والتصنيفات 🗂️" : "Tourism Catalog & Destinations"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "إدارة أقسام وتصنيفات الرحلات والوجهات السياحية السعودية لتحسين تجربة الاستكشاف والـ SEO." : "Manage Saudi destinations and tourism categories to boost catalog discovery and SEO."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outline" size="md" onClick={() => setShowCategoryModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <PlusIcon size={16} />
            <span>{isAr ? "إضافة قسم جديد" : "New Category"}</span>
          </Button>
          <Button variant="primary" size="md" onClick={() => setShowDestinationModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <PlusIcon size={16} />
            <span>{isAr ? "إضافة وجهة جديدة" : "New Destination"}</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            border: `1px solid ${activeTab === "categories" ? "transparent" : "var(--color-border)"}`,
            background: activeTab === "categories" ? "var(--gradient-gold)" : "var(--color-bg-card)",
            color: activeTab === "categories" ? "#0f172a" : "var(--color-text-primary)",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FolderIcon size={15} color={activeTab === "categories" ? "#0f172a" : "var(--color-gold-heading)"} />
          <span>{isAr ? `الأقسام السياحية (${categories.length})` : `Categories (${categories.length})`}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("destinations")}
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            border: `1px solid ${activeTab === "destinations" ? "transparent" : "var(--color-border)"}`,
            background: activeTab === "destinations" ? "var(--gradient-gold)" : "var(--color-bg-card)",
            color: activeTab === "destinations" ? "#0f172a" : "var(--color-text-primary)",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MapPinIcon size={15} color={activeTab === "destinations" ? "#0f172a" : "var(--color-gold-heading)"} />
          <span>{isAr ? `الوجهات السعودية (${destinations.length})` : `Destinations (${destinations.length})`}</span>
        </button>
      </div>

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                <th style={{ padding: "14px 16px" }}>{isAr ? "القسم السياحي" : "Category Name"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "الاسم بالإنجليزية (Slug)" : "Slug"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "عدد البرامج" : "Tours Count"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
                <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{c.nameAr}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{c.descriptionAr}</div>
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "var(--color-gold-heading)", direction: "ltr", textAlign: "start" }}>{c.slug}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700 }}>{c.programsCount} {isAr ? "برنامج" : "tours"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: c.isActive ? "#10B981" : "#EF4444", fontWeight: 800, fontSize: "12px" }}>
                      {c.isActive ? (isAr ? "نشط ✓" : "Active") : (isAr ? "معطل ✕" : "Inactive")}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <IconButton
                        variant={c.isActive ? "danger" : "secondary"}
                        size="sm"
                        title={c.isActive ? (isAr ? "تعطيل القسم" : "Disable") : (isAr ? "تفعيل القسم" : "Enable")}
                        icon={c.isActive ? <XCircleIcon size={15} /> : <CheckCircleIcon size={15} />}
                        onClick={() => toggleCategoryStatus(c.id)}
                      />
                      <IconButton
                        variant="ghost"
                        size="sm"
                        title={isAr ? "حذف القسم" : "Delete"}
                        icon={<TrashIcon size={15} />}
                        onClick={() => handleDeleteCategory(c)}
                        style={{ color: "#EF4444" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Destinations Tab */}
      {activeTab === "destinations" && (
        <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                <th style={{ padding: "14px 16px" }}>{isAr ? "الوجهة السياحية" : "Destination Name"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "المنطقة" : "Region"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "الـ Slug" : "Slug"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "البرامج المتاحة" : "Tours Count"}</th>
                <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
                <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{d.nameAr}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{d.nameEn}</div>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{d.regionAr}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "var(--color-gold-heading)", direction: "ltr", textAlign: "start" }}>{d.slug}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700 }}>{d.programsCount} {isAr ? "برنامج" : "tours"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: d.isActive ? "#10B981" : "#EF4444", fontWeight: 800, fontSize: "12px" }}>
                      {d.isActive ? (isAr ? "نشطة ✓" : "Active") : (isAr ? "معطلة ✕" : "Inactive")}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <IconButton
                        variant={d.isActive ? "danger" : "secondary"}
                        size="sm"
                        title={d.isActive ? (isAr ? "تعطيل الوجهة" : "Disable") : (isAr ? "تفعيل الوجهة" : "Enable")}
                        icon={d.isActive ? <XCircleIcon size={15} /> : <CheckCircleIcon size={15} />}
                        onClick={() => toggleDestinationStatus(d.id)}
                      />
                      <IconButton
                        variant="ghost"
                        size="sm"
                        title={isAr ? "حذف الوجهة" : "Delete"}
                        icon={<TrashIcon size={15} />}
                        onClick={() => handleDeleteDestination(d)}
                        style={{ color: "#EF4444" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title={isAr ? "إضافة قسم سياحي جديد" : "Add New Category"}
        subtitle={isAr ? "إضافة تصنيف سياحي جديد في الكتالوج" : "Create new tour category in catalog"}
        maxWidth="520px"
      >
        <form onSubmit={handleCreateCategory}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم القسم بالعربية" : "Category Name (Arabic)"}</label>
              <input type="text" required placeholder="مثال: رحلات المناطيد والتأمل" value={catNameAr} onChange={(e) => setCatNameAr(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم القسم بالإنجليزية" : "Category Name (English)"}</label>
              <input type="text" required placeholder="Hot Air Balloon Tours" value={catNameEn} onChange={(e) => setCatNameEn(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الـ Slug في الرابط" : "URL Slug"}</label>
              <input type="text" placeholder="hot-air-balloon" value={catSlug} onChange={(e) => setCatSlug(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "وصف مختصر للقسم" : "Description"}</label>
              <textarea rows={3} placeholder="وصف تجارب هذا القسم..." value={catDesc} onChange={(e) => setCatDesc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowCategoryModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "حفظ وإضافة القسم 🗂️" : "Save Category"}</Button>
          </div>
        </form>
      </Modal>

      {/* New Destination Modal */}
      <Modal
        isOpen={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        title={isAr ? "إضافة وجهة سياحية سعودية جديدة" : "Add Saudi Destination"}
        subtitle={isAr ? "إدراج مدينة أو وجهة سياحية جديدة في المملكة" : "Add new Saudi tourism city or destination"}
        maxWidth="520px"
      >
        <form onSubmit={handleCreateDestination}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الوجهة بالعربية" : "Destination Name (Arabic)"}</label>
              <input type="text" required placeholder="مثال: جزر أملج والوجه" value={destNameAr} onChange={(e) => setDestNameAr(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الوجهة بالإنجليزية" : "Destination Name (English)"}</label>
              <input type="text" required placeholder="Umluj Islands" value={destNameEn} onChange={(e) => setDestNameEn(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "المنطقة الجغرافية" : "Region"}</label>
              <input type="text" placeholder="منطقة تبوك والبحر الأحمر" value={destRegion} onChange={(e) => setDestRegion(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowDestinationModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "حفظ وإضافة الوجهة 📍" : "Save Destination"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
