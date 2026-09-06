import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { WhatsAppButton } from "../shared/WhatsAppCTA";
import { buildWhatsappLink as buildWaLink } from "../../lib/whatsapp";

const TARGET_PERCENT = 16;
const COUNT_DURATION_MS = 1600;

const WHATSAPP_NUMBER = "8801300153200";

function buildWhatsappLink(context) {
  const message = `Hi DuoMate! I want to claim my ${TARGET_PERCENT}% Duolingo English Test discount. Please guide me${
    context ? ` — ${context}` : ""
  }.`;
  return buildWaLink(WHATSAPP_NUMBER, message);
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
