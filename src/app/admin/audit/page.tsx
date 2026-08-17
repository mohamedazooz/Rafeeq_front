"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

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
    actor: "محمد العلي (Admin)",
    role: "SuperAdmin",
    action: "UPDATE_PLATFORM_COMMISSION",
    target: "Platform Settings -> Commission Rate set to 15%",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-17 16:45:10",
    severity: "MEDIUM",
  },
  {
    id: "log-102",
    actor: "محمد العلي (Admin)",
    role: "SuperAdmin",
    action: "APPROVE_GUIDE_KYC",
    target: "Guide: سعود فهد الدوسري (TL-992014)",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-17 15:30:22",
    severity: "LOW",
  },
  {
    id: "log-103",
    actor: "عبدالله العتيبي (Support Admin)",
    role: "Admin",
    action: "ADMIN_OVERRIDE_BOOKING_STATUS",
    target: "Booking: RFQ-8823 -> Status set to Disputed",
    ipAddress: "212.118.32.10",
    timestamp: "2026-08-17 14:12:05",
    severity: "HIGH",
  },
  {
    id: "log-104",
    actor: "محمد العلي (Admin)",
    role: "SuperAdmin",
    action: "APPROVE_BANK_PAYOUT",
    target: "IBAN Payout: 9,250.00 SAR to عبد العزيز الشمري",
    ipAddress: "197.220.14.88",
    timestamp: "2026-08-17 12:00:44",
    severity: "CRITICAL",
  },
  {
    id: "log-105",
    actor: "عبدالله العتيبي (Support Admin)",
    role: "Admin",
    action: "SUSPEND_USER_ACCOUNT",
    target: "User: خالد السفياني (Client #usr-5)",
    ipAddress: "212.118.32.10",
    timestamp: "2026-08-16 19:22:18",
    severity: "HIGH",
  },
];

export default function AdminAuditLogsPage() {
  const [logs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

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
        return <span style={{ background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>حرج CRITICAL</span>;
      case "HIGH":
        return <span style={{ background: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>عالي HIGH</span>;
      case "MEDIUM":
        return <span style={{ background: "rgba(59, 130, 246, 0.2)", color: "#3b82f6", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>متوسط MEDIUM</span>;
      case "LOW":
        return <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>عادي LOW</span>;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#C8A96E" }}>سجل التدقيق والتحقق الأمني 🛡️</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>
            تدوين ومراقبة كافة العمليات الإدارية الحساسة والإجراءات المتخذة على مستوى النظام
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px", borderRadius: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: selectedSeverity === sev ? "#C8A96E" : "rgba(255,255,255,0.05)",
                color: selectedSeverity === sev ? "#0f172a" : "#fff",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {sev === "all" ? "جميع المستويات" : sev}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="ابحث بالفاعل، الإجراء، أو الـ IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "12px",
            width: "280px",
          }}
        />
      </div>

      {/* Logs Table */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <th style={{ padding: "12px" }}>الوقت والتاريخ</th>
              <th style={{ padding: "12px" }}>المستخدم (Actor)</th>
              <th style={{ padding: "12px" }}>نوع الإجراء (Action)</th>
              <th style={{ padding: "12px" }}>تفاصيل الهدف (Target)</th>
              <th style={{ padding: "12px" }}>درجة الأهمية</th>
              <th style={{ padding: "12px" }}>عنوان IP</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px", fontSize: "11px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>{log.timestamp}</td>
                <td style={{ padding: "12px", fontWeight: 700 }}>{log.actor}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", color: "#C8A96E", fontSize: "12px" }}>{log.action}</td>
                <td style={{ padding: "12px", color: "rgba(255,255,255,0.9)" }}>{log.target}</td>
                <td style={{ padding: "12px" }}>{getSeverityBadge(log.severity)}</td>
                <td style={{ padding: "12px", fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", direction: "ltr", textAlign: "right" }}>{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
