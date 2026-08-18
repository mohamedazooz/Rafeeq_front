"use client";

import { useEffect, ReactNode } from "react";
import { IconButton } from "./IconButton";
import { XCircleIcon } from "@/components/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = "560px",
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="rafeeq-modal-overlay" onClick={onClose}>
      <div
        className="rafeeq-modal-content"
        style={{ width: "100%", maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "var(--color-gold-heading)",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              {subtitle && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            <IconButton
              variant="ghost"
              size="sm"
              title="إغلاق"
              icon={<XCircleIcon size={20} />}
              onClick={onClose}
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
