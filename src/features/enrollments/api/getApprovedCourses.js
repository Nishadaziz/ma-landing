import { supabase } from "../../../lib/supabase";

export async function getApprovedCourses(userId) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}