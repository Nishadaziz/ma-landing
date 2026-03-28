import { supabase } from "../../../lib/supabase";

export async function updateEnrollmentStatus(enrollmentId, status, reviewedBy) {
  const { data, error } = await supabase
    .from("enrollments")
    .update({
      status,
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", enrollmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}