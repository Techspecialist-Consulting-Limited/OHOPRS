"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function BeneficiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: beneficiary, isLoading } = useQuery({
    queryKey: ["beneficiary", id],
    queryFn: async () => {
      const res = await fetch(`/api/beneficiaries/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading beneficiary...</p>
      </div>
    );
  }

  if (!beneficiary) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Beneficiary not found</p>
      </div>
    );
  }

  const b = beneficiary;
  const enrollments = b.enrollments ?? [];
  const agencies = new Set(
    enrollments.map(
      (e: { intervention: { agency: { shortCode: string } } }) =>
        e.intervention.agency.shortCode
    )
  );

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/beneficiaries")}
          className="mb-4 text-xs font-medium text-primary hover:text-primary-light"
        >
          ← Back to Beneficiaries
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {b.fullName}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              NIN: {b.nationalId}
            </p>
          </div>
          {b.povertyScore != null && (
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                b.povertyScore < 25
                  ? "bg-red-50 text-red-700"
                  : b.povertyScore < 50
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-accent text-primary"
              }`}
            >
              Score: {b.povertyScore}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Personal Information
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">Gender</dt>
              <dd className="font-medium text-foreground">
                {b.gender ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">Date of Birth</dt>
              <dd className="font-medium text-foreground">
                {b.dateOfBirth ? formatDate(b.dateOfBirth) : "—"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium text-foreground">
                {b.phoneNumber ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between pb-2.5">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium text-foreground">
                {b.email ?? "—"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Location &amp; Targeting
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">State</dt>
              <dd className="font-medium text-foreground">{b.state}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">LGA</dt>
              <dd className="font-medium text-foreground">
                {b.lga ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2.5">
              <dt className="text-muted-foreground">Address</dt>
              <dd className="font-medium text-foreground">
                {b.address ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between pb-2.5">
              <dt className="text-muted-foreground">Poverty Score</dt>
              <dd className="font-medium text-foreground">
                {b.povertyScore != null ? b.povertyScore : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Intervention History ({enrollments.length})
            </h3>
            {agencies.size > 0 && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Across {agencies.size} agenc{agencies.size === 1 ? "y" : "ies"}:{" "}
                {Array.from(agencies).join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Intervention
                </th>
                <th className="px-6 py-3.5 font-semibold text-muted-foreground">
                  Agency
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
              {enrollments.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    Not enrolled in any interventions yet
                  </td>
                </tr>
              ) : (
                enrollments.map(
                  (e: {
                    id: string;
                    status: string;
                    enrolledAt: string;
                    intervention: {
                      id: string;
                      name: string;
                      agency: { name: string; shortCode: string };
                    };
                  }) => (
                    <tr
                      key={e.id}
                      className="cursor-pointer border-b border-border transition-colors hover:bg-muted/30"
                      onClick={() =>
                        router.push(`/interventions/${e.intervention.id}`)
                      }
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {e.intervention.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {e.intervention.agency.shortCode} —{" "}
                        {e.intervention.agency.name}
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
