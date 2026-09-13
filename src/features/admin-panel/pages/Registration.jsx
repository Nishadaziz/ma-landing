import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Mail, Phone } from "lucide-react";
import { getAllEnrollments } from "../../enrollments/api/getAllEnrollments";
import { formatBDT } from "../utils/overviewData";

function studentKey(row) {
  return (row.student_email || row.student_phone || row.student_name || "")
    .toLowerCase()
    .trim();
}

function monthKey(value) {
  if (!value) return "";
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// One row per unique registered (approved) student, derived from the same
// enrollments already fetched elsewhere — no new query, no schema change.
function buildStudents(approvedRows) {
  const map = new Map();

  approvedRows.forEach((row) => {
    const key = studentKey(row);
    if (!key) return;

    const amount = Number(row.payment_amount || 0);
    const existing = map.get(key);

    if (!existing) {
      const courses = new Map();
      if (row.course_slug) courses.set(row.course_slug, row.course_name || row.course_slug);

      map.set(key, {
        key,
        name: row.student_name || "—",
        email: row.student_email || "",
        phone: row.student_phone || "",
        firstRegistered: row.submitted_at,
        enrollmentCount: 1,
        totalSpent: amount,
        courses,
      });
      return;
    }

    existing.enrollmentCount += 1;
    existing.totalSpent += amount;

    if (row.course_slug && !existing.courses.has(row.course_slug)) {
      existing.courses.set(row.course_slug, row.course_name || row.course_slug);
    }

    if (row.submitted_at && new Date(row.submitted_at) < new Date(existing.firstRegistered)) {
      existing.firstRegistered = row.submitted_at;
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

const selectClass =
  "rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-50";

export default function Registration() {
  const [approvedRows, setApprovedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [courseFilter, setCourseFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  useEffect(() => {
    getAllEnrollments()
      .then((rows) => setApprovedRows((rows || []).filter((row) => row.status === "approved")))
      .catch((loadError) => {
        console.error("REGISTRATION LOAD ERROR:", loadError);
        setError(loadError.message || "Could not load registrations.");
      })
      .finally(() => setLoading(false));
  }, []);

  const students = useMemo(() => buildStudents(approvedRows), [approvedRows]);

  const courseOptions = useMemo(() => {
    const map = new Map();
    approvedRows.forEach((row) => {
      if (row.course_slug && !map.has(row.course_slug)) {
        map.set(row.course_slug, row.course_name || row.course_slug);
      }
    });
    return Array.from(map.entries())
      .map(([slug, label]) => ({ slug, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [approvedRows]);

  const monthOptions = useMemo(() => {
    const map = new Map();
    approvedRows.forEach((row) => {
      const key = monthKey(row.submitted_at);
      if (key && !map.has(key)) map.set(key, monthLabel(key));
    });
    return Array.from(map.entries())
      .map(([key, label]) => ({ key, label }))
      .sort((a, b) => (a.key < b.key ? 1 : -1));
  }, [approvedRows]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (courseFilter !== "all" && !student.courses.has(courseFilter)) return false;
      if (monthFilter !== "all" && monthKey(student.firstRegistered) !== monthFilter) return false;
      return true;
    });
  }, [students, courseFilter, monthFilter]);

  const filtersActive = courseFilter !== "all" || monthFilter !== "all";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Registration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Everyone whose enrollment has been approved and registered.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All courses</option>
            {courseOptions.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.label}
              </option>
            ))}
          </select>

          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className={selectClass}
          >
            <option value="all">All months</option>
            {monthOptions.map((month) => (
              <option key={month.key} value={month.key}>
                {month.label}
              </option>
            ))}
          </select>

          {filtersActive ? (
            <button
              type="button"
              onClick={() => {
                setCourseFilter("all");
                setMonthFilter("all");
              }}
              className="text-xs font-bold text-slate-500 transition hover:text-slate-800"
            >
              Clear filters
            </button>
          ) : null}

          <span className="ml-auto text-xs font-semibold text-slate-400">
            {filteredStudents.length} student{filteredStudents.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-6">
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
          ) : filteredStudents.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">
              No students match these filters
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <th className="py-2.5 pr-4">Student</th>
                    <th className="py-2.5 pr-4">Contact</th>
                    <th className="py-2.5 pr-4">Course(s)</th>
                    <th className="py-2.5 pr-4">Registered</th>
                    <th className="py-2.5 pr-4">Enrollments</th>
                    <th className="py-2.5">Total Spent</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
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
                      <td className="py-3 pr-4 text-slate-600">
                        {Array.from(student.courses.values()).join(", ") || "—"}
                      </td>
                      <td className="py-3 pr-4 text-slate-500">
                        {formatDate(student.firstRegistered)}
                      </td>
                      <td className="py-3 pr-4 font-semibold text-slate-900">
                        {student.enrollmentCount}
                      </td>
                      <td className="py-3 font-semibold text-slate-900">
                        {formatBDT(student.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
