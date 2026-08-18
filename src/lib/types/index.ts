/**
 * Rafeeq Platform — Comprehensive Frontend DTOs & Entities (Modules 01 - 11)
 * Matches NestJS Backend DTOs & Prisma Database Schema 100%
 */

// ─── Shared & Localized Types ───
export interface LocalizedString {
  ar: string;
  en: string;
}

export type Locale = "ar" | "en";

// ─── Module 01: Auth & Users ───
export type AccountType = "admin" | "member";
export type UserStatus = "active" | "suspended" | "pending_verification";
export type GuideStatus = "none" | "applied" | "under_review" | "approved" | "rejected" | "suspended";

export interface User {
  id: string;
  email: string;
  phoneE164: string;
  fullName: LocalizedString | string;
  avatarMediaId?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  accountType: AccountType;
  status: UserStatus;
  guideStatus: GuideStatus;
  guideSince?: string;
  guideRatingAvg?: number;
  guideReviewsCount?: number;
  guideBookingsCount?: number;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ─── Module 02: RBAC ───
export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
}

export interface Permission {
  id: string;
  code: string;
  module: string;
  description: string;
}

// ─── Module 03: Platform Settings & Content ───
export type SettingValueType = "string" | "int" | "decimal" | "bool" | "json";

export interface PlatformSetting {
  key: string;
  value: any;
  valueType: SettingValueType;
  description?: string;
  updatedAt?: string;
}

export interface ContentPage {
  id: string;
  slug: string;
  title: LocalizedString;
  body: LocalizedString;
  isPublished: boolean;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actorUserId?: string;
  actorName?: string;
  action: string;
  targetEntity: string;
  targetId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  createdAt: string;
}

export interface ApiEndpoint {
  id: string;
  module: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  path: string;
  description: string;
  access: "Public" | "Client" | "Guide" | "Admin";
  status: "Active" | "Deprecated" | "Testing";
  latencyMs: number;
}

// ─── Module 04: Media, Catalog & Tour Programs ───
export type MediaVisibility = "public" | "private";
export type MediaPurpose = "avatar" | "program_photo" | "guide_document" | "message_attachment" | "destination_photo" | "category_icon";
export type MediaStatus = "pending" | "processing" | "ready" | "failed";

export interface MediaFile {
  id: string;
  ownerUserId: string;
  visibility: MediaVisibility;
  purpose: MediaPurpose;
  storageKey: string;
  url?: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  checksumSha256: string;
  status: MediaStatus;
  createdAt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  region?: LocalizedString;
  coverMediaId?: string;
  coverImageUrl?: string;
  badge?: LocalizedString;
  isActive: boolean;
  sortOrder: number;
  publishedProgramsCount: number;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  iconMediaId?: string;
  iconSvg?: string;
  coverImageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  publishedProgramsCount: number;
}

export type ProgramStatus = "draft" | "pending" | "changes_required" | "published" | "rejected" | "snoozed" | "suspended";

export interface ProgramPhoto {
  id: string;
  mediaId: string;
  url?: string;
  sortOrder: number;
  isCover: boolean;
}

export interface ProgramItineraryDay {
  dayNumber: number;
  title: LocalizedString;
  description: LocalizedString;
  activities: string[];
}

export interface Program {
  id: string;
  slug: string;
  guideId: string;
  guideName?: LocalizedString | string;
  guideAvatarUrl?: string;
  guideRating?: number;
  destinationId: string;
  destinationName?: LocalizedString;
  destinationSlug?: string;
  categoryId: string;
  categoryName?: LocalizedString;
  categorySlug?: string;
  title: LocalizedString;
  description: LocalizedString;
  meetingPoint: LocalizedString;
  durationDays: number;
  minParticipants: number;
  maxParticipants: number;
  pricePerPersonHalalas: bigint | number;
  priceSar?: number;
  photos?: ProgramPhoto[];
  coverImageUrl?: string;
  itinerary?: ProgramItineraryDay[];
  inclusions?: { ar: string[]; en: string[] } | string[];
  exclusions?: { ar: string[]; en: string[] } | string[];
  status: ProgramStatus;
  ratingAvg: number;
  reviewsCount: number;
  bookingsCount: number;
  publishedAt?: string;
  createdAt: string;
}

export interface HomeSection {
  id: string;
  kind: "featured_destinations" | "featured_categories" | "featured_programs";
  title: LocalizedString;
  entityIds: string[];
  isActive: boolean;
  sortOrder: number;
}

// ─── Module 05: Guide Profiles & Licensing ───
export interface GuideProfile {
  userId: string;
  headline: LocalizedString;
  bio: LocalizedString;
  licenseNumber: string;
  licenseExpiresAt: string;
  specialties: { ar: string[]; en: string[] } | string[];
  completenessPct: number;
  verifiedAt?: string;
}

export interface GuideApplication {
  id: string;
  userId: string;
  fullName: string;
  nationalId: string;
  licenseNumber: string;
  city: string;
  specialties: string[];
  documents: { title: string; status: "pending" | "verified" | "rejected"; url?: string }[];
  status: "pending" | "approved" | "rejected" | "changes_requested";
  submittedAt: string;
}

// ─── Module 06: Bookings & Disputes ───
export type BookingStatus =
  | "draft"
  | "pending_guide"
  | "pending_payment"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled_by_client"
  | "cancelled_by_guide"
  | "cancelled_by_admin"
  | "disputed"
  | "refunded";

export interface Booking {
  id: string;
  code: string;
  clientId: string;
  clientName?: string;
  guideId: string;
  guideName?: string;
  programId: string;
  programTitle?: LocalizedString;
  destinationId: string;
  destinationName?: LocalizedString;
  bookingDate: string;
  participantsCount: number;
  subtotalHalalas: number;
  commissionHalalas: number;
  vatHalalas: number;
  totalHalalas: number;
  totalSar?: number;
  status: BookingStatus;
  meetingPoint?: LocalizedString;
  createdAt: string;
}

export type DisputeStatus = "open" | "under_review" | "resolved_full_refund" | "resolved_partial_refund" | "resolved_guide_payout" | "dismissed";

export interface Dispute {
  id: string;
  bookingId: string;
  bookingCode: string;
  reporterUserId: string;
  reporterName: string;
  guideName: string;
  reason: string;
  details: string;
  escrowAmountHalalas: number;
  escrowAmountSar?: number;
  status: DisputeStatus;
  createdAt: string;
}

// ─── Module 07: Payments & Payouts ───
export type PaymentStatus = "requires_payment_method" | "requires_confirmation" | "processing" | "succeeded" | "failed" | "canceled";
export type PayoutStatus = "pending" | "approved" | "processing" | "paid" | "rejected";

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  bookingCode: string;
  paymentMethod: "hyperpay" | "mada" | "visa_master" | "apple_pay" | "stc_pay";
  amountHalalas: number;
  amountSar: number;
  status: PaymentStatus;
  providerTxId?: string;
  createdAt: string;
}

export interface GuidePayout {
  id: string;
  guideId: string;
  guideName: string;
  bankName: string;
  iban: string;
  amountHalalas: number;
  amountSar: number;
  status: PayoutStatus;
  requestedAt: string;
  processedAt?: string;
}

// ─── Module 08: Cancellations & Support ───
export type SupportTicketStatus = "open" | "in_progress" | "waiting_client" | "resolved" | "closed";
export type SupportTicketPriority = "low" | "normal" | "high" | "urgent";

export interface SupportTicket {
  id: string;
  code: string;
  requesterId: string;
  requesterName: string;
  category: "booking" | "payment" | "guide_verification" | "technical" | "general";
  subject: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  lastMessageSnippet?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  isInternal: boolean;
  body: string;
  createdAt: string;
}

// ─── Module 09: Messaging ───
export type ConversationStatus = "active" | "archived" | "blocked";

export interface MessageAttachment {
  id: string;
  mediaId: string;
  url: string;
  filename: string;
  sizeBytes: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string;
  senderAvatarUrl?: string;
  body: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl?: string;
  guideId: string;
  guideName: string;
  guideAvatarUrl?: string;
  programId: string;
  programTitle: LocalizedString;
  status: ConversationStatus;
  lastMessage?: string;
  lastMessageAt: string;
  clientUnreadCount: number;
  guideUnreadCount: number;
}

// ─── Module 10: Notifications ───
export type NotificationType =
  | "booking_created"
  | "booking_confirmed"
  | "booking_cancelled"
  | "payment_succeeded"
  | "new_message"
  | "guide_approved"
  | "payout_processed"
  | "system_announcement";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: LocalizedString;
  body: LocalizedString;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreference {
  userId: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  marketingEnabled: boolean;
}

// ─── Module 11: Analytics & Reports ───
export interface PlatformAnalyticsSummary {
  totalUsers: number;
  totalGuides: number;
  totalPrograms: number;
  totalBookings: number;
  totalRevenueHalalas: number;
  totalRevenueSar: number;
  escrowBalanceSar: number;
  publishedDestinationsCount: number;
  averageRating: number;
}
