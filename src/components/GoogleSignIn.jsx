import { supabase } from "../lib/supabase";

export default function GoogleSignIn() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <button
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