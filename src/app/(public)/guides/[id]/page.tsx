"use client";

import { useState } from "react";
import Image from "next/image";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

const DEMO_GUIDE_DETAILS = {
  id: "g-101",
  nameAr: "عبد العزيز الشمري",
  nameEn: "Abdulaziz Al-Shammari",
  licenseNo: "TL-998201",
  cityAr: "العلا / الرياض",
  cityEn: "AlUla / Riyadh",
  rating: 4.95,
  tripsCount: 142,
  languagesAr: ["العربية (اللغة الأم)", "الإنجليزية (طلاقة)"],
  languagesEn: ["Arabic (Native)", "English (Fluent)"],
  specialtiesAr: ["آثار مدائن صالح والأنباط", "سفاري صحراوي والتخييم", "تصوير المعالم الطبيعية"],
  specialtiesEn: ["AlUla Heritage", "Desert Camping", "Landscape Photography"],
  vehicleAr: "سيارة دفع رباعي جهزت بالكامل للصحراء + طقم الإسعافات الأولية",
  vehicleEn: "4x4 SUV Fully Equipped for Desert Trails + First Aid Kit",
  bioAr: "مرحباً بكم! أنا عبد العزيز، مرشد سياحي سعودي مرخص من وزارة السياحة. نشأت في العلا وعاصرت تاريخها الشفهي والآثاري. يسعدني مرافقتكم في رحلة لا تُنسى لاستكشاف عجائب العلا والصحراء.",
  bioEn: "Welcome! I am Abdulaziz, a licensed Saudi guide by the Ministry of Tourism. I grew up in AlUla and love hosting travelers across ancient Hegra and desert trails.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  reviews: [
    {
      id: "r1",
      authorAr: "د. عبد الله الخالدي",
      authorEn: "Dr. Abdullah Al-Khaldi",
      dateAr: "منذ أسبوعين",
      dateEn: "2 weeks ago",
      rating: 5,
      commentAr: "رحلة العلا مع المرشد عبد العزيز كانت من أجمل التجارب! معلومات غزيرة وسلاسة في التنقل جعلتنا نطلب تمديد الجولة.",
      commentEn: "AlUla tour with guide Abdulaziz was exceptional! Rich historical insights and seamless transportation.",
    },
    {
      id: "r2",
      authorAr: "نورة التميمي",
      authorEn: "Noura Al-Tamimi",
      dateAr: "منذ شهر",
      dateEn: "1 month ago",
      rating: 5,
      commentAr: "المرشد ممتاز جداً والسيارة مريحة ومجهزة بالكامل. الدفع بحساب الضمان المحمي عبر المنصة أعطانا اطمئنان تام.",
      commentEn: "Excellent guide and very comfortable vehicle. Payment via Escrow protection gave us total peace of mind.",
    },
  ],
  programs: [
    {
      id: "prog-alula-history",
      title: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
      location: "العلا",
      duration: "يومان (8 ساعات)",
      groupSize: "حتى 6 أشخاص",
      rating: 4.9,
      reviewsCount: 42,
      priceSar: 850,
      image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
      badge: "الأعلى تقييماً",
    },
    {
      id: "prog-riyadh-desert",
      title: "سفاري صحراء الرياض وجلسة كشتة تقليدية تحت النجوم",
      location: "الرياض",
      duration: "يوم واحد (6 ساعات)",
      groupSize: "حتى 10 أشخاص",
      rating: 4.8,
      reviewsCount: 38,
      priceSar: 450,
      image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
      badge: "الأكثر حجزاً",
    },
  ],
};

export default function PublicGuideProfilePage() {
  const { lang } = useLanguage();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const isAr = lang === "ar";
  const guide = DEMO_GUIDE_DETAILS;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessageModal(false);
    setMessageText("");
    setToast(isAr ? "تم إرسال رسالتك المباشرة للمرشد بنجاح!" : "Your direct message was sent to the guide!");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "#10B981", color: "#fff", padding: "14px 28px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", zIndex: 9999, fontWeight: 800, fontSize: "14px" }}>
          {toast}
        </div>
      )}

      {/* Guide Header Banner */}
      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "120px 40px", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "20px" }}>
            <BackButton fallbackHref="/guides" labelAr="العودة لجميع المرشدين" labelEn="Back to Guides" lang={lang} />
          </div>

          <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--color-gold-heading)", flexShrink: 0, position: "relative", boxShadow: "var(--shadow-md)" }}>
              <Image src={guide.avatar} alt={isAr ? guide.nameAr : guide.nameEn} fill style={{ objectFit: "cover" }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                <h1 style={{ color: "var(--color-text-primary)", fontSize: "28px", fontWeight: 900 }}>{isAr ? guide.nameAr : guide.nameEn}</h1>
                <span style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10B981", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 800 }}>
                  ✓ {isAr ? "مرشد سياحي معتمد من وزارة السياحة" : "Ministry of Tourism Certified Guide"}
                </span>
              </div>

              <div style={{ fontSize: "12px", color: "var(--color-gold-heading)", fontFamily: "monospace", marginBottom: "12px" }}>
                {isAr ? "رخصة سياحية سارية رقم:" : "License No:"} {guide.licenseNo} • 📍 {isAr ? guide.cityAr : guide.cityEn}
              </div>

              <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: "1.7", maxWidth: "700px", marginBottom: "16px" }}>
                {isAr ? guide.bioAr : guide.bioEn}
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px", color: "var(--color-text-muted)" }}>
                <div>⭐ <strong style={{ color: "#D97706" }}>{guide.rating}</strong> ({guide.tripsCount} {isAr ? "رحلة ناجحة" : "successful trips"})</div>
                <div>🗣️ {(isAr ? guide.languagesAr : guide.languagesEn).join(" • ")}</div>
                <div>🚘 {isAr ? guide.vehicleAr : guide.vehicleEn}</div>
              </div>
            </div>

            {/* Actions Box */}
            <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "12px", width: "260px", boxShadow: "var(--shadow-md)" }}>
              <Button variant="primary" fullWidth size="lg" onClick={() => setShowMessageModal(true)}>
                {isAr ? "تواصل مباشر مع المرشد" : "Direct Message Guide"}
              </Button>
              <div style={{ fontSize: "11px", color: "var(--color-text-muted)", textAlign: "center" }}>
                🛡️ {isAr ? "رد سريع خلال أقل من ساعة • حماية كاملة عبر رفيق" : "Fast response under 1 hour • Full Escrow Protection"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Programs Section */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "var(--color-text-primary)" }}>
              {isAr ? `البرامج والتجارب المتاحة من ${guide.nameAr}` : `Available Tours by ${guide.nameEn}`}
            </h2>
            <span style={{ fontSize: "13px", color: "var(--color-gold-heading)", fontWeight: 800 }}>{guide.programs.length} {isAr ? "برامج متاحة" : "tours available"}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginBottom: "48px" }}>
            {guide.programs.map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>

          {/* Traveler Reviews Thread */}
          <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "24px", marginBottom: "40px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: "20px" }}>
              {isAr ? `تقييمات وتجارب المسافرين مع ${guide.nameAr}` : `Traveler Reviews & Experiences with ${guide.nameEn}`}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {guide.reviews.map((rev) => (
                <div key={rev.id} style={{ background: "var(--color-bg-secondary)", padding: "18px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div>
                      <strong style={{ fontSize: "14px", color: "var(--color-text-primary)" }}>{isAr ? rev.authorAr : rev.authorEn}</strong>
                      <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginInlineStart: "8px" }}>{isAr ? rev.dateAr : rev.dateEn}</span>
                    </div>
                    <div style={{ color: "#D97706", fontSize: "13px", fontWeight: 800 }}>★★★★★ {rev.rating}.0</div>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0, lineHeight: "1.6" }}>
                    "{isAr ? rev.commentAr : rev.commentEn}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Escrow Security Guarantee */}
          <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "20px 28px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#10B981", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#10B981", marginBottom: "4px" }}>
                {isAr ? "حماية حساب الضمان المحمي" : "Protected Escrow Account Guarantee"}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
                {isAr
                  ? "تضمن لك منصة رفيق حماية أموالك كاملة أثناء الحجز مع المرشد. لن يتم الإفراج عن المبلغ إلا بعد اكتمال الرحلة وتأكيد رضاك التام."
                  : "Rafeeq guarantees your booking payment protection. Funds are released to the guide only after trip completion."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Messaging Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={isAr ? `تواصل مباشر مع المرشد ${guide.nameAr}` : `Direct Message Guide ${guide.nameEn}`}
        subtitle={isAr ? "محادثة آمنة ومحمية لحجز البرامج والاستفسارات" : "Safe direct chat for inquiries and booking details"}
        maxWidth="520px"
      >
        <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>{isAr ? "نص الرسالة أو الاستفسار عن البرنامج والتاريخ:" : "Message text or date query:"}</label>
            <textarea
              required
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={isAr ? "مرحباً عبد العزيز، أود الاستفسار عن حجز تجربة العلا للجمعة القادمة..." : "Hello Abdulaziz, I would like to ask about booking the AlUla tour next Friday..."}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", outline: "none", fontSize: "13px", resize: "none" }}
            />
          </div>

          <div style={{ background: "rgba(200,169,110,0.1)", padding: "12px", borderRadius: "12px", fontSize: "11px", color: "var(--color-text-muted)" }}>
            💡 {isAr ? "تنبيه: المحادثة آمنة ومراقبة إدارياً لحماية طرفي الرحلة والالتزام بسياسات دفع حساب الضمان المحمي." : "Note: Messages are monitored for safety and compliance with Escrow policies."}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="ghost" size="sm" type="button" onClick={() => setShowMessageModal(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button variant="primary" size="md" type="submit">{isAr ? "إرسال الرسالة الآن" : "Send Message Now"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
