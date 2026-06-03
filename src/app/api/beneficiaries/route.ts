import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const nationalId = searchParams.get("nationalId");
  const interventionId = searchParams.get("interventionId");

  const where: Record<string, unknown> = {};

  if (state) where.state = state;
  if (nationalId) where.nationalId = nationalId;
  if (interventionId) {
    where.enrollments = { some: { interventionId } };
  }

  const beneficiaries = await prisma.beneficiary.findMany({
    where,
    include: {
      _count: { select: { enrollments: true } },
      enrollments: {
        include: {
          intervention: {
            select: { id: true, name: true, type: true, agency: { select: { name: true, shortCode: true } } },
          },
        },
        orderBy: { enrolledAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(beneficiaries);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Dedup check
  if (body.nationalId) {
    const existing = await prisma.beneficiary.findUnique({
      where: { nationalId: body.nationalId },
      include: {
        enrollments: {
          include: {
            intervention: { select: { name: true, agency: { select: { name: true } } } },
          },
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          duplicate: true,
          message: "Beneficiary with this National ID already exists",
          existing: existing,
        },
        { status: 409 }
      );
    }
  }

  const beneficiary = await prisma.beneficiary.create({
    data: {
      nationalId: body.nationalId,
      fullName: body.fullName,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
      gender: body.gender,
      phoneNumber: body.phoneNumber,
      email: body.email,
      state: body.state,
      lga: body.lga,
      address: body.address,
      povertyScore: body.povertyScore ? parseFloat(body.povertyScore) : null,
      notes: body.notes,
    },
  });

  // Enroll in intervention if provided
  if (body.interventionId) {
    await prisma.enrollment.create({
      data: {
        beneficiaryId: beneficiary.id,
        interventionId: body.interventionId,
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "create",
      entity: "beneficiary",
      entityId: beneficiary.id,
      details: { fullName: beneficiary.fullName, nationalId: beneficiary.nationalId, interventionId: body.interventionId ?? null },
    },
  });

  return NextResponse.json(beneficiary, { status: 201 });
}
