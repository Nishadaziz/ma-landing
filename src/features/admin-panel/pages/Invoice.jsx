import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import logo from "../../../assets/logo-cropped.png";
import watermark from "../../../assets/logo-icon-only.png";
import { generateInvoicePdf, money } from "../utils/generateInvoicePdf";
import { COURSE_CATALOG, CUSTOM_COURSE_ID } from "../utils/courseCatalog";
import { getNextSerial, commitSerial } from "../utils/invoiceSerial";
import { createManualEnrollment } from "../../enrollments/api/createManualEnrollment";

const CONTACT_EMAIL = "info@duomatebd.com";
const CONTACT_PHONE = "+88 01300 153 200";
const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function todayInputValue() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function formatDateLabel(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

// Meaningful, human-readable invoice numbers: amount paid + the date, so an
// admin can identify an invoice at a glance without opening it.
function buildInvoiceNumber(isoDate, amount) {
  const [year, month, day] = (isoDate || todayInputValue()).split("-");
  const monthAbbr = MONTH_ABBR[Number(month) - 1] || "XXX";
  const amountPart = Math.max(0, Math.round(Number(amount) || 0));
  return `INV${amountPart}${day}${monthAbbr}${year.slice(-2)}`;
}

function resolveDescription(form) {
  if (form.courseId === CUSTOM_COURSE_ID) return form.customDescription.trim();
  const course = COURSE_CATALOG.find((c) => c.id === form.courseId);
  return course ? course.label : "";
}

function createEmptyForm() {
  const date = todayInputValue();
  return {
    serial: getNextSerial(),
    courseId: "",
    customDescription: "",
    studentName: "",
    studentPhone: "",
    studentAddress: "",
    total: "",
    paid: "",
    date,
    invoiceNumber: buildInvoiceNumber(date, 0),
  };
}

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-50";

export default function Invoice() {
  const [form, setForm] = useState(createEmptyForm);
  const [invoiceNumberEdited, setInvoiceNumberEdited] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [registrationNotice, setRegistrationNotice] = useState("");
  const [registrationNoticeOk, setRegistrationNoticeOk] = useState(true);

  const total = Number(form.total || 0);
  const rawPaid = Number(form.paid || 0);
  const paid = total > 0 ? Math.min(rawPaid, total) : rawPaid;
  const due = Math.max(total - paid, 0);
  const description = resolveDescription(form);

  // Keep the invoice number meaningful as amount/date change, unless the
  // admin has typed their own value into that field.
  useEffect(() => {
    if (invoiceNumberEdited) return;
    const suggested = buildInvoiceNumber(form.date, paid || total);
    setForm((prev) =>
      prev.invoiceNumber === suggested ? prev : { ...prev, invoiceNumber: suggested }
    );
  }, [form.date, paid, total, invoiceNumberEdited]);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError("");
    setRegistrationNotice("");
  };

  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumberEdited(true);
    setForm((prev) => ({ ...prev, invoiceNumber: e.target.value }));
    setError("");
  };

  const handleCourseChange = (e) => {
    const id = e.target.value;
    const course = COURSE_CATALOG.find((c) => c.id === id);
    setForm((prev) => ({
      ...prev,
      courseId: id,
      total: course && course.price != null ? String(course.price) : prev.total,
    }));
    setError("");
  };

  const resetForm = () => {
    setForm(createEmptyForm());
    setInvoiceNumberEdited(false);
    setError("");
    setRegistrationNotice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentName.trim()) {
      setError("Enter the student's name.");
      return;
    }

    if (!description) {
      setError("Select a course or type a description.");
      return;
    }

    if (!form.total || Number(form.total) <= 0) {
      setError("Enter a total amount.");
      return;
    }

    try {
      setGenerating(true);
      setError("");
      setRegistrationNotice("");

      const invoiceNumber =
        form.invoiceNumber.trim() || buildInvoiceNumber(form.date, paid || total);

      await generateInvoicePdf({
        serial: form.serial,
        studentName: form.studentName.trim(),
        studentPhone: form.studentPhone.trim(),
        studentAddress: form.studentAddress.trim(),
        description,
        total,
        paid,
        due,
        dateLabel: formatDateLabel(form.date),
        invoiceNumber,
      });

      commitSerial(form.serial);

      try {
        await createManualEnrollment({
          user_id: null,
          course_slug: form.courseId && form.courseId !== CUSTOM_COURSE_ID ? form.courseId : "manual",
          course_name: description,
          course_fee: total,
          student_name: form.studentName.trim(),
          student_email: "",
          student_phone: form.studentPhone.trim(),
          payment_method: "manual",
          payment_number: "",
          trx_id: invoiceNumber,
          payment_amount: paid,
          status: "approved",
          submitted_at: new Date(`${form.date}T00:00:00`).toISOString(),
        });

        setRegistrationNoticeOk(true);
        setRegistrationNotice(`${form.studentName.trim()} was added to the Registration page.`);
      } catch (registrationError) {
        console.error("MANUAL ENROLLMENT ERROR:", registrationError);
        setRegistrationNoticeOk(false);
        setRegistrationNotice(
          "PDF downloaded, but this student couldn't be added to the Registration page."
        );
      }
    } catch (pdfError) {
      console.error("INVOICE PDF ERROR:", pdfError);
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Invoice
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below, then generate a printable A4 invoice PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
        >
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {registrationNotice ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                registrationNoticeOk
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              {registrationNotice}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Serial No." hint="Auto-numbered, starting at 2026102">
              <input
                type="number"
                value={form.serial}
                onChange={update("serial")}
                className={inputClass}
              />
            </Field>

            <Field label="Date">
              <input
                type="date"
                value={form.date}
                onChange={update("date")}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Invoice Number" hint="Auto-generated from the amount & date — edit if needed">
            <input
              type="text"
              value={form.invoiceNumber}
              onChange={handleInvoiceNumberChange}
              className={`${inputClass} font-mono`}
            />
          </Field>

          <Field label="Student Name">
            <input
              type="text"
              value={form.studentName}
              onChange={update("studentName")}
              placeholder="Full name"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Mobile" hint="Optional">
              <input
                type="text"
                value={form.studentPhone}
                onChange={update("studentPhone")}
                placeholder="01xxxxxxxxx"
                className={inputClass}
              />
            </Field>

            <Field label="Address" hint="Optional">
              <input
                type="text"
                value={form.studentAddress}
                onChange={update("studentAddress")}
                placeholder="e.g. Dhaka."
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Course" hint="Amount fills in automatically. Choose “Other” to type your own.">
            <select
              value={form.courseId}
              onChange={handleCourseChange}
              className={inputClass}
            >
              <option value="" disabled>
                Select a course
              </option>
              {COURSE_CATALOG.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.label}
                  {course.price != null ? ` — ৳${course.price.toLocaleString("en-BD")}` : ""}
                </option>
              ))}
              <option value={CUSTOM_COURSE_ID}>Other (type manually)</option>
            </select>

            {form.courseId === CUSTOM_COURSE_ID ? (
              <input
                type="text"
                value={form.customDescription}
                onChange={update("customDescription")}
                placeholder="Course / description"
                className={`${inputClass} mt-2`}
              />
            ) : null}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Total Amount (৳)">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.total}
                onChange={update("total")}
                placeholder="6000"
                className={inputClass}
              />
            </Field>

            <Field label="Paid Amount (৳)" hint="Due is calculated automatically">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.paid}
                onChange={update("paid")}
                placeholder="6000"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
            <span className="font-semibold text-slate-600">Due</span>
            <span className="font-extrabold text-slate-900">{money(due)}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={generating}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FileDown size={17} />
              {generating ? "Generating PDF..." : "Generate Invoice PDF"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Live preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Preview
          </p>

          <div className="relative aspect-[210/297] overflow-hidden rounded-xl border border-slate-200">
            <img
              src={watermark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.06]"
            />

            <div className="relative flex h-full flex-col p-6">
              <div className="flex items-start justify-between">
                <img src={logo} alt="DuoMate" className="h-10 w-auto object-contain" />
                <h2 className="text-xl font-extrabold tracking-wide text-slate-900">
                  INVOICE
                </h2>
              </div>

              <div
                className="mt-3 h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(100deg, #10b981 0%, #10b981 44%, #f59e0b 46%, #f59e0b 100%)",
                }}
              />

              <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                    Billed To
                  </p>
                  <p className="mt-1.5 text-sm font-extrabold text-slate-900">
                    {form.studentName || "Student name"}
                  </p>
                  {form.studentPhone ? (
                    <p className="mt-1 text-xs text-slate-500">Mobile: {form.studentPhone}</p>
                  ) : null}
                  {form.studentAddress ? (
                    <p className="text-xs text-slate-500">{form.studentAddress}</p>
                  ) : null}
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-500">
                    Serial No: {form.serial || "—"}
                  </p>
                  <p className="mt-1.5 text-base font-extrabold text-teal-600">
                    {formatDateLabel(form.date)}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {form.invoiceNumber || "—"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                  Course Details
                </p>

                <div className="mt-2 grid grid-cols-[1fr_auto_auto] gap-3 border-b border-slate-200 pb-2 text-[10px] font-extrabold uppercase text-slate-900">
                  <span>Description</span>
                  <span>Duration</span>
                  <span>Amount</span>
                </div>

                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-slate-100 py-3">
                  <span className="text-xs font-semibold text-slate-700">
                    {description || "—"}
                  </span>
                  <span className="text-xs text-slate-500">1</span>
                  <span className="text-right text-sm font-extrabold text-slate-900">
                    {money(total)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-56 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Subtotal</span>
                    <span className="font-bold text-slate-900">{money(total)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Paid</span>
                    <span className="font-bold text-slate-900">{money(paid)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2">
                    <div
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        due <= 0 ? "bg-emerald-50" : "bg-amber-50"
                      }`}
                    >
                      <span
                        className={`text-xs font-extrabold ${
                          due <= 0 ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {due <= 0 ? "Paid in Full" : "Amount Due"}
                      </span>
                      <span
                        className={`text-sm font-extrabold ${
                          due <= 0 ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {money(due)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex justify-end">
                  <div className="w-32 text-center">
                    <p className="text-[10px] text-slate-400">Office Signature</p>
                    <div className="mt-6 border-t border-slate-300" />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[10px] italic text-slate-400">
                    *The registration fee is non refundable.
                  </p>
                  <div className="mt-1.5 h-[2px] w-full bg-emerald-500" />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-extrabold italic text-slate-900">
                      Thank You!
                    </p>
                    <div className="text-right text-[10px] text-slate-500">
                      <p>{CONTACT_EMAIL}</p>
                      <p>{CONTACT_PHONE}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
