"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-1 2.18-4 1.92c0 0-2 .54-2 2.82V12c0 0 0 4 3 6s-6 4-10 2c0 0-3-1-3-4s3-2 3-2s-2-1-2-3s2-2 2-2s-1-1-1-2s2-1 2-1s1-1 3-1s5 2 5 2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
          >
            <Translate>Get in</Translate> <span className="text-primary"><Translate>Touch</Translate></span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            <Translate>Have questions about our programs, volunteering, or donations? Our team is here to help you make a difference.</Translate>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-primary text-primary-foreground p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />
              <h3 className="text-2xl font-bold font-heading mb-8 relative z-10"><Translate>Contact Information</Translate></h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4 group/item">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover/item:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg"><Translate>Headquarters</Translate></p>
                    <p className="text-primary-foreground/80 leading-relaxed font-medium">
                      <Translate>123 Hope Avenue, Impact City, 10012, India</Translate>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group/item">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover/item:scale-110 transition-transform">
                    <Phone className="w-6 h-6 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg"><Translate>Phone</Translate></p>
                    <p className="text-primary-foreground/80 font-medium">+91 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover/item:scale-110 transition-transform">
                    <Mail className="w-6 h-6 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg"><Translate>Email</Translate></p>
                    <p className="text-primary-foreground/80 font-medium">hello@hopebridge.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t border-white/20">
                  {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Simple Map Placeholder */}
            <div className="h-56 bg-background rounded-[2.5rem] overflow-hidden relative border border-border shadow-lg group">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Map location" 
                 className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                 <Button variant="secondary" className="rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                   <MapPin className="w-4 h-4 text-primary" /> <Translate>View on Google Maps</Translate>
                 </Button>
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-background p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl shadow-primary/5"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold font-heading"><Translate>Message Sent!</Translate></h2>
                <p className="text-muted-foreground text-lg max-w-sm">
                  <Translate>Thank you for reaching out. A member of our team will get back to you within 24-48 hours.</Translate>
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-full h-12 px-8 font-bold">
                  <Translate>Send Another Message</Translate>
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <Translate>Send us a message</Translate>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Full Name</Translate></Label>
                    <Input id="fullName" required className="h-14 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Email Address</Translate></Label>
                    <Input id="email" type="email" required className="h-14 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:border-primary transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Phone Number</Translate></Label>
                    <Input id="phone" type="tel" required className="h-14 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Support Category</Translate></Label>
                    <select id="category" required className="w-full h-14 rounded-2xl border-transparent bg-muted/30 px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus:bg-background focus:border-primary transition-all ring-0 border border-transparent">
                      <option value="" disabled selected>{t("Select a category")}</option>
                      <option value="donation">{t("Donation Help")}</option>
                      <option value="volunteer">{t("Volunteer Support")}</option>
                      <option value="campaign">{t("Campaign Information")}</option>
                      <option value="partnership">{t("Partnership Inquiry")}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Subject</Translate></Label>
                  <Input id="subject" required className="h-14 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:border-primary transition-all" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><Translate>Message</Translate></Label>
                  <textarea 
                    id="message" 
                    required 
                    rows={5}
                    placeholder={t("Tell us how we can help...")}
                    className="w-full rounded-[2rem] border-transparent bg-muted/30 px-4 py-4 text-sm shadow-sm focus-visible:outline-none focus:bg-background focus:border-primary transition-all ring-0 border border-transparent"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full h-16 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all">
                  <Translate>Send Message</Translate> <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4"><Translate>Frequently Asked Questions</Translate></h2>
            <p className="text-muted-foreground text-lg"><Translate>Quick answers to common questions about our operations and how you can help.</Translate></p>
          </div>
          <Accordion className="w-full space-y-4">
            {[
              { q: "How can I volunteer?", a: "You can join our volunteer program by filling out the form on this page and selecting \"Volunteer Support\" as the category. Our team will get back to you with upcoming opportunities in your area." },
              { q: "Are my donations tax-deductible?", a: "Yes, HopeBridge is a registered non-profit organization. All donations are tax-deductible to the full extent of the law. You will receive an automated receipt for your records." },
              { q: "Where does my donation go?", a: "We pride ourselves on transparency. 90% of every donation goes directly to the field, funding our programs. The remaining 10% covers essential administrative and operational costs to keep our initiatives running sustainably." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-8 bg-background shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-bold py-6 hover:no-underline">
                  <Translate>{faq.q}</Translate>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8">
                  <Translate>{faq.a}</Translate>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
