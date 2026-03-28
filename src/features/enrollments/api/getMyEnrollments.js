import { supabase } from "../../../lib/supabase";

export async function getMyEnrollments(userId) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}