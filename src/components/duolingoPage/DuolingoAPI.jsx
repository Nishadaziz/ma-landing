import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const TARGET_PERCENT = 16;
const COUNT_DURATION_MS = 1600;

const WHATSAPP_NUMBER = "8801300153200";

function buildWhatsappLink(context) {
  const message = `Hi DuoMate! I want to claim my ${TARGET_PERCENT}% Duolingo English Test discount. Please guide me${
    context ? ` — ${context}` : ""
  }.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function useCountUp(target, duration) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    let frame;
    let startTime = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(1 + eased * (target - 1)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7C17.18 3.03 14.68 2 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.81c0 4.53-3.7 8.23-8.23 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.53 3.7-8.23 8.23-8.23Zm-4.52 4.4c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.16Z" />
    </svg>
  );
}

function WhatsAppButton({ href, children, size = "lg" }) {
  const sizing =
    size === "lg"
      ? "px-8 py-5 text-lg sm:text-xl"
      : "px-7 py-4 text-base sm:text-lg";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`animate-pulse-glow group relative flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] font-extrabold text-white shadow-[0_20px_45px_rgba(37,211,102,0.45)] transition hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_24px_55px_rgba(37,211,102,0.55)] ${sizing}`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
      {children}
    </a>
  );
}

const STEPS = [
  {
    icon: MessageCircle,
    title: "Click WhatsApp",
    desc: "Tap the green button and send us a quick message.",
  },
  {
    icon: Gift,
    title: "Receive Code",
    desc: "We'll instantly reply with your personal discount code.",
  },
  {
    icon: GraduationCap,
    title: "Register DET",
    desc: "Use the code on your Duolingo English Test registration.",
  },
];

export default function DuolingoAPI() {
  const percent = useCountUp(TARGET_PERCENT, COUNT_DURATION_MS);
  const heroLink = buildWhatsappLink();
  const finalLink = buildWhatsappLink("I'm ready to register");

  return (
    <div className="space-y-8">
      {/* Urgency banner */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-extrabold text-amber-800">
        <span>⏳</span>
        Limited student discount available
      </div>

      {/* Hero + discount + CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50 p-6 shadow-sm sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600 sm:text-xs">
            🔥 Exclusive Duolingo English Test Offer
          </div>

          <h1 className="mt-5 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
            Get{" "}
            <span className="text-orange-500">{TARGET_PERCENT}% OFF</span> on
            your DET Registration
          </h1>

          <div className="mt-4 flex items-end justify-center leading-none">
            <span className="text-[100px] font-black tabular-nums text-slate-900 sm:text-[130px]">
              {percent}
            </span>
            <span className="mb-1 text-4xl font-black text-orange-500 sm:mb-3 sm:text-6xl">
              %
            </span>
          </div>
          <p className="-mt-1 text-lg font-extrabold uppercase tracking-tight text-slate-500 sm:text-xl">
            OFF Registration Fee
          </p>

          <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
            Save money on your exam fee. Get your personal discount code
            instantly via WhatsApp.
          </p>

          <div className="mt-8 w-full max-w-sm">
            <WhatsAppButton href={heroLink}>
              Claim My {TARGET_PERCENT}% Discount
            </WhatsAppButton>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <Gift className="h-3.5 w-3.5" />
            Only available through DuoMate
          </p>

          <div className="mt-7 flex flex-col items-center gap-2.5 text-sm font-semibold text-slate-600 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Trusted by DuoMate students
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Quick WhatsApp response
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Instant discount assistance
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          How it works
        </h2>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center gap-4 sm:items-stretch">
                <div className="flex w-full max-w-xs flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:w-56">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-sm font-extrabold uppercase tracking-wide text-orange-500">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.desc}
                  </p>
                </div>

                {index < STEPS.length - 1 && (
                  <ArrowRight className="h-6 w-6 shrink-0 rotate-90 text-slate-300 sm:mt-0 sm:rotate-0 sm:self-center" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-center text-white sm:p-12">
        <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-md">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ready to save money?
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
            Don't miss your {TARGET_PERCENT}% discount — message us on
            WhatsApp now and register with confidence.
          </p>

          <div className="mt-7">
            <WhatsAppButton href={finalLink} size="md">
              Get My Discount Now
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
