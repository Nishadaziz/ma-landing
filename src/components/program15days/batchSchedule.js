import { createBatchSchedule } from "../../lib/batchSchedule";

/**
 * The very first batch launched on the 6th (instead of the usual 1st)
 * because the course started partway through September 2026. Every batch
 * after that follows the regular 1st/16th monthly cadence indefinitely.
 */
const schedule = createBatchSchedule({
  days: [1, 16],
  hour: "22:00:00",
  firstOverride: { year: 2026, month: 9, replaces: 1, day: 6 },
});

export const { getNextBatchDate, formatBatchDate, formatBatchDateTime } =
  schedule;
