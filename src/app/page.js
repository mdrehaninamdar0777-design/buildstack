import LandingNavbar from "@/components/marketing/navbar/LandingNavbar";
import Hero from "@/components/marketing/hero/Hero";
import PlatformStats from "@/components/marketing/stats/PlatformStats";
import Features from "@/components/marketing/features/Features";
import HowItWorks from "@/components/marketing/workflow/HowItWorks";
import FeaturedRoadmaps from "@/components/marketing/roadmaps/FeaturedRoadmaps";
import PlatformPreview from "@/components/marketing/preview/PlatformPreview";
import WhyBuildStack from "@/components/marketing/why/WhyBuildStack";
import Testimonials from "@/components/marketing/testimonials/Testimonials";
import FaqAccordion from "@/components/marketing/faq/FaqAccordion";
import CTA from "@/components/marketing/cta/CTA";
import Footer from "@/components/marketing/footer/Footer";

export const metadata = {
  title: "BuildStack — Learn Development the Right Way",
  description:
    "Structured roadmaps, curated resources and progress tracking to help you go from beginner to job-ready developer.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <LandingNavbar />
      <main>
        <Hero />
        <PlatformStats />
        <Features />
        <HowItWorks />
        <FeaturedRoadmaps />
        <PlatformPreview />
        <WhyBuildStack />
        <Testimonials />
        <FaqAccordion />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}