/* ═══════════════════════════════════════════════════════════════
   Rafeeq Payments, Escrow & Wallets Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  CheckoutPaymentDto,
  CheckoutPaymentResponse,
  GuideWalletDto,
  GuideBankAccountDto,
  SaveBankAccountDto,
  PayoutRequestDto,
  CreatePayoutRequestDto,
} from "@/types";

export const paymentsService = {
  // Checkout & Payment
  async initiateCheckout(dto: CheckoutPaymentDto): Promise<ApiResponse<CheckoutPaymentResponse>> {
    return apiClient.post<ApiResponse<CheckoutPaymentResponse>>(`/bookings/${dto.bookingId}/payments/checkout`, {
      paymentMethod: dto.paymentMethod,
    });
  },

  async verifyPaymentStatus(paymentId: string): Promise<ApiResponse<{ status: string; isPaid: boolean }>> {
    return apiClient.get<ApiResponse<{ status: string; isPaid: boolean }>>(`/payments/${paymentId}/status`);
  },

  // Guide Wallet & Balances
  async getWalletSummary(): Promise<ApiResponse<GuideWalletDto>> {
    return apiClient.get<ApiResponse<GuideWalletDto>>("/guide/wallet");
  },

  async getBankAccounts(): Promise<ApiResponse<readonly GuideBankAccountDto[]>> {
    return apiClient.get<ApiResponse<readonly GuideBankAccountDto[]>>("/guide/bank-account");
  },

  async saveBankAccount(dto: SaveBankAccountDto): Promise<ApiResponse<GuideBankAccountDto>> {
    return apiClient.post<ApiResponse<GuideBankAccountDto>>("/guide/bank-account", dto);
  },

  async deleteBankAccount(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/guide/bank-account/${id}`);
  },

  async requestPayout(dto: CreatePayoutRequestDto): Promise<ApiResponse<PayoutRequestDto>> {
    return apiClient.post<ApiResponse<PayoutRequestDto>>("/guide/payouts", dto);
  },

  async getPayoutHistory(): Promise<ApiResponse<readonly PayoutRequestDto[]>> {
    return apiClient.get<ApiResponse<readonly PayoutRequestDto[]>>("/guide/payouts");
  },
};
