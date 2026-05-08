"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Users } from "lucide-react";
import { Translate } from "@/components/translate";

export default function CTASection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
              <Translate>Together, We Can Build a Better Tomorrow</Translate>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              <Translate>Every donation, every volunteer hour, and every shared story brings us closer to a world where no child goes hungry and every community thrives.</Translate>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-xl" render={<Link href="/donate" />}>
                  <Heart className="mr-2 w-5 h-5" /> <Translate>Donate Now</Translate>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" render={<Link href="/contact" />}>
                  <Users className="mr-2 w-5 h-5" /> <Translate>Become a Volunteer</Translate>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
