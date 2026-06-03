"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/dashboard/stats-card";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  draft: "#9ca89c",
  active: "#2d6a4f",
  completed: "#1a3e2a",
  cancelled: "#dc2626",
};

const TYPE_LABELS: Record<string, string> = {
  cash_transfer: "Cash Transfer",
  food_distribution: "Food Dist.",
  shelter: "Shelter",
  medical: "Medical",
  education: "Education",
  livelihood: "Livelihood",
};

export default function NationalDashboardPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "national"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/national");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-muted-foreground">Loading national dashboard...</p>
      </div>
    );
  }

  const typeData = (data?.typeBreakdown ?? []).map(
    (t: { type: string; _count: number }) => ({
      name: TYPE_LABELS[t.type] ?? t.type,
      count: t._count,
    })
  );

  const statusData = (data?.statusBreakdown ?? []).map(
    (s: { status: string; _count: number }) => ({
      name: s.status.charAt(0).toUpperCase() + s.status.slice(1),
      value: s._count,
      color: STATUS_COLORS[s.status] ?? "#9ca89c",
    })
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            National Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggregate overview of all humanitarian interventions across agencies
          </p>
        </div>
        <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Last updated: Today
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Beneficiaries"
          value={data?.uniqueBeneficiaries ?? 0}
          description="Unduplicated individuals"
          icon="👥"
        />
        <StatsCard
          title="Active Interventions"
          value={data?.activeInterventions ?? 0}
          description={`of ${data?.totalInterventions ?? 0} total`}
          icon="🎯"
        />
        <StatsCard
          title="Total Budget"
          value={formatCurrency(data?.totalBudget ?? 0)}
          description="Across all agencies"
          icon="💰"
        />
        <StatsCard
          title="Duplication Alerts"
          value={data?.duplicationAlerts ?? 0}
          description="Beneficiaries in 2+ interventions"
          icon="⚠️"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-5 text-sm font-semibold text-foreground">
            Interventions by Type
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4dcd4" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#5a6b5a" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#5a6b5a" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-5 text-sm font-semibold text-foreground">
            Interventions by Status
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map(
                  (entry: { name: string; value: number; color: string }, i: number) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Agency Breakdown
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Click any agency to view its full dashboard
            </p>
          </div>
          <button
            onClick={() => router.push("/agencies/new")}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-light"
          >
            + New Agency
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Agency
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Code
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Interventions
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Beneficiaries
                </th>
                <th className="px-6 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {(data?.agencyStats ?? []).map(
                (a: {
                  id: string;
                  name: string;
                  shortCode: string;
                  interventionCount: number;
                  beneficiaryCount: number;
                }) => (
                  <tr
                    key={a.id}
                    className="cursor-pointer border-b border-border transition-colors hover:bg-muted/30"
                    onClick={() => router.push(`/agency/${a.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {a.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground">
                      {a.shortCode}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-primary">
                        {a.interventionCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {a.beneficiaryCount}
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium text-primary">
                      View →
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
