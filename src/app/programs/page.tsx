import { Metadata } from "next";
import ProgramsPageClient from "./programs-client";
export const metadata: Metadata = {
  title: "Our Programs | HopeBridge Foundation",
  description: "Explore our initiatives in education, food security, healthcare, women empowerment, emergency relief, and clean water.",
};
export default function ProgramsPage() {
  return <ProgramsPageClient />;
}
