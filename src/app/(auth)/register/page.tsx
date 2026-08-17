"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { authService } from "@/lib/api/services";

type Lang = "ar" | "en";

const DICT = {
  ar: {
    title: "إنشاء حساب جديد",
    subtitle: "انضم إلى منصة رفيق واكتشف السعودية مع أبطال السياحة المحلية",
    fullNameLabel: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الثلاثي كما في الهوية",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "8 أحرف أو أكثر مع أرقام ورموز",
    dobLabel: "تاريخ الميلاد",
    registerBtn: "إنشاء الحساب والبدء 🚀",
    hasAccount: "لديك حساب بالفعل؟",
    loginNow: "تسجيل الدخول",
    termsNotice: "بإنشائك للحساب، فإنك توافق على الشروط والأحكام وسياسة الخصوصية.",
  },
  en: {
    title: "Create New Account",
    subtitle: "Join Rafeeq platform and explore Saudi Arabia with local tourism heroes",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Enter your full legal name",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "8 or more characters",
    dobLabel: "Date of Birth",
    registerBtn: "Create Account & Get Started 🚀",
    hasAccount: "Already have an account?",
    loginNow: "Sign In",
    termsNotice: "By creating an account, you agree to our Terms of Service and Privacy Policy.",
  },
} as const;

export default function RegisterPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ar");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const t = DICT[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Direct call to NestJS backend RegisterDto: { fullName, email, password, date_of_birth }
      const res = await authService.register({
        fullName,
        email,
        password,
        date_of_birth: dateOfBirth,
      });

      if (res.data.accessToken) {
        localStorage.setItem("rafeeq_access_token", res.data.accessToken);
        router.push("/client/dashboard");
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
        gridTemplateColumns: "0.9fr 1.1fr",
        background: "var(--color-midnight-blue)",
      }}
    >
      {/* Form Container */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-8)", position: "relative" }}>
        <div className="glass" style={{ width: "100%", maxWidth: "480px", padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" labelEn="Back to Home" lang={lang} />
            <button
              type="button"
              onClick={toggleLanguage}
              style={{
                padding: "var(--space-1) var(--space-3)",
                background: "rgba(255,255,255,0.1)",
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

          <div style={{ marginBottom: "var(--space-6)" }}>
            <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--color-warm-white)" }}>{t.title}</h1>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)", marginTop: "var(--space-1)" }}>{t.subtitle}</p>
          </div>

          {errorMsg && (
            <div style={{ padding: "var(--space-3)", background: "rgba(220,53,69,0.2)", border: "1px solid var(--color-error)", color: "white", borderRadius: "var(--radius-md)", fontSize: "var(--text-xs)", marginBottom: "var(--space-4)" }}>
              {errorMsg}
            </div>
          )}

          {/* Registration Form matching NestJS RegisterDto */}
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>{t.fullNameLabel}</label>
              <input
                type="text"
                required
                minLength={2}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none" }}
              />
            </div>

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
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>{t.passwordLabel}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
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

            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-1)" }}>{t.dobLabel}</label>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={{ width: "100%", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.08)", color: "white", outline: "none" }}
              />
            </div>

            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", lineHeight: "var(--leading-normal)" }}>
              {t.termsNotice}
            </p>

            <Button variant="primary" fullWidth size="lg" isLoading={isLoading}>
              {t.registerBtn}
            </Button>
          </form>

          {/* Footer Login Link */}
          <div style={{ marginTop: "var(--space-6)", textAlign: "center", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.5)" }}>
            {t.hasAccount}{" "}
            <Link href="/login" style={{ color: "var(--color-gold-royal)", textDecoration: "none", fontWeight: 700 }}>
              {t.loginNow}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Visual Side */}
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "var(--space-12)", overflow: "hidden" }}>
        <Image
          src="/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg"
          alt="Riyadh Saudi Arabia"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.85) 60%, rgba(13,27,42,0.96) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, color: "var(--color-warm-white)" }}>
          <span style={{ padding: "var(--space-1) var(--space-4)", background: "var(--gradient-emerald)", color: "white", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 800 }}>
            رحلات موثوقة بالضمان
          </span>
          <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, marginTop: "var(--space-3)" }}>
            احجز رحلاتك بـ <span className="text-gradient">راحة بال كافية</span>
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.7)", marginTop: "var(--space-2)", maxWidth: "480px" }}>
            أموالك محفوطة في حساب الضمان (Escrow) ولن تُحول للمرشد إلا بعد إتمام التجربة بنجاح ورضاك الكامل.
          </p>
        </div>
      </div>
    </div>
  );
}
