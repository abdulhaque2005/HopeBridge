"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, HeartHandshake, BrainCircuit, Info, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const knowledgeBase = {
  hello: "Welcome to HopeBridge! I am your AI Impact Assistant. I can help you explore our current missions, understand how your donations are utilized, or find opportunities to join our community. What can I help you with today?",
  impact: "Your generosity fuels real transformation. For example, a donation of $10 provides clean drinking water for a child for a month. $50 can provide a complete school kit for two children, and $500 can sponsor a local entrepreneur through our micro-finance program. Every cent counts towards building a sustainable future.",
  urgent: "Our most critical mission right now is the 'Education For All' initiative in rural regions, where we are setting up 15 new digital learning centers. We are currently at 75% of our goal and need urgent support to finalize the infrastructure before the new school term begins.",
  transparency: "HopeBridge is committed to 100% transparency. We are a verified NGO with zero management fee on direct donations. 90% of your funds go straight to the field programs, and 10% supports our logistics and ground operations. You can find detailed impact reports on our 'Impact' page.",
  volunteer: "We are always looking for passionate individuals! Currently, we have open spots for 'Remote Mentors' and 'Ground Support' for our food distribution drives. You can sign up directly on our Contact page or message us your area of interest.",
  story: "Meet Rahul, a 12-year-old from a small village who dreamed of becoming an engineer. Through our 'Hope Scholarship', he received the books and tuition he needed. Today, he is the top student in his district. Stories like Rahul's are only possible because of people like you.",
  mission: "Our mission is to bridge the gap between resources and those in need. We focus on four key pillars: Education, Healthcare, Disaster Relief, and Women Empowerment. Since 2018, we have impacted over 50,000 lives across 12 states.",
  default: "That's a great question. At HopeBridge, we believe in collective action. Whether you are looking for data on our transparency, want to hear success stories, or wish to know where your donation goes, I'm here to provide all the details. Feel free to ask more!"
};

const SUGGESTED_QUESTIONS = [
  { key: "impact", text: "How is my money spent?" },
  { key: "urgent", text: "Current urgent missions?" },
  { key: "transparency", text: "Is my donation safe?" },
  { key: "story", text: "Share a success story" },
];

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "msg-0",
          role: "assistant",
          content: knowledgeBase.hello,
          timestamp: new Date(),
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const processResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let responseText = knowledgeBase.default;

    if (lowerInput.includes("impact") || lowerInput.includes("spend") || lowerInput.includes("money") || lowerInput.includes("donate")) {
      responseText = knowledgeBase.impact;
    } else if (lowerInput.includes("urgent") || lowerInput.includes("campaign") || lowerInput.includes("now") || lowerInput.includes("current")) {
      responseText = knowledgeBase.urgent;
    } else if (lowerInput.includes("transparent") || lowerInput.includes("safe") || lowerInput.includes("trust") || lowerInput.includes("verify")) {
      responseText = knowledgeBase.transparency;
    } else if (lowerInput.includes("volunteer") || lowerInput.includes("join") || lowerInput.includes("help") || lowerInput.includes("work")) {
      responseText = knowledgeBase.volunteer;
    } else if (lowerInput.includes("story") || lowerInput.includes("success") || lowerInput.includes("example")) {
      responseText = knowledgeBase.story;
    } else if (lowerInput.includes("mission") || lowerInput.includes("vision") || lowerInput.includes("what you do")) {
      responseText = knowledgeBase.mission;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); 
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      },
    ]);
    
    setInput("");
    setIsTyping(true);
    processResponse(text);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
        <img src="/images/help.png" alt="Hope AI" className="w-10 h-10 relative z-10 object-contain" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[420px] h-[650px] max-h-[85vh] flex flex-col bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden shadow-emerald-500/10"
          >
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-emerald-500/10 rotate-3 overflow-hidden border border-border">
                  <img src="/images/help.png" alt="Logo" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    HopeBridge AI
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Support
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-muted-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1 border border-emerald-500/10 shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                  <div 
                    className={`px-5 py-4 rounded-3xl max-w-[85%] text-[15px] leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md" 
                        : "bg-muted/40 dark:bg-muted/10 text-foreground rounded-tl-sm border border-border/50 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="px-5 py-4 rounded-3xl bg-muted/40 dark:bg-muted/10 text-foreground rounded-tl-sm border border-border/50 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 6 && !isTyping && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((sq) => (
                  <button
                    key={sq.key}
                    onClick={() => handleSend(sq.text)}
                    className="text-xs font-bold px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition-all hover:-translate-y-0.5"
                  >
                    {sq.text}
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 bg-background border-t border-border/50">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-3 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our mission..."
                  className="flex-1 bg-muted/30 border border-border/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-muted-foreground/50"
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="rounded-2xl w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 shrink-0 transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-6 h-6" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
