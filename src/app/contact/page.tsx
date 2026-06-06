"use client";

import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

const agencies = [
  {
    name: "National Cash Transfer Office",
    short: "NCTO",
    address: "Plot 123, Constitution Avenue, Central Business District, Abuja",
    phone: "+234 800 NCTO INFO",
    email: "info@ncto.ohoprs.gov.ng",
  },
  {
    name: "Government Enterprise and Empowerment Programme",
    short: "GEEP",
    address: "Suite 5, Empowerment House, 45 Ahmadu Bello Way, Lagos",
    phone: "+234 800 GEEP HELP",
    email: "support@geep.ohoprs.gov.ng",
  },
  {
    name: "National Social Safety-Nets Coordinating Office",
    short: "NASSCO",
    address: "No. 76, All Akilu Crescent, State House, Abuja",
    phone: "+234 800 NASSCO INFO",
    email: "info@nassco.ohoprs.gov.ng",
  },
  {
    name: "N-Power Programme",
    short: "NPOWER",
    address: "N-Power Headquarters, Fed. Secretariat, Phase II, Abuja",
    phone: "+234 800 N POWER HELP",
    email: "support@npower.ohoprs.gov.ng",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <section className="relative h-64 overflow-hidden bg-emerald-900 sm:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-4xl items-center px-6">
          <div>
            <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-sm">
              Contact Us
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-2 max-w-2xl text-emerald-100/80">
              Reach out to any of our agencies below for inquiries, partnerships, or support.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Have a question or feedback? Fill out the form and we&apos;ll get back to you.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Your message..."
                    className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Agency Contacts</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact any of our partner agencies directly.
              </p>
              <div className="mt-8 space-y-6">
                {agencies.map((a) => (
                  <div key={a.short} className="rounded-xl border border-border bg-muted/30 p-5">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {a.short}
                      </span>
                      <h3 className="font-semibold text-foreground">{a.name}</h3>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <p>📍 {a.address}</p>
                      <p>📞 {a.phone}</p>
                      <p>✉️ {a.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
