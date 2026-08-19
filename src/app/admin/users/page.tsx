"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { AssignRoleModal, type AccountForRoleAssignment } from "@/components/domain/AssignRoleModal";
import {
  UserIcon,
  SearchIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  BanIcon,
  KeyIcon,
  EyeIcon,
} from "@/components/icons";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Client" | "Guide" | "Admin";
  roleTitleAr: string;
  roleKey: string;
  status: "نشط" | "محظور";
  has2fa: boolean;
  date: string;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: "usr-1",
    name: "عبد العزيز الشمري",
    email: "abdulaziz.alshammari@rafeeq.sa",
    phone: "+966551234567",
    role: "Guide",
    roleTitleAr: "مرشد معتمد",
    roleKey: "guide",
    status: "نشط",
    has2fa: true,
    date: "2026-06-10",
  },
  {
    id: "usr-2",
    name: "سارة محمد العتيبي",
    email: "sara.otaibi@example.com",
    phone: "+966554433221",
    role: "Client",
    roleTitleAr: "مسافر موثق",
    roleKey: "client",
    status: "نشط",
    has2fa: false,
    date: "2026-05-18",
  },
  {
    id: "usr-3",
    name: "نورة القحطاني",
    email: "noura.qahtani@rafeeq.sa",
    phone: "+966509988776",
    role: "Admin",
    roleTitleAr: "مشرفة اعتماد البرامج",
    roleKey: "program_reviewer",
    status: "نشط",
    has2fa: true,
    date: "2026-04-02",
  },
  {
    id: "usr-4",
    name: "Marc Dupont",
    email: "marc.dupont@voyage.fr",
    phone: "+33612345678",
    role: "Client",
    roleTitleAr: "مسافر دولي",
    roleKey: "client",
    status: "محظور",
    has2fa: false,
    date: "2026-08-01",
  },
];

const AVAILABLE_ROLES = [
  { id: "r-1", key: "super_admin", nameAr: "المدير العام الأعلى", nameEn: "Super Admin", isSystem: true, require2fa: true, usersCount: 2, permissionsCount: 48, description: "صلاحيات شاملة", permissions: ["all"] },
  { id: "r-2", key: "guide_approver", nameAr: "مدير اعتماد المرشدين", nameEn: "Guide Approver", isSystem: false, require2fa: true, usersCount: 4, permissionsCount: 14, description: "اعتماد المرشدين", permissions: [] },
  { id: "r-3", key: "program_reviewer", nameAr: "مشرف مراجعة البرامج", nameEn: "Program Reviewer", isSystem: false, require2fa: false, usersCount: 5, permissionsCount: 10, description: "مراجعة ونشر البرامج", permissions: [] },
];

export default function AdminUsersPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [assignTarget, setAssignTarget] = useState<AccountForRoleAssignment | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleToggleBan = (id: string, currentStatus: "نشط" | "محظور") => {
    const nextStatus = currentStatus === "نشط" ? "محظور" : "نشط";
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u))
    );
    showToast(isAr ? `تم تحديث حالة المستخدم إلى (${nextStatus}).` : `User status updated to ${nextStatus}.`);
  };

  const handleOpenAssign = (user: UserAccount) => {
    setAssignTarget({
      id: user.id,
      name: user.name,
      email: user.email,
      currentRoleTitleAr: user.roleTitleAr,
      currentRoleKey: user.roleKey,
    });
  };

  const handleRoleAssigned = (accountId: string, newRoleKey: string, roleTitleAr: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === accountId ? { ...u, roleKey: newRoleKey, roleTitleAr: roleTitleAr } : u
      )
    );
    showToast(isAr ? `تم تحديث دور الحساب إلى (${roleTitleAr}) بنجاح.` : `Role updated to ${roleTitleAr}.`);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

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
            <UserIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "دليل الحسابات والمستخدمين" : "Unified Users Directory"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "سجل المستخدمين والحسابات الموحد" : "Unified Users & Accounts Directory"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "إدارة حسابات المسافرين، المرشدين، والمشرفين، تجميد أو تنشيط الحسابات، وتعيين الأدوار والصلاحيات."
              : "Manage travelers, guides, and admins, suspend or activate accounts, and assign RBAC roles."}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ flex: "1 1 280px", position: "relative" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث باسم المستخدم، رقم الجوال، أو البريد..." : "Search user, phone or email..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", paddingInlineStart: "38px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={16} color="var(--color-text-secondary)" />
          </div>
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
        >
          <option value="ALL">{isAr ? "كافة أنواع الحسابات" : "All Roles"}</option>
          <option value="Client">{isAr ? "المسافرون" : "Travelers"}</option>
          <option value="Guide">{isAr ? "المرشدون" : "Tour Guides"}</option>
          <option value="Admin">{isAr ? "الإدارة والمشرفون" : "Admins"}</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="rafeeq-table-wrapper">
        <table className="rafeeq-table">
          <thead>
            <tr>
              <th>{isAr ? "المستخدم والبريد" : "User & Email"}</th>
              <th>{isAr ? "رقم الجوال" : "Phone"}</th>
              <th>{isAr ? "الدور والصلاحية" : "Role"}</th>
              <th>{isAr ? "الأمان 2FA" : "2FA"}</th>
              <th>{isAr ? "تاريخ التسجيل" : "Date"}</th>
              <th>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                  {isAr ? "لا يوجد مستخدمون يطابقون معايير البحث." : "No users found."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{user.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      {user.email}
                    </div>
                  </td>

                  <td style={{ direction: "ltr", textAlign: "start", fontFamily: "monospace" }}>{user.phone}</td>

                  <td>
                    <span style={{ fontWeight: 800, color: "var(--color-gold-heading)" }}>{user.roleTitleAr}</span>
                  </td>

                  <td>
                    <span style={{ fontSize: "11px", color: user.has2fa ? "#10B981" : "var(--color-text-secondary)", fontWeight: 700 }}>
                      {user.has2fa ? (isAr ? "مفعل" : "Enabled") : (isAr ? "غير مفعل" : "Disabled")}
                    </span>
                  </td>

                  <td style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{user.date}</td>

                  <td>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        background: user.status === "نشط" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: user.status === "نشط" ? "#10B981" : "#EF4444",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td style={{ textAlign: "end" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="rafeeq-action-btn"
                        title={isAr ? "عرض التفاصيل" : "View Details"}
                      >
                        <EyeIcon size={14} color="var(--color-gold-heading)" />
                        <span>{isAr ? "تفاصيل" : "Details"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenAssign(user)}
                        className="rafeeq-action-btn"
                        title={isAr ? "تعيين دور" : "Assign Role"}
                      >
                        <KeyIcon size={14} color="var(--color-text-secondary)" />
                        <span>{isAr ? "دور" : "Role"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBan(user.id, user.status)}
                        className="rafeeq-action-btn"
                        style={{
                          background: user.status === "نشط" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.15)",
                          borderColor: user.status === "نشط" ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.3)",
                          color: user.status === "نشط" ? "#EF4444" : "#10B981",
                        }}
                      >
                        <BanIcon size={14} color={user.status === "نشط" ? "#EF4444" : "#10B981"} />
                        <span>{user.status === "نشط" ? (isAr ? "تجميد" : "Suspend") : isAr ? "تنشيط" : "Activate"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: View User Details */}
      {selectedUser && (
        <Modal
          isOpen={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
          title={isAr ? "تفاصيل ملف المستخدم" : "User Profile Details"}
          subtitle={`${selectedUser.name} • ${selectedUser.email}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
            <div style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 900, margin: "0 0 4px 0" }}>{selectedUser.name}</h4>
              <span style={{ fontSize: "12px", color: "var(--color-gold-heading)", fontWeight: 800 }}>{selectedUser.roleTitleAr}</span>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "8px 0 0 0" }}>
                {isAr ? "البريد:" : "Email:"} {selectedUser.email} • {isAr ? "الجوال:" : "Phone:"} <span style={{ direction: "ltr", display: "inline-block" }}>{selectedUser.phone}</span>
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{isAr ? `تاريخ الانضمام: ${selectedUser.date}` : `Joined: ${selectedUser.date}`}</span>
              <Button variant="outline" size="sm" onClick={() => { setSelectedUser(null); handleOpenAssign(selectedUser); }}>
                <KeyIcon size={14} />
                <span>{isAr ? "تعيين دور وصلاحيات" : "Assign Role"}</span>
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <Button variant="primary" size="sm" onClick={() => setSelectedUser(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Assign Role Modal */}
      {assignTarget && (
        <AssignRoleModal
          isOpen={Boolean(assignTarget)}
          onClose={() => setAssignTarget(null)}
          targetAccount={assignTarget}
          availableRoles={AVAILABLE_ROLES}
          onRoleAssigned={handleRoleAssigned}
        />
      )}
    </div>
  );
}
