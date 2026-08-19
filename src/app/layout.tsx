import type { Metadata } from "next";
import { Cairo, Tajawal, Alexandria, Outfit } from "next/font/google";
import "@/styles/globals.css";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
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
    images: [
      {
        url: "/logo-emblem.png",
        width: 1024,
        height: 1024,
        alt: "رفيق | منصة السياحة السعودية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "رفيق",
    description: "اكتشف السعودية مع مرشد محلي معتمد",
    images: ["/logo-emblem.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { HeaderShell } from "@/components/layout/HeaderShell";
import { FooterShell } from "@/components/layout/FooterShell";
import { ThemeProvider } from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/language-provider";
import { DashboardMetricsProvider } from "@/lib/dashboard-metrics";
import { ToastProvider } from "@/design-system/primitives";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} ${alexandria.variable} ${outfit.variable}`}
    >
      <body className={cairo.className}>
        <LanguageProvider>
          <ThemeProvider>
            <DashboardMetricsProvider>
              <ToastProvider>
                <HeaderShell />
                {children}
                <FooterShell />
              </ToastProvider>
            </DashboardMetricsProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

