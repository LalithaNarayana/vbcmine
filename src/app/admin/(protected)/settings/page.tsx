"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import CKEditorField from "@/components/admin/CKEditorField";
import { Loader2, Save } from "lucide-react";

interface SettingsData {
  siteName: string;
  logo: string;
  favicon: string;
  metaTitle: string;
  metaDescription: string;
  contact1: string;
  contact2: string;
  whatsappNumber: string;
  mail1: string;
  mail2: string;
  address: string;
  workingHours: string;
  topBarTitle: string;
  topBarNumber: string;
  footerDescription: string;
}

const EMPTY: SettingsData = {
  siteName: "",
  logo: "",
  favicon: "",
  metaTitle: "",
  metaDescription: "",
  contact1: "",
  contact2: "",
  whatsappNumber: "",
  mail1: "",
  mail2: "",
  address: "",
  workingHours: "",
  topBarTitle: "",
  topBarNumber: "",
  footerDescription: "",
};

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => setData({ ...EMPTY, ...json }))
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof SettingsData>(key: K, value: SettingsData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMessage("Settings saved successfully.");
    } catch {
      setMessage("Failed to save settings.");
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
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="admin-page-title">Site Settings</h1>
          <p className="admin-page-subtitle">
            Global site name, logo, meta info and contact details.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {message && (
        <p className="admin-alert-success mb-4">
          {message}
        </p>
      )}

      <div className="admin-card p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImageUploader
            label="Logo"
            folder="settings"
            value={data.logo}
            onChange={(url) => set("logo", url)}
          />
          <ImageUploader
            label="Favicon"
            folder="favicon"
            value={data.favicon}
            onChange={(url) => set("favicon", url)}
          />
        </div>

        <Field label="Site Name" value={data.siteName} onChange={(v) => set("siteName", v)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field
            label="Meta Title (Home Page)"
            value={data.metaTitle}
            onChange={(v) => set("metaTitle", v)}
          />
          <TextArea
            label="Meta Description (Home Page)"
            value={data.metaDescription}
            onChange={(v) => set("metaDescription", v)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Contact Number 1" value={data.contact1} onChange={(v) => set("contact1", v)} />
          <Field label="Contact Number 2" value={data.contact2} onChange={(v) => set("contact2", v)} />
          <Field
            label="WhatsApp Number"
            value={data.whatsappNumber}
            onChange={(v) => set("whatsappNumber", v)}
          />
          <Field label="Email 1" value={data.mail1} onChange={(v) => set("mail1", v)} />
          <Field label="Email 2" value={data.mail2} onChange={(v) => set("mail2", v)} />
        </div>

        <CKEditorField
          label="Address"
          value={data.address}
          onChange={(v) => set("address", v)}
        />

        <CKEditorField
          label="Working Hours"
          value={data.workingHours}
          onChange={(v) => set("workingHours", v)}
        />

        <div className="pt-2 border-t border-gray-100">
          <h3 className="admin-page-subtitle" style={{ fontWeight: 600, marginBottom: 12 }}>
            Top Announcement Bar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              label="Top Bar Title"
              value={data.topBarTitle}
              onChange={(v) => set("topBarTitle", v)}
            />
            <Field
              label="Top Bar Number"
              value={data.topBarNumber}
              onChange={(v) => set("topBarNumber", v)}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <h3 className="admin-page-subtitle" style={{ fontWeight: 600, marginBottom: 12 }}>
            Footer
          </h3>
          <TextArea
            label="Footer Description"
            value={data.footerDescription}
            onChange={(v) => set("footerDescription", v)}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="admin-input"
      />
    </div>
  );
}