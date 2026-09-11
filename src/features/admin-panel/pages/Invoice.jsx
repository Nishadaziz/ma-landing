import { useMemo, useState } from "react";
import { FileDown } from "lucide-react";
import logo from "../../../assets/logo-cropped.png";
import watermark from "../../../assets/logo-icon-only.png";
import { generateInvoicePdf } from "../utils/generateInvoicePdf";

const CONTACT_EMAIL = "info@duomatebd.com";
const CONTACT_PHONE = "+88 01300 153 200";

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

function suggestInvoiceNumber(isoDate) {
  const date = isoDate ? new Date(isoDate) : new Date();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV-${month}${day}${random}`;
}

function moneyLabel(amount) {
  return `${Number(amount || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}/-`;
}

const emptyForm = {
  serial: "",
  studentName: "",
  studentPhone: "",
  studentAddress: "",
  description: "",
  total: "",
  paid: "",
  date: todayInputValue(),
  invoiceNumber: suggestInvoiceNumber(),
};

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
  const [form, setForm] = useState(emptyForm);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const total = Number(form.total || 0);
  const paid = Math.min(Number(form.paid || 0), total || Number(form.paid || 0));
  const due = Math.max(total - paid, 0);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError("");
  };

  const resetForm = () => {
    setForm({ ...emptyForm, date: todayInputValue(), invoiceNumber: suggestInvoiceNumber() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentName.trim()) {
      setError("Enter the student's name.");
      return;
    }

    if (!form.total || Number(form.total) <= 0) {
      setError("Enter a total amount.");
      return;
    }

    try {
      setGenerating(true);
      setError("");

      await generateInvoicePdf({
        serial: form.serial,
        studentName: form.studentName.trim(),
        studentPhone: form.studentPhone.trim(),
        studentAddress: form.studentAddress.trim(),
        description: form.description.trim() || "—",
        total,
        paid,
        due,
        dateLabel: formatDateLabel(form.date),
        invoiceNumber: form.invoiceNumber.trim() || suggestInvoiceNumber(form.date),
      });
    } catch (pdfError) {
      console.error("INVOICE PDF ERROR:", pdfError);
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const previewInvoiceNumber = useMemo(
    () => form.invoiceNumber || "—",
    [form.invoiceNumber]
  );

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

          <div className="grid grid-cols-2 gap-4">
            <Field label="SL. No" hint="Optional">
              <input
                type="text"
                value={form.serial}
                onChange={update("serial")}
                placeholder="e.g. 145"
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

          <Field label="Invoice Number">
            <input
              type="text"
              value={form.invoiceNumber}
              onChange={update("invoiceNumber")}
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

          <Field label="Course / Description">
            <input
              type="text"
              value={form.description}
              onChange={update("description")}
              placeholder="e.g. DET Crash Course"
              className={inputClass}
            />
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
            <span className="font-extrabold text-slate-900">{moneyLabel(due)}</span>
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

          <div className="relative overflow-hidden rounded-xl border border-slate-200">
            <img
              src={watermark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.07]"
            />

            <div className="relative p-6">
              <div className="flex items-start justify-between">
                <img src={logo} alt="DuoMate" className="h-7 w-auto object-contain" />
                <h2 className="text-lg font-extrabold tracking-[0.15em] text-slate-800">
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

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    SL. NO {form.serial || "—"}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Bill To:
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-slate-900">
                    {form.studentName || "Student name"}
                  </p>
                  {form.studentPhone ? (
                    <p className="text-xs text-slate-500">Mobile: {form.studentPhone}</p>
                  ) : null}
                  {form.studentAddress ? (
                    <p className="text-xs text-slate-500">{form.studentAddress}</p>
                  ) : null}
                </div>

                <div className="text-right">
                  <p className="text-xs font-extrabold text-teal-600">
                    {formatDateLabel(form.date)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {previewInvoiceNumber}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 pb-1.5 text-[10px] font-extrabold text-slate-900">
                  <span>Descriptions</span>
                  <span>Duration</span>
                  <span>Total</span>
                </div>

                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 bg-indigo-50/60 px-2 py-2.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {form.description || "—"}
                  </span>
                  <span className="text-xs text-slate-500">1</span>
                  <span className="text-right text-sm font-extrabold text-slate-900">
                    {moneyLabel(total)}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-2 py-2.5">
                  <span className="text-xs font-semibold text-slate-700">Paid</span>
                  <span />
                  <span className="text-right text-sm font-extrabold text-slate-900">
                    {moneyLabel(paid)}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 bg-indigo-50/60 px-2 py-2.5">
                  <span className="text-xs font-semibold text-slate-700">Due</span>
                  <span />
                  <span className="text-right text-sm font-extrabold text-slate-900">
                    {moneyLabel(due)}
                  </span>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
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
  );
}
