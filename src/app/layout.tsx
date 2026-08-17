import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "رفيق | Rafeeq — اكتشف السعودية مع مرشد محلي",
    template: "%s | رفيق Rafeeq",
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
    title: "رفيق | Rafeeq — اكتشف السعودية مع مرشد محلي",
    description:
      "منصة رفيق تربطك بأفضل المرشدين السياحيين المعتمدين في المملكة العربية السعودية.",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "Rafeeq رفيق",
  },
  twitter: {
    card: "summary_large_image",
    title: "رفيق | Rafeeq",
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
    <html lang="ar" dir="rtl" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
