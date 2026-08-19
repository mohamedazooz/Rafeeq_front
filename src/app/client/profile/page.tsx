"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  UserIcon,
  ShieldCheckIcon,
  ShieldIcon,
  GlobeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/icons";

export default function ClientProfilePage() {
  const { lang, setLang } = useLanguage();
  const isAr = lang === "ar";
  const { success, warning } = useToast();

  const [fullName, setFullName] = useState("محمد بن عبد العزيز العتيبي");
  const [email, setEmail] = useState("m.otaibi@example.com");
  const [phone] = useState("+966 55 333 4444");
  const [city, setCity] = useState("الرياض");
  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      success("تم حفظ وتحديث بيانات ملفك الشخصي بنجاح! 👤✓");
    }, 500);
  };

  const handleConfirmDeletion = () => {
    setShowDeleteModal(false);
    warning("تم تسجيل طلب حذف الحساب بنجاح. لديك فترة سماح لمدة 30 يوماً قبل الإلغاء النهائي.");
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "800px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          الملف الشخصي والأمان 👤
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          تحديث بياناتك الشخصية، إدارة إعدادات الأمان والمصادقة الثنائية (2FA) وتفضيلات اللغة
        </p>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Personal Details Card */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <UserIcon size={18} color="var(--color-gold-heading)" />
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>البيانات الشخصية</h3>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>رقم الجوال (موثق عبر أبشر / نفاذ)</label>
              <input
                type="tel"
                value={phone}
                disabled
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px", opacity: 0.8, direction: "ltr", textAlign: "right" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>المدينة / منطقة الإقامة</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
            />
          </div>
        </div>

        {/* Security & 2FA Card */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <ShieldIcon size={18} color="#10B981" />
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>الأمان والمصادقة الثنائية (2FA)</h3>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>المصادقة الثنائية للعمليات الحساسة</h4>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                إرسال رمز تحقق مؤقت OTP عبر الرسائل النصية عند تسجيل الدخول وإجراء الحجوزات
              </p>
            </div>

            <Button
              variant={twoFactorActive ? "primary" : "outline"}
              size="sm"
              type="button"
              onClick={() => setTwoFactorActive(!twoFactorActive)}
            >
              {twoFactorActive ? "مفعلة 🔒" : "معطلة"}
            </Button>
          </div>
        </div>

        {/* Submit Button & Danger Zone */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#EF4444",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            طلب حذف الحساب وبياناتي
          </button>

          <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
            <ShieldCheckIcon size={16} />
            <span>{isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
          </Button>
        </div>
      </form>

      {/* Modal: Delete Account */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="طلب حذف الحساب (30 يوم سماح)" maxWidth="480px">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5", margin: 0 }}>
            وفقاً لسياسة حماية البيانات، عند تأكيد طلب الحذف سيتم منحك <strong>فترة سماح قانونية لمدة 30 يوماً</strong> يمكنك خلالها التراجع عن الحذف في أي وقت بمجرد تسجيل الدخول مجدداً.
          </p>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowDeleteModal(false)}>إلغاء</Button>
            <Button variant="secondary" size="md" onClick={handleConfirmDeletion}>
              <span style={{ color: "#EF4444" }}>تأكيد طلب الحذف</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
