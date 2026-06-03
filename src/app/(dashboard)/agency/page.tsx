"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TYPE_LABELS: Record<string, string> = {
  cash_transfer: "Cash Transfer",
  food_distribution: "Food Dist.",
  shelter: "Shelter",
  medical: "Medical",
  education: "Education",
  livelihood: "Livelihood",
};

export default function AgencyDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const agencyId = session?.user?.agencyId;
  const isMinistry =
    session?.user?.role === "minister" ||
    session?.user?.role === "executive" ||
    session?.user?.role === "view_only";

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "agency", agencyId],
    queryFn: async () => {
      if (!agencyId) return null;
      const res = await fetch(`/api/dashboard/agency/${agencyId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!agencyId,
  });

  if (isMinistry || !agencyId) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="text-4xl">📋</span>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Agency Dashboard
        </h2>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          This view is for agency-level users. As a Ministry user, go to the
          National Dashboard and click any agency to see its details.
        </p>
        <button
          onClick={() => router.push("/national")}
          className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
        >
          Go to National Dashboard
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading agency dashboard...</p>
      </div>
    );
  }

  const typeData = (data?.typeBreakdown ?? []).map(
    (t: { type: string; _count: number }) => ({
      name: TYPE_LABELS[t.type] ?? t.type,
      count: t._count,
    })
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {data?.agency?.name ?? "Agency"} Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data?.agency?.shortCode} ·{" "}
          {data?.agency?.type?.replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Interventions"
          value={data?.totalInterventions ?? 0}
          icon="🎯"
        />
        <StatsCard
          title="Active"
          value={data?.activeInterventions ?? 0}
          icon="📊"
        />
        <StatsCard
          title="Total Budget"
          value={formatCurrency(data?.totalBudget ?? 0)}
          icon="💰"
        />
        <StatsCard
          title="Beneficiaries"
          value={data?.totalBeneficiaries ?? 0}
          icon="👥"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Enrolled
          </p>
          <p className="mt-1.5 text-2xl font-bold text-primary">
            {data?.enrolledCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Served
          </p>
          <p className="mt-1.5 text-2xl font-bold text-primary">
            {data?.servedCount ?? 0}
          </p>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-primary/30 bg-accent/50 p-6 shadow-sm transition-colors hover:bg-accent"
          onClick={() => router.push("/interventions")}
        >
          <p className="text-sm font-semibold text-primary">
            Manage All Interventions →
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {data?.totalInterventions} total · {data?.activeInterventions} active
          </p>
        </div>
      </div>

      {typeData.length > 0 && (
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
      )}
    </div>
  );
}
