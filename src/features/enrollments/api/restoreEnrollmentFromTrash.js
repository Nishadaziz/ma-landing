import { supabase } from "../../../lib/supabase";

export async function restoreEnrollmentFromTrash(enrollmentId) {
  const { data, error } = await supabase
    .from("enrollments")
    .update({ deleted_at: null })
    .eq("id", enrollmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
