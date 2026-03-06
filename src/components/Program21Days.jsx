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
} from "lucide-react";
import det21days from "../assets/det21days.webp";

function InfoCard({ icon, title, value, subtext, delay = "" }) {
  return (
    <div
      className={`group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-up ${delay}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-5 text-center text-xl font-extrabold text-slate-900 md:text-2xl">
        {title}
      </h3>

      <div className="mt-3 text-center text-slate-700">
        <div className="text-lg font-extrabold text-slate-900 md:text-3xl">
          {value}
        </div>
        {subtext ? (
          <div className="mt-2 text-sm leading-relaxed text-slate-600">
            {subtext}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SyllabusCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function TestimonialSlide({ student }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-extrabold text-emerald-700">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <div className="text-lg font-extrabold text-slate-900">
              {student.name}
            </div>
            <div className="text-sm text-slate-600">{student.meta}</div>
          </div>
        </div>

        <div className="mt-6 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          Score: {student.score}
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-700">
          “{student.quote}”
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        {student.certificate ? (
          <img
            src={student.certificate}
            alt={`${student.name} certificate`}
            className="h-[320px] w-full object-cover"
          />
        ) : (
          <div className="flex h-[320px] flex-col items-center justify-center px-6 text-center">
            <BadgeCheck className="h-14 w-14 text-emerald-600" />
            <div className="mt-4 text-lg font-extrabold text-slate-900">
              Student Certificate / Result Image
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              এখানে real student certificate / result image বসানো যাবে।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Program21Days() {
  const students = [
    {
      name: "Rakib Hasan",
      meta: "DET One Month Preparation",
      score: "130",
      quote:
        "Structured class routine আর real exam sample দেখে preparation অনেক clear হয়ে গিয়েছিল।",
      certificate: null,
    },
    {
      name: "Nusrat Jahan",
      meta: "Duolingo English Test Candidate",
      score: "125",
      quote:
        "Teacher guideline আর shortcuts/hacks আমাকে কম সময়ে better score তুলতে সাহায্য করেছে।",
      certificate: null,
    },
    {
      name: "Fahim Ahmed",
      meta: "DET One Month Course Student",
      score: "135",
      quote:
        "Speed training আর answer structure practice করার কারণে test দিতে অনেক confidence পেয়েছি।",
      certificate: null,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % students.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [students.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + students.length) % students.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % students.length);
  };

  return (
    <>
      <div className="mx-auto max-w-[1180px] px-4 pt-2 pb-10 md:pt-4 md:pb-10">
        {/* HERO */}
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[34px]">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-6 md:p-10 lg:p-12">
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700 md:text-sm">
                1 Month DET Preparation
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Duolingo English Test preparation in a structured way
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-lg">
                Official Partner of Duolingo English Test in Bangladesh. এই
                কোর্সে structured class plan, real exam samples, direct
                guideline এবং practical hacks-এর মাধ্যমে কম সময়ে better score
                করার জন্য প্রস্তুত করা হবে।
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold md:text-xs">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                  Official Partner
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                  Real Exam Samples
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                  Direct Teacher Guideline
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                  Fast Score Improvement
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/checkout/duolingo"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Enroll in This Batch
                </Link>

                <Link
                  to="/book-test"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Book Mock / Slot
                </Link>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500 md:text-sm">
                Limited seats in the upcoming batch. Early enrollment is better.
              </p>
            </div>

            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src={det21days}
                alt="DET one month preparation"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-sm md:bottom-6 md:left-6 md:right-6">
                <p className="text-sm font-semibold text-white">
                  Real samples • Direct guideline • Smart preparation
                </p>
                <p className="mt-1 text-xs text-white/85 md:text-sm">
                  Designed to work well as a high-conversion landing page
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ANIMATED INFO BOXES */}
        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              icon={<CalendarDays className="h-7 w-7" />}
              title="Class Start"
              value="March 15, 2026"
              subtext="Next batch starting date"
            />
            <InfoCard
              icon={<BookOpen className="h-7 w-7" />}
              title="Total Classes"
              value="12 Classes"
              subtext="Focused batch structure"
              delay="[animation-delay:120ms]"
            />
            <InfoCard
              icon={<GraduationCap className="h-7 w-7" />}
              title="Class Day"
              value="Friday, Sunday, Tuesday"
              subtext="Regular weekly routine"
              delay="[animation-delay:240ms]"
            />
            <InfoCard
              icon={<Clock3 className="h-7 w-7" />}
              title="Class Duration"
              value="9:30 PM - 10:45 PM"
              subtext="Convenient evening timing"
              delay="[animation-delay:360ms]"
            />
          </div>
        </section>

        {/* PREPARATION OVERVIEW */}
        <section className="mt-10 rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:mt-12 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white md:text-sm">
                Full Preparation Plan
              </div>

              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Reading, Writing, Listening, Speaking এর total preparation এক
                মাসের মধ্যে
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                  <span>
                    Real Duolingo English Test samples এবং high scorer
                    candidates-এর question-answer patterns দেখানো হবে।
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                  <span>
                    কম সময়ে better score করার জন্য practical hacks, answering
                    strategy এবং speed-based practice থাকবে।
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                  <span>
                    প্রতিটি major section structured way-তে cover করা হবে যাতে
                    preparation clear, focused এবং result-oriented হয়।
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-extrabold text-slate-900">
                  Course Highlights
                </h3>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Real exam sample analysis
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Structured class routine
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Smart hacks for faster score improvement
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  Direct teacher guideline
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYLLABUS */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 md:mt-12 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Course syllabus
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Duolingo English Test-এর full question pattern structured way-তে
              cover করা হবে যাতে students exam-এর প্রতিটি অংশ clearভাবে বুঝতে
              পারে।
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SyllabusCard
              title="Read and Select"
              desc="Vocabulary recognition, quick accuracy, selection strategy."
            />
            <SyllabusCard
              title="Read and Complete"
              desc="Passage completion, word prediction, speed + accuracy."
            />
            <SyllabusCard
              title="Interactive Reading"
              desc="Paragraph logic, detail understanding, answer strategy."
            />
            <SyllabusCard
              title="Interactive Listening"
              desc="Listening focus, quick comprehension, response handling."
            />
            <SyllabusCard
              title="Speaking Section"
              desc="Fluency, confidence, answer structure, scoring direction."
            />
            <SyllabusCard
              title="Interactive Speaking"
              desc="Natural response practice, timing control, speaking flow."
            />
            <SyllabusCard
              title="Writing Section"
              desc="Sentence quality, idea development, structure, high-score pattern."
            />
            <SyllabusCard
              title="Reading Skills"
              desc="Comprehension, scanning, fast understanding techniques."
            />
            <SyllabusCard
              title="Listening Skills"
              desc="Guided listening drills for better reaction and score."
            />
          </div>
        </section>

        {/* FEEDBACK CAROUSEL */}
        <section className="mt-10 md:mt-12">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700">
              Student Results & Certificates
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              Student feedback
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Real student names, scores, and certificates can be shown here in
              automatic carousel style.
            </p>
          </div>

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-4 md:p-6">
            <TestimonialSlide student={students[activeIndex]} />

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                onClick={prevSlide}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {students.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      activeIndex === index ? "bg-slate-900" : "bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-10 rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white md:mt-12 md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Join the next batch and start preparing the right way
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
              Structured classes, real exam understanding, smart preparation and
              score-focused guidance — all in one place.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/checkout/duolingo"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Reserve My Seat
              </Link>

              <Link
                to="/book-test"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Book Mock / Slot
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-white/75">
              <span className="rounded-full border border-white/15 px-3 py-1">
                Batch starts March 15
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1">
                12 Classes
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1">
                Limited Seats
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1180px] gap-3">
          <Link
            to="/book-test"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900"
          >
            Mock
          </Link>

          <Link
            to="/checkout/duolingo"
            className="inline-flex flex-[1.4] items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </>
  );
}