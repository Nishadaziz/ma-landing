import { useEffect, useState } from "react";
import { RefreshCw, Users, UserCheck, UserPlus, Wallet, CreditCard, Layers } from "lucide-react";

import { getAllEnrollments } from "../../enrollments/api/getAllEnrollments";
import { buildOverview, formatBDT } from "../utils/overviewData";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import ExamDistribution from "../components/ExamDistribution";
import RecentEnrollmentsTable from "../components/RecentEnrollmentsTable";
import AttentionList from "../components/AttentionList";
import QuickActions from "../components/QuickActions";

const TODAY_LABEL = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllEnrollments()
      .then((rows) => setData(buildOverview(rows || [])))
      .catch((loadError) => {
        console.error("OVERVIEW LOAD ERROR:", loadError);
        setError(loadError.message || "Could not load dashboard data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <RefreshCw className="mx-auto animate-spin text-amber-600" />
        <p className="mt-4 font-semibold text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
        {error || "Something went wrong."}
      </div>
    );
  }

  const { kpis } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Overview of DuoMate&apos;s students, enrollments, payments and
            platform activity.
          </p>
        </div>

        <p className="text-sm font-semibold text-slate-500">{TODAY_LABEL}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value={kpis.totalStudents.value.toLocaleString("en-BD")}
          description={kpis.totalStudents.description}
        />
        <StatCard
          icon={UserCheck}
          label="Active Students"
          value={kpis.activeStudents.value.toLocaleString("en-BD")}
          description={kpis.activeStudents.description}
        />
        <StatCard
          icon={UserPlus}
          label="New Enrollments"
          value={kpis.newEnrollments.value.toLocaleString("en-BD")}
          description={kpis.newEnrollments.description}
        />
        <StatCard
          icon={Wallet}
          label="Revenue This Month"
          value={formatBDT(kpis.revenueThisMonth.value)}
          description={kpis.revenueThisMonth.description}
        />
        <StatCard
          icon={CreditCard}
          label="Pending Payments"
          value={kpis.pendingPayments.value.toLocaleString("en-BD")}
          description={kpis.pendingPayments.description}
        />
        <StatCard
          icon={Layers}
          label="Active Batches"
          value={kpis.activeBatches.value.toLocaleString("en-BD")}
          description={kpis.activeBatches.description}
          demo={kpis.activeBatches.demo}
        />
      </div>

      {/* Revenue + exam distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart series={data.revenue.series} totals={data.revenue.totals} />
        </div>

        <ExamDistribution data={data.examDistribution} />
      </div>

      {/* Recent enrollments */}
      <RecentEnrollmentsTable rows={data.recentEnrollments} />

      {/* Attention + quick actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttentionList
          pendingPaymentsCount={data.attention.pendingPaymentsCount}
          extra={data.attention.extra}
        />

        <QuickActions />
      </div>
    </div>
  );
}
