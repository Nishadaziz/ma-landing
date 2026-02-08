import { Link } from "react-router-dom";
import det3months from "../assets/det3months.webp";

function Bullet({ children }) {
  return (
    <li className="flex gap-3 text-slate-700">
      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function Testimonial({ name, meta, quote }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-900" />
        <div>
          <div className="text-sm font-extrabold text-slate-900">{name}</div>
          <div className="text-xs text-slate-600">{meta}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">“{quote}”</p>
    </div>
  );
}

export default function Program3Months() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10">
      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
            3 Months Complete Course
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Build real skills and aim for a higher DET score
          </h1>

          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            Best for students who want strong improvement. This course builds
            vocabulary, grammar, speaking, and writing step-by-step — plus mocks
            and a clear strategy.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/programs"
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Enroll Now
            </Link>
            <Link
              to="/book-test"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Book Mock / Slot
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
              Weekly roadmap
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
              Skill building
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
              Practice + mocks
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
              Score strategy
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <img
            src={det3months}
            alt="3 Months Complete Course"
            className="h-80 w-full object-cover"
          />
        </div>
      </div>

      {/* Who should enroll */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Who should enroll?
        </h2>
        <ul className="mt-5 space-y-3">
          <Bullet>You want strong improvement and a higher target score.</Bullet>
          <Bullet>You can give consistent time weekly for better results.</Bullet>
          <Bullet>You want to build vocabulary + grammar properly.</Bullet>
          <Bullet>You want structured practice + mock tests throughout.</Bullet>
        </ul>
      </section>

      {/* What you'll get */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-extrabold text-slate-900">
            What you will get
          </h2>
          <ul className="mt-5 space-y-3">
            <Bullet>3-month structured weekly roadmap</Bullet>
            <Bullet>Vocabulary + grammar strengthening plan</Bullet>
            <Bullet>Speaking & writing guidance + practice</Bullet>
            <Bullet>Regular mocks + targeted improvement drills</Bullet>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-8">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Outcome you can expect
          </h2>
          <ul className="mt-5 space-y-3">
            <Bullet>More accurate writing & smoother speaking</Bullet>
            <Bullet>Higher confidence with real test timing</Bullet>
            <Bullet>Better understanding of scoring patterns</Bullet>
            <Bullet>Long-term improvement, not only quick tricks</Bullet>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Student feedback
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Real learner experiences (results vary).
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Testimonial
            name="Student D"
            meta="3 Months Complete Course"
            quote="The weekly roadmap kept me consistent. I finally fixed my grammar mistakes."
          />
          <Testimonial
            name="Student E"
            meta="Speaking improvement"
            quote="My speaking became smoother. I learned how to answer clearly without panic."
          />
          <Testimonial
            name="Student F"
            meta="Mocks + strategy"
            quote="Mocks helped me understand scoring. My performance improved step by step."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/programs"
            className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  );
}
