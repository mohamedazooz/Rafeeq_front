"use client";

import { useState, FormEvent } from "react";
import { SupportService } from "../services/support.service";

export function useContactForm() {
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactInfo || !message) return;

    setIsLoading(true);
    setStatusMsg("");

    try {
      const res = await SupportService.submitContactMessage({
        fullName,
        contactInfo,
        message,
      });

      setIsLoading(false);
      setIsSuccess(res.success);
      setStatusMsg(res.message);

      if (res.success) {
        setFullName("");
        setContactInfo("");
        setMessage("");
      }
    } catch {
      setIsLoading(false);
      setIsSuccess(false);
      setStatusMsg("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.");
    }
  };

  return {
    fullName,
    setFullName,
    contactInfo,
    setContactInfo,
    message,
    setMessage,
    isLoading,
    statusMsg,
    isSuccess,
    handleSubmit,
  };
}
