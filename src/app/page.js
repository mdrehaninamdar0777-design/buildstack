import LandingNavbar from "@/components/marketing/navbar/LandingNavbar";
import Hero from "@/components/marketing/hero";
import Features from "@/components/marketing/features/Features";
import FeaturedRoadmaps from "@/components/marketing/roadmaps/FeaturedRoadmaps";
import TrackLearning from "@/components/marketing/learning/TrackLearning";
import WhyBuildStack from "@/components/marketing/why/WhyBuildStack";
import Testimonials from "@/components/marketing/testimonials/Testimonials";
import CTA from "@/components/marketing/cta/CTA";
import Footer from "@/components/marketing/footer/Footer";


export default function HomePage() {
  return (
    <>
      <LandingNavbar />

      <main>
        <Hero />
        <Features />
        <FeaturedRoadmaps />
         <TrackLearning />
         <WhyBuildStack />
         <Testimonials />
         <CTA/>
         <Footer />
        
      </main>
    </>
  );
}