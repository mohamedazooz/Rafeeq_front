"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface User {
  id: string;
  name: string;
  phone: string;
  role: "Client" | "Guide" | "Admin";
  isApproved: boolean;
  status: "نشط" | "محظور" | "قيد المراجعة";
  date: string;
}

const INITIAL_USERS: User[] = [
  { id: "usr-1", name: "عبد العزيز الشمري", phone: "+966 50 111 2222", role: "Guide", isApproved: true, status: "نشط", date: "2026-01-10" },
  { id: "usr-2", name: "محمد العتيبي", phone: "+966 55 333 4444", role: "Client", isApproved: true, status: "نشط", date: "2026-03-15" },
  { id: "usr-3", name: "سعود الدوسري", phone: "+966 54 888 9999", role: "Guide", isApproved: false, status: "قيد المراجعة", date: "2026-08-16" },
  { id: "usr-4", name: "منى علي الغامدي", phone: "+966 56 777 1111", role: "Guide", isApproved: false, status: "قيد المراجعة", date: "2026-08-17" },
  { id: "usr-5", name: "خالد السفياني", phone: "+966 51 222 3333", role: "Client", isApproved: true, status: "محظور", date: "2026-02-20" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleToggleBan = (id: string, currentStatus: User["status"]) => {
    const newStatus = currentStatus === "محظور" ? "نشط" : "محظور";
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    showToast(`تم ${newStatus === "محظور" ? "تجميد وحظر" : "إلغاء حظر وتنشيط"} الحساب بنجاح!`);
    setSelectedUser(null);
  };

  const handleApproveGuide = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isApproved: true, status: "نشط" } : u))
    );
    showToast("تم اعتماد حساب المرشد الرسمي بنجاح! ✓");
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.includes(search) || u.phone.includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: "var(--space-6)" }}>
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-saudi-green)", color: "#fff", padding: "12px 24px", borderRadius: "var(--radius-lg)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 9999, fontWeight: 700, fontSize: "var(--text-sm)" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>إدارة المستخدمين والحسابات 👥</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>عرض واعتماد وتجميد حسابات العملاء والمرشدين وتحديث الأدوار</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass" style={{ padding: "var(--space-4)", borderRadius: "var(--radius-xl)", marginBottom: "var(--space-6)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          {[
            { id: "all", label: "جميع الحسابات" },
            { id: "Client", label: "العملاء (Clients)" },
            { id: "Guide", label: "المرشدون (Guides)" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRoleFilter(r.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: roleFilter === r.id ? "var(--color-gold-royal)" : "rgba(255,255,255,0.05)",
                color: roleFilter === r.id ? "#0f172a" : "var(--color-warm-white)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الجوال..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.2)",
            color: "#fff",
            fontSize: "var(--text-sm)",
            width: "260px",
          }}
        />
      </div>

      {/* Users Table */}
      <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
              <th style={{ padding: "var(--space-3)" }}>المستخدم</th>
              <th style={{ padding: "var(--space-3)" }}>رقم الجوال</th>
              <th style={{ padding: "var(--space-3)" }}>نوع الحساب</th>
              <th style={{ padding: "var(--space-3)" }}>حالة الحساب</th>
              <th style={{ padding: "var(--space-3)" }}>الاعتماد</th>
              <th style={{ padding: "var(--space-3)" }}>تاريخ التسجيل</th>
              <th style={{ padding: "var(--space-3)" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px dashed var(--color-border)" }}>
                <td style={{ padding: "var(--space-3)", fontWeight: 700 }}>{u.name}</td>
                <td style={{ padding: "var(--space-3)", direction: "ltr" }}>{u.phone}</td>
                <td style={{ padding: "var(--space-3)" }}>
                  <span style={{ background: u.role === "Guide" ? "rgba(200,169,110,0.15)" : "rgba(255,255,255,0.05)", color: u.role === "Guide" ? "var(--color-gold-royal)" : "var(--color-warm-white)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: 700 }}>
                    {u.role === "Guide" ? "مرشد سياحي" : "عميل مسافر"}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3)" }}>
                  <span style={{ color: u.status === "نشط" ? "var(--color-saudi-green)" : u.status === "محظور" ? "#ef4444" : "#f59e0b", fontWeight: 700, fontSize: "var(--text-xs)" }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3)" }}>
                  <span style={{ color: u.isApproved ? "var(--color-saudi-green)" : "var(--color-warning)", fontWeight: 700, fontSize: "var(--text-xs)" }}>
                    {u.isApproved ? "معتمد ✓" : u.role === "Guide" ? "في الانتظار ⏳" : "لا يلزم"}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3)", fontSize: "var(--text-xs)" }}>{u.date}</td>
                <td style={{ padding: "var(--space-3)" }}>
                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(u)}>
                    التحكم بالحساب
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Modal */}
      {selectedUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: "var(--space-4)" }}>
          <div className="glass" style={{ width: "480px", background: "var(--color-midnight-blue)", padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>إدارة حساب: {selectedUser.name}</h3>

            <div style={{ fontSize: "var(--text-sm)", display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
              <p><strong>رقم الجوال:</strong> <span style={{ direction: "ltr" }}>{selectedUser.phone}</span></p>
              <p><strong>نوع الحساب:</strong> {selectedUser.role}</p>
              <p><strong>الحالة:</strong> {selectedUser.status}</p>
              <p><strong>حالة الاعتماد:</strong> {selectedUser.isApproved ? "معتمد" : "غير معتمد"}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
              {selectedUser.role === "Guide" && !selectedUser.isApproved && (
                <Button variant="primary" size="md" onClick={() => handleApproveGuide(selectedUser.id)}>
                  اعتماد كمرشد رسمي ✓
                </Button>
              )}

              <Button
                variant={selectedUser.status === "محظور" ? "secondary" : "danger"}
                size="md"
                onClick={() => handleToggleBan(selectedUser.id, selectedUser.status)}
              >
                {selectedUser.status === "محظور" ? "إلغاء التجميد وتنشيط الحساب" : "حظر وتجميد الحساب 🛑"}
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
