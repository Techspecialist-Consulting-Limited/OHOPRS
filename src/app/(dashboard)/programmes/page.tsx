"use client";

import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Programme {
  id: string;
  name: string;
  description: string | null;
  budget: number | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  agency: { name: string; shortCode: string };
  _count: { interventions: number };
}

export default function ProgrammesPage() {
  const router = useRouter();

  const { data: programmes, isLoading } = useQuery({
    queryKey: ["programmes"],
    queryFn: async () => {
      const res = await fetch("/api/programmes");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Programmes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Thematic groupings of related interventions
          </p>
        </div>
        <button
          onClick={() => router.push("/programmes/new")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-light"
        >
          + New Programme
        </button>
      </div>

      {isLoading ? (
        <p className="py-10 text-center text-slate-500">Loading...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(programmes ?? []).length === 0 ? (
            <p className="col-span-full py-10 text-center text-slate-500">
              No programmes found
            </p>
          ) : (
            (programmes ?? []).map((p: Programme) => (
              <div
                key={p.id}
                className="cursor-pointer rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary-light"
                onClick={() => router.push(`/programmes/${p.id}`)}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-primary">
                    {p.agency.shortCode}
                  </span>
                  <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 capitalize">
                    {p.status}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                {p.description && (
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {p.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    {formatCurrency(p.budget ?? 0)}
                  </span>
                  <span className="text-slate-500">
                    {p._count.interventions} interventions
                  </span>
                </div>
                {p.startDate && (
                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(p.startDate)} —{" "}
                    {p.endDate ? formatDate(p.endDate) : "Ongoing"}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
