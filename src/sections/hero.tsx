"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full mix-blend-multiply opacity-50 dark:opacity-20 animate-blob" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400/20 blur-[120px] rounded-full mix-blend-multiply opacity-50 dark:opacity-20 animate-blob animation-delay-2000" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <Translate>Join our mission to save lives</Translate>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground font-heading leading-[1.1] mb-6">
              <Translate>Give</Translate> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"><Translate>Hope</Translate></span>. <br />
              <Translate>Change a Life.</Translate>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              <Translate>hero_subtitle</Translate>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-xl hover:shadow-primary/25 transition-all" render={<Link href="/donate" />}>
                {t("nav_donate")} <HeartPulse className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-background/50 backdrop-blur-md" render={<Link href="/programs" />}>
                {t("hero_secondary_cta")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Donor" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p><Translate>Joined by</Translate> <span className="text-foreground font-semibold">12,000+</span> <Translate>donors</Translate></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Hero Image / Illustration Placeholder */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Children smiling" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              
              {/* Floating Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <HeartPulse className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-90"><Translate>Total Impact</Translate></p>
                    <p className="text-xl font-bold">$2.4M+ <Translate>Raised</Translate></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
