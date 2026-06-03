"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AGENCY_TYPES = [
  { value: "government", label: "Government" },
  { value: "ngo", label: "Non-Governmental Organization" },
  { value: "international", label: "International Organization" },
  { value: "private", label: "Private Sector" },
];

export default function NewAgencyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    shortCode: "",
    type: "government",
    contactEmail: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const isMinistry =
    session?.user?.role === "minister" || session?.user?.role === "executive";

  if (!isMinistry) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">
          Only Ministry-level users can create agencies.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/agencies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to create agency");
      setSubmitting(false);
      return;
    }

    router.push("/national");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">New Agency</h1>
      <p className="mt-1 text-sm text-slate-500">
        Onboard a new humanitarian agency to the national system
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Agency Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g., National Commission for the Targeting of the Poor"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Short Code
            </label>
            <input
              type="text"
              value={formData.shortCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortCode: e.target.value.toUpperCase(),
                })
              }
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm uppercase"
              placeholder="e.g., NCTO"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {AGENCY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Brief description of the agency's mandate..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-light disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Agency"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
