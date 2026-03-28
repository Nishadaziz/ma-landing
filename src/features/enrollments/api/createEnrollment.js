import { supabase } from "../../../lib/supabase";

export async function createEnrollment(payload) {
  const { error } = await supabase.from("enrollments").insert([payload]);

  if (error) {
    throw error;
  }

  return true;
}