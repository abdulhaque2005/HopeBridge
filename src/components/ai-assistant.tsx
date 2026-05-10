"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, HeartHandshake, BrainCircuit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { Translate } from "./translate";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const knowledgeBase = {
  en: {
    hello: "Welcome to HopeBridge! I am your AI Impact Assistant. I can help you explore our current missions, understand how your donations are utilized, or find opportunities to join our community. What can I help you with today?",
    impact: "Your generosity fuels real transformation. For example, a donation of $10 provides clean drinking water for a child for a month. $50 can provide a complete school kit for two children, and $500 can sponsor a local entrepreneur. Every cent counts toward building a sustainable future.",
    urgent: "Our most critical mission right now is the 'Education For All' initiative in rural regions, where we are setting up 15 new digital learning centers. We are currently at 75% of our goal and need urgent support.",
    transparency: "HopeBridge is committed to 100% transparency. 90% of your funds go straight to the field programs, and 10% supports our logistics. You can find detailed impact reports on our 'Impact' page.",
    volunteer: "We are always looking for passionate individuals! Currently, we have open spots for 'Remote Mentors' and 'Ground Support'. You can sign up on our Contact page.",
    story: "Meet Rahul, a 12-year-old who dreamed of becoming an engineer. Through our 'Hope Scholarship', he received the books and tuition he needed. Today, he is the top student in his district.",
    default: "That's a great question. At HopeBridge, we believe in collective action. Whether you are looking for data on our transparency or want to hear success stories, I'm here to provide all the details."
  },
  hi: {
    hello: "HopeBridge में आपका स्वागत है! मैं आपका AI इम्पैक्ट असिस्टेंट हूँ। मैं आपको हमारे वर्तमान मिशनों को समझने, आपके दान के उपयोग को जानने या हमारे समुदाय से जुड़ने के तरीके खोजने में मदद कर सकता हूँ।",
    impact: "आपकी उदारता वास्तविक परिवर्तन लाती है। उदाहरण के लिए, $10 का दान एक महीने के लिए एक बच्चे को पीने का साफ पानी प्रदान करता है। $50 दो बच्चों के लिए स्कूल किट प्रदान कर सकता है।",
    urgent: "अभी हमारा सबसे महत्वपूर्ण मिशन ग्रामीण क्षेत्रों में 'सभी के लिए शिक्षा' पहल है। हम 15 नए डिजिटल शिक्षण केंद्र स्थापित कर रहे हैं। हमें आपके तत्काल समर्थन की आवश्यकता है।",
    transparency: "HopeBridge 100% पारदर्शिता के लिए प्रतिबद्ध है। आपके फंड का 90% सीधे कार्यक्रमों में जाता है। आप हमारे 'इम्पैक्ट' पेज पर विस्तृत रिपोर्ट देख सकते हैं।",
    volunteer: "हमें उत्साही व्यक्तियों की तलाश है! वर्तमान में हमारे पास 'रिमोट मेंटर्स' और 'ग्राउंड सपोर्ट' के लिए जगह खाली है। आप हमारे संपर्क पेज पर साइन अप कर सकते हैं।",
    story: "राहुल से मिलें, एक 12 वर्षीय बच्चा जो इंजीनियर बनने का सपना देखता था। हमारी 'आशा छात्रवृत्ति' के माध्यम से, उसे किताबें और ट्यूशन मिला। आज वह अपने जिले का शीर्ष छात्र है।",
    default: "यह एक अच्छा सवाल है। HopeBridge में, हम सामूहिक कार्रवाई में विश्वास करते हैं। चाहे आप हमारी पारदर्शिता के बारे में जानना चाहते हों या सफलता की कहानियाँ सुनना चाहते हों, मैं यहाँ हूँ।"
  },
  ur: {
    hello: "HopeBridge میں خوش آمدید! میں آپ کا AI امپیکٹ اسسٹنٹ ہوں۔ میں آپ کو ہمارے موجودہ مشنوں کو سمجھنے، آپ کے عطیات کے استعمال کو جاننے یا ہماری کمیونٹی میں شامل ہونے کے طریقے تلاش کرنے میں مدد کر سکتا ہوں۔",
    impact: "آپ کی سخاوت حقیقی تبدیلی لاتی ہے۔ مثال کے طور پر، $10 کا عطیہ ایک ماہ کے لیے ایک بچے کو پینے کا صاف پانی فراہم کرتا ہے۔ $50 دو بچوں کے لیے اسکول کٹ فراہم کر سکتا ہے۔",
    urgent: "ابھی ہمارا سب سے اہم مشن دیہی علاقوں میں 'سب کے لیے تعلیم' کی پہل ہے۔ ہم 15 نئے ڈیجیٹل لرننگ سینٹرز قائم کر رہے ہیں۔ ہمیں آپ کی فوری مدد کی ضرورت ہے۔",
    transparency: "HopeBridge 100% شفافیت کے لیے پرعزم ہے۔ آپ کے فنڈز کا 90% براہ راست پروگراموں میں جاتا ہے۔ آپ ہمارے 'امپیکٹ' پیج پر تفصیلی رپورٹ دیکھ سکتے ہیں۔",
    volunteer: "ہمیں پرجوش افراد کی تلاش ہے! فی الحال ہمارے پاس 'ریموٹ مینٹرز' اور 'گراؤنڈ سپورٹ' کے لیے آسامیاں خالی ہیں۔ آپ ہمارے رابطہ پیج پر سائن اپ کر سکتے ہیں۔",
    story: "راہول سے ملیں، ایک 12 سالہ بچہ جو انجینئر بننے کا خواب دیکھتا تھا۔ ہماری 'امید اسکالرشپ' کے ذریعے، اسے کتابیں اور ٹیوشن ملی۔ آج وہ اپنے ضلع کا ٹاپ طالب علم ہے۔",
    default: "یہ ایک اچھا سوال ہے۔ HopeBridge میں، ہم اجتماعی کارروائی پر یقین رکھتے ہیں۔ میں یہاں تمام تفصیلات فراہم کرنے کے لیے موجود ہوں۔"
  }
};

const SUGGESTED_QUESTIONS = [
  { key: "impact", text: "How is my money spent?" },
  { key: "urgent", text: "Current urgent missions?" },
  { key: "transparency", text: "Is my donation safe?" },
  { key: "story", text: "Share a success story" },
];

export function AiAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const lang = (language as "en" | "hi" | "ur") || "en";
      setMessages([
        {
          id: "msg-0",
          role: "assistant",
          content: knowledgeBase[lang].hello,
          timestamp: new Date(),
        }
      ]);
    }
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const processResponse = (userInput: string) => {
    const lang = (language as "en" | "hi" | "ur") || "en";
    const lowerInput = userInput.toLowerCase();
    let responseText = knowledgeBase[lang].default;

    if (lowerInput.includes("impact") || lowerInput.includes("spend") || lowerInput.includes("money") || lowerInput.includes("donate") || lowerInput.includes("paisa") || lowerInput.includes("mali")) {
      responseText = knowledgeBase[lang].impact;
    } else if (lowerInput.includes("urgent") || lowerInput.includes("campaign") || lowerInput.includes("now") || lowerInput.includes("current") || lowerInput.includes("fauri")) {
      responseText = knowledgeBase[lang].urgent;
    } else if (lowerInput.includes("transparent") || lowerInput.includes("safe") || lowerInput.includes("trust") || lowerInput.includes("verify") || lowerInput.includes("bharosa")) {
      responseText = knowledgeBase[lang].transparency;
    } else if (lowerInput.includes("volunteer") || lowerInput.includes("join") || lowerInput.includes("help") || lowerInput.includes("work") || lowerInput.includes("madad")) {
      responseText = knowledgeBase[lang].volunteer;
    } else if (lowerInput.includes("story") || lowerInput.includes("success") || lowerInput.includes("example") || lowerInput.includes("kahani")) {
      responseText = knowledgeBase[lang].story;
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
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-emerald-500/10 rotate-3 overflow-hidden border border-border">
                  <img src="/images/help.png" alt="Logo" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <Translate>Hope AI Companion</Translate>
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <Translate>Online & Ready</Translate>
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
                    <Sparkles className="w-5 h-5" />
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
                    onClick={() => handleSend(t(sq.text))}
                    className="text-xs font-bold px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition-all hover:-translate-y-0.5"
                  >
                    <Translate>{sq.text}</Translate>
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
                  dir="auto"
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
