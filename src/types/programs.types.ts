/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Programs, Destinations, Catalog & Search
   ═══════════════════════════════════════════════════════════════ */

export type ProgramStatus = "draft" | "pending_review" | "published" | "rejected" | "suspended";
export type ProgramDifficulty = "easy" | "moderate" | "challenging";

export interface Destination {
  readonly id: string;
  readonly slug: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly descriptionAr: string | null;
  readonly descriptionEn: string | null;
  readonly heroMediaId: string | null;
  readonly heroImageUrl?: string;
  readonly videoUrl?: string;
  readonly region: string;
  readonly isFeatured: boolean;
  readonly programsCount?: number;
  readonly orderIndex: number;
}

export interface Category {
  readonly id: string;
  readonly slug: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly iconName: string | null;
  readonly bannerMediaId: string | null;
  readonly bannerImageUrl?: string;
  readonly isFeatured: boolean;
  readonly programsCount?: number;
  readonly orderIndex: number;
}

export interface ProgramItineraryStop {
  readonly id: string;
  readonly programId: string;
  readonly stopOrder: number;
  readonly titleAr: string;
  readonly titleEn: string | null;
  readonly descriptionAr: string;
  readonly descriptionEn: string | null;
  readonly durationMinutes: number | null;
  readonly locationLat: number | null;
  readonly locationLng: number | null;
  readonly locationName: string | null;
}

export interface ProgramInclusion {
  readonly id: string;
  readonly programId: string;
  readonly itemTextAr: string;
  readonly itemTextEn: string | null;
  readonly isInclusion: boolean; // true = inclusion, false = exclusion
}

export interface ProgramPhoto {
  readonly id: string;
  readonly programId: string;
  readonly mediaId: string;
  readonly url: string;
  readonly isCover: boolean;
  readonly sortOrder: number;
}

export interface Program {
  readonly id: string;
  readonly slug: string;
  readonly guideId: string;
  readonly guideName?: string;
  readonly guideAvatarUrl?: string;
  readonly guideRatingAvg?: number;
  readonly destinationId: string;
  readonly destination?: Destination;
  readonly categoryId: string;
  readonly category?: Category;
  readonly titleAr: string;
  readonly titleEn: string | null;
  readonly descriptionAr: string;
  readonly descriptionEn: string | null;
  readonly meetingPointTextAr: string;
  readonly meetingPointTextEn: string | null;
  readonly meetingPointLat: number | null;
  readonly meetingPointLng: number | null;
  readonly durationHours: number;
  readonly maxGroupSize: number;
  readonly minGroupSize: number;
  readonly basePricePerPersonHalalas: number;
  readonly basePricePerPersonSar: number;
  readonly difficulty: ProgramDifficulty;
  readonly status: ProgramStatus;
  readonly isFeatured: boolean;
  readonly ratingAvg: number | null;
  readonly reviewsCount: number;
  readonly bookingsCount: number;
  readonly coverPhotoUrl?: string;
  readonly photos?: readonly ProgramPhoto[];
  readonly stops?: readonly ProgramItineraryStop[];
  readonly inclusions?: readonly ProgramInclusion[];
  readonly exclusions?: readonly ProgramInclusion[];
  readonly isFavorite?: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ProgramSearchQuery {
  readonly query?: string;
  readonly destinationSlug?: string;
  readonly destinationId?: string;
  readonly categorySlug?: string;
  readonly categoryId?: string;
  readonly minPriceSar?: number;
  readonly maxPriceSar?: number;
  readonly minRating?: number;
  readonly durationHours?: number;
  readonly difficulty?: ProgramDifficulty;
  readonly date?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: "price_asc" | "price_desc" | "rating" | "popular" | "newest";
}

export interface ProgramPriceQuote {
  readonly programId: string;
  readonly date: string;
  readonly participants: number;
  readonly pricePerPersonHalalas: number;
  readonly pricePerPersonSar: number;
  readonly baseTotalHalalas: number;
  readonly baseTotalSar: number;
  readonly platformFeeHalalas: number;
  readonly platformFeeSar: number;
  readonly vatHalalas: number;
  readonly vatSar: number;
  readonly additions: readonly {
    readonly id: string;
    readonly nameAr: string;
    readonly nameEn: string;
    readonly amountSar: number;
    readonly isMandatory: boolean;
  }[];
  readonly grandTotalHalalas: number;
  readonly grandTotalSar: number;
  readonly currency: string;
}

export interface CreateProgramDto {
  readonly destinationId: string;
  readonly categoryId: string;
  readonly titleAr: string;
  readonly titleEn?: string;
  readonly descriptionAr: string;
  readonly descriptionEn?: string;
  readonly meetingPointTextAr: string;
  readonly meetingPointTextEn?: string;
  readonly meetingPointLat?: number;
  readonly meetingPointLng?: number;
  readonly durationHours: number;
  readonly maxGroupSize: number;
  readonly minGroupSize: number;
  readonly basePricePerPersonHalalas: number;
  readonly difficulty: ProgramDifficulty;
  readonly stops?: readonly Omit<ProgramItineraryStop, "id" | "programId">[];
  readonly inclusions?: readonly string[];
  readonly exclusions?: readonly string[];
  readonly photoMediaIds?: readonly string[];
}
