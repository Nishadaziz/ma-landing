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
        title="Duolingo English Test Course in Bangladesh | DuoMate"
        description="Best Duolingo English Test preparation in Bangladesh. Join our 21-day crash course or 3-month complete program with mock tests, speaking practice, and expert guidance."
        canonicalPath="/"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      {/* HERO */}
      <HeroSection />

      {/* TRUST STATS */}
      <DETStatsSection />

      {/* SEO INTRO */}
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
          Duolingo English Test Preparation in Bangladesh
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          Looking for a complete <strong>Duolingo English Test course in Bangladesh</strong>? 
          DuoMate helps students prepare effectively with structured lessons, real exam practice, 
          and proven strategies to achieve high scores.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Whether you want to prepare fast with our <strong>21-day crash course</strong> or build 
          strong English skills through our <strong>3-month program</strong>, we guide you step by step.
        </p>
      </section>

      {/* SERVICES / PROGRAMS */}
      <DETServicesSection />

      {/* INTERNAL SEO LINK */}
      <section className="mx-auto max-w-[900px] px-4 py-12 text-center">
        <p className="text-lg leading-relaxed text-slate-600">
          Explore our complete guide to the{" "}
          <Link
            to="/duolingo-english-test-course-bangladesh"
            className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
          >
            Duolingo English Test course in Bangladesh
          </Link>{" "}
          and learn how our students consistently improve their scores.
        </p>
      </section>

      {/* MID CTA (NEW - IMPORTANT) */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Start Your Preparation Today
        </h2>
        <p className="mt-3 text-slate-600">
          Book a free consultation and get a personalized study plan.
        </p>

        <Link
          to="/book-test"
          className="mt-5 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Book Free Consultation
        </Link>
      </section>

      {/* FINAL CTA */}
      <BookCTASection />
    </>
  );
}