/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Auth, User Profile & Identity Management
   ═══════════════════════════════════════════════════════════════ */

export type AccountType = "member" | "admin";
export type GuideStatus = "none" | "pending" | "approved" | "rejected" | "suspended";
export type UserStatus = "active" | "suspended" | "pending_deletion" | "deleted";
export type Gender = "male" | "female" | "unspecified";

export interface User {
  readonly id: string;
  readonly accountType: AccountType;
  readonly fullName: string;
  readonly email: string | null;
  readonly emailVerifiedAt: string | null;
  readonly phoneE164: string | null;
  readonly phoneVerifiedAt: string | null;
  readonly dateOfBirth: string;
  readonly guideStatus: GuideStatus;
  readonly guideSince: string | null;
  readonly status: UserStatus;
  readonly locale: string;
  readonly avatarUrl: string | null;
  readonly avatarMediaId: string | null;
  readonly guideRatingAvg: number | null;
  readonly guideReviewsCount: number;
  readonly guideBookingsCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly profile?: UserProfileDto | null;
}

export interface UserProfileDto {
  readonly id: string;
  readonly userId: string;
  readonly bioAr: string | null;
  readonly bioEn: string | null;
  readonly city: string | null;
  readonly country: string;
  readonly gender: Gender;
  readonly spokenLanguages: readonly string[];
  readonly emergencyPhone: string | null;
}

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresIn: number;
  readonly user: User;
}

export interface RequestOtpDto {
  readonly phone: string;
  readonly purpose?: "login" | "phone_change";
}

export interface VerifyOtpDto {
  readonly phone: string;
  readonly code: string;
}

export interface EmailLoginDto {
  readonly email: string;
  readonly password: string;
}

export interface EmailRegisterDto {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  readonly dateOfBirth: string;
  readonly gender?: Gender;
}

export interface Verify2faDto {
  readonly code: string;
  readonly tempToken?: string;
}

export interface Enable2faResponse {
  readonly secret: string;
  readonly qrCodeUrl: string;
  readonly backupCodes: readonly string[];
}

export interface AuthSession {
  readonly id: string;
  readonly client: "web" | "mobile";
  readonly ipAddress: string | null;
  readonly userAgent: string | null;
  readonly isCurrent: boolean;
  readonly createdAt: string;
  readonly lastActiveAt: string;
}

export interface DeletionRequest {
  readonly id: string;
  readonly userId: string;
  readonly status: "grace" | "blocked" | "executed" | "cancelled";
  readonly reason: string | null;
  readonly gracePeriodEndsAt: string;
  readonly blockedReason: "active_booking" | "pending_funds" | "open_dispute" | null;
  readonly createdAt: string;
}
