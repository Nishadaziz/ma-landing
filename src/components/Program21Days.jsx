import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import SEO from "./seo/SEO";
import Program21DaysHero from "./program21days/Program21DaysHero";
import {
  students,
  faqs,
  featureChips,
  syllabusGroups,
} from "./program21days/program21DaysData";
import {
  InfoCard,
  FeaturePill,
  FAQItem,
  TestimonialSlide,
} from "./program21days/Program21DaysParts";
import { trackViewContent } from "../lib/facebookPixel";

import canadaPlane from "../assets/program21days/canada-plane.png";
import testCheck from "../assets/program21days/test-check.png";

/* ---------------- SYLLABUS DRAWER ---------------- */

function SyllabusDrawer({ item, isOpen, onClick }) {
  const Icon = item.icon;

  return (
    <div
      className={`overflow-hidden rounded-[22px] border bg-white shadow-sm transition-all duration-300 ${
        isOpen
          ? "border-emerald-300 shadow-lg shadow-emerald-100/60"
          : "border-slate-200 hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-6 md:py-5"
      >
        <div className="flex items-start gap-3 md:items-center md:gap-4">
          <div
            className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition md:mt-0 md:h-12 md:w-12 ${
              isOpen
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-[11px]">
              {item.label}
            </p>
            <h3 className="mt-1 text-sm font-extrabold leading-snug text-slate-900 md:text-lg">
              {item.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500 md:text-sm">
              {item.desc}
            </p>
          </div>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition md:h-10 md:w-10 ${
            isOpen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-4 pb-4 pt-4 md:px-6 md:pb-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {item.questions.map((question, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {question.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {question.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-7 text-slate-700">
              <span className="font-extrabold text-emerald-700">Focus:</span>{" "}
              {item.focus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COUNTDOWN ---------------- */

function getTimeLeft(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return {
      expired: true,
      isToday: false,
      isUrgent: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    expired: false,
    isToday: days === 0,
    isUrgent: distance <= 1000 * 60 * 60 * 24,
    days,
    hours,
    minutes,
    seconds,
  };
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function Program21Days() {
  useEffect(() => {
    trackViewContent({
      content_name: "21 Days Crash Course",
      content_category: "Duolingo Course",
      source: "Course Page",
    });
  }, []);

  const batchStartDate = useMemo(
    () => new Date("2026-04-10T22:30:00+06:00"),
    []
  );

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(batchStartDate));
  const [openSyllabus, setOpenSyllabus] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [openedFaqs, setOpenedFaqs] = useState([0]);
  const syllabusRef = useRef(null);
  const [autoSyllabusTriggered, setAutoSyllabusTriggered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(batchStartDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [batchStartDate]);

  useEffect(() => {
    if (autoSyllabusTriggered) return;

    const handleScroll = () => {
      if (autoSyllabusTriggered || window.scrollY < 80 || !syllabusRef.current)
        return;

      const rect = syllabusRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85 && rect.bottom > 0) {
        setOpenSyllabus(0);
        setAutoSyllabusTriggered(true);

        setTimeout(() => {
          setOpenSyllabus(null);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [autoSyllabusTriggered]);

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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Duolingo English Test 1 Month Preparation Course",
    description:
      "A one month Duolingo English Test preparation course with structured preparation, real question analysis, speaking and writing practice, and score improvement strategies.",
    provider: {
      "@type": "Organization",
      name: "DET Juicy",
    },
    courseMode: "online",
    educationalLevel: "Beginner to Intermediate",
    inLanguage: ["en", "bn"],
  };

  return (
    <>
      <SEO
        title="Duolingo English Test Course Bangladesh | 1 Month DET Preparation"
        description="Join our 1 month Duolingo English Test preparation course in Bangladesh. 12 live classes, structured preparation, speaking-writing practice, and score-focused strategies."
        canonicalPath="/programs/21-days"
      />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>

      <div className="mx-auto max-w-[1150px] px-4 pb-24 pt-5 md:pb-12 md:pt-10">
        <Program21DaysHero timeLeft={timeLeft} />

        <section className="mt-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Start"
              value="April 10, 2026"
              subtext="Next batch starting April 10"
            />
            <InfoCard
              icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
              title="Total Classes"
              value="12 Classes"
              subtext="1 month focused structure"
              delay="[animation-delay:120ms]"
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Days"
              value="Sat, Mon, Wed"
              subtext="Regular weekly routine"
              delay="[animation-delay:240ms]"
            />
            <div className="hidden lg:block" />
            <InfoCard
              icon={<Clock3 className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Time"
              value="10:30 PM"
              subtext="Online live classes"
              delay="[animation-delay:360ms]"
            />
            <InfoCard
              icon={<Sparkles className="h-5 w-5 md:h-6 md:w-6" />}
              title="Course Fee"
              value="৳4,999"
              subtext={
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 line-through">
                    ৳7,000
                  </span>
                </div>
              }
              delay="[animation-delay:480ms]"
              className="hover:bg-emerald-100/30"
            />
          </div>
        </section>

        <section className="relative mt-10 overflow-hidden rounded-[34px] border border-emerald-100 bg-gradient-to-br from-[#ecfdf5] via-white to-[#e0f2fe] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10">
          <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-200/35 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-20 h-40 w-40 rounded-full bg-cyan-100/40 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
                Full Preparation
              </div>

              <h2 className="bensen-font mt-5 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-3xl md:leading-tight">
                Reading, Writing, Listening, Speaking এর total preparation এক
                মাসের মধ্যে
              </h2>

              <div className="mt-5 max-w-2xl space-y-4 text-sm leading-7 text-slate-700 md:text-base">
                <p>
                  এই কোর্সে Duolingo English Test-এর গুরুত্বপূর্ণ question
                  types structuredভাবে cover করা হবে, যাতে একজন student exam-এর
                  overall pattern, answer expectation, এবং score-focused
                  approach পরিষ্কারভাবে বুঝতে পারে।
                </p>

                <p>
                  প্রতিটি section-এ দেখানো হবে কীভাবে limited time-এর মধ্যে
                  better response তৈরি করতে হয়, কীভাবে smart answering strategy
                  apply করতে হয়, এবং কীভাবে practical exam understanding build
                  করে confidence-এর সাথে test attempt করা যায়।
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto max-w-[480px] p-0">
                <div className="mb-3 flex items-center justify-between">
                  <div></div>

                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-sky-100 to-emerald-50 p-0">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_30%)]" />
                  <img
                    src={canadaPlane}
                    alt="Plane and Canada visual"
                    className="relative z-10 mx-auto block h-auto w-full max-w-none object-cover animate-float-plane"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-6 right-[-10px] block w-[120px] md:hidden">
                <img
                  src={canadaPlane}
                  alt=""
                  className="h-auto w-full object-cover opacity-95 animate-float-plane"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10" ref={syllabusRef}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Course Syllabus
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {syllabusGroups.map((item, index) => (
              <SyllabusDrawer
                key={item.title}
                item={item}
                isOpen={openSyllabus === index}
                onClick={() =>
                  setOpenSyllabus((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>
        </section>

        {/* 🔥 testimonial slides */}

        <section className="relative mt-12 overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          {/* 🔥 Neon Glow Effects */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-500/30 blur-[120px]" />
          <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-cyan-500/25 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-teal-400/20 blur-[100px]" />

          <div className="relative z-10 text-center">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-300 backdrop-blur">
              Student feedback
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
              What students say
            </h2>

            <p className="mt-3 text-sm text-white/70 md:text-base">
              Real results. Real scores. Real confidence.
            </p>
          </div>

          {/* ✨ Card */}
          <div className="relative z-10 mt-10 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div
              key={students[activeIndex].name}
              className="transition-all duration-700 ease-in-out animate-[fadeInUp_0.7s_ease-out]"
            >
              <TestimonialSlide student={students[activeIndex]} />
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {/* 🔥 Neon Dots */}
              <div className="flex items-center gap-2">
                {students.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "w-8 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                        : "w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* 🔥 Neon Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

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

        <section className="relative mt-12 overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-sm md:p-10">
          <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/90 md:text-xs">
                Ready to start?
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                Secure your seat and aim for 125+ with one of the best available
                teachers
              </h2>

              <p className="bensen-font mt-4 text-sm leading-7 text-white/75 md:text-base">
                Duolingo-trained professional teacher-এর guideline দিয়ে যদি
                আপনি 125+ score target করতে চান, তাহলে আজই enroll করুন for the
                next batch starting on{" "}
                <span className="font-bold text-white">
                  April 10, 2026 at 10:30 PM
                </span>
                .
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-start">
                <Link
                  to="/checkout/duolingo"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="ml-auto max-w-[360px] overflow-visible">
                <div className="relative z-10 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                  <div className="mb-3">
                    <h3 className="mt-1 font-sans text-lg font-extrabold tracking-tight text-white">
                      100% focused DET prep with certified mentors and partner
                      pathways
                    </h3>
                  </div>

                  <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-4">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_32%)]" />
                    <img
                      src={testCheck}
                      alt="Duolingo test certificate visual"
                      className="relative z-10 mx-auto block h-[320px] w-full object-contain animate-float-certificate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1150px] gap-3">
          <Link
            to="/checkout/duolingo"
            className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </>
  );
}