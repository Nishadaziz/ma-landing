import test from "node:test";
import assert from "node:assert/strict";
import { createBatchSchedule } from "../src/lib/batchSchedule.js";
import { getNextBatchDate, loadBatchSchedule } from "../src/components/program15days/batchSchedule.js";

const schedule = createBatchSchedule({ days: [6, 13, 21, 29], hour: "22:00:00" });

test("registration switches from Batch 14 to Batch 15 exactly at the course countdown", () => {
  assert.equal(schedule.getNextBatchDate(new Date("2026-10-21T21:59:59+06:00")).toISOString(), "2026-10-21T16:00:00.000Z");
  assert.equal(schedule.getNextBatchDate(new Date("2026-10-21T22:00:00+06:00")).toISOString(), "2026-10-29T16:00:00.000Z");
});

test("schedule continues across month and year boundaries", () => {
  assert.equal(schedule.getNextBatchDate(new Date("2026-10-29T22:00:00+06:00")).toISOString(), "2026-11-06T16:00:00.000Z");
  assert.equal(schedule.getNextBatchDate(new Date("2026-12-29T22:00:00+06:00")).toISOString(), "2027-01-06T16:00:00.000Z");
});

test("February 29 is skipped in non-leap years", () => {
  assert.equal(schedule.getNextBatchDate(new Date("2027-02-21T22:00:00+06:00")).toISOString(), "2027-03-06T16:00:00.000Z");
  assert.equal(schedule.getNextBatchDate(new Date("2028-02-21T22:00:00+06:00")).toISOString(), "2028-02-29T16:00:00.000Z");
});

test("calendar calculations use Bangladesh time, independent of the browser timezone", () => {
  const midnight = createBatchSchedule({ days: [1], hour: "01:00:00" });
  assert.equal(midnight.getNextBatchDate(new Date("2026-10-31T18:30:00Z")).toISOString(), "2026-10-31T19:00:00.000Z");
});

test("course page loads the database schedule with a working offline fallback", async () => {
  const client = (result) => ({ from: () => ({ select: () => ({ eq: () => ({ single: async () => result }) }) }) });
  await loadBatchSchedule(client({ error: new Error("offline") }));
  assert.equal(getNextBatchDate(new Date("2026-10-21T22:00:00+06:00")).toISOString(), "2026-10-29T16:00:00.000Z");
  await loadBatchSchedule(client({ data: { scheduled_days: [6,13,21,29], start_time: "22:00:00", timezone: "Asia/Dhaka" } }));
  assert.equal(getNextBatchDate(new Date("2026-10-29T22:00:00+06:00")).toISOString(), "2026-11-06T16:00:00.000Z");
});
