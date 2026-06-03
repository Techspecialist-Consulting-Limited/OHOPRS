import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Scope check: non-ministry users can only see their own agency
  if (session.user.role !== "minister" && session.user.role !== "executive") {
    if (session.user.agencyId !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const agency = await prisma.agency.findUnique({ where: { id } });
  if (!agency) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [
    totalInterventions,
    activeInterventions,
    budgetAgg,
    enrollmentData,
    typeBreakdown,
    statusBreakdown,
  ] = await Promise.all([
    prisma.intervention.count({ where: { agencyId: id } }),
    prisma.intervention.count({ where: { agencyId: id, status: "active" } }),
    prisma.intervention.aggregate({ where: { agencyId: id }, _sum: { budget: true } }),
    prisma.enrollment.findMany({
      where: { intervention: { agencyId: id } },
      select: { status: true },
    }),
    prisma.intervention.groupBy({
      by: ["type"],
      where: { agencyId: id },
      _count: true,
    }),
    prisma.intervention.groupBy({
      by: ["status"],
      where: { agencyId: id },
      _count: true,
    }),
  ]);

  const enrolledCount = enrollmentData.filter((e) => e.status === "enrolled").length;
  const servedCount = enrollmentData.filter((e) => e.status === "served").length;

  // Get total unique beneficiaries for this agency
  const beneficiaryCount = await prisma.enrollment.groupBy({
    by: ["beneficiaryId"],
    where: { intervention: { agencyId: id } },
  });

  return NextResponse.json({
    agency,
    totalInterventions,
    activeInterventions,
    totalBudget: budgetAgg._sum.budget ?? 0,
    totalBeneficiaries: beneficiaryCount.length,
    enrolledCount,
    servedCount,
    typeBreakdown,
    statusBreakdown,
  });
}
