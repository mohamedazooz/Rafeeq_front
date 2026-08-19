/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Common Types & API Response Envelopes
   ═══════════════════════════════════════════════════════════════ */

export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data: T;
  readonly message?: string;
  readonly statusCode: number;
}

export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface PaginationQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly sortOrder?: "asc" | "desc";
  readonly search?: string;
}

export type Locale = "ar" | "en";

export interface HalalasCurrency {
  readonly halalas: number; // BigInt in database, mapped to number in frontend
  readonly sar: number;     // Formatted / calculated
  readonly formattedSar: string;
}

export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}
