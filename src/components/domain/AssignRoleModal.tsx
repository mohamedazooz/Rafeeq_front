"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ShieldIcon, CheckCircleIcon, ShieldCheckIcon } from "@/components/icons";
import { useLanguage } from "@/lib/language-provider";

export interface AccountForRoleAssignment {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly currentRoleTitleAr: string;
  readonly currentRoleKey: string;
}

export interface AvailableRole {
  readonly key: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly descriptionAr: string;
  readonly permissionsCount: number;
  readonly require2fa: boolean;
}

const DEFAULT_AVAILABLE_ROLES: readonly AvailableRole[] = [
  { key: "super_admin", nameAr: "المدير العام الأعلى (Super Admin)", nameEn: "Super Admin", descriptionAr: "صلاحيات كاملة وغير محدودة لجميع أنظمة وخدمات وإعدادات منصة رفيق.", permissionsCount: 48, require2fa: true },
  { key: "guide_approver", nameAr: "مدير اعتماد المرشدين وتراخيص السياحة", nameEn: "Guide Approver", descriptionAr: "مراجعة واعتماد وثائق وترخيص المرشدين السياحيين وتفعيل الحسابات.", permissionsCount: 14, require2fa: true },
  { key: "program_reviewer", nameAr: "مشرف مراجعة ونشر البرامج السياحية", nameEn: "Program Reviewer", descriptionAr: "تدقيق محتوى البرامج السياحية المسجلة ونشرها في الكتالوج العام.", permissionsCount: 10, require2fa: false },
  { key: "dispute_specialist", nameAr: "أخصائي فض النزاعات والتسويات المالية", nameEn: "Dispute Specialist", descriptionAr: "معالجة شكاوى الحجوزات وإدارات الاستردادات المالية والنزاعات بين الطرفين.", permissionsCount: 18, require2fa: true },
  { key: "finance_officer", nameAr: "المحاسب المالي والـ Escrow والـ IBAN", nameEn: "Finance Officer", descriptionAr: "اعتماد التحويلات البنكية للمرشدين (IBAN)، متابعة المحافظ ورسومات العمولات.", permissionsCount: 12, require2fa: true },
  { key: "support_lead", nameAr: "مشرف الدعم الفني وخدمة العملاء", nameEn: "Support Lead", descriptionAr: "الرد على استفسارات المسافرين والمرشدين ومتابعة تذاكر المراسلات.", permissionsCount: 8, require2fa: false },
];

interface AssignRoleModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly account: AccountForRoleAssignment | null;
  readonly availableRoles?: readonly AvailableRole[];
  readonly onAssignSuccess: (accountId: string, newRoleKey: string, roleTitleAr: string) => void;
}

export function AssignRoleModal({
  isOpen,
  onClose,
  account,
  availableRoles = DEFAULT_AVAILABLE_ROLES,
  onAssignSuccess,
}: AssignRoleModalProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [selectedRoleKey, setSelectedRoleKey] = useState<string>(account?.currentRoleKey || "guide_approver");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState("");

  if (!account) return null;

  const selectedRole = availableRoles.find((r) => r.key === selectedRoleKey) || availableRoles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onAssignSuccess(account.id, selectedRole.key, selectedRole.nameAr);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAr ? "تعيين وتغيير دور الحساب والصلاحيات (RBAC)" : "Assign Role & Permissions"}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Target Account Summary Banner */}
        <div
          style={{
            background: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            padding: "14px 18px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 700 }}>
              {isAr ? "الحساب المستهدف:" : "Target Account:"}
            </span>
            <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "2px 0 0 0", color: "var(--color-text-primary)" }}>
              {account.name}
            </h4>
            <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{account.email}</span>
          </div>

          <div style={{ textAlign: "end" }}>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block" }}>
              {isAr ? "الدور الحالي:" : "Current Role:"}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--color-gold-heading)",
                background: "rgba(200, 169, 110, 0.12)",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid rgba(200, 169, 110, 0.3)",
                display: "inline-block",
                marginTop: "4px",
              }}
            >
              {account.currentRoleTitleAr}
            </span>
          </div>
        </div>

        {/* Roles Selection Grid */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 800, marginBottom: "8px", color: "var(--color-text-primary)" }}>
            {isAr ? "اختر الدور والصلاحيات الجديدة:" : "Select New Role & Permissions:"}
          </label>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "240px", overflowY: "auto", paddingInlineEnd: "4px" }}>
            {availableRoles.map((role) => {
              const isSelected = selectedRoleKey === role.key;
              return (
                <div
                  key={role.key}
                  onClick={() => setSelectedRoleKey(role.key)}
                  style={{
                    border: isSelected ? "2px solid var(--color-gold-heading)" : "1px solid var(--color-border)",
                    background: isSelected ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-card)",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ marginTop: "2px", color: isSelected ? "var(--color-gold-heading)" : "var(--color-text-muted)" }}>
                      <ShieldIcon size={18} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: isSelected ? "var(--color-gold-heading)" : "var(--color-text-primary)" }}>
                          {isAr ? role.nameAr : role.nameEn}
                        </span>
                        {role.require2fa && (
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#3B82F6", background: "rgba(59, 130, 246, 0.12)", padding: "1px 6px", borderRadius: "4px" }}>
                            2FA Required
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "2px 0 0 0" }}>
                        {role.descriptionAr}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-muted)" }}>
                      {role.permissionsCount} صلاحية
                    </span>
                    {isSelected && (
                      <div style={{ color: "var(--color-gold-heading)" }}>
                        <CheckCircleIcon size={18} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reason / Audit Note */}
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-secondary)" }}>
            {isAr ? "سبب التعيين / الملاحظة الإدارية (تُسجل في سجل الـ Audit):" : "Assignment Reason / Audit Note:"}
          </label>
          <input
            type="text"
            placeholder={isAr ? "مثال: ترقية إدارية، تدوير مهام، تغطية فترة إجازة..." : "e.g. Promotion, task rotation..."}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-primary)",
              color: "var(--color-text-primary)",
              fontSize: "13px",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
          <Button variant="ghost" size="md" onClick={onClose} type="button">
            {isAr ? "إلغاء" : "Cancel"}
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
            <ShieldCheckIcon size={16} />
            <span>{isSubmitting ? (isAr ? "جاري التعيين..." : "Assigning...") : (isAr ? "تأكيد تعيين الدور" : "Confirm Assignment")}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
