/**
 * Derives Admin Overview metrics directly from the real `enrollments` table
 * (the same rows already fetched by getAllEnrollments()). No new queries,
 * no schema changes — everything here is a pure client-side aggregation.
 *
 * The one concept that genuinely doesn't exist in ma-landing's data model
 * yet is batches/cohorts — that single KPI stays a clearly-flagged demo
 * value (`real: false`) until a batches table exists.
 */

function classifyExam(row) {
  const slug = (row.course_slug || "").toLowerCase();
  const name = (row.course_name || "").toLowerCase();

  if (slug.includes("ielts") || name.includes("ielts")) return "IELTS";
  if (slug.includes("pte") || name.includes("pte")) return "PTE";
  if (slug.includes("toefl") || name.includes("toefl")) return "TOEFL";
  return "DET";
}

function studentKey(row) {
  return (row.student_email || row.student_phone || row.student_name || "")
    .toLowerCase()
    .trim();
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sumApprovedInRange(rows, start, end) {
  return rows
    .filter((row) => row.status === "approved" && row.submitted_at)
    .filter((row) => {
      const submitted = new Date(row.submitted_at);
      return submitted >= start && submitted < end;
    })
    .reduce((sum, row) => sum + Number(row.payment_amount || 0), 0);
}

function growthPercent(current, previous) {
  if (!previous) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function buildDailyBuckets(count) {
  const today = startOfDay(new Date());
  const buckets = [];

  for (let i = count - 1; i >= 0; i -= 1) {
    const start = new Date(today);
    start.setDate(start.getDate() - i);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    buckets.push({
      start,
      end,
      label: start.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return buckets;
}

function buildWeeklyBuckets(count, daysPerBucket = 7) {
  const today = startOfDay(new Date());
  const buckets = [];

  for (let i = count - 1; i >= 0; i -= 1) {
    const end = new Date(today);
    end.setDate(end.getDate() - i * daysPerBucket + 1);
    const start = new Date(end);
    start.setDate(start.getDate() - daysPerBucket);

    buckets.push({ start, end, label: `W${count - i}` });
  }

  return buckets;
}

function buildMonthlyBuckets(count) {
  const now = new Date();
  const buckets = [];

  for (let i = count - 1; i >= 0; i -= 1) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    buckets.push({
      start,
      end,
      label: start.toLocaleDateString("en-US", { month: "short" }),
    });
  }

  return buckets;
}

function fillBuckets(buckets, rows) {
  return buckets.map((bucket) => ({
    label: bucket.label,
    value: sumApprovedInRange(rows, bucket.start, bucket.end),
  }));
}

function periodTotalsByDays(rows, days) {
  const currentEnd = startOfDay(new Date());
  currentEnd.setDate(currentEnd.getDate() + 1);
  const currentStart = new Date(currentEnd);
  currentStart.setDate(currentStart.getDate() - days);
  const previousEnd = currentStart;
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - days);

  const total = sumApprovedInRange(rows, currentStart, currentEnd);
  const previous = sumApprovedInRange(rows, previousStart, previousEnd);

  return { total, previous, growth: growthPercent(total, previous) };
}

function periodTotalsByMonths(rows, months) {
  const now = new Date();
  const currentEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const currentStart = new Date(now.getFullYear(), now.getMonth() + 1 - months, 1);
  const previousEnd = currentStart;
  const previousStart = new Date(
    now.getFullYear(),
    now.getMonth() + 1 - months * 2,
    1
  );

  const total = sumApprovedInRange(rows, currentStart, currentEnd);
  const previous = sumApprovedInRange(rows, previousStart, previousEnd);

  return { total, previous, growth: growthPercent(total, previous) };
}

function formatRelativeDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  const diffDays = Math.floor(
    (startOfDay(new Date()).getTime() - startOfDay(date).getTime()) / 86400000
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-BD", { month: "short", day: "numeric" });
}

function getKpis(rows) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const weekStart = startOfDay(new Date());
  weekStart.setDate(weekStart.getDate() - 6);

  const totalStudents = new Set(rows.map(studentKey).filter(Boolean)).size;

  const activeStudents = new Set(
    rows
      .filter((row) => row.status === "approved")
      .map(studentKey)
      .filter(Boolean)
  ).size;

  const newEnrollmentsThisMonth = rows.filter((row) => {
    if (!row.submitted_at) return false;
    const submitted = new Date(row.submitted_at);
    return submitted >= monthStart && submitted < monthEnd;
  }).length;

  const revenueThisMonth = sumApprovedInRange(rows, monthStart, monthEnd);
  const pendingPayments = rows.filter((row) => row.status === "pending").length;

  const newStudentsThisWeek = new Set(
    rows
      .filter((row) => row.submitted_at && new Date(row.submitted_at) >= weekStart)
      .map(studentKey)
      .filter(Boolean)
  ).size;

  return {
    totalStudents,
    activeStudents,
    newEnrollmentsThisMonth,
    revenueThisMonth,
    pendingPayments,
    newStudentsThisWeek,
  };
}

function getExamDistribution(rows) {
  if (!rows.length) return [];

  const counts = {};
  rows.forEach((row) => {
    const exam = classifyExam(row);
    counts[exam] = (counts[exam] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([exam, count]) => ({
      exam,
      percent: Math.round((count / rows.length) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
}

function getRecentEnrollments(rows, limit = 6) {
  return rows.slice(0, limit).map((row) => ({
    student: row.student_name || "—",
    program: row.course_name || "—",
    exam: classifyExam(row),
    amount: row.payment_amount,
    method: row.payment_method,
    status: row.status,
    date: formatRelativeDate(row.submitted_at),
  }));
}

export function formatBDT(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export function buildOverview(rows = []) {
  const kpis = getKpis(rows);

  return {
    kpis: {
      totalStudents: {
        value: kpis.totalStudents,
        description: "All registered students",
      },
      activeStudents: {
        value: kpis.activeStudents,
        description: "Have an approved enrollment",
      },
      newEnrollments: {
        value: kpis.newEnrollmentsThisMonth,
        description: "This month",
      },
      revenueThisMonth: {
        value: kpis.revenueThisMonth,
        description: "Approved payments this month",
      },
      pendingPayments: {
        value: kpis.pendingPayments,
        description: "Requires verification",
      },
      // No batches/cohorts table exists yet — the only demo value on this page.
      activeBatches: {
        value: 0,
        description: "Not tracked yet",
        demo: true,
      },
    },
    revenue: {
      series: {
        "7d": fillBuckets(buildDailyBuckets(7), rows),
        "30d": fillBuckets(buildWeeklyBuckets(4), rows),
        "3m": fillBuckets(buildMonthlyBuckets(3), rows),
        "1y": fillBuckets(buildMonthlyBuckets(12), rows),
      },
      totals: {
        "7d": periodTotalsByDays(rows, 7),
        "30d": periodTotalsByDays(rows, 30),
        "3m": periodTotalsByMonths(rows, 3),
        "1y": periodTotalsByMonths(rows, 12),
      },
    },
    examDistribution: getExamDistribution(rows),
    recentEnrollments: getRecentEnrollments(rows),
    attention: {
      pendingPaymentsCount: kpis.pendingPayments,
      extra: [
        {
          key: "newStudents",
          icon: "newStudents",
          label: `${kpis.newStudentsThisWeek} new student${
            kpis.newStudentsThisWeek === 1 ? "" : "s"
          } this week`,
          count: kpis.newStudentsThisWeek,
          to: null,
        },
      ],
    },
  };
}
