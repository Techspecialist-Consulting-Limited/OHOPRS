"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { formatDate, generateCsv, downloadCsv } from "@/lib/utils";
import { useState } from "react";

interface Beneficiary {
  id: string;
  nationalId: string;
  fullName: string;
  gender: string | null;
  phoneNumber: string | null;
  state: string;
  lga: string | null;
  povertyScore: number | null;
  createdAt: string;
  _count: { enrollments: number };
}

export default function BeneficiariesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: beneficiaries, isLoading } = useQuery({
    queryKey: ["beneficiaries", search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("nationalId", search);
      const res = await fetch(`/api/beneficiaries?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Beneficiaries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage registered beneficiaries across all agencies
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!beneficiaries) return;
              const cols = [
                { key: "fullName", label: "Full Name" },
                { key: "nationalId", label: "National ID" },
                { key: "gender", label: "Gender" },
                { key: "state", label: "State" },
                { key: "lga", label: "LGA" },
                { key: "povertyScore", label: "Poverty Score" },
                { key: "phoneNumber", label: "Phone" },
                { key: "enrollments", label: "Enrollments" },
              ];
              const data = (beneficiaries ?? []).map((b: Record<string, unknown>) => ({
                ...b,
                enrollments: (b as { _count: { enrollments: number } })._count?.enrollments ?? 0,
              }));
              const csv = generateCsv(data, cols);
              downloadCsv(csv, "beneficiaries.csv");
            }}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Export CSV
          </button>
          <button
            onClick={() => router.push("/beneficiaries/new")}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
          >
            + Register Beneficiary
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative max-w-sm flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by National ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
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
                  National ID
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Gender
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  State
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  LGA
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Score
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Enrollments
                </th>
                <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {(beneficiaries ?? []).length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-muted-foreground"
                  >
                    {search
                      ? "No beneficiary found with that National ID"
                      : "No beneficiaries registered yet"}
                  </td>
                </tr>
              ) : (
                (beneficiaries ?? []).map((b: Beneficiary) => (
                  <tr
                    key={b.id}
                    className="cursor-pointer border-b border-border transition-colors hover:bg-muted/30"
                    onClick={() => router.push(`/beneficiaries/${b.id}`)}
                  >
                    <td className="px-5 py-4 font-medium text-foreground">
                      {b.fullName}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      {b.nationalId}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {b.gender ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-foreground">{b.state}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {b.lga ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      {b.povertyScore != null ? (
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            b.povertyScore < 25
                              ? "bg-red-50 text-red-700"
                              : b.povertyScore < 50
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-accent text-primary"
                          }`}
                        >
                          {b.povertyScore}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-4 text-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-primary">
                        {b._count.enrollments}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {formatDate(b.createdAt)}
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
