import { supabase } from "../../../lib/supabase";

/**
 * Records a registration created by staff from the admin Invoice tool.
 * Unlike createEnrollment() (used by the public checkout forms), this does
 * NOT fire Facebook Pixel lead/conversion events — a manually-written
 * invoice isn't a real ad-attributed checkout and shouldn't be counted as one.
 */
export async function createManualEnrollment(payload) {
  const { error } = await supabase.from("enrollments").insert([payload]);

  if (error) {
    throw error;
  }

  return true;
}
