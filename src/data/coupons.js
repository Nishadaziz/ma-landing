/**
 * Internal discount coupon codes. Not displayed anywhere on the site —
 * only entered manually at checkout by staff or students who already know
 * the code. Keys are matched case-insensitively.
 *
 * Each code is locked to a single course — it only resolves when checked
 * against that course's key, so a code meant for one checkout page won't
 * work on another.
 */
const coupons = {
  CEOFAV: { discount: 1500, course: "guided-preparation" },
  MENTOR: { discount: 1000, course: "guided-preparation" },
  EDVEX: { discount: 500, course: "guided-preparation" },
  CEO500: { discount: 500, course: "15-days" },
  CEO1000: { discount: 1000, course: "1-month" },
};

export function resolveCoupon(rawCode, course) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return null;

  const entry = coupons[code];
  if (!entry) return null;
  if (entry.course !== course) return null;

  return { code, discount: entry.discount };
}

export default coupons;
