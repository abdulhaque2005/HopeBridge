"use client";

import { motion } from "framer-motion";
import { Program } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Heart, Share2, Users, Calendar, Target, CheckCircle2, MapPin, TrendingUp, HandHeart } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

export default function ProgramDetailClient({ program }: { program: Program }) {
  const { t } = useLanguage();
  const progress = (program.raised / program.goal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full">
        <img
          src={program.image}
          alt={program.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 text-white"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary hover:bg-primary text-white border-none px-3 py-1 text-sm rounded-full">
                  <Translate>{program.category}</Translate>
                </Badge>
                {program.location && (
                  <span className="flex items-center text-sm font-medium bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <Translate>{program.location}</Translate>
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading max-w-3xl leading-tight">
                <Translate>{program.title}</Translate>
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                <Translate>About the Campaign</Translate>
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/20 p-8 rounded-[2.5rem] border border-border/50">
                <Translate>{program.longDescription}</Translate>
              </div>
            </motion.div>

            {program.impactStatistics && program.impactStatistics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                {program.impactStatistics.map((stat, idx) => (
                  <div key={idx} className="bg-muted/30 p-6 rounded-2xl border border-border text-center flex flex-col items-center justify-center group hover:border-primary/50 transition-colors">
                    <TrendingUp className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-3xl font-bold font-heading text-foreground mb-1">
                      <Translate>{stat.value}</Translate>
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <Translate>{stat.label}</Translate>
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {program.beneficiaryImages && program.beneficiaryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="grid grid-cols-2 gap-4"
              >
                {program.beneficiaryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden shadow-sm group">
                    <img src={img} alt="Beneficiary" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </motion.div>
            )}

            {program.volunteerSupportDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.19 }}
                className="bg-primary/5 dark:bg-primary/10 p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                  <div className="bg-primary text-primary-foreground p-4 rounded-2xl shrink-0 shadow-lg shadow-primary/20">
                    <HandHeart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground mb-2"><Translate>Volunteer With Us</Translate></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                      <Translate>{program.volunteerSupportDetails}</Translate>
                    </p>
                    <Button variant="outline" className="rounded-full h-12 px-8 border-primary/20 hover:bg-primary/5" render={<Link href="/contact" />}>
                      <Translate>Join as Volunteer</Translate>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                <Translate>Frequently Asked Questions</Translate>
              </h2>
              <Accordion className="w-full space-y-4">
                {program.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-muted/10 hover:bg-muted/20 transition-colors">
                    <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:no-underline">
                      <Translate>{faq.question}</Translate>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      <Translate>{faq.answer}</Translate>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          {/* Sticky Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div className="bg-background/95 backdrop-blur-xl rounded-[2.5rem] p-8 border-2 border-emerald-500/20 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{program.raised.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                      <Translate>raised of</Translate> ₹{program.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 bg-emerald-500/10" indicatorClassName="bg-emerald-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{program.donors}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold"><Translate>Donors</Translate></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">{program.daysLeft}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold"><Translate>Days Left</Translate></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full rounded-full h-16 text-xl font-black bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] animate-gradient text-white shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.8)] hover:-translate-y-1 transition-all duration-300 group" render={<Link href={`/donate?program=${program.id}`} />}>
                    <Translate>Donate Now</Translate>
                    <Heart className="ml-2 w-6 h-6 fill-white group-hover:scale-110 transition-transform group-hover:animate-heartbeat" />
                  </Button>
                  <Button variant="outline" size="lg" className="w-full rounded-full h-14 hover:bg-emerald-50 dark:hover:bg-emerald-950 font-bold text-sm uppercase tracking-widest border-border/50 hover:border-emerald-500/30 hover:text-emerald-600 transition-colors">
                    <Share2 className="mr-2 w-5 h-5" /> <Translate>Share Campaign</Translate>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-[2.5rem] p-8 border border-border/50">
              <h3 className="font-bold flex items-center gap-2 mb-6 text-foreground/80 text-sm uppercase tracking-widest">
                <Target className="w-5 h-5 text-primary" />
                <Translate>Impact Guarantee</Translate>
              </h3>
              <ul className="space-y-4">
                {[
                  "100% goes directly to the field",
                  "Secure & encrypted transactions",
                  "Receive detailed impact updates"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium"><Translate>{item}</Translate></span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
