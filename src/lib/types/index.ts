export type UserRole = "Client" | "Guide" | "Admin" | "SuperAdmin";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  isApproved: boolean;
  status: "نشط" | "محظور" | "قيد المراجعة";
  createdAt: string;
}

export interface GuideApplicant {
  id: string;
  name: string;
  nationalId: string;
  licenseNo: string;
  city: string;
  date: string;
  docs: { title: string; status: string }[];
}

export interface TourProgram {
  id: string;
  title: string;
  guide: string;
  price: string;
  imagesCount: number;
  duration: string;
  city: string;
  description: string;
}

export interface Booking {
  id: string;
  code: string;
  client: string;
  guide: string;
  program: string;
  amount: string;
  status: "pending_payment" | "confirmed" | "completed" | "cancelled" | "disputed";
  date: string;
}

export interface Dispute {
  id: string;
  bookingCode: string;
  client: string;
  guide: string;
  reason: string;
  escrowAmount: string;
  status: "open" | "resolved_refund" | "resolved_payout" | "resolved_split";
  date: string;
}

export interface PayoutRequest {
  id: string;
  guideName: string;
  bankName: string;
  iban: string;
  amount: string;
  date: string;
  status: "pending" | "completed" | "rejected";
}

export interface ApiEndpoint {
  id: string;
  module: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  path: string;
  description: string;
  access: "Public" | "Client" | "Guide" | "Admin" | "SuperAdmin";
  status: "Active" | "Deprecated" | "Testing";
  latencyMs: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}
