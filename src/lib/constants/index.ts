export const APP_NAME = "رفيق Rafeeq";
export const APP_DESCRIPTION = "المنصة الرقمية السعودية الوسيطة لربط المسافرين بالمرشدين السياحيين المعتمدين";

export const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "نظرة عامة والتحليلات" },
  { href: "/admin/endpoints", label: "إدارة الـ Endpoints والـ APIs" },
  { href: "/admin/users", label: "إدارة المستخدمين والصلاحيات" },
  { href: "/admin/guides-approval", label: "اعتماد وتوثيق المرشدين" },
  { href: "/admin/programs-review", label: "مراجعة ونشر البرامج" },
  { href: "/admin/bookings", label: "جميع الحجوزات والـ Override" },
  { href: "/admin/disputes", label: "النزاعات والتسوية المالية" },
  { href: "/admin/finance", label: "تحويلات IBAN والـ Escrow" },
  { href: "/admin/audit", label: "سجل التدقيق والأمان" },
  { href: "/admin/settings", label: "إعدادات التسعير والعمولة" },
] as const;

export const STATUS_COLORS = {
  confirmed: "#10B981",
  pending_payment: "#F59E0B",
  completed: "#3B82F6",
  cancelled: "#EF4444",
  disputed: "#8B5CF6",
} as const;
