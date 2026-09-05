import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Programs from "../pages/Programs";
import FreeLearning from "../pages/FreeLearning";
import BookTest from "../pages/BookTest";
import Program21Days from "../components/Program21Days";
import Program15Days from "../components/Program15Days";
import Program3Months from "../components/Program3Months";
import Duolingo from "../pages/Duolingo";
import ProgramDuolingo from "../pages/ProgramDuolingo";
import CheckoutDuolingo from "../pages/CheckoutDuolingo";
import CheckoutCrashCourse from "../pages/CheckoutCrashCourse";
import StudentDashboard from "../features/student-dashboard/pages/StudentDashboard";
import AdminDashboard from "../features/admin-panel/pages/AdminDashboard";
import MyCourses from "../features/student-dashboard/pages/MyCourses";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";
import AuthCallback from "../features/auth/pages/AuthCallback";
import { isAdminEmail } from "../features/auth/utils/roles";
import { supabase } from "../lib/supabase";
import ProgramIELTS from "../pages/ielts/ProgramIELTS";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        console.error("AUTH LOAD ERROR:", error);
        setUser(null);
      } else {
        setUser(data?.user ?? null);
      }

      setAuthLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AppContent user={user} authLoading={authLoading} />;
}

function AppContent({ user, authLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !user) return;

    const email = user.email || "";
    const pathname = window.location.pathname;
    const isOnHomePage = pathname === "/" || pathname === "";

    if (isOnHomePage && isAdminEmail(email)) {
      navigate("/admin", { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm">
          Checking login...
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/programs/ielts" element={<ProgramIELTS />} />
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/duolingo" element={<ProgramDuolingo />} />
          <Route path="/programs/1-month" element={<Program21Days />} />
          <Route
            path="/programs/21-days"
            element={<Navigate to="/programs/1-month" replace />}
          />
          <Route path="/programs/15-days" element={<Program15Days />} />
          <Route path="/programs/3-months" element={<Program3Months />} />
          <Route path="/free-learning" element={<FreeLearning />} />
          <Route path="/book-test" element={<BookTest />} />
          <Route path="/checkout/duolingo" element={<CheckoutDuolingo />} />
          <Route path="/checkout/15-days" element={<CheckoutCrashCourse />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/practice/duolingo" element={<Duolingo />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute user={user}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-courses"
            element={
              <ProtectedRoute user={user}>
                <MyCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

