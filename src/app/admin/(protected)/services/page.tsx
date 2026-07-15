"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import IconPicker from "@/components/admin/IconPicker";
import ImageUploader from "@/components/admin/ImageUploader";
import CKEditorField from "@/components/admin/CKEditorField";
import DynamicIcon from "@/components/admin/DynamicIcon";

interface BusinessService {
  _id: string;
  name: string;
  slug: string;
  badge?: string;
  tagline?: string;
  image: string;
  icon: string;
  description: string;
  bulletPoints: string[];
  order: number;
}

const EMPTY_FORM = {
  name: "",
  badge: "",
  tagline: "",
  image: "",
  icon: "briefcase",
  description: "",
  bulletPointsText: "",
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<BusinessService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BusinessService | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/services");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(item: BusinessService) {
    setEditing(item);
    setForm({
      name: item.name,
      badge: item.badge || "",
      tagline: item.tagline || "",
      image: item.image,
      icon: item.icon,
      description: item.description,
      bulletPointsText: (item.bulletPoints || []).join("\n"),
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        badge: form.badge,
        tagline: form.tagline,
        image: form.image,
        icon: form.icon,
        description: form.description,
        bulletPoints: form.bulletPointsText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean),
      };

      const res = editing
        ? await fetch(`/api/services/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save.");
        return;
      }

      setModalOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: BusinessService) {
    await fetch(`/api/services/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: BusinessService, direction: "up" | "down") {
    await fetch(`/api/services/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Business Services</h1>
        <p className="admin-page-subtitle">
          Enterprise/business offerings shown on the Services pages.
        </p>
      </div>

      <CrudTable<BusinessService>
        title="Services"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add Service"
        emptyLabel="No services yet. Add the first one."
        columns={[
          {
            key: "icon",
            label: "Icon",
            render: (i) => <DynamicIcon name={i.icon} size={20} className="text-gray-700" />,
          },
          { key: "name", label: "Name", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
          { key: "badge", label: "Badge", render: (i) => i.badge || "—" },
          { key: "tagline", label: "Tagline", render: (i) => i.tagline || "—" },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Service" : "Add Service"}
        width="600px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="admin-label">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Enterprise Leased Lines"
              className="admin-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">Badge</label>
              <input
                value={form.badge}
                onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                placeholder="e.g. New"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Tagline</label>
              <input
                value={form.tagline}
                onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                placeholder="Short tagline"
                className="admin-input"
              />
            </div>
          </div>

          <ImageUploader
            label="Image"
            folder="services"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          />

          <IconPicker
            label="Icon"
            value={form.icon}
            onChange={(name) => setForm((p) => ({ ...p, icon: name }))}
          />

          <CKEditorField
            label="Description"
            value={form.description}
            onChange={(html) => setForm((p) => ({ ...p, description: html }))}
          />

          <div>
            <label className="admin-label">
              Bullet Points (one per line)
            </label>
            <textarea
              rows={5}
              value={form.bulletPointsText}
              onChange={(e) => setForm((p) => ({ ...p, bulletPointsText: e.target.value }))}
              placeholder={"24/7 dedicated support\nSLA-backed uptime\nCustom bandwidth options"}
              className="admin-input resize-vertical"
            />
          </div>

          {error && <p className="admin-alert-error">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="admin-btn-primary w-full"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
}