import { Link } from "react-router-dom";
import { CreditCard, ListChecks, Users, Layers } from "lucide-react";

// "to: null" means no page exists yet for this action (no student directory
// or batches concept in ma-landing's data model) — rendered as a disabled
// affordance rather than a fake link.
const ACTIONS = [
  { label: "View Pending Payments", icon: CreditCard, to: "/admin/enrollments" },
  { label: "View All Enrollments", icon: ListChecks, to: "/admin/enrollments" },
  { label: "View Students", icon: Users, to: null },
  { label: "Manage Batches", icon: Layers, to: null },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900">Quick Actions</h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const enabled = Boolean(action.to);

          const inner = (
            <>
              <Icon
                size={18}
                className={enabled ? "text-amber-600" : "text-slate-400"}
              />
              <span
                className={`text-sm font-bold ${
                  enabled ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {action.label}
              </span>
            </>
          );

          return enabled ? (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:bg-amber-50/50"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={action.label}
              title="Coming soon"
              className="flex flex-col items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 opacity-60"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
