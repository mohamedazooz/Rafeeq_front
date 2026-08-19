/* ═══════════════════════════════════════════════════════════════
   Rafeeq Auth & Profile Feature Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import { sessionManager } from "@/core/storage/session-storage";
import type {
  ApiResponse,
  User,
  AuthTokens,
  RequestOtpDto,
  VerifyOtpDto,
  EmailLoginDto,
  EmailRegisterDto,
  Verify2faDto,
  Enable2faResponse,
  AuthSession,
  DeletionRequest,
  UserProfileDto,
} from "@/types";

export const authService = {
  // OTP Phone Flow
  async requestOtp(dto: RequestOtpDto): Promise<ApiResponse<{ sent: boolean }>> {
    return apiClient.post<ApiResponse<{ sent: boolean }>>("/auth/phone/send-otp", dto);
  },

  async verifyOtp(dto: VerifyOtpDto): Promise<ApiResponse<AuthTokens>> {
    const res = await apiClient.post<ApiResponse<AuthTokens>>("/auth/phone/verify-otp", dto);
    if (res.data?.accessToken) {
      sessionManager.setToken(res.data.accessToken);
      sessionManager.setUser(res.data.user);
    }
    return res;
  },

  // Social Login Flow (Google / Apple)
  async loginWithSocial(provider: "google" | "apple", idToken: string, dateOfBirth?: string): Promise<ApiResponse<AuthTokens>> {
    const res = await apiClient.post<ApiResponse<AuthTokens>>(`/auth/social/${provider}`, {
      id_token: idToken,
      client: "web",
      date_of_birth: dateOfBirth || "2000-01-01",
    });
    if (res.data?.accessToken) {
      sessionManager.setToken(res.data.accessToken);
      sessionManager.setUser(res.data.user);
    }
    return res;
  },

  // Email & Password Flow
  async loginWithEmail(dto: EmailLoginDto): Promise<ApiResponse<AuthTokens>> {
    const res = await apiClient.post<ApiResponse<AuthTokens>>("/auth/email/login", dto);
    if (res.data?.accessToken) {
      sessionManager.setToken(res.data.accessToken);
      sessionManager.setUser(res.data.user);
    }
    return res;
  },

  async registerWithEmail(dto: EmailRegisterDto): Promise<ApiResponse<AuthTokens>> {
    const res = await apiClient.post<ApiResponse<AuthTokens>>("/auth/email/register", dto);
    if (res.data?.accessToken) {
      sessionManager.setToken(res.data.accessToken);
      sessionManager.setUser(res.data.user);
    }
    return res;
  },

  // 2FA Security
  async enable2fa(): Promise<ApiResponse<Enable2faResponse>> {
    return apiClient.post<ApiResponse<Enable2faResponse>>("/users/me/2fa/enable");
  },

  async verify2fa(dto: Verify2faDto): Promise<ApiResponse<{ verified: boolean }>> {
    return apiClient.post<ApiResponse<{ verified: boolean }>>("/users/me/2fa/verify", dto);
  },

  async disable2fa(code: string): Promise<ApiResponse<{ disabled: boolean }>> {
    return apiClient.post<ApiResponse<{ disabled: boolean }>>("/users/me/2fa/disable", { code });
  },

  // Profile Management
  async getMe(): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>("/users/me");
  },

  async updateProfile(data: Partial<User> & { bioAr?: string; bioEn?: string; spokenLanguages?: string[] }): Promise<ApiResponse<User>> {
    return apiClient.patch<ApiResponse<User>>("/users/me", data);
  },

  async getSessions(): Promise<ApiResponse<readonly AuthSession[]>> {
    return apiClient.get<ApiResponse<readonly AuthSession[]>>("/users/me/sessions");
  },

  async revokeSession(sessionId: string): Promise<ApiResponse<{ revoked: boolean }>> {
    return apiClient.delete<ApiResponse<{ revoked: boolean }>>(`/users/me/sessions/${sessionId}`);
  },

  // Deletion Request
  async requestAccountDeletion(reason: string): Promise<ApiResponse<DeletionRequest>> {
    return apiClient.post<ApiResponse<DeletionRequest>>("/users/me/deletion-request", { reason });
  },

  async cancelAccountDeletion(): Promise<ApiResponse<{ cancelled: boolean }>> {
    return apiClient.delete<ApiResponse<{ cancelled: boolean }>>("/users/me/deletion-request");
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Proceed with local cleanup regardless
    } finally {
      sessionManager.clearSession();
    }
  },
};
