"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  ShieldIcon,
  ShieldCheckIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/icons";

interface RoleItem {
  id: string;
  nameAr: string;
  nameEn: string;
  isSystem: boolean;
  require2fa: boolean;
  usersCount: number;
  permissionsCount: number;
  description: string;
}

interface PermissionGroup {
  section: string;
  titleAr: string;
  permissions: { key: string; nameAr: string; nameEn: string }[];
}

const INITIAL_ROLES: RoleItem[] = [
  { id: "r-1", nameAr: "المدير العام الأعلى", nameEn: "Super Admin", isSystem: true, require2fa: true, usersCount: 2, permissionsCount: 48, description: "صلاحيات كاملة وغير محدودة لجميع أنظمة وخدمات وإعدادات منصة رفيق." },
  { id: "r-2", nameAr: "مدير اعتماد المرشدين", nameEn: "Guide Approver", isSystem: false, require2fa: true, usersCount: 4, permissionsCount: 14, description: "مراجعة واعتماد وثائق وترخيص المرشدين السياحيين وتفعيل الحسابات." },
  { id: "r-3", nameAr: "مشرف مراجعة البرامج", nameEn: "Program Reviewer", isSystem: false, require2fa: false, usersCount: 5, permissionsCount: 10, description: "تدقيق محتوى البرامج السياحية المسجلة ونشرها في الكتالوج العام." },
  { id: "r-4", nameAr: "مدير العمليات والنزاعات", nameEn: "Dispute Specialist", isSystem: false, require2fa: true, usersCount: 3, permissionsCount: 18, description: "معالجة شكاوى الحجوزات وإدارات الاستردادات المالية والنزاعات بين الطرفين." },
  { id: "r-5", nameAr: "المحاسب المالي والـ Escrow", nameEn: "Finance Manager", isSystem: false, require2fa: true, usersCount: 2, permissionsCount: 12, description: "اعتماد التحويلات البنكية للمرشدين (IBAN)، متابعة المحافظ ورسومات العمولات." },
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
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [activePermissions, setActivePermissions] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoleNameAr, setNewRoleNameAr] = useState("");
  const [newRoleNameEn, setNewRoleNameEn] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenMatrix = (role: RoleItem) => {
    setSelectedRole(role);
    const mockMap: Record<string, boolean> = {};
    PERMISSION_GROUPS.forEach((group) => {
      group.permissions.forEach((p, idx) => {
        mockMap[p.key] = role.isSystem || idx % 2 === 0;
      });
    });
    setActivePermissions(mockMap);
  };

  const togglePermission = (key: string) => {
    if (selectedRole?.isSystem) return;
    setActivePermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePermissions = () => {
    if (!selectedRole) return;
    showToast(isAr ? `تم حفظ تحديث صلاحيات دور (${selectedRole.nameAr}) بنجاح! ✓` : `Role permissions saved.`);
    setSelectedRole(null);
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    const newRole: RoleItem = {
      id: `r-${Date.now()}`,
      nameAr: newRoleNameAr,
      nameEn: newRoleNameEn,
      isSystem: false,
      require2fa: true,
      usersCount: 0,
      permissionsCount: 8,
      description: newRoleDesc || "دور إداري مخصص جديد.",
    };

    setRoles([...roles, newRole]);
    setShowCreateModal(false);
    setNewRoleNameAr("");
    setNewRoleNameEn("");
    setNewRoleDesc("");

    dispatchDualActionNotification({
      title: "إنشاء دور إداري وصلاحيات جديدة (RBAC)",
      message: `تم تعريف الدور الجديد (${newRole.nameAr} - ${newRole.nameEn}) بمصفوفة الصلاحيات.`,
      actionType: "CREATE",
      targetEmail: "security@rafeeq.sa",
      targetName: "فريق الأمان والامتثال",
      targetRole: "Admin",
    });

    showToast(isAr ? `تم إنشاء الدور الإداري (${newRole.nameAr}) بنجاح!` : `Role created.`);
  };

  const handleDeleteRole = (role: RoleItem) => {
    if (role.isSystem) {
      alert(isAr ? "لا يمكن حذف الأدوار الافتراضية للنظام!" : "Cannot delete system roles.");
      return;
    }
    if (confirm(isAr ? `حذف الدور (${role.nameAr})؟` : `Delete role ${role.nameAr}?`)) {
      setRoles(roles.filter((r) => r.id !== role.id));
      showToast(isAr ? `تم حذف الدور (${role.nameAr}) بنجاح.` : `Role deleted.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <ShieldIcon size={14} color="var(--color-gold-heading)" />
            {isAr ? "مصفوفة الأدوار والصلاحيات والرقابة الأمنية RBAC" : "RBAC Role Matrix & Access Governance"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "إدارة الأدوار والصلاحيات (RBAC) 🔐" : "Role-Based Access Control (RBAC)"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "التحكم الدقيق بصلاحيات فريق الإدارة والمشرفين وفرض المصادقة الثنائية 2FA على الحسابات الحساسة." : "Fine-grained permissions matrix with mandatory 2FA enforcement."}
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowCreateModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <PlusIcon size={16} />
          <span>{isAr ? "إنشاء دور إداري جديد" : "Create New Role"}</span>
        </Button>
      </div>

      {/* Roles Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
        {roles.map((role) => (
          <div
            key={role.id}
            style={{
              background: "var(--color-bg-card)",
              border: `1px solid ${role.isSystem ? "rgba(200, 169, 110, 0.4)" : "var(--color-border)"}`,
              padding: "24px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 900, color: "var(--color-text-primary)" }}>{role.nameAr}</h3>
                  <span style={{ fontSize: "12px", color: "var(--color-gold-heading)", fontWeight: 700 }}>{role.nameEn}</span>
                </div>
                {role.isSystem ? (
                  <span style={{ background: "rgba(200, 169, 110, 0.15)", color: "var(--color-gold-heading)", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, border: "1px solid rgba(200,169,110,0.3)" }}>
                    {isAr ? "نظامي أصل" : "System Core"}
                  </span>
                ) : (
                  <span style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-secondary)", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, border: "1px solid var(--color-border)" }}>
                    {isAr ? "مخصص" : "Custom"}
                  </span>
                )}
              </div>

              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>{role.description}</p>

              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--color-text-primary)", fontWeight: 700, marginBottom: "20px", background: "var(--color-bg-secondary)", padding: "10px 14px", borderRadius: "12px" }}>
                <div>{isAr ? "المستخدمون:" : "Users:"} <strong style={{ color: "var(--color-gold-heading)" }}>{role.usersCount}</strong></div>
                <div>{isAr ? "الصلاحيات:" : "Permissions:"} <strong style={{ color: "#10B981" }}>{role.permissionsCount}</strong></div>
                <div>2FA: <strong style={{ color: role.require2fa ? "#10B981" : "#EF4444" }}>{role.require2fa ? (isAr ? "إلزامي" : "Required") : (isAr ? "اختياري" : "Optional")}</strong></div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
              <Button variant="outline" size="sm" onClick={() => handleOpenMatrix(role)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <KeyIcon size={14} />
                <span>{isAr ? "مصفوفة الصلاحيات" : "Permissions Matrix"}</span>
              </Button>

              {!role.isSystem && (
                <IconButton
                  variant="ghost"
                  size="sm"
                  title={isAr ? "حذف الدور" : "Delete Role"}
                  icon={<TrashIcon size={15} />}
                  onClick={() => handleDeleteRole(role)}
                  style={{ color: "#EF4444" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix Modal */}
      <Modal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        title={selectedRole ? (isAr ? `مصفوفة صلاحيات: ${selectedRole.nameAr}` : `Permissions Matrix: ${selectedRole.nameEn}`) : ""}
        subtitle={selectedRole ? `${selectedRole.nameEn} • ${selectedRole.isSystem ? (isAr ? "دور نظامي محمي" : "Core System Role") : (isAr ? "دور مخصص" : "Custom Role")}` : ""}
        maxWidth="720px"
      >
        {selectedRole && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ maxHeight: "55vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px", paddingRight: "4px" }}>
              {PERMISSION_GROUPS.map((group) => (
                <div key={group.section} className="rafeeq-modal-box">
                  <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-gold-heading)", marginBottom: "10px" }}>{group.titleAr}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {group.permissions.map((p) => {
                      const isChecked = activePermissions[p.key] ?? false;
                      return (
                        <label
                          key={p.key}
                          onClick={() => togglePermission(p.key)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            background: isChecked ? "rgba(200, 169, 110, 0.12)" : "var(--color-modal-bg)",
                            border: `1px solid ${isChecked ? "rgba(200, 169, 110, 0.3)" : "var(--color-border)"}`,
                            cursor: selectedRole.isSystem ? "not-allowed" : "pointer",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: isChecked ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                          }}
                        >
                          <input type="checkbox" checked={isChecked} disabled={selectedRole.isSystem} readOnly style={{ accentColor: "#C8A96E" }} />
                          <span>{p.nameAr}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                {selectedRole.isSystem ? (isAr ? "🔒 الأدوار النظامية تملك كافة الصلاحيات بشكل دائم" : "System roles are locked.") : (isAr ? "تعديل الصلاحيات يطبق فوراً على جميع الحسابات المعينة" : "Changes apply immediately.")}
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRole(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
                {!selectedRole.isSystem && (
                  <Button variant="primary" size="sm" onClick={handleSavePermissions}>{isAr ? "حفظ التعديلات ✓" : "Save Changes"}</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Role Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={isAr ? "إنشاء دور إداري مخصص جديد" : "Create Custom Role"}
        subtitle={isAr ? "تحديد مسمى الدور ونطاق الصلاحيات التشغيلية" : "Define role name and operational scope"}
        maxWidth="520px"
      >
        <form onSubmit={handleCreateRole}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الدور بالعربية" : "Role Name (Arabic)"}</label>
              <input type="text" required placeholder="مثال: مسؤول خدمة كبار الشخصيات" value={newRoleNameAr} onChange={(e) => setNewRoleNameAr(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "اسم الدور بالإنجليزية (Identifier)" : "Role Name (English)"}</label>
              <input type="text" required placeholder="VIP Operations Officer" value={newRoleNameEn} onChange={(e) => setNewRoleNameEn(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>{isAr ? "وصف مهام ومسؤوليات الدور" : "Description"}</label>
              <textarea rows={3} placeholder="توضيح النطاق التشغيلي والصلاحيات..." value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setShowCreateModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "حفظ وإنشاء الدور 🔐" : "Save Role"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
