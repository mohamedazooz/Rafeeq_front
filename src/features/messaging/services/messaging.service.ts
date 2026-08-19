/* ═══════════════════════════════════════════════════════════════
   Rafeeq Real-Time Messaging Feature Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  ConversationDto,
  MessageDto,
  SendMessageDto,
  ReportMessageDto,
} from "@/types";

export const messagingService = {
  async getConversations(): Promise<ApiResponse<readonly ConversationDto[]>> {
    return apiClient.get<ApiResponse<readonly ConversationDto[]>>("/conversations");
  },

  async getConversationMessages(conversationId: string): Promise<ApiResponse<readonly MessageDto[]>> {
    return apiClient.get<ApiResponse<readonly MessageDto[]>>(`/conversations/${conversationId}/messages`);
  },

  async sendMessage(dto: SendMessageDto): Promise<ApiResponse<MessageDto>> {
    return apiClient.post<ApiResponse<MessageDto>>(`/conversations/${dto.conversationId}/messages`, {
      body: dto.body,
      attachmentMediaId: dto.attachmentMediaId,
    });
  },

  async markAsRead(conversationId: string): Promise<ApiResponse<{ read: boolean }>> {
    return apiClient.patch<ApiResponse<{ read: boolean }>>(`/conversations/${conversationId}/read`);
  },

  async reportMessage(dto: ReportMessageDto): Promise<ApiResponse<{ reported: boolean }>> {
    return apiClient.post<ApiResponse<{ reported: boolean }>>(`/conversations/messages/${dto.messageId}/report`, dto);
  },
};
