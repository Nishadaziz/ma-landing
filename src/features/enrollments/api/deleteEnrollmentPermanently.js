import { supabase } from "../../../lib/supabase";

export async function deleteEnrollmentPermanently(enrollmentId) {
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("id", enrollmentId);

  if (error) {
    throw error;
  }
}
