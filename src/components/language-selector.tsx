"use client";
import * as React from "react";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-provider";
import { LANGUAGES } from "@/lib/languages";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
export function LanguageSelector() {
  const { language, setLanguage, currentLanguageConfig, t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredLanguages = LANGUAGES.filter(
    (l) => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "gap-2 px-3 rounded-full hover:bg-muted font-medium text-sm transition-all border border-transparent hover:border-border"
      )}>
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{currentLanguageConfig?.nativeName || "Language"}</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2 rounded-[2rem] border-border/50 bg-background/80 backdrop-blur-2xl shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="p-1.5 space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("Select Language")}</p>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{LANGUAGES.length}</span>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder={t("Search languages...")}
              className="pl-8 h-8 bg-muted/50 border-transparent focus:border-primary/30 rounded-lg text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <DropdownMenuSeparator className="mx-2 opacity-50" />
        <div className="max-h-[250px] overflow-y-auto px-1 py-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((l) => (
                <motion.div
                  key={l.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem
                    onClick={() => setLanguage(l.code)}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-all mb-0.5",
                      language === l.code 
                        ? "bg-primary text-primary-foreground shadow-sm font-bold" 
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs">{l.nativeName}</span>
                      <span className={cn(
                        "text-[9px] uppercase tracking-wider opacity-70",
                        language === l.code ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>{l.name}</span>
                    </div>
                    {language === l.code && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </DropdownMenuItem>
                </motion.div>
              ))
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                <p className="text-xs font-medium">{t("No languages found")}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        <DropdownMenuSeparator className="mx-2 opacity-50" />
        <div className="p-2 text-[9px] text-center text-muted-foreground font-medium flex items-center justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          {t("Global Multi-Language Supported")}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
