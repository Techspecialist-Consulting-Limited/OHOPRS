"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-accent text-primary",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function ProgrammeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: programme, isLoading } = useQuery({
    queryKey: ["programme", id],
    queryFn: async () => {
      const res = await fetch(`/api/programmes/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading programme...</p>
      </div>
    );
  }

  if (!programme) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Programme not found</p>
      </div>
    );
  }

  const interventions = programme.interventions ?? [];

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/programmes")}
          className="mb-4 text-sm text-primary hover:text-primary-light"
        >
          ← Back to Programmes
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {programme.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              <button
                onClick={() => router.push(`/agency/${programme.agency.id}`)}
                className="font-medium text-primary hover:text-primary-light"
              >
                {programme.agency.name} ({programme.agency.shortCode})
              </button>
            </p>
          </div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium capitalize ${
              STATUS_STYLES[programme.status] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            {programme.status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Budget</dt>
              <dd className="font-medium text-slate-900">
                {programme.budget ? formatCurrency(programme.budget) : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Period</dt>
              <dd className="font-medium text-slate-900">
                {programme.startDate ? formatDate(programme.startDate) : "—"}
                {" → "}
                {programme.endDate ? formatDate(programme.endDate) : "Ongoing"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Interventions</dt>
              <dd className="font-medium text-slate-900">
                {programme._count?.interventions ?? interventions.length}
              </dd>
            </div>
          </dl>
        </div>

        {programme.description && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Description</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {programme.description}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Interventions ({interventions.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-6 py-3 font-medium text-slate-500">Name</th>
                <th className="px-6 py-3 font-medium text-slate-500">Type</th>
                <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                <th className="px-6 py-3 font-medium text-slate-500">Budget</th>
                <th className="px-6 py-3 font-medium text-slate-500">Location</th>
              </tr>
            </thead>
            <tbody>
              {interventions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No interventions in this programme
                  </td>
                </tr>
              ) : (
                interventions.map(
                  (inv: {
                    id: string;
                    name: string;
                    type: string;
                    status: string;
                    budget: number | null;
                    location: string | null;
                  }) => (
                    <tr
                      key={inv.id}
                      className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
                      onClick={() => router.push(`/interventions/${inv.id}`)}
                    >
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {inv.name}
                      </td>
                      <td className="px-6 py-3 capitalize text-slate-600">
                        {inv.type.replace(/_/g, " ")}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                            inv.status === "active"
                              ? "bg-accent text-primary"
                              : inv.status === "completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : inv.status === "draft"
                              ? "bg-muted text-muted-foreground"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-900">
                        {inv.budget ? formatCurrency(inv.budget) : "—"}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {inv.location ?? "—"}
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
