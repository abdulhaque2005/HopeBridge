"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-provider";
import { dynamicTranslate } from "@/lib/i18n";

interface TranslateProps {
  children: string;
  fallback?: string;
}

export function Translate({ children, fallback }: TranslateProps) {
  const { language, t } = useLanguage();
  
  // Use a state initializer to avoid an extra render cycle
  const [translatedText, setTranslatedText] = useState<string>(() => {
    // This only runs on the first mount or if children change during render (if we used a key)
    return children;
  });
  
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // If language is English, just use the original children
    if (language === "en") {
      setTranslatedText(children);
      return;
    }

    const performTranslation = async () => {
      // Check for static translation first
      const staticTranslation = t(children, "");
      if (staticTranslation && staticTranslation !== children) {
        setTranslatedText(staticTranslation);
        return;
      }

      // If no static translation, try dynamic
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
