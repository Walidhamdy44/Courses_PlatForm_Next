import HomeNavbar from "./_components-home/HomeNavbar";
import HeroSection from "./_components-home/HeroSection";
import TrustedLogos from "./_components-home/TrustedLogos";
import FeaturesSection from "./_components-home/FeaturesSection";
import TestimonialsSection from "./_components-home/TestimonialsSection";
import PromoBanner from "./_components-home/PromoBanner";
import NewsletterSection from "./_components-home/NewsletterSection";
import HomeFooter from "./_components-home/HomeFooter";

export default function HomePage() {
  return (
    <main className="bg-[#f9f9f9] min-h-screen text-gray-900">
      <HomeNavbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <TrustedLogos />
      <NewsletterSection />
      <PromoBanner />
      <HomeFooter />
    </main>
  );
}
