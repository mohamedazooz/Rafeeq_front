"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

export default function ContactPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <Header />

      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "100px 40px", textAlign: "center", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)", textAlign: isAr ? "right" : "left" }}>
            <BackButton fallbackHref="/" labelAr="العودة للرئيسية" />
          </div>

          <h1 style={{ color: "var(--color-text-primary)", fontSize: "var(--text-4xl)", fontWeight: 900 }}>
            {isAr ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg)", maxWidth: "500px", marginInline: "auto", marginTop: "var(--space-3)" }}>
            {isAr ? "نحن هنا لمساعدتك والإجابة على أي استفسار حول البرامج والحجوزات." : "We are here to assist you with any inquiries about tours and bookings."}
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <form style={{ padding: "32px", borderRadius: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 700, marginBottom: "var(--space-1)", color: "var(--color-text-primary)" }}>
                {isAr ? "الاسم الكامل" : "Full Name"}
              </label>
              <input
                type="text"
                placeholder={isAr ? "أدخل اسمك" : "Enter your full name"}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 700, marginBottom: "var(--space-1)", color: "var(--color-text-primary)" }}>
                {isAr ? "البريد الإلكتروني / رقم الجوال" : "Email / Mobile Number"}
              </label>
              <input
                type="text"
                placeholder="example@domain.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 700, marginBottom: "var(--space-1)", color: "var(--color-text-primary)" }}>
                {isAr ? "نص الرسالة" : "Message Text"}
              </label>
              <textarea
                rows={4}
                placeholder={isAr ? "اكتب استفسارك هنا..." : "Type your message here..."}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", outline: "none", resize: "none" }}
              />
            </div>
            <Button variant="primary" fullWidth size="lg">
              {isAr ? "إرسال الرسالة" : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
