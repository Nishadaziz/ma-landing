import test from "node:test";
import assert from "node:assert/strict";
import { summarizeBatch } from "../src/features/admin-panel/utils/batchSummary.js";

test("new batches start with zero students and balances", () => {
  assert.deepEqual(summarizeBatch([]), { students: 0, registrations: 0, pending: 0, paid: 0, due: 0, unknownFees: 0 });
});

test("unverified and rejected payments never inflate paid totals or balances", () => {
  const result = summarizeBatch([
    { id: "a", user_id: "student-1", status: "approved", payment_amount: "1500", course_fee: "5000" },
    { id: "b", status: "pending", payment_amount: 4500, course_fee: 5000 },
    { id: "c", status: "rejected", payment_amount: 5000, course_fee: 5000 },
  ]);
  assert.equal(result.students, 1);
  assert.equal(result.registrations, 3);
  assert.equal(result.pending, 1);
  assert.equal(result.paid, 1500);
  assert.equal(result.due, 3500);
});

test("multiple enrollments for the same student count once but preserve each payment", () => {
  const result = summarizeBatch([
    { id: "a", student_email: "Student@Example.com ", status: "approved", payment_amount: 1000, course_fee: 2000 },
    { id: "b", student_email: "student@example.com", status: "approved", payment_amount: 2000, course_fee: 2000 },
  ]);
  assert.equal(result.students, 1);
  assert.equal(result.paid, 3000);
  assert.equal(result.due, 1000);
});

test("unknown fees are reported separately and overpayments never create negative due", () => {
  const result = summarizeBatch([
    { id: "a", status: "approved", payment_amount: 1000, course_fee: null },
    { id: "b", status: "approved", payment_amount: 3000, course_fee: 2000 },
    { id: "c", status: "approved", payment_amount: 0, course_fee: 0 },
  ]);
  assert.equal(result.unknownFees, 1);
  assert.equal(result.due, 0);
  assert.equal(result.students, 3);
});
