"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CompassIcon,
  MapPinIcon,
} from "@/components/icons";

export default function GuideProfilePage() {
  const { lang, isAr, t } = useLanguage();
  const { success } = useToast();

  const [name, setName] = useState(isAr ? "عبد العزيز فهد الشمري" : "Abdulaziz Fahad Al-Shammari");
  const [licenseNumber] = useState("TG-994021");
  const [bio, setBio] = useState(
    isAr
      ? "مرشد سياحي مرخص من وزارة السياحة بخبرة أكثر من 6 سنوات في منطقة العلا وتاريخ مدائن صالح والبلدة القديمة."
      : "Ministry of Tourism certified guide with over 6 years of experience in AlUla, Hegra archaeological sites, and heritage tours."
  );
  const [bankName, setBankName] = useState(isAr ? "مصرف الراجحي" : "Al Rajhi Bank");
  const [iban, setIban] = useState("SA4210000001234567890101");
  const [cities, setCities] = useState(isAr ? "العلا، خيبر، تيماء" : "AlUla, Khaybar, Tayma");
  const [languages, setLanguages] = useState(isAr ? "العربية، الإنجليزية، الفرنسية" : "Arabic, English, French");
  const [vehicleType, setVehicleType] = useState("4x4");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      success(t.profiles.guide.saveSuccess);
    }, 500);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "800px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          {t.profiles.guide.title}
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          {t.profiles.guide.subtitle}
        </p>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Tourism License & Identity */}
        <div
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-royal)",
            borderRadius: "var(--radius-2xl)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CompassIcon size={18} color="var(--color-gold-heading)" />
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{t.profiles.guide.licenseSection}</h3>
            </div>
            <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheckIcon size={14} />
              <span>{t.profiles.guide.licenseVerifiedBadge}</span>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.displayName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.licenseNumber}</label>
              <input
                type="text"
                value={licenseNumber}
                disabled
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px", opacity: 0.8, fontFamily: "monospace" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.bio}</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", lineHeight: "1.5" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.coveredCities}</label>
              <input
                type="text"
                value={cities}
                onChange={(e) => setCities(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.tourLanguages}</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Vehicle and Fleet Type */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.vehicleType}</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
            >
              <option value="4x4">{t.profiles.guide.vehicle4x4}</option>
              <option value="vip_van">{t.profiles.guide.vehicleVipVan}</option>
              <option value="sedan">{t.profiles.guide.vehicleSedan}</option>
              <option value="walking">{t.profiles.guide.vehicleWalkingOnly}</option>
            </select>
          </div>
        </div>

        {/* Bank Account / IBAN Section */}
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
            <CreditCardIcon size={18} color="var(--color-gold-heading)" />
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{t.profiles.guide.bankSection}</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.bankName}</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              >
                <option value="Al Rajhi Bank">{isAr ? "مصرف الراجحي" : "Al Rajhi Bank"}</option>
                <option value="Saudi National Bank (SNB)">{isAr ? "البنك الأهلي السعودي (SNB)" : "Saudi National Bank (SNB)"}</option>
                <option value="Riyad Bank">{isAr ? "بنك الرياض" : "Riyad Bank"}</option>
                <option value="Alinma Bank">{isAr ? "مصرف الإنماء" : "Alinma Bank"}</option>
                <option value="Bank Albilad">{isAr ? "بنك البلاد" : "Bank Albilad"}</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{t.profiles.guide.iban}</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", fontFamily: "monospace", direction: "ltr", textAlign: isAr ? "right" : "left" }}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
            <ShieldCheckIcon size={18} />
            <span>{isSaving ? t.common.saving : t.common.saveChanges}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
