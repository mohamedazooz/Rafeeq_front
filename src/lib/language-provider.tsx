"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getDictionary, Language, TranslationDictionary } from "./i18n";

interface LanguageContextType {
  lang: Language;
  isAr: boolean;
  dir: "rtl" | "ltr";
  t: TranslationDictionary;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  isAr: true,
  dir: "rtl",
  t: getDictionary("ar"),
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
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("rafeeq_user_lang", newLang);
  };

  const toggleLanguage = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
  };

  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const t = useMemo(() => getDictionary(lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, isAr, dir, t, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const useTranslation = () => {
  const { t, lang, isAr, dir } = useContext(LanguageContext);
  return { t, lang, isAr, dir };
};
