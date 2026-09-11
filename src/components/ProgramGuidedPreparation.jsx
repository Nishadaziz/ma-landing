import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Target,
  TrendingUp,
} from "lucide-react";
import SEO from "./seo/SEO";
import { students, faqs } from "./program3months/program3MonthsData";
import { InfoCard, FAQItem, TestimonialSlide } from "./program21days/Program21DaysParts";
import { trackViewContent } from "../lib/facebookPixel";
import det3months from "../assets/det3months.webp";

const REGULAR_FEE = 6000;
const COURSE_FEE = 5000;
const CHECKOUT_LINK = "/checkout/guided-preparation";

/* ---------------- MAIN COMPONENT ---------------- */

export default function ProgramGuidedPreparation() {
  useEffect(() => {
    trackViewContent({
      content_name: "DET Guided Preparation",
      content_category: "Duolingo Course",
      source: "Course Page",
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [openedFaqs, setOpenedFaqs] = useState([0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % students.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + students.length) % students.length);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % students.length);

  const handleFaqClick = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
    setOpenedFaqs((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "DET Guided Preparation",
    description:
      "A guided Duolingo English Test preparation program covering every DET topic with real, exam-style practice questions, vocabulary, grammar, speaking, and writing, plus regular mock tests and score strategy.",
    provider: { "@type": "Organization", name: "DET Juicy" },
    courseMode: "online",
    educationalLevel: "Beginner to Advanced",
    inLanguage: ["en", "bn"],
  };

  return (
    <>
      <SEO
        title="DET Guided Preparation | Duomate"
        description="Build real skills and aim for a higher DET score with our Guided Preparation program — ৳5,000/month, covering every DET topic with real exam-style practice."
        canonicalPath="/programs/guided-preparation"
        ogImage="https://www.duomatebd.com/og-program-3-months.png"
      />

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>

      <div className="mx-auto max-w-[1150px] px-4 pb-24 pt-5 md:pb-12 md:pt-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-xs">
                DET Guided Preparation
              </div>

              <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Build real skills and aim for a{" "}
                <span className="text-orange-500">higher DET score</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
                Best for students who want strong improvement. This program
                covers every DET topic with structured lessons and real,
                exam-style practice questions — vocabulary, grammar,
                speaking, and writing, step-by-step, plus mocks and a clear
                strategy.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700">
                  <Target className="h-4 w-4" />
                  Full 4-Skill Preparation
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700">
                  <TrendingUp className="h-4 w-4" />
                  Guided Roadmap
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={CHECKOUT_LINK}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/book-test"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
                >
                  Book Mock / Slot
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-full">
              <img
                src={det3months}
                alt="DET Guided Preparation"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

              <div className="absolute left-4 right-4 top-4 overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 shadow-xl md:left-6 md:right-6 md:p-5">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50 md:text-[11px]">
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                  Course fee per month
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white md:text-4xl">
                    ৳{COURSE_FEE.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm font-semibold text-white/50 line-through">
                    ৳{REGULAR_FEE.toLocaleString("en-BD")}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-white/60">
                  Billed monthly, with{" "}
                  <span className="font-bold text-white">
                    complete topic coverage
                  </span>{" "}
                  and real practice tests.
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                  Guided roadmap
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-900">
                  Vocabulary, grammar, speaking, and writing — built step by step!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Info grid */}
        <section className="mt-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<ClipboardCheck className="h-5 w-5 md:h-6 md:w-6" />}
              title="Test Practice"
              value="Real DET Questions"
              subtext="Authentic, exam-style practice"
            />
            <InfoCard
              icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
              title="Skills Covered"
              value="4 Core Skills"
              subtext="Reading, Writing, Listening, Speaking"
              delay="[animation-delay:120ms]"
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5 md:h-6 md:w-6" />}
              title="Format"
              value="Live Online"
              subtext="Regular mocks + feedback"
              delay="[animation-delay:240ms]"
            />
          </div>
        </section>

        {/* Pricing */}
        <section className="relative mt-10 overflow-hidden rounded-[34px] border border-emerald-100 bg-gradient-to-br from-[#ecfdf5] via-white to-[#e0f2fe] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10">
          <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
              Course Fee
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="text-4xl font-extrabold text-slate-900 md:text-5xl">
                ৳{COURSE_FEE.toLocaleString("en-BD")}
              </span>
              <span className="text-lg font-bold text-slate-400 line-through">
                ৳{REGULAR_FEE.toLocaleString("en-BD")}
              </span>
              <span className="text-sm font-semibold text-slate-500">/ month</span>
            </div>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              Covers every DET topic with structured lessons and real,
              exam-style practice questions.
            </p>

            <div className="mt-7">
              <Link
                to={CHECKOUT_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Who should enroll / What you'll get */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Who should enroll?
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                "You want strong improvement and a higher target score.",
                "You can give consistent time weekly for better results.",
                "You want to build vocabulary + grammar properly.",
                "You want structured practice + mock tests throughout.",
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Outcome you can expect
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                "More accurate writing & smoother speaking",
                "Higher confidence with real test timing",
                "Better understanding of scoring patterns",
                "Long-term improvement, not only quick tricks",
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative mt-12 overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-orange-50 via-white to-emerald-50 p-6 shadow-sm md:p-10">
          <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600 shadow-sm">
              Student feedback
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
              What students say
            </h2>

            <p className="mt-3 text-sm text-slate-500 md:text-base">
              Real results. Real scores. Real confidence.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div
              key={students[activeIndex].name}
              className="transition-all duration-700 ease-in-out animate-[fadeInUp_0.7s_ease-out]"
            >
              <TestimonialSlide student={students[activeIndex]} />
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {students.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "w-8 bg-gradient-to-r from-orange-500 to-emerald-500"
                        : "w-2.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-7 space-y-4">
            {faqs.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openFaq === index}
                wasOpened={openedFaqs.includes(index)}
                onClick={() => handleFaqClick(index)}
              />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative mt-12 overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-sm md:p-10">
          <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/90 md:text-xs">
              Ready to start?
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Build real, lasting skills with guided preparation
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
              Enroll today at{" "}
              <span className="font-extrabold text-white">
                ৳{COURSE_FEE.toLocaleString("en-BD")}/month
              </span>{" "}
              — and start practicing with real DET questions today.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={CHECKOUT_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1150px] gap-3">
          <Link
            to={CHECKOUT_LINK}
            className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm"
          >
            Enroll Now — ৳{COURSE_FEE.toLocaleString("en-BD")}/month
          </Link>
        </div>
      </div>
    </>
  );
}
