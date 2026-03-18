import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import ExperienceSection from "@/components/ExperienceSection";
import JetSkiSection from "@/components/JetSkiSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FleetSection />
    <ExperienceSection />
    <JetSkiSection />
    <GallerySection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
