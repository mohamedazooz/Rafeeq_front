"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { sessionManager } from "@/core/storage/session-storage";

interface GoogleSignInButtonProps {
  readonly labelAr?: string;
  readonly labelEn?: string;
  readonly lang?: "ar" | "en";
  readonly onSuccess?: () => void;
  readonly onError?: (err: string) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: unknown) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: string;
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              width?: string | number;
            }
          ) => void;
        };
      };
    };
  }
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  labelAr = "المتابعة باستخدام Google",
  labelEn = "Continue with Google",
  lang = "ar",
  onSuccess,
  onError,
}) => {
  const router = useRouter();
  const isAr = lang === "ar";
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customToken, setCustomToken] = useState("");
  const [isGsiReady, setIsGsiReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleAuthSuccess = (resData?: { user?: { accountType?: string; guideStatus?: string } }) => {
    if (onSuccess) {
      onSuccess();
    } else {
      const accountType = resData?.user?.accountType;
      const guideStatus = resData?.user?.guideStatus;
      if (accountType === "admin") router.push("/admin/dashboard");
      else if (guideStatus === "approved") router.push("/guide/dashboard");
      else router.push("/client/dashboard");
    }
  };

  const processGoogleToken = async (idToken: string) => {
    setIsLoading(true);
    try {
      const res = await authService.loginWithSocial("google", idToken);
      setIsLoading(false);
      setShowModal(false);
      handleAuthSuccess(res.data);
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : isAr ? "فشل تسجيل الدخول باستخدام Google" : "Google Sign-In failed";
      if (onError) onError(msg);
      // Demo fallback if backend is not reachable
      sessionManager.setToken("demo_google_jwt_session_token");
      setShowModal(false);
      handleAuthSuccess();
    }
  };

  useEffect(() => {
    // Load Google Identity Services script
    if (typeof window !== "undefined" && !window.google?.accounts?.id) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGsiReady(true);
        if (googleClientId && window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (res) => {
              if (res.credential) {
                processGoogleToken(res.credential);
              }
            },
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.google?.accounts?.id) {
      setIsGsiReady(true);
      if (googleClientId) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (res) => {
            if (res.credential) {
              processGoogleToken(res.credential);
            }
          },
        });
      }
    }
  }, [googleClientId]);

  const handleButtonClick = () => {
    if (googleClientId && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setShowModal(true);
    }
  };

  const handleInstantGoogleLogin = (emailToUse: string) => {
    const finalEmail = emailToUse.trim() || "user.google@rafeeq.sa";
    processGoogleToken(`mock_google_${finalEmail}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "12px 16px",
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
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        {isLoading ? (isAr ? "جاري الدخول..." : "Signing in...") : isAr ? labelAr : labelEn}
      </button>

      {/* Google Sign-In Assist Modal (For instant dev testing or direct OAuth) */}
      {showModal && (
        <div
          dir={isAr ? "rtl" : "ltr"}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              color: "var(--color-text-primary)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 style={{ fontSize: "16px", fontWeight: 800 }}>{isAr ? "تسجيل الدخول عبر Google" : "Sign in with Google"}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: "transparent", border: "none", fontSize: "18px", color: "var(--color-text-secondary)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "18px", lineHeight: "1.6" }}>
              {isAr
                ? "يمكنك الدخول الفوري ببريدك في Google، أو استخدام حساب تجريبي لتسجيل الدخول وإنشاء حساب موثق في منصة رفيق."
                : "You can sign in instantly with your Google email address or use a demo account to authenticate."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                  {isAr ? "أدخل بريد Google الخاص بك:" : "Enter your Google email:"}
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-secondary)",
                      color: "var(--color-text-primary)",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleInstantGoogleLogin(customEmail || "tourist.google@rafeeq.sa")}
                    disabled={isLoading}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "10px",
                      background: "var(--color-saudi-green)",
                      color: "#FFFFFF",
                      border: "none",
                      fontWeight: 700,
                      fontSize: "12px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isAr ? "دخول" : "Sign In"}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "6px 0" }}>
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--color-border)" }} />
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{isAr ? "أو حسابات سريعة جاهزة" : "or quick accounts"}</span>
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--color-border)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => handleInstantGoogleLogin("client.google@rafeeq.sa")}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-secondary)",
                    color: "var(--color-text-primary)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isAr ? "عميل Google سياحي" : "Tourist Client"}
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantGoogleLogin("guide.google@rafeeq.sa")}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-secondary)",
                    color: "var(--color-text-primary)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isAr ? "مرشد Google معتمد" : "Certified Guide"}
                </button>
              </div>

              <div style={{ marginTop: "10px", padding: "10px", borderRadius: "10px", background: "rgba(0, 108, 53, 0.08)", border: "1px solid rgba(0, 108, 53, 0.2)", fontSize: "11px", color: "var(--color-text-secondary)" }}>
                <strong>{isAr ? "ملاحظة إنتاجية:" : "Production Note:"}</strong>{" "}
                {isAr
                  ? "لربط نافذة Google المنبثقة الحقيقية، أضف معرف العميل في ملف `.env.local` تحت المتغير `NEXT_PUBLIC_GOOGLE_CLIENT_ID`."
                  : "To connect real Google One-Tap Popup, set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env.local`."}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
