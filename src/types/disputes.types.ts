/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Disputes, Refunds & Support Tickets
   ═══════════════════════════════════════════════════════════════ */

export type DisputeStatus = "open" | "under_review" | "resolved_refund_full" | "resolved_refund_partial" | "resolved_rejected";
export type DisputeReason = "guide_no_show" | "quality_issue" | "safety_concern" | "itinerary_mismatch" | "other";

export interface DisputeDto {
  readonly id: string;
  readonly bookingId: string;
  readonly bookingNumber: string;
  readonly initiatorId: string;
  readonly initiatorName: string;
  readonly reason: DisputeReason;
  readonly description: string;
  readonly requestedRefundPercent: number;
  readonly evidenceMediaUrls: readonly string[];
  readonly status: DisputeStatus;
  readonly adminResolutionNote: string | null;
  readonly resolvedRefundAmountSar?: number | null;
  readonly resolvedAt: string | null;
  readonly createdAt: string;
}

export interface CreateDisputeDto {
  readonly bookingId: string;
  readonly reason: DisputeReason;
  readonly description: string;
  readonly requestedRefundPercent: number;
  readonly evidenceMediaIds?: readonly string[];
}

export interface ResolveDisputeDto {
  readonly resolution: "refund_full" | "refund_partial" | "reject";
  readonly refundPercent?: number;
  readonly adminNotes: string;
}

export interface RefundRequestDto {
  readonly id: string;
  readonly bookingId: string;
  readonly bookingNumber: string;
  readonly clientName: string;
  readonly amountSar: number;
  readonly status: "pending" | "approved" | "rejected" | "settled";
  readonly reason: string;
  readonly requestedAt: string;
  readonly settledAt: string | null;
}

export interface SupportTicketDto {
  readonly id: string;
  readonly ticketNumber: string;
  readonly userId: string;
  readonly subject: string;
  readonly category: "booking" | "payment" | "account" | "technical" | "general";
  readonly priority: "low" | "medium" | "high" | "urgent";
  readonly status: "open" | "in_progress" | "resolved" | "closed";
  readonly messages: readonly SupportMessageDto[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SupportMessageDto {
  readonly id: string;
  readonly ticketId: string;
  readonly senderId: string;
  readonly senderName: string;
  readonly isAdmin: boolean;
  readonly message: string;
  readonly attachmentUrls?: readonly string[];
  readonly createdAt: string;
}
