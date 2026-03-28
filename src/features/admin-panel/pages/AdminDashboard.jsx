import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { getAllEnrollments } from "../../enrollments/api/getAllEnrollments";
import { updateEnrollmentStatus } from "../../enrollments/api/updateEnrollmentStatus";

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${
        styles[status] || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllEnrollments();
      setEnrollments(data || []);
    } catch (err) {
      console.error("ADMIN DASHBOARD ERROR:", err);
      setError(err.message || "Failed to load enrollments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleStatusUpdate = async (enrollmentId, nextStatus) => {
    try {
      setActionLoadingId(enrollmentId);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No logged-in admin found.");

      await updateEnrollmentStatus(enrollmentId, nextStatus, user.id);
      await loadEnrollments();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      setError(err.message || "Failed to update enrollment status.");
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-sky-600">
                Admin Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Enrollment Management
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Review submitted payments and approve or reject enrollments.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
              Loading enrollments...
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : enrollments.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
              No enrollments found.
            </div>
          ) : (
            <div className="mt-8 grid gap-5">
              {enrollments.map((item) => {
                const isActing = actionLoadingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900">
                          {item.course_name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Submitted on{" "}
                          {item.submitted_at
                            ? new Date(item.submitted_at).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>

                      <StatusBadge status={item.status} />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">
                          Student info
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Name</span>
                            <span className="text-right font-semibold text-slate-900">
                              {item.student_name}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Email</span>
                            <span className="text-right font-semibold text-slate-900">
                              {item.student_email}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Phone</span>
                            <span className="text-right font-semibold text-slate-900">
                              {item.student_phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">
                          Payment info
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Method</span>
                            <span className="text-right font-semibold capitalize text-slate-900">
                              {item.payment_method}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Paid to</span>
                            <span className="text-right font-semibold text-slate-900">
                              {item.payment_number || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Trx ID</span>
                            <span className="text-right font-semibold text-slate-900">
                              {item.trx_id}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Amount</span>
                            <span className="text-right font-semibold text-slate-900">
                              ৳ {item.payment_amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={isActing || item.status === "approved"}
                        onClick={() => handleStatusUpdate(item.id, "approved")}
                        className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isActing && item.status !== "approved"
                          ? "Updating..."
                          : item.status === "approved"
                          ? "Approved"
                          : "Approve"}
                      </button>

                      <button
                        type="button"
                        disabled={isActing || item.status === "rejected"}
                        onClick={() => handleStatusUpdate(item.id, "rejected")}
                        className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isActing && item.status !== "rejected"
                          ? "Updating..."
                          : item.status === "rejected"
                          ? "Rejected"
                          : "Reject"}
                      </button>
                    </div>

                    {item.reviewed_at ? (
                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                        Reviewed on {new Date(item.reviewed_at).toLocaleString()}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}