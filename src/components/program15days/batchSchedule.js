import { createBatchSchedule } from "../../lib/batchSchedule.js";

/** New 15-day course batches start on the 6th, 13th, 21st, and 29th monthly. */
let schedule = createBatchSchedule({
  days: [6, 13, 21, 29],
  hour: "22:00:00",
});

export const { formatBatchDate, formatBatchDateTime } = schedule;

export function getNextBatchDate(referenceDate) {
  return schedule.getNextBatchDate(referenceDate);
}

// Use the database schedule that also drives automatic batch assignments.
// The existing page schedule remains the fallback if the request fails.
export async function loadBatchSchedule(client) {
  const { data, error } = await client.from("course_batch_schedules")
    .select("scheduled_days,start_time,timezone")
    .eq("course_slug", "duolingo-15-days-crash-course").single();
  if (error || !data || data.timezone !== "Asia/Dhaka") return;
  schedule = createBatchSchedule({ days: data.scheduled_days, hour: data.start_time, tz: "+06:00" });
}
