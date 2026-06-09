import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <section className="relative h-64 overflow-hidden bg-emerald-900 sm:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url(https://admin.concern.org.uk/sites/default/files/styles/360x220/public/media/images/2025-04/concern-rs86981-sudan-hunger-response.jpg?changed=2025-04-14T11:52:55+00:00)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-4xl items-center px-6">
          <div>
            <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-sm">
              About Us
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              One Humanitarian–One Poverty Response System
            </h1>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The One Humanitarian–One Poverty Response System (OHOPRS) is Nigeria&apos;s
            central digital platform for coordinating and delivering extensive social
            protection interventions targeted at the country&apos;s poorest and most
            vulnerable populations. Our mission is to ensure every intervention reaches
            those who need it most, eliminating duplication and maximizing impact.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { title: "National Coordination", desc: "Unified platform for all humanitarian agencies to plan, execute, and monitor interventions across Nigeria." },
              { title: "Beneficiary Registry", desc: "Centralized database tracking beneficiaries by National ID, preventing duplication and ensuring comprehensive coverage." },
              { title: "Real-time Dashboards", desc: "Live KPIs, budget tracking, and geographic distribution for ministry-level oversight and data-driven decisions." },
              { title: "Audit & Compliance", desc: "Full audit trail of all actions, ensuring transparency and accountability across the entire system." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-foreground">Our Legal Framework</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            OHOPRS is a unified national coordination framework established by the
            Federal Ministry of Humanitarian Affairs and Poverty Reduction to integrate
            humanitarian response, social protection, and poverty reduction efforts
            across all agencies. It builds on the statutory agencies created under the
            National Social Investment Programme Agency (Establishment) Act &mdash;
            including NASSCO, NCTO, N-Power, and GEEP &mdash; unifying their operations
            under a single digital platform with a shared beneficiary register,
            coordinated financing, and real-time accountability.
          </p>
        </div>
      </section>

      <section className="bg-emerald-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold text-white">Ready to see the system in action?</h2>
          <p className="mt-2 text-emerald-200">
            Sign in with demo credentials to explore the national dashboard and see how we&apos;re transforming humanitarian response.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="https://ohoprs-core.vercel.app/login"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              Access Dashboard
            </Link>
            <Link
              href="/our-programmes"
              className="rounded-lg border border-emerald-400/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800/50"
            >
              Explore Programmes
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
