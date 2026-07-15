"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/admin/ImageUploader";
import { Plus, Trash2 } from "lucide-react";

interface Category { _id: string; name: string }
interface Duration { _id: string; label: string }
interface Bullet { _id: string; text: string }
interface PriceRow { duration: string; price: string }
interface OttRow { name: string; image: string }

interface Plan {
  _id: string;
  name: string;
  category: Category | string;
  speed: number;
  speedUnit: "Mbps" | "Gbps";
  prices: { duration: Duration | string; price: number }[];
  bullets: (Bullet | string)[];
  ottList: OttRow[];
  mostPopular: boolean;
  order: number;
}

const EMPTY_FORM = {
  name: "",
  category: "",
  speed: "",
  speedUnit: "Mbps" as "Mbps" | "Gbps",
  prices: [] as PriceRow[],
  bullets: [] as string[],
  ottList: [] as OttRow[],
  mostPopular: false,
};

function idOf(v: { _id: string } | string): string {
  return typeof v === "string" ? v : v._id;
}
function labelOf(v: { label?: string; name?: string } | string, fallback = ""): string {
  return typeof v === "string" ? fallback : v.label || v.name || fallback;
}

export default function AdminPlansPage() {
  const [items, setItems] = useState<Plan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const [plansRes, catRes, durRes, bulletRes] = await Promise.all([
      fetch("/api/plans"),
      fetch("/api/plans/categories"),
      fetch("/api/plans/durations"),
      fetch("/api/plans/bullets"),
    ]);
    setItems(await plansRes.json());
    setCategories(await catRes.json());
    setDurations(await durRes.json());
    setBullets(await bulletRes.json());
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

  function openEdit(item: Plan) {
    setEditing(item);
    setForm({
      name: item.name,
      category: idOf(item.category),
      speed: String(item.speed),
      speedUnit: item.speedUnit,
      prices: item.prices.map((p) => ({ duration: idOf(p.duration), price: String(p.price) })),
      bullets: item.bullets.map(idOf),
      ottList: item.ottList || [],
      mostPopular: item.mostPopular,
    });
    setError(null);
    setModalOpen(true);
  }

  function addPriceRow() {
    setForm((p) => ({ ...p, prices: [...p.prices, { duration: "", price: "" }] }));
  }
  function updatePriceRow(idx: number, patch: Partial<PriceRow>) {
    setForm((p) => ({
      ...p,
      prices: p.prices.map((row, i) => (i === idx ? { ...row, ...patch } : row)),
    }));
  }
  function removePriceRow(idx: number) {
    setForm((p) => ({ ...p, prices: p.prices.filter((_, i) => i !== idx) }));
  }

  function addOttRow() {
    setForm((p) => ({ ...p, ottList: [...p.ottList, { name: "", image: "" }] }));
  }
  function updateOttRow(idx: number, patch: Partial<OttRow>) {
    setForm((p) => ({
      ...p,
      ottList: p.ottList.map((row, i) => (i === idx ? { ...row, ...patch } : row)),
    }));
  }
  function removeOttRow(idx: number) {
    setForm((p) => ({ ...p, ottList: p.ottList.filter((_, i) => i !== idx) }));
  }

  function toggleBullet(id: string) {
    setForm((p) => ({
      ...p,
      bullets: p.bullets.includes(id) ? p.bullets.filter((b) => b !== id) : [...p.bullets, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        speed: Number(form.speed),
        speedUnit: form.speedUnit,
        prices: form.prices
          .filter((p) => p.duration && p.price !== "")
          .map((p) => ({ duration: p.duration, price: Number(p.price) })),
        bullets: form.bullets,
        ottList: form.ottList.filter((o) => o.name),
        mostPopular: form.mostPopular,
      };

      const res = editing
        ? await fetch(`/api/plans/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/plans", {
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

  async function handleDelete(item: Plan) {
    await fetch(`/api/plans/${item._id}`, { method: "DELETE" });
    await load();
  }

  async function handleReorder(item: Plan, direction: "up" | "down") {
    await fetch(`/api/plans/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    await load();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Plans</h1>
        <p className="admin-page-subtitle">
          Broadband plans shown on the Plans page and the Home page&apos;s featured plan category.
        </p>
      </div>

      <CrudTable<Plan>
        title="Plans"
        items={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        getItemLabel={(item) => item.name}
        addLabel="Add Plan"
        emptyLabel="No plans yet. Add the first one."
        columns={[
          { key: "name", label: "Name", render: (i) => <span className="font-medium text-gray-900">{i.name}</span> },
          { key: "category", label: "Category", render: (i) => labelOf(i.category, "—") },
          { key: "speed", label: "Speed", render: (i) => `${i.speed} ${i.speedUnit}` },
          { key: "prices", label: "Prices", render: (i) => `${i.prices.length} tier(s)` },
          {
            key: "mostPopular",
            label: "Popular",
            render: (i) =>
              i.mostPopular ? (
                <span className="inline-block rounded-full bg-red-50 text-red-600 text-xs font-medium px-2 py-0.5">
                  Most Popular
                </span>
              ) : (
                "—"
              ),
          },
        ]}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Plan" : "Add Plan"}
        width="640px"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="admin-label">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Home Fiber 100"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="admin-input"
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label">Speed</label>
              <input
                required
                type="number"
                min={1}
                value={form.speed}
                onChange={(e) => setForm((p) => ({ ...p, speed: e.target.value }))}
                placeholder="e.g. 100"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Speed Unit</label>
              <select
                value={form.speedUnit}
                onChange={(e) => setForm((p) => ({ ...p, speedUnit: e.target.value as "Mbps" | "Gbps" }))}
                className="admin-input"
              >
                <option value="Mbps">Mbps</option>
                <option value="Gbps">Gbps</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.mostPopular}
              onChange={(e) => setForm((p) => ({ ...p, mostPopular: e.target.checked }))}
              className="rounded border-gray-300"
            />
            Mark as &quot;Most Popular&quot;
          </label>

          {/* Prices */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Prices by Duration</label>
              <button
                type="button"
                onClick={addPriceRow}
                className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--brand-red)" }}
              >
                <Plus size={14} /> Add Price
              </button>
            </div>
            <div className="space-y-2">
              {form.prices.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <select
                    required
                    value={row.duration}
                    onChange={(e) => updatePriceRow(idx, { duration: e.target.value })}
                    className="admin-input flex-1"
                  >
                    <option value="">Duration…</option>
                    {durations.map((d) => (
                      <option key={d._id} value={d._id}>{d.label}</option>
                    ))}
                  </select>
                  <input
                    required
                    type="number"
                    min={0}
                    placeholder="Price ₹"
                    value={row.price}
                    onChange={(e) => updatePriceRow(idx, { price: e.target.value })}
                    className="admin-input w-28"
                  />
                  <button type="button" onClick={() => removePriceRow(idx)} className="admin-icon-btn admin-icon-btn-danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.prices.length === 0 && (
                <p className="text-xs text-gray-400">No prices added yet.</p>
              )}
            </div>
          </div>

          {/* Bullets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Points</label>
            <div className="flex flex-wrap gap-2">
              {bullets.map((b) => {
                const active = form.bullets.includes(b._id);
                return (
                  <button
                    key={b._id}
                    type="button"
                    onClick={() => toggleBullet(b._id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium border ${
                      active
                        ? "bg-red-50 border-red-300 text-red-600"
                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {b.text}
                  </button>
                );
              })}
              {bullets.length === 0 && (
                <p className="text-xs text-gray-400">No bullet points yet — add some under Plan Bullet Points.</p>
              )}
            </div>
          </div>

          {/* OTT list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">OTT Apps Included</label>
              <button
                type="button"
                onClick={addOttRow}
                className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--brand-red)" }}
              >
                <Plus size={14} /> Add OTT
              </button>
            </div>
            <div className="space-y-3">
              {form.ottList.map((row, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                  <ImageUploader
                    folder="ott-icons"
                    value={row.image}
                    onChange={(url) => updateOttRow(idx, { image: url })}
                    className="w-24 shrink-0"
                  />
                  <div className="flex-1">
                    <input
                      placeholder="OTT name e.g. Netflix"
                      value={row.name}
                      onChange={(e) => updateOttRow(idx, { name: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <button type="button" onClick={() => removeOttRow(idx)} className="admin-icon-btn admin-icon-btn-danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.ottList.length === 0 && (
                <p className="text-xs text-gray-400">No OTT apps added yet.</p>
              )}
            </div>
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