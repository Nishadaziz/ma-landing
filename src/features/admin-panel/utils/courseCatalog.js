/**
 * The courses staff can pick when writing a manual invoice. Prices mirror
 * the live checkout pages so the invoice total auto-fills correctly; courses
 * with no fixed checkout price (PTE/TOEFL one-on-one) are still listed but
 * leave the amount for staff to enter.
 *
 * The `id` for the three Duolingo courses intentionally matches the
 * COURSE_SLUG each checkout page writes to `enrollments.course_slug` (see
 * CheckoutGuidedPreparation.jsx, CheckoutCrashCourse.jsx, CheckoutDuolingo.jsx)
 * so a manually-invoiced student groups with real checkout students under
 * the same course on the Registration page instead of appearing as a
 * separate, differently-slugged "course".
 */
export const COURSE_CATALOG = [
  { id: "det-guided-preparation", label: "DET Guided Preparation", price: 5000 },
  { id: "duolingo-15-days-crash-course", label: "Duolingo 15 Days Crash Course", price: 4500 },
  { id: "duolingo-one-month", label: "Duolingo 1 Month Preparation", price: 4999 },
  { id: "ielts-complete", label: "Complete IELTS Preparation", price: 9500 },
  { id: "ielts-reading-listening", label: "IELTS Reading & Listening Combined", price: 2000 },
  { id: "ielts-reading", label: "IELTS Reading Course", price: 1530 },
  { id: "ielts-writing", label: "IELTS Writing Course", price: 1530 },
  { id: "ielts-listening", label: "IELTS Listening Course", price: 1530 },
  { id: "ielts-speaking", label: "IELTS Speaking Course", price: 1530 },
  { id: "pte-one-on-one", label: "PTE One-on-One", price: null },
  { id: "toefl-one-on-one", label: "TOEFL One-on-One", price: null },
];

export const CUSTOM_COURSE_ID = "custom";
