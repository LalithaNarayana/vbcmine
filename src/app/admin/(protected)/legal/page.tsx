"use client";

import { useEffect, useState } from "react";
import CKEditorField from "@/components/admin/CKEditorField";
import { Loader2 } from "lucide-react";

type LegalType = "privacy" | "terms" | "refund";

interface LegalPage {
  type: LegalType;
  title: string;
  content: string;
}

const TABS: { type: LegalType; label: string }[] = [
  { type: "privacy", label: "Privacy Policy" },
  { type: "terms", label: "Terms & Conditions" },
  { type: "refund", label: "Refund Policy" },
];

export default function AdminLegalPage() {
  const [pages, setPages] = useState<Record<LegalType, LegalPage> | null>(null);
  const [activeTab, setActiveTab] = useState<LegalType>("privacy");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/legal")
      .then((res) => res.json())
      .then((json: LegalPage[]) => {
        const map = {} as Record<LegalType, LegalPage>;
        for (const p of json) map[p.type] = p;
        setPages(map);
      })
      .finally(() => setLoading(false));
  }, []);

  function updateActive(patch: Partial<LegalPage>) {
    setPages((prev) => {
      if (!prev) return prev;
      return { ...prev, [activeTab]: { ...prev[activeTab], ...patch } };
    });
  }

  async function handleSave() {
    if (!pages) return;
    setSaving(true);
    setMessage(null);
    try {
      const current = pages[activeTab];
      const res = await fetch("/api/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
      if (!res.ok) throw new Error();
      setMessage("Saved successfully.");
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  if (loading || !pages) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading…
      </div>
    );
  }

  const active = pages[activeTab];

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="admin-page-title">Legal Pages</h1>
        <p className="admin-page-subtitle">Privacy Policy, Terms &amp; Conditions, and Refund Policy content.</p>
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
              activeTab === tab.type
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-card p-6 flex flex-col gap-4">
        <div>
          <label className="admin-label">Page Title</label>
          <input
            value={active.title}
            onChange={(e) => updateActive({ title: e.target.value })}
            className="admin-input"
          />
        </div>

        <CKEditorField
          label="Content"
          value={active.content}
          onChange={(html) => updateActive({ content: html })}
          minHeight={320}
        />

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