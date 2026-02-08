export default function FreeLearning() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold">Free Learning</h1>
      <p className="text-slate-600">
        We will publish free and interactive practice resources here.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Daily Vocabulary" desc="Word + meaning + examples + quiz (coming soon)" />
        <Card title="Grammar Practice" desc="Common mistakes and quick fixes (coming soon)" />
        <Card title="Speaking Prompts" desc="Record yourself and improve (coming soon)" />
      </div>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="font-extrabold">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
