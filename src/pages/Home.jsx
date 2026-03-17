import HeroSection from "../components/HeroSection";
import DETStatsSection from "../components/DETStatsSection";
import DETServicesSection from "../components/DETServicesSection";
import BookCTASection from "../components/BookCTASection";
import SEO from "../components/seo/SEO";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <SEO
        title="DuoMate | Duolingo, IELTS & PTE Preparation in Bangladesh"
        description="Prepare for Duolingo English Test, IELTS, and PTE with expert guidance, mock tests, speaking practice, and structured lessons at DuoMate Bangladesh."
        canonicalPath="/"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      <HeroSection />
      <DETStatsSection />

      {/* SEO Intro Section */}
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
          English Test Preparation in Bangladesh
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          DuoMate provides structured preparation for the
          <strong> Duolingo English Test</strong>, <strong> IELTS</strong>, and
          <strong> PTE</strong> in Bangladesh. Our programs include guided
          lessons, exam-style practice, mock tests, and clear strategies to help
          students achieve their target scores with confidence.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Whether you are preparing for the <strong>Duolingo English Test</strong>
          quickly with our 21-day crash course or building stronger English
          skills with our 3-month program, DuoMate helps you practice
          effectively and improve your performance across reading, listening,
          speaking, and writing.
        </p>
      </section>

      <DETServicesSection />

      {/* Clean SEO Link Section */}
      <section className="mx-auto max-w-[900px] px-4 py-12 text-center">
        <p className="text-lg leading-relaxed text-slate-600">
          Looking for a complete guide to the{" "}
          <Link
            to="/duolingo-english-test-course-bangladesh"
            className="font-semibold text-emerald-700 underline-offset-4 transition hover:text-emerald-800 hover:underline"
          >
            Duolingo English Test course in Bangladesh
          </Link>
          ? Learn about our preparation approach, course structure, and how
          students improve their DET scores with DuoMate.
        </p>
      </section>

      <BookCTASection />
    </>
  );
}