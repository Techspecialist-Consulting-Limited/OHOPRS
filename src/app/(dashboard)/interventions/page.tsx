"use client";

import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate, generateCsv, downloadCsv } from "@/lib/utils";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

interface Intervention {
  id: string;
  name: string;
  type: string;
  status: string;
  budget: number | null;
  location: string | null;
  targetBeneficiaries: number | null;
  enrolledCount: number;
  servedCount: number;
  startDate: string | null;
  endDate: string | null;
  agency: { id: string; name: string; shortCode: string };
  programme: { id: string; name: string } | null;
}

export default function InterventionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAgencyId = searchParams.get("agencyId") ?? "";

  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [agencyFilter, setAgencyFilter] = useState(initialAgencyId);

  const { data: agencies } = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      const res = await fetch("/api/agencies");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: interventions, isLoading } = useQuery({
    queryKey: ["interventions", statusFilter, typeFilter, agencyFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      if (agencyFilter) params.set("agencyId", agencyFilter);
      const res = await fetch(`/api/interventions?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const hasFilters = statusFilter || typeFilter || agencyFilter;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interventions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage all aid interventions across agencies
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!interventions) return;
              const cols = [
                { key: "name", label: "Name" },
                { key: "agencyName", label: "Agency" },
                { key: "type", label: "Type" },
                { key: "status", label: "Status" },
                { key: "budget", label: "Budget" },
                { key: "location", label: "Location" },
                { key: "targetBeneficiaries", label: "Target" },
                { key: "enrolledCount", label: "Enrolled" },
                { key: "servedCount", label: "Served" },
              ];
              const data = (interventions ?? []).map((inv: Record<string, unknown>) => ({
                ...inv,
                agencyName: (inv as { agency: { name: string } }).agency?.name ?? "",
              }));
              const csv = generateCsv(data, cols);
              downloadCsv(csv, "interventions.csv");
            }}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Export CSV
          </button>
          <button
            onClick={() => router.push("/interventions/new")}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
          >
            + New Intervention
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
        >
          <option value="">All Types</option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
        >
          <option value="">All Agencies</option>
          {(agencies ?? []).map(
            (a: { id: string; name: string; shortCode: string }) => (
              <option key={a.id} value={a.id}>
                {a.shortCode} — {a.name}
              </option>
            )
          )}
        </select>
        {hasFilters && (
          <button
            onClick={() => {
              setStatusFilter("");
              setTypeFilter("");
              setAgencyFilter("");
              router.push("/interventions");
            }}
            className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            Clear Filters
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-muted-foreground">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Agency
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Type
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Budget
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Progress
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Location
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Period
                </th>
              </tr>
            </thead>
            <tbody>
              {(interventions ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-muted-foreground"
                  >
                    No interventions found
                  </td>
                </tr>
              ) : (
                (interventions ?? []).map((inv: Intervention) => (
                  <tr
                    key={inv.id}
                    className="cursor-pointer border-b border-border transition-colors hover:bg-muted/30"
                    onClick={() => router.push(`/interventions/${inv.id}`)}
                  >
                    <td className="px-5 py-4 font-medium text-foreground">
                      {inv.name}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/agency/${inv.agency.id}`);
                        }}
                        className="font-medium text-primary hover:text-primary-light"
                      >
                        {inv.agency.shortCode}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {TYPE_LABELS[inv.type] ?? inv.type}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          STATUS_STYLES[inv.status] ?? ""
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-foreground">
                      {inv.budget ? formatCurrency(inv.budget) : "—"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {inv.servedCount}/{inv.targetBeneficiaries ?? "?"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {inv.location ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {inv.startDate ? formatDate(inv.startDate) : "—"}
                      {inv.endDate ? ` → ${formatDate(inv.endDate)}` : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
