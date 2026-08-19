/* ═══════════════════════════════════════════════════════════════
   Rafeeq Notifications Feature Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  NotificationDto,
  NotificationPreferenceDto,
  UpdatePreferencesDto,
  DeviceTokenDto,
} from "@/types";

export const notificationsService = {
  async getNotifications(): Promise<ApiResponse<readonly NotificationDto[]>> {
    return apiClient.get<ApiResponse<readonly NotificationDto[]>>("/me/notifications");
  },

  async markAllAsRead(): Promise<ApiResponse<{ count: number }>> {
    return apiClient.patch<ApiResponse<{ count: number }>>("/me/notifications/read-all");
  },

  async getPreferences(): Promise<ApiResponse<NotificationPreferenceDto>> {
    return apiClient.get<ApiResponse<NotificationPreferenceDto>>("/me/notification-preferences");
  },

  async updatePreferences(dto: UpdatePreferencesDto): Promise<ApiResponse<NotificationPreferenceDto>> {
    return apiClient.put<ApiResponse<NotificationPreferenceDto>>("/me/notification-preferences", dto);
  },

  async registerDeviceToken(dto: DeviceTokenDto): Promise<ApiResponse<{ registered: boolean }>> {
    return apiClient.post<ApiResponse<{ registered: boolean }>>("/me/device-tokens", dto);
  },
};
