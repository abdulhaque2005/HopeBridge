"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, ArrowDownCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { Translate } from "./translate";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Simulated NGO AI Knowledge Base
const knowledgeBase = {
  en: {
    hello: "Hello! I am the HopeBridge AI Assistant. I'm here to help you understand our campaigns, see the impact of your donations, or find ways to volunteer. How can I support you today?",
    impact: "Your contribution creates an immediate, life-changing impact. For instance, just ₹500 provides nutritious meals for 5 children for an entire week. A larger donation of ₹5,000 can fully support emergency medical aid for a family recovering from recent floods.",
    urgent: "Currently, our 'National Flood Relief Fund (Assam & Bihar)' needs the most urgent support. We are actively distributing clean water and thermal wear to over 2,300 evacuated families.",
    transparency: "We take your trust very seriously. 85% of all donations go directly toward community programs and emergency support on the ground, while 15% is used for logistics and operations. All our major disaster relief programs are verified by official entities like the NDMA.",
    volunteer: "We would love to have you on the team! We urgently need volunteers for food distribution in rural areas and remote tutoring for our Education Support Program. You can easily join us by visiting the Volunteer section on our Contact page.",
    story: "Let me tell you about Fatima. She is a single mother of three who used a ₹15,000 micro-loan from our Women Empowerment Initiative to start a small tailoring business. Today, she is financially independent and even employs two other women from her village. Your donations make these stories possible.",
    default: "Thank you for caring about our mission at HopeBridge. Whether you want to learn where your donation goes, discover urgent campaigns, or read about the lives we've changed, I am here to guide you."
  },
  hi: {
    hello: "नमस्ते! मैं HopeBridge AI असिस्टेंट हूँ। मैं हमारे अभियानों को समझने, आपके दान के प्रभाव को देखने, या स्वयंसेवक बनने के तरीके खोजने में आपकी मदद करने के लिए यहाँ हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    impact: "आपका योगदान तत्काल प्रभाव डालता है। उदाहरण के लिए, मात्र ₹500 पूरे एक सप्ताह के लिए 5 बच्चों को पौष्टिक भोजन प्रदान कर सकते हैं। ₹5,000 का बड़ा दान बाढ़ से उबरने वाले परिवार के लिए चिकित्सा सहायता का पूरा समर्थन कर सकता है।",
    urgent: "वर्तमान में, हमारे 'राष्ट्रीय बाढ़ राहत कोष (असम और बिहार)' को सबसे तत्काल समर्थन की आवश्यकता है। हम सक्रिय रूप से 2,300 से अधिक निकाले गए परिवारों को स्वच्छ पानी और गर्म कपड़े वितरित कर रहे हैं।",
    transparency: "हम आपके विश्वास को बहुत गंभीरता से लेते हैं। सभी दानों का 85% सीधे जमीनी स्तर पर सामुदायिक कार्यक्रमों और आपातकालीन सहायता की ओर जाता है। हमारे सभी प्रमुख आपदा राहत कार्यक्रम NDMA जैसी आधिकारिक संस्थाओं द्वारा सत्यापित हैं।",
    volunteer: "हमें आपकी मदद की आवश्यकता है! हमें ग्रामीण क्षेत्रों में भोजन वितरण और हमारे शिक्षा सहायता कार्यक्रम के लिए दूरस्थ ट्यूशन के लिए स्वयंसेवकों की तत्काल आवश्यकता है।",
    story: "मैं आपको फातिमा के बारे में बताता हूँ। वह तीन बच्चों की अकेली माँ है, जिसने हमारी महिला सशक्तिकरण पहल से ₹15,000 के माइक्रो-लोन का उपयोग करके सिलाई का व्यवसाय शुरू किया। आज, वह आर्थिक रूप से स्वतंत्र है।",
    default: "HopeBridge के मिशन की परवाह करने के लिए धन्यवाद। चाहे आप जानना चाहते हों कि आपका दान कहाँ जाता है, या उन जीवन के बारे में पढ़ना चाहते हों जिन्हें हमने बदला है, मैं यहाँ आपका मार्गदर्शन करने के लिए हूँ।"
  },
  ur: {
    hello: "ہیلو! میں HopeBridge AI اسسٹنٹ ہوں۔ میں ہماری مہمات کو سمجھنے، آپ کے عطیات کے اثرات دیکھنے، یا رضاکار بننے کے طریقے تلاش کرنے میں آپ کی مدد کرنے کے لیے یہاں ہوں۔ میں آج آپ کی کس طرح مدد کر سکتا ہوں؟",
    impact: "آپ کا عطیہ فوری اثر پیدا کرتا ہے۔ مثال کے طور پر، صرف ₹500 پورے ایک ہفتے کے لیے 5 بچوں کو غذائیت سے بھرپور کھانا فراہم کر سکتا ہے۔ ₹5,000 کا بڑا عطیہ سیلاب سے صحت یاب ہونے والے خاندان کے لیے طبی امداد کی مکمل مدد کر سکتا ہے۔",
    urgent: "فی الحال، ہمارے 'نیشنل فلڈ ریلیف فنڈ (آسام اور بہار)' کو سب سے فوری مدد کی ضرورت ہے۔ ہم 2,300 سے زیادہ نکالے گئے خاندانوں میں پینے کا صاف پانی اور گرم کپڑے تقسیم کر رہے ہیں۔",
    transparency: "ہم آپ کے اعتماد کو بہت سنجیدگی سے لیتے ہیں۔ تمام عطیات کا 85% براہ راست زمینی سطح پر کمیونٹی پروگراموں اور ہنگامی امداد کی طرف جاتا ہے۔",
    volunteer: "ہمیں آپ کی مدد کی ضرورت ہے! ہمیں دیہی علاقوں میں خوراک کی تقسیم کے لیے رضاکاروں کی فوری ضرورت ہے۔",
    story: "میں آپ کو فاطمہ کے بارے میں بتاتا ہوں۔ وہ تین بچوں کی اکیلی ماں ہے جس نے ہماری خواتین کو بااختیار بنانے کی پہل سے ₹15,000 کا مائیکرو لون استعمال کر کے سلائی کا کاروبار شروع کیا۔ آج وہ مالی طور پر خود مختار ہے۔",
    default: "HopeBridge کے مشن کا خیال رکھنے کے لیے آپ کا شکریہ۔ میں یہاں آپ کی رہنمائی کے لیے موجود ہوں۔"
  }
};

const SUGGESTED_QUESTIONS = [
  { key: "impact", text: "How does my donation help?" },
  { key: "urgent", text: "Which campaign needs urgent support?" },
  { key: "story", text: "Tell me an impact story" },
  { key: "transparency", text: "How transparent is the NGO?" },
];

export function AiAssistant() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const lang = language as "en" | "hi" | "ur";
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const processResponse = (userInput: string) => {
    const lang = language as "en" | "hi" | "ur";
    const lowerInput = userInput.toLowerCase();
    
    let responseText = knowledgeBase[lang].default;

    if (lowerInput.includes("impact") || lowerInput.includes("help") || lowerInput.includes("how much") || lowerInput.includes("donate")) {
      responseText = knowledgeBase[lang].impact;
    } else if (lowerInput.includes("urgent") || lowerInput.includes("campaign") || lowerInput.includes("need")) {
      responseText = knowledgeBase[lang].urgent;
    } else if (lowerInput.includes("transparent") || lowerInput.includes("trust") || lowerInput.includes("where") || lowerInput.includes("usage")) {
      responseText = knowledgeBase[lang].transparency;
    } else if (lowerInput.includes("volunteer") || lowerInput.includes("join") || lowerInput.includes("work")) {
      responseText = knowledgeBase[lang].volunteer;
    } else if (lowerInput.includes("story") || lowerInput.includes("example") || lowerInput.includes("beneficiary")) {
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
    }, 1500 + Math.random() * 1000); // Realistic typing delay
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
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
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
      >
        <Sparkles className="w-6 h-6 absolute animate-ping opacity-50" />
        <Bot className="w-7 h-7 relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden"
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-none mb-1"><Translate>Hope AI Companion</Translate></h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <Translate>Online & Ready</Translate>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                  )}
                  <div 
                    className={`px-5 py-3.5 rounded-2xl max-w-[80%] text-[15px] leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-foreground text-background rounded-tr-sm" 
                        : "bg-muted/50 dark:bg-muted/20 text-foreground rounded-tl-sm border border-border/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-muted/50 dark:bg-muted/20 text-foreground rounded-tl-sm border border-border/50 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (only show if not typing and few messages) */}
            {messages.length < 5 && !isTyping && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((sq) => (
                  <button
                    key={sq.key}
                    onClick={() => handleSend(sq.text)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                  >
                    <Translate>{sq.text}</Translate>
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border/50">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about our impact..."
                  className="flex-1 bg-muted/50 border border-border/50 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  dir="auto"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="rounded-full w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shrink-0 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
