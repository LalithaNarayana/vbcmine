"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";

interface Faq {
  _id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}

const EMPTY_FORM = { category: "", question: "", answer: "" };

export default function AdminFaqPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/faq");
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

  function openEdit(item: Faq) {
    setEditing(item);
    setForm({ category: item.category, question: item.question, answer: item.answer });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = editing
        ? await fetch(`/api/faq/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/faq", {
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

  async function handleDelete(item: Faq) {
    await fetch(`/api/faq/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Faq, direction: "up" | "down") {
    await fetch(`/api/faq/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">FAQs</h1>
        <p className="admin-page-subtitle">
          Questions and answers shown on the FAQ page, grouped by category.
        </p>
      </div>

      <CrudTable<Faq>
        title="FAQs"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.question}
        addLabel="Add FAQ"
        emptyLabel="No FAQs yet. Add the first one."
        columns={[
          { key: "category", label: "Category", render: (i) => <span className="font-medium text-gray-900">{i.category}</span> },
          { key: "question", label: "Question", render: (i) => i.question },
          { key: "answer", label: "Answer", render: (i) => <span className="line-clamp-2 text-gray-600">{i.answer}</span> },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit FAQ" : "Add FAQ"}
        width="460px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="admin-label">Category</label>
            <input
              required
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              placeholder="e.g. Plans & Pricing"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Question</label>
            <input
              required
              value={form.question}
              onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Answer</label>
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
              className="admin-input resize-vertical"
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