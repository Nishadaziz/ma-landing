import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { getApprovedCourses } from "../../enrollments/api/getApprovedCourses";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("No logged-in user found.");

        const data = await getApprovedCourses(user.id);
        setCourses(data || []);
      } catch (err) {
        console.error("MY COURSES ERROR:", err);
        setError(err.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
                Student Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                My Courses
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Your approved courses will appear here automatically.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
              Loading courses...
            </div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : courses.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
              No approved courses yet.
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        {course.course_name}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Approved on{" "}
                        {course.reviewed_at
                          ? new Date(course.reviewed_at).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>

                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      Enrolled
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Status</span>
                      <span className="font-semibold text-emerald-700">
                        Approved
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-900">
                      You are enrolled in this course ✅
                    </p>

                    <p className="mt-2 text-sm text-slate-700">
                      You will be added to the official WhatsApp group shortly.
                      All classes, materials, and guidance will be shared there.
                    </p>

                    <a
                      href="https://wa.me/8801300153200"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                    >
                      Contact on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}