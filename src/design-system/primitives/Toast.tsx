"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUpVariants } from "../motion/variants";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  readonly id: string;
  readonly type: ToastType;
  readonly message: string;
  readonly durationMs?: number;
}

interface ToastContextValue {
  readonly showToast: (message: string, type?: ToastType, durationMs?: number) => void;
  readonly success: (message: string) => void;
  readonly error: (message: string) => void;
  readonly warning: (message: string) => void;
  readonly info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<readonly ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", durationMs = 4000) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: ToastMessage = { id, type, message, durationMs };
      setToasts((prev) => [...prev, newToast]);

      if (durationMs > 0) {
        setTimeout(() => removeToast(id), durationMs);
      }
    },
    [removeToast]
  );

  const success = useCallback((msg: string) => showToast(msg, "success"), [showToast]);
  const error = useCallback((msg: string) => showToast(msg, "error"), [showToast]);
  const warning = useCallback((msg: string) => showToast(msg, "warning"), [showToast]);
  const info = useCallback((msg: string) => showToast(msg, "info"), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          pointerEvents: "none",
          width: "90%",
          maxWidth: "450px",
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const getColors = () => {
              switch (toast.type) {
                case "success":
                  return { bg: "rgba(0, 108, 53, 0.95)", border: "rgba(0, 108, 53, 0.3)", icon: "✓" };
                case "error":
                  return { bg: "rgba(220, 53, 69, 0.95)", border: "rgba(220, 53, 69, 0.3)", icon: "✕" };
                case "warning":
                  return { bg: "rgba(217, 119, 6, 0.95)", border: "rgba(217, 119, 6, 0.3)", icon: "⚠" };
                case "info":
                default:
                  return { bg: "rgba(13, 27, 42, 0.95)", border: "rgba(200, 169, 110, 0.4)", icon: "ℹ" };
              }
            };

            const colors = getColors();

            return (
              <motion.div
                key={toast.id}
                variants={slideUpVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  pointerEvents: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.85rem 1.25rem",
                  background: colors.bg,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "var(--radius-xl)",
                  color: "#ffffff",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    {colors.icon}
                  </span>
                  <span>{toast.message}</span>
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                    padding: "0.2rem",
                    fontSize: "1rem",
                  }}
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
