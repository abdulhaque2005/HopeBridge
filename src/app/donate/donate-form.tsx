"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, HeartHandshake, Sparkles, Heart, ArrowLeft } from "lucide-react";

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
  { value: 500, impact: "Feeds 5 children for a week" },
  { value: 1500, impact: "School supplies for 2 students" },
  { value: 5000, impact: "Emergency healthcare for a family" },
  { value: 10000, impact: "Funds a woman's micro-business" },
];

// Confetti particle component
function ConfettiParticle({ index }: { index: number }) {
  const { color, delay, x, rotation } = React.useMemo(() => {
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    return {
      color: colors[index % colors.length],
      delay: Math.random() * 0.5,
      x: (Math.random() - 0.5) * 400,
      rotation: Math.random() * 720 - 360
    };
  }, [index]);

  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -100, 300],
        x: [0, x * 0.5, x],
        opacity: [1, 1, 0],
        rotate: [0, rotation / 2, rotation],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut",
      }}
      style={{ backgroundColor: color }}
      className="absolute w-2.5 h-2.5 rounded-sm"
    />
  );
}

export default function DonateForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1500,
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

  const currentImpact =
    PRESET_AMOUNTS.find((p) => p.value === amount)?.impact ||
    (amount >= 5000
      ? "Creates massive community impact"
      : "Helps provide essential support");

  const onSubmit = async () => {
    setStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowConfetti(true);
    setIsSuccess(true);
  };

  // Success Screen with Celebration
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-12 space-y-6 relative overflow-hidden"
      >
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-28 h-28 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            <HeartHandshake className="w-14 h-14 text-primary" />
          </motion.div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-3">
            <Translate>Thank You!</Translate> 🎉
          </h2>
          <p className="text-muted-foreground text-lg mb-2 max-w-sm mx-auto">
            <Translate>Your generous donation of</Translate>{" "}
            <span className="text-primary font-bold text-xl">
              ₹{amount.toLocaleString()}
            </span>{" "}
            {isMonthly && (
              <span className="text-sm font-medium">
                /{t("month")}
              </span>
            )}
          </p>
          <p className="text-muted-foreground mb-8">
            <Translate>will make a real difference in someone&apos;s life.</Translate>
          </p>

          {/* Impact Summary */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  <Translate>Your Impact</Translate>
                </p>
                <p className="text-sm font-medium text-foreground">
                  <Translate>{currentImpact}</Translate>
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-full h-12 px-8 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Heart className="mr-2 w-4 h-4" />
            <Translate>Make Another Donation</Translate>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-2">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                step >= s
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            {s < 2 && (
              <div
                className={cn(
                  "w-12 h-0.5 rounded-full transition-all",
                  step > s ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
        <span className="text-xs text-muted-foreground font-medium ml-2">
          {step === 1 ? <Translate>Choose Amount</Translate> : <Translate>Your Details</Translate>}
        </span>
      </div>

      {/* One-time / Monthly Toggle */}
      <div className="flex bg-muted p-1.5 rounded-full relative">
        <button
          type="button"
          onClick={() => form.setValue("isMonthly", false)}
          className={cn(
            "flex-1 py-3 text-sm font-semibold rounded-full transition-all relative z-10",
            !isMonthly
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Translate>Give Once</Translate>
        </button>
        <button
          type="button"
          onClick={() => form.setValue("isMonthly", true)}
          className={cn(
            "flex-1 py-3 text-sm font-semibold rounded-full transition-all relative z-10",
            isMonthly
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Translate>Give Monthly</Translate>
          <span className="ml-1.5 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">
            <Translate>Popular</Translate>
          </span>
        </button>
        <motion.div
          className="absolute inset-1.5 w-[calc(50%-6px)] bg-background rounded-full shadow-md border border-border/50"
          animate={{ x: isMonthly ? "calc(100% + 6px)" : "0%" }}
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
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground/90">
                <Translate>Choose Amount</Translate> (₹)
              </h3>
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
                      "py-5 rounded-2xl border-2 font-bold text-lg transition-all relative overflow-hidden group",
                      amount === preset.value && !customAmount
                        ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/50 text-foreground bg-background hover:shadow-md"
                    )}
                  >
                    <span className="relative z-10">₹{preset.value.toLocaleString()}</span>
                    <p className={cn(
                      "text-[10px] mt-1 font-medium transition-colors relative z-10",
                      amount === preset.value && !customAmount
                        ? "text-primary/70"
                        : "text-muted-foreground"
                    )}>
                      <Translate>{preset.impact}</Translate>
                    </p>
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold group-focus-within:text-primary transition-colors">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder={t("Custom Amount")}
                  className={cn(
                    "pl-8 text-lg font-bold h-14 rounded-2xl border-2 bg-background transition-all",
                    customAmount
                      ? "border-primary ring-0 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/50 focus:border-primary"
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

            {/* Impact Preview */}
            <motion.div
              key={currentImpact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary/5 to-emerald-500/5 dark:from-primary/10 dark:to-emerald-500/10 rounded-[2rem] p-6 flex gap-4 items-start border border-primary/10"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  <Translate>Your Impact</Translate>
                </p>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                  <Translate>{currentImpact}</Translate>
                </p>
              </div>
            </motion.div>

            <Button
              type="button"
              size="lg"
              className="w-full rounded-full h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
              onClick={() => setStep(2)}
            >
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
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <Translate>Back</Translate>
              </button>
              <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
                ₹{amount.toLocaleString()} {isMonthly && <span className="text-xs opacity-70">/<Translate>month</Translate></span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  <Translate>First Name</Translate>
                </Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className="h-12 rounded-xl border-border bg-muted/30 focus:bg-background focus:border-primary transition-all"
                  placeholder="Rahul"
                />
                {form.formState.errors.firstName && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  <Translate>Last Name</Translate>
                </Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className="h-12 rounded-xl border-border bg-muted/30 focus:bg-background focus:border-primary transition-all"
                  placeholder="Sharma"
                />
                {form.formState.errors.lastName && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  <Translate>Email Address</Translate>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="h-12 rounded-xl border-border bg-muted/30 focus:bg-background focus:border-primary transition-all"
                  placeholder="rahul@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  <Translate>Phone Number</Translate>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className="h-12 rounded-xl border-border bg-muted/30 focus:bg-background focus:border-primary transition-all"
                  placeholder="+91 98765 43210"
                />
                {form.formState.errors.phone && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                <Translate>Optional Message</Translate>
              </Label>
              <Input
                id="message"
                {...form.register("message")}
                placeholder={t("Why are you donating today?")}
                className="h-12 rounded-xl border-border bg-muted/30 focus:bg-background focus:border-primary transition-all"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2 bg-muted/30 p-4 rounded-2xl border border-border/50">
              <input
                type="checkbox"
                id="isAnonymous"
                {...form.register("isAnonymous")}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary transition-all cursor-pointer accent-primary"
              />
              <Label
                htmlFor="isAnonymous"
                className="text-sm font-medium leading-none cursor-pointer text-foreground/80"
              >
                <Translate>Make this donation anonymous</Translate>
              </Label>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-center pt-2 uppercase font-bold tracking-widest">
              <Lock className="w-3 h-3" />
              <span>
                <Translate>Secure, encrypted payment processing</Translate>
              </span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all group"
            >
              <Heart className="mr-2 w-5 h-5 group-hover:animate-heartbeat" />
              <Translate>Donate</Translate> ₹{amount.toLocaleString()}{" "}
              {isMonthly ? t("Monthly") : ""}
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full" />
            </div>
            <p className="text-lg font-medium text-muted-foreground animate-pulse">
              <Translate>Processing your donation...</Translate>
            </p>
            <p className="text-sm text-muted-foreground/60">
              <Translate>This will only take a moment</Translate>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
