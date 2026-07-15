"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/admin/ImageUploader";

interface OfferCard {
  _id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  order: number;
}

const EMPTY_FORM = { title: "", description: "", badge: "", image: "" };

export default function AdminOfferCardsPage() {
  const [items, setItems] = useState<OfferCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<OfferCard | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/home/offer-cards");
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

  function openEdit(item: OfferCard) {
    setEditing(item);
    setForm({ title: item.title, description: item.description, badge: item.badge || "", image: item.image || "" });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.image) {
      setError("Image is required.");
      return;
    }

    setSaving(true);
    try {
      const res = editing
        ? await fetch(`/api/home/offer-cards/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/home/offer-cards", {
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

  async function handleDelete(item: OfferCard) {
    await fetch(`/api/home/offer-cards/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: OfferCard, direction: "up" | "down") {
    await fetch(`/api/home/offer-cards/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">What We Offer</h1>
        <p className="admin-page-subtitle">Offering cards shown on the Home page.</p>
      </div>

      <CrudTable<OfferCard>
        title="Offer Cards"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.title}
        addLabel="Add Card"
        emptyLabel="No cards yet. Add the first one."
        columns={[
          {
            key: "image",
            label: "Image",
            render: (i) =>
              i.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={i.image} alt="" className="w-10 h-10 object-cover rounded" />
              ) : (
                <span className="text-gray-400">—</span>
              ),
          },
          { key: "badge", label: "Badge", render: (i) => i.badge || <span className="text-gray-400">—</span> },
          { key: "title", label: "Title", render: (i) => <span className="font-medium text-gray-900">{i.title}</span> },
          { key: "description", label: "Description", render: (i) => <span className="line-clamp-2 text-gray-600">{i.description}</span> },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Card" : "Add Card"}
        width="460px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="admin-input resize-vertical"
            />
          </div>
          <div>
            <label className="admin-label">Badge</label>
            <input
              value={form.badge}
              onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
              placeholder="e.g. Broadband"
              className="admin-input"
            />
          </div>
          <ImageUploader
            label="Image"
            folder="offer-cards"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          />

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