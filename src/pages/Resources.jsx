import { useState } from "react";
import { BookOpen, Play, FileText, Search, Library } from "lucide-react";
import SEO from "../components/seo/SEO";

const categories = [
  { label: "All", icon: Library },
  { label: "Blogs", icon: BookOpen },
  { label: "Videos", icon: Play },
  { label: "Study guides", icon: FileText },
];

// Add published resources here with: id, title, description, category, and href.
const resources = [];

export default function Resources() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visible = resources.filter((resource) =>
    (category === "All" || resource.category === category) &&
    `${resource.title} ${resource.description}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="space-y-8 py-6 md:py-10">
      <SEO title="Resources — Blogs, Videos & Study Guides | DuoMate" description="Explore DuoMate blogs, videos, and study guides for your English test preparation." canonicalPath="/resources" />
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white md:px-12 md:py-16">
        <div aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-amber-300">The DuoMate library</p>
        <h1 className="relative mt-4 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">Learn something.<br /><span className="text-amber-400">Move forward.</span></h1>
        <p className="relative mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">Blogs, videos, and practical study guides to help you build your English skills and prepare with confidence.</p>
        <div className="relative mt-8 flex flex-wrap gap-5 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><BookOpen size={17} aria-hidden="true" />Blogs</span><span className="inline-flex items-center gap-2"><Play size={17} aria-hidden="true" />Videos</span><span className="inline-flex items-center gap-2"><FileText size={17} aria-hidden="true" />Study guides</span>
        </div>
      </section>

      <section aria-labelledby="browse-resources" className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div><h2 id="browse-resources" className="text-2xl font-extrabold text-slate-900">Explore resources</h2><p className="mt-2 text-sm text-slate-500">Read, watch, and learn at your own pace.</p></div>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-400">
            <Search size={18} aria-hidden="true" className="shrink-0 text-slate-400" />
            <span className="sr-only">Search resources</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources…" className="min-w-0 w-full bg-transparent text-sm outline-none lg:w-56" />
          </label>
        </div>
        <div role="group" aria-label="Filter resources by format" className="mt-7 flex flex-wrap gap-2">
          {categories.map(({ label }) => <button key={label} type="button" aria-pressed={category === label} onClick={() => setCategory(label)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${category === label ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{label}</button>)}
        </div>
        <div aria-live="polite" className="mt-8">
          {visible.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((resource) => <a key={resource.id} href={resource.href} className="rounded-2xl border border-slate-200 p-6 transition hover:border-amber-400 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-wider text-amber-700">{resource.category}</p><h3 className="mt-3 text-lg font-bold text-slate-900">{resource.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p></a>)}</div> : <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center"><Library size={32} aria-hidden="true" className="mx-auto text-slate-400" /><h3 className="mt-4 text-lg font-bold text-slate-900">{query.trim() ? "No matching resources" : "New resources are on the way"}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{query.trim() ? "Try another search or browse a different format." : "Our blogs, videos, and study guides will appear here as they are published."}</p></div>}
        </div>
      </section>
    </div>
  );
}
