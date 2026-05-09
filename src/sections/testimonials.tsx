"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Translate } from "@/components/translate";

const testimonials = [
  {
    id: 1,
    name: "Fatima Bibi",
    role: "Beneficiary Mother",
    location: "Bihar, India",
    avatar: "https://i.pravatar.cc/120?img=49",
    rating: 5,
    text: "This organization helped my children continue their education during difficult times. When we had nothing, HopeBridge gave us hope and a future.",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Monthly Donor",
    location: "Delhi, India",
    avatar: "https://i.pravatar.cc/120?img=3",
    rating: 5,
    text: "I donated once, but seeing the real impact made me continue supporting every month. The detailed impact reports they send are incredible — I know exactly where my ₹2000 goes.",
  },
  {
    id: 3,
    name: "Sarah Ahmed",
    role: "International Donor",
    location: "Dubai, UAE",
    avatar: "https://i.pravatar.cc/120?img=5",
    rating: 5,
    text: "The transparency and updates gave me confidence that my money truly helped families. I've donated to many charities, but HopeBridge is the only one that makes me feel genuinely connected to the impact.",
  },
  {
    id: 4,
    name: "Dr. Priya Menon",
    role: "Volunteer Doctor",
    location: "Kochi, India",
    avatar: "https://i.pravatar.cc/120?img=44",
    rating: 5,
    text: "Volunteering at a HopeBridge medical camp changed my perspective. Treating 200 patients in a single day in a remote village — that's the kind of impact that keeps you going. Their logistics and coordination are world-class.",
  },
  {
    id: 5,
    name: "David Okonkwo",
    role: "Community Leader",
    location: "Lagos, Nigeria",
    avatar: "https://i.pravatar.cc/120?img=7",
    rating: 5,
    text: "HopeBridge came to our community and built a water well that now serves over 300 families. They didn't just build and leave — they trained us to maintain it. That's real partnership.",
  },
  {
    id: 6,
    name: "Rajesh Kumar",
    role: "Volunteer Coordinator",
    location: "Mumbai, India",
    avatar: "https://i.pravatar.cc/120?img=11",
    rating: 5,
    text: "Being a volunteer with HopeBridge has changed my life. Seeing the smiles on children's faces when they receive school supplies is priceless. This organization truly walks the talk.",
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

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-heading mb-4"
          >
            <Translate>What Our</Translate>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
              <Translate>Community</Translate>
            </span>{" "}
            <Translate>Says</Translate>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            <Translate>
              Hear from the donors, volunteers, and communities who make our mission possible.
            </Translate>
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-background border border-border rounded-[2.5rem] shadow-2xl shadow-primary/5 p-8 sm:p-10 md:p-14 text-center relative overflow-hidden">
                {/* Quote icon background */}
                <div className="absolute top-6 right-8 opacity-5">
                  <Quote className="w-32 h-32 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-6 gap-1">
                  {Array.from({
                    length: testimonials[current].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed mb-10 italic font-medium max-w-3xl mx-auto">
                  &ldquo;
                  <Translate>{testimonials[current].text}</Translate>
                  &rdquo;
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-16 h-16 rounded-full object-cover border-[3px] border-primary/20 shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-foreground text-lg">
                      <Translate>{testimonials[current].name}</Translate>
                    </h4>
                    <p className="text-sm text-primary font-semibold">
                      <Translate>{testimonials[current].role}</Translate>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      <Translate>{testimonials[current].location}</Translate>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-90"
              onClick={prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-10"
                      : "bg-primary/20 w-2.5 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-90"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
