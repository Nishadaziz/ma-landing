import { useEffect, useRef, useState } from "react";

/* ---------- Hook: detect section in view (once) ---------- */
function useInViewOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ---------- Hook: count up animation ---------- */
function useCountUp(end, startWhen, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let current = 0;
    const step = end / (duration / 16);

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, startWhen]);

  return count;
}

/* ---------- Stat Card ---------- */
function StatCard({ icon, end, suffix = "", label, startWhen }) {
  const value = useCountUp(end, startWhen);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-9 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <span className="text-6xl">{icon}</span>
      </div>

      {/* Value */}
      <div className="mt-7 text-center">
        <div className="text-2xl md:text-5xl font-extrabold text-slate-900 whitespace-nowrap">
          {value}
          {suffix}
        </div>

        {/* Label */}
        <div className="mt-3 text-base font-medium leading-snug text-slate-700">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function DETStatsSection() {
  const { ref, inView } = useInViewOnce();

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            DUOLINGO ENGLISH TEST — FAST, AFFORDABLE & GLOBAL
          </h2>

          <p className="subtitle-animate mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            A modern English proficiency test trusted by universities worldwide.
            <span className="relative ml-1 inline-block font-semibold text-slate-700">
              Prepare confidently with Duomate
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-emerald-300/70" />
            </span>
          </p>
        </div>

        {/* Stats grid — 4 cards (3M removed) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon="🏛️"
            end={7000}
            suffix="+"
            label="Universities worldwide accept DET scores"
            startWhen={inView}
          />

          <StatCard
            icon="💵"
            end={70}
            suffix=" USD"
            label="Lower-cost testing vs. traditional exams"
            startWhen={inView}
          />

          <StatCard
            icon="⏱️"
            end={48}
            suffix=" hrs"
            label="Official results delivered quickly"
            startWhen={inView}
          />

          <StatCard
            icon="🌍"
            end={150}
            suffix="+"
            label="Countries and regions recognize DET scores"
            startWhen={inView}
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-xs text-slate-500">
          *Figures are approximate and may change. Always verify details with
          official Duolingo English Test sources.
        </p>
      </div>
    </section>
  );
}
