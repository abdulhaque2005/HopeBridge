"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Users, ArrowRight, Sparkles } from "lucide-react";
import { Translate } from "@/components/translate";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-primary via-emerald-600 to-teal-600 rounded-[2.5rem] p-10 sm:p-12 md:p-16 lg:p-20 text-center text-white relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-2xl" />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <Translate>Be Part of the Change</Translate>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              <Translate>Together, We Can Build a</Translate>{" "}
              <span className="underline decoration-white/30 decoration-wavy underline-offset-8">
                <Translate>Better Tomorrow</Translate>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              <Translate>
                Every donation, every volunteer hour, and every shared story
                brings us closer to a world where no child goes hungry and every
                community thrives.
              </Translate>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-base bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 group font-bold"
                render={<Link href="/donate" />}
              >
                <Heart className="mr-2 w-5 h-5 group-hover:animate-heartbeat" />
                <Translate>Donate Now</Translate>
                <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-10 text-base border-white/30 text-white hover:bg-white/15 backdrop-blur-sm hover:scale-[1.02] transition-all active:scale-95 font-bold"
                render={<Link href="/contact" />}
              >
                <Users className="mr-2 w-5 h-5" />
                <Translate>Become a Volunteer</Translate>
              </Button>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-white/50 font-medium pt-2">
              <Translate>Join 12,000+ donors who trust HopeBridge with their generosity</Translate>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
