import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agencies = await prisma.agency.findMany({
    include: {
      _count: {
        select: {
          interventions: true,
          users: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(agencies);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !["minister", "executive"].includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const agency = await prisma.agency.create({
    data: {
      name: body.name,
      shortCode: body.shortCode,
      type: body.type,
      contactEmail: body.contactEmail,
      description: body.description,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "create",
      entity: "agency",
      entityId: agency.id,
      details: { name: agency.name, shortCode: agency.shortCode },
    },
  });

  return NextResponse.json(agency, { status: 201 });
}
