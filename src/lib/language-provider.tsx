"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { readonly children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("rafeeq_user_lang") as Language | null;
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("rafeeq_user_lang", newLang);
  };

  const toggleLanguage = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
