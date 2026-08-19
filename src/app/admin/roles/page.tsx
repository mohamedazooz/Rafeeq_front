"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { AssignRoleModal, type AccountForRoleAssignment } from "@/components/domain/AssignRoleModal";
import {
  ShieldIcon,
  ShieldCheckIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  UserIcon,
} from "@/components/icons";

interface RoleItem {
  id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  isSystem: boolean;
  require2fa: boolean;
  usersCount: number;
  permissionsCount: number;
  description: string;
  permissions: string[];
}

interface PermissionGroup {
  section: string;
  titleAr: string;
  titleEn: string;
  permissions: { key: string; nameAr: string; nameEn: string }[];
}

const INITIAL_ROLES: RoleItem[] = [
  {
    id: "r-1",
    key: "super_admin",
    nameAr: "المدير العام الأعلى",
    nameEn: "Super Admin",
    isSystem: true,
    require2fa: true,
    usersCount: 2,
    permissionsCount: 48,
    description: "صلاحيات كاملة وغير محدودة لجميع أنظمة وخدمات وإعدادات منصة رفيق.",
    permissions: ["all"],
  },
  {
    id: "r-2",
    key: "guide_approver",
    nameAr: "مدير اعتماد المرشدين",
    nameEn: "Guide Approver",
    isSystem: false,
    require2fa: true,
    usersCount: 4,
    permissionsCount: 14,
    description: "مراجعة واعتماد وثائق وترخيص المرشدين السياحيين وتفعيل الحسابات.",
    permissions: ["guides.view_applications", "guides.inspect_documents", "guides.approve_license", "guides.suspend"],
  },
  {
    id: "r-3",
    key: "program_reviewer",
    nameAr: "مشرف مراجعة البرامج",
    nameEn: "Program Reviewer",
    isSystem: false,
    require2fa: false,
    usersCount: 5,
    permissionsCount: 10,
    description: "تدقيق محتوى البرامج السياحية المسجلة ونشرها في الكتالوج العام.",
    permissions: ["programs.review_queue", "programs.publish", "programs.manage_categories"],
  },
  {
    id: "r-4",
    key: "dispute_specialist",
    nameAr: "مدير العمليات وغرف الوساطة",
    nameEn: "Operations & Mediation Specialist",
    isSystem: false,
    require2fa: true,
    usersCount: 3,
    permissionsCount: 18,
    description: "معالجة شكاوى الحجوزات وإدارة غرف الوساطة الثلاثية والنزاعات بين الطرفين.",
    permissions: ["bookings.override", "disputes.resolve", "disputes.issue_refund", "messages.create_group_mediation"],
  },
  {
    id: "r-5",
    key: "finance_officer",
    nameAr: "المحاسب المالي والـ Escrow",
    nameEn: "Finance Manager",
    isSystem: false,
    require2fa: true,
    usersCount: 2,
    permissionsCount: 12,
    description: "اعتماد التحويلات البنكية للمرشدين (IBAN)، متابعة المحافظ ورسومات العمولات.",
    permissions: ["finance.view_escrow", "finance.approve_payout", "finance.update_commission"],
  },
];

const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    section: "users",
    titleAr: "إدارة المستخدمين والحسابات",
    titleEn: "User & Account Management",
    permissions: [
      { key: "users.view", nameAr: "عرض حسابات المستخدمين", nameEn: "View Users" },
      { key: "users.update_status", nameAr: "تعديل حالة الحساب (تجميد/تفعيل)", nameEn: "Update Status" },
      { key: "users.manage_2fa", nameAr: "إعادة ضبط المصادقة الثنائية 2FA", nameEn: "Reset 2FA" },
      { key: "users.soft_delete", nameAr: "حذف وحجب الحسابات", nameEn: "Soft Delete" },
    ],
  },
  {
    section: "clients",
    titleAr: "إدارة المسافرين والعملاء",
    titleEn: "Clients & Travelers Management",
    permissions: [
      { key: "clients.view_directory", nameAr: "استعراض سجل المسافرين", nameEn: "View Travelers Directory" },
      { key: "clients.verify_identity", nameAr: "التحقق من الهوية وجواز السفر", nameEn: "Verify Passport & ID" },
      { key: "clients.emergency_access", nameAr: "الاطلاع على بيانات الطوارئ والصحة", nameEn: "Access Emergency & Health" },
      { key: "clients.suspend", nameAr: "حظر وتجميد حساب المسافر", nameEn: "Suspend Client" },
    ],
  },
  {
    section: "rbac",
    titleAr: "إدارة الأدوار والصلاحيات (RBAC)",
    titleEn: "Role-Based Access Control (RBAC)",
    permissions: [
      { key: "rbac.roles.view", nameAr: "استعراض مصفوفة الأدوار", nameEn: "View Roles" },
      { key: "rbac.roles.manage", nameAr: "إنشاء وتعديل الأدوار والصلاحيات", nameEn: "Manage Roles" },
      { key: "rbac.assign_roles", nameAr: "تعيين الأدوار لحسابات الإدارة", nameEn: "Assign Roles" },
    ],
  },
  {
    section: "guides",
    titleAr: "اعتماد وتوثيق المرشدين",
    titleEn: "Guides Accreditation & MOT",
    permissions: [
      { key: "guides.view_applications", nameAr: "استعراض طلبات الانضمام", nameEn: "View Applications" },
      { key: "guides.inspect_documents", nameAr: "معاينة الوثائق والهويات", nameEn: "Inspect Documents" },
      { key: "guides.approve_license", nameAr: "اعتماد وتفعيل ترخيص المرشد", nameEn: "Approve License" },
      { key: "guides.suspend", nameAr: "إيقاف وحظر حساب المرشد", nameEn: "Suspend Guide" },
    ],
  },
  {
    section: "programs",
    titleAr: "البرامج والكتالوج والوجهات",
    titleEn: "Programs, Catalog & Destinations",
    permissions: [
      { key: "programs.review_queue", nameAr: "مراجعة طابور البرامج", nameEn: "Review Queue" },
      { key: "programs.publish", nameAr: "نشر البرنامج في الكتالوج العام", nameEn: "Publish Program" },
      { key: "programs.manage_categories", nameAr: "إدارة الأقسام والوجهات", nameEn: "Manage Categories" },
    ],
  },
  {
    section: "bookings_disputes",
    titleAr: "الحجوزات والنزاعات والتسوية",
    titleEn: "Bookings & Dispute Resolution",
    permissions: [
      { key: "bookings.override", nameAr: "تغيير حالة الحجز استثنائياً", nameEn: "Override Booking" },
      { key: "disputes.resolve", nameAr: "اتخاذ القرار المالي وتسوية النزاع", nameEn: "Resolve Dispute" },
      { key: "disputes.issue_refund", nameAr: "إصدار أمر الاسترجاع المالي", nameEn: "Issue Refund" },
    ],
  },
  {
    section: "messaging_mediation",
    titleAr: "المراسلات وغرف الوساطة والشات",
    titleEn: "Messaging & Mediation Rooms",
    permissions: [
      { key: "messages.view_all", nameAr: "الرقابة على المحادثات الفورية", nameEn: "Monitor Messages" },
      { key: "messages.initiate_direct", nameAr: "مراسلة المرشد والعميل مباشرة", nameEn: "Direct Chat" },
      { key: "messages.create_group_mediation", nameAr: "إنشاء غرف الوساطة الثلاثية", nameEn: "Create Mediation Room" },
      { key: "messages.freeze_chat", nameAr: "تجميد المحادثات المخالفة", nameEn: "Freeze Chat" },
    ],
  },
  {
    section: "finance",
    titleAr: "المالية والحسابات البنكية والعمولات",
    titleEn: "Finance, Escrow & Commission",
    permissions: [
      { key: "finance.view_escrow", nameAr: "مراقبة أرصدة الـ Escrow", nameEn: "View Escrow" },
      { key: "finance.approve_payout", nameAr: "اعتماد التحويلات البنكية IBAN", nameEn: "Approve Payout" },
      { key: "finance.update_commission", nameAr: "تعديل نسبة عمولة المنصة", nameEn: "Update Commission" },
    ],
  },
  {
    section: "cms_audit_settings",
    titleAr: "المحتوى CMS والتدقيق وإعدادات النظام",
    titleEn: "CMS, Audit Trail & System Settings",
    permissions: [
      { key: "cms.pages_edit", nameAr: "إدارة صفحات المحتوى الثابتة", nameEn: "Manage CMS Pages" },
      { key: "audit.view_trail", nameAr: "استعراض سجل الرقابة والتدقيق", nameEn: "View Audit Trail" },
      { key: "settings.update_vat_taxes", nameAr: "تعديل إعدادات الضرائب والرسوم", nameEn: "Update VAT & Settings" },
    ],
  },
];

export default function AdminRolesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState<RoleItem>(INITIAL_ROLES[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Role Form State
  const [newRoleNameAr, setNewRoleNameAr] = useState("");
  const [newRoleNameEn, setNewRoleNameEn] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newRole2fa, setNewRole2fa] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Account selected for assignment
  const [assignAccount, setAssignAccount] = useState<AccountForRoleAssignment>({
    id: "adm-3",
    name: "نورة القحطاني",
    email: "noura.qahtani@rafeeq.sa",
    currentRoleTitleAr: "مشرفة اعتماد البرامج",
    currentRoleKey: "program_reviewer",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTogglePermission = (key: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleNameAr.trim()) return;

    const newRole: RoleItem = {
      id: `r-${Date.now()}`,
      key: newRoleNameEn.toLowerCase().replace(/\s+/g, "_") || `custom_role_${roles.length + 1}`,
      nameAr: newRoleNameAr,
      nameEn: newRoleNameEn || newRoleNameAr,
      isSystem: false,
      require2fa: newRole2fa,
      usersCount: 0,
      permissionsCount: selectedPermissions.length,
      description: newRoleDesc || "دور مخصص تم إنشاؤه عبر لوحة الحوكمة.",
      permissions: selectedPermissions,
    };

    setRoles([...roles, newRole]);
    setSelectedRole(newRole);
    setShowCreateModal(false);
    setNewRoleNameAr("");
    setNewRoleNameEn("");
    setNewRoleDesc("");
    setSelectedPermissions([]);
    showToast(isAr ? "تم إنشاء الدور الجديد ومصفوفة صلاحياته بنجاح." : "New role created successfully.");
  };

  const handleDeleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    if (selectedRole.id === id) {
      setSelectedRole(roles[0]);
    }
    showToast(isAr ? "تم حذف الدور المخصص بنجاح." : "Role deleted.");
  };

  const handleRoleAssigned = (accountId: string, newRoleKey: string, roleTitleAr: string) => {
    setRoles((prev) =>
      prev.map((r) => (r.key === newRoleKey ? { ...r, usersCount: r.usersCount + 1 } : r))
    );
    showToast(isAr ? `تم تعيين دور (${roleTitleAr}) للحساب بنجاح.` : `Role successfully assigned.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
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
            <ShieldIcon size={14} color="var(--color-gold-heading)" />
            <span>{isAr ? "مصفوفة الحوكمة والصلاحيات" : "RBAC Governance Matrix"}</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "الأدوار والصلاحيات (RBAC)" : "Roles & RBAC Matrix"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr
              ? "حوكمة الصلاحيات، تعيين الأدوار لحسابات الإدارة، والتحكم بالأمان والمصادقة الثنائية 2FA."
              : "Role governance, staff assignment, and 2FA security enforcement."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outline" size="md" onClick={() => setShowAssignModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <UserIcon size={16} />
            <span>{isAr ? "تعيين دور لحساب إداري" : "Assign Role to Account"}</span>
          </Button>
          <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <PlusIcon size={16} />
            <span>{isAr ? "إنشاء دور مخصص جديد" : "Create New Custom Role"}</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Roles List (Left) & Permissions Matrix (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "20px", alignItems: "start" }}>
        {/* Roles Sidebar */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-text-secondary)", marginBottom: "4px" }}>
            {isAr ? "الأدوار المعرفة بالنظام" : "System Defined Roles"}
          </div>

          {roles.map((r) => {
            const isSelected = selectedRole.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--color-gold-heading)" : "var(--color-border)",
                  background: isSelected ? "var(--color-bg-secondary)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 800, fontSize: "13px", color: "var(--color-text-primary)" }}>
                    {isAr ? r.nameAr : r.nameEn}
                  </span>
                  {r.isSystem && (
                    <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(200, 169, 110, 0.15)", color: "var(--color-gold-heading)", padding: "1px 6px", borderRadius: "4px" }}>
                      {isAr ? "نظامي" : "System"}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                  {r.usersCount} {isAr ? "مستخدمين" : "users"} • {r.permissions.includes("all") ? (isAr ? "صلاحيات شاملة" : "Full Access") : `${r.permissions.length} ${isAr ? "صلاحيات" : "permissions"}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Role Detail & Permissions Matrix */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Header of selected role */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-text-primary)" }}>
                  {isAr ? selectedRole.nameAr : selectedRole.nameEn}
                </h2>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-gold-heading)", background: "var(--color-bg-secondary)", padding: "2px 8px", borderRadius: "6px" }}>
                  {selectedRole.key}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                {selectedRole.description}
              </p>
            </div>

            {!selectedRole.isSystem && (
              <Button variant="outline" size="sm" onClick={() => handleDeleteRole(selectedRole.id)} style={{ borderColor: "#EF4444", color: "#EF4444" }}>
                <TrashIcon size={14} />
                <span>{isAr ? "حذف الدور" : "Delete Role"}</span>
              </Button>
            )}
          </div>

          {/* Permissions Matrix */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: "var(--color-gold-heading)" }}>
              {isAr ? "مصفوفة الصلاحيات الممنوحة لهذا الدور:" : "Granted Permissions Matrix:"}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {PERMISSION_GROUPS.map((group) => (
                <div
                  key={group.section}
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    padding: "14px",
                  }}
                >
                  <h4 style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "10px" }}>
                    {isAr ? group.titleAr : group.titleEn}
                  </h4>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {group.permissions.map((p) => {
                      const isGranted = selectedRole.permissions.includes("all") || selectedRole.permissions.includes(p.key);
                      return (
                        <div
                          key={p.key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "11px",
                            color: isGranted ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                          }}
                        >
                          <span style={{ color: isGranted ? "#10B981" : "var(--color-border)" }}>
                            {isGranted ? "✓" : "○"}
                          </span>
                          <span style={{ fontWeight: isGranted ? 700 : 400 }}>{isAr ? p.nameAr : p.nameEn}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Custom Role Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إنشاء دور مخصص جديد" : "Create New Custom Role"}
      >
        <form onSubmit={handleCreateRole} style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الدور بالعربية" : "Role Name (Arabic)"}</label>
            <input type="text" required value={newRoleNameAr} onChange={(e) => setNewRoleNameAr(e.target.value)} placeholder="مشرف الحجوزات الميدانية" style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الدور بالإنجليزية (مفتاح الدور)" : "Role Key (English)"}</label>
            <input type="text" value={newRoleNameEn} onChange={(e) => setNewRoleNameEn(e.target.value)} placeholder="Field Bookings Supervisor" style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "الوصف الوظيفي" : "Role Description"}</label>
            <textarea rows={2} value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} placeholder="متابعة الحجوزات والعمليات الميدانية..." style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>{isAr ? "تحديد الصلاحيات الممنوحة:" : "Select Granted Permissions:"}</label>
            <div style={{ maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px", background: "var(--color-bg-secondary)", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
              {PERMISSION_GROUPS.flatMap((g) => g.permissions).map((p) => {
                const isSelected = selectedPermissions.includes(p.key);
                return (
                  <label key={p.key} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "11px" }}>
                    <input type="checkbox" checked={isSelected} onChange={() => handleTogglePermission(p.key)} />
                    <span>{isAr ? p.nameAr : p.nameEn} ({p.key})</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="sm" type="submit">{isAr ? "إنشاء وحفظ الدور" : "Save Role"}</Button>
          </div>
        </form>
      </Modal>

      {/* Assign Role Modal */}
      <AssignRoleModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        targetAccount={assignAccount}
        availableRoles={roles}
        onRoleAssigned={handleRoleAssigned}
      />
    </div>
  );
}
