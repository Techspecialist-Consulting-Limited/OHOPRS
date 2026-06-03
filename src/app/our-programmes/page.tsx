import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";

const agencies = [
  {
    shortCode: "NCTO",
    name: "National Commission for the Targeting of the Poor",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    description: "The National Cash Transfer Office (NCTO) was established to support Nigeria's poorest households by improving nutrition, enhancing household consumption, and investing in human capital development. NCTO delivers cash transfers to vulnerable populations, with the dual aim of promoting immediate welfare and encouraging co-responsibilities that strengthen the capacities of poor and vulnerable households to improve their standard of living.",
    programmes: [
      "Conditional Cash Transfer — South-West",
      "School Supplies Distribution — North-East",
    ],
    stats: { beneficiaries: 12, interventions: 2, budget: "₦240M" },
  },
  {
    shortCode: "GEEP",
    name: "Government Enterprise and Empowerment Programme",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    description: "The Government Enterprise and Empowerment Programme provides loans and grants to women under the MarketMoni programme, farmers under the FarmerMoni programme, and enterprising youth. GEEP empowers micro-businesses and supports economic growth at the grassroots level.",
    programmes: [
      "Micro-Grant for Women Entrepreneurs",
    ],
    stats: { beneficiaries: 7, interventions: 1, budget: "₦100M" },
  },
  {
    shortCode: "NEMA",
    name: "National Emergency Management Agency",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    description: "NEMA coordinates emergency response and disaster relief across the nation. From food distribution in flood-affected communities to temporary shelter for displaced families, NEMA ensures rapid and effective humanitarian response in times of crisis.",
    programmes: [
      "Emergency Food Distribution — North Central",
      "Temporary Shelter — Niger State",
    ],
    stats: { beneficiaries: 19, interventions: 2, budget: "₦500M" },
  },
  {
    shortCode: "NRCS",
    name: "Nigerian Red Cross Society",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    description: "The Nigerian Red Cross Society provides humanitarian assistance, disaster relief, and health services to vulnerable populations. With a network of trained volunteers across all states, NRCS is often first on the ground in emergencies.",
    programmes: [
      "Mobile Health Clinics — IDP Camps",
    ],
    stats: { beneficiaries: 0, interventions: 1, budget: "₦80M" },
  },
];

export default function OurProgrammesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <section className="relative h-64 overflow-hidden bg-emerald-900 sm:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-4xl items-center px-6">
          <div>
            <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-sm">
              Our Programmes
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Agencies &amp; Interventions
            </h1>
            <p className="mt-2 max-w-2xl text-emerald-100/80">
              Four specialized agencies delivering targeted humanitarian and poverty-alleviation interventions across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-16">
            {agencies.map((agency, i) => (
              <div
                key={agency.shortCode}
                className={`flex flex-col gap-8 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="lg:w-1/2">
                  <div
                    className="h-64 rounded-xl bg-cover bg-center shadow-md sm:h-80"
                    style={{ backgroundImage: `url(${agency.image})` }}
                  />
                </div>
                <div className="lg:w-1/2">
                  <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-primary">
                    {agency.shortCode}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {agency.name}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {agency.description}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xl font-bold text-primary">{agency.stats.beneficiaries}</p>
                      <p className="text-xs text-muted-foreground">Beneficiaries</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xl font-bold text-primary">{agency.stats.interventions}</p>
                      <p className="text-xs text-muted-foreground">Interventions</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xl font-bold text-primary">{agency.stats.budget}</p>
                      <p className="text-xs text-muted-foreground">Budget</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground">Active Programmes:</p>
                    <ul className="mt-2 space-y-1">
                      {agency.programmes.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">→</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/login"
                    className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold text-white">Want to learn more?</h2>
          <p className="mt-2 text-emerald-200">
            Sign in to access detailed dashboards, beneficiary data, and real-time intervention tracking.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-emerald-400/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800/50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
