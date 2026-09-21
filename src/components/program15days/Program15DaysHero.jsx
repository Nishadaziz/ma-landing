
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import det15DaysStudentFull from "../../assets/program15days/det-15-days-student-full.jpg";
import partnerNetwork from "../../assets/Main-Color.svg";

const courseFeatures = [
  "Live Classes",
  "Mock Tests",
  "Interactive Sessions",
  "Experienced Mentors",
  "Real Exam Solving",
  "Class Recordings",
];

function CountdownUnit({ label, value, delay = 0 }) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <div
      className="countdown-unit group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.09] px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md md:px-4 md:py-4"
      style={{ "--countdown-delay": `${delay}ms` }}
    >
      <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
      <div className="relative h-8 overflow-hidden md:h-9">
        <span
          key={formattedValue}
          className="countdown-number block bg-gradient-to-b from-white via-white to-emerald-200 bg-clip-text text-2xl font-black tabular-nums leading-8 text-transparent md:text-3xl md:leading-9"
        >
          {formattedValue}
        </span>
      </div>
      <div className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white/60 md:text-[10px] md:tracking-[0.18em]">
        {label}
      </div>
      <span className="countdown-unit-glow pointer-events-none absolute -bottom-7 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-emerald-400/25 blur-xl" />
    </div>
  );
}

function CountdownPanel({ timeLeft, batchDateLabel }) {
  return (
    <div className="countdown-shell relative overflow-hidden rounded-[24px] p-px text-white shadow-[0_20px_50px_rgba(2,6,23,0.22)]">
      <div className="countdown-aurora pointer-events-none absolute -left-12 -top-20 h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="countdown-aurora countdown-aurora-delayed pointer-events-none absolute -bottom-24 -right-14 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[23px] border border-white/10 bg-slate-950/95 p-4 md:p-5">
        <div className="countdown-orbit pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border border-emerald-300/10" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300 md:text-[11px]">
            <span className="h-5 w-1 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
            Batch countdown
          </div>

          {!timeLeft.expired && !timeLeft.isUrgent && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-200 md:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)] animate-pulse" />
              Booking open
            </span>
          )}

          {!timeLeft.expired && timeLeft.isUrgent && !timeLeft.isToday && (
            <span className="rounded-full border border-red-300/20 bg-red-500/20 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-red-200 animate-pulse md:text-[10px]">
              Ending soon
            </span>
          )}

          {!timeLeft.expired && timeLeft.isToday && (
            <span className="rounded-full border border-amber-300/20 bg-amber-500/20 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-200 md:text-[10px]">
              Starting today
            </span>
          )}
        </div>

        {timeLeft.expired ? (
          <p className="mt-4 text-sm font-bold text-white">
            Batch has started. Enroll for the next available seat.
          </p>
        ) : (
          <div
            className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2.5"
            aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds until the next batch`}
          >
            <CountdownUnit label="Days" value={timeLeft.days} delay={0} />
            <CountdownUnit label="Hours" value={timeLeft.hours} delay={70} />
            <CountdownUnit label="Minutes" value={timeLeft.minutes} delay={140} />
            <CountdownUnit label="Seconds" value={timeLeft.seconds} delay={210} />
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <div className="countdown-track relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="countdown-shimmer absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
          </div>
          <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/40">
            Seat clock
          </span>
        </div>

        <p className="mt-3 text-[11px] leading-5 text-white/65 md:text-xs md:leading-6">
          Next batch starts on{" "}
          <span className="font-extrabold text-white">{batchDateLabel}</span>
        </p>
      </div>
    </div>
  );
}

function RotatingCourseFeature() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((current) => (current + 1) % courseFeatures.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[190px] overflow-hidden rounded-2xl border border-white/35 bg-slate-950/80 px-4 py-3 shadow-[0_14px_36px_rgba(2,6,23,0.24)] backdrop-blur-xl sm:w-[220px]">
      <span className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />

      <div className="relative flex min-h-6 items-center gap-2 overflow-hidden">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
        <span
          key={courseFeatures[activeFeature]}
          className="course-feature-swap text-xs font-extrabold tracking-wide text-white sm:text-sm"
        >
          {courseFeatures[activeFeature]}
        </span>
      </div>

      <div className="relative mt-2 flex gap-1" aria-hidden="true">
        {courseFeatures.map((feature, index) => (
          <span
            key={feature}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              index === activeFeature
                ? "w-5 bg-emerald-300"
                : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Program15DaysHero({ timeLeft, batchDateLabel }) {
  return (
    <>
      <section className="mb-6 overflow-hidden rounded-[26px] border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Official Partner
              </p>

              <h2 className="text-sm font-extrabold text-slate-900 md:text-base">
                Global Partner Network
              </h2>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <img
              src={partnerNetwork}
              alt="Duolingo English Test Global Partner Network"
              className="h-auto w-full object-contain md:max-w-[480px]"
            />
          </div>
        </div>
      </section>

      <section className="hero-course-shell overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:rounded-[36px]">
        <div className="relative overflow-hidden bg-white lg:aspect-[1676/941] lg:min-h-[610px]">
          <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 lg:h-full lg:w-[49%] lg:p-10 xl:p-12">
            <div className="inline-flex w-fit rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:text-xs">
              15 Days Crash Course
            </div>

            <h1 className="bensen-font mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-[42px] xl:text-5xl">
              Duolingo English Test - <br />
              ১৫ দিনে <span className="text-orange-500">110-140</span> স্কোরের
              ক্র্যাশ কোর্স প্রস্তুতি
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              সময় কম হাতে? এই ইনটেনসিভ ১৫ দিনের ক্র্যাশ কোর্সে ৫ বছরের experience
              এবং ৫,০০০+ trusted student-এর ভিত্তিতে তৈরি organized preparation
              material দিয়ে দ্রুত exam-ready হয়ে উঠুন।
            </p>

          </div>

          <picture className="block lg:absolute lg:inset-0 lg:z-0">
            <img
              src={det15DaysStudentFull}
              width="1600"
              height="898"
              alt="Student preparing for the Duolingo English Test in the 15-day crash course"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full lg:h-full lg:w-full lg:object-contain"
            />
          </picture>

          <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.96)_34%,rgba(255,255,255,0.78)_46%,rgba(255,255,255,0.18)_62%,transparent_74%)] lg:block" />

          <div className="absolute bottom-3 right-3 z-20 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6">
            <RotatingCourseFeature />
          </div>
        </div>

        <div className="grid gap-5 border-t border-slate-200/80 bg-white/95 p-4 backdrop-blur md:p-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <CountdownPanel
            timeLeft={timeLeft}
            batchDateLabel={batchDateLabel}
          />

          <div>
            <div className="flex flex-col gap-3">
              <Link
                to="/checkout/15-days"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-7 py-4 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_16px_34px_rgba(5,150,105,0.22)]"
              >
                Enroll Now
              </Link>
            </div>

            <div className="mt-4 flex justify-center text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-center">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Limited seats in upcoming batch
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
