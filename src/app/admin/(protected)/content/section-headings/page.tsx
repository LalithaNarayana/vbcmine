"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

interface Block {
  tag: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  description: string;
}

interface PlansBlock extends Block {
  topTagline: string;
  bottomTagline: string;
}

interface SectionHeadingsData {
  homeOffers: Block;
  homePlans: Block;
  homeWhyChoose: Block;
  homeTestimonials: Block;
  homeClients: Block;
  plansPage: PlansBlock;
  servicesPage: Block;
  contactPage: Block;
  faqPage: Block;
}

const EMPTY_BLOCK: Block = { tag: "", titlePart1: "", titlePart2: "", titlePart3: "", description: "" };
const EMPTY_PLANS_BLOCK: PlansBlock = { ...EMPTY_BLOCK, topTagline: "", bottomTagline: "" };

const EMPTY: SectionHeadingsData = {
  homeOffers: EMPTY_BLOCK,
  homePlans: EMPTY_BLOCK,
  homeWhyChoose: EMPTY_BLOCK,
  homeTestimonials: EMPTY_BLOCK,
  homeClients: EMPTY_BLOCK,
  plansPage: EMPTY_PLANS_BLOCK,
  servicesPage: EMPTY_BLOCK,
  contactPage: EMPTY_BLOCK,
  faqPage: EMPTY_BLOCK,
};

type SectionKey = keyof SectionHeadingsData;

export default function AdminSectionHeadingsPage() {
  const [data, setData] = useState<SectionHeadingsData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/section-headings")
      .then((res) => res.json())
      .then((json) =>
        setData((prev) => ({
          homeOffers: { ...prev.homeOffers, ...json.homeOffers },
          homePlans: { ...prev.homePlans, ...json.homePlans },
          homeWhyChoose: { ...prev.homeWhyChoose, ...json.homeWhyChoose },
          homeTestimonials: { ...prev.homeTestimonials, ...json.homeTestimonials },
          homeClients: { ...prev.homeClients, ...json.homeClients },
          plansPage: { ...prev.plansPage, ...json.plansPage },
          servicesPage: { ...prev.servicesPage, ...json.servicesPage },
          contactPage: { ...prev.contactPage, ...json.contactPage },
          faqPage: { ...prev.faqPage, ...json.faqPage },
        }))
      )
      .finally(() => setLoading(false));
  }, []);

  function setField<K extends SectionKey>(section: K, field: keyof SectionHeadingsData[K], value: string) {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/section-headings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMessage("Section titles saved successfully.");
    } catch {
      setMessage("Failed to save section titles.");
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
          <h1 className="admin-page-title">Section Titles</h1>
          <p className="admin-page-subtitle">
            Manage the eyebrow tag, heading and description shown at the top of every major section
            across the site. Colored/outlined portions of headings are controlled by which title part
            they&apos;re entered into — leave a part blank if a section doesn&apos;t use it.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {message && <p className="admin-alert-success mb-4">{message}</p>}

      <Section title="Home — What We Offer">
        <TagField value={data.homeOffers.tag} onChange={(v) => setField("homeOffers", "tag", v)} />
        <ThreePartFields
          data={data.homeOffers}
          onChange={(field, v) => setField("homeOffers", field, v)}
        />
        <DescriptionField
          value={data.homeOffers.description}
          onChange={(v) => setField("homeOffers", "description", v)}
        />
      </Section>

      <Section title="Home — Plans Section (Internet + OTT)">
        <TagField value={data.homePlans.tag} onChange={(v) => setField("homePlans", "tag", v)} />
        <PlainTitleField
          value={data.homePlans.titlePart1}
          onChange={(v) => setField("homePlans", "titlePart1", v)}
        />
        <DescriptionField
          value={data.homePlans.description}
          onChange={(v) => setField("homePlans", "description", v)}
        />
      </Section>

      <Section title="Home — Why Choose Us">
        <TagField value={data.homeWhyChoose.tag} onChange={(v) => setField("homeWhyChoose", "tag", v)} />
        <PlainTitleField
          value={data.homeWhyChoose.titlePart1}
          onChange={(v) => setField("homeWhyChoose", "titlePart1", v)}
        />
        <DescriptionField
          value={data.homeWhyChoose.description}
          onChange={(v) => setField("homeWhyChoose", "description", v)}
        />
      </Section>

      <Section title="Home — Testimonials">
        <TagField
          value={data.homeTestimonials.tag}
          onChange={(v) => setField("homeTestimonials", "tag", v)}
        />
        <ThreePartFields
          data={data.homeTestimonials}
          onChange={(field, v) => setField("homeTestimonials", field, v)}
        />
        <DescriptionField
          value={data.homeTestimonials.description}
          onChange={(v) => setField("homeTestimonials", "description", v)}
        />
      </Section>

      <Section title="Home — Clients">
        <TagField value={data.homeClients.tag} onChange={(v) => setField("homeClients", "tag", v)} />
        <TwoPartFields
          data={data.homeClients}
          onChange={(field, v) => setField("homeClients", field, v)}
        />
      </Section>

      <Section title="Plans Page">
        <TagField value={data.plansPage.tag} onChange={(v) => setField("plansPage", "tag", v)} />
        <TwoPartFields data={data.plansPage} onChange={(field, v) => setField("plansPage", field, v)} />
        <DescriptionField
          value={data.plansPage.description}
          onChange={(v) => setField("plansPage", "description", v)}
        />
        <TaglineField
          label="Top Tagline (shown above plan cards, on the Plans page and the Home page plans section)"
          value={data.plansPage.topTagline}
          onChange={(v) => setField("plansPage", "topTagline", v)}
        />
        <TaglineField
          label="Bottom Tagline (shown below plan cards, on the Plans page and the Home page plans section)"
          value={data.plansPage.bottomTagline}
          onChange={(v) => setField("plansPage", "bottomTagline", v)}
        />
      </Section>

      <Section title="Services Page">
        <TagField value={data.servicesPage.tag} onChange={(v) => setField("servicesPage", "tag", v)} />
        <TwoPartFields
          data={data.servicesPage}
          onChange={(field, v) => setField("servicesPage", field, v)}
        />
        <DescriptionField
          value={data.servicesPage.description}
          onChange={(v) => setField("servicesPage", "description", v)}
        />
      </Section>

      <Section title="Contact Page">
        <TagField value={data.contactPage.tag} onChange={(v) => setField("contactPage", "tag", v)} />
        <TwoPartFields
          data={data.contactPage}
          onChange={(field, v) => setField("contactPage", field, v)}
        />
        <DescriptionField
          value={data.contactPage.description}
          onChange={(v) => setField("contactPage", "description", v)}
        />
      </Section>

      <Section title="FAQ Page">
        <TagField value={data.faqPage.tag} onChange={(v) => setField("faqPage", "tag", v)} />
        <TwoPartFields data={data.faqPage} onChange={(field, v) => setField("faqPage", field, v)} />
        <DescriptionField
          value={data.faqPage.description}
          onChange={(v) => setField("faqPage", "description", v)}
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

function TagField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Field label="Title 1 / Eyebrow Tag" value={value} onChange={onChange} />;
}

function PlainTitleField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Field label="Title 2 (plain — no colored/outlined part)" value={value} onChange={onChange} />;
}

function TwoPartFields({
  data,
  onChange,
}: {
  data: { titlePart1: string; titlePart2: string };
  onChange: (field: "titlePart1" | "titlePart2", value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Field label="Title 2 — Part 1" value={data.titlePart1} onChange={(v) => onChange("titlePart1", v)} />
      <Field
        label="Title 2 — Part 2 (colored/outlined)"
        value={data.titlePart2}
        onChange={(v) => onChange("titlePart2", v)}
      />
    </div>
  );
}

function ThreePartFields({
  data,
  onChange,
}: {
  data: { titlePart1: string; titlePart2: string; titlePart3: string };
  onChange: (field: "titlePart1" | "titlePart2" | "titlePart3", value: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Field label="Title 2 — Part 1" value={data.titlePart1} onChange={(v) => onChange("titlePart1", v)} />
      <Field
        label="Title 2 — Part 2 (colored/outlined)"
        value={data.titlePart2}
        onChange={(v) => onChange("titlePart2", v)}
      />
      <Field label="Title 2 — Part 3 (new line)" value={data.titlePart3} onChange={(v) => onChange("titlePart3", v)} />
    </div>
  );
}

function DescriptionField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="admin-label">Description</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input resize-vertical"
      />
    </div>
  );
}

function TaglineField({
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
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input resize-vertical"
      />
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="admin-input" />
    </div>
  );
}
