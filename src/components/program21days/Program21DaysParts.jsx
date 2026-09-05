import { BadgeCheck, ChevronDown, Quote } from "lucide-react";

/* ---------------- INFO CARD ---------------- */

export function InfoCard({ icon, title, value, subtext, delay = "", className = "", badge = null }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 text-slate-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.25)] hover:border-emerald-300 animate-[fadeInUp_0.6s_ease-out_both] ${delay} ${className}`}
    >
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-500 to-sky-500" />

      <div className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm md:h-14 md:w-14">
          {icon}
        </div>

        <div className="min-w-0 flex-1 md:flex-none">
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-700 md:text-sm">
            {title}
          </h3>
          {badge && (
            <span className="mt-1 inline-flex rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-bold text-emerald-700">
              {badge}
            </span>
          )}
          <div className="mt-2 h-0.5 w-14 rounded-full bg-sky-300" />

          <div className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
            {value}
          </div>

          {subtext && (
            <p className="mt-1 text-xs font-semibold text-slate-500 md:text-sm">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- FEATURE PILL ---------------- */

export function FeaturePill({ text }) {
  return (
    <div className="rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-sky-50 px-3 py-2 text-xs font-bold text-slate-700 md:text-sm">
      {text}
    </div>
  );
}

/* ---------------- TESTIMONIAL ---------------- */

export function TestimonialSlide({ student }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-emerald-400 p-[3px] shadow-[0_10px_26px_rgba(245,158,11,0.3)] md:h-28 md:w-28">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
            <span className="text-xl font-extrabold text-slate-900 md:text-2xl">
              {student.score}
            </span>
            <span className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
              DET Score
            </span>
          </div>
        </div>

        <h3 className="mt-4 text-base font-extrabold text-slate-900">
          {student.name}
        </h3>
        <p className="text-xs text-slate-500">{student.meta}</p>

        <div className="relative mt-5 w-full rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <Quote className="h-6 w-6 text-orange-300" />
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {student.quote}
          </p>
        </div>
      </div>

      <div className="group relative">
        {student.image ? (
          <>
            <div className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-[11px] font-extrabold text-white shadow-lg">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified score certificate
            </div>

            <div className="overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-[0_25px_60px_rgba(15,23,42,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <img
                src={student.image}
                alt={`${student.name} Duolingo certificate`}
                className="h-auto max-h-[560px] w-full object-contain"
              />
            </div>
          </>
        ) : (
          <div className="flex h-[280px] flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center md:h-[340px]">
            <h4 className="text-lg font-extrabold text-slate-900">
              Real progress, clear preparation
            </h4>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
              Structured class flow and real test-based preparation from day
              one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */

export function FAQItem({ item, isOpen, onClick, wasOpened }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-emerald-300 bg-emerald-50/60 shadow-sm"
          : wasOpened
          ? "border-emerald-200 bg-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span
          className={`text-sm font-extrabold leading-6 md:text-base ${
            isOpen || wasOpened ? "text-emerald-700" : "text-slate-900"
          }`}
        >
          {item.q}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
            isOpen || wasOpened
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
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-7 text-slate-700 md:px-6">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}