import { supabase } from "../../../lib/supabase";

async function allRows(table, order) {
  const rows = [];
  for (let from = 0; ; from += 500) {
    let query = supabase.from(table).select("*").order(order).range(from, from + 499);
    if (table === "enrollments") query = query.is("deleted_at", null);
    const { data, error } = await query;
    if (error) throw error;
    rows.push(...data);
    if (data.length < 500) return rows;
  }
}

export async function loadBatches() {
  const [batches, enrollments, assignments] = await Promise.all([
    allRows("batches", "created_at"), allRows("enrollments", "id"),
    allRows("batch_enrollments", "enrollment_id"),
  ]);
  const lookup = new Map(assignments.map((row) => [row.enrollment_id, row.batch_id]));
  return { batches, enrollments: enrollments.map((row) => ({ ...row, batch_id: lookup.get(row.id) || null })) };
}

export async function loadBatchAssignments() {
  const [batches, assignments] = await Promise.all([
    allRows("batches", "created_at"), allRows("batch_enrollments", "enrollment_id"),
  ]);
  return { batches, assignments: Object.fromEntries(assignments.map((row) => [row.enrollment_id, row.batch_id])) };
}

export async function saveBatch(payload, id) {
  const query = id ? supabase.from("batches").update(payload).eq("id", id) :
    supabase.from("batches").insert(payload);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}

export async function assignBatch(enrollmentId, batchId) {
  const query = batchId ? supabase.from("batch_enrollments").upsert({ enrollment_id: enrollmentId, batch_id: batchId }) :
    supabase.from("batch_enrollments").delete().eq("enrollment_id", enrollmentId);
  const { error } = await query;
  if (error) throw error;
}
