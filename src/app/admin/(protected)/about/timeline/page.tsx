"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface TimelineItem {
  _id: string;
  year: string;
  description: string;
  order: number;
}

export default function AdminAboutTimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const [form, setForm] = useState({ year: "", description: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/about/timeline");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ year: "", description: "" });
    setModalOpen(true);
  }

  function openEdit(item: TimelineItem) {
    setEditing(item);
    setForm({ year: item.year, description: item.description });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/about/timeline/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/about/timeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setModalOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: TimelineItem) {
    await fetch(`/api/about/timeline/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: TimelineItem, direction: "up" | "down") {
    await fetch(`/api/about/timeline/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Success Story Timeline</h1>
        <p className="admin-page-subtitle">
          The year-by-year milestones shown on the About page&apos;s Our Success Story section.
        </p>
      </div>

      <CrudTable<TimelineItem>
        title="Timeline"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => `${item.year}`}
        addLabel="Add Milestone"
        emptyLabel="No timeline items yet. Add the first one."
        columns={[
          { key: "year", label: "Year", render: (i) => <span className="font-medium text-gray-900">{i.year}</span> },
          {
            key: "description",
            label: "Description",
            render: (i) => (
              <span className="text-gray-600 line-clamp-2">{i.description}</span>
            ),
          },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Milestone" : "Add Milestone"}
        width="480px"
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FormField
            label="Year"
            placeholder="e.g. 2012"
            value={form.year}
            onChange={(v) => setForm((p) => ({ ...p, year: v }))}
          />
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "#1A1A1A", fontWeight: 600, marginBottom: "6px" }}>
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="What happened this year..."
              style={{
                width: "100%",
                padding: "9px 12px",
                fontSize: "14px",
                background: "#F5F5F5",
                border: "1px solid rgba(0,0,0,0.12)",
                color: "#1A1A1A",
                resize: "vertical",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#CC0000",
              color: "#fff",
              border: "none",
              padding: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "13px", color: "#1A1A1A", fontWeight: 600, marginBottom: "6px" }}>
        {label}
      </label>
      <input
        required
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "9px 12px",
          fontSize: "14px",
          background: "#F5F5F5",
          border: "1px solid rgba(0,0,0,0.12)",
          color: "#1A1A1A",
        }}
      />
    </div>
  );
}