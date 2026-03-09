import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  GraduationCap,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import det21days from "../assets/det21days.webp";

/* ---------------- INFO CARD ---------------- */

function InfoCard({ icon, title, value, subtext, delay = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6 ${delay}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 opacity-90" />

      <div className="flex items-start gap-3 md:flex-col md:items-center md:text-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:scale-105 group-hover:bg-emerald-100 md:h-14 md:w-14">
          {icon}
        </div>

        <div className="min-w-0 flex-1 md:flex-none">
          <h3 className="text-sm font-extrabold leading-snug text-slate-900 md:mt-4 md:text-lg">
            {title}
          </h3>

          <div className="mt-1 text-base font-extrabold leading-tight text-slate-900 md:mt-2 md:text-2xl">
            {value}
          </div>

          {subtext && (
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 md:text-sm">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SYLLABUS CARD ---------------- */

function SyllabusCard({ title, desc }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- TESTIMONIAL ---------------- */

function TestimonialSlide({ student }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-700">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <div className="font-extrabold text-slate-900">{student.name}</div>
            <div className="text-xs text-slate-500">{student.meta}</div>
          </div>
        </div>

        <div className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          Score: {student.score}
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-700 md:text-[15px]">
          {student.quote}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
        <div className="absolute right-4 top-4 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm">
          Verified student feedback
        </div>

        <div className="flex h-[240px] flex-col items-center justify-center text-center md:h-[260px]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
            <BadgeCheck className="h-10 w-10 text-emerald-600" />
          </div>

          <h3 className="mt-5 text-xl font-extrabold text-slate-900">
            Real progress, clear preparation
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-7 text-slate-600">
            Structured class flow, better exam understanding, and focused
            practice that helps students feel more confident before test day.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function Program21Days() {
  const students = [
    {
      name: "Rakib Hasan",
      meta: "DET Student",
      score: "130",
      quote:
        "Structured class routine এবং real exam sample দেখে preparation অনেক clear হয়ে গিয়েছিল।",
    },
    {
      name: "Nusrat Jahan",
      meta: "Duolingo English Test",
      score: "125",
      quote:
        "Smart answering techniques এবং speed training আমার score improve করতে সাহায্য করেছে।",
    },
    {
      name: "Fahim Ahmed",
      meta: "DET Preparation",
      score: "135",
      quote:
        "Exam pattern বুঝে preparation করায় test দিতে অনেক confidence পেয়েছি।",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % students.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [students.length]);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + students.length) % students.length);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % students.length);

  return (
    <>
      <div className="mx-auto max-w-[1150px] px-4 pb-24 pt-5 md:pb-12 md:pt-10">
        {/* HERO */}

        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-xs">
                1 Month DET Preparation
              </div>

              <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Duolingo English Test preparation in a structured way
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
                Official Partner of Duolingo English Test in Bangladesh. Real
                exam samples, structured preparation, practical hacks এবং clear
                strategy দিয়ে কম সময়ে score improve করার জন্য এই course
                designed।
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/checkout/duolingo"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                >
                  Enroll in This Batch
                </Link>

                <Link
                  to="/book-test"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Book Mock / Slot
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Limited seats in upcoming batch
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
                  Structured classes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
                  Real sample-based preparation
                </span>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src={det21days}
                alt="DET preparation"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent lg:hidden" />
            </div>
          </div>
        </section>

        {/* INFO BOXES */}

        <section className="mt-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Start"
              value="March 15, 2026"
              subtext="Next batch starting date"
            />

            <InfoCard
              icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
              title="Total Classes"
              value="12 Classes"
              subtext="Focused batch structure"
              delay="[animation-delay:120ms]"
            />

            <InfoCard
              icon={<GraduationCap className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Day"
              value="Friday, Sunday, Tuesday"
              subtext="Regular weekly routine"
              delay="[animation-delay:240ms]"
            />

            <InfoCard
              icon={<Clock3 className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Duration"
              value="9:30 PM - 10:45 PM"
              subtext="Evening class timing"
              delay="[animation-delay:360ms]"
            />
          </div>
        </section>

        {/* PREPARATION SECTION */}

        <section className="mt-10 overflow-hidden rounded-[30px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-6 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm">
                Full Preparation
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl md:leading-tight">
                Reading, Writing, Listening, Speaking এর total preparation এক
                মাসের মধ্যে
              </h2>

              <ul className="mt-5 grid gap-3 text-sm text-slate-700 md:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Real exam samples analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>High scorer answer patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Smart answering techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Speed-based practice</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Sparkles className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                Course Highlights
              </h3>

              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>Real question analysis</p>
                <p>Structured preparation plan</p>
                <p>Smart techniques for higher score</p>
                <p>Teacher guideline</p>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  Why this helps
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Students can follow a clear system instead of random practice,
                  which makes preparation cleaner and more effective.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SYLLABUS */}

        <section className="mt-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Course syllabus
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Core DET task types that students need to practice in a focused,
              structured way.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SyllabusCard
              title="Read and Select"
              desc="Vocabulary recognition"
            />
            <SyllabusCard
              title="Read and Complete"
              desc="Passage completion"
            />
            <SyllabusCard
              title="Interactive Reading"
              desc="Paragraph understanding"
            />
            <SyllabusCard
              title="Interactive Listening"
              desc="Listening comprehension"
            />
            <SyllabusCard
              title="Speaking"
              desc="Answer structure & fluency"
            />
            <SyllabusCard
              title="Writing"
              desc="High-score writing pattern"
            />
          </div>
        </section>

        {/* TESTIMONIAL */}

        <section className="mt-12">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-xs">
              Student feedback
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              What students say
            </h2>
          </div>

          <div className="mt-8 rounded-[30px] border border-slate-200 bg-slate-50 p-5 md:p-6">
            <TestimonialSlide student={students[activeIndex]} />

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {students.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition ${
                      activeIndex === index
                        ? "w-8 bg-slate-900"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="mt-12 overflow-hidden rounded-[30px] bg-slate-900 p-8 text-center text-white shadow-sm md:p-10">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/90 md:text-xs">
              Upcoming batch
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Join the upcoming batch today
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
              Structured preparation + real exam understanding
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/checkout/duolingo"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Reserve My Seat
              </Link>

              <Link
                to="/book-test"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Book Mock / Slot
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE STICKY CTA */}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1150px] gap-3">
          <Link
            to="/book-test"
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-extrabold text-slate-900"
          >
            Mock
          </Link>

          <Link
            to="/checkout/duolingo"
            className="flex-[1.4] rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </>
  );
}