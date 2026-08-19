/* ═══════════════════════════════════════════════════════════════
   Rafeeq Core — Application Configuration
   ═══════════════════════════════════════════════════════════════ */

export const APP_CONFIG = {
  appName: "رفيق | Rafeeq",
  appDescription: "المنصة السعودية الرائدة للتجارب السياحية والإرشاد المحلي الأصيل",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000",
  defaultLocale: "ar" as const,
  locales: ["ar", "en"] as const,
  currency: "SAR",
  currencySymbolAr: "ر.س",
  currencySymbolEn: "SAR",
  bookingSoftLockMinutes: 15,
  defaultVatRate: 0.15,
  defaultCommissionRate: 0.15,
  supportEmail: "support@rafeeq.sa",
  supportPhone: "+966 800 123 4567",
} as const;
