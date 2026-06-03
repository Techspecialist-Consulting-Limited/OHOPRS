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
  const intervention = await prisma.intervention.findUnique({
    where: { id },
    include: {
      agency: { select: { id: true, name: true, shortCode: true } },
      programme: { select: { id: true, name: true } },
      enrollments: {
        include: {
          beneficiary: true,
        },
        orderBy: { enrolledAt: "desc" },
      },
    },
  });

  if (!intervention) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const enrolledCount = intervention.enrollments.filter((e) => e.status === "enrolled").length;
  const servedCount = intervention.enrollments.filter((e) => e.status === "served").length;
  const exitedCount = intervention.enrollments.filter((e) => e.status === "exited").length;

  return NextResponse.json({
    ...intervention,
    enrolledCount,
    servedCount,
    exitedCount,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  if (body.name) updateData.name = body.name;
  if (body.type) updateData.type = body.type;
  if (body.status) updateData.status = body.status;
  if (body.budget) updateData.budget = parseFloat(body.budget);
  if (body.startDate) updateData.startDate = new Date(body.startDate);
  if (body.endDate) updateData.endDate = new Date(body.endDate);
  if (body.location) updateData.location = body.location;
  if (body.targetBeneficiaries) updateData.targetBeneficiaries = parseInt(body.targetBeneficiaries);
  if (body.description !== undefined) updateData.description = body.description;
  if (body.programmeId !== undefined) updateData.programmeId = body.programmeId;

  const intervention = await prisma.intervention.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(intervention);
}
