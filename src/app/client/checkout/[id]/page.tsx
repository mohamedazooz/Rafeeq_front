"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Badge } from "@/design-system/primitives";
import { useToast } from "@/design-system/primitives/Toast";
import { BackButton } from "@/components/ui/BackButton";
import {
  ShieldCheckIcon,
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "@/components/icons";

interface CheckoutProgram {
  id: string;
  title: string;
  location: string;
  pricePerPersonSar: number;
  image: string;
  guideName: string;
  guideRating: number;
}

const MOCK_PROGRAMS_MAP: Record<string, CheckoutProgram> = {
  "prog-alula-history": {
    id: "prog-alula-history",
    title: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
    location: "العلا — المنطقة الشمالية الغربية",
    pricePerPersonSar: 850,
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    guideName: "عبد العزيز الشمري",
    guideRating: 4.95,
  },
  "prog-riyadh-diriyah": {
    id: "prog-riyadh-diriyah",
    title: "رحلة أصالة الدرعية التاريخية وحي الطريف التراثي",
    location: "الرياض — الدرعية",
    pricePerPersonSar: 450,
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    guideName: "سارة القحطاني",
    guideRating: 4.98,
  },
};

const DEFAULT_PROGRAM: CheckoutProgram = {
  id: "prog-alula-history",
  title: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
  location: "العلا — المنطقة الشمالية الغربية",
  pricePerPersonSar: 850,
  image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
  guideName: "عبد العزيز الشمري",
  guideRating: 4.95,
};

export default function CheckoutPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error, warning } = useToast();

  const dateParam = searchParams?.get("date") || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0];
  const participantsParam = Number(searchParams?.get("participants")) || 2;

  const [program] = useState<CheckoutProgram>(() => MOCK_PROGRAMS_MAP[id] || DEFAULT_PROGRAM);
  const [participants] = useState<number>(participantsParam);
  const [tripDate] = useState<string>(dateParam);
  const [paymentMethod, setPaymentMethod] = useState<"mada" | "apple_pay" | "visa">("mada");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 15-Minute Soft Lock Countdown Timer (900 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900);

  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      warning("انتهت مهلة تجميد المقعد (15 دقيقة). يرجى إعادة اختيار الموعد.");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds, warning]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Pricing calculations
  const baseTotalSar = program.pricePerPersonSar * participants;
  const vatAmountSar = Math.round(baseTotalSar * 0.15);
  const serviceFeeSar = 25;
  const grandTotalSar = baseTotalSar + vatAmountSar + serviceFeeSar;

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timeLeftSeconds <= 0) {
      error("انتهت صلاحية تجميد الحجز. يرجى العودة لصفحة البرنامج.");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate live checkout API call
      setTimeout(() => {
        setIsProcessing(false);
        success("تم الدخول في الضمان المالي وتأكيد الحجز بنجاح! 🎉🔒");
        router.push("/client/bookings/RFQ-2026-9042");
      }, 1500);
    } catch {
      setIsProcessing(false);
      error("حدث خطأ أثناء الاتصال ببوابة الدفع. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-primary)", padding: "var(--space-8) var(--space-4)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header with BackButton */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <BackButton fallbackHref={`/programs/${id}`} labelAr="العودة لتفاصيل البرنامج" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>رمز الأمان:</span>
            <Badge variant="success">🔒 تشفير بنكي SSL 256-bit</Badge>
          </div>
        </div>

        {/* Soft Lock Timer Banner */}
        <div
          style={{
            background: timeLeftSeconds > 180 ? "rgba(200, 169, 110, 0.12)" : "rgba(239, 68, 68, 0.12)",
            border: `1px solid ${timeLeftSeconds > 180 ? "var(--color-gold-royal)" : "var(--color-danger)"}`,
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4) var(--space-6)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "var(--space-8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CalendarIcon size={22} color="var(--color-gold-heading)" />
            <div>
              <h4 style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: 800 }}>
                المقاعد مجمدة مؤقتاً لصالحك (Soft-Lock) ⏱️
              </h4>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                تم حجز التاريخ والمقاعد، يرجى إتمام الدفع قبل انتهاء العداد لإتاحتها للمسافرين الآخرين.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--color-bg-card)", padding: "6px 16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>الوقت المتبقي:</span>
            <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, fontFamily: "monospace", color: timeLeftSeconds > 180 ? "var(--color-gold-heading)" : "var(--color-danger)" }}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>
        </div>

        {/* Main Grid: Left Payment Details / Right Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "var(--space-8)", alignItems: "start" }}>
          
          {/* Left Column: Payment & Traveler Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            
            {/* Tour & Guide Summary Card */}
            <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ position: "relative", width: "90px", height: "90px", borderRadius: "var(--radius-lg)", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={program.image} alt={program.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-heading)", fontWeight: 700 }}>
                    {program.location}
                  </span>
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "4px 0" }}>
                    {program.title}
                  </h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0 }}>
                    المرشد المسؤول: <strong style={{ color: "var(--color-text-primary)" }}>{program.guideName}</strong> (★ {program.guideRating})
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>تاريخ الرحلة:</span>
                  <strong style={{ fontSize: "var(--text-sm)" }}>{tripDate}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>عدد المشاركين:</span>
                  <strong style={{ fontSize: "var(--text-sm)" }}>{participants} مسافرين</strong>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
                اختر وسيلة الدفع 💳
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "var(--space-6)" }}>
                
                {/* Mada */}
                <label
                  onClick={() => setPaymentMethod("mada")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "mada" ? "var(--color-saudi-green)" : "var(--color-border)"}`,
                    background: paymentMethod === "mada" ? "rgba(0, 108, 53, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "mada"} readOnly style={{ accentColor: "var(--color-saudi-green)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>بطاقة مدى البنكية (Mada)</span>
                  </div>
                  <Badge variant="outline">🇸🇦 دفع محلي سريع</Badge>
                </label>

                {/* Apple Pay */}
                <label
                  onClick={() => setPaymentMethod("apple_pay")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "apple_pay" ? "var(--color-gold-royal)" : "var(--color-border)"}`,
                    background: paymentMethod === "apple_pay" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "apple_pay"} readOnly style={{ accentColor: "var(--color-gold-royal)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>Apple Pay</span>
                  </div>
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}> Pay</span>
                </label>

                {/* Visa / Master */}
                <label
                  onClick={() => setPaymentMethod("visa")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "visa" ? "var(--color-gold-royal)" : "var(--color-border)"}`,
                    background: paymentMethod === "visa" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "visa"} readOnly style={{ accentColor: "var(--color-gold-royal)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>بطاقة ائتمانية (Visa / Mastercard)</span>
                  </div>
                  <CreditCardIcon size={18} />
                </label>
              </div>

              {/* Special Notes */}
              <div>
                <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "6px" }}>
                  ملاحظات أو متطلبات خاصة للمرشد (اختياري):
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="مثال: يرجى توفير مقاعد أطفال، أو تفضيلات غذائية خاصة..."
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-secondary)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-xs)",
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Price Breakdown & Escrow Action */}
          <div>
            <div
              className="glass"
              style={{
                position: "sticky",
                top: "calc(var(--header-height) + var(--space-4))",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--color-gold-royal)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 900, marginBottom: "var(--space-4)", color: "var(--color-gold-heading)" }}>
                تفاصيل الفاتورة الضريبية 🧾
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>سعر البرنامج الأساسي ({participants} × {program.pricePerPersonSar} ر.س):</span>
                  <span>{baseTotalSar.toLocaleString("en-US")} ر.س</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>ضريبة القيمة المضافة (15% VAT):</span>
                  <span>{vatAmountSar.toLocaleString("en-US")} ر.س</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>رسوم الخدمة والتشغيل التقني:</span>
                  <span>{serviceFeeSar} ر.س</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingTop: "14px",
                    marginTop: "6px",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>
                      الإجمالي النهائي المطلوب سداده:
                    </span>
                    <span style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                      {grandTotalSar.toLocaleString("en-US")}
                    </span>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginInlineStart: "4px" }}>
                      ر.س
                    </span>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "var(--radius-lg)",
                  padding: "12px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "var(--space-6)",
                }}
              >
                <ShieldCheckIcon size={24} color="#10B981" />
                <p style={{ margin: 0, fontSize: "11px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                  <strong>ضمان مالي 100% (Escrow):</strong> لا يتم تحويل المبلغ لحساب المرشد إلا بعد اكتمال رحلتك بنجاح ورضاك التام.
                </p>
              </div>

              {/* Pay Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleExecutePayment}
                disabled={isProcessing || timeLeftSeconds <= 0}
              >
                {isProcessing ? "جاري معالجة الدفع المحمي..." : `سداد ${grandTotalSar.toLocaleString("en-US")} ر.س والدخول في الضمان 🔒`}
              </Button>

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                  بالضغط على سداد، أنت توافق على <Link href="/pages/terms" style={{ color: "var(--color-gold-royal)" }}>شروط الحجز وسياسة الإلغاء</Link>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
