"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface CtaBandData {
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

const EMPTY: CtaBandData = { title: "", description: "", ctaLabel: "", ctaLink: "" };

export default function AdminCtaBandPage() {
  const [data, setData] = useState<CtaBandData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/home/cta-band")
      .then((res) => res.json())
      .then((json) => setData({ ...EMPTY, ...json }))
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof CtaBandData>(key: K, value: CtaBandData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/home/cta-band", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMessage("CTA band saved successfully.");
    } catch {
      setMessage("Failed to save CTA band.");
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
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="admin-page-title">Above-Footer CTA Band</h1>
        <p className="admin-page-subtitle">The call-to-action strip shown just above the footer on the Home page.</p>
      </div>

      <div className="admin-card p-6 flex flex-col gap-4">
        <div>
          <label className="admin-label">Title</label>
          <input
            value={data.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Ready to Switch to Fiber?"
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => set("description", e.target.value)}
            className="admin-input resize-vertical"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="admin-label">Button Label</label>
            <input
              value={data.ctaLabel}
              onChange={(e) => set("ctaLabel", e.target.value)}
              placeholder="e.g. Get Connected"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Button Link</label>
            <input
              value={data.ctaLink}
              onChange={(e) => set("ctaLink", e.target.value)}
              placeholder="/contact"
              className="admin-input"
            />
          </div>
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