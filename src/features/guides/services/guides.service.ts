/* ═══════════════════════════════════════════════════════════════
   Rafeeq Guides & Availability Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  GuideProfile,
  GuideApplicationDto,
  GuideAvailabilityDay,
  BulkUpdateAvailabilityDto,
  PaginatedResponse,
} from "@/types";

export const guidesService = {
  // Public Guides
  async getGuides(params?: { region?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<GuideProfile>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<GuideProfile>>>("/guides", { params });
  },

  async getGuideDetail(id: string): Promise<ApiResponse<GuideProfile>> {
    return apiClient.get<ApiResponse<GuideProfile>>(`/guides/${id}`);
  },

  // Guide Application
  async applyAsGuide(dto: GuideApplicationDto): Promise<ApiResponse<{ applied: boolean }>> {
    return apiClient.post<ApiResponse<{ applied: boolean }>>("/guide/application", dto);
  },

  // Guide Portal
  async getMyProfile(): Promise<ApiResponse<GuideProfile>> {
    return apiClient.get<ApiResponse<GuideProfile>>("/guide/profile");
  },

  async updateMyProfile(data: Partial<GuideProfile>): Promise<ApiResponse<GuideProfile>> {
    return apiClient.patch<ApiResponse<GuideProfile>>("/guide/profile", data);
  },

  // Availability & Calendar
  async getCalendarDays(month: string, year: number): Promise<ApiResponse<readonly GuideAvailabilityDay[]>> {
    return apiClient.get<ApiResponse<readonly GuideAvailabilityDay[]>>("/guide/calendar/days", {
      params: { month, year },
    });
  },

  async bulkUpdateAvailability(dto: BulkUpdateAvailabilityDto): Promise<ApiResponse<{ updatedCount: number }>> {
    return apiClient.post<ApiResponse<{ updatedCount: number }>>("/guide/calendar/bulk-update", dto);
  },
};
