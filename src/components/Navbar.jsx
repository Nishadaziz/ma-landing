import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X, Mail, ChevronDown, LogOut, Menu } from "lucide-react";
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
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
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
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
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

function MobileDrawerLink({ to, children, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
          isActive
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-slate-50 text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      <span>{children}</span>
      <ChevronDown size={14} className="-rotate-90" />
    </NavLink>
  );
}

export default function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const accountMenuRef = useRef(null);

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
    const onScroll = () => {
      const shouldShrink = window.scrollY > 40;
      setScrolled((prev) => (prev !== shouldShrink ? shouldShrink : prev));
    };

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
      } else {
        setAccountMenuOpen(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const frame = requestAnimationFrame(updateIndicator);
    const timeout = setTimeout(updateIndicator, 60);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [activePath]);

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

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
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
            "mx-auto flex w-full max-w-[1440px] items-center justify-between border border-white/60 bg-white/78 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-300",
            scrolled
              ? "rounded-[20px] px-3 py-2 md:rounded-[22px] md:px-4 md:py-1.5"
              : "rounded-[24px] px-4 py-3 md:px-7 md:py-4",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/" className="flex shrink-0 items-center">
              <img
                src={logo}
                alt="DuoMate Logo"
                className={[
                  "w-auto object-contain transition-all duration-300",
                  scrolled ? "h-8 md:h-9" : "h-11 md:h-16",
                ].join(" ")}
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            className="relative hidden items-center rounded-full bg-slate-100/85 p-1 md:flex"
          >
            <span
              className="pointer-events-none absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-amber-500 shadow-[0_8px_18px_rgba(245,158,11,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{
                width: indicator.width,
                opacity: indicator.opacity,
                transform: `translateX(${indicator.left}px)`,
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

          <div className="hidden items-center gap-2 md:flex">
            {!user ? (
              <button
                onClick={() => setLoginOpen(true)}
                className={[
                  "rounded-full border border-slate-200 bg-white font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50",
                  scrolled ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm",
                ].join(" ")}
              >
                Log in
              </button>
            ) : (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
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

                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountMenuOpen ? (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
                    <div className="mb-2 border-b border-slate-100 px-3 pb-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {displayName}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            <Link
              to="/programs/21-days"
              className={[
                "inline-flex items-center gap-2 rounded-full bg-slate-900 font-bold text-white transition hover:bg-slate-800",
                scrolled ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm",
              ].join(" ")}
            >
              Enroll Now
              <ChevronDown size={14} className="-rotate-90" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/programs/21-days"
              className="inline-flex items-center rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              Enroll
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[90] md:hidden">
          <button
            aria-label="Close mobile menu backdrop"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />

          <div className="absolute right-3 top-3 w-[calc(100%-24px)] max-w-sm rounded-[28px] border border-white/60 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="DuoMate Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close mobile menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <MobileDrawerLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </MobileDrawerLink>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              {!user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginOpen(true);
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Log in
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={displayName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {displayName}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}

              <Link
                to="/programs/21-days"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Enroll in 21 Days Course
                <ChevronDown size={14} className="-rotate-90" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}