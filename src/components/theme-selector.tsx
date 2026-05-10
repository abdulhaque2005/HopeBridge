"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Check, ChevronDown, Palette } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { motion, AnimatePresence } from "framer-motion";
const THEMES = [
  { id: "light", name: "Light Mode", description: "Clean & Bright" },
  { id: "dark", name: "Dark Mode", description: "Sleek & Deep" },
  { id: "natural", name: "Natural Earth", description: "Stone & Sand" },
  { id: "emerald", name: "Emerald Forest", description: "Natural & Calm" },
  { id: "ocean", name: "Ocean Breeze", description: "Fresh & Blue" },
  { id: "sunset", name: "Sunset Glow", description: "Warm & Vibrant" },
];

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "gap-2 px-3 rounded-full hover:bg-muted font-medium text-sm transition-all border border-transparent hover:border-border"
      )}>
        <Palette className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">
          {mounted ? t(currentTheme.name) : "..."}
        </span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2 rounded-[2rem] border-border/50 bg-background/80 backdrop-blur-2xl shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="p-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("Select Visual Style")}</p>
        </div>
        <DropdownMenuSeparator className="mx-2 opacity-50" />
        <div className="p-1 space-y-0.5">
          <AnimatePresence mode="popLayout">
            {THEMES.map((t_item, idx) => (
              <motion.div
                key={t_item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <DropdownMenuItem
                  onClick={() => setTheme(t_item.id)}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-all mb-0.5",
                    theme === t_item.id 
                      ? "bg-primary text-primary-foreground shadow-sm font-bold" 
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-xs">{t(t_item.name)}</span>
                    <span className={cn(
                      "text-[9px] uppercase tracking-wider opacity-70",
                      theme === t_item.id ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>{t(t_item.description)}</span>
                  </div>
                  {theme === t_item.id && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <DropdownMenuSeparator className="mx-2 opacity-50" />
        <div className="p-2 text-[9px] text-center text-muted-foreground font-medium italic">
          {t("More themes coming soon")}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
