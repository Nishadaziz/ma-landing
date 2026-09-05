import { createBatchSchedule } from "../../lib/batchSchedule";

/** New 1-month batches start on the 8th and 18th of every month, indefinitely. */
const schedule = createBatchSchedule({
  days: [8, 18],
  hour: "22:30:00",
});

export const { getNextBatchDate, formatBatchDate, formatBatchDateTime } =
  schedule;
