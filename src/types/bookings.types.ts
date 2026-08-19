/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Bookings, Checkout, Reviews & Tickets
   ═══════════════════════════════════════════════════════════════ */

export type BookingStatus =
  | "pending_payment"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled_by_client"
  | "cancelled_by_guide"
  | "cancelled_by_admin"
  | "disputed"
  | "refunded";

export interface BookingPriceSnapshot {
  readonly pricePerPersonHalalas: number;
  readonly participants: number;
  readonly baseTotalHalalas: number;
  readonly platformFeeHalalas: number;
  readonly vatHalalas: number;
  readonly additionsTotalHalalas: number;
  readonly guestTotalHalalas: number;
  readonly guideNetHalalas: number;
  readonly guestTotalSar: number;
  readonly currency: string;
}

export interface Booking {
  readonly id: string;
  readonly bookingNumber: string;
  readonly clientId: string;
  readonly clientName?: string;
  readonly clientPhone?: string;
  readonly guideId: string;
  readonly guideName?: string;
  readonly guidePhone?: string;
  readonly guideAvatarUrl?: string;
  readonly programId: string;
  readonly programTitle: string;
  readonly programSlug?: string;
  readonly programImageUrl?: string;
  readonly destinationNameAr?: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly participants: number;
  readonly status: BookingStatus;
  readonly clientNotes: string | null;
  readonly expiresAt: string | null; // For soft-lock (15m countdown)
  readonly priceSnapshot: BookingPriceSnapshot;
  readonly meetingPointText?: string;
  readonly qrCodeData?: string;
  readonly hasReview?: boolean;
  readonly canCancel?: boolean;
  readonly canDispute?: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateBookingDto {
  readonly programId: string;
  readonly startDate: string;
  readonly participants: number;
  readonly notes?: string;
}

export interface CancelBookingDto {
  readonly reason: string;
  readonly bankIban?: string;
}

export interface Review {
  readonly id: string;
  readonly bookingId: string;
  readonly programId: string;
  readonly guideId: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly authorAvatarUrl?: string;
  readonly rating: number; // 1 to 5
  readonly comment: string;
  readonly response?: ReviewResponse | null;
  readonly createdAt: string;
}

export interface ReviewResponse {
  readonly id: string;
  readonly reviewId: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly responseText: string;
  readonly createdAt: string;
}

export interface CreateReviewDto {
  readonly bookingId: string;
  readonly rating: number;
  readonly comment: string;
}

export interface ReplyReviewDto {
  readonly reviewId: string;
  readonly responseText: string;
}
