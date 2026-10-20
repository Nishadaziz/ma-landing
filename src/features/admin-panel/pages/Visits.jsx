import { useEffect, useState } from "react";
import { BarChart3, Eye, Users, RefreshCw } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import StatCard from "../components/StatCard";

const number = (value) => Number(value || 0).toLocaleString("en-BD");
const dateLabel = (value) => new Date(`${value}T00:00:00+06:00`).toLocaleDateString("en-GB", {
  day: "numeric", month: "short", timeZone: "Asia/Dhaka",
});

function Breakdown({ title, rows, total }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {!rows.length ? <p className="mt-5 text-sm text-slate-500">No visits recorded in this period.</p> : (
        <ul className="mt-4 space-y-4">
          {rows.map(({ label, views }) => (
            <li key={label}>
              <div className="mb-1 flex items-start justify-between gap-3 text-sm">
                <span className="min-w-0 break-all text-slate-600">{label}</span>
                <span className="shrink-0 font-semibold">{number(views)} <span className="font-normal text-slate-400">({Math.round(views / total * 100)}%)</span></span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${views / total * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Visits() {
  const [days, setDays] = useState(30);
  const [refresh, setRefresh] = useState(0);
  const [state, setState] = useState({ loading: true, data: null, error: "" });

  useEffect(() => {
    let active = true;
    supabase.rpc("get_visit_stats", { days }).then(({ data, error }) => {
      if (!active) return;
      setState({ loading: false, data: error ? null : data, error: error
        ? "Visit statistics could not be loaded. Check your connection and make sure the site visits database migration has been applied."
        : data ? "" : "No statistics returned. Please try refreshing." });
    }).catch(() => {
      if (active) setState({ loading: false, data: null, error: "Could not connect. Please try again." });
    });
    return () => { active = false; };
  }, [days, refresh]);

  const reload = () => {
    setState({ loading: true, data: null, error: "" });
    setRefresh((value) => value + 1);
  };
  const { data, loading, error } = state;
  const maxViews = Math.max(1, ...(data?.daily || []).map((day) => day.views));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Visits</h1>
          <p className="mt-1 text-sm text-slate-500">Public website traffic · Bangladesh time (UTC+6)</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="visit-period" className="text-sm font-semibold text-slate-600">Period</label>
          <select id="visit-period" value={days} onChange={(event) => {
            setState({ loading: true, data: null, error: "" });
            setDays(Number(event.target.value));
          }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
            {[7, 30, 90].map((value) => <option key={value} value={value}>Last {value} days</option>)}
          </select>
          <button type="button" onClick={reload} disabled={loading} aria-label="Refresh visit statistics" className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 disabled:opacity-50">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
      <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Visits count page views, including repeat views. Unique visitors estimate distinct browsers; clearing browser storage or switching devices counts again. Collection starts when tracking is enabled; earlier traffic is unavailable. Admin and account pages are excluded.
      </p>
      {loading && <div role="status" className="rounded-2xl border bg-white p-12 text-center text-slate-500">Loading visit statistics…</div>}
      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      {!loading && data && <>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={Eye} label="Visits (page views)" value={number(data.views)} description={`Last ${days} days, including today`} />
          <StatCard icon={Users} label="Unique visitors" value={number(data.unique)} description="Distinct browsers across the selected period" />
          <StatCard icon={BarChart3} label="Visits today" value={number(data.daily.at(-1)?.views)} description="Since midnight in Bangladesh" />
        </div>
        {data.views === 0 && <p className="text-sm text-slate-500">No visits recorded yet. New public page views will appear here after tracking is enabled.</p>}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Daily visits</h2>
          <p className="mt-1 text-sm text-slate-500">Page views and unique visitors for each day, newest first.</p>
          <div className="mt-4 max-h-96 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-white text-slate-500"><tr><th className="py-3">Date</th><th className="py-3">Visits</th><th className="py-3 text-right">Unique visitors</th></tr></thead>
              <tbody>{[...data.daily].reverse().map((day) => <tr key={day.day} className="border-t border-slate-100">
                <td className="whitespace-nowrap py-3 pr-4">{dateLabel(day.day)}</td>
                <td className="w-1/2 py-3 pr-4"><div className="flex items-center gap-3"><span className="w-10 shrink-0">{number(day.views)}</span><div className="h-2 flex-1 rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-400" style={{ width: `${day.views / maxViews * 100}%` }} /></div></div></td>
                <td className="py-3 text-right">{number(day.visitors)}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Breakdown title="Popular pages · top 10" rows={data.pages} total={data.views} />
          <Breakdown title="Traffic sources · top 10" rows={data.sources} total={data.views} />
          <Breakdown title="Device types" rows={data.devices} total={data.views} />
        </div>
        <p className="text-xs text-slate-500">Sources use utm_source when present, otherwise the referring website or Direct, and remain attributed during the browser session. Device types are estimated from the browser. Blocked tracking and automated traffic can affect totals. Daily unique counts may overlap between days.</p>
      </>}
    </div>
  );
}
