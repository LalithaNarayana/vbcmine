"use client";

import { useEffect, useState } from "react";
import CKEditorField from "@/components/admin/CKEditorField";
import { Loader2, Save } from "lucide-react";

interface AboutData {
  aboutVbc: { mainTitle: string; titlePart1: string; titlePart2: string; titlePart3: string; description: string };
  companyProfile: { mainTitle: string; titlePart1: string; titlePart2: string; description: string };
  whySection: { mainTitle: string; titlePart1: string; titlePart2: string; description: string };
  successStory: { mainTitle: string; titlePart1: string; titlePart2: string; description: string };
  mission: { description: string };
  vision: { description: string };
  values: { description: string };
}

const EMPTY: AboutData = {
  aboutVbc: { mainTitle: "", titlePart1: "", titlePart2: "", titlePart3: "", description: "" },
  companyProfile: { mainTitle: "", titlePart1: "", titlePart2: "", description: "" },
  whySection: { mainTitle: "", titlePart1: "", titlePart2: "", description: "" },
  successStory: { mainTitle: "", titlePart1: "", titlePart2: "", description: "" },
  mission: { description: "" },
  vision: { description: "" },
  values: { description: "" },
};

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((json) => setData({ ...EMPTY, ...json }))
      .finally(() => setLoading(false));
  }, []);

  function setSection<K extends keyof AboutData>(
    section: K,
    field: keyof AboutData[K],
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMessage("About content saved successfully.");
    } catch {
      setMessage("Failed to save About content.");
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
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="admin-page-title">About Page</h1>
          <p className="admin-page-subtitle">
            Main content sections. Manage Stats and Timeline from the sidebar.
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

      <Section title="About VBC Section">
        <ThreePartTitle
          data={data.aboutVbc}
          onChange={(field, value) => setSection("aboutVbc", field, value)}
        />
        <CKEditorField
          label="Description"
          value={data.aboutVbc.description}
          onChange={(v) => setSection("aboutVbc", "description", v)}
        />
      </Section>

      <Section title="Company Profile Section">
        <Field
          label="Main Title"
          value={data.companyProfile.mainTitle}
          onChange={(v) => setSection("companyProfile", "mainTitle", v)}
        />
        <div className="grid grid-cols-2 gap-5">
          <Field
            label="Title Part 1"
            value={data.companyProfile.titlePart1}
            onChange={(v) => setSection("companyProfile", "titlePart1", v)}
          />
          <Field
            label="Title Part 2"
            value={data.companyProfile.titlePart2}
            onChange={(v) => setSection("companyProfile", "titlePart2", v)}
          />
        </div>
        <CKEditorField
          label="Description"
          value={data.companyProfile.description}
          onChange={(v) => setSection("companyProfile", "description", v)}
        />
      </Section>

      <Section title="Why Section">
        <Field
          label="Main Title"
          value={data.whySection.mainTitle}
          onChange={(v) => setSection("whySection", "mainTitle", v)}
        />
        <div className="grid grid-cols-2 gap-5">
          <Field
            label="Title Part 1"
            value={data.whySection.titlePart1}
            onChange={(v) => setSection("whySection", "titlePart1", v)}
          />
          <Field
            label="Title Part 2"
            value={data.whySection.titlePart2}
            onChange={(v) => setSection("whySection", "titlePart2", v)}
          />
        </div>
        <CKEditorField
          label="Description"
          value={data.whySection.description}
          onChange={(v) => setSection("whySection", "description", v)}
        />
      </Section>

      <Section title="Our Success Story Section">
        <Field
          label="Main Title"
          value={data.successStory.mainTitle}
          onChange={(v) => setSection("successStory", "mainTitle", v)}
        />
        <div className="grid grid-cols-2 gap-5">
          <Field
            label="Title Part 1"
            value={data.successStory.titlePart1}
            onChange={(v) => setSection("successStory", "titlePart1", v)}
          />
          <Field
            label="Title Part 2"
            value={data.successStory.titlePart2}
            onChange={(v) => setSection("successStory", "titlePart2", v)}
          />
        </div>
        <CKEditorField
          label="Description"
          value={data.successStory.description}
          onChange={(v) => setSection("successStory", "description", v)}
        />
      </Section>

      <Section title="Our Mission / Vision / Values">
        <CKEditorField
          label="Our Mission"
          value={data.mission.description}
          onChange={(v) => setSection("mission", "description", v)}
          minHeight={140}
        />
        <CKEditorField
          label="Our Vision"
          value={data.vision.description}
          onChange={(v) => setSection("vision", "description", v)}
          minHeight={140}
        />
        <CKEditorField
          label="Our Values"
          value={data.values.description}
          onChange={(v) => setSection("values", "description", v)}
          minHeight={140}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card p-6 space-y-6 mb-8">
      <h2 className="admin-card-title">{title}</h2>
      {children}
    </div>
  );
}

function ThreePartTitle({
  data,
  onChange,
}: {
  data: { titlePart1: string; titlePart2: string; titlePart3: string; mainTitle: string };
  onChange: (field: "mainTitle" | "titlePart1" | "titlePart2" | "titlePart3", value: string) => void;
}) {
  return (
    <>
      <Field label="Main Title (badge)" value={data.mainTitle} onChange={(v) => onChange("mainTitle", v)} />
      <div className="grid grid-cols-3 gap-5">
        <Field label="Title Part 1" value={data.titlePart1} onChange={(v) => onChange("titlePart1", v)} />
        <Field label="Title Part 2" value={data.titlePart2} onChange={(v) => onChange("titlePart2", v)} />
        <Field label="Title Part 3" value={data.titlePart3} onChange={(v) => onChange("titlePart3", v)} />
      </div>
    </>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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
