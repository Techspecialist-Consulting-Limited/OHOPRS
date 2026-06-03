"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const mainNav: { label: string; href: string; roles: string[]; icon: string }[] = [
  {
    label: "National Dashboard",
    href: "/national",
    roles: ["minister", "executive", "view_only"],
    icon: "🏛",
  },
  {
    label: "Agency Dashboard",
    href: "/agency",
    roles: ["agency_admin", "operations", "partner"],
    icon: "📋",
  },
  {
    label: "Interventions",
    href: "/interventions",
    roles: ["minister", "executive", "agency_admin", "operations", "partner", "view_only"],
    icon: "🎯",
  },
  {
    label: "Beneficiaries",
    href: "/beneficiaries",
    roles: ["minister", "executive", "agency_admin", "operations", "partner", "view_only"],
    icon: "👥",
  },
  {
    label: "Programmes",
    href: "/programmes",
    roles: ["minister", "executive", "agency_admin", "operations", "partner", "view_only"],
    icon: "📁",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (!userRole) return null;

  const visibleNav = mainNav.filter((item) => item.roles.includes(userRole));
  const isMinistry = userRole === "minister" || userRole === "executive";

  function isActive(href: string) {
    if (href === "/agency") {
      return pathname === "/agency" || pathname.startsWith("/agency/");
    }
    return pathname.startsWith(href);
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-muted/30">
      <div className="flex h-16 items-center border-b border-sidebar-muted px-4">
        <Logo variant="light" showTagline={false} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
          Main Menu
        </p>
        <ul className="space-y-0.5">
          {visibleNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-emerald-700/60 text-white"
                    : "text-emerald-200 hover:bg-sidebar-muted/50 hover:text-white"
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {isMinistry && (
          <div className="mt-6 border-t border-sidebar-muted/50 pt-5">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              Admin
            </p>
            <Link
              href="/agencies/new"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/agencies/new"
                  ? "bg-emerald-700/60 text-white"
                  : "text-emerald-200 hover:bg-sidebar-muted/50 hover:text-white"
              )}
            >
              <span>➕</span>
              Create Agency
            </Link>
            <Link
              href="/audit-logs"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/audit-logs"
                  ? "bg-emerald-700/60 text-white"
                  : "text-emerald-200 hover:bg-sidebar-muted/50 hover:text-white"
              )}
            >
              <span>📋</span>
              Audit Logs
            </Link>
          </div>
        )}
      </nav>

      <div className="border-t border-sidebar-muted/50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
            {session?.user?.name?.charAt(0) ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {session?.user?.name}
            </p>
            <p className="truncate text-xs text-emerald-300">
              {session?.user?.role?.replace("_", " ")}
              {session?.user?.agencyShortCode
                ? ` · ${session.user.agencyShortCode}`
                : ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-emerald-300 transition-colors hover:bg-sidebar-muted/50 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
