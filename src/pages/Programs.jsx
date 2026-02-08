import { Link } from "react-router-dom";
import DETServicesSection from "../components/DETServicesSection";
import DuolingoAPI from "../components/duolingoPage/DuolingoAPI";

export default function Programs() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="space-y-14">
      {/* ================= HEADER ================= */}
      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-extrabold">Programs</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Calm, structured coaching designed for test performance and real-life
          speaking confidence.
        </p>

        {/* Nav buttons (scroll on same page) */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo("duolingo")}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Duolingo
          </button>

          <button
            onClick={() => scrollTo("ielts")}
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            IELTS
          </button>

          <button
            onClick={() => scrollTo("pte")}
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            PTE
          </button>

          <button
            onClick={() => scrollTo("spoken")}
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            Spoken
          </button>
        </div>

        {/* Optional CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/practice/duolingo"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Start Duolingo Practice
          </Link>
          <Link
            to="/"
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* ================= DUOLINGO ================= */}
      <section id="duolingo" className="scroll-mt-28 space-y-10">
        <DuolingoAPI />
        <DETServicesSection />
      </section>

      {/* ================= IELTS ================= */}
      <section
        id="ielts"
        className="scroll-mt-28 rounded-3xl border bg-white p-8"
      >
        <h2 className="text-2xl font-extrabold text-slate-900">
          IELTS Preparation
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Mock-based IELTS coaching with structured templates, timing strategy,
          and band score guidance.
        </p>

        <div className="mt-6 rounded-xl border bg-slate-50 p-4">
          <div className="text-sm font-semibold">How to enroll</div>
          <div className="mt-1 text-sm text-slate-600">
            Message DuoMate on WhatsApp to confirm your target band and schedule.
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-700">
            Pricing via WhatsApp
          </div>
        </div>
      </section>

      {/* ================= PTE ================= */}
      <section
        id="pte"
        className="scroll-mt-28 rounded-3xl border bg-white p-8"
      >
        <h2 className="text-2xl font-extrabold text-slate-900">
          PTE Preparation
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          PTE-focused mock tests, scoring patterns, speaking fluency, and
          time-management strategy.
        </p>

        <div className="mt-6 rounded-xl border bg-slate-50 p-4">
          <div className="text-sm font-semibold">How to enroll</div>
          <div className="mt-1 text-sm text-slate-600">
            Message DuoMate on WhatsApp to confirm your goal and timeline.
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-700">
            Pricing via WhatsApp
          </div>
        </div>
      </section>

      {/* ================= SPOKEN ================= */}
      <section
        id="spoken"
        className="scroll-mt-28 rounded-3xl border bg-white p-8"
      >
        <h2 className="text-2xl font-extrabold text-slate-900">
          Spoken English (3 Months)
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          A dedicated 3-month speaking program focused on fluency,
          pronunciation, confidence, and real-life communication.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>• Daily speaking routines & weekly roadmap</li>
          <li>• Pronunciation & fluency correction</li>
          <li>• Real-life + test-style speaking topics</li>
          <li>• Continuous feedback & progress tracking</li>
        </ul>

        <div className="mt-6 rounded-xl border bg-slate-50 p-4">
          <div className="text-sm font-semibold">How to enroll</div>
          <div className="mt-1 text-sm text-slate-600">
            Message DuoMate on WhatsApp to discuss your speaking goals.
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-700">
            Pricing via WhatsApp
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="rounded-3xl border bg-slate-50 p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">
          A professional learning experience
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Clear structure, realistic practice, and friendly guidance — no
          clutter, no confusion.
        </p>
      </section>
    </div>
  );
}
