import { useEffect, useRef, useState } from "react";

/* ---------------- ACCENT MAP ----------------
   Tailwind needs literal class strings (no dynamic bg-${x}-50 interpolation),
   so every module accent is pre-written here. */
export const MODULE_ACCENTS = {
  rose: {
    chip: "bg-rose-50 text-rose-700 border-rose-200",
    tabActive: "border-rose-500 bg-rose-500 text-white",
    tabInactive: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
    dot: "bg-rose-500",
    soft: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
  },
  sky: {
    chip: "bg-sky-50 text-sky-700 border-sky-200",
    tabActive: "border-sky-500 bg-sky-500 text-white",
    tabInactive: "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100",
    dot: "bg-sky-500",
    soft: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-200",
  },
  emerald: {
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tabActive: "border-emerald-500 bg-emerald-500 text-white",
    tabInactive:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    dot: "bg-emerald-500",
    soft: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  amber: {
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    tabActive: "border-amber-500 bg-amber-500 text-white",
    tabInactive:
      "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
    dot: "bg-amber-500",
    soft: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
};

/* ---------------- COUNT UP ---------------- */

export function useCountUp(target, { duration = 1200, start = true } = {}) {
  const [value, setValue] = useState(start ? 0 : target);

  useEffect(() => {
    if (!start) return;
    let frame;
    let startTime = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}

/* ---------------- BATCH COUNTDOWN ---------------- */

function getTimeLeft(targetDate) {
  const distance = targetDate.getTime() - Date.now();

  if (distance <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    expired: false,
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

/** Ticks every second toward a fixed target Date (e.g. a campaign batch start). */
export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

/** Fires `start=true` once the wrapped element scrolls into view. */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
