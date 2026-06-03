import Link from "next/link";
import { Logo } from "@/components/logo";

export function PublicFooter() {
  return (
    <footer className="bg-emerald-950 text-emerald-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-emerald-300/70">
              One Humanitarian &amp; Poverty Response System — a unified national
              platform for coordinating humanitarian interventions across all
              agencies, states, and communities.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Programmes", href: "/our-programmes" },
                { label: "Contact", href: "/contact" },
                { label: "Sign In", href: "/login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-300/60 transition-colors hover:text-emerald-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Our Agencies
            </h4>
            <ul className="space-y-2">
              {[
                { shortCode: "NCTO", name: "National Commission for the Targeting of the Poor" },
                { shortCode: "GEEP", name: "Government Enterprise and Empowerment Programme" },
                { shortCode: "NEMA", name: "National Emergency Management Agency" },
                { shortCode: "NRCS", name: "Nigerian Red Cross Society" },
              ].map((a) => (
                <li key={a.shortCode}>
                  <span className="text-sm text-emerald-300/60">
                    <span className="font-medium text-emerald-300/80">{a.shortCode}</span>
                    {" — "}{a.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-emerald-300/60">
              <li>Federal Secretariat, Abuja</li>
              <li>
                <a href="mailto:info@ohoprs.gov.ng" className="hover:text-emerald-200">
                  info@ohoprs.gov.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="hover:text-emerald-200">
                  +234 800 000 0000
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800/50 text-emerald-300/60 transition-colors hover:bg-emerald-700 hover:text-white"
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-800/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-xs text-emerald-300/40 sm:flex-row">
          <p>© 2026 OHOPRS — One Humanitarian &amp; Poverty Response System</p>
          <p>Prototype for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
}
