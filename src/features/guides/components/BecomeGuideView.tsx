"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import {
  ShieldCheckIcon,
  FileTextIcon,
} from "@/components/icons";
import { useBecomeGuideForm } from "../hooks/useBecomeGuideForm";

const SAUDI_CITIES = [
  "الرياض — Riyadh",
  "جدة — Jeddah",
  "العلا — AlUla",
  "أبها وعسير — Abha & Aseer",
  "البحر الأحمر — The Red Sea",
  "الدمام والخبر — Dammam & Khobar",
  "الطائف — Taif",
  "المدينة المنورة — Madinah",
  "تبوك وحقل — Tabuk & Haql",
  "حائل — Hail",
  "نجران — Najran",
  "جازان وجزر فرسان — Jazan & Farasan",
];

const GUIDE_SPECIALTIES = [
  "تراث وتاريخ آثار",
  "مغامرات وتخييم وهايكنج",
  "غوص ورياضات بحرية",
  "تذوق وطهي شعبي سعودي",
  "عائلي وترفيهي",
  "سفاري وصحراء ونجوم",
];

const SPOKEN_LANGUAGES = [
  "العربية",
  "الإنجليزية (English)",
  "الفرنسية (Français)",
  "الألمانية (Deutsch)",
  "الإسبانية (Español)",
  "الصينية (Mandarin)",
  "الروسية (Русский)",
];

export function BecomeGuideView() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const {
    step,
    setStep,
    fullName,
    setFullName,
    nationalId,
    setNationalId,
    email,
    setEmail,
    phone,
    setPhone,
    dateOfBirth,
    setDateOfBirth,
    emergencyContact,
    setEmergencyContact,
    licenseNo,
    setLicenseNo,
    licenseExpiry,
    setLicenseExpiry,
    licenseFile,
    setLicenseFile,
    firstAidCertNo,
    setFirstAidCertNo,
    city,
    setCity,
    vehicleType,
    setVehicleType,
    selectedSpecialties,
    toggleSpecialty,
    selectedLanguages,
    toggleLanguage,
    bio,
    setBio,
    bankName,
    setBankName,
    accountHolder,
    setAccountHolder,
    iban,
    setIban,
    isLoading,
    errorMsg,
    handleNextStep,
  } = useBecomeGuideForm(isAr);

  return (
    <>
      {/* Hero Header */}
      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "110px 32px", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "16px" }}>
            <BackButton fallbackHref="/" labelAr="الرئيسية" labelEn="Home" lang={lang} />
          </div>
          <div style={{ maxWidth: "800px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(200, 169, 110, 0.15)",
                border: "1px solid rgba(200, 169, 110, 0.3)",
                padding: "6px 14px",
                borderRadius: "100px",
                color: "var(--color-gold-heading)",
                fontSize: "12px",
                fontWeight: 800,
                marginBottom: "14px",
              }}
            >
              <ShieldCheckIcon size={14} color="var(--color-gold-heading)" />
              <span>{isAr ? "انضم لنخبة المرشدين السياحيين المرخصين في المملكة" : "Join Saudi MOT Certified Local Tour Guides"}</span>
            </div>
            <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: "14px" }}>
              {isAr ? "حوّل شغفك ومعرفتك السياحية إلى مصدر دخل مستدام" : "Turn Your Passion & Local Heritage into Sustainable Income"}
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)", lineHeight: "1.8" }}>
              {isAr
                ? "منصة رفيق تتيح لكل مرشد سياحي يحمل ترخيصاً رسمياً من وزارة السياحة السعودية استقبال الحجوزات المؤكدة، وتصميم البرامج، واستلام مستحقاته المالية مباشرة لحسابه البنكي بنظام حساب الضمان المحمي."
                : "Rafeeq enables licensed Saudi tour guides to receive verified bookings, create custom itineraries, and receive protected payouts directly to their bank IBAN with Escrow security."}
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Step Wizard Section */}
      <section className="section" style={{ background: "var(--color-bg-primary)", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          {/* Stepper Indicator */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "36px" }}>
            {[
              { num: 1, titleAr: "البيانات الشخصية", titleEn: "Personal Info" },
              { num: 2, titleAr: "الترخيص والمستندات", titleEn: "MOT License" },
              { num: 3, titleAr: "الخبرات والتخصصات", titleEn: "Expertise" },
              { num: 4, titleAr: "الحساب البنكي (آيبان)", titleEn: "Bank Payout" },
            ].map((st) => {
              const isCurrent = step === st.num;
              const isDone = step > st.num;
              return (
                <div
                  key={st.num}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    background: isCurrent ? "var(--gradient-gold)" : isDone ? "rgba(16, 185, 129, 0.15)" : "var(--color-bg-card)",
                    border: `1px solid ${isCurrent ? "transparent" : isDone ? "rgba(16, 185, 129, 0.4)" : "var(--color-border)"}`,
                    color: isCurrent ? "#0f172a" : isDone ? "#10B981" : "var(--color-text-secondary)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 900, marginBottom: "2px" }}>
                    {isDone ? "✓" : `0${st.num}`}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 800 }}>
                    {isAr ? st.titleAr : st.titleEn}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <div style={{ padding: "36px", borderRadius: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)" }}>
            {errorMsg && (
              <div style={{ padding: "12px 16px", background: "rgba(220, 53, 69, 0.15)", border: "1px solid var(--color-error)", color: "#EF4444", borderRadius: "10px", fontSize: "13px", marginBottom: "20px" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleNextStep} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)", marginBottom: "4px" }}>
                    {isAr ? "الخطوة 1: البيانات الشخصية ومعلومات الاتصال" : "Step 1: Personal & Contact Information"}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                    {isAr ? "أدخل بياناتك تماماً كما هي مسجلة في هويتك الوطنية أو الإقامة الرسمية." : "Enter your details exactly as stated in your Saudi National ID or official Iqama."}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "الاسم الثلاثي أو الرباعي (كما في الهوية)" : "Full Legal Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isAr ? "عبد العزيز فهد الشمري" : "Abdulaziz Fahad Al-Shammari"}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "رقم الهوية الوطنية / الإقامة (10 أرقام)" : "National ID / Iqama Number"} *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ""))}
                        placeholder="1098234710"
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "البريد الإلكتروني المعتمد" : "Email Address"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="guide@example.com"
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "رقم الجوال (مع الرمز الدولي)" : "Phone Number (E.164)"} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966551234567"
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "تاريخ الميلاد (يجب أن يكون العمر 18 عاماً فأكثر)" : "Date of Birth (18+ years)"} *
                      </label>
                      <input
                        type="date"
                        required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "جهة اتصال الطوارئ (الاسم ورقم الجوال)" : "Emergency Contact (Name & Phone)"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder={isAr ? "فهد الشمري — 0551112233" : "Fahad Al-Shammari — +966551112233"}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)", marginBottom: "4px" }}>
                    {isAr ? "الخطوة 2: ترخيص وزارة السياحة السعودية والوثائق" : "Step 2: Ministry of Tourism License & Documents"}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                    {isAr ? "يجب أن تكون الرخصة سارية المفعول وصادرة من وزارة السياحة بالمملكة العربية السعودية." : "Your tour guide license must be currently valid and issued by the Saudi Ministry of Tourism."}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "رقم ترخيص الإرشاد السياحي (TG-XXXXX)" : "MOT Tour Guide License Number"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={licenseNo}
                        onChange={(e) => setLicenseNo(e.target.value)}
                        placeholder="TG-994821"
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "تاريخ انتهاء صلاحية الترخيص" : "License Expiry Date"} *
                      </label>
                      <input
                        type="date"
                        required
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "رقم أو مرجع شهادة الإسعافات الأولية CPR" : "First Aid & CPR Certificate Ref"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstAidCertNo}
                      onChange={(e) => setFirstAidCertNo(e.target.value)}
                      placeholder="SRC-FA-992014"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "صورة رخصة الإرشاد السياحي أو بطاقة المرشد (PDF أو صورة JPG/PNG)" : "Upload Tour Guide License Certificate (PDF or JPG/PNG)"} *
                    </label>
                    <div
                      style={{
                        padding: "28px",
                        borderRadius: "14px",
                        border: "2px dashed var(--color-border)",
                        background: "var(--color-bg-secondary)",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setLicenseFile("mot_license_document.pdf")}
                    >
                      <FileTextIcon size={28} color="var(--color-gold-heading)" style={{ margin: "0 auto 8px" }} />
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>
                        {licenseFile ? (isAr ? `تم إرفاق: ${licenseFile}` : `Attached: ${licenseFile}`) : (isAr ? "اضغط هنا لاختيار ملف الرخصة أو اسحبه إلى هنا" : "Click to select or drag and drop license file")}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                        {isAr ? "الحد الأقصى للملف 10 ميغابايت — تشفير وحفظ آمن في خوادم رفيق" : "Max 10MB — Encrypted and stored securely on Rafeeq servers"}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)", marginBottom: "4px" }}>
                    {isAr ? "الخطوة 3: التخصصات واللغات ووسيلة النقل" : "Step 3: Tour Specialties, Languages & Fleet"}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                    {isAr ? "حدد مدينتك ومجالات خبرتك لتسهيل عثور المسافرين على برامجك السياحية." : "Select your primary region and tour specializations."}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "المنطقة أو المدينة الرئيسية للإرشاد" : "Primary Region / City"} *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      >
                        {SAUDI_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                        {isAr ? "وسيلة النقل الميدانية المتوفرة" : "Transportation Available"} *
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                      >
                        <option value="سيارة دفع رباعي مجهزة للصحراء (4x4)">سيارة دفع رباعي مجهزة للصحراء (4x4)</option>
                        <option value="حافلة / فان سياحي فاخر مكيف VIP">حافلة / فان سياحي فاخر مكيف VIP</option>
                        <option value="سيارة سيدان مريحة">سيارة سيدان مريحة</option>
                        <option value="جولات مشي وراجل فقط">جولات مشي وراجل فقط</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "8px", fontWeight: 700 }}>
                      {isAr ? "التخصصات ومجالات الجولات السياحية" : "Tour Specialties"} *
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {GUIDE_SPECIALTIES.map((spec) => {
                        const isSelected = selectedSpecialties.includes(spec);
                        return (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => toggleSpecialty(spec)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "100px",
                              border: `1px solid ${isSelected ? "var(--color-gold-heading)" : "var(--color-border)"}`,
                              background: isSelected ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                              color: isSelected ? "#0f172a" : "var(--color-text-primary)",
                              fontSize: "12px",
                              fontWeight: 800,
                              cursor: "pointer",
                            }}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "8px", fontWeight: 700 }}>
                      {isAr ? "اللغات التي تقدم بها الجولات السياحية" : "Spoken Tour Languages"} *
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {SPOKEN_LANGUAGES.map((l) => {
                        const isSelected = selectedLanguages.includes(l);
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={() => toggleLanguage(l)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "100px",
                              border: `1px solid ${isSelected ? "#10B981" : "var(--color-border)"}`,
                              background: isSelected ? "rgba(16, 185, 129, 0.2)" : "var(--color-bg-secondary)",
                              color: isSelected ? "#10B981" : "var(--color-text-primary)",
                              fontSize: "12px",
                              fontWeight: 800,
                              cursor: "pointer",
                            }}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {l}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "نبذة تعريفية وسيرتك الذاتية للمسافرين (Bio)" : "Guide Biography & Introduction (Bio)"} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={isAr ? "مرشد سياحي مرخص بخبرة في آثار وتاريخ المملكة، شغوف بتقديم تجارب أصيلة..." : "Certified tour guide experienced in Saudi heritage..."}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none", resize: "vertical" }}
                    />
                  </div>
                </>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)", marginBottom: "4px" }}>
                    {isAr ? "الخطوة 4: بيانات الحساب البنكي لتحويل الأرباح (IBAN)" : "Step 4: Payout Bank Account (Saudi IBAN)"}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                    {isAr ? "يتم تحويل أرباحك الصافية بعد خصم عمولة المنصة مباشرة إلى حسابك البنكي في بنك سعودي معتمد." : "Your net tour earnings will be transferred directly to your bank account."}
                  </p>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "اسم البنك التجاري" : "Saudi Bank Name"} *
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                    >
                      <option value="Al Rajhi Bank — مصرف الراجحي">Al Rajhi Bank — مصرف الراجحي</option>
                      <option value="SNB (AlAhli) — البنك الأهلي السعودي">SNB (AlAhli) — البنك الأهلي السعودي</option>
                      <option value="Riyad Bank — بنك الرياض">Riyad Bank — بنك الرياض</option>
                      <option value="Alinma Bank — مصرف الإنماء">Alinma Bank — مصرف الإنماء</option>
                      <option value="Arab National Bank (ANB) — البنك العربي الوطني">Arab National Bank (ANB) — البنك العربي الوطني</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "اسم صاحب الحساب (كما هو مسجل في البنك)" : "Account Holder Name (as in Bank)"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder={fullName || (isAr ? "عبد العزيز فهد الشمري" : "Abdulaziz Al-Shammari")}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                      {isAr ? "رقم الآيبان البنكي (يبدأ بـ SA ويتكون من 24 خانة)" : "Saudi IBAN Number (Starts with SA, 24 chars)"} *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={24}
                      value={iban}
                      onChange={(e) => {
                        let val = e.target.value.toUpperCase();
                        if (!val.startsWith("SA")) val = "SA" + val.replace(/SA/g, "");
                        setIban(val);
                      }}
                      placeholder="SA80000000608010167519"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-gold-heading)", fontSize: "14px", fontWeight: 800, letterSpacing: "1px", outline: "none" }}
                    />
                  </div>

                  <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <ShieldCheckIcon size={18} color="#10B981" />
                    <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700 }}>
                      {isAr ? "أموالك وأرباحك محمية بنظام Escrow المالي المعتمد، وتُحول مباشرة لآيبانك فور انتهاء الجولة." : "Your earnings are protected with Escrow and released directly to your verified IBAN."}
                    </span>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "20px", borderTop: "1px solid var(--color-border)" }}>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                      background: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isAr ? "← السابق" : "← Previous"}
                  </button>
                ) : <div />}

                <Button variant="primary" size="lg" isLoading={isLoading}>
                  {step === 4
                    ? (isAr ? "إرسال طلب الانضمام للتحقق" : "Submit Application for Verification")
                    : (isAr ? "المتابعة للخطوة التالية ←" : "Continue to Next Step →")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
