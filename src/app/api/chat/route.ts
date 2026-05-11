import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Hope AI", the official AI assistant for HopeBridge Foundation — a trusted NGO platform dedicated to fighting hunger, poverty, and educational inequality.

CRITICAL RULES:
1. ALWAYS respond in the SAME LANGUAGE the user writes in. If they write in Hindi (Devanagari or Roman), respond in Hindi. If Urdu, respond in Urdu. If Gujarati, respond in Gujarati. If English, respond in English. Match their language exactly.
2. Keep responses concise (2-4 sentences max unless they ask for detail).
3. Be warm, empathetic, and professional.
4. If asked something unrelated to NGO/charity work, politely redirect to HopeBridge topics.

ABOUT HOPEBRIDGE:
- Founded in 2019, HopeBridge bridges the gap between resources and those who need them most.
- Focus areas: Education, Healthcare, Food Security, Disaster Relief, Women Empowerment.
- 90% of donations go directly to field programs, 7% admin, 3% fundraising.
- ₹4 Crore+ total funds raised, 12,000+ active donors, 850+ volunteers, operations in 5 countries.
- Key programs: Rural Education Initiative, Flood Relief Fund (Assam & Bihar), Hope Scholarship, Village Health Clinics.
- Partners: UNICEF, Red Cross, WHO, Save the Children, World Food Programme, UNDP.
- Contact: hello@hopebridge.org | Udyog Vihar, Gurugram, India.
- Donation methods: UPI, Credit/Debit Cards, Net Banking. All donations are tax-exempt under 80G.
- Success story: Amina, a 12-year-old from a flood-affected village, received Hope Scholarship support and is now the top student in her district.

DONATION AMOUNTS IMPACT:
- ₹500 = Clean drinking water + meals for a child for 1 month
- ₹2,000 = Complete digital learning kit for rural students  
- ₹5,000 = Healthcare checkup camp for 50 villagers
- ₹10,000 = Full scholarship for 1 year for a rural student

Always encourage users to visit the Donate page or Contact page when appropriate.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Using Pollinations AI (Free, No Key Required, 100% Real AI)
    // This solves the Gemini "Quota Exceeded" issue for the hackathon
    const payload = {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        }))
      ],
      model: "searchgpt" // Or "openai" / "llama"
    };

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return getSmartFallbackResponse(messages);
    }

    const text = await response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    try {
      const { messages } = await req.clone().json();
      return getSmartFallbackResponse(messages);
    } catch(e) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

function getSmartFallbackResponse(messages: any[]) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  
  // Advanced intent matching for hackathon
  if (lastMessage.match(/kaise ho|how are you|kya haal/)) {
    return NextResponse.json({ message: "Main bilkul theek hoon! Main Hope AI hoon. Aapki kya madad kar sakta hoon aaj? Aap NGO ke baare mein jaan sakte hain ya donate kar sakte hain." });
  } 
  if (lastMessage.match(/hi|hello|hey|namaste|salaam|kem cho/)) {
    return NextResponse.json({ message: "Namaste! Main Hope AI hoon. Aapki kaise madad kar sakta hoon? Aap donations, programs, ya contact details ke baare mein pooch sakte hain." });
  }
  if (lastMessage.match(/kaun ho tum|who are you|tumhara naam/)) {
    return NextResponse.json({ message: "Main Hope AI hoon, HopeBridge NGO ka official assistant. Main yahan aapko hamare relief programs aur donation process mein help karne ke liye hoon." });
  }
  if (lastMessage.match(/donate|process|kaise karein|give|paisa|donation|help/)) {
    return NextResponse.json({ message: "Donating is very easy and 100% transparent. Aap top pe 'Donate Now' button par click kar sakte hain. Hum UPI (PhonePe, GPay), Cards, aur Net Banking accept karte hain. Sabhi donations 80G tax-exempt hain." });
  }
  if (lastMessage.match(/impact|spend|money|kharch|kahan jata hai/)) {
    return NextResponse.json({ message: "Aapke donation ka 90% seedha hamare field programs (Education, Health, Relief) mein jaata hai. Baaki 7% admin aur 3% fundraising mein use hota hai. Hum 100% transparent hain." });
  }
  if (lastMessage.match(/urgent|now|emergency|badh|flood/)) {
    return NextResponse.json({ message: "Abhi hamara sabse urgent campaign 'Assam Flood Relief' chal raha hai. Hazaaron logo ko clean water aur shelter ki zarurat hai. Aap 'Disaster Relief' category mein donate kar sakte hain." });
  }
  if (lastMessage.match(/trust|transparent|safe|real|fake|scam/)) {
    return NextResponse.json({ message: "HopeBridge puri tarah se safe aur verified hai. Humein NGO Darpan, GiveIndia, aur CRISIL se verification mila hua hai. Aap hamara 'Growth & Impact' dashboard dekh sakte hain." });
  }
  if (lastMessage.match(/who|about|vision|founder|kab start/)) {
    return NextResponse.json({ message: "HopeBridge 2019 mein start hua tha. Hamara vision hai resources aur zaruratmand logo ke beech ka gap khatam karna. Hamari operations 5 countries mein hain aur 850+ volunteers kaam kar rahe hain." });
  }
  if (lastMessage.match(/contact|email|phone|address|milna/)) {
    return NextResponse.json({ message: "Aap humse hello@hopebridge.org par contact kar sakte hain ya +91-9876543210 par call kar sakte hain. Hamara head office Udyog Vihar, Gurugram mein hai." });
  }
  if (lastMessage.match(/education|padhai|school/)) {
    return NextResponse.json({ message: "Hamara 'Rural Education Initiative' remote gaon mein bacchon ko school supplies aur infrastructure provide karta hai. Aap ₹1500 donate karke 2 bacchon ki education sponsor kar sakte hain." });
  }
  if (lastMessage.match(/health|medical|bimari|hospital/)) {
    return NextResponse.json({ message: "Healthcare sector mein hum district hospitals ko pediatric medical supplies dete hain. Humara 'Village Health Clinics' program bhi bahut successful raha hai." });
  }
  if (lastMessage.match(/thank|shukriya|dhanyawad/)) {
    return NextResponse.json({ message: "Aapka bahut bahut shukriya! Agar aapko aur kuch janna ho, toh zaroor poochein. Have a great day!" });
  }
  if (lastMessage.match(/bye|goodbye|phir milenge/)) {
    return NextResponse.json({ message: "Alvida! Apna khayal rakhein. HopeBridge ki taraf se aapko shubhkamnayein." });
  }
  if (lastMessage.match(/kya karte ho|work|kaam/)) {
    return NextResponse.json({ message: "Hum education, healthcare, disaster relief, aur women empowerment ke field mein kaam karte hain taaki poverty aur inequality ko khatam kiya ja sake." });
  }
  
  // Default fallback if no intent matches
  return NextResponse.json({ message: "Maaf kijiyega, mujhe is baare mein thik se nahi pata. Par main aapko HopeBridge NGO, donations, aur hamare programs ke baare mein zaroor bata sakta hoon. Aap kis baare mein janna chahenge?" });
}
