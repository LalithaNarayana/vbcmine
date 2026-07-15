"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface PlanDuration {
  _id: string;
  label: string;
  months: number;
  order: number;
}

const EMPTY_FORM = { label: "", months: "" };

export default function AdminPlanDurationsPage() {
  const [items, setItems] = useState<PlanDuration[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PlanDuration | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/plans/durations");
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

  function openEdit(item: PlanDuration) {
    setEditing(item);
    setForm({ label: item.label, months: String(item.months) });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { label: form.label, months: Number(form.months) };
      const res = editing
        ? await fetch(`/api/plans/durations/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/plans/durations", {
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

  async function handleDelete(item: PlanDuration) {
    const res = await fetch(`/api/plans/durations/${item._id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete.");
      return;
    }
    await load();
  }

  async function handleReorder(item: PlanDuration, direction: "up" | "down") {
    await fetch(`/api/plans/durations/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Plan Durations</h1>
        <p className="admin-page-subtitle">
          Billing durations plans can be priced against, e.g. 1 Month, 1 Year.
        </p>
      </div>

      <CrudTable<PlanDuration>
        title="Durations"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.label}
        addLabel="Add Duration"
        emptyLabel="No durations yet. Add the first one."
        columns={[
          { key: "label", label: "Label", render: (i) => <span className="font-medium text-gray-900">{i.label}</span> },
          { key: "months", label: "Months", render: (i) => i.months },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Duration" : "Add Duration"}
        width="400px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Label</label>
            <input
              required
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              placeholder="e.g. 1 Year"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Months</label>
            <input
              required
              type="number"
              min={1}
              value={form.months}
              onChange={(e) => setForm((p) => ({ ...p, months: e.target.value }))}
              placeholder="e.g. 12"
              className="admin-input"
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