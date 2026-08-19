"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import {
  MessageSquareIcon,
  SendIcon,
  CompassIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@/components/icons";

interface MessageItem {
  id: string;
  sender: "client" | "guide";
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  guideName: string;
  guideCity: string;
  tourTitle: string;
  lastMessage: string;
  unreadCount: number;
  messages: MessageItem[];
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: "th-1",
    guideName: "عبد العزيز الشمري",
    guideCity: "العلا",
    tourTitle: "جولة مدائن صالح والبلدة القديمة",
    lastMessage: "أهلاً بك يا محمد! يسعدنا استضافتك في العلا...",
    unreadCount: 0,
    messages: [
      { id: "m-1", sender: "guide", text: "أهلاً بك يا محمد! يسعدنا استضافتك في العلا. يرجى التواجد عند نقطة التجمع الساعة 8:00 صباحاً.", time: "10:30 ص" },
      { id: "m-2", sender: "client", text: "أهلاً أخي عبد العزيز، هل يفضل ارتداء أحذية هايكنج مخصصة للجولة؟", time: "10:32 ص" },
      { id: "m-3", sender: "guide", text: "نعم بالضبط، أحذية مريحة وقبعة شمسية. سنوفر لكم الماء والمشروبات الباردة طوال الجولة ✦", time: "10:35 ص" },
    ],
  },
  {
    id: "th-2",
    guideName: "مريم الغامدي",
    guideCity: "جدة",
    tourTitle: "جولة حارة البلد التاريخية",
    lastMessage: "شكراً لك على تقييمك الرائع للجولة!",
    unreadCount: 0,
    messages: [
      { id: "m-4", sender: "guide", text: "شكراً لك على تقييمك الرائع للجولة! تشرفنا بخدمتكم ونتمنى لكم إقامة سعيدة بجدة.", time: "أمس 08:15 م" },
    ],
  },
];

export default function ClientMessagesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("th-1");
  const [inputText, setInputText] = useState("");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "client",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
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
    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, fontFamily: "var(--font-heading)" }}>
          مركز المراسلات المباشرة 💬
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-1)" }}>
          التواصل الآمن والمباشر مع المرشدين السياحيين قبل موعد الرحلة لمطابقة نقاط التجمع والترتيبات
        </p>
      </div>

      {/* Chat Container */}
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-2xl)",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          minHeight: "560px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* Threads List (Sidebar) */}
        <div style={{ borderInlineEnd: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-gold-heading)", textTransform: "uppercase" }}>
              محادثات الرحلات النشطة ({threads.length})
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", flexGrow: 1, padding: "8px" }}>
            {threads.map((t) => {
              const isActive = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: isActive ? "rgba(200, 169, 110, 0.12)" : "transparent",
                    border: isActive ? "1px solid var(--color-gold-heading)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 800, margin: 0, color: isActive ? "var(--color-gold-heading)" : "var(--color-text-primary)" }}>
                      {t.guideName}
                    </h4>
                    <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{t.guideCity}</span>
                  </div>

                  <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "4px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.lastMessage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Chat Conversation Window */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--color-bg-card)" }}>
          {/* Chat Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "var(--color-bg-secondary)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CompassIcon size={18} color="var(--color-gold-heading)" />
                <h3 style={{ fontSize: "15px", fontWeight: 900, margin: 0 }}>{activeThread.guideName}</h3>
                <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>
                  مرشد معتمد ✦
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block", marginTop: "2px" }}>
                {activeThread.tourTitle} ({activeThread.guideCity})
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--color-saudi-green)", fontWeight: 700 }}>
              <MapPinIcon size={14} />
              <span>موقع نقطة التجمع محدد</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", flexGrow: 1 }}>
            {activeThread.messages.map((msg) => {
              const isMe = msg.sender === "client";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 14px",
                      borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                      background: isMe
                        ? "linear-gradient(135deg, var(--color-gold-heading) 0%, var(--color-gold-dark) 100%)"
                        : "var(--color-bg-secondary)",
                      color: isMe ? "#0B132B" : "var(--color-text-primary)",
                      fontWeight: 600,
                      fontSize: "13px",
                      lineHeight: "1.5",
                      border: isMe ? "none" : "1px solid var(--color-border)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "4px", paddingInline: "4px" }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chat Input Footer */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "10px",
              background: "var(--color-bg-secondary)",
            }}
          >
            <input
              type="text"
              placeholder="اكتب رسالتك للمرشد السياحي..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <Button variant="primary" size="md" type="submit" disabled={!inputText.trim()}>
              <SendIcon size={16} />
              <span>إرسال</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
