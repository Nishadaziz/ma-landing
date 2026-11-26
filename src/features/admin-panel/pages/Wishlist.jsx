import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { getWishlistWhatsAppUrl, WISHLIST_BATCHES } from "../../../lib/detWishlist";

const pageSize = 25;
const dateFormat = new Intl.DateTimeFormat("en-BD", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka",
});

export default function Wishlist() {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [result, setResult] = useState(null);
  const ready = result?.page === page && result.refresh === refresh;

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const { data, error } = await supabase.from("det_wishlist")
          .select("id, name, contact_number, preferred_batch, created_at")
          .order("created_at", { ascending: false })
          .order("id", { ascending: false })
          .range(page * pageSize, (page + 1) * pageSize)
          .abortSignal(controller.signal);
        if (error) throw error;
        if (!controller.signal.aborted) setResult({ page, refresh, rows: data });
      } catch {
        if (!controller.signal.aborted) setResult({ page, refresh, error: true });
      }
    }
    load();
    return () => controller.abort();
  }, [page, refresh]);

  const rows = ready ? result.rows : null;
  return (
    <section className="space-y-5" aria-labelledby="admin-wishlist-title">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="admin-wishlist-title" className="text-2xl font-extrabold">Course Wishlist</h2>
          <p className="mt-1 text-sm text-slate-600">Student requests for the 15-day DET Crash Course.</p>
        </div>
        <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold" onClick={() => { setPage(0); setRefresh((value) => value + 1); }}>Refresh</button>
      </header>
      {!ready && <p role="status">Loading wishlist requests.</p>}
      {ready && result.error && <p role="alert" className="text-red-700">Couldn't load wishlist requests. Select Refresh to try again.</p>}
      {rows?.length === 0 && <p className="rounded-2xl border border-slate-200 bg-white p-5">No wishlist requests to show.</p>}
      {rows?.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>{["Name", "Contact number", "Preferred batch", "Submitted (Dhaka time)", "Follow-up"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-4 py-3">{label}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.slice(0, pageSize).map((row) => {
                const whatsappUrl = getWishlistWhatsAppUrl(row);
                return (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-semibold">{row.name}</td>
                    <td className="whitespace-nowrap px-4 py-3"><a href={`tel:${row.contact_number}`} className="text-emerald-800 underline">{row.contact_number}</a></td>
                    <td className="px-4 py-3">{WISHLIST_BATCHES[row.preferred_batch]}</td>
                    <td className="whitespace-nowrap px-4 py-3"><time dateTime={row.created_at}>{dateFormat.format(new Date(row.created_at))}</time></td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {whatsappUrl ? (
                        <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Follow up with ${row.name} on WhatsApp (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 font-semibold text-emerald-800 hover:bg-emerald-100">
                          <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                        </a>
                      ) : <span className="text-slate-500">Country code needed</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {(page > 0 || rows?.length > pageSize) && (
        <nav aria-label="Wishlist pages" className="flex items-center gap-4 text-sm">
          <button type="button" disabled={page === 0 || !ready} onClick={() => setPage(page - 1)} className="rounded-lg border px-3 py-2 disabled:opacity-40">Previous</button>
          <span>Page {page + 1}</span>
          <button type="button" disabled={!rows || rows.length <= pageSize} onClick={() => setPage(page + 1)} className="rounded-lg border px-3 py-2 disabled:opacity-40">Next</button>
        </nav>
      )}
    </section>
  );
}
