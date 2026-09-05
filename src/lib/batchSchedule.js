function pad(value) {
  return String(value).padStart(2, "0");
}

function buildBatchDate(year, month, day, hour, tz) {
  return new Date(`${year}-${pad(month)}-${pad(day)}T${hour}${tz}`);
}

/**
 * Creates a recurring monthly batch schedule generator.
 *
 * @param {number[]} days - Days of the month new batches start on (e.g. [8, 18]).
 * @param {string} [hour] - Batch start time, "HH:mm:ss" (default 10:00 PM).
 * @param {string} [tz] - UTC offset (default Bangladesh time, +06:00).
 * @param {{ year: number, month: number, replaces: number, day: number }} [firstOverride] -
 *   Swaps one scheduled day in one specific month for a different day (e.g. when a
 *   course launches partway through a month instead of on its usual recurring day).
 */
export function createBatchSchedule({
  days,
  hour = "22:00:00",
  tz = "+06:00",
  firstOverride = null,
}) {
  function getMonthBatchDates(year, month) {
    return days.map((day) => {
      const isOverridden =
        firstOverride &&
        year === firstOverride.year &&
        month === firstOverride.month &&
        day === firstOverride.replaces;

      return buildBatchDate(
        year,
        month,
        isOverridden ? firstOverride.day : day,
        hour,
        tz
      );
    });
  }

  function getNextBatchDate(referenceDate = new Date()) {
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

    return buildBatchDate(year, month, days[0], hour, tz);
  }

  function formatBatchDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  function formatBatchTime(date) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  function formatBatchDateTime(date) {
    return `${formatBatchDate(date)} at ${formatBatchTime(date)}`;
  }

  return { getNextBatchDate, formatBatchDate, formatBatchDateTime };
}
