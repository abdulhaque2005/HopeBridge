"use client";

import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";
import { Translate } from "@/components/translate";

const stories = [
  {
    id: 1,
    name: "Amina's Journey Back to School",
    role: "Education Program Beneficiary",
    location: "Bihar, India",
    story: "After losing her home during the floods, 12-year-old Amina thought she would never see a classroom again. Thanks to HopeBridge donors, she not only returned to school but topped her class. Today, she dreams of becoming a doctor to serve her community.",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    impact: "Sponsored since 2022",
  },
  {
    id: 2,
    name: "Fatima's Tailoring Business",
    role: "Women Empowerment Graduate",
    location: "Rajasthan, India",
    story: "A single mother of three, Fatima used a ₹15,000 micro-loan to start a small tailoring business from her home. Within a year, she was employing two other women from her village. All three of her children now attend school regularly.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    impact: "₹15,000 micro-loan changed everything",
  },
  {
    id: 3,
    name: "The Kumar Family",
    role: "Food Relief Beneficiaries",
    location: "Maharashtra, India",
    story: "During the hardest times of our lives, the weekly food packages from HopeBridge kept our family nourished and gave us hope. When my husband lost his job, I didn't know how I would feed my children. HopeBridge was there when we had nobody.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    impact: "6 months of food support",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-28 bg-muted/30 overflow-hidden relative">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/5 blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20"
          >
            <Heart className="w-4 h-4" />
            <Translate>Real Stories, Real Impact</Translate>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6"
          >
            <Translate>Stories of</Translate>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
              <Translate>Hope & Impact</Translate>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            <Translate>
              Behind every donation is a life transformed. These are the real people whose futures have been changed by your generosity.
            </Translate>
          </motion.p>
        </div>

        {/* Stories Grid */}
        <div className="space-y-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-0 bg-background rounded-[2.5rem] overflow-hidden border border-border shadow-xl hover:shadow-2xl transition-shadow duration-500 group`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-2/5 h-72 sm:h-80 lg:h-auto relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

                {/* Impact Badge */}
                <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full text-white text-sm font-semibold">
                  <Translate>{story.impact}</Translate>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-3/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-primary/15 mb-4" />
                <p className="text-lg sm:text-xl text-foreground/90 italic mb-8 leading-relaxed font-medium">
                  &ldquo;<Translate>{story.story}</Translate>&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">
                      <Translate>{story.name}</Translate>
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      <Translate>{story.role}</Translate>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      <Translate>{story.location}</Translate>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotional Pull Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10 rounded-[2rem] p-10 sm:p-12">
            <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-foreground/90 italic leading-relaxed mb-6">
              &ldquo;<Translate>
                This organization helped my children continue their education during difficult times. The transparency and updates gave me confidence that my money truly helped families.
              </Translate>&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src="https://i.pravatar.cc/80?img=32"
                alt="Sarah Ahmed"
                className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
              />
              <div className="text-left">
                <p className="font-bold text-foreground">Sarah Ahmed</p>
                <p className="text-sm text-primary font-medium">
                  <Translate>Monthly Donor, Dubai</Translate>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
