import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const validTransitions: Record<string, string[]> = {
  draft: ["active", "cancelled"],
  active: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

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
  const { status: newStatus } = body;

  if (!newStatus) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  const intervention = await prisma.intervention.findUnique({ where: { id } });
  if (!intervention) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed = validTransitions[intervention.status];
  if (!allowed?.includes(newStatus)) {
    return NextResponse.json(
      { error: `Cannot transition from ${intervention.status} to ${newStatus}` },
      { status: 400 }
    );
  }

  const updated = await prisma.intervention.update({
    where: { id },
    data: { status: newStatus },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "status_change",
      entity: "intervention",
      entityId: id,
      details: { from: intervention.status, to: newStatus },
    },
  });

  return NextResponse.json(updated);
}
