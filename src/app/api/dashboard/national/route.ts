import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalBeneficiaries,
    totalInterventions,
    activeInterventions,
    totalAgencies,
    budgetAgg,
    enrollmentCounts,
  ] = await Promise.all([
    prisma.beneficiary.count(),
    prisma.intervention.count(),
    prisma.intervention.count({ where: { status: "active" } }),
    prisma.agency.count({ where: { state: "active" } }),
    prisma.intervention.aggregate({ _sum: { budget: true } }),
    prisma.enrollment.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  // Unique beneficiaries across all interventions
  // (deduped via beneficiary national ID — all beneficiaries are unique by nationalId constraint)
  const uniqueBeneficiaries = totalBeneficiaries;

  // Agency breakdown
  const agencies = await prisma.agency.findMany({
    select: {
      id: true,
      name: true,
      shortCode: true,
      _count: { select: { interventions: true } },
    },
  });

  const agencyInterventionCounts: Record<string, number> = {};
  for (const agency of agencies) {
    const count = await prisma.enrollment.count({
      where: { intervention: { agencyId: agency.id } },
    });
    agencyInterventionCounts[agency.id] = count;
  }

  const agencyStats = agencies.map((a) => ({
    id: a.id,
    name: a.name,
    shortCode: a.shortCode,
    interventionCount: a._count.interventions,
    beneficiaryCount: agencyInterventionCounts[a.id] ?? 0,
  }));

  // Interventions by type
  const typeBreakdown = await prisma.intervention.groupBy({
    by: ["type"],
    _count: true,
    _sum: { budget: true },
  });

  // Interventions by status
  const statusBreakdown = await prisma.intervention.groupBy({
    by: ["status"],
    _count: true,
  });

  const enrolledCount = enrollmentCounts.find((e) => e.status === "enrolled")?._count ?? 0;
  const servedCount = enrollmentCounts.find((e) => e.status === "served")?._count ?? 0;

  // Duplication alerts: beneficiaries enrolled in more than one intervention
  const duplicates = await prisma.enrollment.groupBy({
    by: ["beneficiaryId"],
    _count: true,
    having: { beneficiaryId: { _count: { gt: 1 } } },
  });

  return NextResponse.json({
    totalBeneficiaries,
    uniqueBeneficiaries,
    totalInterventions,
    activeInterventions,
    totalAgencies,
    totalBudget: budgetAgg._sum.budget ?? 0,
    enrolledCount,
    servedCount,
    duplicationAlerts: duplicates.length,
    agencyStats,
    typeBreakdown,
    statusBreakdown,
  });
}
