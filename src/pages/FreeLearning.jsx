import { ArrowUpRight } from "lucide-react";
import SEO from "../components/seo/SEO";
import duolingoLogo from "../assets/logo/duolingo-logo.svg";
import ieltsLogo from "../assets/logo/ielts-logo.jpeg";
import pteLogo from "../assets/logo/pte-logo.jpg";
import toeflLogo from "../assets/logo/toefl-logo.svg";

const MOCK_TESTS = [
  {
    name: "IELTS",
    description: "Practice with exam-style IELTS mock tests.",
    logo: ieltsLogo,
    href: "https://test.duomatebd.com/",
    accent: "from-amber-50 to-orange-50",
    border: "hover:border-amber-300",
  },
  {
    name: "PTE",
    description: "Prepare with realistic PTE mock tests.",
    logo: pteLogo,
    href: "https://test.duomatebd.com/",
    accent: "from-sky-50 to-cyan-50",
    border: "hover:border-sky-300",
  },
  {
    name: "TOEFL",
    description: "Build confidence with TOEFL mock tests.",
    logo: toeflLogo,
    href: "https://test.duomatebd.com/",
    accent: "from-violet-50 to-purple-50",
    border: "hover:border-violet-300",
  },
  {
    name: "Duolingo English Test",
    shortName: "DET",
    description: "Choose a DET plan and start your mock-test practice.",
    logo: duolingoLogo,
    href: "https://test.duomatebd.com/det/plans",
    accent: "from-emerald-50 to-green-50",
    border: "hover:border-emerald-300",
    featured: true,
  },
];

export default function FreeLearning() {
  return (
    <div className="space-y-8 py-6 md:py-10">
      <SEO
        title="Online Mock Tests | Duomate"
        description="Practice IELTS, PTE, TOEFL, and Duolingo English Test with Duomate mock tests."
        canonicalPath="/free-learning"
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 px-6 py-10 text-white md:px-10 md:py-14">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Mock Test
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Choose your test
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Select an exam below to access focused mock tests and prepare with
            confidence.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-10">
          {MOCK_TESTS.map((test) => (
            <a
              key={test.name}
              href={test.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex min-h-44 flex-col rounded-2xl border border-slate-200 bg-gradient-to-br ${test.accent} p-6 transition duration-200 ${test.border} hover:-translate-y-1 hover:shadow-lg`}
            >
              {test.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                  Dedicated DET plans
                </span>
              )}

              <img
                src={test.logo}
                alt={`${test.shortName || test.name} logo`}
                className="h-12 w-20 rounded-lg bg-white object-contain p-2 shadow-sm"
              />

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xl font-extrabold text-slate-900">
                    {test.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {test.description}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 text-white transition group-hover:bg-emerald-600">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
