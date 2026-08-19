/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Real-Time Messaging & Chat
   ═══════════════════════════════════════════════════════════════ */

export interface ConversationDto {
  readonly id: string;
  readonly clientId: string;
  readonly clientName: string;
  readonly clientAvatarUrl?: string;
  readonly guideId: string;
  readonly guideName: string;
  readonly guideAvatarUrl?: string;
  readonly programId?: string | null;
  readonly programTitle?: string | null;
  readonly bookingId?: string | null;
  readonly lastMessage?: string | null;
  readonly lastMessageAt: string;
  readonly unreadCount: number;
  readonly status: "active" | "archived" | "blocked";
  readonly createdAt: string;
}

export interface MessageDto {
  readonly id: string;
  readonly conversationId: string;
  readonly senderId: string;
  readonly senderName: string;
  readonly isMe: boolean;
  readonly body: string | null;
  readonly attachmentUrl?: string | null;
  readonly readAt: string | null;
  readonly createdAt: string;
}

export interface SendMessageDto {
  readonly conversationId: string;
  readonly body: string;
  readonly attachmentMediaId?: string;
}

export interface ReportMessageDto {
  readonly messageId: string;
  readonly reason: "spam" | "abuse" | "off_platform" | "other";
  readonly note?: string;
}
