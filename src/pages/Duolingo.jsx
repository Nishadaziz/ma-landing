import { Link } from "react-router-dom";
import DuolingoAPI from "../components/duolingoPage/DuolingoAPI";

export default function Duolingo() {
  // ✅ Keep in sync with your DuolingoAPI.jsx
  const inviteCode = "HSTI11MO";

  // ✅ Your WhatsApp number (no + sign, country code included)
  const whatsappNumber = "8801300153200";

  const whatsappMessage = `Hi DuoMate! I used the discount code ${inviteCode}. Please guide me for registration / next steps.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-slate-900 hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-slate-900 hover:underline">
            Programs
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Duolingo</span>
        </div>
      </nav>

      {/* Header */}
      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Duolingo Discounts
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Copy the invite link or code and apply it in your Duolingo English Test
          account. After using the code, message us on WhatsApp.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Back to Programs */}
          <Link
            to="/programs"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            ← Back to Programs
          </Link>

          {/* WhatsApp confirmation */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
          >
            I used the discount code (WhatsApp)
          </a>
        </div>

        {/* Small helper text */}
        <div className="mt-3 text-xs text-slate-500">
          Tip: After opening WhatsApp, just send the message — we’ll guide you.
        </div>
      </section>

      {/* Discount block */}
      <DuolingoAPI />
    </div>
  );
}
