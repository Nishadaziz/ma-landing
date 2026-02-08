import { Link } from "react-router-dom";
import det21days from "../assets/det21days.webp";
import det3months from "../assets/det3months.webp";

function ServiceCard({ imageSrc, badge, title, desc, bullets, enrollTo, knowMoreTo }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow">
          {badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

        <ul className="mt-5 space-y-2 text-sm text-slate-700">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-wrap gap-3">
          {/* Enroll Now -> Programs overview */}
          <Link
            to={enrollTo}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Enroll Now
          </Link>

          {/* Know More -> Course details */}
          <Link
            to={knowMoreTo}
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            Know More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DETServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Our Services for Duolingo English Test
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Choose a course based on your timeline — fast improvement in 21
            days, or a complete 3-month plan with full practice & guidance.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ServiceCard
            imageSrc={det21days}
            badge="21 Days"
            title="21 Days Crash Course"
            desc="A focused plan for fast improvement — ideal if you have a deadline soon."
            bullets={[
              "Daily practice routine + guided tasks",
              "Mock tests & timed practice",
              "Speaking & writing templates",
              "Strategy for common DET question types",
            ]}
            enrollTo="/programs"
            knowMoreTo="/programs/21-days"
          />

          <ServiceCard
            imageSrc={det3months}
            badge="3 Months"
            title="3 Months Complete Course"
            desc="A complete skill-building program — best for strong score improvement."
            bullets={[
              "Structured weekly roadmap",
              "Vocabulary + grammar strengthening",
              "Speaking & writing feedback guidance",
              "Multiple mocks + score improvement plan",
            ]}
            enrollTo="/programs"
            knowMoreTo="/programs/3-months"
          />
        </div>
      </div>
    </section>
  );
}
