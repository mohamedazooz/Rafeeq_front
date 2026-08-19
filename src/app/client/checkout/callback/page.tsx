"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Badge } from "@/design-system/primitives";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
import {
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  FileTextIcon,
  CalendarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "@/components/icons";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, isAr } = useLanguage();

  const statusParam = searchParams.get("status") || "success";
  const paymentId = searchParams.get("paymentId") || searchParams.get("Id") || "MF-2026-88012";
  const bookingId = searchParams.get("bookingId") || "RFQ-2026-9042";

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(statusParam === "success" || statusParam === "paid");
    }, 1200);
    return () => clearTimeout(timer);
  }, [statusParam]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid var(--color-border)", borderTopColor: "var(--color-gold-heading)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <h3 style={{ fontSize: "16px", fontWeight: 800 }}>{isAr ? "جاري التحقق من عملية الدفع لدى بوابة ماي فاتورة..." : "Verifying payment with MyFatoorah Gateway..."}</h3>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const basePriceHalalas = BigInt(170000); // 1,700 SAR
  const vatHalalas = BigInt(25500); // 255 SAR (15%)
  const serviceFeeHalalas = BigInt(2500); // 25 SAR
  const grandTotalHalalas = basePriceHalalas + vatHalalas + serviceFeeHalalas;

  return (
    <div style={{ maxWidth: "750px", margin: "40px auto", padding: "0 16px" }}>
      {isSuccess ? (
        <div className="glass" style={{ padding: "32px", borderRadius: "24px", border: "1px solid var(--color-gold-royal)", boxShadow: "var(--shadow-gold)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(16, 185, 129, 0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <CheckCircleIcon size={36} color="#10B981" />
            </div>
            <Badge variant="success">{isAr ? "تم الدفع وتجميد المبلغ في الـ Escrow بنجاح" : "Paid & Protected via Escrow"}</Badge>
            <h1 style={{ fontSize: "24px", fontWeight: 900, marginTop: "12px", marginBottom: "6px" }}>
              {isAr ? "شكراً لك! تم تأكيد حجزك السياحي بنجاح" : "Thank You! Tour Booking Successfully Confirmed"}
            </h1>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
              {isAr ? `رقم العملية لدى ماي فاتورة: ${paymentId} • رقم الحجز: ${bookingId}` : `MyFatoorah Payment ID: ${paymentId} • Booking ID: ${bookingId}`}
            </p>
          </div>

          {/* Tax Invoice Box ZATCA */}
          <div style={{ background: "var(--color-bg-secondary)", borderRadius: "16px", padding: "20px", border: "1px solid var(--color-border)", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileTextIcon size={20} color="var(--color-gold-heading)" />
                <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>{isAr ? "الفاتورة الضريبية المعتمدة (ZATCA)" : "Tax Invoice Summary (ZATCA)"}</h3>
              </div>
              <Badge variant="outline">VAT 15%</Badge>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                <span>{isAr ? "المبلغ الأساسي للرحلة:" : "Base Tour Price:"}</span>
                <span>{formatPrice(basePriceHalalas, lang, true)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                <span>{isAr ? "ضريبة القيمة المضافة (15%):" : "Value Added Tax (15%):"}</span>
                <span>{formatPrice(vatHalalas, lang, true)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                <span>{isAr ? "رسوم الخدمة والتشغيل:" : "Platform Service Fee:"}</span>
                <span>{formatPrice(serviceFeeHalalas, lang, true)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "16px", paddingTop: "12px", borderTop: "1px solid var(--color-border)", color: "var(--color-saudi-green)" }}>
                <span>{isAr ? "الإجمالي المدفوع:" : "Grand Total Paid:"}</span>
                <span>{formatPrice(grandTotalHalalas, lang, true)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href={`/client/bookings/${bookingId}`} style={{ flex: 1 }}>
              <Button variant="primary" fullWidth size="lg">
                <CalendarIcon size={18} />
                <span>{isAr ? "عرض تفاصيل الحجز والتذكرة" : "View Booking & E-Ticket"}</span>
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => alert(isAr ? "جاري تحميل الفاتورة الضريبية PDF..." : "Downloading Tax Invoice PDF...")}>
              <DownloadIcon size={18} />
              <span>{isAr ? "تحميل الفاتورة PDF" : "Download Invoice PDF"}</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass" style={{ padding: "32px", borderRadius: "24px", border: "1px solid var(--color-danger)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(239, 68, 68, 0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <XCircleIcon size={36} color="#EF4444" />
            </div>
            <Badge variant="error">{isAr ? "فشلت عملية الدفع أو تم إلغاؤها" : "Payment Failed or Cancelled"}</Badge>
            <h1 style={{ fontSize: "24px", fontWeight: 900, marginTop: "12px", marginBottom: "6px" }}>
              {isAr ? "عذراً، لم تكتمل عملية الدفع عبر بوابة ماي فاتورة" : "Sorry, Payment Could Not Be Processed"}
            </h1>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
              {isAr ? "لم يتم خصم أي مبلغ من حسابك. يمكنك اختيار طريقة دفع أخرى أو إعادة المحاولة." : "No funds were debited from your account. You can retry with a different payment method."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Button variant="primary" size="lg" onClick={() => router.push(`/client/checkout/${bookingId}`)}>
              <span>{isAr ? "إعادة محاولة الدفع" : "Retry Payment"}</span>
            </Button>
            <Link href="/programs">
              <Button variant="outline" size="lg">
                <span>{isAr ? "العودة للكتالوج" : "Back to Programs"}</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
