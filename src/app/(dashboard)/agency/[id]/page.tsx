"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
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
} from "recharts";

const TYPE_LABELS: Record<string, string> = {
  cash_transfer: "Cash Transfer",
  food_distribution: "Food Dist.",
  shelter: "Shelter",
  medical: "Medical",
  education: "Education",
  livelihood: "Livelihood",
};

export default function AgencyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agencyId = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "agency", agencyId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/agency/${agencyId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading agency details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Agency not found</p>
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
        <button
          onClick={() => router.push("/national")}
          className="mb-4 text-xs font-medium text-primary hover:text-primary-light"
        >
          ← Back to National Dashboard
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {data.agency.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.agency.shortCode} ·{" "}
              {data.agency.type
                ?.replace("_", " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase())}
              {data.agency.contactEmail && ` · ${data.agency.contactEmail}`}
            </p>
          </div>
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            {data.agency.state}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Interventions"
          value={data.totalInterviews ?? data.totalInterventions}
          icon="🎯"
        />
        <StatsCard
          title="Active Interventions"
          value={data.activeInterventions}
          icon="📊"
        />
        <StatsCard
          title="Total Budget"
          value={formatCurrency(data.totalBudget)}
          icon="💰"
        />
        <StatsCard
          title="Beneficiaries"
          value={data.totalBeneficiaries}
          icon="👥"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Enrolled
          </p>
          <p className="mt-1.5 text-2xl font-bold text-primary">
            {data.enrolledCount}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Served
          </p>
          <p className="mt-1.5 text-2xl font-bold text-primary">
            {data.servedCount}
          </p>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-primary/30 bg-accent/50 p-6 shadow-sm transition-colors hover:bg-accent"
          onClick={() => router.push(`/interventions?agencyId=${agencyId}`)}
        >
          <p className="text-sm font-semibold text-primary">
            View All Interventions →
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.totalInterventions} total · {data.activeInterventions} active
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

      {data.agency.description && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-foreground">About</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {data.agency.description}
          </p>
        </div>
      )}
    </div>
  );
}
