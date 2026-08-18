"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  ShieldIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  BanIcon,
  KeyIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@/components/icons";

interface AdminStaffItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleTitleAr: string;
  roleKey: "super_admin" | "finance_officer" | "content_moderator" | "dispute_specialist" | "support_lead";
  status: "نشط" | "معطل";
  lastLogin: string;
  twoFactorEnabled: boolean;
}

const INITIAL_ADMINS: AdminStaffItem[] = [
  {
    id: "adm-1",
    name: "فهد العريفي",
    email: "fahad.arifi@rafeeq.sa",
    phone: "+966500000001",
    roleTitleAr: "مدير النظام الأعلى (Super Admin)",
    roleKey: "super_admin",
    status: "نشط",
    lastLogin: "منذ 10 دقائق",
    twoFactorEnabled: true,
  },
  {
    id: "adm-2",
    name: "سلطان المنصور",
    email: "sultan.mansoor@rafeeq.sa",
    phone: "+966500000002",
    roleTitleAr: "مدير الحسابات والـ Escrow (Finance Officer)",
    roleKey: "finance_officer",
    status: "نشط",
    lastLogin: "منذ ساعة",
    twoFactorEnabled: true,
  },
  {
    id: "adm-3",
    name: "نورة القحطاني",
    email: "noura.qahtani@rafeeq.sa",
    phone: "+966500000003",
    roleTitleAr: "مشرفة اعتماد البرامج والمرشدين (Content Lead)",
    roleKey: "content_moderator",
    status: "نشط",
    lastLogin: "منذ 4 ساعات",
    twoFactorEnabled: true,
  },
  {
    id: "adm-4",
    name: "تركي السبيعي",
    email: "turki.subaie@rafeeq.sa",
    phone: "+966500000004",
    roleTitleAr: "أخصائي فض النزاعات والتسويات (Dispute Specialist)",
    roleKey: "dispute_specialist",
    status: "معطل",
    lastLogin: "منذ 3 أيام",
    twoFactorEnabled: false,
  },
];

export default function AdminStaffPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [admins, setAdmins] = useState<AdminStaffItem[]>(INITIAL_ADMINS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<AdminStaffItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Admin form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<AdminStaffItem["roleKey"]>("content_moderator");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredAdmins = admins.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.roleTitleAr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const roleLabels: Record<AdminStaffItem["roleKey"], string> = {
      super_admin: "مدير النظام الأعلى (Super Admin)",
      finance_officer: "مدير الحسابات والـ Escrow (Finance Officer)",
      content_moderator: "مشرفة اعتماد البرامج والمرشدين (Content Lead)",
      dispute_specialist: "أخصائي فض النزاعات والتسويات (Dispute Specialist)",
      support_lead: "مشرف الدعم الفني والمراسلات (Support Lead)",
    };

    const newAdmin: AdminStaffItem = {
      id: `adm-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      roleTitleAr: roleLabels[newRole],
      roleKey: newRole,
      status: "نشط",
      lastLogin: "لم يسجل بعد",
      twoFactorEnabled: true,
    };

    setAdmins([newAdmin, ...admins]);
    setShowCreateModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");

    dispatchDualActionNotification({
      title: "تعيين مسؤول إداري جديد في فريق العمل",
      message: `تم إنشاء حسابك الإداري بدور (${newAdmin.roleTitleAr}) في منصة رفيق.`,
      actionType: "CREATE",
      targetEmail: newAdmin.email,
      targetName: newAdmin.name,
      targetRole: "Admin",
    });

    showToast(isAr ? `تم تعيين المسؤول (${newAdmin.name}) وإرسال بيانات الدخول وتأمين 2FA!` : `Admin user created.`);
  };

  const handleToggleStatus = (admin: AdminStaffItem) => {
    const nextStatus = admin.status === "نشط" ? "معطل" : "نشط";
    setAdmins(admins.map((a) => (a.id === admin.id ? { ...a, status: nextStatus } : a)));

    dispatchDualActionNotification({
      title: nextStatus === "معطل" ? "تعطيل صلاحيات الدخول الإداري" : "إعادة تفعيل الحساب الإداري",
      message: `تم تحديث حالة حسابك الإداري إلى (${nextStatus}).`,
      actionType: "BAN",
      targetEmail: admin.email,
      targetName: admin.name,
      targetRole: "Admin",
    });

    showToast(isAr ? `تم تعديل حالة حساب المسؤول (${admin.name}) إلى (${nextStatus}).` : `Admin status updated.`);
  };

  const handleReset2FA = (admin: AdminStaffItem) => {
    dispatchDualActionNotification({
      title: "إعادة ضبط مفتاح المصادقة الثنائية 2FA للمسؤول",
      message: `تم إنشاء جلسة تأمينية جديدة لإعادة ضبط مفاتيح المصادقة الثنائية (Google Authenticator).`,
      actionType: "RESET_2FA",
      targetEmail: admin.email,
      targetName: admin.name,
      targetRole: "Admin",
    });

    showToast(isAr ? `تم إرسال رابط تأمين 2FA للمسؤول (${admin.name}) بنجاح.` : `2FA reset link dispatched!`);
  };

  const handleDeleteAdmin = (admin: AdminStaffItem) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف المسؤول (${admin.name}) وسحب كافة الصلاحيات؟` : `Delete admin ${admin.name}?`)) {
      setAdmins(admins.filter((a) => a.id !== admin.id));
      setSelectedAdmin(null);

      dispatchDualActionNotification({
        title: "سحب الصلاحيات وحذف الحساب الإداري",
        message: `تم سحب الصلاحيات وحذف حساب المسؤول (${admin.name}) من إدارة المنصة.`,
        actionType: "DELETE",
        targetEmail: admin.email,
        targetName: admin.name,
        targetRole: "Admin",
      });

      showToast(isAr ? `تم حذف حساب المسؤول (${admin.name}) بنجاح.` : `Admin deleted.`);
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
            <ShieldIcon size={14} color="var(--color-gold-heading)" />
            {isAr ? "قسم إدارة فريق الإدارة والمسؤولين والمشرفين" : "Admin Team & Staff Directory"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "فريق الإدارة والمسؤولون 🛡️" : "Admin Team & Staff"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "إدارة كاملة للمسؤولين، الأدوار الإدارية، تأمين 2FA، والتحكم بصلاحيات الوصول." : "Manage internal team members, assigned RBAC roles, 2FA enforcement, and access audits."}
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <PlusIcon size={16} />
          <span>{isAr ? "تعيين مسؤول إداري جديد" : "Add Admin Staff"}</span>
        </Button>
      </div>

      {/* Search */}
      <div style={{ background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)", display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث باسم المسؤول، البريد أو المسمى الوظيفي..." : "Search by admin name, email or role..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المسؤول" : "Admin Name"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الدور والصلاحيات" : "Role Title"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "تأمين 2FA" : "2FA Security"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "آخر تسجيل دخول" : "Last Login"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراءات التحكم" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{admin.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>{admin.email}</div>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontWeight: 700, color: "var(--color-gold-heading)", fontSize: "12px" }}>{admin.roleTitleAr}</span>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: admin.twoFactorEnabled ? "#10B981" : "#EF4444", fontWeight: 700, fontSize: "12px" }}>
                    {admin.twoFactorEnabled ? "مفعل ✓" : "غير مفعل ✕"}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{admin.lastLogin}</td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: admin.status === "نشط" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: admin.status === "نشط" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {admin.status}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    <IconButton
                      variant="gold"
                      size="sm"
                      title={isAr ? "معاينة الملف وسجل العمليات" : "Inspect Admin"}
                      icon={<EyeIcon size={15} />}
                      onClick={() => setSelectedAdmin(admin)}
                    />

                    <IconButton
                      variant="outline"
                      size="sm"
                      title={isAr ? "إعادة ضبط مفتاح 2FA" : "Reset 2FA"}
                      icon={<KeyIcon size={15} />}
                      onClick={() => handleReset2FA(admin)}
                    />

                    <IconButton
                      variant={admin.status === "نشط" ? "danger" : "secondary"}
                      size="sm"
                      title={admin.status === "نشط" ? (isAr ? "تعطيل الحساب" : "Deactivate Admin") : (isAr ? "إعادة تفعيل الحساب" : "Activate Admin")}
                      icon={<BanIcon size={15} />}
                      onClick={() => handleToggleStatus(admin)}
                    />

                    <IconButton
                      variant="ghost"
                      size="sm"
                      title={isAr ? "حذف المسؤول وسحب الصلاحيات" : "Delete Admin"}
                      icon={<TrashIcon size={15} />}
                      onClick={() => handleDeleteAdmin(admin)}
                      style={{ color: "#EF4444" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Detail Modal */}
      <Modal
        isOpen={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        title={selectedAdmin ? (isAr ? `بيانات المسؤول الإداري: ${selectedAdmin.name}` : `Admin Staff: ${selectedAdmin.name}`) : ""}
        subtitle={selectedAdmin ? `${selectedAdmin.roleTitleAr} • ${selectedAdmin.email}` : ""}
        maxWidth="540px"
      >
        {selectedAdmin && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "البريد الإداري" : "Email"}</span><div style={{ fontSize: "13px", fontWeight: 700 }}>{selectedAdmin.email}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "رقم الجوال" : "Phone"}</span><div style={{ fontSize: "13px", fontWeight: 700, direction: "ltr", textAlign: "start" }}>{selectedAdmin.phone}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "الدور المعين" : "Assigned Role"}</span><div style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)" }}>{selectedAdmin.roleTitleAr}</div></div>
              <div><span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "المصادقة الثنائية" : "2FA"}</span><div style={{ fontSize: "13px", fontWeight: 800, color: "#10B981" }}>مفعلة وتعمل ✓</div></div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedAdmin(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Admin Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "تعيين عضو جديد في فريق الإدارة" : "Add Admin Staff"}
        subtitle={isAr ? "تسجيل الحساب وتعيين الدور والصلاحيات" : "Assign admin role and permissions"}
        maxWidth="500px"
      >
        <form onSubmit={handleCreateAdmin}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الاسم الكامل" : "Full Name"}</label>
              <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="سلطان المنصور" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "البريد الإداري (@rafeeq.sa)" : "Official Email"}</label>
                <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="sultan@rafeeq.sa" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "رقم الجوال" : "Phone"}</label>
                <input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="+966500000002" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الدور الإداري والصلاحيات" : "Admin Role & Scope"}</label>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value as AdminStaffItem["roleKey"])} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}>
                <option value="content_moderator">مشرفة اعتماد البرامج والمرشدين (Content Lead)</option>
                <option value="finance_officer">مدير الحسابات والـ Escrow (Finance Officer)</option>
                <option value="dispute_specialist">أخصائي فض النزاعات والتسويات (Dispute Specialist)</option>
                <option value="support_lead">مشرف الدعم الفني والمراسلات (Support Lead)</option>
                <option value="super_admin">مدير النظام الأعلى (Super Admin)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "تأكيد وتعيين المسؤول 🛡️" : "Assign Admin"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
