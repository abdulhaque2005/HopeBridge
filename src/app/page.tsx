import HeroSection from "@/sections/hero";
import ImpactStats from "@/sections/impact-stats";
import FeaturedPrograms from "@/sections/featured-programs";
import LiveActivity from "@/sections/live-activity";
import SuccessStories from "@/sections/success-stories";
import Testimonials from "@/sections/testimonials";
import Newsletter from "@/sections/newsletter";
import CTASection from "@/sections/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ImpactStats />
      <FeaturedPrograms />
      <LiveActivity />
      <SuccessStories />
      <CTASection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
