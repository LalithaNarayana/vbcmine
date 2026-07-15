"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface SalesCity {
  _id: string;
  name: string;
  order: number;
}

const EMPTY_FORM = { name: "" };

export default function AdminContactCitiesPage() {
  const [items, setItems] = useState<SalesCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SalesCity | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact/cities");
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

  function openEdit(item: SalesCity) {
    setEditing(item);
    setForm({ name: item.name });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editing
        ? await fetch(`/api/contact/cities/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/contact/cities", {
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

  async function handleDelete(item: SalesCity) {
    await fetch(`/api/contact/cities/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: SalesCity, direction: "up" | "down") {
    await fetch(`/api/contact/cities/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Sales Enquiry Cities</h1>
        <p className="admin-page-subtitle">
          Cities listed in the &quot;Select City&quot; dropdown of the Sales Enquiry form on the Contact page.
        </p>
      </div>

      <CrudTable<SalesCity>
        title="Cities"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add City"
        emptyLabel="No cities yet. Add the first one."
        columns={[
          { key: "name", label: "City", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit City" : "Add City"}
        width="400px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">City Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Visakhapatnam"
              className="admin-input"
            />
          </div>

          {error && <p className="admin-alert-error">{error}</p>}

          <button type="submit" disabled={saving} className="admin-btn-primary w-full">
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
}