export default function BatchSelector({ enrollment, state }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
      Batch · {enrollment.course_name || "Enrollment"}
      <select aria-label={`Batch for ${enrollment.student_name}, ${enrollment.course_name}`}
        value={state.assignments[enrollment.id] || ""}
        disabled={state.loading || !!state.savingId || !state.batches.length}
        onChange={(event) => state.save(enrollment.id, event.target.value || null)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:opacity-50">
        <option value="">{state.loading ? "Loading batches…" : "Not assigned"}</option>
        {state.batches.map((batch) => <option key={batch.id} value={batch.id}>{batch.name}{batch.status === "completed" ? " (completed)" : ""}</option>)}
      </select>
      {state.savingId === enrollment.id && <span role="status">Saving…</span>}
    </label>
  );
}
