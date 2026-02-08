import { useState } from "react";

export default function DuolingoAPI() {
  const inviteLink = "https://englishtest.duolingo.com/invite/HSTI11MO";
  const inviteCode = "HSTI11MO";

  const [copied, setCopied] = useState("");

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* LEFT: Visual banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-8 text-white">
          <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
            Duolingo English Test Discount
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            Get <span className="underline decoration-white/40">10% OFF</span>{" "}
            on your DET registration
          </h2>

          <p className="mt-3 max-w-lg text-white/90">
            Copy the link or code and apply it in your Duolingo English Test
            account.
          </p>

          {/* Visual placeholder */}
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
            <div className="text-sm font-bold">Visual space</div>
            <p className="mt-1 text-sm text-white/85">
              You can add a banner image / screenshot here later.
            </p>
          </div>
        </div>

        {/* RIGHT: Instructions + copy */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Copy & apply in 2 steps
          </h3>

          <ol className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                1
              </span>
              <span>
                Copy the invite <b>link</b> or <b>code</b>.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                2
              </span>
              <span>
                Open the Duolingo English Test website → go to <b>Settings</b>{" "}
                → enter the invite code (or open the invite link).
              </span>
            </li>
          </ol>

          {/* Invite Link */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-extrabold text-slate-900">
              Invite link
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={inviteLink}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
              />

              <button
                onClick={() => copyText(inviteLink, "link")}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                {copied === "link" ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Invite Code */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-extrabold text-slate-900">
              Invite code
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={inviteCode}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 outline-none"
              />

              <button
                onClick={() => copyText(inviteCode, "code")}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100"
              >
                {copied === "code" ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-600">
              Note: Discount availability depends on Duolingo’s current offer
              rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
