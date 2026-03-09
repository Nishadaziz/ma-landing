import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X, Mail, ChevronDown, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/programs", label: "Programs" },
  { to: "/practice/duolingo", label: "Discounts" },
  { to: "/free-learning", label: "Free Learning" },
  { to: "/book-test", label: "Book Test" },
];

function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("options");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setMode("options");
      setForm({ email: "", password: "" });
      setLoadingGoogle(false);
      setLoadingEmail(false);
      setErrorMsg("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg("");
      setLoadingGoogle(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setErrorMsg(error.message || "Google login failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setErrorMsg("");
      setLoadingEmail(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setErrorMsg(error.message || "Login failed. Please try again.");
        return;
      }

      onClose();
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div className="relative z-[101] w-full max-w-md rounded-[30px] border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)] md:p-7">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        <div className="pr-10">
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            DuoMate Account
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            Log in
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Continue with Google or sign in using your email and password.
          </p>
        </div>

        {errorMsg ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMsg}
          </div>
        ) : null}

        {mode === "options" ? (
          <div className="mt-6 space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="text-base font-extrabold">G</span>
              {loadingGoogle ? "Please wait..." : "Continue with Google"}
            </button>

            <button
              onClick={() => {
                setErrorMsg("");
                setMode("email");
              }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <Mail size={16} />
              Continue with Email Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loadingEmail}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingEmail ? "Logging in..." : "Log in"}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                setMode("options");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function MobileMenuLink({ to, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
          isActive
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-white text-slate-700 hover:bg-amber-50 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const activePath = useMemo(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/programs")) return "/programs";
    if (pathname.startsWith("/practice/duolingo")) return "/practice/duolingo";
    if (pathname.startsWith("/free-learning")) return "/free-learning";
    if (pathname.startsWith("/book-test")) return "/book-test";
    return "/";
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(session?.user ?? null);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoginOpen(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setAccountMenuOpen(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current[activePath];
      const navEl = navRef.current;

      if (!activeEl || !navEl) return;

      const activeRect = activeEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();

      setIndicator({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    updateIndicator();

    const timeout = setTimeout(updateIndicator, 40);
    return () => clearTimeout(timeout);
  }, [activePath, scrolled]);

  useEffect(() => {
    const onResize = () => {
      const activeEl = linkRefs.current[activePath];
      const navEl = navRef.current;
      if (!activeEl || !navEl) return;

      const activeRect = activeEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();

      setIndicator({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activePath]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAccountMenuOpen(false);
  };

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Account";

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "";

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-5">
        <div
          className={[
            "mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-[24px] border border-white/60 bg-white/78 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-300",
            scrolled
              ? "px-3 py-2 md:px-4 md:py-1.5"
              : "px-5 py-3.5 md:px-7 md:py-4",
          ].join(" ")}
        >
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="DuoMate Logo"
              className={[
                "w-auto object-contain transition-all duration-300",
                scrolled ? "h-8 md:h-9" : "h-14 md:h-16",
              ].join(" ")}
            />
          </Link>

          <nav
            ref={navRef}
            className="relative hidden items-center rounded-full bg-slate-100/85 p-1 md:flex"
          >
            <span
              className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-amber-500 shadow-[0_8px_18px_rgba(245,158,11,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                ref={(el) => {
                  linkRefs.current[item.to] = el;
                }}
                className={({ isActive }) =>
                  [
                    "relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "text-white"
                      : "text-slate-700 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {!user ? (
              <button
                onClick={() => setLoginOpen(true)}
                className={[
                  "rounded-full border border-slate-200 bg-white font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50",
                  scrolled
                    ? "px-3 py-2 text-xs md:text-sm"
                    : "px-4 py-2.5 text-sm",
                ].join(" ")}
              >
                Log in
              </button>
            ) : (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-2 pr-3 py-1.5 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={displayName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                    {displayName}
                  </span>
                </button>

                {accountMenuOpen ? (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            <Link
              to="/book-test"
              className={[
                "inline-flex items-center gap-2 rounded-full bg-slate-900 font-bold text-white transition hover:bg-slate-800",
                scrolled ? "px-3 py-2 text-xs md:text-sm" : "px-4 py-2.5 text-sm",
              ].join(" ")}
            >
              Enroll Now
              <ChevronDown size={14} className="-rotate-90" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-2 max-w-[1440px] md:hidden">
          <div className="flex gap-2 overflow-x-auto rounded-[22px] border border-white/60 bg-white/82 px-3 py-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            {NAV_ITEMS.map((item) => (
              <MobileMenuLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </MobileMenuLink>
            ))}
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}