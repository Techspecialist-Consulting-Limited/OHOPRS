import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const agencyCount = await prisma.agency.count();
    const users = await prisma.user.findMany({
      select: { email: true, role: true, isActive: true },
    });
    return NextResponse.json({
      status: "ok",
      userCount,
      agencyCount,
      users,
      env: {
        databaseUrl: (process.env.DATABASE_URL ?? "").substring(0, 40) + "...",
        nextauthUrl: process.env.NEXTAUTH_URL ?? "not set",
        hasSecret: !!process.env.NEXTAUTH_SECRET,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: String(error),
      env: {
        databaseUrl: (process.env.DATABASE_URL ?? "").substring(0, 40) + "...",
        nextauthUrl: process.env.NEXTAUTH_URL ?? "not set",
        hasSecret: !!process.env.NEXTAUTH_SECRET,
      },
    }, { status: 500 });
  }
}
