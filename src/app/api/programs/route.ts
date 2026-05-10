import { NextResponse } from 'next/server';
export async function GET() {
  const realTimePrograms = [
    {
      id: "api-gov-1",
      title: "National Flood Relief Fund (Assam & Bihar)",
      description: "Emergency response and rehabilitation for families affected by the recent severe floods. Real-time monitoring by the National Disaster Management Authority.",
      category: "Disaster Relief",
      image: "/images/disaster-relief.png",
      raised: 3450000,
      goal: 5000000,
      verifiedBy: "NDMA",
      urgent: true
    },
    {
      id: "api-gov-2",
      title: "Rural Education Initiative 2026",
      description: "Supporting primary education infrastructure in remote villages under the new national education mandate.",
      category: "Education",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      raised: 1200000,
      goal: 2000000,
      verifiedBy: "Ministry of Education",
      urgent: false
    },
    {
      id: "api-gov-3",
      title: "National Health Mission - Pediatric Care",
      description: "Providing essential pediatric medical supplies and life-saving equipment to district hospitals across 5 states.",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      raised: 3800000,
      goal: 4500000,
      verifiedBy: "Ministry of Health",
      urgent: true
    },
    {
      id: "api-gov-4",
      title: "Rural Village Development Program",
      description: "Holistic development including clean water, solar energy, and community centers in underprivileged rural regions.",
      category: "Infrastructure",
      image: "/images/village-development.png",
      raised: 850000,
      goal: 1500000,
      verifiedBy: "Jal Shakti",
      urgent: false
    },
    {
      id: "api-gov-5",
      title: "Women Empowerment & Skill Center",
      description: "Setting up vocational training centers for rural women to gain financial independence and skills.",
      category: "Livelihood",
      image: "/images/Women Empowerment Initiative.png",
      raised: 550000,
      goal: 1000000,
      verifiedBy: "Skill India",
      urgent: false
    },
    {
      id: "api-gov-6",
      title: "Winter Relief for Homeless Shelters",
      description: "Distributing thermal wear, blankets, and essential winter supplies to registered homeless shelters nationwide.",
      category: "Social Welfare",
      image: "/images/Rural Food Distribution.png",
      raised: 2100000,
      goal: 2500000,
      verifiedBy: "Govt Welfare",
      urgent: true
    }
  ];
  return NextResponse.json(realTimePrograms);
}
