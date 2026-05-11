"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Translate } from "@/components/translate";
import { useLanguage } from "@/lib/language-provider";
export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span><Translate>Stay Connected</Translate></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <Translate>Join Our</Translate> <span className="text-primary"><Translate>Newsletter</Translate></span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            <Translate>Get monthly updates on our impact, upcoming events, and inspiring stories delivered straight to your inbox.</Translate>
          </p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-6 bg-primary/10 rounded-2xl text-primary font-medium"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span><Translate>Thank you! You&apos;re now subscribed to our newsletter.</Translate></span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={t("Enter your email")}
                  className="pl-12 h-14 rounded-full bg-background text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 rounded-full">
                <Translate>Subscribe</Translate>
              </Button>
            </form>
          )}
          <p className="text-xs text-muted-foreground mt-4"><Translate>No spam. Unsubscribe anytime.</Translate></p>
        </motion.div>
      </div>
    </section>
  );
}
