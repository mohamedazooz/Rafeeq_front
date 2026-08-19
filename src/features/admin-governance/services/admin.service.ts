/* ═══════════════════════════════════════════════════════════════
   Rafeeq Admin Governance & Management Feature Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  DashboardMetricsDto,
  User,
  GuideProfile,
  Program,
  Booking,
  DisputeDto,
  RefundRequestDto,
  PayoutRequestDto,
  PlatformSettingsDto,
  PricingAdditionDto,
  ContentPageDto,
  RoleDto,
  AuditLogDto,
  ExportJobDto,
  Review,
  SupportTicketDto,
} from "@/types";

export interface CategoryDto {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  programsCount?: number;
  sortOrder: number;
  isActive: boolean;
}

export interface DestinationDto {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  programsCount?: number;
  sortOrder: number;
  isActive: boolean;
}

export interface RoleCreateUpdateDto {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  permissions: readonly string[];
  require2fa?: boolean;
}

export interface LandingCmsConfigDto {
  heroTitleAr: string;
  heroSubtitleAr: string;
  heroBadgeAr: string;
  statsTravelers: string;
  statsGuides: string;
  statsTours: string;
  statsRating: string;
  bannerTitleAr: string;
  bannerSubtitleAr: string;
}

export const adminService = {
  // Analytics & Dashboard
  async getDashboardMetrics(): Promise<ApiResponse<DashboardMetricsDto>> {
    return apiClient.get<ApiResponse<DashboardMetricsDto>>("/admin/dashboard");
  },

  async requestReportExport(reportKey: string, params?: Record<string, unknown>): Promise<ApiResponse<ExportJobDto>> {
    return apiClient.post<ApiResponse<ExportJobDto>>("/admin/reports/export", { reportKey, params });
  },

  // Users Management & Role Assignment
  async getUsers(params?: { role?: string; status?: string; search?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<User>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<User>>>("/admin/users", { params });
  },

  async suspendUser(userId: string, reason: string): Promise<ApiResponse<{ suspended: boolean }>> {
    return apiClient.post<ApiResponse<{ suspended: boolean }>>(`/admin/users/${userId}/suspend`, { reason });
  },

  async unsuspendUser(userId: string): Promise<ApiResponse<{ unsuspended: boolean }>> {
    return apiClient.post<ApiResponse<{ unsuspended: boolean }>>(`/admin/users/${userId}/unsuspend`);
  },

  async assignUserRole(userId: string, roleKey: string, note?: string): Promise<ApiResponse<{ assigned: boolean }>> {
    return apiClient.post<ApiResponse<{ assigned: boolean }>>(`/admin/roles/assign`, { userId, roleKey, note });
  },

  // Guides Approvals
  async getPendingGuides(): Promise<ApiResponse<readonly GuideProfile[]>> {
    return apiClient.get<ApiResponse<readonly GuideProfile[]>>("/admin/guides/pending");
  },

  async approveGuide(guideId: string): Promise<ApiResponse<{ approved: boolean }>> {
    return apiClient.post<ApiResponse<{ approved: boolean }>>(`/admin/guides/${guideId}/approve`);
  },

  async rejectGuide(guideId: string, reason: string): Promise<ApiResponse<{ rejected: boolean }>> {
    return apiClient.post<ApiResponse<{ rejected: boolean }>>(`/admin/guides/${guideId}/reject`, { reason });
  },

  // Programs Review & Publishing
  async getPendingPrograms(): Promise<ApiResponse<readonly Program[]>> {
    return apiClient.get<ApiResponse<readonly Program[]>>("/admin/programs/pending");
  },

  async approveProgram(programId: string): Promise<ApiResponse<{ approved: boolean }>> {
    return apiClient.post<ApiResponse<{ approved: boolean }>>(`/admin/programs/${programId}/approve`);
  },

  async rejectProgram(programId: string, reason: string): Promise<ApiResponse<{ rejected: boolean }>> {
    return apiClient.post<ApiResponse<{ rejected: boolean }>>(`/admin/programs/${programId}/reject`, { reason });
  },

  // Catalog Management (Categories & Destinations CRUD)
  async getCategories(): Promise<ApiResponse<readonly CategoryDto[]>> {
    return apiClient.get<ApiResponse<readonly CategoryDto[]>>("/admin/catalog/categories");
  },

  async createCategory(dto: Omit<CategoryDto, "id">): Promise<ApiResponse<CategoryDto>> {
    return apiClient.post<ApiResponse<CategoryDto>>("/admin/catalog/categories", dto);
  },

  async updateCategory(id: string, dto: Partial<CategoryDto>): Promise<ApiResponse<CategoryDto>> {
    return apiClient.put<ApiResponse<CategoryDto>>(`/admin/catalog/categories/${id}`, dto);
  },

  async deleteCategory(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/admin/catalog/categories/${id}`);
  },

  async getDestinations(): Promise<ApiResponse<readonly DestinationDto[]>> {
    return apiClient.get<ApiResponse<readonly DestinationDto[]>>("/admin/catalog/destinations");
  },

  async createDestination(dto: Omit<DestinationDto, "id">): Promise<ApiResponse<DestinationDto>> {
    return apiClient.post<ApiResponse<DestinationDto>>("/admin/catalog/destinations", dto);
  },

  async updateDestination(id: string, dto: Partial<DestinationDto>): Promise<ApiResponse<DestinationDto>> {
    return apiClient.put<ApiResponse<DestinationDto>>(`/admin/catalog/destinations/${id}`, dto);
  },

  async deleteDestination(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/admin/catalog/destinations/${id}`);
  },

  // Bookings & Operations
  async getAdminBookings(params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<Booking>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<Booking>>>("/admin/bookings", { params });
  },

  async overrideBookingStatus(bookingId: string, newStatus: string, reason: string): Promise<ApiResponse<Booking>> {
    return apiClient.patch<ApiResponse<Booking>>(`/admin/bookings/${bookingId}/override-status`, { status: newStatus, reason });
  },

  // Finance, Escrow & Payouts
  async getPendingPayouts(): Promise<ApiResponse<readonly PayoutRequestDto[]>> {
    return apiClient.get<ApiResponse<readonly PayoutRequestDto[]>>("/admin/payouts/pending");
  },

  async settlePayout(payoutId: string, transactionRef: string): Promise<ApiResponse<{ settled: boolean }>> {
    return apiClient.post<ApiResponse<{ settled: boolean }>>(`/admin/payouts/${payoutId}/settle`, { transactionRef });
  },

  async getEscrowHoldings(): Promise<ApiResponse<{ totalEscrowSar: number; activeHoldsCount: number }>> {
    return apiClient.get<ApiResponse<{ totalEscrowSar: number; activeHoldsCount: number }>>("/admin/payments/escrow-summary");
  },

  // Disputes & Refunds
  async getDisputes(status?: string): Promise<ApiResponse<readonly DisputeDto[]>> {
    return apiClient.get<ApiResponse<readonly DisputeDto[]>>("/admin/disputes", { params: { status } });
  },

  async resolveDispute(disputeId: string, data: { resolution: string; refundPercent?: number; adminNotes: string }): Promise<ApiResponse<DisputeDto>> {
    return apiClient.post<ApiResponse<DisputeDto>>(`/admin/disputes/${disputeId}/resolve`, data);
  },

  async getRefundRequests(): Promise<ApiResponse<readonly RefundRequestDto[]>> {
    return apiClient.get<ApiResponse<readonly RefundRequestDto[]>>("/admin/refund-requests");
  },

  async settleRefund(refundId: string): Promise<ApiResponse<{ settled: boolean }>> {
    return apiClient.post<ApiResponse<{ settled: boolean }>>(`/admin/refund-requests/${refundId}/settle`);
  },

  // Reviews Moderation
  async getAdminReviews(): Promise<ApiResponse<readonly Review[]>> {
    return apiClient.get<ApiResponse<readonly Review[]>>("/admin/reviews");
  },

  async deleteReview(reviewId: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/admin/reviews/${reviewId}`);
  },

  // Support Tickets
  async getAdminTickets(status?: string): Promise<ApiResponse<readonly SupportTicketDto[]>> {
    return apiClient.get<ApiResponse<readonly SupportTicketDto[]>>("/admin/support/tickets", { params: { status } });
  },

  // Settings & Pricing Additions
  async getPlatformSettings(): Promise<ApiResponse<PlatformSettingsDto>> {
    return apiClient.get<ApiResponse<PlatformSettingsDto>>("/admin/settings");
  },

  async updatePlatformSettings(settings: Partial<PlatformSettingsDto>): Promise<ApiResponse<PlatformSettingsDto>> {
    return apiClient.put<ApiResponse<PlatformSettingsDto>>("/admin/settings", settings);
  },

  async getPricingAdditions(): Promise<ApiResponse<readonly PricingAdditionDto[]>> {
    return apiClient.get<ApiResponse<readonly PricingAdditionDto[]>>("/admin/settings/pricing-additions");
  },

  async createPricingAddition(dto: Omit<PricingAdditionDto, "id" | "createdAt">): Promise<ApiResponse<PricingAdditionDto>> {
    return apiClient.post<ApiResponse<PricingAdditionDto>>("/admin/settings/pricing-additions", dto);
  },

  async deletePricingAddition(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/admin/settings/pricing-additions/${id}`);
  },

  // Content Pages & Landing CMS
  async getContentPages(): Promise<ApiResponse<readonly ContentPageDto[]>> {
    return apiClient.get<ApiResponse<readonly ContentPageDto[]>>("/admin/content/pages");
  },

  async updateContentPage(slug: string, dto: Partial<ContentPageDto>): Promise<ApiResponse<ContentPageDto>> {
    return apiClient.put<ApiResponse<ContentPageDto>>(`/admin/content/pages/${slug}`, dto);
  },

  async getLandingCmsConfig(): Promise<ApiResponse<LandingCmsConfigDto>> {
    return apiClient.get<ApiResponse<LandingCmsConfigDto>>("/admin/content/landing");
  },

  async updateLandingCmsConfig(dto: Partial<LandingCmsConfigDto>): Promise<ApiResponse<LandingCmsConfigDto>> {
    return apiClient.put<ApiResponse<LandingCmsConfigDto>>("/admin/content/landing", dto);
  },

  // RBAC Roles & Permissions CRUD
  async getRoles(): Promise<ApiResponse<readonly RoleDto[]>> {
    return apiClient.get<ApiResponse<readonly RoleDto[]>>("/admin/roles");
  },

  async createRole(dto: RoleCreateUpdateDto): Promise<ApiResponse<RoleDto>> {
    return apiClient.post<ApiResponse<RoleDto>>("/admin/roles", dto);
  },

  async updateRole(roleId: string, dto: Partial<RoleCreateUpdateDto>): Promise<ApiResponse<RoleDto>> {
    return apiClient.put<ApiResponse<RoleDto>>(`/admin/roles/${roleId}`, dto);
  },

  async deleteRole(roleId: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/admin/roles/${roleId}`);
  },

  // Audit Logs & Security
  async getAuditLogs(params?: { search?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<AuditLogDto>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<AuditLogDto>>>("/admin/audit-logs", { params });
  },
};
