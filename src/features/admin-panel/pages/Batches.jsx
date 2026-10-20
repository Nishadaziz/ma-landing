import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loadBatches, saveBatch, assignBatch } from "../api/batches";
import { formatBDT } from "../utils/overviewData";
import { summarizeBatch } from "../utils/batchSummary";
import BatchCards from "../components/BatchCards";

const fieldClass = "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700";
const buttonClass = "rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 disabled:opacity-50";
const dateLabel = (value) => value ? new Date(value).toLocaleDateString("en-GB", { timeZone: "Asia/Dhaka", day: "numeric", month: "short", year: "numeric" }) : "—";

export default function Batches() {
  const [data, setData] = useState({ batches: [], enrollments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    loadBatches().then((result) => { if (active) { setData(result); setLoading(false); } })
      .catch(() => { if (active) { setError("Could not load batches. Please refresh and try again."); setLoading(false); } });
    return () => { active = false; };
  }, [refresh]);

  async function mutate(action) {
    setBusy(true); setError("");
    try { await action(); setData(await loadBatches()); }
    catch (err) { setError(err.code === "23505" ? "A batch with this name already exists." : "Changes could not be saved. Please try again."); }
    finally { setBusy(false); }
  }
  const selected = params.get("batch") || data.batches.find((item) => item.course_slug && item.status === "registration_open")?.id || data.batches[0]?.id || "";
  const batch = data.batches.find((item) => item.id === selected);
  const rows = data.enrollments.filter((row) => row.batch_id === selected);
  const totals = summarizeBatch(rows);
  const filtered = rows.filter((row) => `${row.student_name} ${row.student_email} ${row.student_phone} ${row.course_name}`.toLowerCase().includes(search.toLowerCase()));

  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-extrabold">Batches</h1><p className="mt-1 text-sm text-slate-500">Students, payments, and balances for each batch.</p></div><button type="button" className={fieldClass} disabled={busy || loading} onClick={() => { setLoading(true); setError(""); setRefresh((value) => value + 1); }}>Refresh</button></div>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    <form className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4" onSubmit={(event) => {
      event.preventDefault();
      if (!name.trim()) return;
      if (/^Batch \d+$/.test(name.trim()) && Number(name.trim().slice(6)) >= 14) {
        setError("Numbered batches from Batch 14 onward are created automatically for the 15-day course.");
        return;
      }
      void mutate(async () => { const created = await saveBatch({ name: name.trim() }); setName(""); setParams({ batch: created.id }); });
    }}>
      <label htmlFor="new-batch" className="text-sm font-bold">Other batch</label><input id="new-batch" maxLength={80} required placeholder="e.g. IELTS Evening" value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} /><button disabled={busy || loading || !name.trim()} className={buttonClass}>Create batch</button>
    </form>
    {loading ? <p role="status" className="p-8 text-center text-slate-500">Loading batches…</p> : <>
      <BatchCards batches={data.batches} enrollments={data.enrollments} />
      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">15-day course batches are created automatically using the course page’s schedule. New registrations join the batch currently open for registration. Existing students and manual assignments stay in their selected batch.</p>
      {batch && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-3 font-bold">Batch<select className={fieldClass} value={selected} onChange={(event) => { setParams({ batch: event.target.value }); setSearch(""); }}>{data.batches.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label className="flex items-center gap-2 text-sm text-slate-500">{batch.course_slug ? "Automatic status" : "Status"}<select className={fieldClass} disabled={busy || !!batch.course_slug} value={batch.status} onChange={(event) => void mutate(() => saveBatch({ status: event.target.value }, batch.id))}><option value="scheduled">Scheduled</option><option value="registration_open">Registration open</option><option value="active">Active</option><option value="completed">Completed</option></select></label>
        </div>
        {batch.starts_at && <p className="mt-3 text-sm text-slate-500">Registration: {new Date(batch.registration_opens_at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })} – {new Date(batch.starts_at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })} · Bangladesh time. Classes start at the end of this window.</p>}
        <div className="mt-5 grid gap-3 sm:grid-cols-4">{[["Students", totals.students], ["Approved payments", formatBDT(totals.paid)], ["Remaining balance", formatBDT(totals.due)], ["Pending approval", totals.pending]].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-xl font-extrabold">{value}</p></div>)}</div>
        <p className="mt-3 text-xs text-slate-500">Student counts and payment totals include approved enrollments only. Balances use each enrollment’s recorded fee. {totals.unknownFees > 0 && `${totals.unknownFees} approved enrollment(s) have no recorded fee and are excluded from balances.`}</p>
        <div className="my-5 flex flex-wrap items-center justify-between gap-3"><input aria-label="Search batch students" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, email or course" className={`${fieldClass} w-full sm:w-80`} /><Link to="/admin/registration" className="text-sm font-bold text-amber-700">Add students from registered list →</Link></div>
        {!rows.length ? <p className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">{batch.name} is empty. Assign students from the Enrollments or Registration list.</p> : !filtered.length ? <p className="p-6 text-sm text-slate-500">No students match your search.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-left text-sm"><thead><tr className="border-b text-xs uppercase text-slate-400">{["Student", "Contact", "Course", "Registered", "Fee", "Payment", "Balance", "Status", ""].map((title) => <th key={title} className="px-2 py-3">{title}</th>)}</tr></thead>
          <tbody>{filtered.map((row) => <tr key={row.id} className="border-b border-slate-100 align-top">
            <td className="px-2 py-4 font-bold">{row.student_name || "—"}</td><td className="px-2 py-4 text-slate-600"><p>{row.student_phone || "—"}</p><p>{row.student_email || "—"}</p></td><td className="px-2 py-4">{row.course_name}</td><td className="whitespace-nowrap px-2 py-4">{dateLabel(row.submitted_at)}</td>
            <td className="whitespace-nowrap px-2 py-4">{row.course_fee == null ? "Not recorded" : formatBDT(row.course_fee)}</td><td className="whitespace-nowrap px-2 py-4">{formatBDT(row.payment_amount)}<p className="text-xs text-slate-400">{row.status === "approved" ? "Verified" : "Unverified"} · {row.payment_method || "—"}</p></td>
            <td className="whitespace-nowrap px-2 py-4">{row.status !== "approved" ? "Awaiting approval" : row.course_fee == null ? "Unknown" : formatBDT(Math.max(Number(row.course_fee) - Number(row.payment_amount || 0), 0))}</td><td className="px-2 py-4 capitalize">{row.status}<p className="text-xs text-slate-400">{row.status === "approved" && row.course_fee != null ? Number(row.payment_amount || 0) >= Number(row.course_fee) ? "Paid in full" : "Balance due" : ""}</p></td>
            <td className="px-2 py-4"><button disabled={busy} className="text-xs font-semibold text-red-600 disabled:opacity-50" onClick={() => void mutate(() => assignBatch(row.id, null))}>Remove from batch</button></td>
          </tr>)}</tbody></table></div>}
      </section>}
    </>}
  </div>;
}
