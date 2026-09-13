import { supabase } from "../../../lib/supabase";
import { TRASH_RETENTION_DAYS } from "../constants";

// Best-effort cleanup: called whenever the admin opens the trash, so
// anything past the retention window is gone by the time it's viewed.
// It only runs on admin visits rather than in the background, so an
// expired item disappears the next time someone opens the admin panel
// rather than at the exact moment it turns 30 days old.
export async function purgeExpiredTrash() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - TRASH_RETENTION_DAYS);

  const { error } = await supabase
    .from("enrollments")
    .delete()
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff.toISOString());

  if (error) {
    throw error;
  }
}
