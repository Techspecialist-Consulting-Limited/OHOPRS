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
  const programme = await prisma.programme.findUnique({
    where: { id },
    include: {
      agency: { select: { id: true, name: true, shortCode: true } },
      _count: { select: { interventions: true } },
      interventions: {
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          budget: true,
          location: true,
        },
      },
    },
  });

  if (!programme) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(programme);
}
