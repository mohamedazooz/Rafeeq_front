"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { useLanguage } from "@/lib/language-provider";
import {
  ActivityIcon,
  DownloadIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
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
    role: "GuideApprover",
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
    role: "FinanceManager",
    action: "APPROVE_BANK_PAYOUT",
    target: "IBAN Payout: 9,250.00 SAR to عبد العزيز الشمري (SARIE-994021)",
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
  {
    id: "log-106",
    actor: "فهد العريفي (Admin)",
    role: "SuperAdmin",
    action: "ASSIGN_ROLE_TO_USER",
    target: "User: نورة القحطاني -> Assigned Role: Guide Approver",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-17 11:15:30",
    severity: "MEDIUM",
  },
];

export default function AdminAuditLogsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [logs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleExportCsv = () => {
    showToast(isAr ? "تم تصدير سجل التدقيق والرقابة (CSV Audit Report) بنجاح." : "Audit log exported to CSV.");
  };

  const filteredLogs = logs.filter(
    (l) => selectedSeverity === "all" || l.severity === selectedSeverity
  );

  const getSeverityBadge = (sev: AuditLog["severity"]) => {
    switch (sev) {
      case "CRITICAL":
        return <span style={{ background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>حرج (Critical)</span>;
      case "HIGH":
        return <span style={{ background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>مرتفع (High)</span>;
      case "MEDIUM":
        return <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3B82F6", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>متوسط (Medium)</span>;
      case "LOW":
      default:
        return <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>عادي (Low)</span>;
    }
  };

  const columns: DataTableColumn<AuditLog>[] = [
    {
      key: "actor",
      headerAr: "المستخدم والمسؤولية",
      headerEn: "Actor & Role",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 800, fontSize: "13px", display: "block" }}>{row.actor}</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{row.role} • IP: {row.ipAddress}</span>
        </div>
      ),
    },
    {
      key: "action",
      headerAr: "العملية الإدارية",
      headerEn: "Action Key",
      render: (row) => (
        <span style={{ fontFamily: "monospace", fontSize: "12px", fontWeight: 700, color: "var(--color-gold-heading)", background: "var(--color-bg-secondary)", padding: "2px 6px", borderRadius: "4px" }}>
          {row.action}
        </span>
      ),
    },
    {
      key: "target",
      headerAr: "الهدف والتفاصيل",
      headerEn: "Target Details",
      render: (row) => <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{row.target}</span>,
    },
    {
      key: "severity",
      headerAr: "مستوى الخطورة",
      headerEn: "Severity",
      render: (row) => getSeverityBadge(row.severity),
    },
    {
      key: "timestamp",
      headerAr: "التوقيت",
      headerEn: "Timestamp",
      render: (row) => <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "monospace" }}>{row.timestamp}</span>,
    },
  ];

  return (
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            color: "var(--color-text-primary)",
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
            سجل الرقابة والتدقيق الأمني (Audit Trail)
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
            سجل تاريخي غير قابل للتعديل لكافة العمليات والقرارات الإدارية الحساسة الصادرة عبر المنصة
          </p>
        </div>

        <Button variant="outline" size="md" onClick={handleExportCsv}>
          <DownloadIcon size={16} />
          <span>تصدير السجل CSV</span>
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredLogs}
        columns={columns}
        searchPlaceholder="بحث في سجل التدقيق باسم المسؤول، العملية، أو الهدف..."
        searchFilter={(row, query) =>
          row.actor.toLowerCase().includes(query) ||
          row.action.toLowerCase().includes(query) ||
          row.target.toLowerCase().includes(query) ||
          row.ipAddress.includes(query)
        }
        filtersSlot={
          <div style={{ display: "flex", gap: "6px" }}>
            <Button variant={selectedSeverity === "all" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedSeverity("all")}>
              الكل ({logs.length})
            </Button>
            <Button variant={selectedSeverity === "CRITICAL" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedSeverity("CRITICAL")}>
              حرجة
            </Button>
            <Button variant={selectedSeverity === "HIGH" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedSeverity("HIGH")}>
              مرتفعة
            </Button>
            <Button variant={selectedSeverity === "MEDIUM" ? "primary" : "ghost"} size="sm" onClick={() => setSelectedSeverity("MEDIUM")}>
              متوسطة
            </Button>
          </div>
        }
      />
    </div>
  );
}
