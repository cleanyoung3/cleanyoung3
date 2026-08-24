"use client";

import { useState } from "react";

export function RequestActions({
  id,
  showStatusButtons,
  onSetStatus,
  onDelete,
}: {
  id: string;
  showStatusButtons: boolean;
  onSetStatus: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [pending, setPending] = useState(false);

  async function handleSetStatus(e: React.MouseEvent, status: string) {
    e.stopPropagation();
    setPending(true);
    await onSetStatus(id, status);
    setPending(false);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.")) return;
    setPending(true);
    await onDelete(id);
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      {showStatusButtons && (
        <>
          <button
            type="button"
            disabled={pending}
            onClick={(e) => handleSetStatus(e, "상담진행")}
            className="rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            상담진행
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={(e) => handleSetStatus(e, "보류")}
            className="rounded-lg border border-black/10 px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50 disabled:opacity-60"
          >
            보류
          </button>
        </>
      )}
      <button
        type="button"
        disabled={pending}
        onClick={handleDelete}
        className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
      >
        삭제
      </button>
    </div>
  );
}
