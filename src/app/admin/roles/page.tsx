"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { AssignRoleModal, type AccountForRoleAssignment } from "@/components/domain/AssignRoleModal";
import {
  ShieldIcon,
  ShieldCheckIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  KeyIcon,
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
    nameAr: "مدير العمليات والنزاعات",
    nameEn: "Dispute Specialist",
    isSystem: false,
    require2fa: true,
    usersCount: 3,
    permissionsCount: 18,
    description: "معالجة شكاوى الحجوزات وإدارات الاستردادات المالية والنزاعات بين الطرفين.",
    permissions: ["bookings.override", "disputes.resolve", "disputes.issue_refund"],
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
    permissions: [
      { key: "users.view", nameAr: "عرض حسابات المستخدمين", nameEn: "View Users" },
      { key: "users.update_status", nameAr: "تعديل حالة الحساب (تجميد/تفعيل)", nameEn: "Update Status" },
      { key: "users.manage_2fa", nameAr: "إعادة ضبط المصادقة الثنائية 2FA", nameEn: "Reset 2FA" },
      { key: "users.soft_delete", nameAr: "حذف وحجب الحسابات", nameEn: "Soft Delete" },
    ],
  },
  {
    section: "rbac",
    titleAr: "إدارة الأدوار والصلاحيات (RBAC)",
    permissions: [
      { key: "rbac.roles.view", nameAr: "استعراض مصفوفة الأدوار", nameEn: "View Roles" },
      { key: "rbac.roles.manage", nameAr: "إنشاء وتعديل الأدوار والصلاحيات", nameEn: "Manage Roles" },
      { key: "rbac.assign_roles", nameAr: "تعيين الأدوار لحسابات الإدارة", nameEn: "Assign Roles" },
    ],
  },
  {
    section: "guides",
    titleAr: "اعتماد وتوثيق المرشدين",
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
    permissions: [
      { key: "programs.review_queue", nameAr: "مراجعة طابور البرامج", nameEn: "Review Queue" },
      { key: "programs.publish", nameAr: "نشر البرنامج في الكتالوج العام", nameEn: "Publish Program" },
      { key: "programs.manage_categories", nameAr: "إدارة الأقسام والوجهات", nameEn: "Manage Categories" },
    ],
  },
  {
    section: "bookings_disputes",
    titleAr: "الحجوزات والنزاعات والتسوية",
    permissions: [
      { key: "bookings.override", nameAr: "تغيير حالة الحجز استثنائياً", nameEn: "Override Booking" },
      { key: "disputes.resolve", nameAr: "اتخاذ القرار المالي وتسوية النزاع", nameEn: "Resolve Dispute" },
      { key: "disputes.issue_refund", nameAr: "إصدار أمر الاسترجاع المالي", nameEn: "Issue Refund" },
    ],
  },
  {
    section: "finance",
    titleAr: "المالية والحسابات البنكية والعمولات",
    permissions: [
      { key: "finance.view_escrow", nameAr: "مراقبة أرصدة الـ Escrow", nameEn: "View Escrow" },
      { key: "finance.approve_payout", nameAr: "اعتماد التحويلات البنكية IBAN", nameEn: "Approve Payout" },
      { key: "finance.update_commission", nameAr: "تعديل نسبة عمولة المنصة", nameEn: "Update Commission" },
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
    showToast(isAr ? "تم إنشاء الدور الجديد ومصفوفة صلاحياته بنجاح! 🛡️✓" : "New role created successfully.");
  };

  const handleDeleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    if (selectedRole.id === id) {
      setSelectedRole(roles[0]);
    }
    showToast(isAr ? "تم حذف الدور المخصص بنجاح!" : "Role deleted.");
  };

  const handleRoleAssigned = (accountId: string, newRoleKey: string, roleTitleAr: string) => {
    setRoles((prev) =>
      prev.map((r) => (r.key === newRoleKey ? { ...r, usersCount: r.usersCount + 1 } : r))
    );
    showToast(isAr ? `تم تعيين دور (${roleTitleAr}) للحساب بنجاح! 👤✓` : `Role successfully assigned.`);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
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
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            الأدوار والصلاحيات الحصريّة (RBAC Matrix) 🛡️
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            حوكمة الصلاحيات، تعيين الأدوار لحسابات الإدارة، والتحكم بالأمان والمصادقة 2FA
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outline" size="md" onClick={() => setShowAssignModal(true)}>
            <UserIcon size={16} />
            <span>تعيين دور لحساب آخر 👤</span>
          </Button>
          <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)}>
            <PlusIcon size={16} />
            <span>إنشاء دور مخصص جديد</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Roles List (Left) & Permissions Matrix (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "var(--space-6)", alignItems: "start" }}>
        {/* Roles Sidebar / List */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)", textTransform: "uppercase", paddingInline: "8px" }}>
            قائمة الأدوار المعتمدة ({roles.length})
          </span>

          {roles.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: isSelected ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                  background: isSelected ? "rgba(200, 169, 110, 0.1)" : "var(--color-bg-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldIcon size={16} color={isSelected ? "var(--color-gold-heading)" : "var(--color-text-muted)"} />
                    <h4 style={{ fontSize: "13px", fontWeight: 800, margin: 0, color: isSelected ? "var(--color-gold-heading)" : "var(--color-text-primary)" }}>
                      {role.nameAr}
                    </h4>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "3px", display: "block" }}>
                    {role.usersCount} حساب مرتبط • {role.require2fa ? "2FA إلزامي" : "عادي"}
                  </span>
                </div>

                {!role.isSystem && (
                  <IconButton
                    icon={<TrashIcon size={14} />}
                    title="حذف الدور"
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role.id);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Role Permissions Matrix */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Header of Active Role */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 900, margin: 0, color: "var(--color-gold-heading)" }}>
                  {selectedRole.nameAr} ({selectedRole.nameEn})
                </h2>
                {selectedRole.isSystem ? (
                  <span style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10B981", fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "6px" }}>
                    نظامي أساسي (System)
                  </span>
                ) : (
                  <span style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3B82F6", fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "6px" }}>
                    مخصص (Custom)
                  </span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "6px", marginInlineEnd: "12px" }}>
                {selectedRole.description}
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={() => setShowAssignModal(true)}>
              <UserIcon size={14} />
              <span>تعيين لحساب إداري</span>
            </Button>
          </div>

          {/* Permissions Matrix Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {PERMISSION_GROUPS.map((group) => (
              <div key={group.section} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <KeyIcon size={14} color="var(--color-gold-heading)" />
                  {group.titleAr}
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px" }}>
                  {group.permissions.map((perm) => {
                    const isGranted = selectedRole.permissions.includes("all") || selectedRole.permissions.includes(perm.key);
                    return (
                      <div
                        key={perm.key}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: isGranted ? "rgba(16, 185, 129, 0.08)" : "var(--color-bg-secondary)",
                          border: isGranted ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--color-border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <h5 style={{ fontSize: "12px", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>
                            {perm.nameAr}
                          </h5>
                          <span style={{ fontSize: "10px", color: "var(--color-text-muted)", fontFamily: "monospace" }}>
                            {perm.key}
                          </span>
                        </div>

                        <div style={{ color: isGranted ? "#10B981" : "var(--color-text-muted)" }}>
                          {isGranted ? <CheckCircleIcon size={16} /> : <span style={{ fontSize: "11px", opacity: 0.5 }}>مغلق</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Create Custom Role */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إنشاء دور إداري وصلاحيات جديدة" maxWidth="650px">
        <form onSubmit={handleCreateRole} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالعربية</label>
              <input
                type="text"
                placeholder="مثال: مدقق التقييمات السياحية"
                value={newRoleNameAr}
                onChange={(e) => setNewRoleNameAr(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم بالإنجليزية</label>
              <input
                type="text"
                placeholder="e.g. Review Moderator"
                value={newRoleNameEn}
                onChange={(e) => setNewRoleNameEn(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الوصف والمهام</label>
            <input
              type="text"
              placeholder="وصف مختصر لمسؤوليات هذا الدور..."
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)" }}
            />
          </div>

          {/* Select Permissions Checklist */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "8px" }}>
              تحديد الصلاحيات الممنوحة للدور ({selectedPermissions.length} محددة):
            </label>
            <div style={{ maxHeight: "200px", overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", paddingInlineEnd: "4px" }}>
              {PERMISSION_GROUPS.flatMap((g) => g.permissions).map((p) => {
                const checked = selectedPermissions.includes(p.key);
                return (
                  <div
                    key={p.key}
                    onClick={() => handleTogglePermission(p.key)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: checked ? "1px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                      background: checked ? "rgba(200, 169, 110, 0.1)" : "var(--color-bg-secondary)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700 }}>{p.nameAr}</span>
                    <input type="checkbox" checked={checked} onChange={() => {}} style={{ accentColor: "var(--color-gold-heading)" }} />
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" id="role2fa" checked={newRole2fa} onChange={(e) => setNewRole2fa(e.target.checked)} style={{ accentColor: "var(--color-gold-heading)" }} />
            <label htmlFor="role2fa" style={{ fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
              إلزام المصادقة الثنائية 2FA لجميع الحسابات الحاملة لهذا الدور
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowCreateModal(false)} type="button">إلغاء</Button>
            <Button variant="primary" size="md" type="submit">إنشاء الدور وحفظ الصلاحيات</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Assign Role to Account */}
      <AssignRoleModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        account={assignAccount}
        onAssignSuccess={handleRoleAssigned}
      />
    </div>
  );
}
