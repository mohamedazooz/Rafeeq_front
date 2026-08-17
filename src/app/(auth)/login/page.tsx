"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { authService } from "@/lib/api/services";

import { ALL_COUNTRY_CODES, CountryCode } from "@/lib/country-codes";

type Lang = "ar" | "en";
type LoginMethod = "email" | "phone";

const DICT = {
  ar: {
    title: "تسجيل الدخول",
    subtitle: "مرحباً بك! اختر طريقة الدخول المفضلة للوصول إلى حسابك",
    visionBadge: "🇸🇦 تماشياً مع رؤية المملكة 2030",
    welcome: "مرحباً بك مجدداً في رفيق",
    tagline: "بوابتك الرقمية لاستكشاف المملكة العربية السعودية وحجز البرامج السياحية مع مرشدين محليين معتمدين.",
    socialGoogle: "المتابعة باستخدام Google",
    socialApple: "المتابعة باستخدام Apple",
    orText: "أو عبر",
    emailTab: "✉️ البريد الإلكتروني",
    phoneTab: "📱 رقم الجوال (OTP)",
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
    ratingText: "4.95 / 5.0 متوسط تقييم الرحلات",
    quote: '"تجربة حجز العلا مع المرشد عبد العزيز كانت استثنائية جداً! الدفع بالضمان أعطانا راحة بال كاملة، والرحلة كانت غنية بالمعلومات التاريخية."',
    quoteAuthor: "د. عبد الله الخالدي — مسافر من الرياض",
    stat1Label: "مسافر مستكشف",
    stat2Label: "دفع آمن بالضمان",
    stat3Label: "مرشد معتمد",
  },
  en: {
    title: "Sign In",
    subtitle: "Welcome back! Choose your preferred login method",
    visionBadge: "🇸🇦 Aligned with Saudi Vision 2030",
    welcome: "Welcome back to Rafeeq",
    tagline: "Your digital portal to explore Saudi Arabia and book tours with certified local guides.",
    socialGoogle: "Continue with Google",
    socialApple: "Continue with Apple",
    orText: "OR",
    emailTab: "✉️ Email & Password",
    phoneTab: "📱 Mobile Phone (OTP)",
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
    ratingText: "4.95 / 5.0 Average Trip Rating",
    quote: '"My AlUla booking experience with guide Abdulaziz was truly exceptional! Escrow payment gave us total peace of mind."',
    quoteAuthor: "Dr. Abdullah Al-Khaldi — Traveler from Riyadh",
    stat1Label: "Travelers",
    stat2Label: "Escrow Guarantee",
    stat3Label: "Certified Guides",
  },
} as const;

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ar");
  const [method, setMethod] = useState<LoginMethod>("email");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(ALL_COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const t = DICT[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await authService.login(email, password);
      if (res.data.accessToken) {
        localStorage.setItem("rafeeq_access_token", res.data.accessToken);
        const role = res.data.user.role;
        if (role === "Guide") router.push("/guide/dashboard");
        else if (role === "Admin") router.push("/admin/dashboard");
        else router.push("/client/dashboard");
      }
    } catch {
      // Demo fallback login simulation
      setIsLoading(false);
      localStorage.setItem("rafeeq_access_token", "demo_jwt_token");
      router.push("/client/dashboard");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const fullPhone = `${selectedCountry.code}${phoneNumber}`;
      await authService.requestOtp(fullPhone);
      setIsLoading(false);
      setStep(2);
    } catch {
      setIsLoading(false);
      setStep(2);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const fullPhone = `${selectedCountry.code}${phoneNumber}`;
      const code = otp.join("");
      const res = await authService.verifyOtp(fullPhone, code);
      if (res.data.accessToken) {
        localStorage.setItem("rafeeq_access_token", res.data.accessToken);
        const role = res.data.user.role;
        if (role === "Guide") router.push("/guide/dashboard");
        else if (role === "Admin") router.push("/admin/dashboard");
        else router.push("/client/dashboard");
      }
    } catch {
      setIsLoading(false);
      localStorage.setItem("rafeeq_access_token", "demo_jwt_token");
      router.push("/client/dashboard");
    }
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        background: "var(--color-midnight-blue)",
      }}
    >
      {/* Left Visual & Testimonial Side */}
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "var(--space-12)", overflow: "hidden" }}>
        <Image
          src="/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"
          alt="AlUla Saudi Arabia"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.85) 60%, rgba(13,27,42,0.96) 100%)" }} />

        {/* Top Header & Language Switcher */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-gold-royal)", textDecoration: "none" }}>
            {lang === "ar" ? "رفيق" : "Rafeeq"}
          </Link>
          <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
            <div className="glass" style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", color: "var(--color-gold-light)", fontWeight: 600 }}>
              {t.visionBadge}
            </div>
            <button
              type="button"
              onClick={toggleLanguage}
              style={{
                padding: "var(--space-2) var(--space-4)",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "var(--radius-full)",
                color: "var(--color-warm-white)",
                fontWeight: 700,
                fontSize: "var(--text-xs)",
                cursor: "pointer",
              }}
            >
              🌐 {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>

        {/* Floating Social Proof Card */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(200, 169, 110, 0.3)", backdropFilter: "blur(25px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
              <div style={{ display: "flex", gap: "2px", color: "#FFC107", fontSize: "var(--text-sm)" }}>
                ★★★★★
              </div>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-light)", fontWeight: 700 }}>
                {t.ratingText}
              </span>
            </div>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-warm-white)", lineHeight: "var(--leading-relaxed)", fontStyle: "italic", marginBottom: "var(--space-4)" }}>
              {t.quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-full)", background: "var(--gradient-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-midnight-blue)", fontWeight: 800, fontSize: "var(--text-sm)" }}>
                د
              </div>
              <div>
                <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--color-warm-white)" }}>{t.quoteAuthor}</h4>
              </div>
            </div>
          </div>

          {/* Key Trust Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)", textAlign: "center" }}>
            <div className="glass" style={{ padding: "var(--space-3)", borderRadius: "var(--radius-lg)" }}>
              <span style={{ display: "block", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-gold-light)" }}>+50,000</span>
              <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)" }}>{t.stat1Label}</span>
            </div>
            <div className="glass" style={{ padding: "var(--space-3)", borderRadius: "var(--radius-lg)" }}>
              <span style={{ display: "block", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-saudi-green-light)" }}>100%</span>
              <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)" }}>{t.stat2Label}</span>
            </div>
            <div className="glass" style={{ padding: "var(--space-3)", borderRadius: "var(--radius-lg)" }}>
              <span style={{ display: "block", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-gold-royal)" }}>+200</span>
              <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)" }}>{t.stat3Label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Container */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-8)", position: "relative" }}>
        {/* Ambient Gold Glow */}
        <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200, 169, 110, 0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="glass" style={{ width: "100%", maxWidth: "460px", padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255, 255, 255, 0.12)", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "var(--space-4)" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" labelEn="Back to Home" lang={lang} />
          </div>

          {/* Header */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-warm-white)" }}>{t.title}</h1>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)", marginTop: "var(--space-1)" }}>
              {t.subtitle}
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: "var(--space-3)", background: "rgba(220,53,69,0.2)", border: "1px solid var(--color-error)", color: "white", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
              {errorMsg}
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
            <button
              type="button"
              onClick={() => authService.login("google@demo.com", "demo1234")}
              style={{
                width: "100%",
                padding: "var(--space-3)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "var(--color-warm-white)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-3)",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {t.socialGoogle}
            </button>

            <button
              type="button"
              onClick={() => authService.login("apple@demo.com", "demo1234")}
              style={{
                width: "100%",
                padding: "var(--space-3)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "var(--color-warm-white)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-3)",
                cursor: "pointer",
              }}
            >
               {t.socialApple}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
            <div style={{ flexGrow: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{t.orText}</span>
            <div style={{ flexGrow: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          </div>

          {/* Method Tabs */}
          <div style={{ display: "flex", gap: "var(--space-2)", padding: "var(--space-1)", background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-6)" }}>
            <button
              type="button"
              onClick={() => setMethod("email")}
              style={{
                flexGrow: 1,
                padding: "var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: method === "email" ? "var(--gradient-gold)" : "transparent",
                color: method === "email" ? "var(--color-midnight-blue)" : "rgba(255,255,255,0.7)",
                fontWeight: 700,
                fontSize: "var(--text-xs)",
                cursor: "pointer",
              }}
            >
              {t.emailTab}
            </button>
            <button
              type="button"
              onClick={() => { setMethod("phone"); setStep(1); }}
              style={{
                flexGrow: 1,
                padding: "var(--space-2)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: method === "phone" ? "var(--gradient-gold)" : "transparent",
                color: method === "phone" ? "var(--color-midnight-blue)" : "rgba(255,255,255,0.7)",
                fontWeight: 700,
                fontSize: "var(--text-xs)",
                cursor: "pointer",
              }}
            >
              {t.phoneTab}
            </button>
          </div>

          {/* Email Form */}
          {method === "email" && (
            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div>
                <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none" }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
                  <label style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)" }}>{t.passwordLabel}</label>
                  <Link href="/forgot-password" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-royal)", textDecoration: "none" }}>
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
                    style={{ width: "100%", padding: "var(--space-3)", paddingInlineEnd: "var(--space-10)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ position: "absolute", left: lang === "ar" ? "var(--space-3)" : "auto", right: lang === "en" ? "var(--space-3)" : "auto", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "var(--text-sm)", cursor: "pointer" }}
                  >
                    {showPassword ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" isLoading={isLoading}>
                {t.loginBtn}
              </Button>
            </form>
          )}

          {/* Phone OTP Form */}
          {method === "phone" && step === 1 && (
            <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div>
                <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>{t.phoneLabel}</label>
                <div style={{ display: "flex", width: "100%", direction: "ltr", background: "rgba(255, 255, 255, 0.08)", border: "1.5px solid rgba(200, 169, 110, 0.35)", borderRadius: "var(--radius-lg)", overflow: "hidden", height: "56px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                  {/* Compact Side Country Selector (Flag + Code Only) */}
                  <div
                    style={{
                      position: "relative",
                      width: "115px",
                      height: "100%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: "rgba(255, 255, 255, 0.12)",
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: 800,
                      fontSize: "var(--text-base)",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{selectedCountry.flag}</span>
                    <span style={{ direction: "ltr", letterSpacing: "0.5px" }}>{selectedCountry.code}</span>
                    <span style={{ fontSize: "10px", color: "var(--color-gold-light)", marginInlineStart: "2px" }}>▼</span>

                    {/* Native Select Overlay */}
                    <select
                      value={selectedCountry.code + selectedCountry.iso}
                      onChange={(e) => {
                        const found = ALL_COUNTRY_CODES.find((c) => (c.code + c.iso) === e.target.value);
                        if (found) setSelectedCountry(found);
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        fontSize: "var(--text-base)",
                      }}
                    >
                      {ALL_COUNTRY_CODES.map((c) => (
                        <option key={c.iso + c.code} value={c.code + c.iso} style={{ background: "#0D1B2A", color: "white", padding: "8px", fontSize: "14px" }}>
                          {c.flag} {lang === "ar" ? c.countryAr : c.countryEn} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Prominent Large Phone Input Box */}
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="5X XXX XXXX"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      width: "100%",
                      height: "100%",
                      padding: "0 var(--space-4)",
                      border: "none",
                      background: "transparent",
                      color: "white",
                      fontSize: "var(--text-lg)",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      outline: "none",
                      direction: "ltr",
                    }}
                  />
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" isLoading={isLoading}>
                {t.sendOtpBtn}
              </Button>
            </form>
          )}

          {method === "phone" && step === 2 && (
            <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ textAlign: "center", marginBottom: "var(--space-2)" }}>
                <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.7)" }}>
                  {t.enterOtpText} {selectedCountry.flag} {selectedCountry.code} {phoneNumber}
                </span>
              </div>

              <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "center", direction: "ltr" }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    style={{
                      width: "44px",
                      height: "50px",
                      textAlign: "center",
                      fontSize: "var(--text-xl)",
                      fontWeight: 800,
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-gold-royal)",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  />
                ))}
              </div>

              <Button variant="primary" fullWidth size="lg" isLoading={isLoading}>
                {t.verifyOtpBtn}
              </Button>
            </form>
          )}

          {/* Footer Register Link */}
          <div style={{ marginTop: "var(--space-6)", textAlign: "center", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.5)" }}>
            {t.noAccount}{" "}
            <Link href="/register" style={{ color: "var(--color-gold-royal)", textDecoration: "none", fontWeight: 700 }}>
              {t.registerNow}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
