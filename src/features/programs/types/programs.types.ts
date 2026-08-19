export interface ProgramItem {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  durationAr: string;
  durationEn: string;
  groupSizeAr: string;
  groupSizeEn: string;
  rating: number;
  reviewsCount: number;
  priceSar: number;
  priceHalalas: number | bigint;
  image: string;
  badgeAr?: string;
  badgeEn?: string;
  guideNameAr?: string;
  guideNameEn?: string;
}

export interface ProgramsFilterParams {
  query?: string;
  destinationSlug?: string;
  categorySlug?: string;
  sortBy?: "popular" | "rating" | "price_asc" | "price_desc";
}
