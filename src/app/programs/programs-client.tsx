"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Search, Filter } from "lucide-react";
import { programs, categories } from "@/data/programs";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";
export default function ProgramsPageClient() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = activeCategory === "All" || program.category === activeCategory;
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="min-h-screen bg-muted/20">
      {}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-24 relative overflow-hidden border-b">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6"
          >
            <Translate>Our</Translate> <span className="text-primary"><Translate>Programs</Translate></span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            <Translate>We operate across multiple sectors to provide holistic support. Every program is designed for sustainable, long-term impact.</Translate>
          </motion.p>
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-lg mx-auto group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder={t("Search programs...")}
              className="pl-14 h-14 rounded-full bg-background text-base shadow-sm border-transparent focus:border-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </div>
      {}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                  : "bg-background text-muted-foreground hover:bg-muted/80 border border-border/50"
              }`}
            >
              <Translate>{cat}</Translate>
            </button>
          ))}
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => {
            const progress = (program.raised / program.goal) * 100;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                layout
              >
                <Card className="overflow-hidden h-full flex flex-col border-border hover:shadow-2xl transition-all duration-500 group rounded-[2.5rem] bg-background">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Badge className="absolute top-5 left-5 bg-white/90 text-foreground hover:bg-white backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                      <Translate>{program.category}</Translate>
                    </Badge>
                    <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-[10px] font-bold uppercase tracking-widest bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                      {program.daysLeft} <Translate>days left</Translate>
                    </div>
                  </div>
                  <CardHeader className="flex-1 px-8 pt-8 pb-3">
                    <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors leading-tight">
                      <Translate>{program.title}</Translate>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      <Translate>{program.description}</Translate>
                    </p>
                  </CardHeader>
                  <CardContent className="px-8 pb-6 space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-primary">₹{program.raised.toLocaleString()}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          <Translate>Goal</Translate>: ₹{program.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2 bg-primary/10" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {program.donors} <Translate>donors contributed</Translate>
                    </div>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0 flex gap-4">
                    <Button className="flex-1 rounded-full h-12 shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all" render={<Link href={`/donate?program=${program.id}`} />}>
                      <Translate>Donate</Translate>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full h-12 border-primary/20 hover:bg-primary/5 active:scale-95 transition-all" render={<Link href={`/programs/${program.id}`} />}>
                        <Translate>Details</Translate> <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
        {filteredPrograms.length === 0 && (
          <div className="text-center py-20 bg-background rounded-[3rem] border border-dashed border-border mt-12">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h3 className="text-2xl font-bold text-foreground mb-2"><Translate>No programs found</Translate></h3>
            <p className="text-muted-foreground"><Translate>Try adjusting your search or filter criteria.</Translate></p>
          </div>
        )}
      </div>
    </div>
  );
}
