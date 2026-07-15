"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import IconPicker from "@/components/admin/IconPicker";
import DynamicIcon from "@/components/admin/DynamicIcon";

interface PlanCategory {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  order: number;
}

const EMPTY_FORM = { name: "", icon: "wifi", description: "" };

export default function AdminPlanCategoriesPage() {
  const [items, setItems] = useState<PlanCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PlanCategory | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/plans/categories");
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

  function openEdit(item: PlanCategory) {
    setEditing(item);
    setForm({ name: item.name, icon: item.icon, description: item.description || "" });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editing
        ? await fetch(`/api/plans/categories/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/plans/categories", {
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

  async function handleDelete(item: PlanCategory) {
    const res = await fetch(`/api/plans/categories/${item._id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete.");
      return;
    }
    await load();
  }

  async function handleReorder(item: PlanCategory, direction: "up" | "down") {
    await fetch(`/api/plans/categories/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Plan Categories</h1>
        <p className="admin-page-subtitle">
          Groups plans on the Broadband Plans page, e.g. Broadband, TV, Combo.
        </p>
      </div>

      <CrudTable<PlanCategory>
        title="Categories"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add Category"
        emptyLabel="No categories yet. Add the first one."
        columns={[
          {
            key: "icon",
            label: "Icon",
            render: (i) => <DynamicIcon name={i.icon} size={20} className="text-gray-700" />,
          },
          { key: "name", label: "Name", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
          { key: "description", label: "Description", render: (i) => i.description || "—" },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Category" : "Add Category"}
        width="440px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Broadband"
              className="admin-input"
            />
          </div>

          <IconPicker
            label="Icon"
            value={form.icon}
            onChange={(name) => setForm((p) => ({ ...p, icon: name }))}
          />

          <div>
            <label className="admin-label">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Optional short description"
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