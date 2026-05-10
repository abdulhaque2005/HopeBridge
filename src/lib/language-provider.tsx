"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LANGUAGES, DEFAULT_LANGUAGE, LanguageConfig } from "./languages";
import { COMMON_TRANSLATIONS } from "./i18n";
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  dir: "ltr" | "rtl";
  t: (key: string, fallback?: string) => string;
  currentLanguageConfig: LanguageConfig;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("app-language");
    if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (LANGUAGES.some(l => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);
  const setLanguage = (lang: string) => {
    if (LANGUAGES.some(l => l.code === lang)) {
      setLanguageState(lang);
      localStorage.setItem("app-language", lang);
    }
  };
  const currentLanguageConfig = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const dir = currentLanguageConfig.dir;
  const t = useCallback((key: string, fallback?: string) => {
    const translation = COMMON_TRANSLATIONS[language]?.[key] || 
                        COMMON_TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || 
                        fallback || 
                        key;
    return translation;
  }, [language]);
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    }
  }, [dir, language, mounted]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, currentLanguageConfig }}>
      <div dir={dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
