"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { useDashboardMetrics } from "@/lib/dashboard-metrics";
import {
  MessageSquareIcon,
  ShieldCheckIcon,
  ShieldIcon,
  UserIcon,
  CompassIcon,
  BanIcon,
  CheckCircleIcon,
  FileTextIcon,
  SearchIcon,
} from "@/components/icons";

interface MessageItem {
  id: string;
  senderRole: "admin" | "guide" | "client" | "system";
  senderName: string;
  body: string;
  timestamp: string;
  attachment?: string;
}

interface ThreadItem {
  id: string;
  type: "tri_party" | "direct_guide" | "direct_client";
  titleAr: string;
  titleEn: string;
  guideName: string;
  guideEmail: string;
  clientName: string;
  clientEmail: string;
  bookingRef: string;
  programTitle: string;
  status: "active" | "frozen" | "resolved";
  unread: boolean;
  messages: MessageItem[];
}

const INITIAL_THREADS: ThreadItem[] = [
  {
    id: "thread-1",
    type: "tri_party",
    titleAr: "غرفة وساطة: نزاع تأخير وتغيير محطة مسار جبل القارة",
    titleEn: "Mediation: Schedule Delay Dispute (Al-Qarah Mountain)",
    guideName: "خالد الحربي",
    guideEmail: "khaled.harbi@example.com",
    clientName: "أحمد بن محمد السبيعي",
    clientEmail: "ahmed.subaie@example.com",
    bookingRef: "BK-882910",
    programTitle: "رحلة جبل القارة والواحة بالأحساء",
    status: "active",
    unread: true,
    messages: [
      {
        id: "m-1",
        senderRole: "system",
        senderName: "نظام رفيق الآلي",
        body: "تم فتح غرفة الوساطة الإدارية الثلاثية بناءً على طلب المسافر للتحقق من مسار الرحلة وساعات الانطلاق.",
        timestamp: "09:00 ص",
      },
      {
        id: "m-2",
        senderRole: "client",
        senderName: "أحمد بن محمد السبيعي (المسافر)",
        body: "السلام عليكم، واجهنا تأخير في موعد الانطلاق الصباحي وتم اختصار إحدى المحطات التراثية في الواحة.",
        timestamp: "09:15 ص",
      },
      {
        id: "m-3",
        senderRole: "guide",
        senderName: "خالد الحربي (المرشد السياحي)",
        body: "أهلاً أخي أحمد، التأخير كان بسبب إغلاق أمني مؤقت للطريق الجبلي وتم تعويض المحطة بزيارة دار التراث الشعبي المجاورة.",
        timestamp: "09:22 ص",
      },
      {
        id: "m-4",
        senderRole: "admin",
        senderName: "إدارة الحوكمة (الأدمن)",
        body: "مرحباً بكم. تم مراجعة تقرير مسار الرحلة ونظام الـ GPS، وجاري اعتماد تسوية توافقية ترضي الطرفين عبر حساب الضمان.",
        timestamp: "09:30 ص",
      },
    ],
  },
  {
    id: "thread-2",
    type: "direct_guide",
    titleAr: "محادثة مباشرة: استفسار تجديد رخصة وزارة السياحة (TG)",
    titleEn: "Direct Guide Chat: Tourism License Renewal Inquiry",
    guideName: "ريم العلي",
    guideEmail: "reem.ali@example.com",
    clientName: "-",
    clientEmail: "-",
    bookingRef: "LIC-2026-99",
    programTitle: "جولة الغوص واستكشاف شعب حقل البحرية",
    status: "active",
    unread: true,
    messages: [
      {
        id: "m-201",
        senderRole: "guide",
        senderName: "ريم العلي (مرشد معتمد)",
        body: "مرحباً إدارة رفيق، قمت برفع شهادة تجديد رخصة الغوص السياحي الصادرة من وزارة السياحة وأرجو تفعيلها على ملفي.",
        timestamp: "أمس 04:30 م",
      },
      {
        id: "m-202",
        senderRole: "admin",
        senderName: "مسؤول الاعتماد والترخيص",
        body: "أهلاً أخت ريم، تم استلام الوثيقة وتدقيق الرمز الإلكتروني QR وهي مطابقة ومعتمدة في الكتالوج الآن.",
        timestamp: "أمس 05:10 م",
      },
    ],
  },
  {
    id: "thread-3",
    type: "direct_client",
    titleAr: "محادثة مباشرة: استفسار طلب مرشد ناطق بالفرنسية لوفد",
    titleEn: "Direct Client Chat: French-speaking VIP Guide Request",
    guideName: "-",
    guideEmail: "-",
    clientName: "فيصل ناصر الدوسري",
    clientEmail: "faisal.dosari@example.com",
    bookingRef: "REQ-77102",
    programTitle: "استكشاف مدائن صالح وتراث العلا",
    status: "active",
    unread: false,
    messages: [
      {
        id: "m-301",
        senderRole: "client",
        senderName: "فيصل ناصر الدوسري",
        body: "السلام عليكم، هل يمكن توفير مرشد سياحي مرخص يتقن اللغة الفرنسية لوفد أعمال قادم لزيارة العلا الأسبوع القادم؟",
        timestamp: "10:12 ص",
      },
      {
        id: "m-302",
        senderRole: "admin",
        senderName: "فريق دعم رفيق VIP",
        body: "أهلاً بك أخي فيصل، بالتأكيد لدينا 3 مرشدين معتمدين ناطقين بالفرنسية في منطقة العلا وتم تزويدك بملفاتهم للحجز المباشر.",
        timestamp: "10:20 ص",
      },
    ],
  },
];

export default function AdminMessagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { decrementMessagesQueue } = useDashboardMetrics();

  const [threads, setThreads] = useState<ThreadItem[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("thread-1");
  const [filterType, setFilterType] = useState<"all" | "tri_party" | "direct_guide" | "direct_client">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      senderRole: "admin",
      senderName: isAr ? "إدارة منصة رفيق" : "Platform Administration",
      body: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString(isAr ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, newMsg], unread: false }
          : t
      )
    );

    setInputMessage("");
    decrementMessagesQueue();
    showToast(isAr ? "تم إرسال الرسالة بنجاح إلى أطراف المحادثة" : "Message sent successfully");
  };

  const handleToggleFreeze = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const nextStatus = t.status === "frozen" ? "active" : "frozen";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
    showToast(isAr ? "تم تحديث حالة قفل المحادثة بنجاح" : "Chat status updated");
  };

  const filteredThreads = threads.filter((t) => {
    if (filterType !== "all" && t.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.titleAr.toLowerCase().includes(q) ||
        t.titleEn.toLowerCase().includes(q) ||
        t.guideName.toLowerCase().includes(q) ||
        t.clientName.toLowerCase().includes(q) ||
        t.bookingRef.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-gold-heading)",
            color: "var(--color-text-primary)",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "var(--shadow-xl)",
            zIndex: 9999,
            fontWeight: 800,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircleIcon size={18} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(200, 169, 110, 0.12)",
            border: "1px solid rgba(200, 169, 110, 0.25)",
            padding: "4px 12px",
            borderRadius: "100px",
            color: "var(--color-gold-heading)",
            fontSize: "11px",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          <MessageSquareIcon size={14} color="var(--color-gold-heading)" />
          <span>{isAr ? "مركز المراسلات والشات والوساطة الثلاثية" : "Messaging & Tri-Party Mediation"}</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "المراسلات وغرف الوساطة الجماعية" : "Messaging & Group Mediation Rooms"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr
            ? "التواصل الإداري المباشر مع المرشدين السياحيين والعملاء المسافرين، والوساطة في غرف الشات المشتركة لحل النزاعات."
            : "Direct communication with tour guides and traveler clients, and tri-party mediation rooms for real-time conflict resolution."}
        </p>
      </div>

      {/* Channel Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {[
          { key: "all", labelAr: "كافة المحادثات", labelEn: "All Conversations" },
          { key: "tri_party", labelAr: "غرف الوساطة الثلاثية (شات جماعي)", labelEn: "Tri-Party Mediation Rooms" },
          { key: "direct_guide", labelAr: "محادثات المرشدين المباشرة", labelEn: "Direct Guide Chats" },
          { key: "direct_client", labelAr: "محادثات العملاء المباشرة", labelEn: "Direct Client Chats" },
        ].map((f) => {
          const isActive = filterType === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilterType(f.key as typeof filterType)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 800,
                cursor: "pointer",
                border: "1px solid",
                borderColor: isActive ? "var(--color-gold-heading)" : "var(--color-border)",
                background: isActive ? "var(--color-bg-secondary)" : "var(--color-bg-card)",
                color: isActive ? "var(--color-gold-heading)" : "var(--color-text-secondary)",
                transition: "all 0.15s ease",
              }}
            >
              {isAr ? f.labelAr : f.labelEn}
            </button>
          );
        })}
      </div>

      {/* Messaging Console Split View */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "16px",
          minHeight: "600px",
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        {/* Left Threads Sidebar */}
        <div
          style={{
            borderInlineEnd: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            background: "var(--color-bg-card)",
          }}
        >
          {/* Search Box */}
          <div style={{ padding: "14px", borderBottom: "1px solid var(--color-border)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--color-bg-secondary)",
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid var(--color-border)",
              }}
            >
              <SearchIcon size={14} color="var(--color-text-secondary)" />
              <input
                type="text"
                placeholder={isAr ? "بحث بالمرشد، العميل، أو الحجز..." : "Search guide, client, ref..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-text-primary)",
                  fontSize: "12px",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Threads List */}
          <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {filteredThreads.map((t) => {
              const isSelected = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveThreadId(t.id);
                    if (t.unread) decrementMessagesQueue();
                  }}
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid var(--color-border)",
                    cursor: "pointer",
                    background: isSelected ? "var(--color-bg-secondary)" : "transparent",
                    borderInlineStart: isSelected ? "3px solid var(--color-gold-heading)" : "3px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "100px",
                        background:
                          t.type === "tri_party"
                            ? "rgba(200, 169, 110, 0.15)"
                            : t.type === "direct_guide"
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(59, 130, 246, 0.15)",
                        color:
                          t.type === "tri_party"
                            ? "var(--color-gold-heading)"
                            : t.type === "direct_guide"
                            ? "#10B981"
                            : "#3B82F6",
                      }}
                    >
                      {t.type === "tri_party"
                        ? isAr
                          ? "شات جماعي ثلاثي"
                          : "Tri-Party"
                        : t.type === "direct_guide"
                        ? isAr
                          ? "مرشد مباشر"
                          : "Guide Direct"
                        : isAr
                        ? "عميل مباشر"
                        : "Client Direct"}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{t.bookingRef}</span>
                  </div>

                  <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px", lineHeight: 1.4 }}>
                    {isAr ? t.titleAr : t.titleEn}
                  </h4>

                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.messages[t.messages.length - 1]?.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        {activeThread && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Chat Pane Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 900, color: "var(--color-text-primary)" }}>
                    {isAr ? activeThread.titleAr : activeThread.titleEn}
                  </h3>
                  {activeThread.status === "frozen" && (
                    <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", padding: "2px 8px", borderRadius: "100px" }}>
                      {isAr ? "محادثة مجمدة إدارياً" : "Frozen"}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                  {activeThread.guideName !== "-" && (
                    <span>
                      {isAr ? "المرشد:" : "Guide:"} <strong>{activeThread.guideName}</strong>
                    </span>
                  )}
                  {activeThread.clientName !== "-" && (
                    <span>
                      {isAr ? "العميل:" : "Client:"} <strong>{activeThread.clientName}</strong>
                    </span>
                  )}
                  <span>
                    {isAr ? "البرنامج:" : "Tour:"} <strong>{activeThread.programTitle}</strong>
                  </span>
                </div>
              </div>

              {/* Chat Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => handleToggleFreeze(activeThread.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 800,
                    cursor: "pointer",
                    border: "1px solid var(--color-border)",
                    background: activeThread.status === "frozen" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.1)",
                    color: activeThread.status === "frozen" ? "#10B981" : "#EF4444",
                  }}
                >
                  <BanIcon size={14} color={activeThread.status === "frozen" ? "#10B981" : "#EF4444"} />
                  <span>{activeThread.status === "frozen" ? (isAr ? "إلغاء تجميد المحادثة" : "Unfreeze") : isAr ? "تجميد المحادثة" : "Freeze"}</span>
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div
              style={{
                flexGrow: 1,
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                background: "var(--color-bg-card)",
              }}
            >
              {activeThread.messages.map((m) => {
                const isAdmin = m.senderRole === "admin";
                const isSystem = m.senderRole === "system";
                const isGuide = m.senderRole === "guide";

                if (isSystem) {
                  return (
                    <div
                      key={m.id}
                      style={{
                        alignSelf: "center",
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        padding: "8px 16px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        color: "var(--color-text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <ShieldIcon size={12} color="var(--color-gold-heading)" />
                      <span>{m.body}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: isAdmin ? "flex-end" : "flex-start",
                      maxWidth: "75%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "4px",
                        justifyContent: isAdmin ? "flex-end" : "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: isAdmin
                            ? "var(--gradient-gold)"
                            : isGuide
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(59, 130, 246, 0.15)",
                          color: isAdmin ? "#0f172a" : isGuide ? "#10B981" : "#3B82F6",
                        }}
                      >
                        {isAdmin
                          ? isAr
                            ? "إدارة رفيق"
                            : "Admin"
                          : isGuide
                          ? isAr
                            ? "مرشد سياحي"
                            : "Guide"
                          : isAr
                          ? "عميل مسافر"
                          : "Client"}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-primary)" }}>{m.senderName}</span>
                      <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>{m.timestamp}</span>
                    </div>

                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "14px",
                        background: isAdmin ? "var(--color-bg-secondary)" : "var(--color-bg-card)",
                        border: "1px solid",
                        borderColor: isAdmin ? "var(--color-gold-heading)" : "var(--color-border)",
                        color: "var(--color-text-primary)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      {m.body}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "16px 20px",
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder={isAr ? "اكتب توجيهاً إدارياً أو رسالة وساطة لجميع الأطراف..." : "Type administrative instruction or mediation message..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={activeThread.status === "frozen"}
                style={{
                  flexGrow: 1,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "var(--color-text-primary)",
                  outline: "none",
                }}
              />

              <Button
                variant="primary"
                type="submit"
                disabled={!inputMessage.trim() || activeThread.status === "frozen"}
                style={{ padding: "10px 20px", fontSize: "12px", fontWeight: 800 }}
              >
                {isAr ? "إرسال" : "Send"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
