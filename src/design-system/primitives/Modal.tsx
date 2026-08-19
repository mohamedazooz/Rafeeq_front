"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleUpVariants, fadeInVariants } from "../motion/variants";

export interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  readonly showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const getMaxWidthStyle = (): string => {
    switch (maxWidth) {
      case "sm": return "400px";
      case "lg": return "700px";
      case "xl": return "850px";
      case "2xl": return "1000px";
      case "full": return "95vw";
      case "md":
      default:
        return "550px";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(11, 19, 14, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            variants={scaleUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: getMaxWidthStyle(),
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border-strong)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5)",
              padding: "1.75rem",
              zIndex: 1,
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: description ? "0.25rem" : "1.25rem",
                }}
              >
                {title && (
                  <h3
                    style={{
                      fontSize: "var(--text-xl)",
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-text-muted)",
                      cursor: "pointer",
                      padding: "0.25rem",
                      fontSize: "1.25rem",
                      lineHeight: 1,
                      borderRadius: "var(--radius-md)",
                    }}
                    aria-label="إغلاق النافذة"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            {description && (
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                {description}
              </p>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
