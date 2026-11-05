import Resources from "./Resources";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/seo/SEO";

const lessons = [
  { id: "speaking", tag: "Speaking lab", title: "Your mind went blank. What do you say next?", intro: "Practise building an answer from an ordinary moment in Bangladesh.", task: "Describe a place where you like to study. Record a one-minute answer about your room, a campus library, or a quiet corner at home.", example: "I usually study at a small desk beside my window. It gets noisy in the evening, so I prefer early mornings. Last week, I revised there before a class and found it much easier to concentrate.", takeaway: "Try it again with a different place. Give one detail, explain why it matters, and add a real example. This is a practice exercise, not an official test question." },
  { id: "writing", tag: "Writing makeover", title: "Big words? Start with a better detail.", intro: "Watch a vague sentence become something a reader can picture.", task: "Before: My city is very beautiful and has many things.", example: "After: In the evening, the tea stalls near my home fill with students discussing classes over hot cups of tea.", takeaway: "Your turn: describe a street in your town without using nice, good, or beautiful. Choose details you can explain naturally instead of memorising the example." },
  { id: "routine", tag: "Study reset", title: "Only 20 minutes today? Make them count.", intro: "A small practice routine for the gap between classes or after work.", task: "Spend five minutes reading a short English article. Write down its main idea in your own words. Spend the next five minutes explaining that idea aloud.", example: "Use the last ten minutes to write a short opinion, then review it: Is my point clear? Have I explained why? Can I replace a vague phrase with a specific example?",
    takeaway: "Keep your first version. Repeat with a new topic tomorrow and compare clarity, recurring mistakes, and how comfortably you express your ideas. This routine is a study suggestion, not a score guarantee." },
];

export default function Blog() {
  return (
    <div className="space-y-8 py-6 md:py-10">
      <SEO title="Duolingo English Test Blog Bangladesh | DuoMate" description="Duolingo English Test articles in English and Bangla, fee guides, speaking exercises, and practical study tips for Bangladeshi students." canonicalPath="/blog" />
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white md:px-12 md:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">DuoMate journal / Made for Bangladesh</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">Duolingo English Test prep.<br /><span className="text-amber-400">Less scrolling. More doing.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Articles in English and বাংলা, test fee guides, speaking exercises, and practical study tips for Bangladeshi students.</p>
        <p lang="bn" className="mt-4 text-base text-amber-100">মুখস্থের বাইরে, নিজের কথায় ইংরেজি। আজই একটি অনুশীলন করে দেখুন।</p>
        <a href="#speaking" className="mt-8 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300">Try a speaking exercise <ArrowUpRight size={18} /></a>
      </section>
      <Resources embedded />
      <nav aria-label="Browse blog exercises" className="flex flex-wrap gap-3">{lessons.map(lesson => <a key={lesson.id} href={`#${lesson.id}`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-amber-400">{lesson.tag}</a>)}</nav>
      <div className="space-y-6">{lessons.map((lesson, index) => <article key={lesson.id} id={lesson.id} className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">0{index + 1} / {lesson.tag}</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">{lesson.title}</h2>
        <p className="mt-3 text-lg text-slate-600">{lesson.intro}</p>
        <p className="mt-6 leading-7 text-slate-700">{lesson.task}</p>
        <blockquote className="mt-5 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 leading-7 text-slate-800">{lesson.example}</blockquote>
        <p className="mt-5 leading-7 text-slate-600">{lesson.takeaway}</p>
      </article>)}</div>
      <section className="rounded-3xl bg-slate-100 p-6 md:p-10">
        <h2 className="text-2xl font-extrabold text-slate-900">Taking the DET from Bangladesh? Start here.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Before booking, check your chosen university’s current English requirements directly. Use the official DET website for current prices, accepted identification, equipment requirements, and test rules. Then build your preparation around the English skills you need to improve.</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold"><a href="https://englishtest.duolingo.com/" className="underline underline-offset-4">Official DET website ↗</a><Link to="/programs/1-month" className="underline underline-offset-4">Explore our Bangladesh preparation course →</Link><Link to="/free-learning" className="underline underline-offset-4">Try more practice →</Link></div>
        <p className="mt-6 text-xs leading-6 text-slate-500">Original DuoMate practice exercises. DuoMate is an independent preparation provider.</p>
      </section>
    </div>
  );
}
