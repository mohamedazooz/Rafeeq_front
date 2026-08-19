import React from "react";
import type { Metadata } from "next";
import { HomeView } from "@/features/home";

export const metadata: Metadata = {
  title: "رفيق | المنصة السعودية لتجارب السفر والإرشاد السياحي المرخص",
  description: "اكتشف مدائن صالح بالعلا، قصور الدرعية بالرياض، وحارة البلد بجدة، مع نخبة من المرشدين السياحيين السعوديين المعتمدين وحماية مالية كاملة Escrow.",
  keywords: ["سياحة السعودية", "مرشد سياحي", "العلا", "الرياض", "جدة", "حجوزات رحلات", "رفيق"],
  openGraph: {
    title: "رفيق | المنصة السعودية لتجارب السفر والإرشاد السياحي المرخص",
    description: "اكتشف روائع المملكة وتراث اليونسكو برفقة مرشدين محليين معتمدين.",
    images: ["/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"],
  },
};

export default function HomePage() {
  return <HomeView />;
}
