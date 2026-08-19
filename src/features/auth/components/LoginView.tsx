"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/design-system/primitives";
import { BackButton } from "@/components/ui/BackButton";
import { RafeeqLogo } from "@/components/brand";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { useLanguage } from "@/lib/language-provider";
import { useTheme } from "@/lib/theme-provider";
import { ALL_COUNTRY_CODES } from "@/lib/country-codes";
import { useLoginForm } from "../hooks/useLoginForm";

const DICT = {
  ar: {
    title: "تسجيل الدخول",
    subtitle: "مرحباً بك! اختر طريقة الدخول المفضلة للوصول إلى حسابك",
    welcome: "مرحباً بك مجدداً في رفيق",
    tagline: "بوابتك الرقمية لاستكشاف المملكة العربية السعودية وحجز البرامج السياحية مع مرشدين محليين معتمدين.",
    socialGoogle: "المتابعة باستخدام Google",
    socialApple: "المتابعة باستخدام Apple",
    orText: "أو عبر",
    emailTab: "البريد الإلكتروني",
    phoneTab: "رقم الجوال (OTP)",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    forgotPass: "نسيت كلمة المرور؟",
    loginBtn: "تسجيل الدخول",
    phoneLabel: "رقم الجوال والرمز الدولي",
    sendOtpBtn: "إرسال رمز التحقق OTP 📲",
    verifyOtpBtn: "تأكيد الدخول",
    enterOtpText: "أدخل رمز OTP المكون من 6 أرقام المرسل إلى",
    noAccount: "ليس لديك حساب بعد؟",
    registerNow: "أنشئ حساباً مجانياً الآن",
    featureTitle: "منصة رفيق للسياحة السعودية",
    featureDesc: "احجز رحلاتك بثقة مع أفضل المرشدين السياحيين المرخصين من وزارة السياحة وبحساب ضمان مالي محمي 100%.",
  },
  en: {
    title: "Sign In",
    subtitle: "Welcome back! Choose your preferred login method",
    welcome: "Welcome back to Rafeeq",
    tagline: "Your digital portal to explore Saudi Arabia and book tours with certified local guides.",
    socialGoogle: "Continue with Google",
    socialApple: "Continue with Apple",
    orText: "OR",
    emailTab: "Email Address",
    phoneTab: "Mobile Phone (OTP)",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    forgotPass: "Forgot password?",
    loginBtn: "Sign In",
    phoneLabel: "Mobile Number & Country Code",
    sendOtpBtn: "Send OTP Code 📲",
    verifyOtpBtn: "Verify & Sign In",
    enterOtpText: "Enter the 6-digit OTP code sent to",
    noAccount: "Don't have an account yet?",
    registerNow: "Create a free account now",
    featureTitle: "Rafeeq Saudi Tourism Platform",
    featureDesc: "Book tours with confidence featuring MOT-licensed local guides and 100% Escrow protected payments.",
  },
} as const;

export function LoginView() {
  const { lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isAr = lang === "ar";
  const t = DICT[lang];

  const {
    method,
    setMethod,
    step,
    selectedCountry,
    setSelectedCountry,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    otp,
    setOtp,
    isLoading,
    errorMsg,
    handleEmailLogin,
    handleSocialLogin,
    handleSendOtp,
    handleVerifyOtp,
  } = useLoginForm();

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Form Container */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: "460px", padding: "32px", borderRadius: "24px", border: "1px solid var(--color-border)", background: "var(--color-bg-card)", boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}>
          
          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <BackButton fallbackHref="/" labelAr="الرئيسية" labelEn="Home" lang={lang} />

            <RafeeqLogo variant="horizontal" size={34} animated priority />

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                onClick={toggleTheme}
                style={{ padding: "6px 12px", borderRadius: "100px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <button
                type="button"
                onClick={toggleLanguage}
                style={{ padding: "6px 12px", borderRadius: "100px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
              >
                {isAr ? "EN" : "عربي"}
              </button>
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>{t.title}</h1>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "4px" }}>{t.subtitle}</p>
          </div>

          {errorMsg && (
            <div style={{ padding: "12px", background: "rgba(220,53,69,0.15)", border: "1px solid var(--color-error)", color: "#EF4444", borderRadius: "10px", fontSize: "12px", marginBottom: "16px" }}>
              {errorMsg}
            </div>
          )}

          {/* Social Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <GoogleSignInButton lang={lang} />

            <button
              type="button"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontWeight: 700,
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
               {t.socialApple}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flexGrow: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>{t.orText}</span>
            <div style={{ flexGrow: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "6px", padding: "4px", background: "var(--color-bg-secondary)", borderRadius: "12px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => setMethod("email")}
              style={{
                flexGrow: 1,
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: method === "email" ? "var(--gradient-gold)" : "transparent",
                color: method === "email" ? "#0f172a" : "var(--color-text-secondary)",
                fontWeight: 800,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {t.emailTab}
            </button>
            <button
              type="button"
              onClick={() => setMethod("phone")}
              style={{
                flexGrow: 1,
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: method === "phone" ? "var(--gradient-gold)" : "transparent",
                color: method === "phone" ? "#0f172a" : "var(--color-text-secondary)",
                fontWeight: 800,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {t.phoneTab}
            </button>
          </div>

          {/* Form Content */}
          {method === "email" ? (
            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px", fontWeight: 700 }}>{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <label style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 700 }}>{t.passwordLabel}</label>
                  <Link href="/forgot-password" style={{ fontSize: "11px", color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 700 }}>
                    {t.forgotPass}
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    style={{ width: "100%", padding: "12px", paddingInlineEnd: "40px", borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ position: "absolute", left: isAr ? "12px" : "auto", right: isAr ? "auto" : "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--color-text-secondary)", fontSize: "14px", cursor: "pointer" }}
                  >
                    {showPassword ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" isLoading={isLoading} style={{ marginTop: "6px" }}>
                {t.loginBtn}
              </Button>
            </form>
          ) : (
            <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {step === 1 ? (
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "4px", fontWeight: 700 }}>{t.phoneLabel}</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const found = ALL_COUNTRY_CODES.find((c) => c.code === e.target.value);
                        if (found) setSelectedCountry(found);
                      }}
                      style={{ padding: "12px", borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "12px", outline: "none" }}
                    >
                      {ALL_COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="55 123 4567"
                      style={{ flexGrow: 1, padding: "12px", borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px" }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 700 }}>
                    {t.enterOtpText} {selectedCountry.code}{phoneNumber}
                  </label>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newOtp = [...otp];
                          newOtp[idx] = val;
                          setOtp(newOtp);
                          if (val && idx < 5) {
                            const nextEl = document.getElementById(`otp-${idx + 1}`);
                            nextEl?.focus();
                          }
                        }}
                        style={{ width: "42px", height: "48px", textAlign: "center", fontSize: "18px", fontWeight: 800, borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button variant="primary" fullWidth size="lg" isLoading={isLoading} style={{ marginTop: "6px" }}>
                {step === 1 ? t.sendOtpBtn : t.verifyOtpBtn}
              </Button>
            </form>
          )}

          {/* Footer Register Link */}
          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--color-text-secondary)" }}>
            {t.noAccount}{" "}
            <Link href="/register" style={{ color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 800 }}>
              {t.registerNow}
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Showcase Side */}
      <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px", overflow: "hidden" }}>
        <Image
          src="/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"
          alt="AlUla Saudi Arabia"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.85) 60%, rgba(13,27,42,0.96) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, color: "#FFFFFF", maxWidth: "520px" }}>
          <span style={{ padding: "4px 14px", background: "var(--gradient-gold)", color: "#0f172a", borderRadius: "100px", fontSize: "11px", fontWeight: 900, display: "inline-block", marginBottom: "12px" }}>
            🇸🇦 {isAr ? "ماشياً مع رؤية المملكة 2030" : "Aligned with Vision 2030"}
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#FFFFFF", marginBottom: "8px" }}>
            {t.featureTitle}
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: "1.7" }}>
            {t.featureDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
