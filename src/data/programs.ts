export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  location: string;
  impactStatistics: { label: string; value: string }[];
  beneficiaryImages: string[];
  volunteerSupportDetails: string;
  faqs: { question: string; answer: string }[];
}

export const programs: Program[] = [
  {
    id: "education-for-all",
    title: "Education Support Program",
    description: "Provide school supplies, books, and tuition for children in underprivileged areas of rural India.",
    longDescription: "Millions of children drop out of school due to a lack of resources. Our Education Support Program provides comprehensive support to children in underserved communities. From school supplies and uniforms to tuition fees and after-school tutoring, we ensure every child has access to quality education.\n\nWe partner with local schools and educators to create sustainable learning environments. Since 2019, we've helped over 3,200 children gain access to primary and secondary education, with a 95% retention rate.\n\nA small contribution helped Amina return to school after losing her home during floods. Today, she dreams of becoming a doctor. Every child deserves the power of education.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Education",
    raised: 1200000,
    goal: 1500000,
    donors: 1450,
    daysLeft: 12,
    location: "Bihar & Uttar Pradesh, India",
    impactStatistics: [
      { label: "Children Educated", value: "3,200+" },
      { label: "Schools Supported", value: "45+" },
      { label: "Retention Rate", value: "95%" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "We urgently need volunteer teachers for subjects like Mathematics and English. Remote tutoring options are available.",
    faqs: [
      { question: "How is my donation used?", answer: "100% of donations go directly to school supplies, tuition fees, and educational infrastructure for children in need." },
      { question: "Can I sponsor a specific child?", answer: "Yes! Our child sponsorship program allows you to directly support and follow the progress of a specific student." },
      { question: "What regions do you serve?", answer: "We currently focus heavily on rural areas across Bihar and Uttar Pradesh, India." },
    ],
  },
  {
    id: "medical-relief",
    title: "Emergency Medical Aid",
    description: "Provide essential healthcare, medicines, and medical camps in remote villages.",
    longDescription: "Our Medical Relief Fund brings healthcare to communities that need it most. We organize mobile medical camps, provide essential medicines, and fund surgeries for critical patients who cannot afford treatment.\n\nOur team of volunteer doctors and nurses conducts regular health screenings, maternal care programs, and vaccination drives. We've treated over 15,000 patients since inception, focusing on preventable diseases and maternal health.\n\nLast year alone, we funded 120 surgeries for children born with cleft palates, giving them a new smile and a new life.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Healthcare",
    raised: 850000,
    goal: 1000000,
    donors: 856,
    daysLeft: 25,
    location: "Odisha & Jharkhand, India",
    impactStatistics: [
      { label: "Patients Treated", value: "15,000+" },
      { label: "Medical Camps", value: "120+" },
      { label: "Surgeries Funded", value: "450+" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "We are looking for registered nurses, doctors, and medical students to join our upcoming rural medical camps.",
    faqs: [
      { question: "What medical services do you provide?", answer: "We offer primary healthcare, dental care, eye screenings, maternal care, vaccinations, and emergency surgical funding." },
      { question: "Are the doctors licensed?", answer: "Yes, all medical professionals in our program are fully licensed and certified practitioners who volunteer their expertise." },
      { question: "How do you select communities to serve?", answer: "We use data-driven assessments to identify communities with the greatest healthcare gaps and lowest access to medical facilities." },
    ],
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment Initiative",
    description: "Skill training, micro-loans, and support systems for women in vulnerable communities.",
    longDescription: "The Women Empowerment Program provides vocational training, micro-financing, and mentorship to women in underserved communities. From tailoring and handicrafts to digital literacy and entrepreneurship, we equip women with skills to achieve financial independence.\n\nOur micro-loan program has a 97% repayment rate and has helped launch over 400 women-led small businesses.\n\nFatima, a single mother of three, used a ₹15,000 micro-loan to start a small tailoring business. Today, she employs two other women from her village and sends all three children to school.",
    image: "/images/Women Empowerment Initiative.png",
    category: "Empowerment",
    raised: 420000,
    goal: 500000,
    donors: 420,
    daysLeft: 18,
    location: "Rajasthan, India",
    impactStatistics: [
      { label: "Women Trained", value: "1,200+" },
      { label: "Businesses Started", value: "400+" },
      { label: "Micro-loans Granted", value: "₹2.5Cr+" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "Mentors required for financial literacy and basic business management. Virtual mentorship is highly encouraged.",
    faqs: [
      { question: "What skills do you teach?", answer: "We offer training in tailoring, handicrafts, digital literacy, basic accounting, and small business management." },
      { question: "How do micro-loans work?", answer: "Women receive small, interest-free loans to start businesses. They repay over 12-18 months, and funds are recycled to help more women." },
    ],
  },
  {
    id: "rural-food",
    title: "Rural Food Distribution",
    description: "Distribute nutritious meals and food supplies to families facing severe food insecurity.",
    longDescription: "The Zero Hunger Initiative is our flagship food security program. We operate community kitchens, distribute food packages, and run nutrition education workshops.\n\nOur network of volunteers prepares and delivers over 1,000 meals daily to families, elderly individuals, and homeless populations. We also partner with local farmers to source fresh produce, supporting both food security and local agriculture.\n\n₹500 feeds 5 children for an entire week. ₹1,500 provides a month's ration for a family of four. Every meal we serve is a step toward ending hunger in India.",
    image: "/images/Rural Food Distribution.png",
    category: "Food",
    raised: 310000,
    goal: 400000,
    donors: 295,
    daysLeft: 10,
    location: "Maharashtra, India",
    impactStatistics: [
      { label: "Meals Distributed", value: "12,450+" },
      { label: "Families Supported", value: "850+" },
      { label: "Community Kitchens", value: "12" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1593113580332-ceb47c1368c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "Volunteers needed for food packing, logistics, and delivery in rural Maharashtra regions.",
    faqs: [
      { question: "How many meals does my donation provide?", answer: "A ₹1000 donation provides approximately 50 nutritious meals." },
      { question: "Do you handle food allergies?", answer: "Yes. We prepare meals that cater to common dietary restrictions and allergies, ensuring safe nutrition for everyone." },
    ],
  },
  {
    id: "emergency-relief",
    title: "Disaster & Emergency Relief",
    description: "Rapid response teams providing shelter, food, water, and medical aid during natural disasters and emergencies.",
    longDescription: "When disasters strike, every minute counts. Our Emergency Relief program deploys rapid response teams within 24 hours to affected areas, providing life-saving essentials including clean drinking water, emergency food supplies, temporary shelter kits, and immediate medical care.\n\nFrom the devastating floods in Assam to the earthquake aftermath in Nepal, our teams have been on the ground, working tirelessly to save lives and rebuild communities.\n\nIn the 2024 Bihar floods, we evacuated 2,300 families, distributed 50,000 liters of clean water, and set up 15 temporary medical stations. But the need never stops — climate change means disasters are becoming more frequent and severe.\n\nYour donation keeps our emergency stockpiles ready and our teams trained for the next crisis.",
    image: "/images/disaster-relief.png",
    category: "Emergency",
    raised: 680000,
    goal: 900000,
    donors: 720,
    daysLeft: 8,
    location: "Pan-India Emergency Network",
    impactStatistics: [
      { label: "People Rescued", value: "8,500+" },
      { label: "Relief Camps", value: "65+" },
      { label: "Clean Water (Liters)", value: "200K+" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "We need volunteers with first aid training, logistics experience, or those willing to help with supply chain coordination during emergencies.",
    faqs: [
      { question: "How quickly do you respond to disasters?", answer: "Our rapid response teams are deployed within 24 hours of a disaster. We maintain pre-positioned emergency supplies in strategic locations across India." },
      { question: "What supplies are included in relief kits?", answer: "Each family relief kit includes a waterproof tarpaulin shelter, blankets, water purification tablets, a 7-day dry ration supply, basic medical supplies, and hygiene essentials." },
      { question: "Can I donate supplies instead of money?", answer: "Yes! We accept in-kind donations at our regional warehouses. Contact us for a list of currently needed supplies and drop-off locations." },
    ],
  },
  {
    id: "village-development",
    title: "Village Development Program",
    description: "Holistic rural development including clean water, sanitation, solar power, and community infrastructure.",
    longDescription: "Our Village Development Program takes a holistic approach to transforming rural communities. We don't just solve one problem — we work with villages to address the interconnected challenges of water, sanitation, energy, and infrastructure.\n\nEach village undergoes a comprehensive needs assessment, and we co-create a development plan with community leaders. Our projects include drilling borewells, installing solar-powered water pumps, building community toilets, constructing village roads, and setting up solar micro-grids.\n\nIn Sundarganj village, Madhya Pradesh, we installed a solar-powered water system that now serves 450 families. Women who previously walked 3 km daily for water now have it at their doorstep. Children who missed school for water collection now attend classes regularly.\n\nWe've transformed 28 villages so far, but India has over 600,000 villages — and thousands need our help.",
    image: "/images/village-development.png",
    category: "Infrastructure",
    raised: 540000,
    goal: 750000,
    donors: 380,
    daysLeft: 30,
    location: "Madhya Pradesh & Chhattisgarh, India",
    impactStatistics: [
      { label: "Villages Transformed", value: "28" },
      { label: "Borewells Drilled", value: "85+" },
      { label: "Solar Systems Installed", value: "45+" },
    ],
    beneficiaryImages: [
      "https://images.unsplash.com/photo-1541844053986-bc48a4ad8490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    volunteerSupportDetails: "Engineers, architects, and project managers are welcome to join our village development projects. We also need skilled technicians for solar panel installation and maintenance.",
    faqs: [
      { question: "How long does it take to transform a village?", answer: "A typical village transformation takes 12-18 months, from initial assessment to completion. We stay involved for an additional year to ensure sustainability." },
      { question: "How do you select villages?", answer: "We partner with local government bodies and use data from census surveys to identify villages with the most critical infrastructure gaps." },
      { question: "Can a corporate sponsor an entire village?", answer: "Absolutely! Our Corporate Village Sponsorship program allows businesses to fund the complete development of a single village, with full transparency and naming rights." },
    ],
  },
];

export const categories = ["All", "Education", "Food", "Healthcare", "Empowerment", "Emergency", "Infrastructure"];