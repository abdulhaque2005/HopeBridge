"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";
interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  raised: number;
  goal: number;
  verifiedBy?: string;
  urgent?: boolean;
}
export default function FeaturedPrograms() {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await fetch('/api/programs');
        if (response.ok) {
          const data = await response.json();
          setFeatured(data);
        }
      } catch (error) {
        console.error("Failed to fetch programs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };
  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[400px]">
           <div className="animate-pulse flex flex-col items-center gap-4 text-primary">
              <Activity className="w-12 h-12 animate-spin" />
              <span className="font-bold text-xl tracking-widest uppercase"><Translate>Syncing with Live Disaster DB...</Translate></span>
           </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium text-xs mb-6 border border-red-200 dark:border-red-800/50 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <Translate>LIVE: Government & NGO Verified Crises</Translate>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
              <Translate>Urgent</Translate> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500"><Translate>Missions</Translate></span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              <Translate>Real-time data fetched from official disaster relief APIs. Your contribution can make an immediate impact where it&apos;s needed most.</Translate>
            </p>
          </div>
          <Button variant="outline" size="lg" className="rounded-full shadow-sm hover:shadow-md transition-all h-14 px-8 text-base" render={<Link href="/programs" />}>
            {t("hero_secondary_cta")} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {featured.map((program) => {
            const progress = (program.raised / program.goal) * 100;
            return (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -16, scale: 1.03 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-emerald-500/50 rounded-[2.8rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Card className="relative overflow-hidden h-full flex flex-col border-border/50 bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
                      <Badge className="bg-white/95 text-black hover:bg-white backdrop-blur-md shadow-lg border-none px-4 py-1.5 font-bold text-xs uppercase tracking-wider">
                        <Translate>{program.category}</Translate>
                      </Badge>
                      {program.urgent && (
                        <Badge className="bg-red-500 animate-pulse text-white hover:bg-red-600 shadow-lg border-none px-3 py-1 font-bold">
                          <Translate>URGENT</Translate>
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <Translate>Verified by:</Translate> {program.verifiedBy && <Translate>{program.verifiedBy}</Translate>}
                    </div>
                  </div>
                  <CardHeader className="flex-1 px-8 pt-8 pb-4 relative">
                    <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-primary transition-colors leading-tight">
                      <Translate>{program.title}</Translate>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      <Translate>{program.description}</Translate>
                    </p>
                  </CardHeader>
                  <CardContent className="px-8 pb-6 space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-primary text-lg">₹{program.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground"><Translate>Goal</Translate>: ₹{program.goal.toLocaleString()}</span>
                      </div>
                      <div className="relative pt-1">
                        <Progress value={progress} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0">
                    <Button className="w-full rounded-full h-14 text-base font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all group-hover:-translate-y-1" render={<Link href={`/programs/${program.id}`} />}>
                      <Translate>Donate to this mission</Translate>
                      <ArrowRight className="ml-2 w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
