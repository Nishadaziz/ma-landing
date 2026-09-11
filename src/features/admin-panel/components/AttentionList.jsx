import { Link } from "react-router-dom";
import { CreditCard, UserPlus } from "lucide-react";

const ICONS = {
  payments: CreditCard,
  newStudents: UserPlus,
};

export default function AttentionList({ pendingPaymentsCount = 0, extra = [] }) {
  const items = [
    {
      key: "payments",
      icon: "payments",
      label: `${pendingPaymentsCount} payment${
        pendingPaymentsCount === 1 ? "" : "s"
      } awaiting approval`,
      count: pendingPaymentsCount,
      to: "/admin/enrollments",
      tone: pendingPaymentsCount > 0 ? "warning" : "neutral",
    },
    ...extra,
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900">
        Requires Attention
      </h2>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon] || CreditCard;

          const row = (
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition hover:border-slate-200">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  item.tone === "warning"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Icon size={16} />
              </div>

              <p className="flex-1 text-sm font-semibold text-slate-700">
                {item.label}
              </p>

              <span className="text-sm font-extrabold text-slate-900">
                {item.count}
              </span>
            </div>
          );

          return item.to ? (
            <Link key={item.key} to={item.to} className="block">
              {row}
            </Link>
          ) : (
            <div key={item.key}>{row}</div>
          );
        })}
      </div>
    </div>
  );
}
