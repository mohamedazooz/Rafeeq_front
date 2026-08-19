/* ═══════════════════════════════════════════════════════════════
   Rafeeq Destinations & Categories Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type { ApiResponse, Destination, Category, Program } from "@/types";

export const destinationsService = {
  async getDestinations(): Promise<ApiResponse<readonly Destination[]>> {
    return apiClient.get<ApiResponse<readonly Destination[]>>("/catalog/destinations");
  },

  async getDestinationBySlug(slug: string): Promise<ApiResponse<Destination & { readonly programs: readonly Program[] }>> {
    return apiClient.get<ApiResponse<Destination & { readonly programs: readonly Program[] }>>(`/catalog/destinations/${slug}`);
  },

  async getCategories(): Promise<ApiResponse<readonly Category[]>> {
    return apiClient.get<ApiResponse<readonly Category[]>>("/catalog/categories");
  },

  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category & { readonly programs: readonly Program[] }>> {
    return apiClient.get<ApiResponse<Category & { readonly programs: readonly Program[] }>>(`/catalog/categories/${slug}`);
  },
};
