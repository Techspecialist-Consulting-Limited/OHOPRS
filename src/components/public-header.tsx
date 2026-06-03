"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { cn } from "@/lib/utils";

const agencies = [
  { shortCode: "NCTO", name: "National Commission for the Targeting of the Poor" },
  { shortCode: "GEEP", name: "Government Enterprise and Empowerment Programme" },
  { shortCode: "NEMA", name: "National Emergency Management Agency" },
  { shortCode: "NRCS", name: "Nigerian Red Cross Society" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programmeOpen, setProgrammeOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/our-programmes", label: "Our Programmes" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-800/20 bg-emerald-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.label === "Our Programmes" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setProgrammeOpen(true)}
                onMouseLeave={() => setProgrammeOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-emerald-800 text-white"
                      : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white"
                  )}
                >
                  Programmes ▾
                </Link>
                {programmeOpen && (
                  <div className="absolute left-0 top-full mt-1 w-40 rounded-lg border border-emerald-700/30 bg-white shadow-lg">
                    {agencies.map((a) => (
                      <div
                        key={a.shortCode}
                        className="block px-3 py-2.5 text-sm font-medium text-foreground"
                      >
                        {a.shortCode}
                      </div>
                    ))}
                    <div className="border-t border-border px-3 py-2">
                      <Link
                        href="/our-programmes"
                        className="text-xs font-medium text-primary hover:text-primary-light"
                      >
                        View All Programmes →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-emerald-800 text-white"
                    : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/login"
            className="ml-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition-colors hover:bg-emerald-50"
          >
            Sign In
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-emerald-100 hover:bg-emerald-800/50 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-emerald-800/20 bg-emerald-900 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-800/50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-white px-3 py-2.5 text-center text-sm font-medium text-emerald-900"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
