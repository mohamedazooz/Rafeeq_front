/* ═══════════════════════════════════════════════════════════════
   Rafeeq Domain Types & DTOs — Synchronized with Prisma Backend
   ═══════════════════════════════════════════════════════════════ */

export type UserRole = "Client" | "Guide" | "Admin";

export interface UserProfile {
  readonly id: string;
  readonly phone: string;
  readonly email?: string;
  readonly fullName: string;
  readonly role: UserRole;
  readonly avatarUrl?: string;
  readonly isApprovedGuide?: boolean;
  readonly createdAt: string;
  // Expanded 360 traveler & client fields
  readonly nationality?: string;
  readonly countryOfResidence?: string;
  readonly documentType?: string;
  readonly documentNumber?: string;
  readonly documentExpiry?: string;
  readonly saudiVisaType?: string;
  readonly visaNumber?: string;
  readonly arrivalAirport?: string;
  readonly arrivalFlightNo?: string;
  readonly hotelInSaudi?: string;
  readonly dietaryPreferences?: string;
  readonly medicalNotes?: string;
  readonly emergencyContactName?: string;
  readonly emergencyContactPhone?: string;
  readonly emergencyRelation?: string;
  readonly insuranceProvider?: string;
  readonly insurancePolicyNumber?: string;
}

export interface ProgramDto {
  readonly id: string;
  readonly guideId: string;
  readonly guideName: string;
  readonly guideAvatar?: string;
  readonly title: string;
  readonly description: string;
  readonly destinationSlug: string;
  readonly destinationNameAr: string;
  readonly category: string;
  readonly durationText: string;
  readonly maxParticipants: number;
  readonly minParticipants?: number;
  readonly priceHalalas: number; // Stored in halalas (bigint in backend)
  readonly priceSar: number;     // Computed for UI
  readonly childPriceSar?: number;
  readonly groupDiscountPct?: number;
  readonly images: readonly string[];
  readonly promoVideoUrl?: string;
  readonly cancellationPolicy?: string;
  readonly inclusions: readonly string[];
  readonly exclusions: readonly string[];
  readonly itinerary: readonly {
    readonly dayNumber: number;
    readonly time?: string;
    readonly title: string;
    readonly description: string;
  }[];
  readonly meetingPointText: string;
  readonly status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "SUSPENDED";
  readonly rating: number;
  readonly reviewsCount: number;
}

export interface BookingDto {
  readonly id: string;
  readonly bookingNumber: string;
  readonly programId: string;
  readonly programTitle: string;
  readonly programImage: string;
  readonly guideName: string;
  readonly bookingDate: string;
  readonly participantsCount: number;
  readonly totalSar: number;
  readonly status: "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  readonly createdAt: string;
  // Traveler booking fields
  readonly travelerType?: "domestic" | "international";
  readonly nationalId?: string;
  readonly passportNumber?: string;
  readonly passportExpiry?: string;
  readonly saudiVisaType?: string;
  readonly visaNumber?: string;
  readonly arrivalAirport?: string;
  readonly hotelInSaudi?: string;
  readonly dietaryPreference?: string;
  readonly emergencyPhone?: string;
  readonly specialNotes?: string;
}

export interface WalletSummaryDto {
  readonly availableBalanceHalalas: number;
  readonly availableBalanceSar: number;
  readonly pendingEscrowHalalas: number;
  readonly pendingEscrowSar: number;
  readonly totalWithdrawnSar: number;
}

export interface GuideApplicationDto {
  readonly id: string;
  readonly fullName: string;
  readonly nationalId: string;
  readonly licenseNumber: string;
  readonly licenseExpiresAt?: string;
  readonly vehicleInfo?: string;
  readonly customCommissionPct?: number;
  readonly firstAidCertNumber?: string;
  readonly firstAidExpiresAt?: string;
  readonly policeClearanceStatus?: string;
  readonly emergencyContact?: string;
  readonly idDocumentUrl: string;
  readonly licenseDocumentUrl: string;
  readonly status: "PENDING" | "APPROVED" | "REJECTED";
  readonly submittedAt: string;
}
