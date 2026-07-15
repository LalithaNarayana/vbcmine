"use client";

import { useMemo, useState } from "react";
import { LUCIDE_ICON_NAMES } from "@/constants/lucideIconNames";
import AppIcon from "./DynamicIcon";
import { X, Search } from "lucide-react";

interface IconPickerProps {
  /** Currently selected icon name (kebab-case), or "" if none */
  value?: string;
  /** Called with the chosen kebab-case icon name */
  onChange: (name: string) => void;
  label?: string;
}

export default function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return LUCIDE_ICON_NAMES.slice(0, 60);
    const q = query.trim().toLowerCase();
    return LUCIDE_ICON_NAMES.filter((name) => name.includes(q)).slice(0, 100);
  }, [query]);

  return (
    <div className="relative">
      {label && (
        <label className="admin-label">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-gray-400 bg-white"
      >
        {value ? (
          <>
            <AppIcon name={value} size={18} className="text-gray-700" />
            <span className="text-gray-700">{value}</span>
          </>
        ) : (
          <span className="text-gray-400">Choose an icon…</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20 px-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-800">
                Choose an icon
              </span>
              <button onClick={() => setOpen(false)}>
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search icons e.g. wifi, shield, phone…"
                  className="flex-1 text-sm outline-none"
                />
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto p-3 grid grid-cols-6 gap-2">
              {results.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                    setQuery("");
                  }}
                  title={name}
                  className={`flex flex-col items-center justify-center gap-1 rounded-lg p-2 hover:bg-gray-100 ${
                    value === name ? "bg-red-50 ring-1 ring-red-300" : ""
                  }`}
                >
                  <AppIcon name={name} size={20} className="text-gray-700" />
                </button>
              ))}
              {results.length === 0 && (
                <p className="col-span-6 text-center text-sm text-gray-400 py-6">
                  No icons found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}