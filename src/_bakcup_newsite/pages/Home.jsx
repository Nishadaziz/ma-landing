export default function Home() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-extrabold">DuoMate</h1>
      <p className="text-slate-600">
        Welcome to the new website. Use the navbar to visit practice pages, free learning,
        or book a test center slot.
      </p>

      <div className="rounded-2xl border bg-slate-50 p-5">
        <div className="font-bold">Old website</div>
        <p className="mt-1 text-sm text-slate-600">
          Your previous version is still available here:{" "}
          <a className="underline" href="/classic">/classic</a>
        </p>
      </div>
    </div>
  );
}
