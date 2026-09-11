import { Link } from "react-router-dom";
import {
  BookOpen,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock3,
  Target,
  Repeat,
} from "lucide-react";
import SEO from "../../components/seo/SEO";
import { WhatsAppIcon } from "../../components/shared/WhatsAppCTA";
import { buildWhatsappLink } from "../../lib/whatsapp";
import products from "../../data/products";

const product = products["ielts-reading-listening"];

const WHATSAPP_NUMBER = "8801300153200";
const WHATSAPP_LINK = buildWhatsappLink(
  WHATSAPP_NUMBER,
  "Hi DuoMate! I want details about the IELTS Reading & Listening Combined course."
);

const SKILLS = [
  {
    name: "Reading",
    icon: BookOpen,
    gradient: "from-rose-500 to-rose-600",
    soft: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-100",
    desc: "Master passage analysis, question types, and answer-location techniques under real exam timing.",
    points: ["Passage analysis", "Question-type strategies", "Time management"],
  },
  {
    name: "Listening",
    icon: Headphones,
    gradient: "from-sky-500 to-sky-600",
    soft: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-100",
    desc: "Build prediction skills, concentration, and spelling accuracy across all four listening sections.",
    points: ["Prediction techniques", "Spelling accuracy", "Answer selection"],
  },
];

const WHY_POINTS = [
  {
    icon: Target,
    title: "Focused, not scattered",
    desc: "Only the two receptive skills — no time spent on modules you don't need right now.",
  },
  {
    icon: Clock3,
    title: "Done in 1 month",
    desc: "A compact schedule built for students with a nearer test date or a tighter budget.",
  },
  {
    icon: Repeat,
    title: "Practice that repeats",
    desc: "Guided drills plus mock reading and listening tests to track real improvement.",
  },
];

export default function ProgramIELTSReadingListening() {
  return (
    <div className="space-y-10">
      <SEO
        title="IELTS Reading & Listening Combined | DuoMate"
        description="A focused 1-month IELTS preparation course covering Reading and Listening together, starting at ৳2,000."
        canonicalPath="/programs/ielts-reading-listening"
        ogImage="https://www.duomatebd.com/og-ielts.png"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="transition hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/programs" className="transition hover:text-slate-900 hover:underline">
            Programs
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/programs/ielts" className="transition hover:text-slate-900 hover:underline">
            IELTS
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Reading &amp; Listening</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-[0_30px_70px_rgba(15,23,42,0.25)] md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              IELTS Preparation
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Reading &amp; Listening,{" "}
              <span className="font-serif font-normal italic text-amber-300">
                combined.
              </span>
            </h1>

            <p className="mt-5 leading-7 text-slate-300 md:text-base">
              A focused, one-month course covering IELTS Reading and
              Listening together — for students who want to strengthen both
              skills without committing to the full four-module program.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/checkout?product=${product.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Ask a question
              </a>
            </div>
          </div>

          <div className="shrink-0 rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:w-72">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Starting price
            </p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-amber-300">
                ৳2,000
              </span>
              <span className="text-base font-semibold text-slate-400 line-through">
                ৳3,000
              </span>
            </p>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between text-slate-300">
                <span>Duration</span>
                <span className="font-bold text-white">1 Month</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Skills covered</span>
                <span className="font-bold text-white">Reading + Listening</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Format</span>
                <span className="font-bold text-white">Guided + Mock Tests</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills covered */}
      <section>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Two skills, one course
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            What you&apos;ll practice
          </h2>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <article
                key={skill.name}
                className={`rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm ring-1 ${skill.ring} transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.gradient} text-white shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                  {skill.name}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">{skill.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.points.map((point) => (
                    <span
                      key={point}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${skill.soft} ${skill.text}`}
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why combine */}
      <section className="grid gap-5 sm:grid-cols-3">
        {WHY_POINTS.map((point) => {
          const Icon = point.icon;
          return (
            <div
              key={point.title}
              className="rounded-[22px] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {point.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* What's included */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm md:p-9">
        <h2 className="text-xl font-extrabold text-slate-900">
          What&apos;s included
        </h2>

        <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold leading-6 text-slate-700">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="overflow-hidden rounded-[28px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-8 text-center shadow-sm md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
          Ready to start?
        </p>
        <h2 className="mx-auto mt-3 max-w-lg text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Join the Reading &amp; Listening Combined course today
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          One month. Two skills. Starting at{" "}
          <span className="font-extrabold text-slate-900">৳2,000</span>{" "}
          <span className="font-semibold text-slate-400 line-through">
            ৳3,000
          </span>
          .
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/checkout?product=${product.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-slate-800"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-extrabold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            Ask a question
          </a>
        </div>
      </section>
    </div>
  );
}
