import { Link } from "react-router-dom";

export default function BookTest() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-extrabold">Book Test</h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Test booking is coming soon. All tests are conducted in a single
          <span className="font-semibold text-slate-900"> 4-hour slot</span>.
        </p>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Duolingo English Test (real test)</li>
          <li>IELTS / PTE / TOEFL (mock tests)</li>
          <li>Manual confirmation via WhatsApp</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            Back to Home
          </Link>

          <a
            href="https://wa.me/8801300153200?text=Hi%20DuoMate!%20I%20want%20to%20book%20a%204-hour%20test%20slot."
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
