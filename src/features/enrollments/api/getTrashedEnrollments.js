import { supabase } from "../../../lib/supabase";

export async function getTrashedEnrollments() {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
