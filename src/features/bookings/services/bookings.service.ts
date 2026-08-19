/* ═══════════════════════════════════════════════════════════════
   Rafeeq Bookings, Checkout & Reviews Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  Booking,
  CreateBookingDto,
  CancelBookingDto,
  Review,
  CreateReviewDto,
  ReplyReviewDto,
  PaginatedResponse,
} from "@/types";

export const bookingsService = {
  // Client Bookings
  async createBooking(dto: CreateBookingDto): Promise<ApiResponse<Booking>> {
    return apiClient.post<ApiResponse<Booking>>("/bookings", dto);
  },

  async getMyBookings(status?: string): Promise<ApiResponse<readonly Booking[]>> {
    return apiClient.get<ApiResponse<readonly Booking[]>>("/bookings/me", {
      params: { status },
    });
  },

  async getBookingDetail(id: string): Promise<ApiResponse<Booking>> {
    return apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
  },

  async cancelBooking(id: string, dto: CancelBookingDto): Promise<ApiResponse<{ cancelled: boolean; refundAmountSar: number }>> {
    return apiClient.post<ApiResponse<{ cancelled: boolean; refundAmountSar: number }>>(`/bookings/${id}/cancel`, dto);
  },

  // Guide Bookings
  async getGuideBookings(status?: string): Promise<ApiResponse<readonly Booking[]>> {
    return apiClient.get<ApiResponse<readonly Booking[]>>("/guide/bookings", {
      params: { status },
    });
  },

  // Guide Calendar & Availability
  async getGuideCalendar(from?: string, to?: string): Promise<ApiResponse<readonly unknown[]>> {
    return apiClient.get<ApiResponse<readonly unknown[]>>("/guide/calendar", {
      params: { from, to },
    });
  },

  async updateCalendarDays(days: Array<{ date: string; state: "available" | "blocked"; customPricePerPersonHalalas?: number; note?: string }>): Promise<ApiResponse<{ updated: number }>> {
    return apiClient.put<ApiResponse<{ updated: number }>>("/guide/calendar/days", { days });
  },

  // Reviews
  async getProgramReviews(programId: string): Promise<ApiResponse<readonly Review[]>> {
    return apiClient.get<ApiResponse<readonly Review[]>>(`/programs/${programId}/reviews`);
  },

  async createReview(dto: CreateReviewDto): Promise<ApiResponse<Review>> {
    return apiClient.post<ApiResponse<Review>>("/reviews", dto);
  },

  async replyToReview(dto: ReplyReviewDto): Promise<ApiResponse<Review>> {
    return apiClient.post<ApiResponse<Review>>(`/reviews/${dto.reviewId}/reply`, { responseText: dto.responseText });
  },
};
