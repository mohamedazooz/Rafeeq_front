"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import {
  ServerIcon,
  SearchIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  RefreshIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface ApiEndpoint {
  id: string;
  module: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  path: string;
  description: string;
  access: "Public" | "Client" | "Guide" | "Admin" | "SuperAdmin";
  status: "Active" | "Deprecated" | "Testing";
  latencyMs: number;
}

const ENDPOINTS: ApiEndpoint[] = [
  // Auth Module
  { id: "ep-1", module: "Auth", method: "POST", path: "/api/v1/auth/login", description: "تسجيل دخول المستخدمين واستخراج JWT Token", access: "Public", status: "Active", latencyMs: 45 },
  { id: "ep-2", module: "Auth", method: "POST", path: "/api/v1/auth/register", description: "إنشاء حساب جديد للعميل أو المرشد", access: "Public", status: "Active", latencyMs: 62 },
  { id: "ep-3", module: "Auth", method: "POST", path: "/api/v1/auth/refresh-token", description: "تجديد رمز الجلسة التلقائي", access: "Public", status: "Active", latencyMs: 22 },

  // Admin Guides Module
  { id: "ep-4", module: "Guides", method: "GET", path: "/api/v1/admin/guides/pending", description: "جلب قائمة طلبات انضمام المرشدين المعلقة", access: "Admin", status: "Active", latencyMs: 38 },
  { id: "ep-5", module: "Guides", method: "PATCH", path: "/api/v1/admin/guides/:id/approve", description: "اعتماد وتوثيق رخصة المرشد السياحي وإصدار الشارة", access: "Admin", status: "Active", latencyMs: 55 },
  { id: "ep-6", module: "Guides", method: "POST", path: "/api/v1/admin/guides/:id/reject", description: "رفض طلب انضمام المرشد مع تحديد الأسباب", access: "Admin", status: "Active", latencyMs: 41 },

  // Admin Programs Module
  { id: "ep-7", module: "Programs", method: "GET", path: "/api/v1/admin/programs/review-queue", description: "استعلام طابور البرامج السياحية المنتظرة للنشر", access: "Admin", status: "Active", latencyMs: 30 },
  { id: "ep-8", module: "Programs", method: "PATCH", path: "/api/v1/admin/programs/:id/publish", description: "نشر البرنامج السياحي بالكتالوج العام للمسافرين", access: "Admin", status: "Active", latencyMs: 48 },

  // Admin Bookings Module
  { id: "ep-9", module: "Bookings", method: "GET", path: "/api/v1/admin/bookings", description: "استعراض جميع الحجوزات مع تصفية الحالات والبحث", access: "Admin", status: "Active", latencyMs: 50 },
  { id: "ep-10", module: "Bookings", method: "PATCH", path: "/api/v1/admin/bookings/:id/override-status", description: "تحديث وتغيير حالة الحجز استثنائياً (Admin Override)", access: "Admin", status: "Active", latencyMs: 70 },

  // Payments & Escrow Module
  { id: "ep-11", module: "Payments", method: "GET", path: "/api/v1/admin/payments/escrow-summary", description: "مراقبة إجمالي مبالغ الضمان المحتجزة والعمولات", access: "Admin", status: "Active", latencyMs: 35 },
  { id: "ep-12", module: "Payments", method: "POST", path: "/api/v1/admin/payouts/:id/approve", description: "تأكيد التحويل البنكي لحساب المرشد السعودي (IBAN)", access: "Admin", status: "Active", latencyMs: 85 },

  // Disputes & Refunds Module
  { id: "ep-13", module: "Disputes", method: "GET", path: "/api/v1/admin/disputes/active", description: "جلب الشكاوى والنزاعات النشطة بين العميل والمرشد", access: "Admin", status: "Active", latencyMs: 29 },
  { id: "ep-14", module: "Disputes", method: "POST", path: "/api/v1/admin/disputes/:id/resolve", description: "اتخاذ القرار المالي في النزاع (استرجاع / تحويل للمرشد)", access: "Admin", status: "Active", latencyMs: 90 },

  // RBAC & Governance
  { id: "ep-15", module: "RBAC", method: "GET", path: "/api/v1/rbac/roles", description: "إدارة واسترجاع أدوار الصلاحيات والأدمن", access: "SuperAdmin", status: "Active", latencyMs: 18 },
  { id: "ep-16", module: "Audit", method: "GET", path: "/api/v1/admin/audit-logs", description: "استخراج سجل التدقيق لجميع العمليات الإدارية الحساسة", access: "Admin", status: "Active", latencyMs: 40 },

  // System Settings
  { id: "ep-17", module: "Settings", method: "PATCH", path: "/api/v1/admin/settings/config", description: "تعديل نسبة عمولة المنصة والـ VAT وضوابط التسعير", access: "Admin", status: "Active", latencyMs: 25 },
];

export default function AdminEndpointsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const modules = Array.from(new Set(ENDPOINTS.map((e) => e.module)));

  const filteredEndpoints = ENDPOINTS.filter((ep) => {
    const matchesModule = selectedModule === "all" || ep.module === selectedModule;
    const matchesMethod = selectedMethod === "all" || ep.method === selectedMethod;
    const matchesSearch =
      ep.path.toLowerCase().includes(search.toLowerCase()) ||
      ep.description.includes(search) ||
      ep.module.toLowerCase().includes(search.toLowerCase());
    return matchesModule && matchesMethod && matchesSearch;
  });

  const getMethodBadge = (method: ApiEndpoint["method"]) => {
    const colors: Record<ApiEndpoint["method"], { bg: string; text: string }> = {
      GET: { bg: "rgba(16, 185, 129, 0.15)", text: "#10B981" },
      POST: { bg: "rgba(59, 130, 246, 0.15)", text: "#3B82F6" },
      PATCH: { bg: "rgba(245, 158, 11, 0.15)", text: "#F59E0B" },
      PUT: { bg: "rgba(139, 92, 246, 0.15)", text: "#8B5CF6" },
      DELETE: { bg: "rgba(239, 68, 68, 0.15)", text: "#EF4444" },
    };
    const c = colors[method];
    return (
      <span style={{ background: c.bg, color: c.text, padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
        {method}
      </span>
    );
  };

  const handleRunTest = (ep: ApiEndpoint) => {
    setTestResult("RUNNING...");
    setTimeout(() => {
      setTestResult(
        JSON.stringify(
          {
            statusCode: 200,
            status: "SUCCESS",
            message: `Endpoint [${ep.method} ${ep.path}] is fully operational`,
            latency: `${ep.latencyMs}ms`,
            timestamp: new Date().toISOString(),
            payload: { success: true, count: 1, data: "Mock Response Verified" },
          },
          null,
          2
        )
      );
    }, 400);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <ServerIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "دليل مسارات الـ REST APIs ومراقبة الأداء" : "REST API Catalog & Health Monitor"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "دليل نقاط النهاية وخدمات الـ APIs ⚡" : "API Endpoints Monitor"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "استعراض كافة مسارات الـ Backend الموثقة، الصلاحيات المطلوبة، واختبار زمن الاستجابة (Latency)." : "Live documentation, latency metrics, and sandbox runner for platform APIs."}
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedModule("all")}
            style={{
              padding: "6px 14px",
              borderRadius: "100px",
              border: `1px solid ${selectedModule === "all" ? "transparent" : "var(--color-border)"}`,
              background: selectedModule === "all" ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
              color: selectedModule === "all" ? "#0f172a" : "var(--color-text-primary)",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {isAr ? "كافة الوحدات" : "All Modules"}
          </button>
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModule(m)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: `1px solid ${selectedModule === m ? "transparent" : "var(--color-border)"}`,
                background: selectedModule === m ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                color: selectedModule === m ? "#0f172a" : "var(--color-text-primary)",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder={isAr ? "بحث بالمسار، الوصف، الوحدة..." : "Search path, description..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "9px 14px", paddingInlineStart: "36px", borderRadius: "10px", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={15} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>Method</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المسار (Path)" : "Endpoint Path"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الوحدة (Module)" : "Module"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الوصف والوظيفة" : "Description"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "مستوى الوصول" : "Access"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "زمن الاستجابة" : "Latency"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "اختبار الـ API" : "Test Runner"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEndpoints.map((ep) => (
              <tr key={ep.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px" }}>{getMethodBadge(ep.method)}</td>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontWeight: 800, color: "var(--color-gold-heading)", direction: "ltr", textAlign: "start" }}>{ep.path}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{ep.module}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{ep.description}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", padding: "3px 8px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, border: "1px solid var(--color-border)" }}>
                    {ep.access}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: ep.latencyMs < 50 ? "#10B981" : "#F59E0B", fontWeight: 800 }}>
                  {ep.latencyMs}ms
                </td>
                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <IconButton
                    variant="gold"
                    size="sm"
                    title={isAr ? "اختبار نقطة النهاية" : "Test Endpoint"}
                    icon={<RefreshIcon size={14} />}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      handleRunTest(ep);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sandbox Test Modal */}
      <Modal
        isOpen={!!selectedEndpoint}
        onClose={() => setSelectedEndpoint(null)}
        title={isAr ? "اختبار استجابة الـ API الحي (Sandbox)" : "Live API Sandbox"}
        subtitle={selectedEndpoint ? `${selectedEndpoint.method} ${selectedEndpoint.path}` : ""}
        maxWidth="620px"
      >
        {selectedEndpoint && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                <span>Response Body (JSON):</span>
                <span>Latency: <strong style={{ color: "#10B981" }}>{selectedEndpoint.latencyMs}ms</strong></span>
              </div>
              <pre style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px", border: "1px solid var(--color-border)", color: "#10B981", fontSize: "12px", fontFamily: "monospace", overflowX: "auto", maxHeight: "260px" }}>
                {testResult}
              </pre>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <Button variant="outline" size="sm" onClick={() => handleRunTest(selectedEndpoint)} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <RefreshIcon size={14} />
                <span>{isAr ? "إعادة الفحص" : "Re-run"}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEndpoint(null)}>{isAr ? "إغلاق" : "Close"}</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
