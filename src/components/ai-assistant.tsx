"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Zap } from "lucide-react";
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
    hello: "Welcome to HopeBridge! I am your Hope AI. I can help you explore our current missions, understand how your donations are utilized, or find opportunities to join our community. What can I help you with today?",
    impact: "Your generosity fuels real transformation. For example, a donation of ₹500 provides clean drinking water and a healthy meal for a child for a month. ₹2000 can provide a complete digital learning kit for rural students. Every rupee counts toward building a sustainable future.",
    urgent: "Our most critical missions right now are the 'Flood Relief Fund' (for Assam & Bihar) and the 'Rural Education Initiative 2026'. We are currently scaling our operations and need your urgent support.",
    transparency: "HopeBridge is committed to 100% transparency. 90% of your funds go straight to the field programs, and 10% supports our logistics and ground operations. You can find detailed impact reports on our 'About' page.",
    volunteer: "We are always looking for passionate individuals! Currently, we have open spots for 'Remote Mentors' and 'Ground Support'. You can sign up on our Contact page.",
    story: "Meet Amina, a 12-year-old from a flood-affected village. Through our 'Hope Scholarship', she received the books and tuition she needed. Today, she is the top student in her district and dreams of becoming a doctor.",
    about: "HopeBridge was founded in 2019 with a vision to bridge the gap between resources and those who need them most. We focus on education, healthcare, and emergency relief.",
    contact: "You can reach us at hello@hopebridge.org, or visit our office in Udyog Vihar, Gurugram. Our team is available 24/7 for urgent inquiries.",
    greeting: "Hello there! I'm Hope AI. How can I assist you in your mission to help others today?",
    default: "That's an interesting question. At HopeBridge, we focus on real impact and transparency. Could you please specify if you'd like to know about our programs, how to donate, or see our success stories?",
    donation_process: "Donating is simple! Just click the 'Donate Now' button in the menu. We accept UPI, Credit/Debit cards, and Net Banking. All donations are secure and tax-exempt.",
  },
  hi: {
    hello: "HopeBridge में आपका स्वागत है! मैं आपका 'होप AI' सेवा सहायक हूँ। मैं आपको हमारे मिशनों, दान के उपयोग और सेवा कार्यों के बारे में बता सकता हूँ।",
    impact: "आपकी उदारता से बड़ा बदलाव आता है। उदाहरण के लिए, ₹500 से एक बच्चे को महीने भर का भोजन मिलता है, और ₹2000 से ग्रामीण बच्चों के लिए डिजिटल लैब किટ मिलती है।",
    urgent: "अभी सबसे जरूरी 'बाढ़ राहत कोष' (असम और बिहार के लिए) और 'ग्रामीण शिक्षा' मिशन हैं। हमें आपकी तत्काल मदद की जरूरत है।",
    transparency: "हम 100% पारदर्शिता में विश्वास करते हैं। आपके दान का 90% सीधे ग्राउंड पर सेवा में लगता है। आप हमारे 'About' पेज पर ऑडिट रिपोर्ट्स देख सकते हैं।",
    volunteer: "हम हमेशा नए सेवादारों का स्वागत करते हैं! आप 'रिमोट मेंटर' या 'ग्राउंड सपोर्ट' के रूप में जुड़ सकते हैं। हमारे Contact पेज पर फॉर्म भरें।",
    story: "अमीना की कहानी देखें, जिसने बाढ़ में सब खो दिया था, लेकिन आपके दान की बदौलत आज वो स्कूल में टॉप कर रही है और डॉक्टर बनना चाहती है।",
    about: "होपब्रिज 2019 में शुरू हुआ था। हमारा लक्ष्य हर जरूरतमंद तक शिक्षा, स्वास्थ्य और भोजन पहुँचाना है।",
    contact: "आप हमें hello@hopebridge.org पर ईमेल कर सकते हैं या हमारे गुरुग्राम कार्यालय में आ सकते हैं।",
    greeting: "नमस्ते! मैं 'होप AI' हूँ। आज मैं आपकी सेवा में क्या मदद कर सकता हूँ?",
    default: "क्षमा करें, क्या आप इसे थोड़ा स्पष्ट कर सकते हैं? मैं आपको हमारे सेवा कार्यों, दान देने की प्रक्रिया या इम्पैक्ट रिपोर्ट्स के बारे में बता सकता हूँ।",
    donation_process: "दान देना बहुत आसान है! मेनू में 'दान करें' बटन पर क्लिक करें। आप UPI, कार्ड या नेट बैंकिंग से सुरक्षित दान दे सकते हैं।",
  },
  ur: {
    hello: "HopeBridge میں خوش آمدید! میں آپ کا 'ہوپ AI' خدمت گار ہوں۔ میں آپ کو ہمارے مشن، عطیات اور فلاحی کاموں کے بارے میں بتا سکتا ہوں۔",
    impact: "آپ کی سخاوت بڑی تبدیلی لاتی ہے۔ مثلاً ₹500 سے ایک بچے کو مہینے بھر کا کھانا ملتا ہے، اور ₹2000 سے دیہی بچوں کے لیے تعلیمی کٹ ملتی ہے۔",
    urgent: "ابھی سب سے ضروری 'سیلاب ریلیف فنڈ' اور 'دیہی تعلیم' کے مشن ہیں۔ ہمیں آپ کی فوری مدد کی ضرورت ہے۔",
    transparency: "ہم 100% شفافیت پر یقین رکھتے ہیں۔ آپ کے عطیہ کا 90% براہ راست گراؤنڈ پر کام میں لگتا ہے۔",
    volunteer: "ہم ہمیشہ نئے رضاکاروں کا خیرمقدم کرتے ہیں! آپ ہمارے رابطہ پیج پر فارم بھر کر ہم سے جڑ سکتے ہیں۔",
    story: "امینہ کی کہانی دیکھیں، جس نے سیلاب میں سب کچھ کھو دیا تھا، لیکن آج وہ اسکول میں ٹاپ کر رہی ہے۔",
    about: "ہوپ برج 2019 میں شروع ہوا تھا۔ ہمارا مقصد ہر ضرورت مند تک تعلیم، صحت اور خوراک پہنچانا ہے۔",
    contact: "آپ ہمیں hello@hopebridge.org پر ای میل کر سکتے ہیں۔ ہماری ٹیم آپ کی مدد کے لیے حاضر ہے۔",
    greeting: "اسلام علیکم! میں 'ہوپ AI' ہوں۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟",
    default: "معذرت، کیا آپ تھوڑی وضاحت کر سکتے ہیں؟ میں آپ کو ہمارے فلاحی کاموں یا عطیہ کے طریقہ کار کے بارے میں بتا سکتا ہوں۔",
    donation_process: "عطیہ دینا بہت آسان ہے! 'عطیہ کریں' بٹن پر کلک کریں۔ آپ UPI یا کارڈ کے ذریعے محفوظ عطیہ دے سکتے ہیں۔",
  },
  gu: {
    hello: "HopeBridge માં આપનું સ્વાગત છે! હું તમારો 'હોપ AI' સેવા સહાયક છું. હું તમને અમારા મિશન, દાનના ઉપયોગ અને સેવા કાર્યો વિશે જણાવી શકું છું.",
    impact: "તમારી ઉદારતા મોટો બદલાવ લાવે છે. ઉદાહરણ તરીકે, ₹500 થી એક બાળકને મહિનાનું ભોજન મળે છે, અને ₹2000 થી ગ્રામીણ બાળકો માટે શિક્ષણ કિટ મળે છે.",
    urgent: "અત્યારે સૌથી મહત્વના 'પૂર રાહત ભંડોળ' અને 'ગ્રામીણ શિક્ષણ' મિશન છે. અમને તમારી તાત્કાલિક મદદની જરૂર છે.",
    transparency: "અમે 100% પારદર્શિતામાં માનીએ છીએ. તમારા દાનનો 90% સીધો ગ્રાઉન્ડ પર સેવા માટે વપરાય છે.",
    volunteer: "અમે હંમેશા નવા સ્વયંસેવકોનું સ્વાગત કરીએ છીએ! તમે અમારા સંપર્ક પેજ પર ફોર્મ ભરીને અમારી સાથે જોડાઈ શકો છો.",
    story: "અમીનાની વાર્તા જુઓ, જેણે પૂર માં બધું ગુમાવ્યું હતું, પરંતુ આજે તે શાળામાં ટોપ કરી રહી છે.",
    about: "હોપબ્રિજ 2019 માં શરૂ થયું હતું. અમારો ધ્યેય દરેક જરૂરિયાતમંદ સુધી શિક્ષણ અને આરોગ્ય પહોંચાડવાનો છે.",
    contact: "તમે અમને hello@hopebridge.org પર ઈમેલ કરી શકો છો. અમારી ટીમ તમારી સહાય માટે તૈયાર છે.",
    greeting: "નમસ્તે! હું 'હોપ AI' છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
    default: "ક્ષમા કરશો, શું તમે આ થોડું સ્પષ્ટ કરી શકશો? હું તમને અમારા સેવા કાર્યો અથવા દાનની પ્રક્રિયા વિશે જણાવી શકું છું.",
    donation_process: "દાન આપવું ખૂબ જ સરળ છે! મેનુમાં 'અત્યારે દાન કરો' બટન પર ક્લિક કરો. તમે UPI અથવા કાર્ડથી સુરક્ષિત દાન આપી શકો છો.",
  }
};

const SUGGESTED_QUESTIONS = [
  { key: "impact", text: "How is my money spent?" },
  { key: "urgent", text: "Current urgent missions?" },
  { key: "donate", text: "How can I donate?" },
  { key: "contact", text: "How can I contact you?" },
];

export function AiAssistant() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const lang = (language as "en" | "hi" | "ur" | "gu") || "en";
      const kb = (knowledgeBase as any)[lang] || knowledgeBase.en;
      setMessages([
        {
          id: "msg-0",
          role: "assistant",
          content: kb.hello,
          timestamp: new Date(),
        }
      ]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get response");
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: error.message || "Sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white shadow-[0_8px_30px_-4px_rgba(16,185,129,0.6)] flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-emerald-400/30 animate-pulse" />
        <img src="/images/help.png" alt="Hope AI" className="w-10 h-10 relative z-10 object-contain drop-shadow-lg" />
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950 z-20" />
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
