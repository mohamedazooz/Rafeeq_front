/* ═══════════════════════════════════════════════════════════════
   Rafeeq Services SDK — Type-Safe Integration with NestJS Backend
   ═══════════════════════════════════════════════════════════════ */

import { apiClient, type ApiResponse } from "./client";
import type { BookingDto, ProgramDto, UserProfile, WalletSummaryDto } from "./types";

/* ── Auth API Service ── */
export const authService = {
  requestOtp: (phone: string) =>
    apiClient.post<ApiResponse<{ sent: boolean }>>("/auth/otp/request", { phone }),

  verifyOtp: (phone: string, code: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; user: UserProfile }>>("/auth/otp/verify", {
      phone,
      code,
    }),

  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; user: UserProfile }>>("/auth/login", {
      email,
      password,
    }),

  register: (data: { fullName: string; email: string; password: string; phone?: string; date_of_birth?: string }) =>
    apiClient.post<ApiResponse<{ accessToken: string; user: UserProfile }>>("/auth/register", data),

  logout: () => apiClient.post<ApiResponse<{ success: boolean }>>("/auth/logout"),
};

/* ── Catalog & Programs API Service ── */
export const catalogService = {
  getHome: () => apiClient.get<ApiResponse<{ destinations: readonly unknown[]; programs: readonly ProgramDto[] }>>("/catalog/home"),

  getDestinations: () => apiClient.get<ApiResponse<readonly unknown[]>>("/catalog/destinations"),

  getDestination: (slug: string) => apiClient.get<ApiResponse<unknown>>(`/catalog/destinations/${slug}`),

  getPrograms: (params?: { destinationId?: string; categoryId?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.destinationId) query.set("destination_id", params.destinationId);
    if (params?.categoryId) query.set("category_id", params.categoryId);
    if (params?.limit) query.set("limit", params.limit.toString());

    return apiClient.get<ApiResponse<readonly ProgramDto[]>>(`/programs?${query.toString()}`);
  },

  getProgramDetail: (slugOrId: string) =>
    apiClient.get<ApiResponse<ProgramDto>>(`/programs/${slugOrId}`),
};

/* ── Bookings API Service ── */
export const bookingService = {
  createBooking: (data: { programId: string; bookingDate: string; participantsCount: number }) =>
    apiClient.post<ApiResponse<BookingDto>>("/bookings", data),

  getMyBookings: (tab?: "UPCOMING" | "COMPLETED" | "CANCELLED") => {
    const query = tab ? `?tab=${tab}` : "";
    return apiClient.get<ApiResponse<readonly BookingDto[]>>(`/me/bookings${query}`);
  },

  getBookingDetail: (id: string) =>
    apiClient.get<ApiResponse<BookingDto>>(`/bookings/${id}`),

  cancelBooking: (id: string, reason: string) =>
    apiClient.post<ApiResponse<{ refundAmountSar: number }>>(`/bookings/${id}/cancel`, { reason }),

  openDispute: (id: string) =>
    apiClient.post<ApiResponse<{ disputeId: string }>>(`/bookings/${id}/dispute`),
};

/* ── Guide API Service ── */
export const guideService = {
  createProgram: (data: Partial<ProgramDto>) =>
    apiClient.post<ApiResponse<ProgramDto>>("/guide/programs", data),

  getMyPrograms: () => apiClient.get<ApiResponse<readonly ProgramDto[]>>("/guide/programs"),

  getWalletSummary: () => apiClient.get<ApiResponse<WalletSummaryDto>>("/guide/wallet"),

  requestWithdrawal: (amountSar: number, iban: string) =>
    apiClient.post<ApiResponse<{ status: string }>>("/guide/wallet/withdraw", { amountSar, iban }),
};

/* ── Admin API Service ── */
export const adminService = {
  getDashboardStats: () =>
    apiClient.get<ApiResponse<{ totalGbvSar: number; netRevenueSar: number; escrowBalanceSar: number }>>("/admin/dashboard"),

  getUsers: () => apiClient.get<ApiResponse<readonly UserProfile[]>>("/admin/users"),

  approveGuide: (guideId: string) =>
    apiClient.post<ApiResponse<{ approved: boolean }>>(`/admin/guides/${guideId}/approve`),

  publishProgram: (programId: string) =>
    apiClient.post<ApiResponse<{ published: boolean }>>(`/admin/programs/${programId}/publish`),

  getSettings: () => apiClient.get<ApiResponse<{ commissionPercent: number; escrowHoldDays: number; vatPercent: number }>>("/admin/settings"),

  updateSettings: (data: { commissionPercent?: number; escrowHoldDays?: number; vatPercent?: number }) =>
    apiClient.put<ApiResponse<{ updated: boolean }>>("/admin/settings", data),
};
