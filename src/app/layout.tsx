import type { Metadata } from "next";
import { Cairo, Tajawal, Alexandria, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { HeaderShell } from "@/components/layout/HeaderShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "رفيق | منصة السياحة السعودية الهادفة",
    template: "%s | رفيق",
  },
  description:
    "منصة رفيق تربطك بأفضل المرشدين السياحيين المعتمدين في المملكة العربية السعودية. اكتشف برامج سياحية فريدة في الرياض، العلا، جدة، عسير والمزيد.",
  keywords: [
    "سياحة السعودية",
    "مرشد سياحي",
    "رحلات السعودية",
    "Visit Saudi",
    "tourism",
    "Saudi Arabia tours",
    "local guide",
    "Rafeeq",
    "رفيق",
  ],
  openGraph: {
    title: "رفيق — اكتشف السعودية مع مرشد محلي",
    description:
      "منصة رفيق تربطك بأفضل المرشدين السياحيين المعتمدين في المملكة العربية السعودية.",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "رفيق",
  },
  twitter: {
    card: "summary_large_image",
    title: "رفيق",
    description: "اكتشف السعودية مع مرشد محلي معتمد",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="light"
      className={`${cairo.variable} ${tajawal.variable} ${alexandria.variable} ${outfit.variable}`}
    >
      <body className={cairo.className}>
        <HeaderShell />
        {children}
      </body>
    </html>
  );
}
