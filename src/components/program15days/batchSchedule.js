const BATCH_HOUR = "22:00:00";
const BATCH_TZ = "+06:00";

/**
 * The very first batch launched on the 6th (instead of the usual 1st)
 * because the course started partway through September 2026. Every batch
 * after that follows the regular 1st/16th monthly cadence indefinitely.
 */
const FIRST_BATCH_OVERRIDE = { year: 2026, month: 9, day: 6 };

function pad(value) {
  return String(value).padStart(2, "0");
}

function buildBatchDate(year, month, day) {
  return new Date(`${year}-${pad(month)}-${pad(day)}T${BATCH_HOUR}${BATCH_TZ}`);
}

function getMonthBatchDates(year, month) {
  return [1, 16].map((day) => {
    const isOverriddenFirst =
      year === FIRST_BATCH_OVERRIDE.year &&
      month === FIRST_BATCH_OVERRIDE.month &&
      day === 1;

    return buildBatchDate(
      year,
      month,
      isOverriddenFirst ? FIRST_BATCH_OVERRIDE.day : day
    );
  });
}

/** Next upcoming batch start date after `referenceDate`, on the recurring 1st/16th schedule. */
export function getNextBatchDate(referenceDate = new Date()) {
  let year = referenceDate.getFullYear();
  let month = referenceDate.getMonth() + 1;

  for (let i = 0; i < 48; i += 1) {
    const candidates = getMonthBatchDates(year, month);

    for (const candidate of candidates) {
      if (candidate.getTime() > referenceDate.getTime()) {
        return candidate;
      }
    }

    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return buildBatchDate(year, month, 1);
}

export function formatBatchDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatBatchDateTime(date) {
  return `${formatBatchDate(date)} at 10:00 PM`;
}
