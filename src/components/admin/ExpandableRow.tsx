"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableRow({
  summary,
  children,
  colSpan = 6,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  colSpan?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        className="cursor-pointer border-b border-black/5 last:border-0 hover:bg-slate-50"
        onClick={() => setOpen((v) => !v)}
      >
        {summary}
        <td className="px-3 py-3.5 text-right">
          <ChevronDown className={`ml-auto h-4 w-4 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`} />
        </td>
      </tr>
      {open && (
        <tr className="border-b border-black/5 bg-slate-50">
          <td colSpan={colSpan} className="px-5 py-4 text-sm text-ink-soft">
            {children}
          </td>
        </tr>
      )}
    </>
  );
}
