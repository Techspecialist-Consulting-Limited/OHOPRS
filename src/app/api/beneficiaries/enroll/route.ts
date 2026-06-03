import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { beneficiaryId, interventionId } = body;

  if (!beneficiaryId || !interventionId) {
    return NextResponse.json(
      { error: "beneficiaryId and interventionId are required" },
      { status: 400 }
    );
  }

  // Check if already enrolled
  const existing = await prisma.enrollment.findUnique({
    where: {
      beneficiaryId_interventionId: { beneficiaryId, interventionId },
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Beneficiary is already enrolled in this intervention" },
      { status: 409 }
    );
  }

  const enrollment = await prisma.enrollment.create({
    data: { beneficiaryId, interventionId },
    include: {
      beneficiary: true,
      intervention: { include: { agency: { select: { name: true, shortCode: true } } } },
    },
  });

  return NextResponse.json(enrollment, { status: 201 });
}
