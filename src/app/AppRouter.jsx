import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Programs from "../pages/Programs";
import FreeLearning from "../pages/FreeLearning";
import BookTest from "../pages/BookTest";
import Program21Days from "../components/Program21Days";
import Program3Months from "../components/Program3Months";
import Duolingo from "../pages/Duolingo";
import ProgramDuolingo from "../pages/ProgramDuolingo";
import CheckoutDuolingo from "../pages/CheckoutDuolingo";
import StudentDashboard from "../features/student-dashboard/pages/StudentDashboard";
import AdminDashboard from "../features/admin-panel/pages/AdminDashboard";
import MyCourses from "../features/student-dashboard/pages/MyCourses";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { isAdminEmail } from "../features/auth/utils/roles";
import { supabase } from "../lib/supabase";

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

  return (
    <BrowserRouter>
      <AppContent user={user} authLoading={authLoading} />
    </BrowserRouter>
  );
}

function AppContent({ user, authLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !user) return;

    const email = user.email || "";
    const isOnHomePage =
      window.location.pathname === "/" || window.location.pathname === "";

    // Only auto-redirect after login if user is sitting on home/root.
    // This prevents annoying redirects when they are already on another route.
    if (isOnHomePage) {
      if (isAdminEmail(email)) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/my-courses", { replace: true });
      }
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
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/duolingo" element={<ProgramDuolingo />} />
          <Route path="/programs/21-days" element={<Program21Days />} />
          <Route path="/programs/3-months" element={<Program3Months />} />
          <Route path="/free-learning" element={<FreeLearning />} />
          <Route path="/book-test" element={<BookTest />} />
          <Route path="/checkout/duolingo" element={<CheckoutDuolingo />} />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}