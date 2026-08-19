import { ProgramItem, ProgramsFilterParams } from "../types/programs.types";
import { FEATURED_PROGRAMS } from "@/features/home/components/FeaturedProgramsSection";

export class ProgramsService {
  static async getPrograms(params?: ProgramsFilterParams): Promise<ProgramItem[]> {
    let filtered = [...FEATURED_PROGRAMS];

    if (params?.destinationSlug) {
      const dest = params.destinationSlug;
      filtered = filtered.filter((p) => {
        if (dest === "alula") return p.locationAr.includes("العلا") || p.locationEn.toLowerCase().includes("alula");
        if (dest === "riyadh") return p.locationAr.includes("الرياض") || p.locationEn.toLowerCase().includes("riyadh");
        if (dest === "jeddah") return p.locationAr.includes("جدة") || p.locationEn.toLowerCase().includes("jeddah");
        if (dest === "red-sea" || dest === "the-red-sea") return p.locationAr.includes("البحر الأحمر") || p.locationEn.toLowerCase().includes("red sea");
        if (dest === "aseer") return p.locationAr.includes("عسير") || p.locationEn.toLowerCase().includes("aseer");
        if (dest === "al-ahsa") return p.locationAr.includes("الأحساء") || p.locationEn.toLowerCase().includes("ahsa");
        return true;
      });
    }

    if (params?.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.titleAr.toLowerCase().includes(q) ||
          p.titleEn.toLowerCase().includes(q) ||
          p.locationAr.toLowerCase().includes(q) ||
          p.locationEn.toLowerCase().includes(q)
      );
    }

    if (params?.sortBy === "price_asc") {
      filtered.sort((a, b) => a.priceSar - b.priceSar);
    } else if (params?.sortBy === "price_desc") {
      filtered.sort((a, b) => b.priceSar - a.priceSar);
    } else if (params?.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }
}
