/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Guides, Availability & KYC
   ═══════════════════════════════════════════════════════════════ */

export interface GuideProfile {
  readonly id: string;
  readonly userId: string;
  readonly fullName: string;
  readonly licenseNumber: string;
  readonly nationalId: string;
  readonly licenseExpiry: string;
  readonly licenseStatus: "valid" | "expired" | "pending_verification";
  readonly yearsOfExperience: number;
  readonly coverageRegions: readonly string[];
  readonly bioAr: string | null;
  readonly bioEn: string | null;
  readonly avatarUrl?: string;
  readonly ratingAvg: number | null;
  readonly reviewsCount: number;
  readonly completedTripsCount: number;
  readonly documents: readonly GuideDocumentDto[];
  readonly createdAt: string;
}

export interface GuideDocumentDto {
  readonly id: string;
  readonly docType: "national_id" | "tour_guide_license" | "first_aid_certificate" | "commercial_register";
  readonly mediaId: string;
  readonly fileUrl: string;
  readonly verifiedAt: string | null;
  readonly rejectionReason?: string | null;
  readonly status: "pending" | "approved" | "rejected";
}

export interface GuideApplicationDto {
  readonly nationalId: string;
  readonly licenseNumber: string;
  readonly licenseExpiry: string;
  readonly yearsOfExperience: number;
  readonly coverageRegions: readonly string[];
  readonly bioAr: string;
  readonly bioEn?: string;
  readonly nationalIdMediaId: string;
  readonly licenseMediaId: string;
  readonly certificateMediaIds?: readonly string[];
}

export interface GuideAvailabilityDay {
  readonly date: string; // YYYY-MM-DD
  readonly isAvailable: boolean;
  readonly customPricePerPersonHalalas: number | null;
  readonly customPricePerPersonSar: number | null;
  readonly bookedCount: number;
  readonly maxCapacity: number;
  readonly note?: string;
}

export interface GuideAvailabilityRule {
  readonly id: string;
  readonly guideId: string;
  readonly dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
  readonly isRecurringAvailable: boolean;
  readonly defaultMaxCapacity: number;
  readonly seasonalPriceMultiplier: number;
}

export interface BulkUpdateAvailabilityDto {
  readonly days: readonly {
    readonly date: string;
    readonly isAvailable: boolean;
    readonly customPriceSar?: number;
    readonly maxCapacity?: number;
  }[];
}
