import { Link } from "react-router-dom";
import SEO from "../../components/seo/SEO";

const individualCourses = [
  {
    name: "Reading",
    description:
      "Master passage analysis, question types, answer-location techniques, and effective time management.",
    link: "/checkout?product=ielts-reading",
  },
  {
    name: "Writing",
    description:
      "Improve Task 1 and Task 2 structure, idea development, coherence, vocabulary, and task response.",
    link: "/checkout?product=ielts-writing",
  },
  {
    name: "Listening",
    description:
      "Develop prediction, concentration, spelling accuracy, and listening question strategies.",
    link: "/checkout?product=ielts-listening",
  },
  {
    name: "Speaking",
    description:
      "Build fluency, confidence, pronunciation, vocabulary, and natural answer development.",
    link: "/checkout?product=ielts-speaking",
  },
];

const supportItems = [
  {
    title: "Structured Lessons",
    description: "Follow an organized preparation path for consistent progress.",
  },
  {
    title: "Guided Practice",
    description: "Practice with clear instructions and exam-focused activities.",
  },
  {
    title: "Exam Strategies",
    description: "Learn practical techniques for different IELTS question types.",
  },
  {
    title: "Progress Support",
    description: "Identify weaknesses and receive support throughout preparation.",
  },
];

export default function ProgramIELTS() {
  return (
    <div className="space-y-10">
      <SEO
        title="IELTS Preparation Courses in Bangladesh | DuoMate"
        description="Explore DuoMate IELTS preparation courses for Reading, Writing, Listening, and Speaking. Choose the complete IELTS program or an individual module course."
        canonicalPath="/programs/ielts"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="transition hover:text-slate-900 hover:underline">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            to="/programs"
            className="transition hover:text-slate-900 hover:underline"
          >
            Programs
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-semibold text-slate-900">IELTS</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            IELTS Preparation
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Build the skills and strategy needed for your target IELTS band
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            Prepare for IELTS Reading, Writing, Listening, and Speaking through
            structured classes, guided practice, exam-focused strategies, and
            continuous support.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/checkout?product=ielts-complete"
              className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
            >
              Enroll in Complete IELTS
            </Link>

            <a
              href="#ielts-courses"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/15"
            >
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Course options */}
      <section id="ielts-courses" className="scroll-mt-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Choose your course
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Complete IELTS or individual module courses
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Join the complete preparation program or focus on the individual
            IELTS module where you need the most improvement.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Complete course */}
          <article className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 p-7 text-white shadow-sm md:col-span-2 md:p-8">
            <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-950">
                  Best Value
                </span>

                <h3 className="mt-4 text-3xl font-extrabold">
                  Complete IELTS Preparation
                </h3>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Prepare for Reading, Writing, Listening, and Speaking through
                  one complete and structured IELTS preparation program.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Reading", "Writing", "Listening", "Speaking"].map(
                    (module) => (
                      <span
                        key={module}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200"
                      >
                        {module}
                      </span>
                    )
                  )}
                </div>
              </div>

              <Link
                to="/checkout?product=ielts-complete"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Purchase Full Course
              </Link>
            </div>
          </article>

          {/* Individual courses */}
          {individualCourses.map((course) => (
            <article
              key={course.name}
              className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                Individual Module
              </p>

              <h3 className="mt-3 text-2xl font-extrabold text-slate-900">
                IELTS {course.name}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {course.description}
              </p>

              <Link
                to={course.link}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Purchase {course.name} Course
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Support section */}
      <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-9">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
            Guided Preparation
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
            Learn with a structured and score-focused approach
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Each course may include live classes, guided practice, feedback,
            mock tests, strategy lessons, and preparation support according to
            the selected module.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-extrabold text-slate-900">{item.title}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-8 text-center md:p-10">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Ready to begin your IELTS preparation?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Choose the complete IELTS course or select the individual module that
          matches your preparation goal.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/checkout?product=ielts-complete"
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
          >
            Buy Complete Course
          </Link>

          <a
            href="#ielts-courses"
            className="rounded-xl border border-amber-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-amber-100"
          >
            Compare Individual Courses
          </a>
        </div>
      </section>
    </div>
  );
}