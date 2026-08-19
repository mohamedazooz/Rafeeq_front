"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  CompassIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanIcon,
  ShieldCheckIcon,
  FileTextIcon,
  WalletIcon,
  CalendarIcon,
} from "@/components/icons";

interface GuideItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  licenseNo: string;
  licenseExpiry: string;
  licenseStatus: "معتمدة" | "قيد الفحص" | "منتهية";
  status: "نشط" | "معلق" | "محظور";
  rating: number;
  toursCount: number;
  totalEarnings: string;
  customCommission?: number;
  iban: string;
  bankName: string;
  vehicle: string;
  specialties: string[];
  languages: string[];
  emergencyContact: string;
}

const INITIAL_GUIDES: GuideItem[] = [
  {
    id: "gd-1",
    name: "عبد العزيز فهد الشمري",
    email: "abdulaziz.alshammari@rafeeq.sa",
    phone: "+966 55 123 4567",
    city: "العلا",
    licenseNo: "TG-994821",
    licenseExpiry: "2027-08-20",
    licenseStatus: "معتمدة",
    status: "نشط",
    rating: 4.9,
    toursCount: 48,
    totalEarnings: "38,400 ر.س",
    customCommission: 15,
    iban: "SA80000000608010167519",
    bankName: "مصرف الراجحي",
    vehicle: "تويوتا لاندكروزر 2024 (4x4)",
    specialties: ["تراث وتاريخ آثار", "مغامرات وسفاري"],
    languages: ["العربية (Native)", "الإنجليزية (Fluent)", "الفرنسية (Good)"],
    emergencyContact: "فهد الشمري (الأخ) — 0559998877",
  },
  {
    id: "gd-2",
    name: "سعود فهد الدوسري",
    email: "saud.aldosari@example.com",
    phone: "+966 50 987 6543",
    city: "الرياض",
    licenseNo: "TG-881023",
    licenseExpiry: "2026-12-30",
    licenseStatus: "قيد الفحص",
    status: "معلق",
    rating: 5.0,
    toursCount: 12,
    totalEarnings: "9,600 ر.س",
    customCommission: 15,
    iban: "SA42100000201948210394",
    bankName: "البنك الأهلي السعودي",
    vehicle: "نيسان باترول بلاتينيوم 2023",
    specialties: ["سفاري وصحراء ونجوم", "تراث وطني"],
    languages: ["العربية (Native)", "الإنجليزية (Fluent)"],
    emergencyContact: "سلطان الدوسري (الأب) — 0501114455",
  },
  {
    id: "gd-3",
    name: "مريم علي الغامدي",
    email: "mariam.ghamdi@example.com",
    phone: "+966 54 321 0987",
    city: "جدة",
    licenseNo: "TG-773019",
    licenseExpiry: "2028-02-15",
    licenseStatus: "معتمدة",
    status: "نشط",
    rating: 4.8,
    toursCount: 65,
    totalEarnings: "52,000 ر.س",
    customCommission: 12,
    iban: "SA19000000982301928374",
    bankName: "بنك الرياض",
    vehicle: "مرسيدس فان سياحي فاخر VIP",
    specialties: ["تراث البلد التاريخي", "طهي شعبي وتذوق"],
    languages: ["العربية (Native)", "الإنجليزية (Fluent)", "الألمانية (Basic)"],
    emergencyContact: "علي الغامدي (الوالد) — 0548887766",
  },
  {
    id: "gd-4",
    name: "خالد سعيد الشهري",
    email: "khaled.shehri@example.com",
    phone: "+966 56 789 0123",
    city: "أبها وعسير",
    licenseNo: "TG-662910",
    licenseExpiry: "2025-05-10",
    licenseStatus: "منتهية",
    status: "محظور",
    rating: 4.5,
    toursCount: 20,
    totalEarnings: "14,200 ر.س",
    customCommission: 15,
    iban: "SA55800000109283746192",
    bankName: "مصرف الإنماء",
    vehicle: "فورد إكسبدشن 2022",
    specialties: ["طبيعة وهايكنج السودة"],
    languages: ["العربية (Native)", "الإنجليزية (Good)"],
    emergencyContact: "سعيد الشهري — 0561110099",
  },
];

export default function AdminGuidesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [guides, setGuides] = useState<GuideItem[]>(INITIAL_GUIDES);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<"overview" | "credentials" | "logistics" | "earnings">("overview");
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
      licenseExpiry: "2028-01-01",
      licenseStatus: "معتمدة",
      status: "نشط",
      rating: 5.0,
      toursCount: 0,
      totalEarnings: "0.00 ر.س",
      customCommission: 15,
      iban: newIban,
      bankName: "مصرف الراجحي",
      vehicle: "سيارة سيدان مريحة",
      specialties: ["تراث عام"],
      languages: ["العربية"],
      emergencyContact: "جهة اتصال عائلية",
    };

    setGuides([newGuide, ...guides]);
    setShowCreateModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewLicense("");
    setNewIban("SA");

    showToast(isAr ? `تم إنشاء حساب المرشد (${newGuide.name}) وتفعيل حسابه بنجاح.` : `Guide created successfully.`);
  };

  const handleToggleStatus = (guide: GuideItem) => {
    const nextStatus = guide.status === "نشط" ? "محظور" : "نشط";
    setGuides(guides.map((g) => (g.id === guide.id ? { ...g, status: nextStatus } : g)));
    showToast(isAr ? `تم تغيير حالة حساب المرشد (${guide.name}) إلى (${nextStatus}).` : `Status updated to ${nextStatus}`);
  };

  const handleDeleteGuide = (guide: GuideItem) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف حساب المرشد (${guide.name}) نهائياً؟` : `Delete guide ${guide.name}?`)) {
      setGuides(guides.filter((g) => g.id !== guide.id));
      setSelectedGuide(null);
      showToast(isAr ? `تم حذف حساب المرشد (${guide.name}) بنجاح.` : `Guide deleted.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast */}
      {toastMsg && (
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
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
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
            <CompassIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "سجل المرشدين السياحيين المعتمدين" : "Certified Tour Guides Directory"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "المرشدون السياحيون والتراخيص" : "Tour Guides & MOT Licenses"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "إدارة شاملة لملفات المرشدين، التحقق من الرخص، ضبط نسب العمولات، وعرض الملفات 360° الكاملة."
              : "Complete governance over tour guides, licenses, commissions, and full 360° dossiers."}
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
            placeholder={isAr ? "بحث بالاسم، رقم ترخيص TG، البريد أو الجوال..." : "Search name, TG license, email or phone..."}
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
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "اسم المرشد السياحي" : "Guide"}</th>
              <th>{isAr ? "رخصة السياحة (TG)" : "MOT License"}</th>
              <th>{isAr ? "المدينة والتغطية" : "City / Region"}</th>
              <th>{isAr ? "التقييم والجولات" : "Rating & Tours"}</th>
              <th>{isAr ? "إجمالي الأرباح" : "Earnings"}</th>
              <th>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuides.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا يوجد مرشدون يطابقون معايير البحث." : "No tour guides match search criteria."}
                </td>
              </tr>
            ) : (
              filteredGuides.map((guide) => (
                <tr key={guide.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{guide.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      {guide.email} • <span style={{ direction: "ltr", display: "inline-block" }}>{guide.phone}</span>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)" }}>
                      {guide.licenseNo}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "10px",
                        color:
                          guide.licenseStatus === "معتمدة"
                            ? "#10B981"
                            : guide.licenseStatus === "قيد الفحص"
                            ? "#F59E0B"
                            : "#EF4444",
                        fontWeight: 700,
                      }}
                    >
                      {guide.licenseStatus}
                    </span>
                  </td>

                  <td style={{ fontWeight: 600 }}>{guide.city}</td>

                  <td>
                    <span style={{ color: "#F59E0B", fontWeight: 800 }}>★ {guide.rating}</span>
                    <span style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)" }}>
                      {guide.toursCount} {isAr ? "جولة" : "tours"}
                    </span>
                  </td>

                  <td style={{ fontWeight: 800, color: "#10B981" }}>{guide.totalEarnings}</td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background:
                          guide.status === "نشط"
                            ? "rgba(16, 185, 129, 0.15)"
                            : guide.status === "معلق"
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                        color:
                          guide.status === "نشط"
                            ? "#10B981"
                            : guide.status === "معلق"
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    >
                      {guide.status}
                    </span>
                  </td>

                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", flexWrap: "nowrap" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedGuide(guide)}
                        className="rafeeq-action-btn"
                        title={isAr ? "استعراض الملف الشامل 360°" : "Full 360° Dossier"}
                      >
                        <EyeIcon size={14} color="var(--color-gold-heading)" />
                        <span>{isAr ? "الملف الكامل" : "Dossier"}</span>
                      </button>

                      <a
                        href={`/admin/messages?guideId=${guide.id}`}
                        className="rafeeq-action-btn"
                        title={isAr ? "مراسلة المرشد" : "Message Guide"}
                        style={{ textDecoration: "none" }}
                      >
                        <FileTextIcon size={14} color="#3B82F6" />
                        <span>{isAr ? "مراسلة" : "Message"}</span>
                      </a>

                      {guide.licenseStatus === "قيد الفحص" && (
                        <button
                          type="button"
                          onClick={() => {
                            setGuides(guides.map((g) => (g.id === guide.id ? { ...g, licenseStatus: "معتمدة", status: "نشط" } : g)));
                            showToast(isAr ? `تم اعتماد وتوثيق رخصة المرشد (${guide.name}) بنجاح.` : `License approved.`);
                          }}
                          className="rafeeq-action-btn"
                          style={{ background: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.3)", color: "#10B981" }}
                        >
                          <ShieldCheckIcon size={14} color="#10B981" />
                          <span>{isAr ? "اعتماد" : "Approve"}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(guide)}
                        className="rafeeq-action-btn"
                        style={{
                          background: guide.status === "نشط" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.15)",
                          borderColor: guide.status === "نشط" ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.3)",
                          color: guide.status === "نشط" ? "#EF4444" : "#10B981",
                        }}
                      >
                        <BanIcon size={14} color={guide.status === "نشط" ? "#EF4444" : "#10B981"} />
                        <span>{guide.status === "نشط" ? (isAr ? "تجميد" : "Suspend") : isAr ? "تنشيط" : "Activate"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGuide(guide)}
                        className="rafeeq-action-btn"
                        style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444" }}
                        title={isAr ? "حذف الحساب" : "Delete Guide"}
                      >
                        <TrashIcon size={14} color="#EF4444" />
                        <span>{isAr ? "حذف" : "Delete"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Guide 360° Dossier Modal */}
      {selectedGuide && (
        <Modal
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
          title={isAr ? `الملف المهني الشامل للمرشد: ${selectedGuide.name}` : `Guide Dossier: ${selectedGuide.name}`}
          subtitle={`${selectedGuide.city} • ${selectedGuide.licenseNo}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            {/* Dossier Tabs */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              {[
                { key: "overview", labelAr: "البيانات والاتصال", labelEn: "Overview" },
                { key: "credentials", labelAr: "الرخصة والتخصصات", labelEn: "Credentials" },
                { key: "logistics", labelAr: "المركبة واللوجستيات", labelEn: "Logistics" },
                { key: "earnings", labelAr: "المالية والحساب البنكي", labelEn: "Earnings & Bank" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveDossierTab(tab.key as typeof activeDossierTab)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 800,
                    cursor: "pointer",
                    border: "none",
                    background: activeDossierTab === tab.key ? "var(--color-bg-secondary)" : "transparent",
                    color: activeDossierTab === tab.key ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                  }}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeDossierTab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</span><p style={{ fontWeight: 800 }}>{selectedGuide.email}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الجوال" : "Phone"}</span><p style={{ fontWeight: 800, direction: "ltr", textAlign: "start" }}>{selectedGuide.phone}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "جهة الطوارئ" : "Emergency Contact"}</span><p style={{ fontWeight: 800 }}>{selectedGuide.emergencyContact}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "التقييم العام" : "Rating"}</span><p style={{ fontWeight: 800, color: "#F59E0B" }}>★ {selectedGuide.rating} ({selectedGuide.toursCount} جولة)</p></div>
              </div>
            )}

            {/* Tab 2: Credentials */}
            {activeDossierTab === "credentials" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رخصة وزارة السياحة (TG)" : "MOT License"}</span>
                  <p style={{ fontWeight: 900, color: "var(--color-gold-heading)", fontFamily: "monospace", fontSize: "15px" }}>{selectedGuide.licenseNo}</p>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? `تاريخ الانتهاء: ${selectedGuide.licenseExpiry}` : `Expiry: ${selectedGuide.licenseExpiry}`}</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: "6px", color: "var(--color-gold-heading)" }}>{isAr ? "التخصصات السياحية:" : "Specialties:"}</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedGuide.specialties.map((s, i) => (
                      <span key={i} style={{ background: "var(--color-bg-secondary)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Logistics */}
            {activeDossierTab === "logistics" && (
              <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <h4 style={{ fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "4px" }}>{isAr ? "المركبة الميدانية المعتمدة:" : "Field Transportation:"}</h4>
                <p style={{ fontWeight: 700 }}>{selectedGuide.vehicle}</p>
              </div>
            )}

            {/* Tab 4: Earnings */}
            {activeDossierTab === "earnings" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "إجمالي الأرباح المصروفة" : "Total Earnings"}</span><p style={{ fontWeight: 900, color: "#10B981", fontSize: "15px" }}>{selectedGuide.totalEarnings}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "عمولة المنصة" : "Platform Commission"}</span><p style={{ fontWeight: 800 }}>{selectedGuide.customCommission}%</p></div>
                <div style={{ gridColumn: "span 2" }}><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الآيبان البنكي (SA IBAN)" : "Bank IBAN"}</span><p style={{ fontFamily: "monospace", fontWeight: 900, color: "var(--color-gold-heading)" }}>{selectedGuide.iban} ({selectedGuide.bankName})</p></div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedGuide(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Guide Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إضافة مرشد سياحي معتمد جديد" : "Add New Certified Guide"}
      >
        <form onSubmit={handleCreateGuide} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم الكامل" : "Full Legal Name"}</label>
            <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
              <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الجوال" : "Phone"}</label>
              <input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "المدينة" : "City"}</label>
              <select value={newCity} onChange={(e) => setNewCity(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }}>
                <option value="الرياض">الرياض</option>
                <option value="العلا">العلا</option>
                <option value="جدة">جدة</option>
                <option value="أبها وعسير">أبها وعسير</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رخصة السياحة (TG)" : "License No"}</label>
              <input type="text" required value={newLicense} onChange={(e) => setNewLicense(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الآيبان البنكي (SA IBAN)" : "Saudi IBAN"}</label>
            <input type="text" required value={newIban} onChange={(e) => setNewIban(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-gold-heading)", fontFamily: "monospace", fontWeight: 800, outline: "none" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="sm" type="submit">{isAr ? "إنشاء وتفعيل" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
