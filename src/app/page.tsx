"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { HeroCarousel } from "@/components/hero-carousel";

const stats = [
  { value: "56+", label: "Active Interventions", desc: "Cash, food, shelter, medical, education, livelihood" },
  { value: "12+", label: "Partner Agencies", desc: "Government & NGO partners" },
  { value: "₦2.3B", label: "Total Budget Deployed", desc: "Across all active interventions" },
  { value: "3,000,000", label: "Beneficiaries Served", desc: "Tracked across all programmes" },
];

const programmes = [
  {
    shortCode: "NCTO",
    name: "The National Cash Transfer Office",
    image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780563028/michael-ali-ugQzBfJMg44-unsplash_xtgg3a.jpg",
    description: "Identifying and targeting poor households for social interventions. Delivering cash transfers to vulnerable populations to improve nutrition and human capital development.",
  },
  {
    shortCode: "GEEP",
    name: "Government Enterprise and Empowerment Programme",
    image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780562254/annie-spratt-cVEOh_JJmEE-unsplash_ppftj7.jpg",
    description: "Providing enterprise grants, loans, and empowerment support to micro-businesses and women entrepreneurs across all states.",
  },
  {
    shortCode: "NASSCO",
    name: "National Social Safety-Nets Coordinating Office",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
    description: "Central coordinating body for Nigeria's social protection initiatives. Building the National Social Register and facilitating targeted interventions for poor and vulnerable households across all states.",
  },
  {
    shortCode: "NPOWER",
    name: "N-Power Programme",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
    description: "Nigeria's flagship youth empowerment scheme tackling unemployment through skills training, job placement, and monthly stipends for young Nigerians aged 18–35.",
  },
];

const team = [
  { name: "Dr. Yunus Bello", role: "National Coordinator", image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780566440/leroy-skalstad-q9jjT1U2km4-unsplash_akmw6i.jpg" },
  { name: "Mr. Chidi Okonkwo", role: "Executive Director, Operations", image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780566455/elizeu-dias-2EGNqazbAMk-unsplash_m3n8c2.jpg" },
  { name: "Baba Usman", role: "Programme Manager, NCTO", image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780566442/pacha-shot-s-d0peGya6R5Y-unsplash_pkv0h6.jpg" },
  { name: "Jiga Adeyemi", role: "Programme Manager, GEEP", image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780566436/raymond-owusu-afriyie-DSK0z-RHLs0-unsplash_ktolax.jpg" },
  { name: "Ibrahim Fatima", role: "Director, Emergency Response", image: "https://res.cloudinary.com/daqmbfctv/image/upload/v1780566436/raymond-owusu-afriyie-VPvYUK2Iibo-unsplash_odepdl.jpg" },
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
                The One Humanitarian–One Poverty Response System (OHOPRS) is Nigeria&apos;s
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
              { icon: "🏛", title: "Multi-Agency Platform", desc: "A single national system that hosts every agency and intervention — all working together under one roof." },
              { icon: "📊", title: "Organized Intelligence", desc: "Intervention data from across the nation brought together into a clear executive dashboard — the full picture at a glance." },
              { icon: "📈", title: "Poverty Impact Tracking", desc: "Follow each beneficiary's journey and see real proof of how interventions are lifting people out of poverty." },
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
                The One Humanitarian–One Poverty Response System represents a new era
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
              className="flex-1 rounded-lg border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
