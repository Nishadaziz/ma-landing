import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  UserPlus,
  Receipt,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";

const navItems = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Enrollments", to: "/admin/enrollments", icon: ListChecks },
  { label: "Registration", to: "/admin/registration", icon: UserPlus },
  { label: "Invoice", to: "/admin/invoice", icon: Receipt },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-900 print:bg-white">
      <style>{`
        @media print {
          .admin-no-print { display: none !important; }
        }
      `}</style>

      {sidebarOpen ? (
        <div
          className="admin-no-print fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`admin-no-print fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-600">
              DuoMate
            </p>
            <h1 className="mt-1 text-xl font-extrabold text-slate-900">
              Admin Panel
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition",
                    isActive
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <div className={`${sidebarOpen ? "lg:pl-64" : ""} print:pl-0`}>
        <header className="admin-no-print sticky top-0 z-20 flex items-start gap-3 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="mt-0.5 rounded-lg p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-600">
              DuoMate Administration
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Manage enrollments, payments, and platform activity.
            </p>
          </div>
        </header>

        <main className="px-5 py-8 md:px-8 print:p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
