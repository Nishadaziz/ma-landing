import { useEffect, useState } from "react";
import { assignBatch, loadBatchAssignments } from "../api/batches";

export function useBatchAssignments() {
  const [data, setData] = useState({ batches: [], assignments: {}, loading: true, error: "" });
  const [savingId, setSavingId] = useState(null);
  useEffect(() => {
    let active = true;
    loadBatchAssignments().then((result) => {
      if (active) setData({ ...result, loading: false, error: "" });
    }).catch(() => {
      if (active) setData({ batches: [], assignments: {}, loading: false, error: "Could not load batches. Refresh to try again." });
    });
    return () => { active = false; };
  }, []);
  async function save(enrollmentId, batchId) {
    setSavingId(enrollmentId);
    try {
      await assignBatch(enrollmentId, batchId);
      setData((previous) => ({ ...previous, error: "", assignments: { ...previous.assignments, [enrollmentId]: batchId } }));
    } catch {
      setData((previous) => ({ ...previous, error: "Batch assignment was not saved. Please try again." }));
    } finally { setSavingId(null); }
  }
  return { ...data, savingId, save };
}
