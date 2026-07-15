"use client";

import { ReactNode, useState } from "react";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export interface CrudColumn<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface CrudTableProps<T extends { _id: string }> {
  title: string;
  items: T[];
  columns: CrudColumn<T>[];
  /** label shown per-item in the delete confirmation, e.g. item.name */
  getItemLabel?: (item: T) => string;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<void> | void;
  /** Optional: enables up/down reorder arrows; called with the item and direction */
  onReorder?: (item: T, direction: "up" | "down") => Promise<void> | void;
  addLabel?: string;
  emptyLabel?: string;
  loading?: boolean;
}

export default function CrudTable<T extends { _id: string }>({
  title,
  items,
  columns,
  getItemLabel,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
  addLabel = "Add New",
  emptyLabel = "Nothing here yet.",
  loading = false,
}: CrudTableProps<T>) {
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await onDelete(deleteTarget);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleReorder(item: T, direction: "up" | "down") {
    if (!onReorder) return;
    setReorderingId(item._id);
    try {
      await onReorder(item, direction);
    } finally {
      setReorderingId(null);
    }
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 className="admin-card-title">{title}</h2>
        <button
          onClick={onAdd}
          className="admin-btn-primary"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-100">
              {onReorder && <th className="px-6 py-3.5 w-16">Order</th>}
              {columns.map((col) => (
                <th key={col.key} className={`px-6 py-3.5 ${col.className ?? ""}`}>
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3.5 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (onReorder ? 2 : 1)}
                  className="px-6 py-16 text-center text-gray-400"
                >
                  <Loader2 className="inline animate-spin mr-2" size={16} />
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onReorder ? 2 : 1)}
                  className="px-6 py-16 text-center text-gray-400"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  {onReorder && (
                    <td className="px-6 py-3.5">
                      <div className="flex flex-col gap-0.5">
                        <button
                          disabled={idx === 0 || reorderingId === item._id}
                          onClick={() => handleReorder(item, "up")}
                          className="admin-icon-btn disabled:opacity-25"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          disabled={idx === items.length - 1 || reorderingId === item._id}
                          onClick={() => handleReorder(item, "down")}
                          className="admin-icon-btn disabled:opacity-25"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`px-6 py-3.5 align-middle ${col.className ?? ""}`}>
                      {col.render(item)}
                    </td>
                  ))}
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="admin-icon-btn"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="admin-icon-btn admin-icon-btn-danger"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        itemLabel={deleteTarget ? getItemLabel?.(deleteTarget) ?? "this item" : ""}
      />
    </div>
  );
}