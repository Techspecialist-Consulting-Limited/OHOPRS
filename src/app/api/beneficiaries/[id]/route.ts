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
  const beneficiary = await prisma.beneficiary.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          intervention: {
            include: {
              agency: { select: { id: true, name: true, shortCode: true } },
            },
          },
        },
        orderBy: { enrolledAt: "desc" },
      },
    },
  });

  if (!beneficiary) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(beneficiary);
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
  const beneficiary = await prisma.beneficiary.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(beneficiary);
}
