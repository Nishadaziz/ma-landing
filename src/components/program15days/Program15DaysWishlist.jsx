import { useRef, useState } from "react";
import { Bookmark } from "lucide-react";
import wishlistBackground from "../../assets/program15days/wishlist-background.jpg";
import { supabase } from "../../lib/supabase";
import { WISHLIST_BATCHES } from "../../lib/detWishlist";

export default function Program15DaysWishlist() {
  const request = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submitWishlist(event) {
    event.preventDefault();
    if (status === "saving" || status === "saved") return;
    const fields = new FormData(event.currentTarget);
    const name = fields.get("name").trim();
    const contactNumber = fields.get("contact").trim().replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - 2534)).replace(/[\s().-]/g, "");
    if (!/^[+]?\d{7,15}$/.test(contactNumber)) {
      setStatus("error");
      setMessage("Enter a valid contact number, including the country code if needed.");
      return;
    }

    const preferredBatch = fields.get("batch");
    const key = JSON.stringify([name, contactNumber, preferredBatch]);
    if (request.current?.key !== key) request.current = { id: crypto.randomUUID(), key };
    setStatus("saving");
    setMessage("");
    try {
      const { error } = await supabase.from("det_wishlist").insert({
        id: request.current.id,
        name,
        contact_number: contactNumber,
        preferred_batch: preferredBatch,
      });
      if (error && error.code !== "23505") throw error;
      setStatus("saved");
      setMessage("You’re on the wishlist. DuoMate can use your contact number to follow up about your preferred batch.");
    } catch {
      setStatus("error");
      setMessage("We couldn’t save your request. Please try again.");
    }
  }

  return (
    <section
      id="wishlist"
      aria-labelledby="wishlist-title"
      className="mt-12 scroll-mt-28 rounded-[32px] border border-emerald-900 bg-emerald-950 bg-cover bg-[65%_center] p-6 md:bg-right md:p-10"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(2, 20, 12, 0.92), rgba(2, 20, 12, 0.55) 52%, rgba(2, 20, 12, 0.28)), url("${wishlistBackground}")` }}
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
        <div>
          <Bookmark aria-hidden="true" className="mb-3 h-6 w-6 text-emerald-300" />
          <h2 id="wishlist-title" className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Want a WhatsApp update when the next 15-Day DET batch starts?</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50">
            Leave your WhatsApp number and we’ll message you with the start date once it’s confirmed.
          </p>
        </div>
        <form onSubmit={submitWishlist} className="rounded-2xl border border-emerald-100 bg-white p-5">
          {status !== "saved" && <fieldset disabled={status === "saving"} className="grid min-w-0 gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
            Your name
            <input name="name" autoComplete="name" required pattern=".*\S.*" maxLength={80} className="rounded-xl border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-600 focus:outline-emerald-600" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
            WhatsApp number
            <input name="contact" type="tel" autoComplete="tel" required maxLength={30} placeholder="01XXXXXXXXX" className="rounded-xl border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-600 focus:outline-emerald-600" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
            Preferred batch
            <select name="batch" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal focus:border-emerald-600 focus:outline-emerald-600">
              {Object.entries(WISHLIST_BATCHES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <button className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60" type="submit">
            {status === "saving" ? "Submitting…" : "Notify Me on WhatsApp"}
          </button>
          <p className="text-xs text-slate-600">Your contact number will be shared with DuoMate for course follow-up. Seat reservations are handled through enrollment.</p>
          </fieldset>}
          {message && <p role={status === "error" ? "alert" : "status"} className={status === "error" ? "mt-3 text-sm text-red-700" : "text-sm font-semibold text-emerald-800"}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
