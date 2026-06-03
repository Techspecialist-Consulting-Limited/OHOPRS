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
  const agency = await prisma.agency.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          interventions: true,
          users: true,
          programmes: true,
        },
      },
      interventions: {
        include: {
          _count: { select: { enrollments: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!agency) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(agency);
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
  const agency = await prisma.agency.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(agency);
}
