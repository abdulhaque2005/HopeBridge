"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse, Sparkles, Shield, Users, Globe } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

const TRUST_BADGES = [
  { icon: Shield, label: "100% Transparent" },
  { icon: Users, label: "12,000+ Donors" },
  { icon: Globe, label: "5 Countries" },
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background pt-16">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full mix-blend-multiply opacity-60 dark:opacity-20 animate-blob" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-400/15 blur-[150px] rounded-full mix-blend-multiply opacity-60 dark:opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-400/10 blur-[120px] rounded-full mix-blend-multiply opacity-40 dark:opacity-10 animate-blob animation-delay-4000" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.03]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Translate>Join our mission to save lives</Translate>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground font-heading leading-[1.05] mb-6">
              <Translate>Your Small</Translate>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500 animate-gradient">
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
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <motion.path
                    d="M2 8 C60 2, 120 12, 180 6 S260 2, 298 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </motion.svg>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              <Translate>Together we can fight hunger, poverty, and injustice. Every donation creates hope for families who need it most.</Translate>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95 group"
                render={<Link href="/donate" />}
              >
                <Translate>Donate Now</Translate>
                <HeartPulse className="ml-2 w-5 h-5 group-hover:animate-heartbeat" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-10 text-base bg-background/50 backdrop-blur-md border-border/50 hover:bg-muted/50 hover:scale-[1.02] transition-all active:scale-95"
                render={<Link href="/programs" />}
              >
                {t("hero_secondary_cta")}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Donor Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[12, 15, 18, 22, 25].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-[3px] border-background bg-muted flex items-center justify-center overflow-hidden shadow-sm"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i}`}
                        alt="Donor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-[3px] border-background bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
                    +9K
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs font-medium text-muted-foreground"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-primary" />
                    <Translate>{badge.label}</Translate>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[640px] flex items-center justify-center"
          >
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Children smiling with hope"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />

              {/* Floating Impact Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 glass p-5 rounded-2xl text-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                      <HeartPulse className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">
                        <Translate>Total Impact</Translate>
                      </p>
                      <p className="text-2xl font-bold">
                        ₹40L+ <span className="text-sm font-medium opacity-80"><Translate>Raised</Translate></span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-2xl font-bold">4,121</p>
                    <p className="text-sm opacity-80"><Translate>Lives Changed</Translate></p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card - Top Right */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute top-6 right-6 glass p-3 rounded-xl text-white animate-float-slow hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold"><Translate>Just now</Translate>: ₹5,000 <Translate>donated</Translate></span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
