/* ═══════════════════════════════════════════════════════════════
   Rafeeq Domain Types & DTOs
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
  readonly priceHalalas: number; // Stored in halalas (bigint in backend)
  readonly priceSar: number;     // Computed for UI
  readonly images: readonly string[];
  readonly inclusions: readonly string[];
  readonly exclusions: readonly string[];
  readonly itinerary: readonly {
    readonly dayNumber: number;
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
  readonly idDocumentUrl: string;
  readonly licenseDocumentUrl: string;
  readonly status: "PENDING" | "APPROVED" | "REJECTED";
  readonly submittedAt: string;
}
