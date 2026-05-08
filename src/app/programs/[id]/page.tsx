import { programs } from "@/data/programs";
import { notFound } from "next/navigation";
import ProgramDetailClient from "./program-detail-client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const program = programs.find((p) => p.id === resolvedParams.id);
  
  if (!program) {
    return {
      title: "Program Not Found | HopeBridge",
    };
  }

  return {
    title: `${program.title} | HopeBridge Foundation`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const program = programs.find((p) => p.id === resolvedParams.id);

  if (!program) {
    notFound();
  }

  return <ProgramDetailClient program={program} />;
}
