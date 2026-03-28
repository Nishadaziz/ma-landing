import { supabase } from "../lib/supabase";

export default function GoogleSignIn() {
  const signInWithGoogle = async () => {
    const redirectUrl = "http://localhost:5173/auth/callback";
    console.log("OAuth redirectTo =", redirectUrl);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    console.log("OAuth response:", data, error);

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />
      Continue with Google
    </button>
  );
}