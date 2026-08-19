"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  UserIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  BanIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  FileTextIcon,
  CreditCardIcon,
  CalendarIcon,
  TrashIcon,
} from "@/components/icons";

interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  nationalityEn: string;
  documentType: "National ID" | "Passport";
  documentNumber: string;
  documentExpiry: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  dietaryPreferences: string;
  medicalNotes: string;
  bookingsCount: number;
  totalSpent: string;
  status: "نشط" | "محظور";
  registeredDate: string;
}

const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: "cl-1",
    name: "عبد الله الخالدي",
    email: "abdullah.khaldi@example.com",
    phone: "+966 50 112 2334",
    nationality: "سعودي",
    nationalityEn: "Saudi",
    documentType: "National ID",
    documentNumber: "1089234101",
    documentExpiry: "2029-05-12",
    emergencyContactName: "خالد الخالدي (الأخ)",
    emergencyContactPhone: "+966 50 998 8776",
    dietaryPreferences: "وجبات حلال قياسية",
    medicalNotes: "لا توجد حالات صحية خاصة",
    bookingsCount: 8,
    totalSpent: "14,800 ر.س",
    status: "نشط",
    registeredDate: "2026-06-10",
  },
  {
    id: "cl-2",
    name: "James Wilson",
    email: "james.wilson@uk-tours.co.uk",
    phone: "+44 79 1112 3456",
    nationality: "بريطاني",
    nationalityEn: "British",
    documentType: "Passport",
    documentNumber: "GB99201482",
    documentExpiry: "2031-10-24",
    emergencyContactName: "Emma Wilson (Spouse)",
    emergencyContactPhone: "+44 79 4445 6677",
    dietaryPreferences: "Vegetarian (نباتي)",
    medicalNotes: "Mild asthma (حساسية صدر خفيفة)",
    bookingsCount: 3,
    totalSpent: "6,200 ر.س",
    status: "نشط",
    registeredDate: "2026-07-22",
  },
  {
    id: "cl-3",
    name: "سارة محمد العتيبي",
    email: "sara.otaibi@example.com",
    phone: "+966 55 443 3221",
    nationality: "سعودية",
    nationalityEn: "Saudi",
    documentType: "National ID",
    documentNumber: "1077123992",
    documentExpiry: "2028-11-19",
    emergencyContactName: "محمد العتيبي (الوالد)",
    emergencyContactPhone: "+966 55 111 2233",
    dietaryPreferences: "خالٍ من الجلوتين (Gluten Free)",
    medicalNotes: "حساسية من المكسرات",
    bookingsCount: 14,
    totalSpent: "29,500 ر.س",
    status: "نشط",
    registeredDate: "2026-04-15",
  },
  {
    id: "cl-4",
    name: "Marc Dupont",
    email: "marc.dupont@voyage.fr",
    phone: "+33 6 1234 5678",
    nationality: "فرنسي",
    nationalityEn: "French",
    documentType: "Passport",
    documentNumber: "FR88301928",
    documentExpiry: "2027-03-14",
    emergencyContactName: "Sophie Dupont (Sister)",
    emergencyContactPhone: "+33 6 9876 5432",
    dietaryPreferences: "Standard",
    medicalNotes: "None",
    bookingsCount: 1,
    totalSpent: "1,200 ر.س",
    status: "محظور",
    registeredDate: "2026-08-01",
  },
];

export default function AdminClientsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<"personal" | "passport" | "health_emergency" | "history">("personal");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Client Form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNationality, setNewNationality] = useState("سعودي");
  const [newDocType, setNewDocType] = useState<"National ID" | "Passport">("National ID");
  const [newDocNum, setNewDocNum] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientItem = {
      id: `cl-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      nationality: newNationality,
      nationalityEn: newNationality,
      documentType: newDocType,
      documentNumber: newDocNum || "1000000000",
      documentExpiry: "2030-01-01",
      emergencyContactName: "جهة اتصال عائلية",
      emergencyContactPhone: newPhone,
      dietaryPreferences: "قياسي",
      medicalNotes: "لا يوجد",
      bookingsCount: 0,
      totalSpent: "0.00 ر.س",
      status: "نشط",
      registeredDate: new Date().toISOString().split("T")[0],
    };

    setClients([newClient, ...clients]);
    setShowCreateModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewDocNum("");

    showToast(isAr ? `تم إنشاء حساب العميل (${newClient.name}) بنجاح.` : `Client created successfully.`);
  };

  const handleDeleteClient = (client: ClientItem) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف حساب المسافر (${client.name}) نهائياً؟` : `Delete client ${client.name}?`)) {
      setClients(clients.filter((c) => c.id !== client.id));
      setSelectedClient(null);
      showToast(isAr ? `تم حذف حساب المسافر (${client.name}) بنجاح.` : `Client deleted.`);
    }
  };

  const handleToggleStatus = (client: ClientItem) => {
    const newStatus = client.status === "نشط" ? "محظور" : "نشط";
    setClients(
      clients.map((c) => (c.id === client.id ? { ...c, status: newStatus } : c))
    );
    showToast(
      isAr
        ? `تم تغير حالة المسافر (${client.name}) إلى ${newStatus}`
        : `Client ${client.name} status updated to ${newStatus}`
    );
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
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              padding: "4px 12px",
              borderRadius: "100px",
              color: "#3B82F6",
              fontSize: "11px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            <UserIcon size={14} color="#3B82F6" />
            <span>{isAr ? "قسم إدارة العملاء والمسافرين" : "Clients & Travelers Directory"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "العملاء والمسافرون" : "Clients & Travelers Directory"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "سجل المسافرين الدوليين والمحليين، وثائق السفر، جهات الطوارئ، وتاريخ الحجوزات الموثقة."
              : "Directory of registered travelers, travel documents, emergency contacts, and booking history."}
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <PlusIcon size={16} />
          <span>{isAr ? "إضافة مسافر / عميل جديد" : "Add New Client"}</span>
        </Button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث باسم العميل، البريد، الجوال أو رقم الهوية..." : "Search name, email, phone or ID..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="ALL">{isAr ? "كافة الحالات" : "All Statuses"}</option>
          <option value="نشط">نشط</option>
          <option value="محظور">محظور</option>
        </select>
      </div>

      {/* Clients Data Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "اسم العميل المسافر" : "Client"}</th>
              <th>{isAr ? "الجنسية ووثيقة السفر" : "Nationality & Document"}</th>
              <th>{isAr ? "الحجوزات المكتملة" : "Bookings"}</th>
              <th>{isAr ? "إجمالي الإنفاق" : "Total Spent"}</th>
              <th>{isAr ? "تاريخ التسجيل" : "Registered"}</th>
              <th>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا يوجد عملاء يطابقون معايير البحث." : "No clients match search criteria."}
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{client.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      {client.email} • <span style={{ direction: "ltr", display: "inline-block" }}>{client.phone}</span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700 }}>{isAr ? client.nationality : client.nationalityEn}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>
                      {client.documentType}: {client.documentNumber}
                    </div>
                  </td>

                  <td>
                    <span style={{ fontWeight: 800 }}>{client.bookingsCount} {isAr ? "رحلات" : "tours"}</span>
                  </td>

                  <td>
                    <span style={{ fontWeight: 900, color: "var(--color-gold-heading)" }}>{client.totalSpent}</span>
                  </td>

                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{client.registeredDate}</td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: client.status === "نشط" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: client.status === "نشط" ? "#10B981" : "#EF4444",
                      }}
                    >
                      {client.status}
                    </span>
                  </td>

                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", flexWrap: "nowrap" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedClient(client)}
                        className="rafeeq-action-btn"
                        title={isAr ? "فتح الملف الشامل 360°" : "Full 360° Dossier"}
                      >
                        <EyeIcon size={14} color="var(--color-gold-heading)" />
                        <span>{isAr ? "الملف الكامل" : "Dossier"}</span>
                      </button>

                      <a
                        href={`/admin/messages?clientId=${client.id}`}
                        className="rafeeq-action-btn"
                        title={isAr ? "مراسلة العميل" : "Message Client"}
                        style={{ textDecoration: "none" }}
                      >
                        <FileTextIcon size={14} color="#3B82F6" />
                        <span>{isAr ? "مراسلة" : "Message"}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(client)}
                        className="rafeeq-action-btn"
                        style={{
                          background: client.status === "نشط" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.15)",
                          borderColor: client.status === "نشط" ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.3)",
                          color: client.status === "نشط" ? "#EF4444" : "#10B981",
                        }}
                      >
                        <BanIcon size={14} color={client.status === "نشط" ? "#EF4444" : "#10B981"} />
                        <span>{client.status === "نشط" ? (isAr ? "تجميد" : "Suspend") : isAr ? "تنشيط" : "Activate"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteClient(client)}
                        className="rafeeq-action-btn"
                        style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444" }}
                        title={isAr ? "حذف الحساب" : "Delete Client"}
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

      {/* 360° Client Dossier Modal */}
      {selectedClient && (
        <Modal
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          title={isAr ? `الملف الشامل للمسافر: ${selectedClient.name}` : `Traveler Dossier: ${selectedClient.name}`}
          subtitle={`${isAr ? selectedClient.nationality : selectedClient.nationalityEn} • ${selectedClient.email}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              {[
                { key: "personal", labelAr: "البيانات والاتصال", labelEn: "Personal & Contact" },
                { key: "passport", labelAr: "وثيقة السفر والهوية", labelEn: "Travel Document" },
                { key: "health_emergency", labelAr: "الطوارئ والتفضيلات الصحية", labelEn: "Emergency & Health" },
                { key: "history", labelAr: "الإنفاق والحجوزات", labelEn: "History & Spend" },
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

            {/* Tab 1 */}
            {activeDossierTab === "personal" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</span><p style={{ fontWeight: 800 }}>{selectedClient.email}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الجوال الدولي" : "Phone"}</span><p style={{ fontWeight: 800, direction: "ltr", textAlign: "start" }}>{selectedClient.phone}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الجنسية" : "Nationality"}</span><p style={{ fontWeight: 800 }}>{isAr ? selectedClient.nationality : selectedClient.nationalityEn}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تاريخ الانضمام" : "Join Date"}</span><p style={{ fontWeight: 800 }}>{selectedClient.registeredDate}</p></div>
              </div>
            )}

            {/* Tab 2 */}
            {activeDossierTab === "passport" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "نوع الوثيقة الثبوتية" : "Document Type"}</span>
                  <p style={{ fontWeight: 800 }}>{selectedClient.documentType === "National ID" ? (isAr ? "بطاقة الهوية الوطنية" : "National ID") : (isAr ? "جواز سفر دولي" : "International Passport")}</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الوثيقة" : "Document Number"}</span>
                  <p style={{ fontWeight: 900, color: "var(--color-gold-heading)", fontFamily: "monospace", fontSize: "14px" }}>{selectedClient.documentNumber}</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تاريخ الصلاحية والانتهاء" : "Expiry Date"}</span>
                  <p style={{ fontWeight: 800 }}>{selectedClient.documentExpiry}</p>
                </div>
              </div>
            )}

            {/* Tab 3 */}
            {activeDossierTab === "health_emergency" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "جهة اتصال الطوارئ" : "Emergency Contact"}</span><p style={{ fontWeight: 800 }}>{selectedClient.emergencyContactName}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم هاتف الطوارئ" : "Emergency Phone"}</span><p style={{ fontWeight: 800, direction: "ltr", textAlign: "start" }}>{selectedClient.emergencyContactPhone}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "التفضيلات الغذائية" : "Dietary Preferences"}</span><p style={{ fontWeight: 800 }}>{selectedClient.dietaryPreferences}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الملاحظات الصحية والبدنية" : "Medical Notes"}</span><p style={{ fontWeight: 800 }}>{selectedClient.medicalNotes}</p></div>
              </div>
            )}

            {/* Tab 4 */}
            {activeDossierTab === "history" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px" }}>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "إجمالي الحجوزات المنفذة" : "Completed Tours"}</span><p style={{ fontWeight: 900, fontSize: "16px" }}>{selectedClient.bookingsCount} {isAr ? "رحلات" : "tours"}</p></div>
                <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "إجمالي الإنفاق المدفوع" : "Total SAR Spent"}</span><p style={{ fontWeight: 900, color: "var(--color-gold-heading)", fontSize: "16px" }}>{selectedClient.totalSpent}</p></div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Client Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إضافة مسافر / عميل جديد" : "Add New Client"}
      >
        <form onSubmit={handleCreateClient} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم العميل المسافر" : "Client Name"}</label>
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
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "نوع الوثيقة" : "Document Type"}</label>
              <select value={newDocType} onChange={(e) => setNewDocType(e.target.value as "National ID" | "Passport")} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }}>
                <option value="National ID">{isAr ? "هوية وطنية / إقامة" : "National ID"}</option>
                <option value="Passport">{isAr ? "جواز سفر دولي" : "Passport"}</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الوثيقة" : "Document No"}</label>
              <input type="text" required value={newDocNum} onChange={(e) => setNewDocNum(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="sm" type="submit">{isAr ? "إنشاء الحساب" : "Create Client"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
