"use client";

export interface ActionNotificationPayload {
  title: string;
  message: string;
  actionType: "CREATE" | "UPDATE" | "DELETE" | "APPROVE" | "REJECT" | "BAN" | "RESET_2FA" | "PAYOUT" | "REFUND";
  adminEmail?: string;
  targetEmail: string;
  targetName: string;
  targetRole: "Guide" | "Client" | "Admin";
  details?: Record<string, unknown>;
}

export interface DispatchedLogItem extends ActionNotificationPayload {
  id: string;
  timestamp: string;
  adminEmail: string;
  deliveredEmailAdmin: boolean;
  deliveredEmailUser: boolean;
  emailPreviewAdmin: string;
  emailPreviewUser: string;
}

export function dispatchDualActionNotification(payload: ActionNotificationPayload): DispatchedLogItem {
  const adminEmail = payload.adminEmail || "admin@rafeeq.sa";
  const timestamp = new Date().toISOString();
  const id = `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const emailPreviewAdmin = `[To Admin: ${adminEmail}] إشعار نظام: تم تنفيذ إجراء (${payload.actionType}) على المستخدم ${payload.targetName} (${payload.targetEmail}) بنجاح.`;
  const emailPreviewUser = `[To ${payload.targetRole}: ${payload.targetEmail}] مرحباً ${payload.targetName}، نود إعلامك: ${payload.title} — ${payload.message}`;

  const logItem: DispatchedLogItem = {
    ...payload,
    id,
    adminEmail,
    timestamp,
    deliveredEmailAdmin: true,
    deliveredEmailUser: true,
    emailPreviewAdmin,
    emailPreviewUser,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem("rafeeq_dispatched_actions");
      const list: DispatchedLogItem[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem("rafeeq_dispatched_actions", JSON.stringify([logItem, ...list.slice(0, 99)]));
    } catch {}
  }

  return logItem;
}

export function getDispatchedActions(): DispatchedLogItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = localStorage.getItem("rafeeq_dispatched_actions");
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}
