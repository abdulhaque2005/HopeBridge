"use client";
import { useEffect, useState, ReactNode } from "react";
import { useLanguage } from "@/lib/language-provider";
import { dynamicTranslate } from "@/lib/i18n";
interface TranslateProps {
  children: string;
  fallback?: string;
}
export function Translate({ children, fallback }: TranslateProps) {
  const { language, t } = useLanguage();
  const initialTranslation = t(children, "");
  const [translatedText, setTranslatedText] = useState<string>(
    initialTranslation && initialTranslation !== children ? initialTranslation : children
  );
  const [isTranslating, setIsTranslating] = useState(false);
  useEffect(() => {
    if (language === "en") {
      setTranslatedText(children);
      return;
    }
    const performTranslation = async () => {
      const staticTranslation = t(children, "");
      if (staticTranslation && staticTranslation !== children) {
        setTranslatedText(staticTranslation);
        return;
      }
      setIsTranslating(true);
      try {
        const result = await dynamicTranslate(children, language);
        setTranslatedText(result);
      } catch (error) {
        console.error("AI Translation failed:", error);
        setTranslatedText(fallback || children);
      } finally {
        setIsTranslating(false);
      }
    };
    performTranslation();
  }, [children, language, t, fallback]);
  return (
    <span className={isTranslating ? "opacity-70 animate-pulse" : "transition-opacity duration-300"}>
      {translatedText}
    </span>
  );
}
