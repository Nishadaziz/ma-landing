import { Link } from "react-router-dom";

import duolingoLogo from "../assets/logo/duolingo-logo.svg";
import ieltsLogo from "../assets/logo/ielts-logo.jpeg";
import pteLogo from "../assets/logo/pte-logo.jpg";
import toeflLogo from "../assets/logo/toefl-logo.svg";

const exams = [
  {
    name: "Duolingo",
    subtitle: "English Test Preparation",
    description:
      "Explore 21-day crash courses, long-term programs, strategy, and complete preparation support.",
    logo: duolingoLogo,
    link: "/programs/duolingo",
    active: true,
    badge: "Available Now",
  },
  {
    name: "IELTS",
    subtitle: "Band Score Preparation",
    description:
      "Structured preparation for reading, writing, listening, and speaking with guided support.",
    logo: ieltsLogo,
    link: null,
    active: false,
    badge: "Coming Soon",
  },
  {
    name: "PTE",
    subtitle: "Smart Score Strategy",
    description:
      "Focused preparation with speaking practice, timing control, and question-type mastery.",
    logo: pteLogo,
    link: null,
    active: false,
    badge: "Coming Soon",
  },
  {
    name: "TOEFL",
    subtitle: "Academic English Pathway",
    description:
      "Preparation for reading, listening, speaking, and writing in a structured learning flow.",
    logo: toeflLogo,
    link: null,
    active: false,
    badge: "Coming Soon",
  },
];

function ExamCard({ exam }) {
  const content = (
    <div className="group relative h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
            <img
              src={exam.logo}
              alt={`${exam.name} logo`}
              className="h-9 w-9 object-contain"
            />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
              exam.active
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
            }`}
          >
            {exam.badge}
          </span>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {exam.subtitle}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {exam.name}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {exam.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
          <span
            className={`text-sm font-semibold ${
              exam.active ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {exam.active ? "Explore program" : "Launching soon"}
          </span>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              exam.active
                ? "bg-slate-900 text-white group-hover:translate-x-1"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (exam.active && exam.link) {
    return (
      <Link to={exam.link} className="block h-full">
        {content}
      </Link>
    );
  }

  return <div className="h-full">{content}</div>;
}

export default function Programs() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white px-6 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            Exam Programs
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Choose your test pathway
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
            Explore beautifully structured preparation paths for Duolingo,
            IELTS, PTE, and TOEFL.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {exams.map((exam) => (
            <ExamCard key={exam.name} exam={exam} />
          ))}
        </div>

        <div className="mt-14 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Featured Program
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Duolingo English Test
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Start with the dedicated Duolingo page where students can see
                the 21-day program, other available courses, and complete exam
                preparation guidance.
              </p>
            </div>

            <Link
              to="/programs/duolingo"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open Duolingo Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}