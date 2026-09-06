import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";

export default function FreeLearning() {
  return (
    <div className="space-y-8">
      <SEO
        title="Free English Practice | Duomate"
        description="Free speaking prompts, vocabulary themes, and grammar practice from Duomate — coming soon."
        canonicalPath="/free-learning"
        ogImage="https://www.duomatebd.com/og-free-learning.png"
      />

      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-extrabold">Free Learning</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Coming soon. This section will include speaking prompts, vocabulary
          themes, grammar fixes, and practice-friendly lessons.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-slate-50"
          >
            Back to Home
          </Link>

          <Link
            to="/practice/duolingo"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Practice Duolingo
          </Link>
        </div>
      </section>
    </div>
  );
}
