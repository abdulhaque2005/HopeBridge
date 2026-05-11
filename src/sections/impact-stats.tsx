"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Translate } from "@/components/translate";
import { Heart, BookOpen, Stethoscope, Users } from "lucide-react";

const stats = [
  { label: "Meals Served", value: 12000, suffix: "+", icon: Heart, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-500/10", textColor: "text-emerald-500" },
  { label: "Children Educated", value: 3200, suffix: "+", icon: BookOpen, color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-500/10", textColor: "text-blue-500" },
  { label: "Patients Treated", value: 15000, suffix: "+", icon: Stethoscope, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-500/10", textColor: "text-amber-500" },
  { label: "Active Volunteers", value: 850, suffix: "+", icon: Users, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10", textColor: "text-purple-500" },
];

function Counter({ from, to, duration = 2.5 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <Translate>Our Impact in</Translate>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
              <Translate>Numbers</Translate>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            <Translate>Every number represents a life touched, a family fed, and a future changed.</Translate>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-background border border-border rounded-[2rem] p-6 md:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                <div className={`${stat.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                </div>
                <h3 className={`text-4xl md:text-5xl font-bold font-heading mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <Counter from={0} to={stat.value} />
                  {stat.suffix}
                </h3>
                <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
                  <Translate>{stat.label}</Translate>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
