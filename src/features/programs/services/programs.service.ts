/* ═══════════════════════════════════════════════════════════════
   Rafeeq Programs, Catalog & Search Service
   ═══════════════════════════════════════════════════════════════ */

import { apiClient } from "@/core/http/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  Program,
  ProgramSearchQuery,
  ProgramPriceQuote,
  CreateProgramDto,
  Destination,
  Category,
} from "@/types";

export const programsService = {
  // Public Catalog & Home
  async getHomeFeed(): Promise<ApiResponse<{
    readonly destinations: readonly Destination[];
    readonly categories: readonly Category[];
    readonly featuredPrograms: readonly Program[];
  }>> {
    return apiClient.get<ApiResponse<{
      destinations: readonly Destination[];
      categories: readonly Category[];
      featuredPrograms: readonly Program[];
    }>>("/catalog/home");
  },

  async searchPrograms(query: ProgramSearchQuery): Promise<ApiResponse<PaginatedResponse<Program>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<Program>>>("/search", {
      params: {
        q: query.query,
        destination_slug: query.destinationSlug,
        destination_id: query.destinationId,
        category_slug: query.categorySlug,
        category_id: query.categoryId,
        min_price: query.minPriceSar,
        max_price: query.maxPriceSar,
        min_rating: query.minRating,
        difficulty: query.difficulty,
        date: query.date,
        page: query.page ?? 1,
        limit: query.limit ?? 12,
        sort: query.sortBy,
      },
    });
  },

  async getProgramDetail(slugOrId: string): Promise<ApiResponse<Program>> {
    return apiClient.get<ApiResponse<Program>>(`/programs/${slugOrId}`);
  },

  async getProgramQuote(programId: string, date: string, participants: number): Promise<ApiResponse<ProgramPriceQuote>> {
    return apiClient.get<ApiResponse<ProgramPriceQuote>>(`/programs/${programId}/quote`, {
      params: { date, participants },
    });
  },

  // Favorites
  async getMyFavorites(): Promise<ApiResponse<readonly Program[]>> {
    return apiClient.get<ApiResponse<readonly Program[]>>("/me/favorites");
  },

  async toggleFavorite(programId: string): Promise<ApiResponse<{ isFavorite: boolean }>> {
    return apiClient.post<ApiResponse<{ isFavorite: boolean }>>(`/me/favorites/${programId}`);
  },

  // Guide Program Management
  async getGuidePrograms(): Promise<ApiResponse<readonly Program[]>> {
    return apiClient.get<ApiResponse<readonly Program[]>>("/guide/programs");
  },

  async createProgram(dto: CreateProgramDto): Promise<ApiResponse<Program>> {
    return apiClient.post<ApiResponse<Program>>("/guide/programs", dto);
  },

  async updateProgram(id: string, dto: Partial<CreateProgramDto>): Promise<ApiResponse<Program>> {
    return apiClient.patch<ApiResponse<Program>>(`/guide/programs/${id}`, dto);
  },

  async submitProgramForReview(id: string): Promise<ApiResponse<{ submitted: boolean }>> {
    return apiClient.post<ApiResponse<{ submitted: boolean }>>(`/guide/programs/${id}/submit`);
  },

  async deleteProgram(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/guide/programs/${id}`);
  },
};
