"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  active: "bg-accent text-primary",
  completed: "bg-emerald-800/10 text-emerald-800",
  cancelled: "bg-red-50 text-red-700",
};

const TYPE_LABELS: Record<string, string> = {
  cash_transfer: "Cash Transfer",
  food_distribution: "Food Distribution",
  shelter: "Shelter",
  medical: "Medical",
  education: "Education",
  livelihood: "Livelihood",
};

const STATUS_ACTIONS: Record<
  string,
  { to: string; label: string; style: string }[]
> = {
  draft: [
    { to: "active", label: "Activate", style: "bg-primary hover:bg-primary-light" },
    { to: "cancelled", label: "Cancel", style: "bg-destructive hover:bg-red-700" },
  ],
  active: [
    { to: "completed", label: "Mark Complete", style: "bg-success hover:bg-emerald-700" },
    { to: "cancelled", label: "Cancel", style: "bg-destructive hover:bg-red-700" },
  ],
  completed: [],
  cancelled: [],
};

export default function InterventionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [transitioning, setTransitioning] = useState<string | null>(null);

  const { data: intervention, isLoading, refetch } = useQuery({
    queryKey: ["intervention", id],
    queryFn: async () => {
      const res = await fetch(`/api/interventions/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  async function transitionStatus(newStatus: string) {
    setTransitioning(newStatus);
    const res = await fetch(`/api/interventions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      await refetch();
    } else {
      const data = await res.json();
      alert(data.error ?? "Failed to update status");
    }
    setTransitioning(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading intervention...</p>
      </div>
    );
  }

  if (!intervention) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Intervention not found</p>
      </div>
    );
  }

  const actions = STATUS_ACTIONS[intervention.status] ?? [];
  const enrolled = intervention.enrollments ?? [];

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/interventions")}
          className="mb-4 text-xs font-medium text-primary hover:text-primary-light"
        >
          ← Back to Interventions
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {intervention.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <button
                onClick={() =>
                  router.push(`/agency/${intervention.agency.id}`)
                }
                className="font-medium text-primary hover:text-primary-light"
              >
                {intervention.agency.name} ({intervention.agency.shortCode})
              </button>
              {intervention.programme && (
                <>
                  {" "}
                  ·{" "}
                  <button
                    onClick={() =>
                      router.push(`/programmes/${intervention.programme.id}`)
                    }
                    className="font-medium text-primary hover:text-primary-light"
                  >
                    {intervention.programme.name}
                  </button>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {actions.map((action) => (
              <button
                key={action.to}
                onClick={() => transitionStatus(action.to)}
                disabled={transitioning === action.to}
                className={`rounded-lg px-4 py-2 text-xs font-medium text-white transition-colors disabled:opacity-50 ${action.style}`}
              >
                {transitioning === action.to ? "..." : action.label}
              </button>
            ))}
            <span
              className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                STATUS_STYLES[intervention.status] ?? ""
              }`}
            >
              {intervention.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">Type</dt>
              <dd className="font-medium text-foreground">
                {TYPE_LABELS[intervention.type] ?? intervention.type}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">Budget</dt>
              <dd className="font-medium text-foreground">
                {intervention.budget
                  ? formatCurrency(intervention.budget)
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-medium text-foreground">
                {intervention.location ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">Period</dt>
              <dd className="font-medium text-foreground">
                {intervention.startDate
                  ? formatDate(intervention.startDate)
                  : "—"}
                {" → "}
                {intervention.endDate
                  ? formatDate(intervention.endDate)
                  : "Ongoing"}
              </dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt className="text-muted-foreground">Target</dt>
              <dd className="font-medium text-foreground">
                {intervention.targetBeneficiaries ?? "—"} beneficiaries
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Progress
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-accent/50 p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {intervention.enrolledCount}
              </p>
              <p className="text-xs text-muted-foreground">Enrolled</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {intervention.servedCount}
              </p>
              <p className="text-xs text-muted-foreground">Served</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {intervention.targetBeneficiaries ?? "?"}
              </p>
              <p className="text-xs text-muted-foreground">Target</p>
            </div>
          </div>

          {actions.length > 0 && (
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Status Actions
              </p>
              <div className="flex gap-2">
                {actions.map((action) => (
                  <button
                    key={action.to}
                    onClick={() => transitionStatus(action.to)}
                    disabled={transitioning === action.to}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-50 ${action.style}`}
                  >
                    {transitioning === action.to ? "..." : action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={() =>
                router.push(
                  `/beneficiaries/new?interventionId=${intervention.id}`
                )
              }
              className="w-full rounded-lg border border-border px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              ➕ Enroll Beneficiary
            </button>
            <button
              onClick={() => router.push(`/programmes/new`)}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              📁 Link to Programme
            </button>
          </div>
        </div>
      </div>

      {intervention.description && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Description
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            {intervention.description}
          </p>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Enrolled Beneficiaries ({enrolled.length})
            </h3>
          </div>
          <button
            onClick={() =>
              router.push(
                `/beneficiaries/new?interventionId=${intervention.id}`
              )
            }
            className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-light"
          >
            + Enroll
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  National ID
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  State
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Enrolled
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolled.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No beneficiaries enrolled yet
                  </td>
                </tr>
              ) : (
                enrolled.map(
                  (e: {
                    id: string;
                    status: string;
                    enrolledAt: string;
                    beneficiary: {
                      id: string;
                      fullName: string;
                      nationalId: string;
                      state: string;
                    };
                  }) => (
                    <tr
                      key={e.id}
                      className="cursor-pointer border-b border-border transition-colors hover:bg-muted/30"
                      onClick={() =>
                        router.push(`/beneficiaries/${e.beneficiary.id}`)
                      }
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {e.beneficiary.fullName}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                        {e.beneficiary.nationalId}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {e.beneficiary.state}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                            e.status === "served"
                              ? "bg-emerald-50 text-emerald-800"
                              : e.status === "exited"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-accent text-primary"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {formatDate(e.enrolledAt)}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
