/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Admin Governance, RBAC, Settings & Analytics
   ═══════════════════════════════════════════════════════════════ */

export interface DashboardMetricsDto {
  readonly gbvHalalas: number;
  readonly gbvSar: number;
  readonly platformCommissionRevenueHalalas: number;
  readonly platformCommissionRevenueSar: number;
  readonly escrowBalanceHalalas: number;
  readonly escrowBalanceSar: number;
  readonly activeBookingsCount: number;
  readonly approvedGuidesCount: number;
  readonly pendingGuidesCount: number;
  readonly pendingProgramsCount: number;
  readonly pendingRefundsCount: number;
  readonly openDisputesCount: number;
  readonly currency: string;
  readonly dailyTrend: readonly {
    readonly date: string;
    readonly gbvSar: number;
    readonly revenueSar: number;
    readonly bookingsCount: number;
  }[];
}

export interface PlatformSettingsDto {
  readonly platformCommissionRate: number; // e.g. 0.15 for 15%
  readonly vatRate: number;                // e.g. 0.15 for 15%
  readonly escrowHoldDays: number;         // e.g. 2 days after trip
  readonly softLockExpiryMinutes: number;  // e.g. 15 minutes
  readonly minPayoutAmountSar: number;
  readonly contactEmail: string;
  readonly contactPhone: string;
  readonly emergencyHotline: string;
}

export interface PricingAdditionDto {
  readonly id: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly feeType: "fixed_sar" | "percent_of_base";
  readonly amountValue: number;
  readonly isMandatory: boolean;
  readonly appliesToRole: "client" | "guide" | "both";
  readonly isActive: boolean;
  readonly createdAt: string;
}

export interface ContentPageDto {
  readonly id: string;
  readonly slug: string;
  readonly titleAr: string;
  readonly titleEn: string;
  readonly contentAr: string;
  readonly contentEn: string;
  readonly metaDescriptionAr: string | null;
  readonly metaDescriptionEn: string | null;
  readonly updatedAt: string;
}

export interface RoleDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly permissions: readonly string[];
  readonly usersCount: number;
  readonly isSystemRole: boolean;
}

export interface AuditLogDto {
  readonly id: string;
  readonly actorId: string;
  readonly actorName: string;
  readonly actorEmail: string;
  readonly action: string;
  readonly targetType: string;
  readonly targetId: string;
  readonly ipAddress: string | null;
  readonly userAgent: string | null;
  readonly metadata: Record<string, unknown>;
  readonly createdAt: string;
}

export interface ExportJobDto {
  readonly id: string;
  readonly reportKey: string;
  readonly status: "queued" | "ready" | "failed";
  readonly downloadUrl?: string | null;
  readonly createdAt: string;
  readonly completedAt?: string | null;
}
