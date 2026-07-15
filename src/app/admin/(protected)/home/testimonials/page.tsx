"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import { Star } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  image?: string;
  quote: string;
  rating: number;
  order: number;
}

const EMPTY_FORM = { name: "", role: "", image: "", quote: "", rating: "5" };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/home/testimonials");
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

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm({
      name: item.name,
      role: item.role || "",
      image: item.image || "",
      quote: item.quote,
      rating: String(item.rating),
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form, rating: Number(form.rating) };
      const res = editing
        ? await fetch(`/api/home/testimonials/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/home/testimonials", {
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

  async function handleDelete(item: Testimonial) {
    await fetch(`/api/home/testimonials/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Testimonial, direction: "up" | "down") {
    await fetch(`/api/home/testimonials/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Testimonials</h1>
        <p className="admin-page-subtitle">Customer testimonials shown on the Home page.</p>
      </div>

      <CrudTable<Testimonial>
        title="Testimonials"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add Testimonial"
        emptyLabel="No testimonials yet. Add the first one."
        columns={[
          { key: "name", label: "Name", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
          { key: "role", label: "Role", render: (i) => i.role || "—" },
          { key: "quote", label: "Quote", render: (i) => <span className="line-clamp-2 text-gray-600">{i.quote}</span> },
          { key: "rating", label: "Rating", render: (i) => `${i.rating} / 5` },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        width="460px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUploader
            label="Photo (optional)"
            folder="testimonials"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Role</label>
              <input
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                placeholder="e.g. Homeowner, MVP Colony"
                className="admin-input"
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Quote</label>
            <textarea
              required
              rows={3}
              value={form.quote}
              onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
              className="admin-input resize-vertical"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              Rating <Star size={12} className="text-amber-400" />
            </label>
            <select
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
              className="admin-input"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
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