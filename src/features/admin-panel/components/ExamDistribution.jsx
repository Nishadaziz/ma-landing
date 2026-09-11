const BAR_COLOR = {
  DET: "bg-amber-500",
  IELTS: "bg-slate-900",
  PTE: "bg-sky-500",
  TOEFL: "bg-emerald-500",
};

export default function ExamDistribution({ data = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <h2 className="text-lg font-extrabold text-slate-900">Students by Exam</h2>
      <p className="mt-1 text-sm text-slate-500">
        Share of enrollments per exam track
      </p>

      {data.length ? (
        <div className="mt-6 space-y-5">
          {data.map((item) => (
            <div key={item.exam}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700">{item.exam}</span>
                <span className="font-extrabold text-slate-900">
                  {item.percent}%
                </span>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    BAR_COLOR[item.exam] || "bg-slate-400"
                  }`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">
          No enrollments yet
        </div>
      )}
    </div>
  );
}
