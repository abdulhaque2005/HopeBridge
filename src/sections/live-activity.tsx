"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, TrendingUp, HandHeart } from "lucide-react";
import { Translate } from "@/components/translate";

const INITIAL_DONATIONS = [
  { id: 1, name: "Arjun K.", amount: 5000, time: "2 minutes ago", program: "Education Support" },
  { id: 2, name: "Anonymous", amount: 1500, time: "5 minutes ago", program: "Emergency Medical Aid" },
  { id: 3, name: "Sarah M.", amount: 10000, time: "12 minutes ago", program: "Women Empowerment" },
];

const NEW_DONATIONS = [
  { name: "Rahul S.", amount: 2500, program: "Rural Food Distribution" },
  { name: "Priya D.", amount: 1000, program: "Child Healthcare" },
  { name: "Anonymous", amount: 50000, program: "Flood Relief" },
  { name: "Neha W.", amount: 3000, program: "Education Support" },
];

export default function LiveActivity() {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < NEW_DONATIONS.length) {
        setDonations(prev => [
          {
            id: Date.now(),
            ...NEW_DONATIONS[count],
            time: "Just now"
          },
          ...prev.slice(0, 4) // keep max 5
        ]);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 15000); // Add a new donation every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <Translate>Live Community Activity</Translate>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
              <Translate>Real-time Impact from</Translate> <span className="text-primary"><Translate>Real People</Translate></span>
            </h2>
            <p className="text-lg text-muted-foreground">
              <Translate>Every second, someone is making a difference. Join our growing community of changemakers and watch your impact unfold.</Translate>
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-heading">₹18L+</span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider"><Translate>Raised Today</Translate></span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-heading">450+</span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider"><Translate>Donors Today</Translate></span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-background border border-border shadow-xl rounded-3xl p-6 h-[400px] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10"></div>
              
              <div className="space-y-4 pt-4">
                <AnimatePresence initial={false}>
                  {donations.map((donation) => (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="bg-muted/40 p-4 rounded-2xl flex items-center justify-between border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                          <HandHeart className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm sm:text-base">
                            <Translate>{donation.name}</Translate> <Translate>donated</Translate> <span className="text-primary">₹{donation.amount.toLocaleString()}</span>
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <TrendingUp className="w-3 h-3" />
                            <Translate>{donation.program}</Translate> • <Translate>{donation.time}</Translate>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
