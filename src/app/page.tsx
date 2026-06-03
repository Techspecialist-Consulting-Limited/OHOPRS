"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { HeroCarousel } from "@/components/hero-carousel";

const stats = [
  { value: "6", label: "Active Interventions", desc: "Cash, food, shelter, medical, education, livelihood" },
  { value: "4", label: "Partner Agencies", desc: "Government & NGO partners" },
  { value: "₦1.3B", label: "Total Budget Deployed", desc: "Across all active interventions" },
  { value: "20+", label: "Beneficiaries Served", desc: "Tracked across all programmes" },
];

const programmes = [
  {
    shortCode: "NCTO",
    name: "National Commission for the Targeting of the Poor",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
    description: "Identifying and targeting poor households for social interventions. Delivering cash transfers to vulnerable populations to improve nutrition and human capital development.",
  },
  {
    shortCode: "GEEP",
    name: "Government Enterprise and Empowerment Programme",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    description: "Providing enterprise grants, loans, and empowerment support to micro-businesses and women entrepreneurs across all states.",
  },
  {
    shortCode: "NEMA",
    name: "National Emergency Management Agency",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    description: "Coordinating emergency response and disaster relief across the nation. Food distribution, temporary shelter, and medical assistance.",
  },
  {
    shortCode: "NRCS",
    name: "Nigerian Red Cross Society",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    description: "Humanitarian organization providing emergency assistance, disaster relief, and mobile health clinics to displaced populations.",
  },
];

const team = [
  { name: "Dr. Amina Bello", role: "National Coordinator", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
  { name: "Mr. Chidi Okonkwo", role: "Executive Director, Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Fatima Usman", role: "Programme Manager, NCTO", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
  { name: "Blessing Adeyemi", role: "Programme Manager, GEEP", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { name: "Ibrahim Musa", role: "Director, Emergency Response", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Sarah Okafor", role: "Head, Medical Outreach", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&q=80" },
];

const partners = [
  "World Bank", "UNDP", "UNICEF", "Nigerian Ministry of Finance",
  "National Planning Commission", "Nigerian Governors' Forum", "CSO Network", "Development Partners",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <HeroCarousel />

      <section className="border-b border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 font-medium text-foreground">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Why OHOPRS
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              A Unified National Response
            </h2>
            <div className="mt-6 space-y-4 text-left text-muted-foreground leading-relaxed">
              <p>
                The One Humanitarian &amp; Poverty Response System (OHOPRS) is Nigeria&apos;s
                central digital platform for coordinating and delivering extensive social
                protection interventions targeted at the country&apos;s poorest and most
                vulnerable populations.
              </p>
              <p>
                Built on a foundation of transparency, accountability, and real-time data,
                OHOPRS provides end-to-end visibility from the Minister&apos;s office to
                the field worker — ensuring every intervention reaches those who need it most.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: "🏛", title: "Executive Visibility", desc: "National dashboard with aggregate KPIs, duplication alerts, and cross-agency oversight." },
              { icon: "📋", title: "Agency Operations", desc: "Full CRUD for interventions, beneficiary enrollment with real-time dedup detection." },
              { icon: "👥", title: "Citizen Tracking", desc: "Every beneficiary tracked by National ID. See cross-agency history at a glance." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-white p-8 shadow-sm">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Programmes
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Explore Our Agencies
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Four specialized agencies working together under one coordinated national
              response system.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {programmes.map((p) => (
              <div key={p.shortCode} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="p-6">
                  <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-primary">
                    {p.shortCode}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <Link
                    href="/our-programmes"
                    className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-light"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/our-programmes"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
            >
              View All Programmes
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              From the Coordinator&apos;s Desk
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              Building a Resilient National Response System
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                The One Humanitarian &amp; Poverty Response System represents a new era
                of coordination and accountability in Nigeria&apos;s social protection
                landscape. By bringing together all agencies under a single digital
                platform, we can now track every intervention, every beneficiary, and
                every naira with unprecedented precision.
              </p>
              <p>
                Our mandate is clear: ensure that humanitarian interventions reach the
                poorest and most vulnerable Nigerians, eliminate duplication, and provide
                the data-driven insights needed to make informed policy decisions.
              </p>
              <p className="font-medium text-foreground">
                — Dr. Amina Bello, National Coordinator, OHOPRS
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Team
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Agency Officials
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div
                  className="mx-auto h-24 w-24 rounded-full bg-cover bg-center shadow-md"
                  style={{ backgroundImage: `url(${m.image})` }}
                />
                <h4 className="mt-4 font-semibold text-foreground">{m.name}</h4>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Gallery
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Highlights Across Nigeria
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
              "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
              "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80",
              "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80",
              "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80",
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80",
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
              "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80",
              "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=400&q=80",
            ].map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Partners
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              Partner Agencies &amp; Development Organizations
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            Stay Updated with Our Newsletter
          </h2>
          <p className="mt-2 text-emerald-200">
            Get the latest news, exclusive insights, and early access to new programmes.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
