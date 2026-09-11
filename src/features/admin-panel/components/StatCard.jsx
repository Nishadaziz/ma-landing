export default function StatCard({ icon: Icon, label, value, description, demo = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            {demo ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                Demo
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>

          {description ? (
            <p className="mt-1.5 text-xs text-slate-500">{description}</p>
          ) : null}
        </div>

        {Icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Icon size={19} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
