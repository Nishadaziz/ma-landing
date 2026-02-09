import { useMemo, useState } from "react";
import SEO from "../components/seo/SEO";

const WHATSAPP_NUMBER = "8801300153200"; // no + sign

const TESTS = [
  { value: "duolingo", label: "Duolingo English Test (DET)" },
  { value: "ielts", label: "IELTS" },
  { value: "pte", label: "PTE" },
  { value: "toefl", label: "TOEFL" },
];

const TIME_SLOTS = [
  { value: "10:00-14:00", label: "10:00 AM – 2:00 PM (4 hours)" },
  { value: "14:00-18:00", label: "2:00 PM – 6:00 PM (4 hours)" },
  { value: "16:00-20:00", label: "4:00 PM – 8:00 PM (4 hours)" },
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

export default function BookTest() {
  const [form, setForm] = useState({
    test: "duolingo",
    bookingType: "mock", // "mock" | "real"
    date: "",
    slot: "10:00-14:00",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const bookingTypeOptions = useMemo(() => {
    // Real test option only for Duolingo
    if (form.test === "duolingo") {
      return [
        { value: "mock", label: "Mock Test" },
        { value: "real", label: "Real Test (DET Registration Slot)" },
      ];
    }
    return [{ value: "mock", label: "Mock Test" }];
  }, [form.test]);

  // If user switches away from Duolingo, force bookingType to mock
  const safeBookingType = useMemo(() => {
    if (form.test !== "duolingo" && form.bookingType === "real") return "mock";
    return form.bookingType;
  }, [form.test, form.bookingType]);

  const selectedTestLabel =
    TESTS.find((t) => t.value === form.test)?.label ?? form.test;

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
  }, [selectedTestLabel, selectedBookingTypeLabel, selectedSlotLabel, form.date, form.phone, form.email]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
  }, [whatsappMessage]);

  const update = (key) => (e) => {
    const value = e.target.value;

    // If test changes and it isn't duolingo, ensure bookingType becomes mock
    if (key === "test") {
      setForm((p) => ({
        ...p,
        test: value,
        bookingType: value === "duolingo" ? p.bookingType : "mock",
      }));
      return;
    }

    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    const phone = normalizePhone(form.phone);
    const email = form.email.trim();

    if (!form.test) return setError("Please select a test.");
    if (!form.date) return setError("Please select a date.");
    if (!form.slot) return setError("Please select a time slot.");
    if (!phone) return setError("Please enter your phone number.");
    if (phone.length < 8) return setError("Please enter a valid phone number.");
    if (!email) return setError("Please enter your email address.");
    if (!isValidEmail(email)) return setError("Please enter a valid email.");

    // If not duolingo, bookingType must be mock
    if (form.test !== "duolingo" && safeBookingType === "real") {
      return setError("Real test booking is only available for Duolingo.");
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-10">
      <SEO
        title="Book a Test | DuoMate"
        description="Book a mock test slot for Duolingo, IELTS, PTE, or TOEFL. Choose date and time between 10 AM and 8 PM."
        canonicalPath="/book-test"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      {/* Header */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-4xl font-extrabold text-slate-900">Book a Test</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Select your test, choose a date, and pick a 4-hour slot (10:00 AM – 8:00 PM).
          After submitting, confirm via WhatsApp.
        </p>

        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <div className="font-extrabold">Available 4-hour slots:</div>
          <ul className="mt-2 list-disc pl-5">
            <li>10:00 AM – 2:00 PM</li>
            <li>2:00 PM – 6:00 PM</li>
            <li>4:00 PM – 8:00 PM</li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Booking Details
        </h2>

        <form onSubmit={onSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Test */}
          <div>
            <label className="text-sm font-bold text-slate-900">Select test</label>
            <select
              value={form.test}
              onChange={update("test")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            >
              {TESTS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-bold text-slate-900">
              Booking type
            </label>
            <select
              value={safeBookingType}
              onChange={update("bookingType")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              disabled={form.test !== "duolingo"}
              title={
                form.test !== "duolingo"
                  ? "Real test booking is only available for Duolingo."
                  : ""
              }
            >
              {bookingTypeOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {form.test !== "duolingo" ? (
              <p className="mt-2 text-xs text-slate-500">
                Real test booking is available only for Duolingo.
              </p>
            ) : null}
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-bold text-slate-900">Select date</label>
            <input
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={update("date")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Slot */}
          <div>
            <label className="text-sm font-bold text-slate-900">Time slot</label>
            <select
              value={form.slot}
              onChange={update("slot")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            >
              {TIME_SLOTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-bold text-slate-900">Phone number</label>
            <input
              value={form.phone}
              onChange={update("phone")}
              placeholder="e.g. 01300XXXXXX"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            />
            <p className="mt-2 text-xs text-slate-500">
              Use your WhatsApp number if possible.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-bold text-slate-900">Email address</label>
            <input
              value={form.email}
              onChange={update("email")}
              placeholder="you@email.com"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Errors */}
          {error ? (
            <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {/* Submit */}
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Submit Booking
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Send details to WhatsApp
            </a>
          </div>
        </form>
      </section>

      {/* Confirmation */}
      {submitted ? (
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
          <h2 className="text-2xl font-extrabold text-emerald-900">
            Booking submitted ✅
          </h2>
          <p className="mt-2 text-sm text-emerald-900">
            Now click below to confirm on WhatsApp. We will reply with your confirmation and instructions.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              Confirm on WhatsApp
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-100"
            >
              Edit details
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5">
            <div className="text-sm font-extrabold text-slate-900">
              Summary
            </div>
            <div className="mt-2 text-sm text-slate-700 whitespace-pre-line">
              {whatsappMessage}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
