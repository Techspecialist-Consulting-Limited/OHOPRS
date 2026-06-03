import { NextResponse } from "next/server";

export async function GET() {
  const info: Record<string, unknown> = {};

  try {
    info.env = {
      databaseUrl: (process.env.DATABASE_URL ?? "").substring(0, 50) + "...",
      nextauthUrl: process.env.NEXTAUTH_URL ?? "not set",
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
    };
  } catch {
    info.env = { error: "could not read env" };
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      select: { email: true, role: true, isActive: true },
    });
    info.status = "ok";
    info.userCount = userCount;
    info.users = users;
  } catch (error) {
    info.status = "error";
    info.message = String(error);
  }

  return NextResponse.json(info);
}
