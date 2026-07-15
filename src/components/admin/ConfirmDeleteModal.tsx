"use client";

import Modal from "@/components/ui/Modal";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemLabel?: string;
  loading?: boolean;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  itemLabel = "this item",
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete confirmation" width="380px">
      <p style={{ color: "#ccc", fontSize: "14px", marginBottom: "20px" }}>
        Are you sure you want to delete <strong>{itemLabel}</strong>? This
        action cannot be undone.
      </p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            borderRadius: "10px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #CC0000, #E43B2C)",
            boxShadow: "0 6px 16px rgba(204, 0, 0, 0.35)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
}