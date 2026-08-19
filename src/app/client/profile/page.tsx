"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import { ALL_COUNTRY_CODES } from "@/lib/country-codes";
import {
  UserIcon,
  ShieldCheckIcon,
  ShieldIcon,
  GlobeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@/components/icons";

export default function ClientProfilePage() {
  const { lang, isAr, t, setLang } = useLanguage();
  const { success, warning } = useToast();

  const [activeTab, setActiveTab] = useState<"personal" | "international">("personal");
  const [fullName, setFullName] = useState(isAr ? "محمد بن عبد العزيز العتيبي" : "Mohammed Al-Otaibi");
  const [email, setEmail] = useState("m.otaibi@example.com");
  const [phone] = useState("+966 55 333 4444");
  const [city, setCity] = useState(isAr ? "الرياض" : "Riyadh");
  const [nationality, setNationality] = useState("SA");
  const [passportNumber, setPassportNumber] = useState("N98765432");
  const [saudiVisaType, setSaudiVisaType] = useState("evisa");
  const [dietaryPreferences, setDietaryPreferences] = useState("halal_standard");
  const [emergencyName, setEmergencyName] = useState(isAr ? "عبد الله العتيبي" : "Abdullah Al-Otaibi");
  const [emergencyPhone, setEmergencyPhone] = useState("+966 50 111 2222");

  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      success(t.profiles.client.saveSuccess);
    }, 500);
  };

  const handleConfirmDeletion = () => {
    setShowDeleteModal(false);
    warning(isAr ? "تم تسجيل طلب حذف الحساب بنجاح. لديك فترة سماح لمدة 30 يوماً قبل الإلغاء النهائي." : "Account deletion requested. You have a 30-day grace period before permanent erasure.");
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "800px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          {t.profiles.client.title} 👤
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          {t.profiles.client.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "8px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("personal")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-lg)",
            border: "none",
            background: activeTab === "personal" ? "var(--color-gold-royal)" : "transparent",
            color: activeTab === "personal" ? "var(--color-midnight-blue)" : "var(--color-text-secondary)",
            fontWeight: 800,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {t.profiles.client.personalDetails}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("international")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-lg)",
            border: "none",
            background: activeTab === "international" ? "var(--color-gold-royal)" : "transparent",
            color: activeTab === "international" ? "var(--color-midnight-blue)" : "var(--color-text-secondary)",
            fontWeight: 800,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          🌍 {t.profiles.client.internationalTab}
        </button>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {activeTab === "personal" ? (
          <>
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
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{t.profiles.client.personalDetails}</h3>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.fullName}</label>
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
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.phone}</label>
                  <input
                    type="tel"
                    value={phone}
                    disabled
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px", opacity: 0.8, direction: "ltr", textAlign: isAr ? "right" : "left" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.email}</label>
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
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.city}</label>
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
                <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{t.profiles.client.security2fa}</h3>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>{t.profiles.client.security2fa}</h4>
                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "2px 0 0 0" }}>
                    {t.profiles.client.security2faDesc}
                  </p>
                </div>

                <Button
                  variant={twoFactorActive ? "primary" : "outline"}
                  size="sm"
                  type="button"
                  onClick={() => setTwoFactorActive(!twoFactorActive)}
                >
                  {twoFactorActive ? t.profiles.client.twoFactorActive : t.profiles.client.twoFactorDisabled}
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* International Traveler Documents & Preferences */
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
              <GlobeIcon size={18} color="var(--color-gold-heading)" />
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{t.profiles.client.internationalTab}</h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.nationality}</label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                >
                  {ALL_COUNTRY_CODES.map((c) => (
                    <option key={`${c.iso}-${c.code}`} value={c.iso}>
                      {c.flag} {isAr ? c.countryAr : c.countryEn} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.passportNumber}</label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", fontFamily: "monospace" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.visaType}</label>
                <select
                  value={saudiVisaType}
                  onChange={(e) => setSaudiVisaType(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                >
                  <option value="evisa">{t.checkout.visaTypeEvisa}</option>
                  <option value="arrival">{t.checkout.visaTypeArrival}</option>
                  <option value="gcc">{t.checkout.visaTypeGcc}</option>
                  <option value="transit">{t.checkout.visaTypeTransit}</option>
                  <option value="resident">{t.checkout.visaTypeResident}</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.dietaryPreferences}</label>
                <select
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                >
                  <option value="halal_standard">{t.checkout.dietHalalStandard}</option>
                  <option value="vegetarian">{t.checkout.dietVegetarian}</option>
                  <option value="vegan">{t.checkout.dietVegan}</option>
                  <option value="gluten_free">{t.checkout.dietGlutenFree}</option>
                  <option value="nut_allergy">{t.checkout.dietNutAllergy}</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.emergencyName}</label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.client.emergencyPhone}</label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", direction: "ltr", textAlign: isAr ? "right" : "left" }}
                />
              </div>
            </div>
          </div>
        )}

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
            {t.profiles.client.deleteAccount}
          </button>

          <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
            <ShieldCheckIcon size={16} />
            <span>{isSaving ? t.common.saving : t.common.saveChanges}</span>
          </Button>
        </div>
      </form>

      {/* Modal: Delete Account */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title={isAr ? "طلب حذف الحساب (30 يوم سماح)" : "Request Account Deletion (30-day grace period)"} maxWidth="480px">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5", margin: 0 }}>
            {isAr
              ? "وفقاً لسياسة حماية البيانات، عند تأكيد طلب الحذف سيتم منحك فترة سماح قانونية لمدة 30 يوماً يمكنك خلالها التراجع عن الحذف في أي وقت بمجرد تسجيل الدخول مجدداً."
              : "In accordance with data privacy regulations, confirming deletion grants a 30-day legal grace period during which you can cancel deletion at any time by simply logging in again."}
          </p>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" }}>
            <Button variant="ghost" size="md" onClick={() => setShowDeleteModal(false)}>{t.common.cancel}</Button>
            <Button variant="secondary" size="md" onClick={handleConfirmDeletion}>
              <span style={{ color: "#EF4444" }}>{t.common.confirm}</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
