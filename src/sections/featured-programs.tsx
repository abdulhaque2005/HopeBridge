"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/data/programs";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

export default function FeaturedPrograms() {
  const { t } = useLanguage();
  const featured = programs.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
              <Translate>Featured</Translate> <span className="text-primary"><Translate>Programs</Translate></span>
            </h2>
            <p className="text-muted-foreground text-lg">
              <Translate>Explore our active campaigns and see where your contribution can make the most immediate impact.</Translate>
            </p>
          </div>
          <Button variant="outline" className="rounded-full" render={<Link href="/programs" />}>
            {t("hero_secondary_cta")} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((program, index) => {
            const progress = (program.raised / program.goal) * 100;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col border-border hover:shadow-xl transition-all duration-300 group rounded-[2.5rem]">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border-none shadow-sm">
                      <Translate>{program.category}</Translate>
                    </Badge>
                  </div>
                  <CardHeader className="flex-1 px-6 pt-6 pb-4">
                    <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                      <Translate>{program.title}</Translate>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      <Translate>{program.description}</Translate>
                    </p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-primary">₹{program.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground"><Translate>Goal</Translate>: ₹{program.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-primary/20" />
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button className="w-full rounded-full h-12" render={<Link href={`/programs/${program.id}`} />}>
                      <Translate>Support this cause</Translate>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
