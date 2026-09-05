import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import SEO from "../components/seo/SEO";
import { ChevronDown } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Duolingo English Test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Duolingo English Test is an online English proficiency exam accepted by many universities worldwide. It measures reading, writing, listening, and speaking skills.",
      },
    },
    {
      "@type": "Question",
      name: "How long should I prepare for DET?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you need fast preparation, a 21-day plan can help. If you want deeper improvement and stronger English skills, a 3-month course is a better option.",
      },
    },
    {
      "@type": "Question",
      name: "Does DuoMate provide mock tests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DuoMate includes guided practice, mock tests, and score-focused preparation to help students improve with confidence.",
      },
    },
  ],
};

const FAQS = [
  {
    question: "What is the Duolingo English Test?",
    answer:
      "The Duolingo English Test is an online English proficiency exam accepted by many universities worldwide. It measures reading, writing, listening, and speaking skills.",
  },
  {
    question: "How long should I prepare for DET?",
    answer:
      "If your exam is close, 21 days can work well. If you want stronger improvement and more complete preparation, 3 months is usually a better option.",
  },
  {
    question: "Does DuoMate provide mock tests?",
    answer:
      "Yes. DuoMate includes guided practice, mock tests, and score-focused preparation so students can improve with more confidence.",
  },
];

function CourseCard({
  badge,
  title,
  text,
  primaryTo,
  secondaryTo,
  primaryLabel,
  secondaryLabel,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
        {badge}
      </div>

      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          to={primaryTo}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          {primaryLabel}
        </Link>

        <Link
          to={secondaryTo}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}

function BlogCard({ title, text, to }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
        Blog / Resource
      </p>
      <h3 className="mt-3 text-xl font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{text}</p>
      <Link
        to={to}
        className="mt-5 inline-flex rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
      >
        Read Article
      </Link>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        isOpen
          ? "border-emerald-200 shadow-sm"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-lg font-extrabold transition-colors duration-300 ${
            isOpen ? "text-emerald-700" : "text-slate-900"
          }`}
        >
          {question}
        </span>

        <span
          className={`shrink-0 rounded-full p-1 transition-all duration-300 ${
            isOpen
              ? "rotate-180 bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-slate-600 leading-7">{answer}</div>
        </div>
      </div>
    </div>
  );
}

export default function DuolingoCourseBangladesh() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <SEO
        title="Duolingo English Test Course in Bangladesh | DuoMate"
        description="Join DuoMate's Duolingo English Test course in Bangladesh with guided preparation, mock tests, speaking practice, and structured score strategy."
        canonicalPath="/duolingo-english-test-course-bangladesh"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="space-y-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
              Duolingo English Test Preparation
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Duolingo English Test Course in Bangladesh
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Prepare for the Duolingo English Test with a clear plan, guided
              practice, and mock-based improvement at DuoMate.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Explore Programs
              </Link>
              <Link
                to="/book-test"
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Book a Test
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Choose your course
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Pick the option that matches your timeline and target.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <CourseCard
              badge="21 Days"
              title="21 Days Crash Course"
              text="A fast-track plan for students with a short deadline. Focused practice, mock tests, and high-frequency DET strategy."
              primaryTo="/checkout/duolingo"
              secondaryTo="/programs/1-month"
              primaryLabel="Enroll Now"
              secondaryLabel="Know More"
            />

            <CourseCard
              badge="3 Months"
              title="3 Months Complete Course"
              text="A deeper preparation path for students who want stronger English skills, better consistency, and long-term improvement."
              primaryTo="/programs"
              secondaryTo="/programs/3-months"
              primaryLabel="View Programs"
              secondaryLabel="Know More"
            />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">
              Structured Preparation
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Clear lessons, focused tasks, and a practical study path.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">
              Mock-Based Learning
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Build confidence with exam-style practice and timed work.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">
              Score Strategy
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Learn how to approach DET tasks more effectively and consistently.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              FAQs
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Short answers to common questions.
            </p>
          </div>

          <div className="grid gap-4">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq((prev) => (prev === index ? -1 : index))
                }
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Blogs & Resources
            </h2>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Helpful articles for future SEO growth and student guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <BlogCard
              title="How to prepare for DET in 21 days"
              text="A focused guide for students who need a short and practical study plan before the exam."
              to="/blog/det-21-days-guide"
            />
            <BlogCard
              title="Common mistakes in the Duolingo English Test"
              text="A simple guide covering common issues in speaking, writing, timing, and test strategy."
              to="/blog/common-det-mistakes"
            />
            <BlogCard
              title="DET score strategy for Bangladesh students"
              text="A practical resource for students who want a clearer plan for improving their DET performance."
              to="/blog/det-score-strategy-bangladesh"
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Start your DET preparation with confidence
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/85">
              Choose the program that fits your timeline and prepare with a more
              structured approach at DuoMate.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Programs
              </Link>
              <Link
                to="/book-test"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Book a Test
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}