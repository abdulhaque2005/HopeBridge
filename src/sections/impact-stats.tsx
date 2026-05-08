"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Translate } from "@/components/translate";

const stats = [
  { label: "Meals Served", value: 12000, suffix: "+", color: "text-emerald-500" },
  { label: "Children Educated", value: 2500, suffix: "+", color: "text-blue-500" },
  { label: "Active Volunteers", value: 850, suffix: "+", color: "text-amber-500" },
  { label: "Communities Reached", value: 45, suffix: "", color: "text-purple-500" },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutExpo
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOutExpo * (to - from) + from));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export default function ImpactStats() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <h3 className={`text-4xl md:text-5xl font-bold font-heading ${stat.color}`}>
                <Counter from={0} to={stat.value} />
                {stat.suffix}
              </h3>
              <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                <Translate>{stat.label}</Translate>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
