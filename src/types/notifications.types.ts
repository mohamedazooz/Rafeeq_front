/* ═══════════════════════════════════════════════════════════════
   Rafeeq Types — Notifications & User Preferences
   ═══════════════════════════════════════════════════════════════ */

export interface NotificationDto {
  readonly id: string;
  readonly userId: string;
  readonly eventKey: string;
  readonly title: {
    readonly ar: string;
    readonly en: string;
  };
  readonly body: {
    readonly ar: string;
    readonly en: string;
  };
  readonly entityType?: string | null;
  readonly entityId?: string | null;
  readonly readAt: string | null;
  readonly createdAt: string;
}

export interface NotificationPreferenceDto {
  readonly pushEnabled: boolean;
  readonly emailEnabled: boolean;
  readonly smsEnabled: boolean;
  readonly marketingEnabled: boolean;
}

export interface UpdatePreferencesDto {
  readonly pushEnabled?: boolean;
  readonly emailEnabled?: boolean;
  readonly smsEnabled?: boolean;
  readonly marketingEnabled?: boolean;
}

export interface DeviceTokenDto {
  readonly token: string;
  readonly platform: "android" | "ios" | "web";
}
