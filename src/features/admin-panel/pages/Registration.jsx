import { useEffect, useState } from "react";
import { RefreshCw, Mail, Phone } from "lucide-react";
import { getAllEnrollments } from "../../enrollments/api/getAllEnrollments";
import { formatBDT } from "../utils/overviewData";

const STATUS_STYLE = {
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function studentKey(row) {
  return (row.student_email || row.student_phone || row.student_name || "")
    .toLowerCase()
    .trim();
}

// One row per unique student, derived from the same enrollments already
// fetched elsewhere — no new query, no schema change.
function buildStudents(rows) {
  const map = new Map();

  rows.forEach((row) => {
    const key = studentKey(row);
    if (!key) return;

    const approvedAmount =
      row.status === "approved" ? Number(row.payment_amount || 0) : 0;

    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        key,
        name: row.student_name || "—",
        email: row.student_email || "",
        phone: row.student_phone || "",
        firstRegistered: row.submitted_at,
        enrollmentCount: 1,
        totalSpent: approvedAmount,
        latestStatus: row.status,
        latestDate: row.submitted_at,
      });
      return;
    }

    existing.enrollmentCount += 1;
    existing.totalSpent += approvedAmount;

    if (row.submitted_at && new Date(row.submitted_at) < new Date(existing.firstRegistered)) {
      existing.firstRegistered = row.submitted_at;
    }

    if (row.submitted_at && new Date(row.submitted_at) > new Date(existing.latestDate)) {
      existing.latestDate = row.submitted_at;
      existing.latestStatus = row.status;
    }
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.firstRegistered || 0) - new Date(a.firstRegistered || 0)
  );
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-BD", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Registration() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllEnrollments()
      .then((rows) => setStudents(buildStudents(rows || [])))
      .catch((loadError) => {
        console.error("REGISTRATION LOAD ERROR:", loadError);
        setError(loadError.message || "Could not load registrations.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Registration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Everyone who has registered by submitting a course enrollment.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-semibold text-slate-500">
            <RefreshCw className="animate-spin" size={16} />
            Loading registrations...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : students.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">
            No registrations yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="py-2.5 pr-4">Student</th>
                  <th className="py-2.5 pr-4">Contact</th>
                  <th className="py-2.5 pr-4">Registered</th>
                  <th className="py-2.5 pr-4">Enrollments</th>
                  <th className="py-2.5 pr-4">Total Spent</th>
                  <th className="py-2.5">Latest Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.key}>
                    <td className="py-3 pr-4 font-bold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-3 pr-4 text-slate-600">
                      <div className="flex flex-col gap-1">
                        {student.email ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Mail size={13} className="text-slate-400" />
                            {student.email}
                          </span>
                        ) : null}
                        {student.phone ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Phone size={13} className="text-slate-400" />
                            {student.phone}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-500">
                      {formatDate(student.firstRegistered)}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">
                      {student.enrollmentCount}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">
                      {formatBDT(student.totalSpent)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${
                          STATUS_STYLE[student.latestStatus] ||
                          "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {student.latestStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
