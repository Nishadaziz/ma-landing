import { Link } from "react-router-dom";
import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  Award,
  Users,
  CalendarDays,
  ArrowRight,
  Layers,
} from "lucide-react";
import SEO from "../../components/seo/SEO";
import { MODULE_ACCENTS } from "./ieltsHelpers";

const MODULE_CARDS = [
  {
    name: "Reading",
    accent: "rose",
    icon: BookOpen,
    desc: "Master passage analysis, question types, answer-location techniques, and effective time management.",
    link: "/checkout?product=ielts-reading",
  },
  {
    name: "Writing",
    accent: "emerald",
    icon: PenSquare,
    desc: "Improve Task 1 and Task 2 structure, idea development, coherence, vocabulary, and task response.",
    link: "/checkout?product=ielts-writing",
  },
  {
    name: "Listening",
    accent: "sky",
    icon: Headphones,
    desc: "Develop prediction, concentration, spelling accuracy, and listening question strategies.",
    link: "/checkout?product=ielts-listening",
  },
  {
    name: "Speaking",
    accent: "amber",
    icon: Mic,
    desc: "Build fluency, confidence, pronunciation, vocabulary, and natural answer development.",
    link: "/checkout?product=ielts-speaking",
  },
];

export default function ProgramIELTS() {
  return (
    <div className="space-y-10">
      <SEO
        title="IELTS Preparation Programs | DuoMate"
        description="Browse DuoMate's IELTS preparation programs — the Complete IELTS course or an individual Reading, Writing, Listening, or Speaking module."
        canonicalPath="/programs/ielts"
        ogImage="https://www.duomatebd.com/og-ielts.png"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="transition hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/programs" className="transition hover:text-slate-900 hover:underline">
            Programs
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-900">IELTS</span>
        </div>
      </nav>

      {/* Header */}
      <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm md:p-12">
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          IELTS Preparation
        </span>

        <h1 className="mt-6 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
          Choose Your IELTS Program
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
          Join the complete preparation program, guided by a Band 8 mentor in
          batches of just 7 students — or focus on a single module where you
          need the most improvement.
        </p>
      </section>

      {/* Featured programs — Complete course and Reading + Listening combined, equal weight */}
      <section>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex h-full flex-col justify-between rounded-[28px] border border-slate-800 bg-slate-950 p-7 text-white shadow-sm md:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-950">
                  Best Value
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  <CalendarDays className="h-3 w-3" /> 24 Classes
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  <Users className="h-3 w-3" /> 7 / Batch
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  <Award className="h-3 w-3" /> Band 8 Mentor
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">
                Complete IELTS Preparation
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Reading, Writing, Listening, and Speaking through one
                structured 24-class program — everything you need in one
                course.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-300">
                  ৳9,500
                </span>
                <span className="text-sm font-semibold text-slate-400 line-through">
                  ৳12,500
                </span>
              </div>

              <Link
                to="/programs/ielts-complete"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article className="flex h-full flex-col justify-between rounded-[28px] border border-slate-800 bg-slate-950 p-7 text-white shadow-sm md:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-sky-400 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-950">
                  Focused Combo
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  <CalendarDays className="h-3 w-3" /> 1 Month
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  <Layers className="h-3 w-3" /> 2 Skills
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">
                Reading &amp; Listening Combined
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Prepare for both receptive skills together in one focused,
                one-month course — ideal if you don&apos;t need all four
                modules.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-400">
                  Starting at
                </span>
                <span className="text-2xl font-extrabold text-sky-300">
                  ৳2,000
                </span>
                <span className="text-sm font-semibold text-slate-500 line-through">
                  ৳3,000
                </span>
              </div>

              <Link
                to="/programs/ielts-reading-listening"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Individual modules */}
      <section>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Or focus on one module
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Individual IELTS Modules
          </h2>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULE_CARDS.map((course) => {
            const Icon = course.icon;
            const accent = MODULE_ACCENTS[course.accent];
            return (
              <article
                key={course.name}
                className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  IELTS {course.name}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {course.desc}
                </p>

                <Link
                  to={course.link}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-slate-800"
                >
                  Purchase {course.name} Course
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
