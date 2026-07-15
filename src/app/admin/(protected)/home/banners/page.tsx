"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/admin/ImageUploader";

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaLabel?: string;
  ctaLink?: string;
  order: number;
}

const EMPTY_FORM = { title: "", subtitle: "", image: "", ctaLabel: "", ctaLink: "" };

export default function AdminBannersPage() {
  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/home/banners");
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

  function openEdit(item: Banner) {
    setEditing(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle || "",
      image: item.image,
      ctaLabel: item.ctaLabel || "",
      ctaLink: item.ctaLink || "",
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editing
        ? await fetch(`/api/home/banners/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/home/banners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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

  async function handleDelete(item: Banner) {
    await fetch(`/api/home/banners/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Banner, direction: "up" | "down") {
    await fetch(`/api/home/banners/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Home Banners</h1>
        <p className="admin-page-subtitle">Hero slider banners on the Home page.</p>
      </div>

      <CrudTable<Banner>
        title="Banners"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.title}
        addLabel="Add Banner"
        emptyLabel="No banners yet. Add the first one."
        columns={[
          {
            key: "image",
            label: "Image",
            render: (i) =>
              // eslint-disable-next-line @next/next/no-img-element
              i.image ? <img src={i.image} alt="" className="w-16 h-10 object-cover rounded" /> : "—",
          },
          { key: "title", label: "Title", render: (i) => <span className="font-medium text-gray-900">{i.title}</span> },
          { key: "subtitle", label: "Subtitle", render: (i) => i.subtitle || "—" },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Banner" : "Add Banner"}
        width="480px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUploader
            label="Banner Image"
            folder="banners"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          />
          <div>
            <label className="admin-label">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="admin-input"
            />
          </div>
          {/* <div>
            <label className="admin-label">Subtitle</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">CTA Label</label>
              <input
                value={form.ctaLabel}
                onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))}
                placeholder="e.g. Get Connected"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">CTA Link</label>
              <input
                value={form.ctaLink}
                onChange={(e) => setForm((p) => ({ ...p, ctaLink: e.target.value }))}
                placeholder="/plans"
                className="admin-input"
              />
            </div>
          </div> */}

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