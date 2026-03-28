import { supabase } from "../../../lib/supabase";

export async function getAllEnrollments() {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}