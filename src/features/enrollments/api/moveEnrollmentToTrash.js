import { supabase } from "../../../lib/supabase";

export async function moveEnrollmentToTrash(enrollmentId) {
  const { data, error } = await supabase
    .from("enrollments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", enrollmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
