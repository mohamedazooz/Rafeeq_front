"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";

export default function GuidePendingPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [guideData, setGuideData] = useState<{
    fullName?: string;
    licenseNo?: string;
    city?: string;
    submittedAt?: string;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("rafeeq_guide_application");
      if (stored) {
        try {
          setGuideData(JSON.parse(stored));
        } catch {}
      }
    }
  }, []);

  return (
    <>
      <main style={{ minHeight: "90vh", background: "var(--color-bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: "680px", width: "100%", textAlign: "center", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "28px", padding: "48px 36px", boxShadow: "var(--shadow-xl)" }}>
          
          {/* Animated Verification Icon */}
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "rgba(200, 169, 110, 0.15)", border: "2px solid var(--color-gold-heading)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "40px" }}>
            ⏳
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 800, marginBottom: "16px" }}>
            {isAr ? "حالة الطلب: قيد التدقيق والمراجعة الإدارية" : "Application Status: Under Verification"}
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: "12px" }}>
            {isAr ? "شكراً لك! تم استلام ملفك المهني بنجاح" : "Thank You! Application Submitted"}
          </h1>

          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.8", marginBottom: "28px" }}>
            {isAr
              ? `أهلاً بك أستاذ ${guideData.fullName || "المرشد المحلي"}، يجري حالياً فحص رخصة الإرشاد السياحي (${guideData.licenseNo || "TG-XXXXX"}) والتحقق من سريانها بالتنسيق مع سجلات وزارة السياحة السعودية.`
              : `Welcome ${guideData.fullName || "Tour Guide"}, our compliance team is currently reviewing your Ministry of Tourism license (${guideData.licenseNo || "TG-XXXXX"}).`}
          </p>

          {/* Verification Timeline Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", textAlign: "start", marginBottom: "32px" }}>
            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "20px", color: "#10B981" }}>✓</span>
              <div>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? "1. استلام الطلب والوثائق" : "1. Application Received"}</h4>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تم تسجيل بياناتك ورفع نسخة الترخيص بنجاح" : "Your details and license have been stored securely"}</p>
              </div>
            </div>

            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid rgba(245, 158, 11, 0.4)", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "20px", color: "#F59E0B" }}>⏳</span>
              <div>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? "2. التحقق من رخصة وزارة السياحة (TG)" : "2. MOT License Audit"}</h4>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "جاري المطابقة مع اشتراطات وزارة السياحة (يستغرق من ساعتين إلى 24 ساعة)" : "Matching with Ministry of Tourism records (2 to 24 hours)"}</p>
              </div>
            </div>

            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "14px", opacity: 0.7 }}>
              <span style={{ fontSize: "20px" }}>📧</span>
              <div>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? "3. إشعار النتيجة والاعتماد النهائي" : "3. Notification & Account Activation"}</h4>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "ستصلك رسالة فورية وبريد إلكتروني فور اعتماد الحساب لبدء إضافة برامجك" : "You will receive an email upon activation to publish your tours"}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/guide/dashboard">
              <Button variant="primary" size="md">
                {isAr ? "معاينة لوحة المرشد (وضع المراجعة)" : "Preview Guide Dashboard"}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md">
                {isAr ? "العودة للرئيسية" : "Back to Home"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
