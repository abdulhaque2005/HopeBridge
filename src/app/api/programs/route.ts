import { NextResponse } from 'next/server';

export async function GET() {
  // Simulating a realistic Government / Global NGO API response for a Hackathon
  const realTimePrograms = [
    {
      id: "api-gov-1",
      title: "National Flood Relief Fund (Assam & Bihar)",
      description: "Emergency response and rehabilitation for families affected by the recent severe floods. Real-time monitoring by the National Disaster Management Authority.",
      category: "Disaster Relief",
      image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      raised: 3800000,
      goal: 4500000,
      verifiedBy: "Ministry of Health",
      urgent: true
    },
    {
      id: "api-gov-4",
      title: "Jal Jeevan Mission - Clean Water",
      description: "Installing solar-powered water purification systems in drought-prone areas to ensure safe drinking water.",
      category: "Clean Water",
      image: "https://images.unsplash.com/photo-1541844053986-bc48a4ad8490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
      image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
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
      image: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      raised: 2100000,
      goal: 2500000,
      verifiedBy: "Govt Welfare",
      urgent: true
    }
  ];

  return NextResponse.json(realTimePrograms);
}
