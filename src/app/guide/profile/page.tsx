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
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { success } = useToast();

  const [name, setName] = useState("عبد العزيز فهد الشمري");
  const [licenseNumber] = useState("TG-994021");
  const [bio, setBio] = useState("مرشد سياحي مرخص من وزارة السياحة بخبرة أكثر من 6 سنوات في منطقة العلا وتاريخ مدائن صالح والبلدة القديمة.");
  const [bankName, setBankName] = useState("مصرف الراجحي");
  const [iban, setIban] = useState("SA4210000001234567890101");
  const [cities, setCities] = useState("العلا، خيبر، تيماء");
  const [languages, setLanguages] = useState("العربية، الإنجليزية");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      success("تم حفظ وتحديث ملفك الاحترافي وبيانات الحساب البنكي بنجاح! 🧭✓");
    }, 500);
  };

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: "800px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          الملف المهني للمرشد السياحي 🧭
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          تحديث نبذة جولاتك، رخصة وزارة السياحة المعتمدة، وبيانات حساب الـ IBAN لتحويل الأرباح
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CompassIcon size={18} color="var(--color-gold-heading)" />
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>بيانات الاعتماد والرخصة السياحية</h3>
            </div>
            <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheckIcon size={14} />
              <span>مرخص ومعتمد من وزارة السياحة</span>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الاسم كما يظهر للمسافرين</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>رقم ترخيص الإرشاد السياحي (وزارة السياحة)</label>
              <input
                type="text"
                value={licenseNumber}
                disabled
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px", opacity: 0.8, fontFamily: "monospace" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>النبذة التعريفية للمسافرين</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", lineHeight: "1.5" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>الوجهات والمدن التي تغطيها</label>
              <input
                type="text"
                value={cities}
                onChange={(e) => setCities(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>لغات تقديم الجولات</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              />
            </div>
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
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>الحساب البنكي لاستلام الأرباح (IBAN Payouts)</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>اسم البنك السعودي</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
              >
                <option value="مصرف الراجحي">مصرف الراجحي</option>
                <option value="البنك الأهلي السعودي (SNB)">البنك الأهلي السعودي (SNB)</option>
                <option value="بنك الرياض">بنك الرياض</option>
                <option value="مصرف الإنماء">مصرف الإنماء</option>
                <option value="بنك البلاد">بنك البلاد</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>رقم الآيبان (IBAN)</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", fontFamily: "monospace", direction: "ltr" }}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
            <ShieldCheckIcon size={18} />
            <span>{isSaving ? "جاري الحفظ..." : "حفظ التغييرات المهنية"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
