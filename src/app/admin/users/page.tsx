"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  BanIcon,
  KeyIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface UserItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "Guide" | "Client" | "Admin";
  status: "نشط" | "معلق" | "محظور";
  isApproved: boolean;
  date: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: "usr-1", name: "عبد العزيز فهد الشمري", phone: "+966551234567", email: "abdulaziz.alshammari@rafeeq.sa", role: "Guide", status: "نشط", isApproved: true, date: "2026-08-01" },
  { id: "usr-2", name: "سعود فهد الدوسري", phone: "+966509876543", email: "saud.aldosari@example.com", role: "Guide", status: "معلق", isApproved: false, date: "2026-08-16" },
  { id: "usr-3", name: "عبد الله الخالدي", phone: "+966501122334", email: "abdullah.khaldi@example.com", role: "Client", status: "نشط", isApproved: true, date: "2026-08-10" },
  { id: "usr-4", name: "سارة محمد العتيبي", phone: "+966554433221", email: "sara.otaibi@example.com", role: "Client", status: "نشط", isApproved: true, date: "2026-08-12" },
  { id: "usr-5", name: "خالد سعيد الشهري", phone: "+966567890123", email: "khaled.shehri@example.com", role: "Guide", status: "محظور", isApproved: false, date: "2026-07-20" },
  { id: "usr-6", name: "فهد العريفي", phone: "+966500000001", email: "fahad.arifi@rafeeq.sa", role: "Admin", status: "نشط", isApproved: true, date: "2026-01-01" },
];

export default function AdminUsersPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleToggleBan = (id: string, currentStatus: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = currentStatus === "محظور" ? "نشط" : "محظور";
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }

    dispatchDualActionNotification({
      title: newStatus === "محظور" ? "تجميد الحساب بالمنصة" : "إعادة تنشيط الحساب",
      message: `تم تحديث حالة حسابك إلى (${newStatus}).`,
      actionType: "BAN",
      targetEmail: user.email,
      targetName: user.name,
      targetRole: user.role,
    });

    showToast(isAr ? `تم تحديث حالة حساب (${user.name}) إلى (${newStatus}) وإرسال إشعار فوري.` : `User status updated to ${newStatus}`);
  };

  const handleApproveGuide = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isApproved: true, status: "نشط" } : u)));
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, isApproved: true, status: "نشط" });
    }

    dispatchDualActionNotification({
      title: "اعتماد وتوثيق الحساب رسمياً",
      message: `تم اعتماد وتوثيق حسابك رسمياً كمرشد سياحي في منصة رفيق.`,
      actionType: "APPROVE",
      targetEmail: user.email,
      targetName: user.name,
      targetRole: "Guide",
    });

    showToast(isAr ? `تم اعتماد وتوثيق حساب (${user.name}) بنجاح!` : `User approved successfully.`);
  };

  const handleReset2FA = (user: UserItem) => {
    dispatchDualActionNotification({
      title: "إعادة ضبط المصادقة الثنائية 2FA",
      message: `تم إرسال رابط تأميني لإعادة ضبط مفاتيح المصادقة الثنائية.`,
      actionType: "RESET_2FA",
      targetEmail: user.email,
      targetName: user.name,
      targetRole: user.role,
    });

    showToast(isAr ? `تم إرسال رابط إعادة ضبط 2FA إلى بريد (${user.email}).` : `2FA reset link dispatched.`);
  };

  const handleSoftDelete = (id: string, name: string) => {
    const user = users.find((u) => u.id === id);
    if (confirm(isAr ? `هل أنت متأكد من حذف حساب (${name})؟` : `Delete user ${name}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSelectedUser(null);

      if (user) {
        dispatchDualActionNotification({
          title: "حذف الحساب نهائياً",
          message: `تم حذف حسابك من منصة رفيق بناءً على قرار إداري.`,
          actionType: "DELETE",
          targetEmail: user.email,
          targetName: user.name,
          targetRole: user.role,
        });
      }

      showToast(isAr ? `تم حذف حساب المستخدم (${name}) بنجاح.` : `User deleted.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-gold-heading)", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
          <UsersIcon size={14} color="var(--color-gold-heading)" />
          {isAr ? "دليل المستخدمين الموحد والرقابة الإدارية" : "Unified Users Directory"}
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "إدارة المستخدمين والأعضاء 👥" : "Users Management"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr ? "سجل كافة الحسابات بالمنصة (مرشدين، عملاء، مسؤولين) مع أدوات التحكم الأمني الفوري." : "Directory of all users with instant security controls and audit triggers."}
        </p>
      </div>

      {/* Filters Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: "var(--color-bg-card)", padding: "16px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "ALL", label: isAr ? "الكل" : "All" },
            { id: "Guide", label: isAr ? "مرشدون" : "Guides" },
            { id: "Client", label: isAr ? "عملاء" : "Clients" },
            { id: "Admin", label: isAr ? "إدارة" : "Admins" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRoleFilter(r.id)}
              style={{
                padding: "7px 16px",
                borderRadius: "100px",
                border: `1px solid ${roleFilter === r.id ? "transparent" : "var(--color-border)"}`,
                background: roleFilter === r.id ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                color: roleFilter === r.id ? "#0f172a" : "var(--color-text-primary)",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder={isAr ? "ابحث بالاسم، البريد أو رقم الجوال..." : "Search by name, email or phone..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "9px 14px", paddingInlineStart: "36px", borderRadius: "10px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", fontSize: "13px", outline: "none" }}
          />
          <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", insetInlineStart: "12px", pointerEvents: "none" }}>
            <SearchIcon size={15} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المستخدم" : "User Name"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "رقم الجوال" : "Phone"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "نوع الحساب" : "Role"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "حالة الحساب" : "Status"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الاعتماد" : "Verification"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "تاريخ التسجيل" : "Registered"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "إجراءات التحكم" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, color: "var(--color-text-primary)" }}>{u.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{u.email}</div>
                </td>

                <td style={{ padding: "14px 16px", direction: "ltr", textAlign: "start", fontFamily: "monospace" }}>{u.phone}</td>

                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: u.role === "Guide" ? "rgba(200,169,110,0.15)" : u.role === "Admin" ? "rgba(59,130,246,0.15)" : "var(--color-bg-secondary)", color: u.role === "Guide" ? "var(--color-gold-heading)" : u.role === "Admin" ? "#3B82F6" : "var(--color-text-primary)", padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800, border: "1px solid var(--color-border)" }}>
                    {u.role === "Guide" ? (isAr ? "مرشد سياحي" : "Guide") : u.role === "Admin" ? (isAr ? "إدارة" : "Admin") : (isAr ? "عميل مسافر" : "Client")}
                  </span>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: u.status === "نشط" ? "#10B981" : u.status === "محظور" ? "#EF4444" : "#F59E0B", fontWeight: 800, fontSize: "12px" }}>
                    {u.status}
                  </span>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: u.isApproved ? "#10B981" : "#F59E0B", fontWeight: 800, fontSize: "12px" }}>
                    {u.isApproved ? "معتمد ✓" : u.role === "Guide" ? "في الانتظار ⏳" : "لا يلزم"}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", fontSize: "12px", color: "var(--color-text-secondary)" }}>{u.date}</td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    {u.role === "Guide" && !u.isApproved && (
                      <IconButton
                        variant="success"
                        size="sm"
                        title={isAr ? "اعتماد الحساب رسمياً" : "Approve"}
                        icon={<CheckCircleIcon size={15} />}
                        onClick={() => handleApproveGuide(u.id)}
                      />
                    )}

                    <IconButton
                      variant="gold"
                      size="sm"
                      title={isAr ? "التحكم وتأمين الحساب" : "Inspect"}
                      icon={<EyeIcon size={15} />}
                      onClick={() => setSelectedUser(u)}
                    />

                    <IconButton
                      variant="outline"
                      size="sm"
                      title={isAr ? "إعادة ضبط 2FA" : "Reset 2FA"}
                      icon={<KeyIcon size={15} />}
                      onClick={() => handleReset2FA(u)}
                    />

                    <IconButton
                      variant={u.status === "محظور" ? "secondary" : "danger"}
                      size="sm"
                      title={u.status === "محظور" ? (isAr ? "إلغاء التجميد" : "Activate") : (isAr ? "حظر الحساب" : "Ban")}
                      icon={<BanIcon size={15} />}
                      onClick={() => handleToggleBan(u.id, u.status)}
                    />

                    <IconButton
                      variant="ghost"
                      size="sm"
                      title={isAr ? "حذف نهائي" : "Delete"}
                      icon={<TrashIcon size={15} />}
                      onClick={() => handleSoftDelete(u.id, u.name)}
                      style={{ color: "#EF4444" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Security Management Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser ? (isAr ? `إدارة وتأمين حساب: ${selectedUser.name}` : `Manage User: ${selectedUser.name}`) : ""}
        subtitle={selectedUser ? `${selectedUser.role} • ${selectedUser.email}` : ""}
        maxWidth="520px"
      >
        {selectedUser && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="rafeeq-modal-box" style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <p><strong>{isAr ? "البريد الإلكتروني:" : "Email:"}</strong> {selectedUser.email}</p>
              <p><strong>{isAr ? "رقم الجوال:" : "Phone:"}</strong> <span style={{ direction: "ltr", display: "inline-block" }}>{selectedUser.phone}</span></p>
              <p><strong>{isAr ? "نوع الحساب:" : "Role:"}</strong> {selectedUser.role}</p>
              <p><strong>{isAr ? "حالة الحساب الحالية:" : "Status:"}</strong> {selectedUser.status}</p>
              <p><strong>{isAr ? "حالة التوثيق:" : "Verified:"}</strong> {selectedUser.isApproved ? "معتمد رسمياً ✓" : "غير معتمد"}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {selectedUser.role === "Guide" && !selectedUser.isApproved && (
                <Button variant="primary" size="md" onClick={() => handleApproveGuide(selectedUser.id)}>
                  {isAr ? "اعتماد كمرشد سياحي رسمي ✓" : "Approve as Guide"}
                </Button>
              )}

              <Button variant="outline" size="md" onClick={() => handleReset2FA(selectedUser)}>
                {isAr ? "🔑 إعادة ضبط المصادقة الثنائية (Reset 2FA)" : "Reset 2FA Password"}
              </Button>

              <Button
                variant={selectedUser.status === "محظور" ? "secondary" : "danger"}
                size="md"
                onClick={() => handleToggleBan(selectedUser.id, selectedUser.status)}
              >
                {selectedUser.status === "محظور" ? (isAr ? "إلغاء التجميد وتنشيط الحساب" : "Activate User") : (isAr ? "حظر وتجميد الحساب 🛑" : "Ban User")}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => handleSoftDelete(selectedUser.id, selectedUser.name)} style={{ color: "#EF4444" }}>
                {isAr ? "حذف وحجب الحساب نهائياً 🗑️" : "Delete Account"}
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
