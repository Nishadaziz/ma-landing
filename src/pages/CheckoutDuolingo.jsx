import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";

const PAYMENT_NUMBER = "01623978532";
const COURSE_FEE = 4999;
const COURSE_NAME = "Duolingo one month preparation";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(value) {
  return value.replace(/\s+/g, "").replace(/-/g, "");
}

function normalizeTrxId(value) {
  return value.replace(/\s+/g, "").toUpperCase();
}

function isValidTrxId(value) {
  const trx = normalizeTrxId(value);
  return /^[A-Z0-9]{8,20}$/.test(trx);
}

function Field({ label, children, hint, error }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-900">{label}</label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-slate-600">{label}</span>
      <span
        className={`text-right text-sm ${
          strong ? "font-extrabold text-slate-900" : "font-semibold text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function CheckoutDuolingo() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: COURSE_NAME,
  });

  const [checkout, setCheckout] = useState({
    paymentMethod: "bkash",
    senderNumber: "",
    trxId: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState("");

  const updateForm = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const updateCheckout = (key) => (e) => {
    const value = key === "trxId" ? normalizeTrxId(e.target.value) : e.target.value;
    setCheckout((prev) => ({ ...prev, [key]: value }));
  };

  const isBkash = checkout.paymentMethod === "bkash";

  const accent = isBkash
    ? {
        soft: "bg-[#E2136E]/10",
        border: "border-[#E2136E]/25",
        text: "text-[#B30F58]",
        solid: "bg-[#E2136E]",
      }
    : {
        soft: "bg-[#F05A28]/10",
        border: "border-[#F05A28]/25",
        text: "text-[#BA461D]",
        solid: "bg-[#F05A28]",
      };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      // ignore
    }
  };

  const validateAll = () => {
    setError("");
    const nextErrors = {};

    const name = form.name.trim();
    const phone = normalizePhone(form.phone);
    const email = form.email.trim();
    const trxId = normalizeTrxId(checkout.trxId);
    const sender = normalizePhone(checkout.senderNumber);

    if (!name) nextErrors.name = "Enter your full name.";
    if (!phone) nextErrors.phone = "Enter your phone number.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";

    if (!trxId) nextErrors.trxId = "Enter your Transaction ID.";
    else if (!isValidTrxId(trxId)) {
      nextErrors.trxId = "Use 8–20 letters/numbers only.";
    }

    if (sender && sender.length < 7) {
      nextErrors.senderNumber = "Sender number looks invalid.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("Please fix the highlighted fields.");
      return false;
    }

    return true;
  };

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hi DuoMate! I want to confirm my enrollment.",
      "",
      "Student Information:",
      `Course: ${form.course}`,
      `Name: ${form.name || "(not provided)"}`,
      `Phone: ${normalizePhone(form.phone) || "(not provided)"}`,
      `Email: ${form.email || "(not provided)"}`,
      "",
      "Payment Information:",
      `Method: ${isBkash ? "bKash" : "Nagad"}`,
      `Course fee: ৳ ${COURSE_FEE}`,
      `Paid to: ${PAYMENT_NUMBER}`,
      `Sender number: ${normalizePhone(checkout.senderNumber) || "(not provided)"}`,
      `Transaction ID: ${checkout.trxId || "(not provided)"}`,
      "",
      "Please verify my payment and confirm my enrollment.",
    ];
    return lines.join("\n");
  }, [form, checkout, isBkash]);

  const whatsappLink = useMemo(() => {
    const waNumber = "8801623978532";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  }, [whatsappMessage]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[860px] px-4 py-6 md:py-10">
        <SEO
          title="Checkout Confirmation | DuoMate"
          description="Checkout confirmation for DuoMate Duolingo course."
          canonicalPath="/checkout/duolingo"
          ogImage="https://www.duomatebd.com/og-image.png"
        />

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[32px]">
          <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-5 py-8 text-center md:px-8 md:py-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl md:h-20 md:w-20 md:text-4xl">
              ✅
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:mt-5 md:text-4xl">
              Submission received
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Your payment is under review. You will get confirmation message soon.
            </p>
          </div>

          <div className="grid gap-4 px-4 py-4 md:grid-cols-2 md:gap-6 md:px-8 md:py-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <h2 className="text-lg font-extrabold text-slate-900">
                Enrollment details
              </h2>
              <div className="mt-4 divide-y divide-slate-200">
                <SummaryRow label="Course" value={form.course} />
                <SummaryRow label="Full name" value={form.name} />
                <SummaryRow label="Phone" value={normalizePhone(form.phone)} />
                <SummaryRow label="Email" value={form.email} />
              </div>
            </div>

            <div className={`rounded-3xl border p-5 md:p-6 ${accent.border} ${accent.soft}`}>
              <h2 className="text-lg font-extrabold text-slate-900">
                Payment details
              </h2>
              <div className="mt-4 divide-y divide-white/60">
                <SummaryRow label="Payment method" value={isBkash ? "bKash" : "Nagad"} />
                <SummaryRow label="Course fee" value={`৳ ${COURSE_FEE}`} strong />
                <SummaryRow label="Paid to" value={PAYMENT_NUMBER} />
                <SummaryRow
                  label="Sender number"
                  value={normalizePhone(checkout.senderNumber) || "(not provided)"}
                />
                <SummaryRow label="Transaction ID" value={checkout.trxId} />
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 md:px-8 md:pb-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <div className="text-sm font-extrabold text-slate-900">
                WhatsApp message preview
              </div>
              <pre className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-slate-700 md:text-sm">
                {whatsappMessage}
              </pre>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-green-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-sm hover:bg-green-700"
              >
                Send confirmation on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => copyText(whatsappMessage, "message")}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                {copied === "message" ? "Copied ✅" : "Copy message"}
              </button>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                Back
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-3 py-6 md:px-4 md:py-10">
      <SEO
        title="Checkout | DuoMate"
        description="Checkout for DuoMate Duolingo one month preparation. Complete your details and submit payment information."
        canonicalPath="/checkout/duolingo"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[36px]">
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 md:px-10 md:py-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-sky-100/50 blur-3xl" />

          <nav className="relative text-sm text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-slate-900 hover:underline">
                Home
              </Link>
              <span>/</span>
              <Link to="/programs" className="hover:text-slate-900 hover:underline">
                Programs
              </Link>
              <span>/</span>
              <Link
                to="/programs/21-days"
                className="hover:text-slate-900 hover:underline"
              >
                21 Days
              </Link>
              <span>/</span>
              <span className="font-bold text-slate-900">Checkout</span>
            </div>
          </nav>

          <div className="relative mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="mt-1 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:mt-4 md:text-lg">
                Complete your details, choose your payment method, and submit your
                payment information for review.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Course fee
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-slate-900">
                    ৳ 4999
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Payment number
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-slate-900 break-all">
                    {PAYMENT_NUMBER}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Payment number
              </div>
              <div className="mt-2 text-3xl font-extrabold text-slate-900">
                {PAYMENT_NUMBER}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Send the payment by bKash or Nagad, then enter the sender number and
                Transaction ID below.
              </p>

              <button
                type="button"
                onClick={() => copyText(PAYMENT_NUMBER, "number")}
                className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                {copied === "number" ? "Copied number ✅" : "Copy payment number"}
              </button>

              <Link
                to="/programs/21-days"
                className="mt-4 inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                ← Back to course page
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-0 lg:grid-cols-[1fr_1fr]">
          <div className="border-b border-slate-200 p-4 md:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">
                1
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
                  Your details
                </h2>
                <p className="text-sm text-slate-600">
                  We’ll use this information to contact you.
                </p>
              </div>
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-6 grid gap-5 md:mt-8 md:gap-6">
              <Field label="Selected course">
                <input
                  value={form.course}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none"
                />
              </Field>

              <Field label="Full name" error={fieldErrors.name}>
                <input
                  value={form.name}
                  onChange={updateForm("name")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                    fieldErrors.name
                      ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                      : "border-slate-200 focus:border-slate-300 focus:ring-slate-100"
                  }`}
                  placeholder="Enter your full name"
                />
              </Field>

              <Field label="Phone number" error={fieldErrors.phone}>
                <input
                  value={form.phone}
                  onChange={updateForm("phone")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                    fieldErrors.phone
                      ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                      : "border-slate-200 focus:border-slate-300 focus:ring-slate-100"
                  }`}
                  placeholder="01XXXXXXXXX"
                />
              </Field>

              <Field label="Email address" error={fieldErrors.email}>
                <input
                  value={form.email}
                  onChange={updateForm("email")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                    fieldErrors.email
                      ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                      : "border-slate-200 focus:border-slate-300 focus:ring-slate-100"
                  }`}
                  placeholder="you@email.com"
                />
              </Field>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white ${accent.solid}`}
              >
                2
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
                  Payment details
                </h2>
                <p className="text-sm text-slate-600">
                  Choose your payment method and submit payment info.
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <div className="mb-3 text-sm font-bold text-slate-900">
                Payment method
              </div>

              <div className="relative grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                <div
                  className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ${
                    isBkash
                      ? "left-1 bg-[#E2136E]"
                      : "left-[calc(50%+2px)] bg-[#F05A28]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setCheckout((prev) => ({ ...prev, paymentMethod: "bkash" }))
                  }
                  className={`relative z-10 rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                    isBkash ? "text-white" : "text-slate-700"
                  }`}
                >
                  bKash
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCheckout((prev) => ({ ...prev, paymentMethod: "nagad" }))
                  }
                  className={`relative z-10 rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                    !isBkash ? "text-white" : "text-slate-700"
                  }`}
                >
                  Nagad
                </button>
              </div>
            </div>

            <div
              className={`mt-6 rounded-[24px] border p-5 md:rounded-[28px] md:p-6 ${accent.border} ${accent.soft}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className={`text-sm font-extrabold ${accent.text}`}>
                    {isBkash ? "bKash" : "Nagad"} number
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-slate-900 break-all">
                    {PAYMENT_NUMBER}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyText(PAYMENT_NUMBER, "number")}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                >
                  {copied === "number" ? "Copied ✅" : "Copy"}
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4">
                <SummaryRow label="Course" value={COURSE_NAME} />
                <SummaryRow label="Fee" value="৳ 4999" strong />
                <SummaryRow label="Method" value={isBkash ? "bKash" : "Nagad"} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/80 p-3 text-center text-xs font-semibold text-slate-700">
                  1. Copy number
                </div>
                <div className="rounded-2xl bg-white/80 p-3 text-center text-xs font-semibold text-slate-700">
                  2. Send ৳ 4999
                </div>
                <div className="rounded-2xl bg-white/80 p-3 text-center text-xs font-semibold text-slate-700">
                  3. Submit TrxID
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:gap-6">
              <Field
                label="Sender number"
                hint="Optional, but helpful for payment verification"
                error={fieldErrors.senderNumber}
              >
                <input
                  value={checkout.senderNumber}
                  onChange={updateCheckout("senderNumber")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                    fieldErrors.senderNumber
                      ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                      : "border-slate-200 focus:border-slate-300 focus:ring-slate-100"
                  }`}
                  placeholder="01XXXXXXXXX"
                />
              </Field>

              <Field
                label="Transaction ID (TrxID)"
                hint="Use 8–20 letters/numbers, for example: A1B2C3D4"
                error={fieldErrors.trxId}
              >
                <input
                  value={checkout.trxId}
                  onChange={updateCheckout("trxId")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm uppercase outline-none transition focus:ring-4 ${
                    fieldErrors.trxId
                      ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                      : "border-slate-200 focus:border-slate-300 focus:ring-slate-100"
                  }`}
                  placeholder="Enter your transaction ID"
                />
              </Field>

              {checkout.trxId ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    isValidTrxId(checkout.trxId)
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }`}
                >
                  {isValidTrxId(checkout.trxId)
                    ? "Transaction ID format looks good."
                    : "Transaction ID format does not look correct yet."}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700"
              >
                Confirm Payment
              </button>

              <button
                type="button"
                onClick={() => copyText(PAYMENT_NUMBER, "number")}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                {copied === "number" ? "Copied number ✅" : "Copy payment number"}
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              ✔ Your payment will be verified shortly.
              <br />
              ✔ You will receive confirmation on WhatsApp.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}