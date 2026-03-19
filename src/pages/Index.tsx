import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import BookingSection from "@/components/BookingSection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen pb-16 md:pb-0">
    <Navbar />
    <HeroSection />
    <FleetSection />
    <BookingSection />
    <ExperienceSection />
    <GallerySection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
