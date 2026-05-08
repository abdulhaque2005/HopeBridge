"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Translate } from "@/components/translate";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Monthly Donor",
    avatar: "https://i.pravatar.cc/120?img=1",
    rating: 5,
    text: "HopeBridge is the most transparent charity I've ever worked with. I can see exactly where my money goes every month. The impact reports they send are incredible and heartwarming.",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Volunteer Coordinator",
    avatar: "https://i.pravatar.cc/120?img=3",
    rating: 5,
    text: "Being a volunteer with HopeBridge has changed my life. Seeing the smiles on children's faces when they receive school supplies is priceless. This organization truly walks the talk.",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Corporate Sponsor",
    avatar: "https://i.pravatar.cc/120?img=5",
    rating: 5,
    text: "Our company partners with HopeBridge because of their exceptional governance and measurable impact. They deliver results consistently and their team is incredibly professional.",
  },
  {
    id: 4,
    name: "David Okonkwo",
    role: "Community Leader",
    avatar: "https://i.pravatar.cc/120?img=7",
    rating: 5,
    text: "HopeBridge came to our village and built a well that now serves over 300 families. They didn't just build and leave — they trained us to maintain it. True partnership.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <Translate>What Our</Translate> <span className="text-primary"><Translate>Community</Translate></span> <Translate>Says</Translate>
          </h2>
          <p className="text-muted-foreground text-lg">
            <Translate>Hear from the donors, volunteers, and communities who make our mission possible.</Translate>
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-border bg-background/50 backdrop-blur-sm rounded-[2rem] shadow-lg">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                    &ldquo;<Translate>{testimonials[current].text}</Translate>&rdquo;
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-foreground"><Translate>{testimonials[current].name}</Translate></h4>
                      <p className="text-sm text-primary font-medium"><Translate>{testimonials[current].role}</Translate></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-primary w-8" : "bg-primary/20"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={next}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
