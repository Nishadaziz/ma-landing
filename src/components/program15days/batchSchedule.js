import { createBatchSchedule } from "../../lib/batchSchedule";

/** New 15-day course batches start on the 6th, 13th, 21st, and 29th monthly. */
const schedule = createBatchSchedule({
  days: [6, 13, 21, 29],
  hour: "22:00:00",
});

export const { getNextBatchDate, formatBatchDate, formatBatchDateTime } =
  schedule;
