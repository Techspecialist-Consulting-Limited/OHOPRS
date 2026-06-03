import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const agencyId = searchParams.get("agencyId");
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  const where: Record<string, unknown> = {};

  const isAgencyUser = session.user.role !== "minister" && session.user.role !== "executive";
  if (isAgencyUser && session.user.agencyId) {
    where.agencyId = session.user.agencyId;
  } else if (agencyId) {
    where.agencyId = agencyId;
  }

  if (status) where.status = status;
  if (type) where.type = type;

  const interventions = await prisma.intervention.findMany({
    where,
    include: {
      agency: { select: { id: true, name: true, shortCode: true } },
      programme: { select: { id: true, name: true } },
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Add enrollment breakdown per status
  const result = await Promise.all(
    interventions.map(async (intervention) => {
      const enrolled = await prisma.enrollment.count({
        where: { interventionId: intervention.id, status: "enrolled" },
      });
      const served = await prisma.enrollment.count({
        where: { interventionId: intervention.id, status: "served" },
      });
      return { ...intervention, enrolledCount: enrolled, servedCount: served };
    })
  );

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAgencyUser = session.user.role !== "minister" && session.user.role !== "executive";
  const body = await request.json();

  if (!isAgencyUser && !body.agencyId) {
    return NextResponse.json({ error: "agencyId is required" }, { status: 400 });
  }

  const intervention = await prisma.intervention.create({
    data: {
      name: body.name,
      type: body.type,
      status: body.status ?? "draft",
      budget: body.budget ? parseFloat(body.budget) : null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      location: body.location,
      targetBeneficiaries: body.targetBeneficiaries ? parseInt(body.targetBeneficiaries) : null,
      description: body.description,
      agencyId: isAgencyUser ? (session.user.agencyId ?? body.agencyId) : body.agencyId,
      programmeId: body.programmeId ?? null,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "create",
      entity: "intervention",
      entityId: intervention.id,
      details: { name: intervention.name, type: intervention.type, agencyId: intervention.agencyId },
    },
  });

  return NextResponse.json(intervention, { status: 201 });
}
