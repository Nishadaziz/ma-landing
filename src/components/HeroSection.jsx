import { Link } from "react-router-dom";
import heroImage from "../assets/hero-study.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[position:70%_center] md:bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* No overlay (keep original image look) */}
      <div className="absolute inset-0 bg-black/0" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 lg:px-12">
        <div className="flex min-h-screen items-center pt-24">
          <div className="max-w-2xl space-y-6 text-white">
            {/* Tags */}
            <div className="inline-flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white/20 px-3 py-1 border border-white/30">
                Duolingo
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 border border-white/30">
                IELTS
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 border border-white/30">
                PTE
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 border border-white/30">
                Mock Tests
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Your most-needed guideline for English proficiency is here.
            </h1>

            {/* Subheadline */}
            <p className="max-w-xl text-base leading-relaxed text-white/95 md:text-lg">
              Practice for Duolingo, IELTS, and PTE with guided lessons,
              exam-style questions, and a clear step-by-step plan.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/programs"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100"
              >
                Enroll Now
              </Link>

              <Link
                to="/book-test"
                className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Book a Test
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
