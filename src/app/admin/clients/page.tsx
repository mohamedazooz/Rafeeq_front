"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  UserIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  BanIcon,
  KeyIcon,
  MailIcon,
  ShieldCheckIcon,
  XCircleIcon,
  CreditCardIcon,
} from "@/components/icons";

interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
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
    phone: "+966501122334",
    nationality: "سعودي 🇸🇦",
    bookingsCount: 8,
    totalSpent: "14,800 ر.س",
    status: "نشط",
    registeredDate: "2026-06-10",
  },
  {
    id: "cl-2",
    name: "James Wilson",
    email: "james.wilson@uk-tours.co.uk",
    phone: "+447911123456",
    nationality: "بريطاني 🇬🇧",
    bookingsCount: 3,
    totalSpent: "6,200 ر.س",
    status: "نشط",
    registeredDate: "2026-07-22",
  },
  {
    id: "cl-3",
    name: "سارة محمد العتيبي",
    email: "sara.otaibi@example.com",
    phone: "+966554433221",
    nationality: "سعودية 🇸🇦",
    bookingsCount: 14,
    totalSpent: "29,500 ر.س",
    status: "نشط",
    registeredDate: "2026-04-15",
  },
  {
    id: "cl-4",
    name: "Marc Dupont",
    email: "marc.dupont@voyage.fr",
    phone: "+33612345678",
    nationality: "فرنسي 🇫🇷",
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

  // Modal states
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Client Form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNationality, setNewNationality] = useState("سعودي 🇸🇦");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.nationality.includes(searchQuery);
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

    dispatchDualActionNotification({
      title: "إنشاء حساب عميل ومسافر جديد",
      message: `تم إنشاء حساب المسافر (${newClient.name}) بنجاح. أهلاً بك في رفيق!`,
      actionType: "CREATE",
      targetEmail: newClient.email,
      targetName: newClient.name,
      targetRole: "Client",
    });

    showToast(isAr ? `تم إنشاء حساب العميل (${newClient.name}) وإرسال بريد الترحيب!` : `Client account created!`);
  };

  const handleToggleStatus = (client: ClientItem) => {
    const nextStatus = client.status === "نشط" ? "محظور" : "نشط";
    setClients(clients.map((c) => (c.id === client.id ? { ...c, status: nextStatus } : c)));

    dispatchDualActionNotification({
      title: nextStatus === "محظور" ? "تجميد حساب العميل بالمنصة" : "إلغاء تجميد وتنشيط حساب العميل",
      message: `تم تحديث حالة حسابك إلى (${nextStatus}) بواسطة إدارة منصة رفيق.`,
      actionType: "BAN",
      targetEmail: client.email,
      targetName: client.name,
      targetRole: "Client",
    });

    showToast(isAr ? `تم تحديث حالة العميل (${client.name}) إلى (${nextStatus}) مع إشعار وبريد فوري.` : `Client status updated to ${nextStatus}`);
  };

  const handleReset2FA = (client: ClientItem) => {
    dispatchDualActionNotification({
      title: "إعادة ضبط المصادقة الثنائية وكلمة المرور",
      message: `تم إرسال رابط تأميني مؤقت لإعادة ضبط المصادقة وكلمة المرور لحسابك.`,
      actionType: "RESET_2FA",
      targetEmail: client.email,
      targetName: client.name,
      targetRole: "Client",
    });

    showToast(isAr ? `تم إرسال رابط إعادة ضبط 2FA للعميل (${client.name}) بنجاح.` : `2FA reset link dispatched!`);
  };

  const handleDeleteClient = (client: ClientItem) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف العميل (${client.name}) نهائياً؟` : `Delete client ${client.name}?`)) {
      setClients(clients.filter((c) => c.id !== client.id));
      setSelectedClient(null);

      dispatchDualActionNotification({
        title: "حذف حساب العميل",
        message: `تم حذف حسابك نهائياً من قاعدة بيانات منصة رفيق بناءً على طلب إداري.`,
        actionType: "DELETE",
        targetEmail: client.email,
        targetName: client.name,
        targetRole: "Client",
      });

      showToast(isAr ? `تم حذف حساب العميل (${client.name}) بنجاح.` : `Client deleted.`);
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#3B82F6", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <UserIcon size={14} color="#3B82F6" />
            {isAr ? "قسم إدارة العملاء والمسافرين الدوليين والمحليين" : "Clients & Travelers Directory"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "العملاء والمسافرون 🎒" : "Clients & Travelers Directory"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "سجل كافة المسافرين، تاريخ الحجوزات، المدفوعات المحمية، وإدارة الأمان." : "Directory of all registered travelers, booking history, spent SAR, and account controls."}
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
            placeholder={isAr ? "بحث باسم العميل، البريد، الجوال أو الجنسية..." : "Search by name, email, phone or nationality..."}
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

      {/* Clients Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "العميل" : "Client Name"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الجنسية" : "Nationality"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحجوزات" : "Bookings"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "إجمالي الإنفاق" : "Total Spent"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "تاريخ التسجيل" : "Registered"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراءات التحكم السريع" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا يوجد عملاء يطابقون معايير البحث." : "No clients found."}
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{client.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>{client.email} • <span style={{ direction: "ltr", display: "inline-block" }}>{client.phone}</span></div>
                  </td>

                  <td style={{ padding: "14px 16px", fontWeight: 700 }}>{client.nationality}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700 }}>{client.bookingsCount} رحلات</td>
                  <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10B981" }}>{client.totalSpent}</td>
                  <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{client.registeredDate}</td>

                  <td style={{ padding: "14px 16px" }}>
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

                  <td style={{ padding: "14px 16px", textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <IconButton
                        variant="gold"
                        size="sm"
                        title={isAr ? "معاينة سجل الحساب والحجوزات" : "Inspect Client"}
                        icon={<EyeIcon size={15} />}
                        onClick={() => setSelectedClient(client)}
                      />

                      <IconButton
                        variant="outline"
                        size="sm"
                        title={isAr ? "إعادة ضبط المصادقة الثنائية 2FA" : "Reset 2FA"}
                        icon={<KeyIcon size={15} />}
                        onClick={() => handleReset2FA(client)}
                      />

                      <IconButton
                        variant={client.status === "نشط" ? "danger" : "secondary"}
                        size="sm"
                        title={client.status === "نشط" ? (isAr ? "حظر وتجميد الحساب" : "Ban Client") : (isAr ? "إلغاء الحظر وتنشيط الحساب" : "Activate Client")}
                        icon={<BanIcon size={15} />}
                        onClick={() => handleToggleStatus(client)}
                      />

                      <IconButton
                        variant="ghost"
                        size="sm"
                        title={isAr ? "حذف الحساب نهائياً" : "Delete Client"}
                        icon={<TrashIcon size={15} />}
                        onClick={() => handleDeleteClient(client)}
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

      {/* Client Detail Modal */}
      <Modal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title={selectedClient ? (isAr ? `ملف المسافر: ${selectedClient.name}` : `Traveler Profile: ${selectedClient.name}`) : ""}
        subtitle={selectedClient ? `${selectedClient.nationality} • ${selectedClient.email}` : ""}
        maxWidth="540px"
      >
        {selectedClient && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "البريد" : "Email"}</span><div style={{ fontSize: "13px", fontWeight: 700 }}>{selectedClient.email}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الجوال" : "Phone"}</span><div style={{ fontSize: "13px", fontWeight: 700, direction: "ltr", textAlign: "start" }}>{selectedClient.phone}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "إجمالي الإنفاق" : "Total Spent"}</span><div style={{ fontSize: "14px", fontWeight: 900, color: "#10B981" }}>{selectedClient.totalSpent}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "عدد الرحلات" : "Trips Booked"}</span><div style={{ fontSize: "13px", fontWeight: 700 }}>{selectedClient.bookingsCount}</div></div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Client Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إضافة عميل / مسافر جديد" : "Create New Client"}
        subtitle={isAr ? "تسجيل بيانات المسافر وتفعيل الحساب" : "Register traveler and activate account"}
        maxWidth="500px"
      >
        <form onSubmit={handleCreateClient}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم الكامل" : "Full Name"}</label>
              <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="عبد الله الخالدي" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="client@example.com" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الجوال" : "Phone"}</label>
                <input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="+966501122334" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الجنسية" : "Nationality"}</label>
              <select value={newNationality} onChange={(e) => setNewNationality(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}>
                <option value="سعودي 🇸🇦">سعودي 🇸🇦</option>
                <option value="خليجي 🇰🇼">خليجي 🇰🇼 🇦🇪 🇶🇦 🇧🇭 🇴🇲</option>
                <option value="بريطاني 🇬🇧">بريطاني 🇬🇧</option>
                <option value="أمريكي 🇺🇸">أمريكي 🇺🇸</option>
                <option value="فرنسي 🇫🇷">فرنسي 🇫🇷</option>
                <option value="ألماني 🇩🇪">ألماني 🇩🇪</option>
                <option value="صيني 🇨🇳">صيني 🇨🇳</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "إنشاء الحساب 🚀" : "Create Client"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
