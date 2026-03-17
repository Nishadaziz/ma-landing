import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import SEO from "./seo/SEO";
import Program21DaysHero from "./program21days/Program21DaysHero";
import {
  students,
  faqs,
  featureChips,
  syllabusGroups,
} from "./program21days/program21DaysData";
import {
  InfoCard,
  FeaturePill,
  FAQItem,
  TestimonialSlide,
} from "./program21days/Program21DaysParts";

/* ---------------- SYLLABUS DRAWER ---------------- */

function SyllabusDrawer({ item, isOpen, onClick }) {
  const Icon = item.icon;

  return (
    <div
      className={`overflow-hidden rounded-[24px] border bg-white shadow-sm transition-all duration-300 ${
        isOpen
          ? "border-emerald-300 shadow-lg shadow-emerald-100/60"
          : "border-slate-200 hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
              isOpen
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              {item.label}
            </p>
            <h3 className="mt-1 text-base font-extrabold text-slate-900 md:text-lg">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
          </div>
        </div>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
            isOpen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-5 pb-5 pt-4 md:px-6 md:pb-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {item.questions.map((question, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {question.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {question.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-7 text-slate-700">
              <span className="font-extrabold text-emerald-700">Focus:</span>{" "}
              {item.focus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COUNTDOWN ---------------- */

function getTimeLeft(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function Program21Days() {
  const batchStartDate = useMemo(() => new Date("2026-04-01T22:30:00"), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(batchStartDate));
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [openedFaqs, setOpenedFaqs] = useState([0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(batchStartDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [batchStartDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % students.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + students.length) % students.length);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % students.length);

  const handleFaqClick = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
    setOpenedFaqs((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Duolingo English Test 1 Month Preparation Course",
    description:
      "A one month Duolingo English Test preparation course with structured preparation, real question analysis, speaking and writing practice, and score improvement strategies.",
    provider: {
      "@type": "Organization",
      name: "DET Juicy",
    },
    courseMode: "online",
    educationalLevel: "Beginner to Intermediate",
    inLanguage: ["en", "bn"],
  };

  return (
    <>
      <SEO
        title="Duolingo English Test Course Bangladesh | 1 Month DET Preparation"
        description="Join our 1 month Duolingo English Test preparation course in Bangladesh. 12 live classes, structured preparation, speaking-writing practice, and score-focused strategies."
        canonicalPath="/programs/21-days"
      />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>

      <div className="mx-auto max-w-[1150px] px-4 pb-24 pt-5 md:pb-12 md:pt-10">
        <Program21DaysHero timeLeft={timeLeft} />

        <section className="mt-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <InfoCard
              icon={<CalendarDays className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Start"
              value="April 1, 2026"
              subtext="Next batch starting date"
            />
            <InfoCard
              icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
              title="Total Classes"
              value="12 Classes"
              subtext="1 month focused structure"
              delay="[animation-delay:120ms]"
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Days"
              value="Sat, Mon, Wed"
              subtext="Regular weekly routine"
              delay="[animation-delay:240ms]"
            />
            <InfoCard
              icon={<Clock3 className="h-5 w-5 md:h-6 md:w-6" />}
              title="Class Time"
              value="10:30 PM"
              subtext="Online live classes"
              delay="[animation-delay:360ms]"
            />
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[30px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm">
                Full Preparation
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl md:leading-tight">
                Reading, Writing, Listening, Speaking এর total preparation এক
                মাসের মধ্যে
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
                রিয়েল exam-এ একজন candidate যত ধরনের question দেখে, সেগুলো
                analysis করে দেখানো হবে কীভাবে অল্প সময়ের মধ্যে better score
                তোলা যায়। এখানে detailed discussion হবে কীভাবে smart answer
                করতে হয়, score-friendly technique apply করতে হয়, এবং practical
                exam understanding build করতে হয়।
              </p>

              <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Real exam থেকে নেওয়া full question analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>কম সময়ে better score তোলার practical discussion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>
                    Reading, Writing, Listening, Speaking-এর smart techniques
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>
                    Experienced teacher-এর practical, official & unofficial
                    tips and tricks
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Sparkles className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                Smart preparation benefits
              </h3>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {featureChips.map((chip, index) => (
                  <FeaturePill key={index} text={chip} />
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                  Outcome
                </p>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  Random practice-এর বদলে students একটি clean structure follow
                  করতে পারবে, ফলে short time-এর মধ্যে confidence এবং score
                  potential দুইটাই improve হবে।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Course level preparation
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              কোর্সে Duolingo English Test-এর গুরুত্বপূর্ণ question types গুলো
              এখন section-wise structured drawer-এর মাধ্যমে cover করা হবে।
              mobile-এ সব content একসাথে না দেখিয়ে click করলে smoothly বের
              হবে।
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {syllabusGroups.map((item, index) => (
              <SyllabusDrawer
                key={item.title}
                item={item}
                isOpen={openSyllabus === index}
                onClick={() =>
                  setOpenSyllabus((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>
        </section>

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

        <section className="mt-12">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-xs">
              Frequently asked questions
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              সাধারণ কিছু প্রশ্ন
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              এক মাসের Duolingo English Test preparation course সম্পর্কে
              গুরুত্বপূর্ণ তথ্য।
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {faqs.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openFaq === index}
                wasOpened={openedFaqs.includes(index)}
                onClick={() => handleFaqClick(index)}
              />
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[30px] bg-slate-900 p-8 text-center text-white shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/90 md:text-xs">
              Ready to start?
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Secure your seat and aim for 125+ with one of the best available
              teachers
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
              Duolingo-trained professional teacher-এর guideline দিয়ে যদি
              আপনি 125+ score target করতে চান, তাহলে আজই enroll করুন for the
              next batch starting on{" "}
              <span className="font-bold text-white">April 1, 2026</span>.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
              <Link
                to="/checkout/duolingo"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/programs"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Compare Programs
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-[1150px] gap-3">
          <Link
            to="/programs"
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-extrabold text-slate-900"
          >
            Compare
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