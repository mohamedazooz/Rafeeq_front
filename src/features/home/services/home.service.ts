import { HomeHeroSlide } from "../types/home.types";

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: "alula",
    titleAr: "استكشف سحر العلا ومدائن صالح",
    titleEn: "Discover the Magic of AlUla & Hegra",
    subtitleAr: "أول موقع سعودي مدرج على قائمة التراث العالمي لليونسكو مع مرشدين محليين معتمدين.",
    subtitleEn: "Saudi Arabia's first UNESCO World Heritage site with certified local guides.",
  },
];

export class HomeService {
  static async getHeroSlides(): Promise<HomeHeroSlide[]> {
    return HOME_HERO_SLIDES;
  }
}
