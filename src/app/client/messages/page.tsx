"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import {
  MessageSquareIcon,
  CompassIcon,
  ShieldCheckIcon,
  ShieldIcon,
  CheckCircleIcon,
  SendIcon,
} from "@/components/icons";

interface MessageItem {
  id: string;
  sender: "client" | "guide" | "admin" | "system";
  senderName: string;
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  type: "guide" | "support_mediation";
  guideName: string;
  guideCity: string;
  tourTitle: string;
  lastMessage: string;
  unreadCount: number;
  messages: MessageItem[];
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: "th-med",
    type: "support_mediation",
    guideName: "خالد الحربي (المرشد) + إدارة رفيق",
    guideCity: "الأحساء",
    tourTitle: "غرفة وساطة: رحلة جبل القارة والواحة",
    lastMessage: "تم مراجعة تقرير مسار الرحلة واعتماد التسوية التوافقية.",
    unreadCount: 1,
    messages: [
      {
        id: "m-0",
        sender: "system",
        senderName: "نظام رفيق",
        text: "تم فتح غرفة الوساطة الإدارية الثلاثية بينك وبين المرشد وإدارة المنصة.",
        time: "09:00 ص",
      },
      {
        id: "m-1",
        sender: "client",
        senderName: "أنت (المسافر)",
        text: "السلام عليكم، واجهنا تأخير في موعد الانطلاق الصباحي وتم اختصار إحدى المحطات التراثية في الواحة.",
        time: "09:15 ص",
      },
      {
        id: "m-2",
        sender: "guide",
        senderName: "خالد الحربي (المرشد السياحي)",
        text: "أهلاً أخي العزيز، التأخير كان بسبب إغلاق أمني مؤقت للطريق الجبلي وتم تعويض المحطة بزيارة دار التراث الشعبي المجاورة.",
        time: "09:22 ص",
      },
      {
        id: "m-3",
        sender: "admin",
        senderName: "إدارة الحوكمة والضمان",
        text: "مرحباً بكم. تم مراجعة تقرير مسار الرحلة ونظام الـ GPS، وجاري اعتماد تسوية توافقية ترضي الطرفين عبر حساب الضمان.",
        time: "09:30 ص",
      },
    ],
  },
  {
    id: "th-1",
    type: "guide",
    guideName: "عبد العزيز الشمري",
    guideCity: "العلا",
    tourTitle: "جولة مدائن صالح والبلدة القديمة",
    lastMessage: "سنوفر لكم الماء والمشروبات الباردة طوال الجولة.",
    unreadCount: 0,
    messages: [
      {
        id: "m-10",
        sender: "guide",
        senderName: "عبد العزيز الشمري",
        text: "أهلاً بك يا فهد! يسعدنا استضافتك في العلا. يرجى التواجد عند نقطة التجمع الساعة 8:00 صباحاً.",
        time: "10:30 ص",
      },
      {
        id: "m-11",
        sender: "client",
        senderName: "أنت (المسافر)",
        text: "أهلاً أخي عبد العزيز، هل يفضل ارتداء أحذية هايكنج مخصصة للجولة؟",
        time: "10:32 ص",
      },
      {
        id: "m-12",
        sender: "guide",
        senderName: "عبد العزيز الشمري",
        text: "نعم بالضبط، أحذية مريحة وقبعة شمسية. سنوفر لكم الماء والمشروبات الباردة طوال الجولة.",
        time: "10:35 ص",
      },
    ],
  },
];

export default function ClientMessagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("th-med");
  const [inputText, setInputText] = useState("");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "client",
      senderName: isAr ? "أنت (المسافر)" : "You (Client)",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString(isAr ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              lastMessage: newMsg.text,
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    setInputText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <span>{isAr ? "مركز المراسلات المباشرة وغرف الوساطة" : "Direct Messages & Mediation Rooms"}</span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-text-primary)" }}>
          {isAr ? "المراسلات والتواصل الفوري" : "Messages & Direct Support"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "13px", marginTop: "2px" }}>
          {isAr
            ? "تواصل مع مرشدك السياحي لتنسيق تفاصيل الجولة أو الانضمام لغرفة الوساطة الإدارية لحل أي استفسارات."
            : "Chat directly with your tour guide to coordinate tour logistics or join administrative mediation."}
        </p>
      </div>

      {/* Split View Console */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "16px",
          minHeight: "560px",
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        {/* Threads Sidebar */}
        <div style={{ borderInlineEnd: "1px solid var(--color-border)", background: "var(--color-bg-card)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px", borderBottom: "1px solid var(--color-border)", fontSize: "12px", fontWeight: 800, color: "var(--color-text-secondary)" }}>
            {isAr ? "المحادثات النشطة" : "Active Conversations"}
          </div>

          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            {threads.map((t) => {
              const isSelected = t.id === activeThreadId;
              const isMediation = t.type === "support_mediation";
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid var(--color-border)",
                    cursor: "pointer",
                    background: isSelected ? "var(--color-bg-secondary)" : "transparent",
                    borderInlineStart: isSelected ? "3px solid var(--color-gold-heading)" : "3px solid transparent",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "100px",
                        background: isMediation ? "rgba(200, 169, 110, 0.15)" : "rgba(16, 185, 129, 0.15)",
                        color: isMediation ? "var(--color-gold-heading)" : "#10B981",
                      }}
                    >
                      {isMediation ? (isAr ? "وساطة إدارية ثلاثية" : "Admin Mediation") : isAr ? "مرشد معتمد" : "Guide"}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{t.guideCity}</span>
                  </div>

                  <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                    {t.guideName}
                  </h4>

                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {t.lastMessage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Pane */}
        {activeThread && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 900, color: "var(--color-text-primary)" }}>{activeThread.tourTitle}</h3>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "2px" }}>{activeThread.guideName}</p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flexGrow: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", background: "var(--color-bg-card)" }}>
              {activeThread.messages.map((m) => {
                const isClient = m.sender === "client";
                const isSystem = m.sender === "system";
                const isAdmin = m.sender === "admin";

                if (isSystem) {
                  return (
                    <div key={m.id} style={{ alignSelf: "center", background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <ShieldIcon size={12} color="var(--color-gold-heading)" />
                      <span>{m.text}</span>
                    </div>
                  );
                }

                return (
                  <div key={m.id} style={{ display: "flex", flexDirection: "column", alignSelf: isClient ? "flex-end" : "flex-start", maxWidth: "75%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", justifyContent: isClient ? "flex-end" : "flex-start" }}>
                      <span style={{ fontSize: "10px", fontWeight: 800, padding: "1px 6px", borderRadius: "4px", background: isClient ? "var(--gradient-gold)" : isAdmin ? "rgba(200, 169, 110, 0.2)" : "rgba(16, 185, 129, 0.15)", color: isClient ? "#0f172a" : isAdmin ? "var(--color-gold-heading)" : "#10B981" }}>
                        {m.senderName}
                      </span>
                      <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>{m.time}</span>
                    </div>

                    <div style={{ padding: "10px 14px", borderRadius: "12px", background: isClient ? "var(--color-bg-secondary)" : "var(--color-bg-card)", border: "1px solid", borderColor: isClient ? "var(--color-gold-heading)" : "var(--color-border)", color: "var(--color-text-primary)", fontSize: "13px", lineHeight: 1.5 }}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} style={{ padding: "14px 20px", borderTop: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder={isAr ? "اكتب رسالتك للمرشد أو إدارة الوساطة..." : "Type your message..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
              <Button variant="primary" type="submit" disabled={!inputText.trim()} style={{ padding: "10px 18px", fontSize: "12px", fontWeight: 800 }}>
                {isAr ? "إرسال" : "Send"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
