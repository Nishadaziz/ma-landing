import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock3,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/seo/SEO";
import { WhatsAppButton } from "../components/shared/WhatsAppCTA";
import { buildWhatsappLink } from "../lib/whatsapp";
import { supabase } from "../lib/supabase";
import duolingoLogo from "../assets/logo/duolingo-logo.svg";
import ieltsLogo from "../assets/logo/ielts-logo.jpeg";
import pteLogo from "../assets/logo/pte-logo.jpg";
import toeflLogo from "../assets/logo/toefl-logo.svg";

const WHATSAPP_NUMBER = "8801300153200";

const TEST_META = [
  {
    value: "duolingo",
    label: "Duolingo English Test",
    short: "Duolingo",
    logo: duolingoLogo,
    selected: "border-orange-500 bg-orange-50 ring-2 ring-orange-100",
  },
  {
    value: "ielts",
    label: "IELTS",
    short: "IELTS",
    logo: ieltsLogo,
    selected: "border-amber-500 bg-amber-50 ring-2 ring-amber-100",
  },
  {
    value: "pte",
    label: "PTE",
    short: "PTE",
    logo: pteLogo,
    selected: "border-sky-500 bg-sky-50 ring-2 ring-sky-100",
  },
  {
    value: "toefl",
    label: "TOEFL",
    short: "TOEFL",
    logo: toeflLogo,
    selected: "border-violet-500 bg-violet-50 ring-2 ring-violet-100",
  },
];

const TIME_SLOTS = [
  { value: "10:00-14:00", label: "10:00 AM – 2:00 PM" },
  { value: "14:00-18:00", label: "2:00 PM – 6:00 PM" },
  { value: "16:00-20:00", label: "4:00 PM – 8:00 PM" },
];

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(p) {
  return p.replace(/\s+/g, "").replace(/-/g, "");
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-right text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
}

export default function BookTest() {
  const [form, setForm] = useState({
    test: "duolingo",
    bookingType: "mock",
    date: "",
    slot: "10:00-14:00",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await supabase.auth.getSession();

        if (data?.session?.user) {
          setForm((prev) => ({
            ...prev,
            email: data.session.user.email || "",
          }));
        }
      } catch (err) {
        console.error("Supabase connection failed:", err);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setForm((prev) => ({
          ...prev,
          email: session.user.email || prev.email,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const bookingTypeOptions = useMemo(() => {
    if (form.test === "duolingo") {
      return [
        { value: "mock", label: "Mock Test" },
        { value: "real", label: "Real Test" },
      ];
    }
    return [{ value: "mock", label: "Mock Test" }];
  }, [form.test]);

  const safeBookingType = useMemo(() => {
    if (form.test !== "duolingo" && form.bookingType === "real") return "mock";
    return form.bookingType;
  }, [form.test, form.bookingType]);

  const selectedTestLabel =
    TEST_META.find((t) => t.value === form.test)?.label ?? form.test;

  const selectedBookingTypeLabel =
    bookingTypeOptions.find((b) => b.value === safeBookingType)?.label ??
    safeBookingType;

  const selectedSlotLabel =
    TIME_SLOTS.find((s) => s.value === form.slot)?.label ?? form.slot;

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hi DuoMate! I want to book a slot.",
      "",
      `Test: ${selectedTestLabel}`,
      `Type: ${selectedBookingTypeLabel}`,
      `Date: ${form.date || "(not selected)"}`,
      `Time: ${selectedSlotLabel}`,
      "",
      `Phone: ${normalizePhone(form.phone) || "(not provided)"}`,
      `Email: ${form.email || "(not provided)"}`,
      "",
      "Please confirm my booking and tell me the next steps.",
    ];

    return lines.join("\n");
  }, [
    selectedTestLabel,
    selectedBookingTypeLabel,
    selectedSlotLabel,
    form.date,
    form.phone,
    form.email,
  ]);

  const whatsappLink = useMemo(
    () => buildWhatsappLink(WHATSAPP_NUMBER, whatsappMessage),
    [whatsappMessage]
  );

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const selectTest = (value) => {
    setForm((prev) => ({
      ...prev,
      test: value,
      bookingType: value === "duolingo" ? prev.bookingType : "mock",
    }));
  };

  const selectBookingType = (value) => {
    setForm((prev) => ({ ...prev, bookingType: value }));
  };

  const selectSlot = (value) => {
    setForm((prev) => ({ ...prev, slot: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const phone = normalizePhone(form.phone);
    const email = form.email.trim();

    if (!form.test) return setError("Please select a test.");
    if (!form.date) return setError("Please select a date.");
    if (!form.slot) return setError("Please select a time slot.");
    if (!phone) return setError("Please enter your phone number.");
    if (phone.length < 8) return setError("Please enter a valid phone number.");
    if (!email) return setError("Please enter your email address.");
    if (!isValidEmail(email)) return setError("Please enter a valid email.");

    if (form.test !== "duolingo" && safeBookingType === "real") {
      return setError("Real test booking is only available for Duolingo.");
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <SEO
        title="Book a Test | DuoMate"
        description="Book a mock test slot for Duolingo, IELTS, PTE, or TOEFL. Choose date and time between 10 AM and 8 PM."
        canonicalPath="/book-test"
        ogImage="https://www.duomatebd.com/og-test-booking.png"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="transition hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-900">Book a Test</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Duomate
          </span>

          <h1 className="mt-6 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
            Book Your Test Slot
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            Pick a test, choose a date and time, and confirm instantly on
            WhatsApp — no waiting for a callback.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <Clock3 className="h-4 w-4 text-emerald-300" />
              4-hour slots, 10 AM – 8 PM
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Instant WhatsApp confirmation
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        /* ============ CONFIRMATION ============ */
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-6 py-8 text-center md:px-8 md:py-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl md:h-20 md:w-20 md:text-4xl">
              ✅
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Booking Details Received
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Click below to send your booking to WhatsApp — we'll confirm
              your slot and share the next steps.
            </p>
          </div>

          <div className="grid gap-4 px-6 py-6 md:grid-cols-2 md:px-8 md:py-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">
                Booking Summary
              </h3>
              <div className="mt-3 divide-y divide-slate-200">
                <SummaryRow label="Test" value={selectedTestLabel} />
                <SummaryRow label="Type" value={selectedBookingTypeLabel} />
                <SummaryRow label="Date" value={form.date} />
                <SummaryRow label="Time" value={selectedSlotLabel} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-extrabold text-slate-900">
                Contact Info
              </h3>
              <div className="mt-3 divide-y divide-slate-200">
                <SummaryRow label="Phone" value={normalizePhone(form.phone)} />
                <SummaryRow label="Email" value={form.email || "—"} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 px-6 pb-6 md:px-8 md:pb-8">
            <div className="w-full sm:w-64">
              <WhatsAppButton href={whatsappLink} size="md">
                Confirm on WhatsApp
              </WhatsAppButton>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Edit Details
            </button>
          </div>
        </section>
      ) : (
        /* ============ BOOKING FORM ============ */
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Step 1: Test */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
                1
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">
                Choose your test
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TEST_META.map((t) => {
                const isSelected = form.test === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => selectTest(t.value)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
                      isSelected
                        ? t.selected
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-slate-200">
                      <img
                        src={t.logo}
                        alt={`${t.label} logo`}
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {t.short}
                    </span>
                  </button>
                );
              })}
            </div>

            {bookingTypeOptions.length > 1 ? (
              <div className="mt-6">
                <p className="text-sm font-bold text-slate-900">Booking type</p>
                <div className="mt-2 inline-flex rounded-full bg-slate-100 p-1">
                  {bookingTypeOptions.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => selectBookingType(b.value)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        safeBookingType === b.value
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-5 text-xs text-slate-500">
                Real test booking is available only for Duolingo — this will
                be a mock test.
              </p>
            )}
          </section>

          {/* Step 2: Date & time */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
                2
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">
                Pick a date and time
              </h2>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Select date
                </label>
                <input
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={update("date")}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  Time slot (4 hours)
                </label>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {TIME_SLOTS.map((s) => {
                    const isSelected = form.slot === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => selectSlot(s.value)}
                        className={`rounded-xl border-2 px-4 py-2.5 text-left text-sm font-bold transition ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Contact */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
                3
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">
                Your contact info
              </h2>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Phone className="h-4 w-4 text-slate-400" />
                  Phone number
                </label>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="e.g. 01300XXXXXX"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Use your WhatsApp number if possible.
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Mail className="h-4 w-4 text-slate-400" />
                  Email address
                </label>
                <input
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Auto-filled if you are logged in.
                </p>
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Submit Booking
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="w-full sm:w-64">
                <WhatsAppButton href={whatsappLink} size="md">
                  Send to WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
