"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse, Sparkles, Shield, Users, Globe, Heart } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

const TRUST_BADGES = [
  { icon: Shield, label: "100% Transparent" },
  { icon: Users, label: "12,000+ Donors" },
  { icon: Globe, label: "5 Countries" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-zinc-900 pt-16">
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((src, index) => (
          <motion.div
            key={src}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.1,
              zIndex: currentImageIndex === index ? 10 : 0
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeOut" }
            }}
          >
            <img
              src={src}
              alt="People receiving help and support"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/10 z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20" />
      </div>

      <motion.div
        initial={{ x: 20, y: 0, opacity: 0 }}
        animate={{ x: 0, y: [0, 5, 0], opacity: 1 }}
        transition={{ 
          y: { duration: 5, ease: "easeInOut", repeat: Infinity, delay: 2 },
          opacity: { delay: 1.3, duration: 0.5 },
          x: { delay: 1.3, duration: 0.5 }
        }}
        className="absolute top-28 right-6 z-30 glass p-3 rounded-xl text-white hidden md:block border border-white/10"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold"><Translate>Just now</Translate>: ₹5,000 <Translate>donated</Translate></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: [0, -8, 0], opacity: 1 }}
        transition={{ 
          y: { duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1.5 },
          opacity: { delay: 1, duration: 0.6 } 
         }}
        className="absolute bottom-12 right-6 z-30 glass p-6 rounded-2xl text-white hidden lg:block border border-white/10"
      >
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <HeartPulse className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">
                <Translate>Total Impact</Translate>
              </p>
              <p className="text-3xl font-bold mt-1">
                ₹40L+ <span className="text-base font-medium opacity-80"><Translate>Raised</Translate></span>
              </p>
            </div>
          </div>
          <div className="text-right border-l border-white/20 pl-8">
            <p className="text-3xl font-bold">4,121</p>
            <p className="text-sm opacity-80 uppercase tracking-wider mt-1"><Translate>Lives Changed</Translate></p>
          </div>
        </div>
      </motion.div>

      <div className="container relative z-30 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-white font-medium text-sm mb-8 border border-primary/40 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Translate>Join our mission to save lives</Translate>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-white font-heading leading-[1.1] mb-6 drop-shadow-xl">
            <Translate>Your Small</Translate>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-400 animate-gradient drop-shadow-sm">
              <Translate>Help</Translate>
            </span>
            <br />
            <Translate>Can Change a</Translate>
            <br />
            <span className="relative">
              <Translate>Child&apos;s Future</Translate>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-2 left-0 w-full h-3 text-primary/70"
                viewBox="0 0 300 12"
                fill="none"
              >
                <motion.path
                  d="M2 8 C60 2, 120 12, 180 6 S260 2, 298 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-medium"
          >
            <Translate>Together we can fight hunger, poverty, and injustice. Every donation creates hope for families who need it most.</Translate>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button
              size="lg"
              className="rounded-full h-16 px-12 text-xl font-black bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] animate-gradient text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.8)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,1)] hover:scale-[1.05] transition-all duration-300 active:scale-95 group relative overflow-hidden border border-emerald-400/50"
              render={<Link href="/donate" />}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                <Translate>DONATE NOW</Translate>
                <Heart className="w-7 h-7 fill-white group-hover:animate-heartbeat" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 px-10 text-lg bg-black/30 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white hover:scale-[1.02] transition-all active:scale-95"
              render={<Link href="/programs" />}
            >
              {t("hero_secondary_cta")}
              <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[12, 15, 18, 22, 25].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden shadow-xl"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i}`}
                      alt="Donor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-xl">
                  +9K
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-sm font-medium text-white/95 shadow-lg"
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <Translate>{badge.label}</Translate>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 glass p-5 rounded-2xl text-white lg:hidden border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-primary flex shrink-0 items-center justify-center shadow-lg shadow-primary/30">
                <HeartPulse className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wider">
                  <Translate>Total Impact</Translate>
                </p>
                <p className="text-2xl font-bold">
                  ₹40L+ <span className="text-sm font-medium opacity-80"><Translate>Raised</Translate></span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto sm:text-right sm:border-l sm:border-white/20 sm:pl-6 pt-4 sm:pt-0 border-t border-white/20 sm:border-t-0">
              <p className="text-xs opacity-80 uppercase tracking-wider sm:hidden"><Translate>Lives Changed</Translate></p>
              <div className="text-right">
                <p className="text-2xl font-bold">4,121</p>
                <p className="text-xs opacity-80 uppercase tracking-wider hidden sm:block"><Translate>Lives Changed</Translate></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}