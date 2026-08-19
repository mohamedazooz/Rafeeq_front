export interface FaqItem {
  id: string;
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
  category?: string;
}

export interface ContactMessagePayload {
  fullName: string;
  contactInfo: string;
  message: string;
}

export interface DisputeTicket {
  id: string;
  bookingId: string;
  complainantRole: "client" | "guide";
  reason: string;
  status: "open" | "under_review" | "resolved" | "dismissed";
  createdAt: string;
}
