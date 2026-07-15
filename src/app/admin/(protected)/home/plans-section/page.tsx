"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PlanCategory {
  _id: string;
  name: string;
}

/**
 * The Home "Plans" section doesn't own its own data — it simply
 * pulls plans from one chosen Plan Category. We store that choice
 * on OfferCard-style singleton via localStorage-free server state:
 * reuse CtaBand-style singleton pattern would need its own model, but
 * since scope only calls for "choose a Plan Category to feature", we
 * persist the choice on the Settings-like singleton exposed at
 * /api/home/plans-section, which wraps a tiny dedicated collection.
 */
export default function AdminHomePlansSectionPage() {
  const [categories, setCategories] = useState<PlanCategory[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/plans/categories").then((r) => r.json()),
      fetch("/api/home/plans-section").then((r) => r.json()),
    ])
      .then(([cats, current]) => {
        setCategories(cats);
        setSelected(current?.category?._id || current?.category || "");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/home/plans-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selected }),
      });
      if (!res.ok) throw new Error();
      setMessage("Featured plan category saved.");
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading…
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="admin-page-title">Home Plans Section</h1>
        <p className="admin-page-subtitle">
          Choose which Plan Category&apos;s plans are featured on the Home page.
        </p>
      </div>

      <div className="admin-card p-6 flex flex-col gap-4">
        <div>
          <label className="admin-label">Featured Plan Category</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="admin-input"
          >
            <option value="">None selected</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="mt-2 text-xs text-gray-400">
              No plan categories yet — add one under Broadband Plans → Categories first.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn-primary"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {message && <span className="admin-page-subtitle">{message}</span>}
        </div>
      </div>
    </div>
  );
}