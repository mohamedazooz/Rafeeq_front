import { BecomeGuideApplication, GuideProfile } from "../types/guides.types";

export const MOCK_GUIDES: GuideProfile[] = [
  {
    id: "g-1",
    fullName: "عبد العزيز الشمري",
    licenseNo: "TG-994821",
    licenseExpiry: "2027-12-31",
    city: "العلا — AlUla",
    rating: 4.9,
    reviewsCount: 48,
    specialties: ["تراث وتاريخ آثار", "مغامرات وتخييم وهايكنج"],
    languages: ["العربية", "الإنجليزية (English)"],
    bio: "مرشد سياحي مرخص من وزارة السياحة بخبرة 6 سنوات في تنظيم الرحلات الجبلية والآثار التاريخية في العلا والديسة.",
    isVerified: true,
    pricePerDay: 850,
  },
  {
    id: "g-2",
    fullName: "سارة الغامدي",
    licenseNo: "TG-883102",
    licenseExpiry: "2026-10-15",
    city: "أبها وعسير — Abha & Aseer",
    rating: 5.0,
    reviewsCount: 62,
    specialties: ["تراث وتاريخ آثار", "تذوق وطهي شعبي سعودي"],
    languages: ["العربية", "الإنجليزية (English)", "الفرنسية (Français)"],
    bio: "متخصصة في التراث العسيري وتأريخ السودة والقرى التراثية بالجنوب.",
    isVerified: true,
    pricePerDay: 750,
  },
];

export class GuidesService {
  static async submitApplication(app: BecomeGuideApplication): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (typeof window !== "undefined") {
      localStorage.setItem("rafeeq_guide_application", JSON.stringify(app));
      localStorage.setItem("rafeeq_guide_status", "pending");
    }
    return { success: true };
  }

  static async getGuides(): Promise<GuideProfile[]> {
    return MOCK_GUIDES;
  }
}
