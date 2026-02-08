export default function Duolingo() {
  return (
  <div className="min-h-screen bg-yellow-200 p-10">
    <h1 className="text-4xl font-extrabold text-black">PAGE IS RENDERING ✅</h1>
  </div>
);

    return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold">Duolingo Practice</h1>
      <p className="text-slate-600">
        This is the first module we will build. Later we will connect API.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <PracticeCard title="Reading" desc="Short passages + questions (MVP)" />
        <PracticeCard title="Listening" desc="Audio questions (coming soon)" />
        <PracticeCard title="Speaking" desc="Record responses (coming soon)" />
        <PracticeCard title="Writing" desc="Short writing prompts (coming soon)" />
      </div>
    </div>
  );
}

function PracticeCard({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="font-extrabold">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
      <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
        Start
      </button>
    </div>
  );
}
