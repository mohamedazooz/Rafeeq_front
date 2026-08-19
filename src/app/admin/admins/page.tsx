"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { AssignRoleModal, type AccountForRoleAssignment } from "@/components/domain/AssignRoleModal";
import { useLanguage } from "@/lib/language-provider";
import {
  ShieldIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  BanIcon,
  KeyIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/icons";

interface AdminStaffItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleTitleAr: string;
  roleKey: string;
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
    roleTitleAr: "المدير العام الأعلى (Super Admin)",
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
    roleTitleAr: "مدير الحسابات والـ Escrow (Finance Manager)",
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
    roleTitleAr: "مشرفة اعتماد البرامج والمرشدين (Guide Approver)",
    roleKey: "guide_approver",
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
  const [selectedAdminForAssign, setSelectedAdminForAssign] = useState<AccountForRoleAssignment | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Admin Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRoleKey, setNewRoleKey] = useState("guide_approver");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleOpenAssign = (admin: AdminStaffItem) => {
    setSelectedAdminForAssign({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      currentRoleTitleAr: admin.roleTitleAr,
      currentRoleKey: admin.roleKey,
    });
    setShowAssignModal(true);
  };

  const handleAssignSuccess = (accountId: string, newRoleKey: string, roleTitleAr: string) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, roleKey: newRoleKey, roleTitleAr } : a))
    );
    showToast(isAr ? `تم تحديث دور المشرف بنجاح إلى: (${roleTitleAr}) 🛡️✓` : "Role updated successfully.");
  };

  const handleToggleStatus = (id: string) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "نشط" ? "معطل" : "نشط" } : a
      )
    );
    showToast(isAr ? "تم تحديث حالة حساب المشرف!" : "Admin status updated.");
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const roleTitles: Record<string, string> = {
      super_admin: "المدير العام الأعلى (Super Admin)",
      guide_approver: "مدير اعتماد المرشدين وتراخيص السياحة",
      program_reviewer: "مشرف مراجعة ونشر البرامج السياحية",
      dispute_specialist: "أخصائي فض النزاعات والتسويات المالية",
      finance_officer: "المحاسب المالي والـ Escrow",
    };

    const newAdmin: AdminStaffItem = {
      id: `adm-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone || "+966500000000",
      roleKey: newRoleKey,
      roleTitleAr: roleTitles[newRoleKey] || "مشرف نظام",
      status: "نشط",
      lastLogin: "لم يسجل بعد",
      twoFactorEnabled: true,
    };

    setAdmins([...admins, newAdmin]);
    setShowCreateModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    showToast(isAr ? "تم إضافة المشرف الجديد وتعيين دوره بنجاح! 👤✓" : "New admin created.");
  };

  const columns: DataTableColumn<AdminStaffItem>[] = [
    {
      key: "name",
      headerAr: "اسم المشرف والبريد",
      headerEn: "Staff Name & Email",
      render: (row) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldIcon size={16} color="var(--color-gold-heading)" />
            <span style={{ fontWeight: 800, fontSize: "13px" }}>{row.name}</span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.email} • {row.phone}</span>
        </div>
      ),
    },
    {
      key: "role",
      headerAr: "الدور والصلاحية (RBAC)",
      headerEn: "Assigned Role",
      render: (row) => (
        <span
          style={{
            background: "rgba(200, 169, 110, 0.12)",
            color: "var(--color-gold-heading)",
            border: "1px solid rgba(200, 169, 110, 0.3)",
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.roleTitleAr}
        </span>
      ),
    },
    {
      key: "2fa",
      headerAr: "حالة 2FA والأمان",
      headerEn: "Security & 2FA",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: row.twoFactorEnabled ? "#10B981" : "#EF4444" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: row.twoFactorEnabled ? "#10B981" : "#EF4444" }}>
            {row.twoFactorEnabled ? "مفعل 🔒" : "غير مفعل"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      headerAr: "حالة الحساب",
      headerEn: "Account Status",
      render: (row) => (
        <span
          style={{
            background: row.status === "نشط" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
            color: row.status === "نشط" ? "#10B981" : "#EF4444",
            padding: "3px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "lastLogin",
      headerAr: "آخر نشاط",
      headerEn: "Last Active",
      render: (row) => <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.lastLogin}</span>,
    },
    {
      key: "actions",
      headerAr: "الإجراءات والتعيين",
      headerEn: "Actions & Assign",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Button variant="outline" size="sm" onClick={() => handleOpenAssign(row)}>
            <KeyIcon size={13} />
            <span>تعيين دور</span>
          </Button>
          <Button variant={row.status === "نشط" ? "ghost" : "secondary"} size="sm" onClick={() => handleToggleStatus(row.id)}>
            <BanIcon size={13} />
            <span>{row.status === "نشط" ? "تعطيل" : "تفعيل"}</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
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
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            فريق الإدارة والمسؤولون (Staff & Roles) 👥
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            إدارة حسابات المشرفين، تدوير الصلاحيات، وتعيين الأدوار للحسابات بسهولة
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)}>
          <PlusIcon size={16} />
          <span>إضافة مشرف جديد</span>
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        data={admins}
        columns={columns}
        searchPlaceholder="بحث باسم المشرف، البريد، أو الدور..."
        searchFilter={(row, query) =>
          row.name.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query) ||
          row.roleTitleAr.includes(query)
        }
      />

      {/* Modal: Create Admin */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إضافة حساب مشرف إداري جديد" maxWidth="500px">
        <form onSubmit={handleCreateAdmin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم الكامل</label>
            <input
              type="text"
              placeholder="مثال: عبد الله السديري"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>البريد الإلكتروني المهني (@rafeeq.sa)</label>
            <input
              type="email"
              placeholder="name@rafeeq.sa"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>رقم الجوال</label>
            <input
              type="tel"
              placeholder="+9665XXXXXXXX"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الدور والصلاحيات الابتدائية</label>
            <select
              value={newRoleKey}
              onChange={(e) => setNewRoleKey(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}
            >
              <option value="guide_approver">مدير اعتماد المرشدين وتراخيص السياحة</option>
              <option value="program_reviewer">مشرف مراجعة ونشر البرامج السياحية</option>
              <option value="dispute_specialist">أخصائي فض النزاعات والتسويات المالية</option>
              <option value="finance_officer">المحاسب المالي والـ Escrow</option>
              <option value="super_admin">المدير العام الأعلى (Super Admin)</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowCreateModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">إنشاء الحساب وتفعيل الصلاحيات</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Assign Role to Account */}
      <AssignRoleModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        account={selectedAdminForAssign}
        onAssignSuccess={handleAssignSuccess}
      />
    </div>
  );
}
