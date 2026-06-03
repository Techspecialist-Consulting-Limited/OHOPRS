"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/logo";

const images = [
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full max-w-md flex-col justify-center bg-white px-10">
        <div className="mb-8">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="minister@ohoprs.gov.ng"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Demo Credentials
          </p>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Minister:</span>{" "}
              minister@ohoprs.gov.ng / password123
            </p>
            <p>
              <span className="font-medium text-foreground">Agency Admin:</span>{" "}
              admin@ncto.gov.ng / password123
            </p>
            <p>
              <span className="font-medium text-foreground">Operations:</span>{" "}
              ops@ncto.gov.ng / password123
            </p>
            <p>
              <span className="font-medium text-foreground">Partner:</span>{" "}
              partner@worldbank.org / password123
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden flex-1 overflow-hidden lg:block">
        {images.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              opacity: i === imageIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-900/80 to-emerald-950/60" />
        <div className="relative flex h-full flex-col items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="flex justify-center">
              <Logo variant="light" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              Welcome to OHOPRS
            </h2>
            <p className="mt-3 text-lg text-emerald-200">
              National platform for coordinating humanitarian and
              poverty-alleviation interventions across all agencies.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              {[
                "National visibility",
                "Deduplication engine",
                "Agency coordination",
                "Citizen tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-sm text-emerald-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === imageIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
