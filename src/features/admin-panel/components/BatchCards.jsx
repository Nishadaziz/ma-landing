import { Link } from "react-router-dom";
import { summarizeBatch } from "../utils/batchSummary";
import { formatBDT } from "../utils/overviewData";

export default function BatchCards({ batches, enrollments }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold">Batch student summary</h2>
        <Link to="/admin/batches" className="text-sm font-bold text-amber-700">Manage batches →</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {batches.map((batch) => {
          const totals = summarizeBatch(enrollments.filter((row) => row.batch_id === batch.id));
          return <Link key={batch.id} to={`/admin/batches?batch=${batch.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400">
            <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-extrabold">{batch.name}</h3><span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold capitalize text-amber-800">{batch.status.replaceAll("_", " ")}</span></div>
            <p className="mt-4 text-3xl font-extrabold">{totals.students} <span className="text-sm font-medium text-slate-500">students</span></p>
            <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm"><span>Paid <strong className="text-emerald-700">{formatBDT(totals.paid)}</strong></span><span>Due <strong>{formatBDT(totals.due)}</strong></span></div>
            <p className="mt-3 text-xs text-slate-500">{totals.pending} pending · {totals.registrations} enrollment records</p>
            {batch.starts_at && <p className="mt-2 text-xs text-slate-500">Starts {new Date(batch.starts_at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} (Bangladesh)</p>}
            {totals.unknownFees > 0 && <p className="mt-1 text-xs text-slate-500">Balance excludes {totals.unknownFees} enrollment(s) with no recorded fee.</p>}
          </Link>;
        })}
      </div>
      {!batches.length && <p className="text-sm text-slate-500">No batches yet.</p>}
    </section>
  );
}
