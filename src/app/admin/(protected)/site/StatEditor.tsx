"use client";

import { useState } from "react";
import { updateStat } from "./actions";

export function StatEditor({ statKey, label, value }: { statKey: string; label: string; value: number }) {
  const [saved, setSaved] = useState(false);
  const boundUpdate = updateStat.bind(null, statKey);

  return (
    <form
      action={async (fd) => {
        await boundUpdate(fd);
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
      }}
      className="rounded-xl border border-black/5 bg-white p-4"
    >
      <p className="mb-1 text-xs font-semibold text-ink-soft">누적내용</p>
      <input name="label" defaultValue={label} className="input" />
      <p className="mb-1 mt-3 text-xs font-semibold text-ink-soft">누적수</p>
      <input name="value" type="number" defaultValue={value} className="input" />
      <button type="submit" className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white">
        저장
      </button>
      {saved && <span className="ml-3 text-xs text-secondary-dark">저장되었습니다.</span>}
    </form>
  );
}
