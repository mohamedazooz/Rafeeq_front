"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  CompassIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanIcon,
  KeyIcon,
  MailIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface GuideItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  licenseNo: string;
  licenseStatus: "معتمدة" | "قيد الفحص" | "منتهية";
  status: "نشط" | "معلق" | "محظور";
  rating: number;
  toursCount: number;
  totalEarnings: string;
  customCommission?: number;
  iban: string;
}

const INITIAL_GUIDES: GuideItem[] = [
  {
    id: "gd-1",
    name: "عبد العزيز فهد الشمري",
    email: "abdulaziz.alshammari@rafeeq.sa",
    phone: "+966551234567",
    city: "العلا",
    licenseNo: "TG-994821",
    licenseStatus: "معتمدة",
    status: "نشط",
    rating: 4.9,
    toursCount: 48,
    totalEarnings: "38,400 ر.س",
    customCommission: 15,
    iban: "SA80000000608010167519",
  },
  {
    id: "gd-2",
    name: "سعود فهد الدوسري",
    email: "saud.aldosari@example.com",
    phone: "+966509876543",
    city: "الرياض",
    licenseNo: "TG-881023",
    licenseStatus: "قيد الفحص",
    status: "معلق",
    rating: 5.0,
    toursCount: 12,
    totalEarnings: "9,600 ر.س",
    customCommission: 15,
    iban: "SA42100000201948210394",
  },
  {
    id: "gd-3",
    name: "مريم علي الغامدي",
    email: "mariam.ghamdi@example.com",
    phone: "+966543210987",
    city: "جدة",
    licenseNo: "TG-773019",
    licenseStatus: "معتمدة",
    status: "نشط",
    rating: 4.8,
    toursCount: 65,
    totalEarnings: "52,000 ر.س",
    customCommission: 12,
    iban: "SA19000000982301928374",
  },
  {
    id: "gd-4",
    name: "خالد سعيد الشهري",
    email: "khaled.shehri@example.com",
    phone: "+966567890123",
    city: "أبها وعسير",
    licenseNo: "TG-662910",
    licenseStatus: "منتهية",
    status: "محظور",
    rating: 4.5,
    toursCount: 20,
    totalEarnings: "14,200 ر.س",
    customCommission: 15,
    iban: "SA55800000109283746192",
  },
];

export default function AdminGuidesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [guides, setGuides] = useState<GuideItem[]>(INITIAL_GUIDES);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal states
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New guide form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("الرياض");
  const [newLicense, setNewLicense] = useState("");
  const [newIban, setNewIban] = useState("SA");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredGuides = guides.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.licenseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery);
    const matchesCity = cityFilter === "ALL" || g.city === cityFilter;
    const matchesStatus = statusFilter === "ALL" || g.status === statusFilter;
    return matchesSearch && matchesCity && matchesStatus;
  });

  const handleCreateGuide = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuide: GuideItem = {
      id: `gd-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      city: newCity,
      licenseNo: newLicense,
      licenseStatus: "معتمدة",
      status: "نشط",
      rating: 5.0,
      toursCount: 0,
      totalEarnings: "0.00 ر.س",
      customCommission: 15,
      iban: newIban,
    };

    setGuides([newGuide, ...guides]);
    setShowCreateModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewLicense("");
    setNewIban("SA");

    dispatchDualActionNotification({
      title: "إنشاء واعتماد حساب مرشد سياحي جديد",
      message: `تم إنشاء حساب المرشد (${newGuide.name}) بنجاح وتفعيل رخصة وزارة السياحة رقم (${newGuide.licenseNo}).`,
      actionType: "CREATE",
      targetEmail: newGuide.email,
      targetName: newGuide.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم إنشاء حساب المرشد (${newGuide.name}) وإرسال إشعار وبريد الترحيب!` : `Guide created and notification sent!`);
  };

  const handleToggleStatus = (guide: GuideItem) => {
    const nextStatus = guide.status === "نشط" ? "محظور" : "نشط";
    setGuides(guides.map((g) => (g.id === guide.id ? { ...g, status: nextStatus } : g)));

    dispatchDualActionNotification({
      title: nextStatus === "محظور" ? "تجميد حساب المرشد السياحي" : "إلغاء تجميد وتنشيط حساب المرشد",
      message: `تم تحديث حالة حسابك إلى (${nextStatus}) من قِبل إدارة منصة رفيق.`,
      actionType: "BAN",
      targetEmail: guide.email,
      targetName: guide.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم تغيير حالة المرشد (${guide.name}) إلى (${nextStatus}) مع إشعار وبريد فوري.` : `Status updated to ${nextStatus}`);
  };

  const handleApproveLicense = (guide: GuideItem) => {
    setGuides(guides.map((g) => (g.id === guide.id ? { ...g, licenseStatus: "معتمدة", status: "نشط" } : g)));

    dispatchDualActionNotification({
      title: "اعتماد وتوثيق رخصة الإرشاد السياحي (TG)",
      message: `تهانينا! تم تدقيق واعتماد رخصة وزارة السياحة (${guide.licenseNo}) بنجاح. يمكنك الآن نشر برامجك السياحية.`,
      actionType: "APPROVE",
      targetEmail: guide.email,
      targetName: guide.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم اعتماد وتوثيق رخصة المرشد (${guide.name}) وإرسال إشعار وبريد التفعيل!` : `Guide license approved!`);
  };

  const handleDeleteGuide = (guide: GuideItem) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف المرشد (${guide.name}) نهائياً؟` : `Delete guide ${guide.name}?`)) {
      setGuides(guides.filter((g) => g.id !== guide.id));
      setSelectedGuide(null);

      dispatchDualActionNotification({
        title: "حذف حساب المرشد من المنصة",
        message: `تم حذف حساب المرشد السياحي (${guide.name}) من قاعدة البيانات.`,
        actionType: "DELETE",
        targetEmail: guide.email,
        targetName: guide.name,
        targetRole: "Guide",
      });

      showToast(isAr ? `تم حذف حساب المرشد (${guide.name}) بنجاح.` : `Guide deleted.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast */}
      {toastMsg && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <CompassIcon size={14} color="var(--color-gold-heading)" />
            {isAr ? "قسم إدارة المرشدين السياحيين المرخصين" : "Certified Tour Guides Management"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "المرشدون السياحيون والتراخيص 👨‍🏫" : "Tour Guides & MOT Licenses"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "إدارة كاملة لملفات المرشدين، التحقق من التراخيص، ضبط نسب العمولات، والتحكم في الحسابات." : "Complete governance over tour guides, licenses, custom commissions, and account audits."}
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <PlusIcon size={16} />
          <span>{isAr ? "إضافة مرشد معتمد جديد" : "Add New Certified Guide"}</span>
        </Button>
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 260px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث بالاسم، رقم الترخيص TG، البريد أو الجوال..." : "Search by name, TG license, email or phone..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="ALL">{isAr ? "كافة المدن والمناطق" : "All Cities"}</option>
          <option value="العلا">العلا</option>
          <option value="الرياض">الرياض</option>
          <option value="جدة">جدة</option>
          <option value="أبها وعسير">أبها وعسير</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="ALL">{isAr ? "كافة الحالات" : "All Statuses"}</option>
          <option value="نشط">نشط</option>
          <option value="معلق">معلق</option>
          <option value="محظور">محظور</option>
        </select>
      </div>

      {/* Guides Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المرشد" : "Guide"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "رخصة السياحة (TG)" : "MOT License"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المدينة" : "City"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "التقييم والجولات" : "Rating & Tours"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الأرباح" : "Earnings"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراءات التحكم السريع" : "Quick Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuides.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا يوجد مرشدون يطابقون معايير البحث." : "No tour guides matching the search criteria."}
                </td>
              </tr>
            ) : (
              filteredGuides.map((guide) => (
                <tr key={guide.id} style={{ borderBottom: "1px solid var(--color-border)", transition: "background 0.15s ease" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{guide.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>{guide.email} • <span style={{ direction: "ltr", display: "inline-block" }}>{guide.phone}</span></div>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>{guide.licenseNo}</span>
                    <span style={{ display: "block", fontSize: "10px", color: guide.licenseStatus === "معتمدة" ? "#10B981" : guide.licenseStatus === "قيد الفحص" ? "#F59E0B" : "#EF4444", fontWeight: 700 }}>
                      ● {guide.licenseStatus}
                    </span>
                  </td>

                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{guide.city}</td>

                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: "#F59E0B", fontWeight: 800 }}>★ {guide.rating}</span>
                    <span style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)" }}>{guide.toursCount} جولة مكتملة</span>
                  </td>

                  <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10B981" }}>{guide.totalEarnings}</td>

                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: guide.status === "نشط" ? "rgba(16, 185, 129, 0.15)" : guide.status === "معلق" ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: guide.status === "نشط" ? "#10B981" : guide.status === "معلق" ? "#F59E0B" : "#EF4444",
                      }}
                    >
                      {guide.status}
                    </span>
                  </td>

                  <td style={{ padding: "14px 16px", textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      {guide.licenseStatus === "قيد الفحص" && (
                        <IconButton
                          variant="success"
                          size="sm"
                          title={isAr ? "اعتماد رخصة وزارة السياحة وتفعيل الحساب" : "Approve License"}
                          icon={<CheckCircleIcon size={15} />}
                          onClick={() => handleApproveLicense(guide)}
                        />
                      )}

                      <IconButton
                        variant="gold"
                        size="sm"
                        title={isAr ? "معاينة الملف المهني والوثائق" : "Inspect Profile"}
                        icon={<EyeIcon size={15} />}
                        onClick={() => { setSelectedGuide(guide); setIsEditing(false); }}
                      />

                      <IconButton
                        variant="outline"
                        size="sm"
                        title={isAr ? "تعديل بيانات الحساب والعمولة" : "Edit Guide"}
                        icon={<EditIcon size={15} />}
                        onClick={() => { setSelectedGuide(guide); setIsEditing(true); }}
                      />

                      <IconButton
                        variant={guide.status === "نشط" ? "danger" : "secondary"}
                        size="sm"
                        title={guide.status === "نشط" ? (isAr ? "تجميد الحساب" : "Ban Guide") : (isAr ? "إلغاء التجميد وتنشيط الحساب" : "Activate Guide")}
                        icon={<BanIcon size={15} />}
                        onClick={() => handleToggleStatus(guide)}
                      />

                      <IconButton
                        variant="ghost"
                        size="sm"
                        title={isAr ? "حذف الحساب نهائياً" : "Delete Guide"}
                        icon={<TrashIcon size={15} />}
                        onClick={() => handleDeleteGuide(guide)}
                        style={{ color: "#EF4444" }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Guide Detail Modal */}
      <Modal
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        title={selectedGuide ? (isAr ? "ملف المرشد السياحي المعتمد" : "Tour Guide Profile") : ""}
        subtitle={selectedGuide ? `${selectedGuide.name} • ${selectedGuide.licenseNo}` : ""}
        maxWidth="580px"
      >
        {selectedGuide && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</span><div style={{ fontSize: "13px", fontWeight: 700 }}>{selectedGuide.email}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الجوال" : "Phone"}</span><div style={{ fontSize: "13px", fontWeight: 700, direction: "ltr", textAlign: "start" }}>{selectedGuide.phone}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الآيبان البنكي (IBAN)" : "Bank IBAN"}</span><div style={{ fontSize: "12px", fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>{selectedGuide.iban}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "نسبة عمولة المنصة" : "Custom Commission"}</span><div style={{ fontSize: "13px", fontWeight: 800, color: "#10B981" }}>{selectedGuide.customCommission}%</div></div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedGuide(null)}>{isAr ? "إغلاق النافذة" : "Close Window"}</Button>
              {selectedGuide.licenseStatus === "قيد الفحص" && (
                <Button variant="primary" size="sm" onClick={() => { handleApproveLicense(selectedGuide); setSelectedGuide(null); }}>
                  {isAr ? "اعتماد الرخصة رسمياً ✓" : "Approve License"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Create New Guide Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إضافة مرشد سياحي معتمد جديد" : "Create Certified Tour Guide"}
        subtitle={isAr ? "تسجيل بيانات المرشد ورقم رخصة وزارة السياحة" : "Register guide and MOT license details"}
        maxWidth="540px"
      >
        <form onSubmit={handleCreateGuide}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم الكامل (كما في الهوية)" : "Full Legal Name"}</label>
              <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="عبد العزيز الشمري" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="guide@rafeeq.sa" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الجوال" : "Phone"}</label>
                <input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="+966551234567" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "المدينة الرئيسية" : "City"}</label>
                <select value={newCity} onChange={(e) => setNewCity(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}>
                  <option value="الرياض">الرياض</option>
                  <option value="العلا">العلا</option>
                  <option value="جدة">جدة</option>
                  <option value="أبها وعسير">أبها وعسير</option>
                  <option value="البحر الأحمر">البحر الأحمر</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم رخصة وزارة السياحة (TG)" : "MOT License No"}</label>
                <input type="text" required value={newLicense} onChange={(e) => setNewLicense(e.target.value)} placeholder="TG-994821" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الآيبان البنكي (SA...)" : "Saudi IBAN"}</label>
              <input type="text" required value={newIban} onChange={(e) => setNewIban(e.target.value)} placeholder="SA80000000608010167519" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-gold-heading)", fontSize: "13px", fontWeight: 800, outline: "none" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "إنشاء وتفعيل الحساب 🚀" : "Create & Activate Guide"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
