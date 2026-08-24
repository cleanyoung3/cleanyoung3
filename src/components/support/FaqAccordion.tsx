"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t-2 border-primary">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center gap-3 py-4 text-left"
            >
              <span className="font-display text-[19.2px] font-bold text-primary">Q</span>
              <span className="flex-1 text-[16.8px] font-medium text-ink md:text-[18px]">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="rounded-lg bg-slate-50 px-4 py-4 text-[16.8px] leading-relaxed text-ink-soft">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
      {items.length === 0 && (
        <p className="py-16 text-center text-[16.8px] text-ink-soft">등록된 질문이 없습니다.</p>
      )}
    </div>
  );
}
