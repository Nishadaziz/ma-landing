import { Link } from "react-router-dom";
import { Mic, Clock3, ListChecks, MessageSquare, Users, Calendar, BadgeCheck } from "lucide-react";
import SEO from "../../components/seo/SEO";
import { WhatsAppButton } from "../../components/shared/WhatsAppCTA";
import { buildWhatsappLink } from "../../lib/whatsapp";

const WHATSAPP_NUMBER = "8801300153200";

const INCLUDES = [
  {
    icon: Mic,
    title: "Speaking Practice",
    desc: "One-on-one speaking drills with real-time feedback on fluency and pronunciation.",
  },
  {
    icon: Clock3,
    title: "Timing Control",
    desc: "Learn pacing strategies so every section is completed with time to spare.",
  },
  {
    icon: ListChecks,
    title: "Question-Type Mastery",
    desc: "Work through each PTE question type with guided, exam-style practice.",
  },
  {
    icon: MessageSquare,
    title: "Personalized Feedback",
    desc: "Direct feedback from your mentor after every session, tailored to you.",
  },
];

const STEPS = [
  {
    icon: MessageSquare,
    title: "Message on WhatsApp",
    desc: "Tell us your target score and availability.",
  },
  {
    icon: Calendar,
    title: "Schedule Your Session",
    desc: "We'll confirm a one-on-one time slot that works for you.",
  },
  {
    icon: Users,
    title: "Attend Your Session",
    desc: "Join your private mentor-led PTE preparation class.",
  },
];

export default function ProgramPTE() {
  const whatsappLink = buildWhatsappLink(
    WHATSAPP_NUMBER,
    "Hi DuoMate! I want to book a one-on-one PTE preparation session. Please guide me."
  );

  return (
    <div className="space-y-10">
      <SEO
        title="PTE Preparation — One-on-One Sessions | DuoMate"
        description="Personalized one-on-one PTE preparation with speaking practice, timing control, and question-type mastery. Book your session on WhatsApp."
        canonicalPath="/programs/pte"
        ogImage="https://www.duomatebd.com/og-pte.png"
      />

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
          <span className="font-semibold text-slate-900">PTE</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
            PTE Academic Preparation
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            One-on-One PTE Preparation With a Personal Mentor
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Focused preparation with speaking practice, timing control, and
            question-type mastery — in a private session built around your
            schedule.
          </p>

          <div className="mt-8 max-w-sm">
            <WhatsAppButton href={whatsappLink} size="md">
              Book Your One-on-One Session
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
            What's included
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            A session built entirely around you
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-9">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 md:text-3xl">
          How it works
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-sky-600">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-extrabold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-[28px] border border-sky-200 bg-sky-50 p-8 text-center md:p-10">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-sky-700">
          <BadgeCheck className="h-4 w-4" />
          Private one-on-one mentoring
        </div>

        <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
          Ready to start your PTE preparation?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Message us on WhatsApp to book your one-on-one session and get
          started with a personal mentor.
        </p>

        <div className="mx-auto mt-6 max-w-sm">
          <WhatsAppButton href={whatsappLink} size="md">
            Book Your One-on-One Session
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
