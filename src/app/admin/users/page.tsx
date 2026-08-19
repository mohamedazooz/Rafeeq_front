"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { AssignRoleModal, type AccountForRoleAssignment } from "@/components/domain/AssignRoleModal";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { adminService } from "@/features/admin-governance/services/admin.service";
import {
  UsersIcon,
  SearchIcon,
  EyeIcon,
  BanIcon,
  ShieldCheckIcon,
  KeyIcon,
} from "@/components/icons";

interface UserItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "Guide" | "Client" | "Admin";
  roleKey: string;
  roleTitleAr: string;
  status: "نشط" | "معلق" | "محظور";
  isApproved: boolean;
  date: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: "usr-1", name: "عبد العزيز فهد الشمري", phone: "+966551234567", email: "abdulaziz.alshammari@rafeeq.sa", role: "Guide", roleKey: "guide_verified", roleTitleAr: "مرشد سياحي معتمد", status: "نشط", isApproved: true, date: "2026-08-01" },
  { id: "usr-2", name: "سعود فهد الدوسري", phone: "+966509876543", email: "saud.aldosari@example.com", role: "Guide", roleKey: "guide_pending", roleTitleAr: "مرشد قيد التوثيق", status: "معلق", isApproved: false, date: "2026-08-16" },
  { id: "usr-3", name: "عبد الله الخالدي", phone: "+966501122334", email: "abdullah.khaldi@example.com", role: "Client", roleKey: "client_traveler", roleTitleAr: "مسافر مستكشف", status: "نشط", isApproved: true, date: "2026-08-10" },
  { id: "usr-4", name: "سارة محمد العتيبي", phone: "+966554433221", email: "sara.otaibi@example.com", role: "Client", roleKey: "client_traveler", roleTitleAr: "مسافرة مستكشفة", status: "نشط", isApproved: true, date: "2026-08-12" },
  { id: "usr-5", name: "خالد سعيد الشهري", phone: "+966567890123", email: "khaled.shehri@example.com", role: "Guide", roleKey: "guide_verified", roleTitleAr: "مرشد سياحي", status: "محظور", isApproved: false, date: "2026-07-20" },
  { id: "usr-6", name: "فهد العريفي", phone: "+966500000001", email: "fahad.arifi@rafeeq.sa", role: "Admin", roleKey: "super_admin", roleTitleAr: "المدير العام الأعلى", status: "نشط", isApproved: true, date: "2026-01-01" },
];

export default function AdminUsersPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [selectedForAssign, setSelectedForAssign] = useState<AccountForRoleAssignment | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredUsers = users.filter(
    (u) => roleFilter === "ALL" || u.role === roleFilter
  );

  const handleToggleBan = async (id: string, currentStatus: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = currentStatus === "محظور" ? "نشط" : "محظور";
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));

    try {
      if (newStatus === "محظور") {
        await adminService.suspendUser(id, "مخالفة معايير المنصة");
        warning(`تم تجميد حساب (${user.name})`);
      } else {
        await adminService.unsuspendUser(id);
        success(`تم إعادة تنشيط حساب (${user.name}) بنجاح`);
      }
    } catch {
      // Handled
    }
  };

  const handleOpenAssign = (user: UserItem) => {
    setSelectedForAssign({
      id: user.id,
      name: user.name,
      email: user.email,
      currentRoleTitleAr: user.roleTitleAr,
      currentRoleKey: user.roleKey,
    });
    setShowAssignModal(true);
  };

  const handleAssignSuccess = (accountId: string, newRoleKey: string, roleTitleAr: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === accountId
          ? {
              ...u,
              roleKey: newRoleKey,
              roleTitleAr,
              role: newRoleKey.includes("admin") ? "Admin" : newRoleKey.includes("guide") ? "Guide" : "Client",
            }
          : u
      )
    );
    showToast(isAr ? `تم تحديث دور الحساب إلى (${roleTitleAr}) بنجاح! 🛡️✓` : "Role updated.");
  };

  const showToast = (msg: string) => {
    success(msg);
  };

  const columns: DataTableColumn<UserItem>[] = [
    {
      key: "name",
      headerAr: "اسم المستخدم والبريد",
      headerEn: "User Name & Email",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "13px", display: "block" }}>{row.name}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.email} • {row.phone}</span>
        </div>
      ),
    },
    {
      key: "role",
      headerAr: "الدور والصلاحية",
      headerEn: "Role",
      render: (row) => (
        <span
          style={{
            background: row.role === "Admin" ? "rgba(200, 169, 110, 0.15)" : row.role === "Guide" ? "rgba(16, 185, 129, 0.15)" : "rgba(59, 130, 246, 0.15)",
            color: row.role === "Admin" ? "var(--color-gold-heading)" : row.role === "Guide" ? "#10B981" : "#3B82F6",
            padding: "2px 8px",
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
      key: "status",
      headerAr: "حالة الحساب",
      headerEn: "Status",
      render: (row) => (
        <span
          style={{
            background: row.status === "نشط" ? "rgba(16, 185, 129, 0.12)" : row.status === "معلق" ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)",
            color: row.status === "نشط" ? "#10B981" : row.status === "معلق" ? "#F59E0B" : "#EF4444",
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
      key: "date",
      headerAr: "تاريخ الانضمام",
      headerEn: "Joined Date",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{row.date}</span>,
    },
    {
      key: "actions",
      headerAr: "الإجراءات",
      headerEn: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <Button variant="outline" size="sm" onClick={() => setSelectedUser(row)}>
            <EyeIcon size={14} />
            <span>تفاصيل</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={() => handleOpenAssign(row)}>
            <KeyIcon size={14} />
            <span>تعيين دور</span>
          </Button>

          <Button variant={row.status === "محظور" ? "primary" : "ghost"} size="sm" onClick={() => handleToggleBan(row.id, row.status)}>
            <BanIcon size={14} />
            <span>{row.status === "محظور" ? "إلغاء التجميد" : "تجميد"}</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          سجل المستخدمين والحسابات الموحد 👥
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          إدارة حسابات المسافرين، المرشدين، والمشرفين، تجميد أو تنشيط الحسابات، وتعيين الأدوار والصلاحيات
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        searchPlaceholder="بحث باسم المستخدم، رقم الجوال، أو البريد..."
        searchFilter={(row, query) =>
          row.name.toLowerCase().includes(query) ||
          row.phone.includes(query) ||
          row.email.toLowerCase().includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={roleFilter === "ALL" ? "primary" : "ghost"} size="sm" onClick={() => setRoleFilter("ALL")}>
              الكل ({users.length})
            </Button>
            <Button variant={roleFilter === "Client" ? "primary" : "ghost"} size="sm" onClick={() => setRoleFilter("Client")}>
              المسافرون
            </Button>
            <Button variant={roleFilter === "Guide" ? "primary" : "ghost"} size="sm" onClick={() => setRoleFilter("Guide")}>
              المرشدون
            </Button>
            <Button variant={roleFilter === "Admin" ? "primary" : "ghost"} size="sm" onClick={() => setRoleFilter("Admin")}>
              الإدارة
            </Button>
          </div>
        }
      />

      {/* Modal: View User Details */}
      <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} title="تفاصيل ملف المستخدم" maxWidth="500px">
        {selectedUser && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 900, margin: "0 0 4px 0" }}>{selectedUser.name}</h4>
              <span style={{ fontSize: "12px", color: "var(--color-gold-heading)", fontWeight: 800 }}>{selectedUser.roleTitleAr}</span>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "8px 0 0 0" }}>
                البريد: {selectedUser.email} • الجوال: {selectedUser.phone}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>تاريخ الانضمام: {selectedUser.date}</span>
              <Button variant="outline" size="sm" onClick={() => handleOpenAssign(selectedUser)}>
                <KeyIcon size={14} />
                <span>تعيين دور وصلاحيات</span>
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button variant="primary" size="md" onClick={() => setSelectedUser(null)}>إغلاق</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Assign Role */}
      <AssignRoleModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        account={selectedForAssign}
        onAssignSuccess={handleAssignSuccess}
      />
    </div>
  );
}
