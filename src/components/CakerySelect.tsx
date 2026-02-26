"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string; icon?: React.ReactNode };

export default function CakerySelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "Bitte wählen",
    [options, value]
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="space-y-1" ref={ref}>
      <span className="cakery-label">{label}</span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cakery-select flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{currentLabel}</span>
        <span className="ml-3 text-lg font-semibold leading-none text-black/50">▾</span>
      </button>

      {open ? (
        <div
          className="mt-2 overflow-hidden rounded-xl border bg-white shadow-lg"
          style={{ borderColor: "var(--border)" }}
          role="listbox"
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={[
                  "block w-full px-3 py-2 text-left text-sm transition",
                  active
                    ? "bg-black/5 font-medium"
                    : "hover:bg-black/5",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
              {o.icon ? (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/5">
                  {o.icon}
                </span>
              ) : null}
              <span className="truncate">{o.label}</span>
            </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
