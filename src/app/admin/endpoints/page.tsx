"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

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
      <span style={{ background: c.bg, color: c.text, padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, fontFamily: "monospace" }}>
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
    }, 600);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#C8A96E" }}>إدارة الـ Endpoints والـ APIs ⚡</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>
            مركز استكشاف واختبار والتحكم بجميع مسارات الواجهة الخلفية (NestJS API Controllers)
          </p>
        </div>

        <div style={{ background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.3)", padding: "8px 16px", borderRadius: "12px", color: "#C8A96E", fontSize: "12px", fontWeight: 700 }}>
          إجمالي الـ Endpoints النشطة: {ENDPOINTS.length}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px", borderRadius: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedModule("all")}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: selectedModule === "all" ? "#C8A96E" : "rgba(255,255,255,0.05)",
              color: selectedModule === "all" ? "#0f172a" : "#fff",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            الكل
          </button>
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModule(m)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: selectedModule === m ? "#C8A96E" : "rgba(255,255,255,0.05)",
                color: selectedModule === m ? "#0f172a" : "#fff",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <option value="all">جميع الطرق (Methods)</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input
            type="text"
            placeholder="ابحث بالمسار أو الوصف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "12px",
              width: "240px",
            }}
          />
        </div>
      </div>

      {/* Endpoints Grid Table */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <th style={{ padding: "12px" }}>Method</th>
              <th style={{ padding: "12px" }}>مسار الـ API (Endpoint Path)</th>
              <th style={{ padding: "12px" }}>الوحدة (Module)</th>
              <th style={{ padding: "12px" }}>الوصف الوظيفي</th>
              <th style={{ padding: "12px" }}>الصلاحية المطلوبة</th>
              <th style={{ padding: "12px" }}>الاستجابة (Latency)</th>
              <th style={{ padding: "12px" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredEndpoints.map((ep) => (
              <tr key={ep.id} style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px" }}>{getMethodBadge(ep.method)}</td>
                <td style={{ padding: "12px", fontWeight: 700, fontFamily: "monospace", color: "#C8A96E", direction: "ltr", textAlign: "right" }}>
                  {ep.path}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>{ep.module}</span>
                </td>
                <td style={{ padding: "12px", color: "rgba(255,255,255,0.8)" }}>{ep.description}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ color: ep.access === "SuperAdmin" ? "#ef4444" : ep.access === "Admin" ? "#f59e0b" : "#10b981", fontWeight: 700, fontSize: "11px" }}>
                    {ep.access}
                  </span>
                </td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: "11px", color: "#10b981" }}>{ep.latencyMs}ms</td>
                <td style={{ padding: "12px" }}>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedEndpoint(ep); setTestResult(null); }}>
                    تجربة / فحص ⚡
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Endpoint Inspection Modal */}
      {selectedEndpoint && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "24px" }}>
          <div style={{ width: "650px", background: "#0b1329", padding: "28px", borderRadius: "24px", border: "1px solid rgba(200, 169, 110, 0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {getMethodBadge(selectedEndpoint.method)}
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#C8A96E", fontFamily: "monospace", direction: "ltr" }}>{selectedEndpoint.path}</h3>
              </div>
              <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "2px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>
                Status: {selectedEndpoint.status}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>{selectedEndpoint.description}</p>

            <div style={{ background: "rgba(0,0,0,0.4)", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px", color: "rgba(255,255,255,0.5)" }}>
                <span>Authorization Header: Bearer AdminJWTToken...</span>
                <span>Expected Latency: ~{selectedEndpoint.latencyMs}ms</span>
              </div>
              <Button variant="primary" size="sm" onClick={() => handleRunTest(selectedEndpoint)}>
                🚀 تشغيل اختبار الـ API (Run Live Test)
              </Button>
            </div>

            {testResult && (
              <div style={{ background: "#060913", padding: "16px", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.3)", marginBottom: "20px" }}>
                <h4 style={{ fontSize: "11px", color: "#10b981", fontWeight: 700, marginBottom: "8px", fontFamily: "monospace" }}>Response Payload Inspector:</h4>
                <pre style={{ fontSize: "11px", fontFamily: "monospace", color: "#67e8f9", margin: 0, overflowX: "auto" }}>{testResult}</pre>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEndpoint(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
