import { useEffect, useState } from "react";
import { Trash2, RotateCcw, X } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { getAllEnrollments } from "../../enrollments/api/getAllEnrollments";
import { getTrashedEnrollments } from "../../enrollments/api/getTrashedEnrollments";
import { updateEnrollmentStatus } from "../../enrollments/api/updateEnrollmentStatus";
import { moveEnrollmentToTrash } from "../../enrollments/api/moveEnrollmentToTrash";
import { restoreEnrollmentFromTrash } from "../../enrollments/api/restoreEnrollmentFromTrash";
import { deleteEnrollmentPermanently } from "../../enrollments/api/deleteEnrollmentPermanently";
import { purgeExpiredTrash } from "../../enrollments/api/purgeExpiredTrash";
import { TRASH_RETENTION_DAYS } from "../../enrollments/constants";

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

function daysLeft(deletedAt) {
  if (!deletedAt) return null;
  const purgeDate = new Date(deletedAt);
  purgeDate.setDate(purgeDate.getDate() + TRASH_RETENTION_DAYS);
  const remaining = Math.ceil((purgeDate - Date.now()) / (1000 * 60 * 60 * 24));
  return { purgeDate, remaining: Math.max(remaining, 0) };
}

function EnrollmentCard({ item, isActing, actions, footer }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
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
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={isActing || action.disabled}
            onClick={action.onClick}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60 ${action.className}`}
          >
            {action.icon}
            {isActing ? action.loadingLabel || action.label : action.label}
          </button>
        ))}
      </div>

      {footer}
    </div>
  );
}

export default function Enrollments() {
  const [view, setView] = useState("active");

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trashed, setTrashed] = useState([]);
  const [trashLoading, setTrashLoading] = useState(true);

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

  const loadTrash = async () => {
    try {
      setTrashLoading(true);
      setError("");
      await purgeExpiredTrash();
      const data = await getTrashedEnrollments();
      setTrashed(data || []);
    } catch (err) {
      console.error("ADMIN TRASH LOAD ERROR:", err);
      setError(err.message || "Failed to load trash.");
    } finally {
      setTrashLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
    loadTrash();
  }, []);

  const requireAdmin = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("No logged-in admin found.");
    return user;
  };

  const handleStatusUpdate = async (enrollmentId, nextStatus) => {
    try {
      setActionLoadingId(enrollmentId);
      setError("");
      const user = await requireAdmin();
      await updateEnrollmentStatus(enrollmentId, nextStatus, user.id);
      await loadEnrollments();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      setError(err.message || "Failed to update enrollment status.");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (enrollmentId) => {
    if (!window.confirm("Move this enrollment to trash?")) return;

    try {
      setActionLoadingId(enrollmentId);
      setError("");
      await moveEnrollmentToTrash(enrollmentId);
      await Promise.all([loadEnrollments(), loadTrash()]);
    } catch (err) {
      console.error("DELETE ENROLLMENT ERROR:", err);
      setError(err.message || "Failed to delete enrollment.");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleRestore = async (enrollmentId) => {
    try {
      setActionLoadingId(enrollmentId);
      setError("");
      await restoreEnrollmentFromTrash(enrollmentId);
      await Promise.all([loadEnrollments(), loadTrash()]);
    } catch (err) {
      console.error("RESTORE ENROLLMENT ERROR:", err);
      setError(err.message || "Failed to restore enrollment.");
    } finally {
      setActionLoadingId("");
    }
  };

  const handlePermanentDelete = async (enrollmentId) => {
    if (
      !window.confirm(
        "Permanently delete this enrollment? This cannot be undone."
      )
    )
      return;

    try {
      setActionLoadingId(enrollmentId);
      setError("");
      await deleteEnrollmentPermanently(enrollmentId);
      await loadTrash();
    } catch (err) {
      console.error("PERMANENT DELETE ERROR:", err);
      setError(err.message || "Failed to permanently delete enrollment.");
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-amber-600">
            Admin Panel
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Enrollment Management
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review submitted payments and approve or reject enrollments.
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setView("active")}
          className={`px-4 py-2.5 text-sm font-extrabold transition ${
            view === "active"
              ? "border-b-2 border-amber-500 text-amber-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Enrollments
        </button>
        <button
          type="button"
          onClick={() => setView("trash")}
          className={`px-4 py-2.5 text-sm font-extrabold transition ${
            view === "trash"
              ? "border-b-2 border-amber-500 text-amber-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Trash{trashed.length ? ` (${trashed.length})` : ""}
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      {view === "active" ? (
        loading ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
            Loading enrollments...
          </div>
        ) : enrollments.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
            No enrollments found.
          </div>
        ) : (
          <div className="mt-6 grid gap-5">
            {enrollments.map((item) => {
              const isActing = actionLoadingId === item.id;

              return (
                <EnrollmentCard
                  key={item.id}
                  item={item}
                  isActing={isActing}
                  actions={[
                    {
                      label: "Approve",
                      loadingLabel: "Updating...",
                      disabled: item.status === "approved",
                      onClick: () => handleStatusUpdate(item.id, "approved"),
                      className: "bg-emerald-600 hover:bg-emerald-700",
                    },
                    {
                      label: "Reject",
                      loadingLabel: "Updating...",
                      disabled: item.status === "rejected",
                      onClick: () => handleStatusUpdate(item.id, "rejected"),
                      className: "bg-red-600 hover:bg-red-700",
                    },
                    {
                      label: "Delete",
                      loadingLabel: "Deleting...",
                      icon: <Trash2 size={16} />,
                      onClick: () => handleDelete(item.id),
                      className: "bg-slate-600 hover:bg-slate-700",
                    },
                  ]}
                  footer={
                    item.reviewed_at ? (
                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                        Reviewed on {new Date(item.reviewed_at).toLocaleString()}
                      </div>
                    ) : null
                  }
                />
              );
            })}
          </div>
        )
      ) : trashLoading ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
          Loading trash...
        </div>
      ) : trashed.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
          Trash is empty.
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          <p className="text-sm text-slate-500">
            Items in trash are permanently deleted automatically after{" "}
            {TRASH_RETENTION_DAYS} days.
          </p>

          {trashed.map((item) => {
            const isActing = actionLoadingId === item.id;
            const { purgeDate, remaining } = daysLeft(item.deleted_at) || {};

            return (
              <EnrollmentCard
                key={item.id}
                item={item}
                isActing={isActing}
                actions={[
                  {
                    label: "Restore",
                    loadingLabel: "Restoring...",
                    icon: <RotateCcw size={16} />,
                    onClick: () => handleRestore(item.id),
                    className: "bg-emerald-600 hover:bg-emerald-700",
                  },
                  {
                    label: "Delete permanently",
                    loadingLabel: "Deleting...",
                    icon: <X size={16} />,
                    onClick: () => handlePermanentDelete(item.id),
                    className: "bg-red-600 hover:bg-red-700",
                  },
                ]}
                footer={
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    Deleted on {new Date(item.deleted_at).toLocaleString()}
                    {purgeDate ? (
                      <>
                        {" "}
                        · Auto-deletes on {purgeDate.toLocaleDateString()} (
                        {remaining} day{remaining === 1 ? "" : "s"} left)
                      </>
                    ) : null}
                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
