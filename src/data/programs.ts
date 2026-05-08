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
    longDescription: "Millions of children drop out of school due to a lack of resources. Our Education Support Program provides comprehensive support to children in underserved communities. From school supplies and uniforms to tuition fees and after-school tutoring, we ensure every child has access to quality education. We partner with local schools and educators to create sustainable learning environments. Since 2019, we've helped over 3,200 children gain access to primary and secondary education, with a 95% retention rate. Every child deserves the power of education.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
    longDescription: "Our Medical Relief Fund brings healthcare to communities that need it most. We organize mobile medical camps, provide essential medicines, and fund surgeries for critical patients who cannot afford treatment. Our team of volunteer doctors and nurses conducts regular health screenings, maternal care programs, and vaccination drives. We've treated over 15,000 patients since inception, focusing on preventable diseases and maternal health.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
    longDescription: "The Women Empowerment Program provides vocational training, micro-financing, and mentorship to women in underserved communities. From tailoring and handicrafts to digital literacy and entrepreneurship, we equip women with skills to achieve financial independence. Our micro-loan program has a 97% repayment rate and has helped launch over 400 women-led small businesses.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
    longDescription: "The Zero Hunger Initiative is our flagship food security program. We operate community kitchens, distribute food packages, and run nutrition education workshops. Our network of volunteers prepares and delivers over 1,000 meals daily to families, elderly individuals, and homeless populations. We also partner with local farmers to source fresh produce, supporting both food security and local agriculture.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
  }
];

export const categories = ["All", "Education", "Food", "Healthcare", "Empowerment", "Emergency", "Infrastructure"];
