import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../../components/seo/SEO";
import { supabase } from "../../lib/supabase";
import { createEnrollment } from "../../features/enrollments/api/createEnrollment";
import {
  trackInitiateCheckout,
  trackCustomEvent,
} from "../../lib/facebookPixel";
import products from "../../data/products";

const PAYMENT_NUMBER = "01623978532";
const PAYMENT_ACCENT = "#6d7f9a";
const PAYMENT_HIGHLIGHT = "rgba(253, 210, 85, 1)";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) return "";

  if (/^01\d{9}$/.test(digits)) {
    return digits;
  }

  if (/^8801\d{9}$/.test(digits)) {
    return `0${digits.slice(3)}`;
  }

  if (/^008801\d{9}$/.test(digits)) {
    return `0${digits.slice(5)}`;
  }

  return digits;
}

function isValidBangladeshPhone(value) {
  const phone = normalizePhone(value);
  return /^01\d{9}$/.test(phone);
}

function normalizeTrxId(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .toUpperCase();
}

function isValidTrxId(value) {
  const trxId = normalizeTrxId(value);
  return /^[A-Z0-9]{8,20}$/.test(trxId);
}

function Field({ label, children, hint, error, optional = false }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-900">
        {label}

        {optional ? (
          <span className="ml-2 text-xs font-medium text-slate-500">
            (Optional)
          </span>
        ) : null}
      </label>

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
          strong
            ? "font-extrabold text-slate-900"
            : "font-semibold text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkoutTrackedRef = useRef(false);

  const productId = searchParams.get("product");
  const product = products[productId];

  const courseName = product?.name || "";
  const courseSlug = product?.id || "";
  const courseFee = Number(product?.price || 0);
  const programName = product?.program || "Course";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
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
  const [submitting, setSubmitting] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!product || checkoutTrackedRef.current) return;

    trackInitiateCheckout({
      content_name: courseName,
      content_category: programName,
      content_ids: [courseSlug],
      value: courseFee,
      currency: "BDT",
      source: "Global Checkout Page",
    });

    checkoutTrackedRef.current = true;
  }, [product, courseName, programName, courseSlug, courseFee]);

  useEffect(() => {
    let isMounted = true;

    async function prefillFromLoggedInUser() {
      try {
        const { data, error: userError } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (userError) {
          console.error("PREFILL USER ERROR:", userError);
          setIsLoggedIn(false);
          return;
        }

        const user = data?.user || null;
        setIsLoggedIn(Boolean(user));

        if (!user) return;

        const metadata = user.user_metadata || {};

        const guessedName =
          metadata.full_name ||
          metadata.name ||
          metadata.display_name ||
          metadata.user_name ||
          "";

        const guessedPhone =
          metadata.phone ||
          metadata.phone_number ||
          metadata.mobile ||
          "";

        const guessedEmail = user.email || "";

        setForm((previous) => ({
          ...previous,
          name: previous.name || guessedName,
          phone: previous.phone || normalizePhone(guessedPhone),
          email: previous.email || guessedEmail,
        }));
      } catch (prefillError) {
        console.error("FAILED TO PREFILL USER:", prefillError);
      } finally {
        if (isMounted) {
          setLoadingUser(false);
        }
      }
    }

    prefillFromLoggedInUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setIsLoggedIn(Boolean(user));

      if (!user) return;

      const metadata = user.user_metadata || {};

      const guessedName =
        metadata.full_name ||
        metadata.name ||
        metadata.display_name ||
        metadata.user_name ||
        "";

      const guessedPhone =
        metadata.phone ||
        metadata.phone_number ||
        metadata.mobile ||
        "";

      const guessedEmail = user.email || "";

      setForm((previous) => ({
        ...previous,
        name: previous.name || guessedName,
        phone: previous.phone || normalizePhone(guessedPhone),
        email: previous.email || guessedEmail,
      }));
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const updateForm = (key) => (event) => {
    const value =
      key === "phone"
        ? event.target.value.replace(/[^\d+\s-]/g, "")
        : event.target.value;

    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [key]: "",
    }));
  };

  const updateCheckout = (key) => (event) => {
    let value = event.target.value;

    if (key === "trxId") {
      value = normalizeTrxId(value);
    }

    if (key === "senderNumber") {
      value = value.replace(/[^\d+\s-]/g, "");
    }

    setCheckout((previous) => ({
      ...previous,
      [key]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [key]: "",
    }));
  };

  const isBkash = checkout.paymentMethod === "bkash";

  const accent = isBkash
    ? {
        soft: "bg-[#E2136E]/10",
        border: "border-[#E2136E]/25",
        text: "text-[#B30F58]",
        solid: "bg-[#E2136E]",
        panel: "bg-[#cf2771]",
      }
    : {
        soft: "bg-[#F05A28]/10",
        border: "border-[#F05A28]/25",
        text: "text-[#BA461D]",
        solid: "bg-[#F05A28]",
        panel: "bg-[#F05A28]",
      };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(label);

      window.setTimeout(() => {
        setCopied("");
      }, 1200);

      trackCustomEvent("CopyPaymentInfo", {
        label,
        source: "Global Checkout Page",
        course_name: courseName,
      });
    } catch (copyError) {
      console.error("COPY ERROR:", copyError);
    }
  };

  const validateAll = () => {
    setError("");

    const nextErrors = {};

    const name = form.name.trim();
    const phone = normalizePhone(form.phone);
    const email = form.email.trim();
    const trxId = normalizeTrxId(checkout.trxId);
    const senderNumber = normalizePhone(checkout.senderNumber);

    if (!name) {
      nextErrors.name = "Enter your full name.";
    }

    if (!phone) {
      nextErrors.phone = "Enter your phone number.";
    } else if (!isValidBangladeshPhone(phone)) {
      nextErrors.phone = "Enter a valid Bangladesh mobile number.";
    }

    if (email && !isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!trxId) {
      nextErrors.trxId = "Enter your Transaction ID.";
    } else if (!isValidTrxId(trxId)) {
      nextErrors.trxId = "Use 8–20 letters and numbers only.";
    }

    if (senderNumber && !isValidBangladeshPhone(senderNumber)) {
      nextErrors.senderNumber = "Enter a valid sender number.";
    }

    if (courseFee <= 0) {
      setError(
        "The fee for this course has not been added yet. Please contact DuoMate."
      );
      return false;
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("Please fix the highlighted fields.");
      return false;
    }

    return true;
  };

  const whatsappMessage = useMemo(() => {
    if (!product) return "";

    const lines = [
      "Hi DuoMate! I want to confirm my enrollment.",
      "",
      "Student Information:",
      `Program: ${programName}`,
      `Course: ${courseName}`,
      `Name: ${form.name || "(not provided)"}`,
      `Phone: ${normalizePhone(form.phone) || "(not provided)"}`,
      `Email: ${form.email || "(not provided)"}`,
      "",
      "Payment Information:",
      `Method: ${isBkash ? "bKash" : "Nagad"}`,
      `Course fee: ৳ ${courseFee}`,
      `Paid to: ${PAYMENT_NUMBER}`,
      `Sender number: ${
        normalizePhone(checkout.senderNumber) || "(not provided)"
      }`,
      `Transaction ID: ${checkout.trxId || "(not provided)"}`,
      "",
      "Please verify my payment and confirm my enrollment.",
    ];

    return lines.join("\n");
  }, [
    product,
    programName,
    courseName,
    courseFee,
    form,
    checkout,
    isBkash,
  ]);

  const whatsappLink = useMemo(() => {
    const whatsappNumber = "8801623978532";

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
  }, [whatsappMessage]);

  const onSubmit = async (event) => {
    event.preventDefault();

    trackCustomEvent("CheckoutSubmitAttempt", {
      course_name: courseName,
      course_slug: courseSlug,
      payment_method: checkout.paymentMethod,
      source: "Global Checkout Form",
    });

    if (!validateAll()) return;

    try {
      setSubmitting(true);
      setError("");

      const authResult = await supabase.auth.getUser();
      const user = authResult?.data?.user || null;

      const payload = {
        user_id: user?.id || null,
        course_slug: courseSlug,
        course_name: courseName,
        course_fee: courseFee,
        student_name: form.name.trim(),
        student_email: form.email.trim() || null,
        student_phone: normalizePhone(form.phone),
        payment_method: checkout.paymentMethod,
        payment_number: PAYMENT_NUMBER,
        trx_id: normalizeTrxId(checkout.trxId),
        payment_amount: courseFee,
        status: "pending",
      };

      await createEnrollment(payload);

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submissionError) {
      console.error("ENROLLMENT ERROR:", submissionError);

      setError(
        submissionError.message ||
          "Failed to submit enrollment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="mx-auto max-w-[760px] px-4 py-12 md:py-20">
        <SEO
          title="Course Not Found | DuoMate"
          description="The selected DuoMate course could not be found."
          canonicalPath="/checkout"
          ogImage="https://www.duomatebd.com/og-image.png"
        />

        <section className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
            !
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-red-500">
            Invalid course
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Course not found
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            The checkout link is incorrect, or the selected course is currently
            unavailable.
          </p>

          <Link
            to="/programs"
            className="mt-7 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
          >
            View all programs
          </Link>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[860px] px-4 py-6 md:py-10">
        <SEO
          title="Checkout Confirmation | DuoMate"
          description={`Checkout confirmation for ${courseName}.`}
          canonicalPath="/checkout"
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
              Your payment information has been submitted and is currently
              pending verification.
            </p>
          </div>

          <div className="grid gap-4 px-4 py-4 md:grid-cols-2 md:gap-6 md:px-8 md:py-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <h2 className="text-lg font-extrabold text-slate-900">
                Enrollment details
              </h2>

              <div className="mt-4 divide-y divide-slate-200">
                <SummaryRow label="Program" value={programName} />
                <SummaryRow label="Course" value={courseName} />
                <SummaryRow label="Full name" value={form.name} />
                <SummaryRow
                  label="Phone"
                  value={normalizePhone(form.phone)}
                />
                <SummaryRow
                  label="Email"
                  value={form.email || "(not provided)"}
                />
                <SummaryRow label="Status" value="Pending approval" strong />
              </div>
            </div>

            <div
              className={`rounded-3xl border p-5 md:p-6 ${accent.border} ${accent.soft}`}
            >
              <h2 className="text-lg font-extrabold text-slate-900">
                Payment details
              </h2>

              <div className="mt-4 divide-y divide-white/60">
                <SummaryRow
                  label="Payment method"
                  value={isBkash ? "bKash" : "Nagad"}
                />

                <SummaryRow
                  label="Course fee"
                  value={`৳ ${courseFee.toLocaleString("en-BD")}`}
                  strong
                />

                <SummaryRow label="Paid to" value={PAYMENT_NUMBER} />

                <SummaryRow
                  label="Sender number"
                  value={
                    normalizePhone(checkout.senderNumber) || "(not provided)"
                  }
                />

                <SummaryRow
                  label="Transaction ID"
                  value={checkout.trxId}
                />
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

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/student")}
                className="rounded-2xl bg-slate-900 px-6 py-3 text-center text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800"
              >
                Go to Dashboard
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackCustomEvent("ContactWhatsApp", {
                    source: "Global Checkout Page",
                    course_name: courseName,
                  })
                }
                className="rounded-2xl bg-green-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-sm transition hover:bg-green-700"
              >
                Send confirmation on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => copyText(whatsappMessage, "message")}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
              >
                {copied === "message" ? "Copied ✅" : "Copy message"}
              </button>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
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
        title={`${courseName} Checkout | DuoMate`}
        description={`Complete your enrollment and payment information for ${courseName}.`}
        canonicalPath="/checkout"
        ogImage="https://www.duomatebd.com/og-image.png"
      />

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[36px]">
        {/* Checkout header */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 md:px-10 md:py-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-sky-100/50 blur-3xl" />

          <nav className="relative text-sm text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-slate-900 hover:underline">
                Home
              </Link>

              <span>/</span>

              <Link
                to="/programs"
                className="hover:text-slate-900 hover:underline"
              >
                Programs
              </Link>

              <span>/</span>

              {programName === "IELTS" ? (
                <>
                  <Link
                    to="/programs/ielts"
                    className="hover:text-slate-900 hover:underline"
                  >
                    IELTS
                  </Link>

                  <span>/</span>
                </>
              ) : null}

              <span className="font-bold text-slate-900">Checkout</span>
            </div>
          </nav>

          <div className="relative mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                {programName}
              </p>

              <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:mt-4 md:text-lg">
                Complete your details, choose your payment method, and submit
                your payment information for review.
              </p>

              {loadingUser ? (
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Checking your logged-in information...
                </p>
              ) : isLoggedIn ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                  Logged in. Available account information has been auto-filled,
                  and you can still edit it.
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  You can submit your enrollment without logging in. Logged-in
                  users may receive automatic form completion.
                </div>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Selected course
                  </div>

                  <div className="mt-1 text-lg font-extrabold text-slate-900">
                    {courseName}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Course fee
                  </div>

                  <div className="mt-1 text-2xl font-extrabold text-slate-900">
                    {courseFee > 0
                      ? `৳ ${courseFee.toLocaleString("en-BD")}`
                      : "Contact us"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Payment number
              </div>

              <div className="mt-2 break-all text-3xl font-extrabold text-slate-900">
                {PAYMENT_NUMBER}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Send the payment by bKash or Nagad, then enter your Transaction
                ID below.
              </p>

              <button
                type="button"
                onClick={() => copyText(PAYMENT_NUMBER, "number")}
                className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
              >
                {copied === "number"
                  ? "Copied number ✅"
                  : "Copy payment number"}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-0 lg:grid-cols-2">
          {/* Student details */}
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
                  We will use this information to contact you.
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
                  value={courseName}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none"
                />
              </Field>

              <Field
                label="Full name"
                error={fieldErrors.name}
                hint="Logged-in account information may be auto-filled."
              >
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
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

              <Field
                label="Phone number"
                error={fieldErrors.phone}
              >
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
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

              <Field
                label="Email address"
                error={fieldErrors.email}
                optional
                hint="Course information may be sent to this address."
              >
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
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

              <Field
                label="Sender number"
                error={fieldErrors.senderNumber}
                optional
                hint="The number used to send the payment."
              >
                <input
                  type="tel"
                  name="senderNumber"
                  autoComplete="tel"
                  inputMode="tel"
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
            </div>
          </div>

          {/* Payment details */}
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
                  Choose your method and submit your transaction information.
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
                    setCheckout((previous) => ({
                      ...previous,
                      paymentMethod: "bkash",
                    }))
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
                    setCheckout((previous) => ({
                      ...previous,
                      paymentMethod: "nagad",
                    }))
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
                  <div
                    className="text-sm font-extrabold"
                    style={{ color: PAYMENT_ACCENT }}
                  >
                    {isBkash ? "bKash" : "Nagad"} number
                  </div>

                  <div
                    className="mt-1 break-all text-2xl font-extrabold"
                    style={{ color: PAYMENT_ACCENT }}
                  >
                    {PAYMENT_NUMBER}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyText(PAYMENT_NUMBER, "number")}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50"
                >
                  {copied === "number" ? "Copied ✅" : "Copy"}
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4">
                <SummaryRow
                  label="Course"
                  value={
                    <span style={{ color: PAYMENT_ACCENT }}>
                      {product.shortName || courseName}
                    </span>
                  }
                />

                <SummaryRow
                  label="Fee"
                  value={
                    <span style={{ color: PAYMENT_ACCENT }}>
                      ৳ {courseFee.toLocaleString("en-BD")}
                    </span>
                  }
                  strong
                />

                <SummaryRow
                  label="Method"
                  value={isBkash ? "bKash" : "Nagad"}
                />
              </div>

              <div
                className={`baloo-da-2 mt-5 rounded-[20px] ${accent.panel} p-4 text-white md:p-5`}
              >
                <div className="text-center text-[16px] font-bold text-white md:text-[18px]">
                  ট্রানজেকশন আইডি দিন
                </div>

                <input
                  type="text"
                  name="transactionId"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  value={checkout.trxId}
                  onChange={updateCheckout("trxId")}
                  className="baloo-da-2 mt-4 w-full rounded-2xl border border-white/20 bg-white px-4 py-3.5 text-sm uppercase text-slate-800 outline-none placeholder:text-[#a8b4c8]"
                  placeholder="ট্রানজেকশন আইডি দিন"
                />

                {fieldErrors.trxId ? (
                  <p className="mt-2 text-xs font-semibold text-white">
                    {fieldErrors.trxId}
                  </p>
                ) : null}

                <div className="mt-4 overflow-hidden rounded-2xl">
                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <span className="text-white">
                        *247# ডায়াল করে আপনার bKash মোবাইল মেন্যুতে যান অথবা
                        bKash অ্যাপে যান।
                      </span>
                    </div>
                  </div>

                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <div>
                        <span
                          className="font-extrabold"
                          style={{ color: PAYMENT_HIGHLIGHT }}
                        >
                          Send Money
                        </span>

                        <span className="text-white"> নির্বাচন করুন।</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <div>
                        <span className="text-white">
                          প্রাপক নম্বর হিসেবে লিখুন:{" "}
                        </span>

                        <span
                          className="font-extrabold"
                          style={{ color: PAYMENT_HIGHLIGHT }}
                        >
                          {PAYMENT_NUMBER}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <div>
                        <span className="text-white">টাকার পরিমাণ: </span>

                        <span
                          className="font-extrabold"
                          style={{ color: PAYMENT_HIGHLIGHT }}
                        >
                          {courseFee.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <span className="text-white">
                        আপনার bKash বা Nagad PIN দিয়ে পেমেন্ট নিশ্চিত করুন।
                      </span>
                    </div>
                  </div>

                  <div className="border-b border-black/10 px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <span className="text-white">
                        পেমেন্ট সম্পন্ন হলে আপনি একটি নিশ্চিতকরণ বার্তা পাবেন।
                      </span>
                    </div>
                  </div>

                  <div className="px-3 py-4 text-[15px] leading-[1.55]">
                    <div className="flex items-start gap-2">
                      <span className="mt-[2px] text-white">•</span>

                      <div>
                        <span className="text-white">
                          উপরের বক্সে আপনার{" "}
                        </span>

                        <span
                          className="font-extrabold"
                          style={{ color: PAYMENT_HIGHLIGHT }}
                        >
                          Transaction ID
                        </span>

                        <span className="text-white">
                          {" "}
                          লিখে নিচের Submit বাটনে ক্লিক করুন।
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {checkout.trxId ? (
                <div
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold ${
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

              <button
                type="submit"
                disabled={submitting || courseFee <= 0}
                className={`mt-6 w-full rounded-2xl px-6 py-4 text-center text-sm font-extrabold uppercase text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 ${
                  isBkash
                    ? "bg-[#cf2771] hover:bg-[#b91f65]"
                    : "bg-[#F05A28] hover:bg-[#da4f20]"
                }`}
              >
                {submitting
                  ? "Submitting..."
                  : courseFee <= 0
                    ? "Fee Not Available"
                    : "Submit"}
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              ✔ Your payment will be verified shortly.
              <br />
              ✔ You will receive confirmation from DuoMate.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}