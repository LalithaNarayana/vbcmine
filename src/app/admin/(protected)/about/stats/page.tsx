"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface Stat {
  _id: string;
  value: string;
  label: string;
  order: number;
}

export default function AdminAboutStatsPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Stat | null>(null);
  const [form, setForm] = useState({ value: "", label: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/about/stats");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ value: "", label: "" });
    setModalOpen(true);
  }

  function openEdit(item: Stat) {
    setEditing(item);
    setForm({ value: item.value, label: item.label });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/about/stats/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/about/stats", {
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

  async function handleDelete(item: Stat) {
    await fetch(`/api/about/stats/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Stat, direction: "up" | "down") {
    await fetch(`/api/about/stats/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Stats (Red Band)</h1>
        <p className="admin-page-subtitle">
          The stat strip shown on the About page, e.g. 14+ / Years of Service.
        </p>
      </div>

      <CrudTable<Stat>
        title="Stats"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => `${item.value} — ${item.label}`}
        addLabel="Add Stat"
        emptyLabel="No stats yet. Add the first one."
        columns={[
          { key: "value", label: "Value", render: (i) => <span className="font-medium text-gray-900">{i.value}</span> },
          { key: "label", label: "Label", render: (i) => i.label },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Stat" : "Add Stat"}
        width="400px"
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FormField
            label="Value"
            placeholder="e.g. 14+"
            value={form.value}
            onChange={(v) => setForm((p) => ({ ...p, value: v }))}
          />
          <FormField
            label="Label"
            placeholder="e.g. Years of Service"
            value={form.label}
            onChange={(v) => setForm((p) => ({ ...p, label: v }))}
          />
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