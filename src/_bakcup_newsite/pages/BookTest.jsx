export default function BookTest() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold">Book Test Center</h1>
      <p className="text-slate-600">
        Each booking will reserve a <b>4-hour</b> slot. (Booking form coming next.)
      </p>

      <div className="rounded-2xl border bg-slate-50 p-5">
        <div className="font-bold">Next step</div>
        <p className="mt-1 text-sm text-slate-600">
          We will add date + time selection and automatically block 4 hours.
        </p>
      </div>
    </div>
  );
}
