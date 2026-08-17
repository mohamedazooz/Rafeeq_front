"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// KPI Cards Data
const INITIAL_KPIS = [
  { title: "إجمالي الحجوزات (GBV)", val: "148,500 ر.س", sub: "+18% مقارنة بالشهر السابق", color: "#10B981" },
  { title: "صافي إيرادات المنصة", val: "22,275 ر.س", sub: "عمولة 15% + رسوم الخدمات", color: "#C8A96E" },
  { title: "رصيد الـ Escrow الإجمالي", val: "38,400 ر.س", sub: "مبالغ ضامنة لـ 42 حجز قائم", color: "#3B82F6" },
  { title: "طلبات الاعتماد المعلقة", val: "5 طلبات", sub: "3 مرشدين + 2 برنامج سياحي", color: "#F59E0B" },
];

// Monthly Revenue Trend Data
const REVENUE_DATA = [
  { month: "مارس", gbv: 62000, revenue: 9300 },
  { month: "أبريل", gbv: 85000, revenue: 12750 },
  { month: "مايو", gbv: 110000, revenue: 16500 },
  { month: "يونيو", gbv: 128000, revenue: 19200 },
  { month: "يوليو", gbv: 135000, revenue: 20250 },
  { month: "أغسطس", gbv: 148500, revenue: 22275 },
];

// Booking Status Distribution Data
const BOOKING_STATUSES = [
  { label: "مؤكدة (Confirmed)", count: 28, percent: 56, color: "#10B981" },
  { label: "قيد الدفع (Pending)", count: 10, percent: 20, color: "#F59E0B" },
  { label: "مكتملة (Completed)", count: 7, percent: 14, color: "#3B82F6" },
  { label: "ملغاة (Cancelled)", count: 3, percent: 6, color: "#EF4444" },
  { label: "متنازع عليها (Disputed)", count: 2, percent: 4, color: "#8B5CF6" },
];

// Regional Distribution Data
const REGIONS = [
  { region: "الرياض ونجد", trips: 18, share: "36%" },
  { region: "العلا والشمال", trips: 14, share: "28%" },
  { region: "جدة والمنطقة الغربية", trips: 10, share: "20%" },
  { region: "الأحساء والمنطقة الشرقية", trips: 8, share: "16%" },
];

export default function AdminDashboardPage() {
  const [guidesQueue, setGuidesQueue] = useState([
    { id: "g-1", name: "سعود فهد الدوسري", license: "TL-992014", city: "الرياض" },
    { id: "g-2", name: "منى علي الغامدي", license: "TL-881023", city: "جدة" },
    { id: "g-3", name: "تركي بن طلال العتيبي", license: "TL-772910", city: "العلا" },
  ]);

  const [programsQueue, setProgramsQueue] = useState([
    { id: "p-1", title: "رحلة جبل القارة والواحة بالأحساء", guide: "خالد الحربي", price: "380 ر.س" },
    { id: "p-2", title: "جولة الغوص واستكشاف شعب حقل", guide: "ريم العلي", price: "550 ر.س" },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveGuide = (id: string, name: string) => {
    setGuidesQueue((prev) => prev.filter((g) => g.id !== id));
    showToast(`تم اعتماد وتوثيق رخصة المرشد (${name}) بنجاح! ✓`);
  };

  const handlePublishProgram = (id: string, title: string) => {
    setProgramsQueue((prev) => prev.filter((p) => p.id !== id));
    showToast(`تم نشر البرنامج السياحي (${title}) في الكتالوج العام للمسافرين! 🚀`);
  };

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#C8A96E" }}>لوحة القيادة والحوكمة العليا 🏛️</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>
            إدارة المستخدمين، اعتماد المرشدين والبرامج، مراقبة الـ Escrow والعمولات، وإحصائيات الـ APIs
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/admin/endpoints">
            <Button variant="outline" size="sm">⚡ إدارة الـ Endpoints</Button>
          </Link>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm">🎫 إدارة الحجوزات</Button>
          </Link>
          <Link href="/admin/disputes">
            <Button variant="secondary" size="sm">🔔 النزاعات والشكاوى</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {INITIAL_KPIS.map((kpi) => (
          <div
            key={kpi.title}
            style={{
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(11, 19, 41, 0.9) 100%)",
              border: "1px solid rgba(200, 169, 110, 0.2)",
              padding: "24px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{kpi.title}</span>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: kpi.color, marginBlock: "8px" }}>{kpi.val}</h2>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Analytics & Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Revenue SVG Area/Line Chart */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>مؤشر الإيرادات وحجم الحجوزات (GBV)</h3>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>التطور الشهري لصافي العمولة وإجمالي المبالغ المدفوعة بالريال السعودي</p>
            </div>
            <span style={{ fontSize: "11px", background: "rgba(200,169,110,0.15)", color: "#C8A96E", padding: "4px 12px", borderRadius: "100px", fontWeight: 700, border: "1px solid rgba(200,169,110,0.3)" }}>
              📈 نمو مستمر +18%
            </span>
          </div>

          {/* SVG Visual Graph */}
          <div style={{ width: "100%", height: "230px", position: "relative" }}>
            <svg width="100%" height="100%" viewBox="0 0 500 180" preserveAspectRatio="none" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="gbvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Area Under GBV Curve */}
              <polygon points="0,160 0,130 100,100 200,70 300,45 400,35 500,20 500,160" fill="url(#gbvGrad)" />

              {/* GBV Polyline */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                points="0,130 100,100 200,70 300,45 400,35 500,20"
              />

              {/* Revenue Polyline */}
              <polyline
                fill="none"
                stroke="#C8A96E"
                strokeWidth="3"
                strokeDasharray="5 3"
                points="0,165 100,150 200,130 300,110 400,100 500,85"
              />

              {/* Data Nodes */}
              {[
                { x: 0, y: 130 },
                { x: 100, y: 100 },
                { x: 200, y: 70 },
                { x: 300, y: 45 },
                { x: 400, y: 35 },
                { x: 500, y: 20 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#10B981" stroke="#0b1329" strokeWidth="2" />
              ))}
            </svg>

            {/* X Axis Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              {REVENUE_DATA.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", marginTop: "20px", fontSize: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "12px", height: "12px", background: "#10B981", borderRadius: "50%" }}></span>
              إجمالي الحجوزات (GBV)
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "12px", height: "12px", background: "#C8A96E", borderRadius: "50%" }}></span>
              صافي عمولة المنصة (15%)
            </span>
          </div>
        </div>

        {/* Booking Status Distribution Bar Chart */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>توزيع حالات الحجوزات</h3>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>إجمالي الحجوزات النشطة: 50 حجز</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {BOOKING_STATUSES.map((st) => (
              <div key={st.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", fontWeight: 600 }}>
                  <span>{st.label}</span>
                  <span>{st.count} ({st.percent}%)</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden" }}>
                  <div style={{ width: `${st.percent}%`, height: "100%", background: st.color, borderRadius: "100px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Distribution & Approval Queues */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        {/* Regional Trips Breakdown */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "16px" }}>توزيع الرحلات حسب المناطق 📍</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {REGIONS.map((r) => (
              <div key={r.region} style={{ padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{r.region}</span>
                <span style={{ fontSize: "12px", color: "#C8A96E", fontWeight: 800 }}>{r.trips} رحلة ({r.share})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guides Approval Queue */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800 }}>اعتماد مرشدين ({guidesQueue.length})</h3>
            <Link href="/admin/guides-approval" style={{ fontSize: "12px", color: "#C8A96E", textDecoration: "none", fontWeight: 700 }}>
              عرض الكل ←
            </Link>
          </div>

          {guidesQueue.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              لا توجد طلبات معلقة 🎉
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {guidesQueue.map((g) => (
                <div key={g.id} style={{ padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: 700 }}>{g.name}</h4>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>رخصة: {g.license} • {g.city}</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleApproveGuide(g.id, g.name)}>
                    اعتماد ✓
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Programs Review Queue */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800 }}>نشر برامج ({programsQueue.length})</h3>
            <Link href="/admin/programs-review" style={{ fontSize: "12px", color: "#C8A96E", textDecoration: "none", fontWeight: 700 }}>
              عرض الكل ←
            </Link>
          </div>

          {programsQueue.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              تم نشر كافة البرامج 🚀
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {programsQueue.map((p) => (
                <div key={p.id} style={{ padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: 700 }}>{p.title}</h4>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>المرشد: {p.guide} • {p.price}</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => handlePublishProgram(p.id, p.title)}>
                    نشر 🚀
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
