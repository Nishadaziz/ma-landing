import HeroSection from "../components/HeroSection";
import DETStatsSection from "../components/DETStatsSection";
import DETServicesSection from "../components/DETServicesSection";
import BookCTASection from "../components/BookCTASection";
import SEO from "../components/seo/SEO";

export default function Home() {
  return (
    <>
      {/* SEO */}
      <SEO
        title="DuoMate – Duolingo English Test Coaching in Bangladesh"
        description="Prepare for the Duolingo English Test with expert coaching, mock tests, speaking practice, and exclusive discounts in Bangladesh."
        canonicalPath="/"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      {/* Page content */}
      <HeroSection />
      <DETStatsSection />
      <DETServicesSection />
      <BookCTASection />
    </>
  );
}
