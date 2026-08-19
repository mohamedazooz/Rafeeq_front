/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Payments, Wallets, Escrow & Payouts
   ═══════════════════════════════════════════════════════════════ */

export type PaymentMethod = "myfatoorah" | "mada" | "visa_mastercard" | "apple_pay" | "stc_pay";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "partially_refunded";
export type PayoutStatus = "requested" | "processing" | "completed" | "rejected";

export interface CheckoutPaymentDto {
  readonly bookingId: string;
  readonly paymentMethod: PaymentMethod;
}

export interface CheckoutPaymentResponse {
  readonly paymentId: string;
  readonly invoiceId: string;
  readonly checkoutUrl: string;
  readonly expiresAt: string;
}

export interface GuideWalletDto {
  readonly guideId: string;
  readonly availableBalanceHalalas: number;
  readonly availableBalanceSar: number;
  readonly pendingEscrowHalalas: number;
  readonly pendingEscrowSar: number;
  readonly totalEarnedHalalas: number;
  readonly totalEarnedSar: number;
  readonly totalWithdrawnHalalas: number;
  readonly totalWithdrawnSar: number;
  readonly currency: string;
  readonly activeBankAccounts: readonly GuideBankAccountDto[];
  readonly recentEntries: readonly WalletEntryDto[];
}

export interface GuideBankAccountDto {
  readonly id: string;
  readonly bankName: string;
  readonly iban: string;
  readonly accountHolderName: string;
  readonly isDefault: boolean;
  readonly isVerified: boolean;
}

export interface SaveBankAccountDto {
  readonly bankName: string;
  readonly iban: string;
  readonly accountHolderName: string;
}

export interface WalletEntryDto {
  readonly id: string;
  readonly amountHalalas: number;
  readonly amountSar: number;
  readonly entryType: "booking_escrow_hold" | "booking_escrow_release" | "payout" | "penalty" | "adjustment";
  readonly referenceBookingId?: string;
  readonly descriptionAr: string;
  readonly createdAt: string;
}

export interface PayoutRequestDto {
  readonly id: string;
  readonly amountHalalas: number;
  readonly amountSar: number;
  readonly status: PayoutStatus;
  readonly bankAccountId: string;
  readonly bankName: string;
  readonly iban: string;
  readonly requestedAt: string;
  readonly settledAt: string | null;
  readonly adminNotes?: string | null;
}

export interface CreatePayoutRequestDto {
  readonly amountSar: number;
  readonly bankAccountId: string;
}
