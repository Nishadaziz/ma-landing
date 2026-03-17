import { Link } from "react-router-dom";
import DETServicesSection from "../components/DETServicesSection";

export default function ProgramDuolingo() {
  return (
    <div className="space-y-10">
      <nav className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-slate-900 hover:underline">
            Programs
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Duolingo</span>
        </div>
      </nav>

      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Duolingo English Test Preparation
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Explore our complete Duolingo English Test preparation system,
          including course options, support, and essential resources.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/programs/21-days"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            21 Days Course
          </Link>

          <Link
            to="/programs/3-months"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            3 Months Course
          </Link>

          <Link
            to="/practice/duolingo"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-100"
          >
            View Discount Page
          </Link>
        </div>
      </section>

      <DETServicesSection />

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Duolingo Resources
        </h2>
        <p className="mt-2 text-slate-600">
          Here you can later add blogs, score tips, FAQs, success stories, and
          preparation guidance.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">Blogs</h3>
            <p className="mt-2 text-sm text-slate-600">
              Add Duolingo English Test blogs and score-improvement tips here.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-900">Guidance</h3>
            <p className="mt-2 text-sm text-slate-600">
              Add roadmap, FAQs, practice links, and candidate instructions here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}