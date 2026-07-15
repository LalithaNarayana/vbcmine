"use client";

import { useEffect, useRef, useState } from "react";
import "ckeditor5/ckeditor5.css";

interface CKEditorFieldProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: number;
}

/**
 * Wraps CKEditor 5 (self-hosted, GPL) as a controlled rich-text field.
 * Loaded client-side only (CKEditor doesn't support SSR) via a
 * dynamic import so it never breaks server rendering of admin pages.
 *
 * IMPORTANT: the modular "ckeditor5" package ships bare editor classes
 * with no plugins pre-registered (unlike the old CDN "classic build"),
 * so every plugin used by the toolbar below must be imported and passed
 * in explicitly via `config.plugins`, or `ClassicEditor.create()` throws
 * and the editor never mounts.
 *
 * Used for: Settings (address, working hours), About page descriptions,
 * Business Service descriptions, and the three Legal pages.
 */
export default function CKEditorField({
  value,
  onChange,
  label,
  placeholder = "Start typing…",
  minHeight = 200,
}: CKEditorFieldProps) {
  const editorRef = useRef<any>(null);
  const [CKComponent, setCKComponent] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);
  const [plugins, setPlugins] = useState<any[] | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all([import("@ckeditor/ckeditor5-react"), import("ckeditor5")])
      .then(([reactMod, ckMod]) => {
        if (!mounted) return;

        const {
          ClassicEditor: Editor,
          Essentials,
          Paragraph,
          Heading,
          Bold,
          Italic,
          Underline,
          Link,
          List,
          Indent,
          IndentBlock,
          BlockQuote,
          Table,
          TableToolbar,
        } = ckMod;

        setCKComponent(() => reactMod.CKEditor);
        setClassicEditor(() => Editor);
        setPlugins([
          Essentials,
          Paragraph,
          Heading,
          Bold,
          Italic,
          Underline,
          Link,
          List,
          Indent,
          IndentBlock,
          BlockQuote,
          Table,
          TableToolbar,
        ]);
        setReady(true);
      })
      .catch((err) => {
        console.error("Failed to load CKEditor:", err);
        if (mounted) setFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {label && <label className="admin-label">{label}</label>}

      <div
        className="admin-ckeditor-wrap"
        style={{ "--ck-min-height": `${minHeight}px` } as React.CSSProperties}
      >
        {failed ? (
          <div
            className="flex items-center justify-center text-sm text-red-500 border border-red-200 rounded-lg bg-red-50"
            style={{ minHeight }}
          >
            Couldn&apos;t load the editor. Please refresh the page.
          </div>
        ) : ready && CKComponent && ClassicEditor && plugins ? (
          <CKComponent
            editor={ClassicEditor}
            data={value || ""}
            config={{
              licenseKey: "GPL",
              placeholder,
              plugins,
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
                "|",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
            onReady={(editor: any) => {
              editorRef.current = editor;
            }}
            onChange={(_: any, editor: any) => {
              onChange(editor.getData());
            }}
          />
        ) : (
          <div
            className="flex items-center justify-center text-sm text-gray-400 border border-gray-200 rounded-lg bg-gray-50"
            style={{ minHeight }}
          >
            Loading editor…
          </div>
        )}
      </div>
    </div>
  );
}
