import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  X,
  Mail,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Sparkles,
  BookOpen,
  Clock3,
  FolderOpen,
  Languages,
  GraduationCap,
  FileText,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/practice/duolingo", label: "Discounts" },
  { to: "/free-learning", label: "Free Learning" },
  { to: "/book-test", label: "Book Test" },
];

const PROGRAM_GROUPS = [
  {
    key: "duolingo",
    label: "Duolingo",
    desc: "Structured DET preparation paths",
    icon: Languages,
    to: "/programs",
    children: [
      {
        to: "/programs/21-days",
        label: "21 Days Program",
        desc: "Fast-track structured preparation",
        icon: Clock3,
      },
      {
        to: "/programs/3-months",
        label: "3 Months Program",
        desc: "Full guided premium preparation",
        icon: BookOpen,
      },
    ],
  },
  {
    key: "ielts",
    label: "IELTS",
    desc: "Goal-based IELTS preparation",
    icon: GraduationCap,
    to: "/programs",
  },
  {
    key: "pte",
    label: "PTE",
    desc: "Practical PTE-focused coaching",
    icon: FileText,
    to: "/programs",
  },
  {
    key: "toefl",
    label: "TOEFL",
    desc: "TOEFL preparation and guidance",
    icon: FileText,
    to: "/programs",
  },
];

function LoginModal({ open, onClose }) {
  const location = useLocation();

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

      sessionStorage.setItem(
        "auth_return_to",
        `${location.pathname}${location.search}${location.hash}`
      );

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
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

      sessionStorage.setItem(
        "auth_return_to",
        `${location.pathname}${location.search}${location.hash}`
      );

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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
      />

      <div className="relative z-[121] w-full max-w-md overflow-hidden rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_90px_rgba(15,23,42,0.28)] md:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-50 to-transparent" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        <div className="relative pr-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            <Sparkles size={12} />
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

function DesktopNavLink({ to, children, end = false, registerRef }) {
  return (
    <NavLink
      to={to}
      end={end}
      ref={registerRef}
      className={({ isActive }) =>
        [
          "relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
          isActive ? "text-white" : "text-slate-700 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function ProgramsDesktopItem({
  active,
  open,
  setOpen,
  registerRef,
  dropdownRef,
}) {
  const [hoveredGroup, setHoveredGroup] = useState("duolingo");

  useEffect(() => {
    if (!open) {
      setHoveredGroup("duolingo");
    }
  }, [open]);

  const activeGroup =
    PROGRAM_GROUPS.find((group) => group.key === hoveredGroup) ||
    PROGRAM_GROUPS[0];

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        ref={registerRef}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
          active || open ? "text-white" : "text-slate-700 hover:text-slate-900",
        ].join(" ")}
      >
        Programs
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <>
          <div className="absolute left-0 right-0 top-full h-4" />

          <div className="absolute left-1/2 top-[calc(100%+14px)] z-40 w-[680px] -translate-x-1/2">
            <div className="grid grid-cols-[280px_1fr] overflow-hidden rounded-[24px] border border-white/80 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
              <div className="border-r border-slate-100 p-3">
                <div className="mb-2 px-2 pt-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                    Test Categories
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose your target test first.
                  </p>
                </div>

                <div className="space-y-2">
                  {PROGRAM_GROUPS.map((group) => {
                    const Icon = group.icon;
                    const isActive = activeGroup.key === group.key;

                    return (
                      <div
                        key={group.key}
                        onMouseEnter={() => setHoveredGroup(group.key)}
                        className={[
                          "rounded-2xl border px-3 py-3 transition",
                          isActive
                            ? "border-amber-100 bg-amber-50/70"
                            : "border-transparent hover:border-amber-100 hover:bg-amber-50/50",
                        ].join(" ")}
                      >
                        <Link
                          to={group.to}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={[
                              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition",
                              isActive ? "bg-amber-500" : "bg-slate-900",
                            ].join(" ")}
                          >
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-bold text-slate-900">
                                {group.label}
                              </p>
                              {group.children ? (
                                <ChevronRight
                                  size={16}
                                  className="text-slate-400"
                                />
                              ) : null}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {group.desc}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                    {activeGroup.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {activeGroup.children
                      ? "Choose a course under this test."
                      : "This category can link to its own section or page."}
                  </p>
                </div>

                {activeGroup.children ? (
                  <div className="space-y-2">
                    {activeGroup.children.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-amber-100 hover:bg-amber-50/70"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm transition group-hover:bg-amber-500">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900">
                              {item.label}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {activeGroup.label} section
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      You can later create a dedicated page or section for this
                      test.
                    </p>
                    <Link
                      to={activeGroup.to}
                      onClick={() => setOpen(false)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Go to Programs
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function MobileDrawerLink({
  to,
  children,
  end = false,
  onClick,
  active = false,
  icon = null,
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300",
          isActive || active
            ? "bg-amber-500 text-white shadow-[0_10px_22px_rgba(245,158,11,0.28)]"
            : "bg-slate-50 text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      <span className="flex items-center gap-3">
        {icon ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
            {icon}
          </span>
        ) : null}
        <span>{children}</span>
      </span>
      <ChevronDown size={14} className="-rotate-90" />
    </NavLink>
  );
}

export default function Navbar() {
  const location = useLocation();

  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileDuolingoOpen, setMobileDuolingoOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const accountMenuRef = useRef(null);
  const programsMenuRef = useRef(null);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const activePath = useMemo(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/my-courses")) return "/my-courses";
    if (pathname.startsWith("/programs")) return "/programs";
    if (pathname.startsWith("/practice/duolingo")) return "/practice/duolingo";
    if (pathname.startsWith("/free-learning")) return "/free-learning";
    if (pathname.startsWith("/book-test")) return "/book-test";
    return "/";
  }, [location.pathname]);

  const updateIndicator = useCallback(() => {
    const activeEl = linkRefs.current[activePath];
    const navEl = navRef.current;

    if (!activeEl || !navEl) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeRect = activeEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();

    setIndicator({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
      opacity: 1,
    });
  }, [activePath]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(raf);
  }, [updateIndicator]);

  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(updateIndicator);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateIndicator]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setProgramsOpen(false);
      setMobileProgramsOpen(false);
      setMobileDuolingoOpen(false);
    });

    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

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

      if (
        programsMenuRef.current &&
        !programsMenuRef.current.contains(event.target)
      ) {
        setProgramsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
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
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-5">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative flex h-[78px] items-center justify-between rounded-[26px] border border-white/70 bg-white/78 px-4 shadow-[0_12px_45px_rgba(15,23,42,0.09)] backdrop-blur-xl md:px-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-[26px] bg-gradient-to-b from-white/45 to-transparent" />

            <Link to="/" className="relative z-10 flex shrink-0 items-center">
              <img
                src={logo}
                alt="DuoMate Logo"
                className="h-11 w-auto object-contain md:h-12"
              />
            </Link>

            <nav
              ref={navRef}
              className="relative hidden items-center rounded-full border border-white/70 bg-slate-100/85 p-1 shadow-inner md:flex"
            >
              <span
                className="pointer-events-none absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-amber-500 shadow-[0_10px_24px_rgba(245,158,11,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: indicator.width,
                  opacity: indicator.opacity,
                  transform: `translateX(${indicator.left}px)`,
                }}
              />

              <DesktopNavLink
                to="/"
                end
                registerRef={(el) => {
                  linkRefs.current["/"] = el;
                }}
              >
                Home
              </DesktopNavLink>

              <ProgramsDesktopItem
                active={activePath === "/programs"}
                open={programsOpen}
                setOpen={setProgramsOpen}
                dropdownRef={programsMenuRef}
                registerRef={(el) => {
                  linkRefs.current["/programs"] = el;
                }}
              />

              {NAV_ITEMS.filter((item) => item.to !== "/").map((item) => (
                <DesktopNavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  registerRef={(el) => {
                    linkRefs.current[item.to] = el;
                  }}
                >
                  {item.label}
                </DesktopNavLink>
              ))}

              {user ? (
                <DesktopNavLink
                  to="/my-courses"
                  registerRef={(el) => {
                    linkRefs.current["/my-courses"] = el;
                  }}
                >
                  My Courses
                </DesktopNavLink>
              ) : null}
            </nav>

            <div className="relative z-10 hidden items-center gap-2 md:flex">
              {!user ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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

                      <Link
                        to="/my-courses"
                        onClick={() => setAccountMenuOpen(false)}
                        className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <FolderOpen size={16} />
                        My Courses
                      </Link>

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
            </div>

            <div className="relative z-10 flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-[110] md:hidden transition-all duration-300",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <button
          aria-label="Close mobile menu backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        />

        <div
          className={[
            "absolute inset-y-3 right-3 w-[calc(100%-24px)] max-w-sm overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.28)] transition-all duration-300",
            mobileMenuOpen ? "translate-x-0" : "translate-x-6",
          ].join(" ")}
        >
          <div className="relative flex h-full flex-col">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-amber-50 via-white to-transparent" />

            <div className="relative flex items-center justify-between border-b border-slate-100 px-4 pb-4 pt-4">
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

            <div className="relative flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-2">
                <MobileDrawerLink
                  to="/"
                  end
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </MobileDrawerLink>

                <div className="rounded-[24px] border border-slate-200 bg-white p-2 shadow-sm">
                  <button
                    onClick={() => setMobileProgramsOpen((prev) => !prev)}
                    className={[
                      "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-300",
                      activePath === "/programs"
                        ? "bg-amber-500 text-white shadow-[0_10px_22px_rgba(245,158,11,0.28)]"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                        <BookOpen size={16} />
                      </span>
                      Programs
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileProgramsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={[
                      "grid overflow-hidden transition-all duration-300",
                      mobileProgramsOpen
                        ? "mt-2 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-70",
                    ].join(" ")}
                  >
                    <div className="min-h-0">
                      <div className="space-y-2 px-1 pb-1">
                        <MobileDrawerLink
                          to="/programs"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Programs
                        </MobileDrawerLink>

                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-2">
                          <button
                            onClick={() => setMobileDuolingoOpen((prev) => !prev)}
                            className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                          >
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white">
                                <Languages size={16} />
                              </span>
                              Duolingo
                            </span>

                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                mobileDuolingoOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <div
                            className={[
                              "grid overflow-hidden transition-all duration-300",
                              mobileDuolingoOpen
                                ? "mt-2 grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-70",
                            ].join(" ")}
                          >
                            <div className="min-h-0">
                              <div className="space-y-2 px-1 pb-1">
                                <MobileDrawerLink
                                  to="/programs/21-days"
                                  onClick={() => setMobileMenuOpen(false)}
                                  icon={<Clock3 size={16} />}
                                >
                                  21 Days Program
                                </MobileDrawerLink>

                                <MobileDrawerLink
                                  to="/programs/3-months"
                                  onClick={() => setMobileMenuOpen(false)}
                                  icon={<BookOpen size={16} />}
                                >
                                  3 Months Program
                                </MobileDrawerLink>
                              </div>
                            </div>
                          </div>
                        </div>

                        <MobileDrawerLink
                          to="/programs"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={<GraduationCap size={16} />}
                        >
                          IELTS
                        </MobileDrawerLink>

                        <MobileDrawerLink
                          to="/programs"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={<FileText size={16} />}
                        >
                          PTE
                        </MobileDrawerLink>

                        <MobileDrawerLink
                          to="/programs"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={<FileText size={16} />}
                        >
                          TOEFL
                        </MobileDrawerLink>
                      </div>
                    </div>
                  </div>
                </div>

                {NAV_ITEMS.filter((item) => item.to !== "/").map((item) => (
                  <MobileDrawerLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </MobileDrawerLink>
                ))}

                {user ? (
                  <MobileDrawerLink
                    to="/my-courses"
                    onClick={() => setMobileMenuOpen(false)}
                    icon={<FolderOpen size={16} />}
                  >
                    My Courses
                  </MobileDrawerLink>
                ) : null}
              </div>

              <div className="mt-5 rounded-[24px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-amber-50/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                  Start your preparation
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                  Choose the right plan for your preparation
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Structured guidance, practice resources, and score-focused
                  preparation.
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
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

                    <Link
                      to="/my-courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      <FolderOpen size={16} />
                      My Courses
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}