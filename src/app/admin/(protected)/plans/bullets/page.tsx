"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface PlanBullet {
  _id: string;
  text: string;
  order: number;
}

export default function AdminPlanBulletsPage() {
  const [items, setItems] = useState<PlanBullet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PlanBullet | null>(null);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/plans/bullets");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditing(null);
    setText("");
    setModalOpen(true);
  }

  function openEdit(item: PlanBullet) {
    setEditing(item);
    setText(item.text);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/plans/bullets/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      } else {
        await fetch("/api/plans/bullets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      }
      setModalOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: PlanBullet) {
    await fetch(`/api/plans/bullets/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: PlanBullet, direction: "up" | "down") {
    await fetch(`/api/plans/bullets/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Plan Bullet Points</h1>
        <p className="admin-page-subtitle">
          Reusable feature bullets (e.g. Free Installation) that plans can pick from.
        </p>
      </div>

      <CrudTable<PlanBullet>
        title="Bullet Points"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.text}
        addLabel="Add Bullet"
        emptyLabel="No bullet points yet. Add the first one."
        columns={[{ key: "text", label: "Text", render: (i) => i.text }]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Bullet" : "Add Bullet"}
        width="420px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Text</label>
            <input
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Free Installation"
              className="admin-input"
            />
          </div>
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