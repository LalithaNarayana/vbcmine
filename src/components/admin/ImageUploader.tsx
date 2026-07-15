"use client";

import { useRef, useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  /** Current image URL, if any */
  value?: string;
  /** Called with the new S3 URL after a successful upload, or "" on remove */
  onChange: (url: string) => void;
  /** S3 folder to organize uploads, e.g. "banners", "logos", "plans" */
  folder: string;
  /** Optional label above the uploader */
  label?: string;
  /** Aspect/preview box sizing */
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder,
  label,
  className = "",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (value) formData.append("oldUrl", value);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="admin-label">
          {label}
        </label>
      )}

      <div className="relative w-full aspect-video max-w-xs rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:border-red-300 transition-colors flex items-center justify-center overflow-hidden">
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-full object-contain bg-white" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white shadow"
            >
              <X size={14} className="text-gray-700" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 text-xs py-6"
          >
            {uploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Upload size={20} />
            )}
            {uploading ? "Uploading..." : "Click to upload"}
          </button>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
        >
          {uploading ? "Uploading..." : "Replace image"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}