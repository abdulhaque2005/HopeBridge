"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-provider";
import { Translate } from "@/components/translate";

const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  isMonthly: z.boolean(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().optional(),
  isAnonymous: z.boolean(),
});

const PRESET_AMOUNTS = [
  { value: 1000, impact: "Provides school supplies for 2 kids" },
  { value: 2500, impact: "Feeds a family for a month" },
  { value: 5000, impact: "Supports medical treatment for a patient" },
  { value: 10000, impact: "Funds a woman's micro-business" },
];

export default function DonateForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1000,
      isMonthly: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      isAnonymous: false,
    },
  });

  const amount = form.watch("amount");
  const isMonthly = form.watch("isMonthly");
  
  const currentImpact = PRESET_AMOUNTS.find(p => p.value === amount)?.impact 
    || (amount >= 5000 ? "Creates massive community impact" : "Helps provide essential support");

  const onSubmit = async (data: z.infer<typeof donationSchema>) => {
    // Simulate payment processing
    setStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <HeartHandshake className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-heading mb-2"><Translate>Thank You!</Translate></h2>
          <p className="text-muted-foreground text-lg mb-8">
            <Translate>Your generous donation of</Translate> ₹{amount.toLocaleString()} {isMonthly ? t("Monthly") : ""}<Translate>will make a huge difference.</Translate>
          </p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-full h-12 px-8">
            <Translate>Make Another Donation</Translate>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex bg-muted p-1 rounded-full relative">
        <button
          type="button"
          onClick={() => form.setValue("isMonthly", false)}
          className={cn(
            "flex-1 py-3 text-sm font-semibold rounded-full transition-all relative z-10",
            !isMonthly ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Translate>Give Once</Translate>
        </button>
        <button
          type="button"
          onClick={() => form.setValue("isMonthly", true)}
          className={cn(
            "flex-1 py-3 text-sm font-semibold rounded-full transition-all relative z-10",
            isMonthly ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Translate>Give Monthly</Translate>
        </button>
        <motion.div 
          className="absolute inset-1 w-[calc(50%-4px)] bg-background rounded-full shadow-sm border border-border/50"
          animate={{ x: isMonthly ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground/90"><Translate>Choose Amount</Translate> (₹)</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      form.setValue("amount", preset.value);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "py-4 rounded-2xl border-2 font-bold text-lg transition-all",
                      amount === preset.value && !customAmount
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:border-primary/50 text-foreground bg-background"
                    )}
                  >
                    ₹{preset.value.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold group-focus-within:text-primary transition-colors">₹</span>
                <Input
                  type="number"
                  placeholder={t("Custom Amount")}
                  className={cn(
                    "pl-8 text-lg font-bold h-14 rounded-2xl border-2 bg-background transition-all",
                    customAmount ? "border-primary ring-0" : "border-border hover:border-primary/50 focus:border-primary"
                  )}
                  value={customAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomAmount(val);
                    if (val) form.setValue("amount", Number(val));
                  }}
                />
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-[2rem] p-6 flex gap-4 items-start border border-primary/10">
              <div className="bg-primary/10 text-primary p-2.5 rounded-2xl">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1"><Translate>Your Impact</Translate></p>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed"><Translate>{currentImpact}</Translate></p>
              </div>
            </div>

            <Button type="button" size="lg" className="w-full rounded-full h-14 text-lg shadow-xl shadow-primary/20" onClick={() => setStep(2)}>
              <Translate>Continue to Details</Translate>
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-foreground/90"><Translate>Your Details</Translate></h3>
              <button type="button" onClick={() => setStep(1)} className="text-sm text-primary font-medium hover:underline">
                <Translate>Edit Amount</Translate> (₹{amount.toLocaleString()})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground"><Translate>First Name</Translate></Label>
                <Input id="firstName" {...form.register("firstName")} className="h-12 rounded-xl border-border bg-background focus:border-primary" />
                {form.formState.errors.firstName && <p className="text-destructive text-xs mt-1">{form.formState.errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground"><Translate>Last Name</Translate></Label>
                <Input id="lastName" {...form.register("lastName")} className="h-12 rounded-xl border-border bg-background focus:border-primary" />
                {form.formState.errors.lastName && <p className="text-destructive text-xs mt-1">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground"><Translate>Email Address</Translate></Label>
                <Input id="email" type="email" {...form.register("email")} className="h-12 rounded-xl border-border bg-background focus:border-primary" />
                {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground"><Translate>Phone Number</Translate></Label>
                <Input id="phone" type="tel" {...form.register("phone")} className="h-12 rounded-xl border-border bg-background focus:border-primary" />
                {form.formState.errors.phone && <p className="text-destructive text-xs mt-1">{form.formState.errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground"><Translate>Optional Message</Translate></Label>
              <Input id="message" {...form.register("message")} placeholder={t("Why are you donating today?")} className="h-12 rounded-xl border-border bg-background focus:border-primary" />
            </div>

            <div className="flex items-center space-x-3 pt-2 bg-muted/30 p-4 rounded-2xl border border-border/50">
              <input 
                type="checkbox" 
                id="isAnonymous" 
                {...form.register("isAnonymous")} 
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-all cursor-pointer"
              />
              <Label htmlFor="isAnonymous" className="text-sm font-medium leading-none cursor-pointer text-foreground/80">
                <Translate>Make this donation anonymous</Translate>
              </Label>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-center pt-2 uppercase font-bold tracking-widest">
              <Lock className="w-3 h-3" />
              <span><Translate>Secure, encrypted payment processing</Translate></span>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              <Translate>Donate</Translate> ₹{amount.toLocaleString()} {isMonthly ? t("Monthly") : ""}
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg shadow-primary/10" />
            <p className="text-lg font-medium text-muted-foreground animate-pulse"><Translate>Processing your donation...</Translate></p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
