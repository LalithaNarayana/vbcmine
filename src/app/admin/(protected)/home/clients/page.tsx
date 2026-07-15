"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/admin/ImageUploader";

interface Client {
  _id: string;
  name: string;
  logo: string;
  order: number;
}

const EMPTY_FORM = { name: "", logo: "" };

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/home/clients");
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

  function openEdit(item: Client) {
    setEditing(item);
    setForm({ name: item.name, logo: item.logo });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editing
        ? await fetch(`/api/home/clients/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/home/clients", {
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

  async function handleDelete(item: Client) {
    await fetch(`/api/home/clients/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Client, direction: "up" | "down") {
    await fetch(`/api/home/clients/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Clients</h1>
        <p className="admin-page-subtitle">Client logos shown on the Home page.</p>
      </div>

      <CrudTable<Client>
        title="Clients"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add Client"
        emptyLabel="No clients yet. Add the first one."
        columns={[
          {
            key: "logo",
            label: "Logo",
            render: (i) =>
              // eslint-disable-next-line @next/next/no-img-element
              i.logo ? <img src={i.logo} alt="" className="w-16 h-8 object-contain" /> : "—",
          },
          { key: "name", label: "Name", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Client" : "Add Client"}
        width="420px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUploader
            label="Logo"
            folder="client-logos"
            value={form.logo}
            onChange={(url) => setForm((p) => ({ ...p, logo: url }))}
          />
          <div>
            <label className="admin-label">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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