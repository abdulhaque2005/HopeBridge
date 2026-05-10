"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, Palette } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-provider";
import { LanguageSelector } from "./language-selector";
import { ThemeSelector } from "./theme-selector";
const NAV_LINKS = [
  { name: "nav_home", href: "/" },
  { name: "nav_programs", href: "/programs" },
  { name: "nav_about", href: "/about" },
  { name: "nav_contact", href: "/contact" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border shadow-sm py-2"
          : "bg-background/0 border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                HopeBridge
              </span>
            </Link>
          </div>
          {}
          <nav className="hidden lg:flex items-center space-x-1 bg-muted/30 p-1 rounded-full border border-border/40">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-all px-5 py-2 rounded-full relative overflow-hidden group",
                  pathname === link.href
                    ? "text-primary bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(link.name)}
                {pathname !== link.href && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <ThemeSelector />
            <LanguageSelector />
            <div className="w-px h-6 bg-border mx-2" />
            <Button className="rounded-full px-7 h-10 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95" render={<Link href="/donate" />}>
              {t("nav_donate")}
            </Button>
          </div>
          {}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full hover:bg-muted"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-2xl text-base font-semibold transition-all",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {t(link.name)}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <Button className="w-full rounded-2xl h-14 text-lg" render={<Link href="/donate" onClick={() => setIsOpen(false)} />}>
                  {t("nav_donate")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
