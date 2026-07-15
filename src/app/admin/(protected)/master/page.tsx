"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

interface MasterSettingsData {
  gstPercent: number;
}

export default function AdminMasterSettingsPage() {
  const [gstPercent, setGstPercent] = useState<number>(18);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/master-settings")
      .then((res) => res.json())
      .then((json: MasterSettingsData) => setGstPercent(json.gstPercent ?? 18))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/master-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gstPercent }),
      });
      if (!res.ok) throw new Error();
      setMessage("GST setting saved successfully.");
    } catch {
      setMessage("Failed to save GST setting.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading settings…
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="admin-page-title">Master Settings</h1>
        <p className="admin-page-subtitle">
          GST % applied to all plan prices at checkout — new connections and renewals.
        </p>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">GST Configuration</h2>
        </div>
        <div className="admin-card-body flex flex-col gap-4">
          <div>
            <label className="admin-label">GST Percentage (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step="0.01"
              value={gstPercent}
              onChange={(e) => setGstPercent(Number(e.target.value))}
              className="admin-input"
              style={{ maxWidth: "200px" }}
            />
            <p className="admin-page-subtitle" style={{ marginTop: "8px" }}>
              Applied to the base plan amount when a customer pays online or renews.
            </p>
          </div>

          {message && (
            <p className={message.includes("Failed") ? "admin-alert-error" : "admin-alert-success"}>
              {message}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn-primary"
            style={{ alignSelf: "flex-start" }}
          >
            <Save size={15} /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
