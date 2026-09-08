import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  Award,
  Users,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
} from "lucide-react";
import SEO from "../../components/seo/SEO";
import { WhatsAppButton } from "../../components/shared/WhatsAppCTA";
import { buildWhatsappLink } from "../../lib/whatsapp";
import { InfoCard } from "../../components/program21days/Program21DaysParts";
import { FaqAccordionItem } from "./IELTSParts";
import {
  MODULE_ACCENTS,
  useCountUp,
  useCountdown,
  useInView,
} from "./ieltsHelpers";
import {
  VALUE_STRIP,
  MODULES,
  COURSE_JOURNEY,
  SMALL_BATCH_BENEFITS,
  TEACHING_METHOD,
  MOCK_TEST_BENEFITS,
  WHO_FOR,
  STUDENT_JOURNEY,
  IELTS_FAQS,
} from "./ieltsPageData";

/** "Day Batch" start — no exact time was given, so this assumes 10:00 AM; adjust if the real start time differs. */
const BATCH_START_DATE = "2026-09-15T10:00:00+06:00";

const WHATSAPP_NUMBER = "8801300153200";
const IELTS_WHATSAPP_LINK = buildWhatsappLink(
  WHATSAPP_NUMBER,
  "Hi DuoMate! I want details about the Complete IELTS Preparation course (24 classes, Band 8 mentor)."
);

const skillIcons = [
  { name: "Reading", icon: BookOpen, tint: "bg-rose-50 text-rose-600" },
  { name: "Listening", icon: Headphones, tint: "bg-sky-50 text-sky-600" },
  { name: "Writing", icon: PenSquare, tint: "bg-emerald-50 text-emerald-600" },
  { name: "Speaking", icon: Mic, tint: "bg-amber-50 text-amber-600" },
];

/* ---------------- BATCH COUNTDOWN ---------------- */

function CountdownTile({ value, label, gradient }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-gradient-to-b shadow-lg ${gradient}`}>
      <div className="flex items-center justify-center py-4">
        <span className="text-3xl font-extrabold text-white md:text-4xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="bg-black/15 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-white/80">
        {label}
      </div>
    </div>
  );
}

function BatchCountdown() {
  const targetDate = useMemo(() => new Date(BATCH_START_DATE), []);
  const timeLeft = useCountdown(targetDate);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 p-7 text-white shadow-sm md:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          <CalendarDays className="h-3.5 w-3.5" />
          Upcoming Day Batch
        </span>

        <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
          {timeLeft.expired ? "Batch Has Started" : "Batch Starts In"}
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Starts 15 September · Only 7 Seats Per Batch
        </p>
      </div>

      {!timeLeft.expired ? (
        <div className="relative mx-auto mt-8 grid max-w-md grid-cols-4 gap-3">
          <CountdownTile value={timeLeft.days} label="Days" gradient="from-amber-400 to-amber-600" />
          <CountdownTile value={timeLeft.hours} label="Hours" gradient="from-amber-500 to-amber-700" />
          <CountdownTile value={timeLeft.minutes} label="Min" gradient="from-emerald-400 to-emerald-600" />
          <CountdownTile value={timeLeft.seconds} label="Sec" gradient="from-emerald-500 to-emerald-700" />
        </div>
      ) : (
        <p className="relative mt-6 text-center text-sm font-bold text-amber-300">
          Enroll now for the next available seat.
        </p>
      )}

      <div className="relative mt-8 flex justify-center">
        <Link
          to="/checkout?product=ielts-complete"
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
        >
          Enroll Now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- HERO STAT ---------------- */

function HeroStat({ value, label, suffix = "" }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, { start: inView });

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-extrabold text-white md:text-6xl">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-300">
        {label}
      </div>
    </div>
  );
}

/* ---------------- MODULE TABS ---------------- */

function ModulesSection() {
  const [active, setActive] = useState(MODULES[0].key);
  const module = MODULES.find((m) => m.key === active) ?? MODULES[0];
  const accent = MODULE_ACCENTS[module.accent];

  return (
    <section id="ielts-modules" className="scroll-mt-28">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
          Course Curriculum
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          All 4 IELTS Modules, Covered in Detail
        </h2>
      </div>

      {/* Tabs */}
      <div className="mt-7 flex flex-wrap gap-2">
        {MODULES.map((m) => {
          const a = MODULE_ACCENTS[m.accent];
          const isActive = m.key === active;
          return (
            <button
              key={m.key}
              onClick={() => setActive(m.key)}
              className={`rounded-full border-2 px-5 py-2.5 text-sm font-extrabold transition ${
                isActive ? a.tabActive : a.tabInactive
              }`}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        key={module.key}
        className={`animate-[fadeInUp_0.4s_ease-out] mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8`}
      >
        <p className="max-w-2xl text-base leading-7 text-slate-700">
          {module.intro}
        </p>

        {module.groups ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {module.groups.map((group) => (
              <div key={group.label}>
                <p className={`text-xs font-extrabold uppercase tracking-[0.14em] ${accent.text}`}>
                  {group.label}
                </p>
                {group.topics.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {group.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {module.topics ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {module.topics.map((topic) => (
              <span
                key={topic}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${accent.chip}`}
              >
                {topic}
              </span>
            ))}
          </div>
        ) : null}

        <div className={`mt-6 rounded-2xl ${accent.soft} px-4 py-3 text-sm font-bold ${accent.text}`}>
          Goal: {module.goal}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function ProgramIELTSComplete() {
  const [openFaq, setOpenFaq] = useState(0);
  const [openedFaqs, setOpenedFaqs] = useState([0]);

  const handleFaqClick = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
    setOpenedFaqs((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: IELTS_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="space-y-10 pb-24 md:pb-10">
      <SEO
        title="IELTS Preparation Course in Dhaka | DuoMate"
        description="Prepare for IELTS Reading, Listening, Writing and Speaking with DuoMate's structured 24-class IELTS course, Band 8 mentor guidance, regular mocks, feedback and a maximum of 7 students per batch."
        canonicalPath="/programs/ielts-complete"
        ogImage="https://www.duomatebd.com/og-ielts.png"
      />

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

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
          <Link to="/programs/ielts" className="transition hover:text-slate-900 hover:underline">
            IELTS
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-900">Complete Course</span>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              IELTS Preparation
            </span>

            <h1 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              IELTS Preparation, Done the Right Way.
            </h1>

            <p className="bensen-font mt-4 max-w-xl text-lg font-bold leading-snug text-amber-200 md:text-xl">
              Band 8 Mentor-এর সাথে Complete IELTS Preparation
            </p>

            <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300 md:text-base">
              Reading থেকে Writing, Listening থেকে Speaking — IELTS-এর চারটি
              module-ই শিখুন structured classes, regular practice, mock tests
              এবং personalized feedback-এর মাধ্যমে।
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-300">৳9,500</span>
              <span className="text-base font-semibold text-slate-400 line-through">
                ৳12,500
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/checkout?product=ielts-complete"
                className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Enroll Now
              </Link>

              <div className="w-full sm:w-56">
                <WhatsAppButton href={IELTS_WHATSAPP_LINK} size="md">
                  Talk to Us
                </WhatsAppButton>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white">
              <CalendarDays className="h-4 w-4 text-amber-300" />
              Upcoming Day Batch — Starts 15 September
            </div>
          </div>

          {/* Visual: stat card, inspired by the poster's green shape */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 to-emerald-700 p-7 shadow-[0_30px_70px_rgba(16,185,129,0.35)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-center justify-around gap-4">
                <HeroStat value={24} label="Total Classes" />
                <div className="h-16 w-px bg-white/25" />
                <HeroStat value={7} label="Max Students / Batch" />
              </div>

              <div className="relative mt-6 rounded-2xl bg-white/10 px-4 py-3 text-center text-xs font-bold text-white backdrop-blur">
                24 Classes · Complete Course
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {skillIcons.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 rounded-2xl bg-white/10 px-3.5 py-2 backdrop-blur"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${skill.tint}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUICK VALUE STRIP ============ */}
      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {VALUE_STRIP.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-sm font-bold text-slate-800">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-slate-500">
          Small Batch <ArrowRight className="inline h-3.5 w-3.5" /> More Attention{" "}
          <ArrowRight className="inline h-3.5 w-3.5" /> Better Feedback{" "}
          <ArrowRight className="inline h-3.5 w-3.5" /> Better Preparation
        </p>
      </section>

      {/* ============ INTRO ============ */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-9">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Everything You Need for IELTS — In One Course
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            IELTS preparation শুধু techniques শেখা না — কোথায় mistake হচ্ছে,
            কীভাবে improve করতে হবে এবং exam-এর আগে কীভাবে confident হতে হবে,
            সেটাও equally important.
          </p>
          <p className="mt-3 leading-8 text-slate-600">
            তাই DuoMate-এ আমরা শুধু class complete করার দিকে focus করি না।
            আমাদের goal হলো প্রতিটি student যেন নিজের weakness identify করে
            step-by-step improvement করতে পারে।
          </p>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <ModulesSection />

      {/* ============ COURSE JOURNEY ============ */}
      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            The Roadmap
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            24 Classes. One Complete IELTS Journey.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {COURSE_JOURNEY.map((item) => (
            <div
              key={item.step}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-2xl font-extrabold text-amber-400">{item.step}</span>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ONLY 7 STUDENTS ============ */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="text-[120px] font-extrabold leading-none text-emerald-600 md:text-[160px]">
              7
            </div>
            <p className="-mt-2 text-lg font-extrabold text-slate-900 md:text-xl">
              Students Per Batch
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Only 7 Students Per Batch
            </h2>
            <p className="mt-2 text-lg font-bold text-emerald-700">
              Because Your Teacher Should Know Your Progress.
            </p>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              একটা class-এ অনেক students থাকলে individual mistakes identify
              করা কঠিন হয়ে যায়। That's why we keep our IELTS batches
              intentionally small.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SMALL_BATCH_BENEFITS.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BATCH COUNTDOWN ============ */}
      <BatchCountdown />

      {/* ============ TEACHING METHOD ============ */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-7 text-white md:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Learn → Practice → Feedback → Improve
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">
            এই cycle-টাই পুরো course জুড়ে চলবে।
          </p>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          {TEACHING_METHOD.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-center">
                <p className="text-lg font-extrabold text-amber-300">{step.label}</p>
                <p className="mt-1 text-xs text-slate-300">{step.desc}</p>
              </div>
              {index < TEACHING_METHOD.length - 1 ? (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-500 sm:block" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* ============ BAND 8 MENTOR ============ */}
      <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-400 shadow-lg shadow-amber-300/40 lg:mx-0">
            <Award className="h-11 w-11 text-slate-950" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Learn with a Band 8 Mentor
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700">
              IELTS-এর জন্য শুধু English জানা যথেষ্ট নয়। Exam-এর scoring
              criteria, question patterns এবং common mistakes বুঝে
              preparation করাটাও গুরুত্বপূর্ণ।
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700">
              DuoMate IELTS Preparation-এ আপনি Band 8 Mentor-এর guidance
              পাবেন throughout your preparation journey.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Learn the exam.", "Understand your mistakes.", "Improve strategically."].map(
                (line) => (
                  <span
                    key={line}
                    className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-bold text-amber-800"
                  >
                    {line}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ MOCK TEST ============ */}
      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Mock Tests
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Practice Before the Real Exam
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_TEST_BENEFITS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ WHO IS THIS FOR ============ */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-9">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Is This Course Right for You?
          </h2>
          <p className="mt-2 text-slate-600">This course is suitable if:</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {WHO_FOR.map((line) => (
            <div
              key={line}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-sm leading-6 text-slate-700">{line}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ COURSE AT A GLANCE ============ */}
      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            At a Glance
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Course at a Glance
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <InfoCard
            icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
            title="Complete Course"
            value="4 Modules"
            subtext="Reading + Listening + Writing + Speaking"
          />
          <InfoCard
            icon={<CalendarDays className="h-5 w-5 md:h-6 md:w-6" />}
            title="Total Classes"
            value="24"
            subtext="Structured, live sessions"
            delay="[animation-delay:120ms]"
          />
          <InfoCard
            icon={<Users className="h-5 w-5 md:h-6 md:w-6" />}
            title="Max Students"
            value="7"
            subtext="Per batch"
            delay="[animation-delay:240ms]"
          />
          <InfoCard
            icon={<Award className="h-5 w-5 md:h-6 md:w-6" />}
            title="Mentor"
            value="Band 8"
            subtext="Guided preparation"
            delay="[animation-delay:360ms]"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {["Regular Practice", "Mock Tests", "Writing Feedback", "Speaking Feedback", "Focused Guidance"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
                >
                  {item}
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-slate-500">Upcoming Day Batch</span>
            <span className="rounded-full bg-slate-900 px-3 py-1.5 font-extrabold text-white">
              Starts 15 September
            </span>
          </div>
        </div>
      </section>

      {/* ============ STUDENT JOURNEY ============ */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-9">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
            From "I Don't Know Where to Start" to Exam Ready.
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {STUDENT_JOURNEY.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm">
                {step}
              </span>
              {index < STUDENT_JOURNEY.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-slate-400" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-7 space-y-4">
          {IELTS_FAQS.map((item, index) => (
            <FaqAccordionItem
              key={item.q}
              item={item}
              isOpen={openFaq === index}
              wasOpened={openedFaqs.includes(index)}
              onClick={() => handleFaqClick(index)}
            />
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-sm md:p-10">
        <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
              Your IELTS Preparation Doesn't Have to Be Confusing.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-white/75">
              একটা clear plan, regular practice এবং proper feedback
              preparation-কে অনেক বেশি manageable করে দিতে পারে।
            </p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-300">৳9,500</span>
              <span className="text-sm font-semibold text-white/50 line-through">
                ৳12,500
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "24 Classes",
                "4 IELTS Modules",
                "Maximum 7 Students",
                "Band 8 Mentor",
                "Practice + Mock + Feedback",
              ].map((line) => (
                <span
                  key={line}
                  className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  {line}
                </span>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-start">
              <Link
                to="/checkout?product=ielts-complete"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Enroll in the Upcoming Batch
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="col-span-2 sm:w-64">
                <WhatsAppButton href={IELTS_WHATSAPP_LINK} size="md">
                  Inbox Us for Details
                </WhatsAppButton>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="space-y-4 text-sm">
              <a href="tel:+8801300153200" className="flex items-start gap-3 text-white/85 transition hover:text-white">
                <Phone size={18} className="mt-0.5 shrink-0" />
                <span>01300-153200</span>
              </a>
              <div className="flex items-start gap-3 text-white/85">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>House 2, Probal Housing, Ring Road, Adabor, Dhaka</span>
              </div>
              <a
                href="https://www.duomatebd.com"
                className="flex items-start gap-3 text-white/85 transition hover:text-white"
              >
                <Globe size={18} className="mt-0.5 shrink-0" />
                <span>www.duomatebd.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MOBILE STICKY CTA ============ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1150px] gap-3">
          <a
            href="tel:+8801300153200"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-extrabold text-slate-900"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href={IELTS_WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-center text-sm font-extrabold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Message Us
          </a>
        </div>
      </div>
    </div>
  );
}
