/* ═══════════════════════════════════════════════════════════════
   Rafeeq Disputes, Refunds & Support Tickets Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  DisputeDto,
  CreateDisputeDto,
  RefundRequestDto,
  SupportTicketDto,
  SupportMessageDto,
} from "@/types";

export const disputesService = {
  // Disputes
  async createDispute(dto: CreateDisputeDto): Promise<ApiResponse<DisputeDto>> {
    return apiClient.post<ApiResponse<DisputeDto>>(`/bookings/${dto.bookingId}/dispute`, dto);
  },

  async getMyDisputes(): Promise<ApiResponse<readonly DisputeDto[]>> {
    return apiClient.get<ApiResponse<readonly DisputeDto[]>>("/me/disputes");
  },

  // Support Tickets
  async createTicket(data: { subject: string; category: string; priority: string; message: string }): Promise<ApiResponse<SupportTicketDto>> {
    return apiClient.post<ApiResponse<SupportTicketDto>>("/support/tickets", data);
  },

  async getMyTickets(): Promise<ApiResponse<readonly SupportTicketDto[]>> {
    return apiClient.get<ApiResponse<readonly SupportTicketDto[]>>("/support/tickets");
  },

  async getTicketDetail(id: string): Promise<ApiResponse<SupportTicketDto>> {
    return apiClient.get<ApiResponse<SupportTicketDto>>(`/support/tickets/${id}`);
  },

  async sendTicketMessage(ticketId: string, message: string): Promise<ApiResponse<SupportMessageDto>> {
    return apiClient.post<ApiResponse<SupportMessageDto>>(`/support/tickets/${ticketId}/messages`, { message });
  },
};
