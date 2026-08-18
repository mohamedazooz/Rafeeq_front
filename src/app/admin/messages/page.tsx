"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { useLanguage } from "@/lib/language-provider";
import { dispatchDualActionNotification } from "@/lib/action-dispatcher";
import {
  MessageSquareIcon,
  EyeIcon,
  BanIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "@/components/icons";

interface ConversationItem {
  id: string;
  clientName: string;
  clientEmail: string;
  guideName: string;
  guideEmail: string;
  programTitle: string;
  messagesCount: number;
  lastMessage: string;
  lastMessageAt: string;
  hasReports: boolean;
  status: "active" | "archived" | "blocked";
}

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  { id: "conv-1", clientName: "أحمد بن محمد السبيعي", clientEmail: "ahmed.subaie@example.com", guideName: "خالد الحربي", guideEmail: "khaled.harbi@example.com", programTitle: "رحلة جبل القارة والواحة بالأحساء", messagesCount: 14, lastMessage: "تمام، التقينا عند البوابة الشمالية الساعة 8 صباحاً.", lastMessageAt: "قبل 15 دقيقة", hasReports: false, status: "active" },
  { id: "conv-2", clientName: "سارة عبد الله الشمري", clientEmail: "sara.shammari@example.com", guideName: "سعود فهد الدوسري", guideEmail: "saud.dosari@example.com", programTitle: "مسار الهايكنج في جبال السودة", messagesCount: 8, lastMessage: "هل يمكن تحويل المبلغ خارج المنصة عن طريق الـ STC Pay؟", lastMessageAt: "قبل ساعة", hasReports: true, status: "active" },
  { id: "conv-3", clientName: "ياسر فهد القحطاني", clientEmail: "yasser.qahtani@example.com", guideName: "ريم العلي", guideEmail: "reem.ali@example.com", programTitle: "جولة الغوص واستكشاف شعب حقل", messagesCount: 22, lastMessage: "شكراً جزيلاً على التجربة الممتازة!", lastMessageAt: "أمس", hasReports: false, status: "archived" },
];

export default function AdminMessagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState<ConversationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleBlockConversation = (conv: ConversationItem) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, status: "blocked" } : c))
    );
    setSelectedConv(null);

    dispatchDualActionNotification({
      title: "تجميد المحادثة الفورية لمخالفة سياسة المنصة",
      message: `تم تجميد المحادثة المتعلقة برحلة (${conv.programTitle}) بسبب محاولة دفع خارج المنصة أو بلاغ أمني.`,
      actionType: "BAN",
      targetEmail: conv.clientEmail,
      targetName: conv.clientName,
      targetRole: "Client",
    });

    showToast(isAr ? "تم إيقاف وحظر هذه المحادثة وإرسال إشعار فوري للطرفين!" : "Conversation blocked for policy violation.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", bottom: "24px", left: "24px", background: "var(--color-bg-card)", border: "1px solid var(--color-gold-heading)", color: "var(--color-text-primary)", padding: "14px 24px", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", zIndex: 9999, fontWeight: 800, fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheckIcon size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "4px 12px", borderRadius: "100px", color: "#3B82F6", fontSize: "11px", fontWeight: 800, marginBottom: "8px" }}>
            <MessageSquareIcon size={14} color="#3B82F6" />
            {isAr ? "الرقابة على المحادثات الفورية والنزاهة المالية" : "Messaging & Disintermediation Monitor"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "var(--color-text-primary)" }}>
            {isAr ? "مركز المحادثات وبلاغات الرسائل 💬" : "Conversations & Messages Monitor"}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
            {isAr ? "الرقابة على المحادثات بين المسافرين والمرشدين، كشف محاولات الدفع خارج المنصة (Off-platform Leakage)، والتعامل مع البلاغات." : "Detect bypass attempts, off-platform payment solicitations, and harassment reports."}
          </p>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#EF4444", padding: "8px 16px", borderRadius: "12px", fontSize: "12px", fontWeight: 800 }}>
          <AlertTriangleIcon size={16} color="#EF4444" />
          <span>{isAr ? "تنبيه أمني: رصد محاولة دفع خارج المنصة (STC Pay)" : "Security Alert: Off-platform payment detected"}</span>
        </div>
      </div>

      {/* Conversations Table */}
      <div style={{ background: "var(--color-bg-card)", borderRadius: "20px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "start", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المسافر" : "Client"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "المرشد السياحي" : "Guide"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "البرنامج" : "Tour Program"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الرسائل" : "Messages"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "آخر رسالة" : "Last Message"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "البلاغات الأمنية" : "Security Flags"}</th>
              <th style={{ padding: "14px 16px" }}>{isAr ? "الحالة" : "Status"}</th>
              <th style={{ padding: "14px 16px", textAlign: "end" }}>{isAr ? "الإجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr key={conv.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 800 }}>{conv.clientName}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--color-gold-heading)" }}>{conv.guideName}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)" }}>{conv.programTitle}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{conv.messagesCount} {isAr ? "رسالة" : "msgs"}</td>

                <td style={{ padding: "14px 16px", maxWidth: "260px" }}>
                  <p style={{ fontSize: "12px", color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.lastMessage}</p>
                  <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>{conv.lastMessageAt}</span>
                </td>

                <td style={{ padding: "14px 16px" }}>
                  {conv.hasReports ? (
                    <span style={{ color: "#EF4444", fontWeight: 800, fontSize: "11px", background: "rgba(239, 68, 68, 0.15)", padding: "3px 8px", borderRadius: "100px" }}>
                      ⚠️ {isAr ? "بلاغ تسريب مالي" : "Bypass Flag"}
                    </span>
                  ) : (
                    <span style={{ color: "#10B981", fontSize: "11px", fontWeight: 700 }}>{isAr ? "آمنة ✓" : "Clean ✓"}</span>
                  )}
                </td>

                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: conv.status === "active" ? "rgba(16, 185, 129, 0.15)" : conv.status === "blocked" ? "rgba(239, 68, 68, 0.15)" : "rgba(255,255,255,0.05)",
                      color: conv.status === "active" ? "#10B981" : conv.status === "blocked" ? "#EF4444" : "var(--color-text-secondary)",
                    }}
                  >
                    {conv.status === "active" ? (isAr ? "نشطة" : "Active") : conv.status === "blocked" ? (isAr ? "محظورة" : "Blocked") : (isAr ? "مؤرشفة" : "Archived")}
                  </span>
                </td>

                <td style={{ padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    <IconButton
                      variant="gold"
                      size="sm"
                      title={isAr ? "معاينة سجل الرسائل" : "Inspect Transcript"}
                      icon={<EyeIcon size={15} />}
                      onClick={() => setSelectedConv(conv)}
                    />

                    {conv.status !== "blocked" && (
                      <IconButton
                        variant="danger"
                        size="sm"
                        title={isAr ? "إيقاف وحظر المحادثة" : "Block Conversation"}
                        icon={<BanIcon size={15} />}
                        onClick={() => handleBlockConversation(conv)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transcript Modal */}
      <Modal
        isOpen={!!selectedConv}
        onClose={() => setSelectedConv(null)}
        title={isAr ? "سجل الرسائل والرقابة" : "Messages Transcript"}
        subtitle={selectedConv ? `${selectedConv.clientName} ↔ ${selectedConv.guideName} • ${selectedConv.programTitle}` : ""}
        maxWidth="560px"
      >
        {selectedConv && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px", overflowY: "auto", padding: "14px", background: "var(--color-bg-secondary)", borderRadius: "14px" }}>
              <div style={{ alignSelf: "flex-start", background: "var(--color-modal-bg)", padding: "10px 14px", borderRadius: "12px", maxWidth: "80%", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
                <span style={{ fontSize: "10px", color: "var(--color-gold-heading)", fontWeight: 800 }}>{selectedConv.guideName}</span>
                <p style={{ fontSize: "12px", marginTop: "2px" }}>أهلاً بك، تم تأكيد مسار الرحلة وسنلتقي حسب الموعد.</p>
              </div>

              <div style={{ alignSelf: "flex-end", background: "var(--gradient-gold)", color: "#0f172a", padding: "10px 14px", borderRadius: "12px", maxWidth: "80%" }}>
                <span style={{ fontSize: "10px", fontWeight: 900 }}>{selectedConv.clientName}</span>
                <p style={{ fontSize: "12px", marginTop: "2px" }}>{selectedConv.lastMessage}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "4px" }}>
              {selectedConv.status !== "blocked" && (
                <Button variant="danger" size="md" onClick={() => handleBlockConversation(selectedConv)}>
                  {isAr ? "إيقاف وحظر المحادثة 🛑" : "Block Chat"}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setSelectedConv(null)}>
                {isAr ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
