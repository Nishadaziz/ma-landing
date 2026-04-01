import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { isAdminEmail } from "../utils/roles";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function handleRedirect() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("AUTH CALLBACK ERROR:", error);
        navigate("/", { replace: true });
        return;
      }

      if (!session?.user) {
        navigate("/", { replace: true });
        return;
      }

      const email = session.user.email || "";
      const returnTo = sessionStorage.getItem("auth_return_to");

      if (isAdminEmail(email)) {
        sessionStorage.removeItem("auth_return_to");
        navigate("/admin", { replace: true });
        return;
      }

      if (returnTo) {
        sessionStorage.removeItem("auth_return_to");
        navigate(returnTo, { replace: true });
        return;
      }

      navigate("/", { replace: true });
    }

    handleRedirect();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm">
        Signing you in...
      </div>
    </div>
  );
}