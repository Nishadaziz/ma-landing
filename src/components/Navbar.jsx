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
  BookOpen,
  FolderOpen,
  UserPlus,
  MailCheck,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo-cropped.png";
import logoIcon from "../assets/logo-icon-only.png";
import duolingoLogo from "../assets/logo/duolingo-logo.svg";
import ieltsLogo from "../assets/logo/ielts-logo.jpeg";
import pteLogo from "../assets/logo/pte-logo.jpg";
import toeflLogo from "../assets/logo/toefl-logo.svg";
import oneMonthIcon from "../assets/programs/1-month-icon.svg";
import fifteenDaysIcon from "../assets/programs/15-days-icon.svg";
import guidedPrepIcon from "../assets/programs/guided-preparation-icon.svg";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  {
    to: "/practice/duolingo",
    label: "Discounts",
    hoverClass: "hover:text-orange-600",
    tooltip: "Get discounts on DET purchase",
  },
  {
    to: "/free-learning",
    label: "Mock",
    hoverClass: "hover:text-emerald-600",
    tooltip: "Practice English skills",
  },
  {
    to: "/book-test",
    label: "Book Test",
    hoverClass: "hover:text-sky-600",
    tooltip: "Book your DET test slot",
  },
];

const PROGRAM_GROUPS = [
  {
    key: "duolingo",
    label: "Duolingo",
    desc: "Structured DET preparation paths",
    logo: duolingoLogo,
    to: "/programs",
    children: [
      {
        to: "/programs/1-month",
        label: "One Month Program",
        desc: "Fast-track structured preparation",
        logo: oneMonthIcon,
      },
      {
        to: "/programs/15-days",
        label: "15 Days Crash Course",
        desc: "Intensive short-term preparation",
        logo: fifteenDaysIcon,
      },
      {
        to: "/programs/guided-preparation",
        label: "DET Guided Preparation",
        desc: "Covers every DET topic",
        logo: guidedPrepIcon,
      },
    ],
  },
  {
    key: "ielts",
    label: "IELTS",
    desc: "Goal-based IELTS preparation",
    logo: ieltsLogo,
    to: "/programs/ielts",
  },
  {
    key: "pte",
    label: "PTE",
    desc: "Practical PTE-focused coaching",
    logo: pteLogo,
    to: "/programs/pte",
  },
  {
    key: "toefl",
    label: "TOEFL",
    desc: "TOEFL preparation and guidance",
    logo: toeflLogo,
    to: "/programs/toefl",
  },
];

function GoogleLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
        l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
          required
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}

function LoginModal({ open, onClose }) {
  const location = useLocation();

  const [mode, setMode] = useState("options");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setMode("options");
      setForm({ email: "", password: "" });
      setSignupForm({ email: "", password: "", confirmPassword: "" });
      setLoadingGoogle(false);
      setLoadingEmail(false);
      setLoadingSignup(false);
      setSignupSuccess(false);
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }

    if (signupForm.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      setErrorMsg("");
      setLoadingSignup(true);

      sessionStorage.setItem(
        "auth_return_to",
        `${location.pathname}${location.search}${location.hash}`
      );

      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMsg(error.message || "Could not create your account. Please try again.");
        return;
      }

      if (data.session) {
        onClose();
      } else {
        setSignupSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="animate-auth-backdrop absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
      />

      <div className="animate-auth-panel relative z-[121] w-full max-w-md overflow-hidden rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_90px_rgba(15,23,42,0.28)] md:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-50 to-transparent" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        <div className="relative pr-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 py-1 pl-1.5 pr-3 text-xs font-bold text-amber-700">
            <img src={logoIcon} alt="" className="h-4 w-4 object-contain" />
            DuoMate Account
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            {mode === "signup" ? "Create account" : "Log in"}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {mode === "signup"
              ? "Create your DuoMate account with an email and password."
              : "Continue with Google or sign in using your email and password."}
          </p>
        </div>

        {errorMsg ? (
          <div className="animate-auth-mode mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMsg}
          </div>
        ) : null}

        {mode === "options" ? (
          <div key="options" className="animate-auth-mode mt-6 space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingGoogle ? (
                <Loader2 size={18} className="animate-spin text-slate-400" />
              ) : (
                <GoogleLogo size={18} />
              )}
              {loadingGoogle ? "Please wait..." : "Continue with Google"}
            </button>

            <button
              onClick={() => {
                setErrorMsg("");
                setMode("email");
              }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Mail size={16} />
              Continue with Email Password
            </button>

            <p className="pt-1 text-center text-sm text-slate-500">
              New to DuoMate?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setMode("signup");
                }}
                className="font-bold text-slate-900 underline-offset-2 hover:underline"
              >
                Create an account
              </button>
            </p>

            <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-slate-400">
              <Lock size={12} />
              Your information is encrypted and never shared.
            </p>
          </div>
        ) : mode === "email" ? (
          <form
            key="email"
            onSubmit={handleEmailLogin}
            className="animate-auth-mode mt-6 space-y-4"
          >
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

            <PasswordField
              label="Password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Enter password"
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={loadingEmail}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingEmail ? <Loader2 size={16} className="animate-spin" /> : null}
              {loadingEmail ? "Logging in..." : "Log in"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setMode("signup");
                }}
                className="font-bold text-slate-900 underline-offset-2 hover:underline"
              >
                Sign up
              </button>
            </p>

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

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <Lock size={12} />
              Your information is encrypted and never shared.
            </p>
          </form>
        ) : signupSuccess ? (
          <div key="signup-success" className="animate-auth-mode mt-6 space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <MailCheck size={26} />
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              We sent a confirmation link to <strong>{signupForm.email}</strong>.
              Open it to activate your account, then log in.
            </p>
            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                setSignupSuccess(false);
                setMode("email");
              }}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Back to log in
            </button>
          </div>
        ) : (
          <form
            key="signup"
            onSubmit={handleSignUp}
            className="animate-auth-mode mt-6 space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Email address
              </label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                required
              />
            </div>

            <PasswordField
              label="Password"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
            />

            <PasswordField
              label="Confirm password"
              value={signupForm.confirmPassword}
              onChange={(e) =>
                setSignupForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Re-enter your password"
              autoComplete="new-password"
              minLength={6}
            />

            <button
              type="submit"
              disabled={loadingSignup}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingSignup ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <UserPlus size={16} />
              )}
              {loadingSignup ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setMode("email");
                }}
                className="font-bold text-slate-900 underline-offset-2 hover:underline"
              >
                Log in
              </button>
            </p>

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

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <Lock size={12} />
              Your information is encrypted and never shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function DesktopNavLink({
  to,
  children,
  end = false,
  registerRef,
  hoverClass = "hover:text-slate-900",
  tooltip,
}) {
  return (
    <NavLink
      to={to}
      end={end}
      ref={registerRef}
      className={({ isActive }) =>
        [
          "group/navlink relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
          isActive ? "text-white" : `text-slate-700 ${hoverClass}`,
        ].join(" ")
      }
    >
      {children}

      {tooltip ? (
        <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 translate-y-[-4px] whitespace-nowrap rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover/navlink:translate-y-0 group-hover/navlink:opacity-100">
          {tooltip}
        </span>
      ) : null}
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

  const openMenu = () => {
    if (!open) setHoveredGroup("duolingo");
    setOpen(true);
  };

  const toggleMenu = () => {
    if (!open) setHoveredGroup("duolingo");
    setOpen(!open);
  };

  const activeGroup =
    PROGRAM_GROUPS.find((group) => group.key === hoveredGroup) ||
    PROGRAM_GROUPS[0];

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={openMenu}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        ref={registerRef}
        className={[
          "relative z-10 flex items-center gap-0.5 rounded-full text-sm font-semibold transition-colors duration-300",
          active
            ? "text-white"
            : open
              ? "text-amber-600"
              : "text-slate-700 hover:text-slate-900",
        ].join(" ")}
      >
        <Link
          to="/programs"
          onClick={() => setOpen(false)}
          className="rounded-full py-2 pl-4 pr-1"
        >
          Programs
        </Link>
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={open ? "Close programs menu" : "Open programs menu"}
          aria-expanded={open}
          className="rounded-full py-2 pl-1 pr-3"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

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
                              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-2 transition",
                              isActive ? "ring-amber-400" : "ring-slate-200",
                            ].join(" ")}
                          >
                            <img
                              src={group.logo}
                              alt={`${group.label} logo`}
                              className="h-full w-full object-contain"
                            />
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
                      : `View the ${activeGroup.label} preparation page.`}
                  </p>
                </div>

                {activeGroup.children ? (
                  <div className="space-y-2">
                    {activeGroup.children.map((item) => {
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-amber-100 hover:bg-amber-50/70"
                        >
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-sm ring-2 ring-transparent transition group-hover:ring-amber-300">
                            <img
                              src={item.logo}
                              alt={`${item.label} logo`}
                              className="h-full w-full object-cover"
                            />
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
                      {activeGroup.label} preparation
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {activeGroup.desc}.
                    </p>
                    <Link
                      to={activeGroup.to}
                      onClick={() => setOpen(false)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Explore {activeGroup.label}
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
                className="animate-logo-float h-8 w-auto object-contain transition-transform duration-300 ease-out hover:scale-105 md:h-9"
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
                hoverClass="hover:text-yellow-500"
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
                  hoverClass={item.hoverClass}
                  tooltip={item.tooltip}
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
                  className="animate-logo-float h-7 w-auto object-contain"
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
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white p-1 ring-1 ring-slate-200">
                                <img
                                  src={duolingoLogo}
                                  alt="Duolingo logo"
                                  className="h-full w-full object-contain"
                                />
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
                                  to="/programs/1-month"
                                  onClick={() => setMobileMenuOpen(false)}
                                  icon={
                                    <img
                                      src={oneMonthIcon}
                                      alt="1 Month Program"
                                      className="h-4 w-4 rounded object-cover"
                                    />
                                  }
                                >
                                  1 Month Program
                                </MobileDrawerLink>

                                <MobileDrawerLink
                                  to="/programs/15-days"
                                  onClick={() => setMobileMenuOpen(false)}
                                  icon={
                                    <img
                                      src={fifteenDaysIcon}
                                      alt="15 Days Crash Course"
                                      className="h-4 w-4 rounded object-cover"
                                    />
                                  }
                                >
                                  15 Days Crash Course
                                </MobileDrawerLink>

                                <MobileDrawerLink
                                  to="/programs/guided-preparation"
                                  onClick={() => setMobileMenuOpen(false)}
                                  icon={
                                    <img
                                      src={guidedPrepIcon}
                                      alt="DET Guided Preparation"
                                      className="h-4 w-4 rounded object-cover"
                                    />
                                  }
                                >
                                  DET Guided Preparation
                                </MobileDrawerLink>
                              </div>
                            </div>
                          </div>
                        </div>

                        <MobileDrawerLink
                          to="/programs/ielts"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={
                            <img
                              src={ieltsLogo}
                              alt="IELTS logo"
                              className="h-4 w-4 object-contain"
                            />
                          }
                        >
                          IELTS
                        </MobileDrawerLink>

                        <MobileDrawerLink
                          to="/programs/pte"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={
                            <img
                              src={pteLogo}
                              alt="PTE logo"
                              className="h-4 w-4 object-contain"
                            />
                          }
                        >
                          PTE
                        </MobileDrawerLink>

                        <MobileDrawerLink
                          to="/programs/toefl"
                          onClick={() => setMobileMenuOpen(false)}
                          icon={
                            <img
                              src={toeflLogo}
                              alt="TOEFL logo"
                              className="h-4 w-4 object-contain"
                            />
                          }
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