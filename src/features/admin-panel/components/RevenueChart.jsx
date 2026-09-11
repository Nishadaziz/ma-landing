import { useState } from "react";
import { formatBDT } from "../utils/overviewData";

const FILTERS = [
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "3m", label: "3 Months" },
  { key: "1y", label: "1 Year" },
];

const CHART_WIDTH = 640;
const CHART_HEIGHT = 200;
const PADDING = 8;

function buildPaths(values) {
  if (!values.length) return { linePath: "", areaPath: "" };

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = (CHART_WIDTH - PADDING * 2) / (values.length - 1 || 1);

  const coords = values.map((value, index) => {
    const x = PADDING + index * stepX;
    const y =
      PADDING + (CHART_HEIGHT - PADDING * 2) * (1 - (value - min) / range);
    return [x, y];
  });

  const linePath = coords
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

  const [lastX] = coords[coords.length - 1];
  const [firstX] = coords[0];
  const areaPath = `${linePath} L ${lastX.toFixed(1)} ${CHART_HEIGHT - PADDING} L ${firstX.toFixed(1)} ${CHART_HEIGHT - PADDING} Z`;

  return { linePath, areaPath };
}

function TotalStat({ label, value, tone = "default" }) {
  const toneClass =
    tone === "muted"
      ? "text-slate-400"
      : tone === "positive"
        ? "text-emerald-600"
        : "text-slate-900";

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className={`mt-1 text-xl font-extrabold ${toneClass}`}>{value}</p>
    </div>
  );
}

export default function RevenueChart({ series, totals, defaultFilter = "30d" }) {
  const [filter, setFilter] = useState(defaultFilter);

  const points = series?.[filter] || [];
  const currentTotals = totals?.[filter] || {};
  const { linePath, areaPath } = buildPaths(points.map((p) => p.value));
  const growth = currentTotals.growth ?? 0;
  const hasAnyRevenue = points.some((p) => p.value > 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Revenue Overview
          </h2>

          <div className="mt-4 flex flex-wrap gap-6">
            <TotalStat label="Total Revenue" value={formatBDT(currentTotals.total)} />
            <TotalStat
              label="Previous Period"
              value={formatBDT(currentTotals.previous)}
              tone="muted"
            />
            <TotalStat
              label="Growth"
              value={`${growth >= 0 ? "+" : ""}${growth}%`}
              tone={growth >= 0 ? "positive" : "default"}
            />
          </div>
        </div>

        <div className="flex shrink-0 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                filter === item.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {hasAnyRevenue ? (
          <>
            <svg
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              className="h-48 w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </linearGradient>
              </defs>

              {areaPath ? <path d={areaPath} fill="url(#revenueFill)" /> : null}

              {linePath ? (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
            </svg>

            {points.length ? (
              <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
                <span>{points[0].label}</span>
                <span>{points[points.length - 1].label}</span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">
            No approved payments in this period yet
          </div>
        )}
      </div>
    </div>
  );
}
