import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const where: Record<string, unknown> = {};
  if (session.user.role !== "minister" && session.user.role !== "executive" && session.user.agencyId) {
    where.agencyId = session.user.agencyId;
  }

  const programmes = await prisma.programme.findMany({
    where,
    include: {
      agency: { select: { id: true, name: true, shortCode: true } },
      _count: { select: { interventions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(programmes);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const isAgencyUser = session.user.role !== "minister" && session.user.role !== "executive";

  const programme = await prisma.programme.create({
    data: {
      name: body.name,
      description: body.description,
      budget: body.budget ? parseFloat(body.budget) : null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      status: body.status ?? "active",
      agencyId: isAgencyUser ? (session.user.agencyId ?? body.agencyId) : body.agencyId,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "create",
      entity: "programme",
      entityId: programme.id,
      details: { name: programme.name, agencyId: programme.agencyId },
    },
  });

  return NextResponse.json(programme, { status: 201 });
}
