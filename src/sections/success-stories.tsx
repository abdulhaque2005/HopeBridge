"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Translate } from "@/components/translate";

const stories = [
  {
    id: 1,
    name: "Aisha's Journey",
    role: "Education Program Graduate",
    story: "Thanks to HopeBridge, I was able to complete my high school education and get a scholarship for college. My dream of becoming a nurse is finally coming true.",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "The Smith Family",
    role: "Food Relief Beneficiaries",
    story: "During the hardest times of our lives, the weekly food packages kept our family nourished. We are forever grateful for the support when we needed it most.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/5 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <Translate>Stories of</Translate> <span className="text-primary"><Translate>Impact</Translate></span>
          </h2>
          <p className="text-muted-foreground text-lg">
            <Translate>Real stories from the people whose lives have been transformed by your generosity.</Translate>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="h-full border-border bg-background/50 backdrop-blur-sm rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic mb-6 leading-relaxed">
                      "<Translate>{story.story}</Translate>"
                    </p>
                    <div>
                      <h4 className="font-bold text-foreground"><Translate>{story.name}</Translate></h4>
                      <p className="text-sm text-primary font-medium"><Translate>{story.role}</Translate></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
