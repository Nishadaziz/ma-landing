
import { Link } from "react-router-dom";
import { BadgeCheck, Building2, TimerReset, Trophy } from "lucide-react";
import det21days from "../../assets/det21days.webp";
import partnerNetwork from "../../assets/Main-Color.svg";

function CountdownUnit({ label, value, gradient }) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-gradient-to-b shadow-[0_6px_18px_rgba(0,0,0,0.3)] ${gradient}`}
    >
      <div className="flex items-center justify-center py-2.5 md:py-3">
        <span className="text-xl font-extrabold text-white md:text-2xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="bg-black/20 py-1 text-center text-[8px] font-bold uppercase tracking-[0.16em] text-white/85 md:text-[9px]">
        {label}
      </div>
    </div>
  );
}

export default function Program21DaysHero({ timeLeft, batchDateLabel }) {
  return (
    <>
      <section className="mb-6 overflow-hidden rounded-[26px] border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Official Partner
              </p>

              <h2 className="text-sm font-extrabold text-slate-900 md:text-base">
                Global Partner Network
              </h2>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <img
              src={partnerNetwork}
              alt="Duolingo English Test Global Partner Network"
              className="h-auto w-full object-contain md:max-w-[480px]"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700 md:text-xs">
              1 Month DET Preparation
            </div>

            <h1 className="bensen-font mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Duolingo English Test - <br />
              ১ মাসে <span className="text-orange-500">120+</span> স্কোরের স্মার্ট
              প্রস্তুতি
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              Want to prepare smartly in a short time? This course gives you a
              clear system, expert guidance, and practical strategies—all in one
              place to help you reach your target score with confidence.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700">
                <Trophy className="h-4 w-4" />
                Target Score: 120 - 140
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                12 Live Classes
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/checkout/duolingo"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                Enroll Now
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Limited seats in upcoming batch
              </span>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-full">
            <img
              src={det21days}
              alt="Duolingo English Test preparation"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

            <div className="absolute left-4 right-4 top-4 overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 shadow-xl md:left-6 md:right-6 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50 md:text-[11px]">
                  <TimerReset className="h-3.5 w-3.5 text-orange-400" />
                  Next batch starts in
                </div>

                {!timeLeft.expired && timeLeft.isUrgent && !timeLeft.isToday && (
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-300 animate-pulse">
                    Ending soon
                  </span>
                )}

                {!timeLeft.expired && timeLeft.isToday && (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-300">
                    Starting today
                  </span>
                )}
              </div>

              {timeLeft.expired ? (
                <p className="mt-3 text-sm font-bold text-white">
                  Batch has started. Enroll for the next available seat.
                </p>
              ) : (
                <div className="mt-3.5 grid grid-cols-4 gap-1.5 md:gap-2">
                  <CountdownUnit
                    label="Days"
                    value={timeLeft.days}
                    gradient="from-orange-400 to-orange-600"
                  />
                  <CountdownUnit
                    label="Hours"
                    value={timeLeft.hours}
                    gradient="from-amber-400 to-orange-500"
                  />
                  <CountdownUnit
                    label="Min"
                    value={timeLeft.minutes}
                    gradient="from-lime-400 to-emerald-500"
                  />
                  <CountdownUnit
                    label="Sec"
                    value={timeLeft.seconds}
                    gradient="from-emerald-400 to-emerald-600"
                  />
                </div>
              )}

              <p className="mt-3 text-xs leading-5 text-white/60">
                Starts{" "}
                <span className="font-bold text-white">{batchDateLabel}</span>
              </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                One month roadmap
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-900">
                Reading, Writing, Listening, Speaking — full preparation!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}