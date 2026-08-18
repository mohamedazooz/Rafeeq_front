"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useLanguage } from "@/lib/language-provider";
import {
  ActivityIcon,
  SearchIcon,
  EyeIcon,
  DownloadIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@/components/icons";

interface AuditLog {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-101",
    actor: "فهد العريفي (Admin)",
    role: "SuperAdmin",
    action: "UPDATE_PLATFORM_COMMISSION",
    target: "Platform Settings -> Commission Rate set to 15%",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-18 16:45:10",
    severity: "MEDIUM",
  },
  {
    id: "log-102",
    actor: "نورة القحطاني (Lead)",
    role: "ContentLead",
    action: "APPROVE_GUIDE_KYC",
    target: "Guide: سعود فهد الدوسري (TG-992014)",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-18 15:30:22",
    severity: "LOW",
  },
  {
    id: "log-103",
    actor: "تركي السبيعي (Dispute Admin)",
    role: "DisputeSpecialist",
    action: "ADMIN_OVERRIDE_BOOKING_STATUS",
    target: "Booking: RFQ-8823 -> Status set to Disputed",
    ipAddress: "212.118.32.10",
    timestamp: "2026-08-18 14:12:05",
    severity: "HIGH",
  },
  {
    id: "log-104",
    actor: "سلطان المنصور (Finance)",
    role: "FinanceOfficer",
    action: "APPROVE_BANK_PAYOUT",
    target: "IBAN Payout: 9,250.00 SAR to عبد العزيز الشمري",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-18 12:00:44",
    severity: "CRITICAL",
  },
  {
    id: "log-105",
    actor: "فهد العريفي (Admin)",
    role: "SuperAdmin",
    action: "SUSPEND_USER_ACCOUNT",
    target: "User: خالد سعيد الشهري (Guide #usr-5)",
    ipAddress: "212.118.32.10",
    timestamp: "2026-08-17 19:22:18",
    severity: "HIGH",
  },
];

export default function AdminAuditLogsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [logs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity;
    const matchesSearch =
      log.actor.includes(search) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.includes(search) ||
      log.ipAddress.includes(search);
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (sev: AuditLog["severity"]) => {
    switch (sev) {
      case "CRITICAL":
        return <span style={{ background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>حرج CRITICAL</span>;
      case "HIGH":
        return <span style={{ background: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>عالي HIGH</span>;
      case "MEDIUM":
        return <span style={{ background: "rgba(59, 130, 246, 0.2)", color: "#3b82f6", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>متوسط MEDIUM</span>;
      case "LOW":
        return <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>عادي LOW</span>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#3B82F6", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <ActivityIcon size={14} color="#3B82F6" />
            {isAr ? "سجل الرقابة الأمنية والعمليات الإدارية" : "Immutable Audit Trail & Compliance"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "سجل العمليات والتدقيق الأمني (Audit Logs) 🛡️" : "Security Audit Logs"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "تتبع فوري وغير قابل للتعديل لجميع العمليات الحساسة، الصرف المالي، وتغييرات الصلاحيات." : "Immutable audit records of sensitive operations, payouts, and permission overrides."}
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => alert(isAr ? "جاري تصدير سجل التدقيق بصيغة CSV مشفرة..." : "Exporting CSV...")}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <DownloadIcon size={16} />
          <span>{isAr ? "تصدير السجل (CSV)" : "Export CSV"}</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: isAr ? "الكل" : "All" },
            { id: "CRITICAL", label: isAr ? "الحرجة (CRITICAL)" : "Critical" },
            { id: "HIGH", label: isAr ? "العالية (HIGH)" : "High" },
            { id: "MEDIUM", label: isAr ? "المتوسطة" : "Medium" },
            { id: "LOW", label: isAr ? "العادية" : "Low" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedSeverity(f.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: `1px solid ${selectedSeverity === f.id ? "transparent" : "var(--color-border)"}`,
                background: selectedSeverity === f.id ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                color: selectedSeverity === f.id ? "#0f172a" : "var(--color-text-primary)",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث بالمسؤول، الإجراء، الهدف..." : "Search actor, action, IP..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "9px 14px", paddingInlineStart: "36px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={15} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المنفذ (Actor)" : "Actor"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "نوع الإجراء (Action)" : "Action"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الهدف والتفاصيل" : "Target"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "عنوان IP" : "IP Address"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "مستوى الخطورة" : "Severity"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "التوقيت" : "Timestamp"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "المعاينة" : "Inspect"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>{log.actor}</td>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "var(--color-gold-heading)" }}>{log.action}</td>
                <td style={{ padding: "14px 16px", maxWidth: "280px", color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.target}</td>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: "var(--color-text-secondary)" }}>{log.ipAddress}</td>
                <td style={{ padding: "14px 16px" }}>{getSeverityBadge(log.severity)}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "11px", direction: "ltr", textAlign: "start" }}>{log.timestamp}</td>
                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <IconButton
                    variant="gold"
                    size="sm"
                    title={isAr ? "معاينة تفاصيل سجل التدقيق" : "Inspect Log"}
                    icon={<EyeIcon size={15} />}
                    onClick={() => setSelectedLog(log)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Modal with Outside Click */}
      {selectedLog && (
        <div onClick={() => setSelectedLog(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "24px", cursor: "pointer" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "540px", background: "var(--color-bg-card)", padding: "28px", borderRadius: "24px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-xl)", cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--color-gold-heading)" }}>{isAr ? "تفاصيل سجل الرقابة والتدقيق" : "Audit Log Record"}</h3>
              <IconButton variant="ghost" size="sm" title={isAr ? "إغلاق" : "Close"} icon={<XCircleIcon size={18} />} onClick={() => setSelectedLog(null)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "14px", marginBottom: "20px" }}>
              <p><strong>{isAr ? "رقم السجل:" : "Log ID:"}</strong> <span style={{ fontFamily: "monospace" }}>{selectedLog.id}</span></p>
              <p><strong>{isAr ? "المسؤول المنفذ:" : "Actor:"}</strong> {selectedLog.actor} ({selectedLog.role})</p>
              <p><strong>{isAr ? "كود العملية:" : "Action Code:"}</strong> <span style={{ fontFamily: "monospace", color: "var(--color-gold-heading)" }}>{selectedLog.action}</span></p>
              <p><strong>{isAr ? "الهدف والتفاصيل:" : "Target:"}</strong> {selectedLog.target}</p>
              <p><strong>{isAr ? "عنوان الـ IP:" : "IP Address:"}</strong> <span style={{ fontFamily: "monospace" }}>{selectedLog.ipAddress}</span></p>
              <p><strong>{isAr ? "مستوى الخطورة:" : "Severity:"}</strong> {getSeverityBadge(selectedLog.severity)}</p>
              <p><strong>{isAr ? "التوقيت المسجل:" : "Timestamp:"}</strong> {selectedLog.timestamp}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLog(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
