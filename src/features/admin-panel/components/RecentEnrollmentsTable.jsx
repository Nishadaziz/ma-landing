import { Link } from "react-router-dom";
import { formatBDT } from "../utils/overviewData";

const STATUS_STYLE = {
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABEL = {
  approved: "Paid",
  pending: "Pending",
  rejected: "Rejected",
};

export default function RecentEnrollmentsTable({ rows = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Recent Enrollments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest course purchases across all programs
          </p>
        </div>

        <Link
          to="/admin/enrollments"
          className="shrink-0 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50"
        >
          View All
        </Link>
      </div>

      {rows.length ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                <th className="py-2.5 pr-4">Student</th>
                <th className="py-2.5 pr-4">Program</th>
                <th className="py-2.5 pr-4">Exam</th>
                <th className="py-2.5 pr-4">Amount</th>
                <th className="py-2.5 pr-4">Method</th>
                <th className="py-2.5 pr-4">Status</th>
                <th className="py-2.5">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row, index) => (
                <tr key={`${row.student}-${index}`}>
                  <td className="py-3 pr-4 font-bold text-slate-900">
                    {row.student}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{row.program}</td>
                  <td className="py-3 pr-4 text-slate-600">{row.exam}</td>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {formatBDT(row.amount)}
                  </td>
                  <td className="py-3 pr-4 text-slate-600 capitalize">
                    {row.method}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        STATUS_STYLE[row.status] ||
                        "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {STATUS_LABEL[row.status] || row.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">
          No enrollments yet
        </div>
      )}
    </div>
  );
}
