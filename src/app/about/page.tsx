"use client";

import { motion } from "framer-motion";
import ImpactChart from "./impact-chart";
import { CheckCircle2, Users, Target, ShieldCheck } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

const team = [
  { name: "Dr. Elena Rostova", role: "Executive Director", image: "https://i.pravatar.cc/150?img=44" },
  { name: "Marcus Chen", role: "Head of Operations", image: "https://i.pravatar.cc/150?img=11" },
  { name: "Sarah Jenkins", role: "Field Director", image: "https://i.pravatar.cc/150?img=5" },
  { name: "Ahmed Al-Fayed", role: "Financial Controller", image: "https://i.pravatar.cc/150?img=60" },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <Translate>Trust & Transparency</Translate>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold font-heading mb-8 leading-tight"
          >
            <Translate>Building a World Where</Translate> <span className="text-primary italic font-serif leading-normal"><Translate>Everyone Thrives</Translate></span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            <Translate>Since 2019, HopeBridge has been on a mission to eradicate poverty, hunger, and educational inequality through sustainable, community-driven programs.</Translate>
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold font-heading"><Translate>Our Mission</Translate></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <Translate>To empower vulnerable communities by providing immediate relief and long-term developmental support in education, healthcare, and food security. We believe in working alongside communities, not just for them.</Translate>
            </p>
            <ul className="space-y-5">
              {[
                "Empowerment over dependency",
                "Transparency in all operations",
                "Sustainable local partnerships"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-foreground font-bold text-lg"
                >
                  <div className="bg-primary/20 p-1.5 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <Translate>{item}</Translate>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1593113580332-ce288d6c94da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Community working together" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <p className="text-white font-bold text-xl leading-relaxed italic">
                "<Translate>Real change happens when communities are empowered to lead their own development.</Translate>"
              </p>
            </div>
          </motion.div>
        </div>

        {/* History / Timeline */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold font-heading mb-4"><Translate>Our History</Translate></h2>
            <p className="text-muted-foreground text-lg"><Translate>The journey of HopeBridge so far.</Translate></p>
          </div>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
            {[
              { year: "2019", title: "Foundation", description: "HopeBridge was founded with a small community grant of ₹5L." },
              { year: "2020", title: "First Major Relief", description: "Distributed over 50,000 meals during the global pandemic." },
              { year: "2022", title: "Education Initiative", description: "Launched the rural education program reaching 500+ students." },
              { year: "2024", title: "Global Reach", description: "Expanded operations to 3 new countries with a volunteer base of 2,000+." },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-muted/30 p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-md transition-shadow group-hover:bg-background duration-500">
                  <span className="text-primary font-black tracking-widest text-lg">{item.year}</span>
                  <h3 className="font-bold text-2xl mt-2 mb-3"><Translate>{item.title}</Translate></h3>
                  <p className="text-muted-foreground leading-relaxed font-medium"><Translate>{item.description}</Translate></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Dashboard */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4"><Translate>Our Growth & Impact</Translate></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              <Translate>Transparent reporting of our financial growth and community reach.</Translate>
            </p>
          </div>
          <div className="bg-background p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl shadow-primary/5">
            <ImpactChart />
          </div>
        </div>

        {/* Team Section */}
        <div className="pb-12">
          <div className="text-center mb-16">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold font-heading mb-4"><Translate>Leadership Team</Translate></h2>
            <p className="text-muted-foreground text-lg"><Translate>Dedicated professionals committed to global change.</Translate></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-[2.5rem] shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">{t(member.role)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
