"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { CheckCircleIcon, ClockIcon, MessageSquareIcon } from "@/components/icons";

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
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return (
    <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div
        className="glass"
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "48px 32px",
          borderRadius: "24px",
          textAlign: "center",
          border: "1px solid var(--color-gold-royal)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(200, 169, 110, 0.15)",
            color: "var(--color-gold-heading)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <ClockIcon size={36} color="var(--color-gold-heading)" />
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
          {isAr ? "طلبك قيد التدقيق والمطابقة النظامية" : "Application Under Verification"}
        </h1>

        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px" }}>
          {isAr
            ? `مرحباً بك يا ${guideData.fullName || "مرشدنا العزيز"}، طلب انضمامك وترخيصك السياحي (${guideData.licenseNo || "TG-XXXXX"}) يخضع حالياً لتدقيق فريق التراخيص والامتثال لضمان مطابقة اشتراطات وزارة السياحة.`
            : `Welcome ${guideData.fullName || "Tour Guide"}, our compliance team is currently reviewing your Ministry of Tourism license (${guideData.licenseNo || "TG-XXXXX"}).`}
        </p>

        {/* Verification Timeline Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", textAlign: "start", marginBottom: "32px" }}>
          <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", gap: "14px" }}>
            <CheckCircleIcon size={20} color="#10B981" />
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? "1. استلام الطلب والوثائق" : "1. Application Received"}</h4>
              <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "تم تسجيل بياناتك ورفع نسخة الترخيص بنجاح" : "Your details and license have been stored securely"}</p>
            </div>
          </div>

          <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid rgba(245, 158, 11, 0.4)", display: "flex", alignItems: "center", gap: "14px" }}>
            <ClockIcon size={20} color="#F59E0B" />
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? "2. التحقق من رخصة وزارة السياحة (TG)" : "2. MOT License Audit"}</h4>
              <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{isAr ? "جاري المطابقة مع اشتراطات وزارة السياحة (يستغرق من ساعتين إلى 24 ساعة)" : "Matching with Ministry of Tourism records (2 to 24 hours)"}</p>
            </div>
          </div>

          <div style={{ padding: "16px 20px", borderRadius: "14px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "14px", opacity: 0.7 }}>
            <MessageSquareIcon size={20} color="var(--color-text-muted)" />
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
  );
}
