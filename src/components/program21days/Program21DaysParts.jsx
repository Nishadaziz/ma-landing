import { CheckCircle2, ChevronDown } from "lucide-react";

/* ---------------- INFO CARD ---------------- */

export function InfoCard({ icon, title, value, subtext, delay = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6 ${delay}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-400 to-teal-400 opacity-90" />

      <div className="flex items-start gap-3 md:flex-col md:items-center md:text-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:scale-105 group-hover:bg-emerald-100 md:h-14 md:w-14">
          {icon}
        </div>

        <div className="min-w-0 flex-1 md:flex-none">
          <h3 className="text-sm font-extrabold leading-snug text-slate-900 md:mt-4 md:text-lg">
            {title}
          </h3>

          <div className="mt-1 text-base font-extrabold leading-tight text-slate-900 md:mt-2 md:text-2xl">
            {value}
          </div>

          {subtext && (
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 md:text-sm">
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
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-700">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <div className="font-extrabold text-slate-900">{student.name}</div>
            <div className="text-xs text-slate-500">{student.meta}</div>
          </div>
        </div>

        <div className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          Score: {student.score}
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-700 md:text-[15px]">
          {student.quote}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-4 md:p-5">
        {student.image ? (
          <>
            <div className="absolute left-4 top-4 z-10 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm">
              Verified score
            </div>

            <div className="flex min-h-[240px] items-center justify-center md:min-h-[260px]">
              <img
                src={student.image}
                alt={`${student.name} Duolingo certificate`}
                className="max-h-[420px] w-full rounded-[18px] object-contain shadow-sm"
              />
            </div>
          </>
        ) : (
          <div className="flex h-[240px] flex-col items-center justify-center text-center md:h-[260px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-slate-900">
              Real progress, clear preparation
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-600">
              Structured class flow, practical guideline, and real test-based
              preparation that helps students feel ready before exam day.
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