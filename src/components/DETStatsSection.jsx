import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clock3, Globe2, GraduationCap, Wallet } from "lucide-react";
import "./DETStatsSection.css";

const longestCountDuration = 1650;

const acceptingUniversities = [
  ["Yale University", "United States"],
  ["New York University", "United States"],
  ["University of Toronto", "Canada"],
  ["Imperial College London", "United Kingdom"],
];

function useCountUp() {
  const gridRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) {
      setAnimate(false);
      return;
    }

    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        setElapsed(elapsed);
        if (elapsed < longestCountDuration) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    observer.observe(gridRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return { gridRef, elapsed, animate };
}

function StatCard({ icon: Icon, value, duration, timing, suffix = "", unit, label, tone, children }) {
  const progress = timing.animate ? Math.min(timing.elapsed / duration, 1) : 1;
  const eased = progress * progress * (3 - 2 * progress);
  const count = progress < 1 ? Math.floor(value * eased) : value;
  const landed = timing.animate && progress === 1;

  const finalValue = value.toLocaleString("en-US") + suffix;

  return (
    <article className={`det-stat det-stat--${tone}${landed ? " det-stat--landed" : ""}`}>
      <div className="det-stat__summary">
        <span className="det-stat__icon" aria-hidden="true">
          <Icon size={26} strokeWidth={1.8} />
        </span>
        <div>
          <p className="sr-only">{finalValue}{unit && ` ${unit}`}</p>
          <p className="det-stat__value" aria-hidden="true">
            {count.toLocaleString("en-US")}{suffix}{unit && <> <span>{unit}</span></>}
          </p>
          <h3 className="det-stat__label">{label}</h3>
        </div>
      </div>
      {children}
    </article>
  );
}

export default function DETStatsSection() {
  const { gridRef, ...timing } = useCountUp();

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="det-stats-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="text-center">
          <h2 id="det-stats-title" className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            DUOLINGO ENGLISH TEST — FAST, AFFORDABLE & GLOBAL
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            A modern English proficiency test trusted by universities worldwide.
            <strong className="ml-1 font-semibold text-slate-800">Prepare confidently with Duomate.</strong>
          </p>
        </div>

        <div ref={gridRef} className="det-stats-grid">
          <StatCard icon={Wallet} value={70} duration={950} timing={timing} unit="USD" label="Test fee" tone="mint" />
          <StatCard icon={Clock3} value={48} duration={700} timing={timing} unit="hrs" label="Official results" tone="blue" />
          <StatCard icon={GraduationCap} value={7000} duration={longestCountDuration} timing={timing} suffix="+" label="Institutions worldwide" tone="dark">
            <div className="det-stat__details">
              <p className="det-stat__detail-heading">Universities accepting DET</p>
              <ul className="det-stat__universities">
                {acceptingUniversities.map(([name, country]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <small>{country}</small>
                  </li>
                ))}
              </ul>
              <a className="det-stat__link" href="https://www.englishtest.duolingo.com/institutions" target="_blank" rel="noreferrer">
                Explore accepting institutions <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </StatCard>
          <StatCard icon={Globe2} value={150} duration={1200} timing={timing} suffix="+" label="Countries and regions" tone="globe">
            <p className="det-stat__globe-copy">DET scores are recognized around the world.</p>
            <Globe2 className="det-stat__globe" strokeWidth={0.75} aria-hidden="true" />
          </StatCard>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-slate-600">
          Figures are approximate and may change. Acceptance and score requirements vary by program.
          Check official DET sources and your university’s admissions policy.
        </p>
      </div>
    </section>
  );
}
