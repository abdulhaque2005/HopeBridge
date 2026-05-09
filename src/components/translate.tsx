"use client";

import { useEffect, useState, ReactNode } from "react";
import { useLanguage } from "@/lib/language-provider";
import { dynamicTranslate } from "@/lib/i18n";

interface TranslateProps {
  children: string;
  fallback?: string;
}

/**
 * Intelligent Translation Component
 * Uses pre-defined dictionary for speed, fallbacks to real-time API.
 */
export function Translate({ children, fallback }: TranslateProps) {
  const { language, t } = useLanguage();
  
  // Try to get static translation instantly during render to avoid flicker
  const initialTranslation = t(children, "");
  const [translatedText, setTranslatedText] = useState<string>(
    initialTranslation && initialTranslation !== children ? initialTranslation : children
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // If the language is English, just use children
    if (language === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslatedText(children);
      return;
    }

    const performTranslation = async () => {
      // 1. Check static dictionary (redundant but safe if dictionary updates)
      const staticTranslation = t(children, "");
      if (staticTranslation && staticTranslation !== children) {
        setTranslatedText(staticTranslation);
        return;
      }

      // 2. Real-time API Translation
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
