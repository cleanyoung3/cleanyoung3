"use client";

import { useState } from "react";
import { updateFaq, deleteFaq } from "./actions";

export function FaqRow({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateFaq.bind(null, id);
  const boundDelete = deleteFaq.bind(null, id);

  if (editing) {
    return (
      <form
        action={async (fd) => {
          await boundUpdate(fd);
          setEditing(false);
        }}
        className="space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-4"
      >
        <input name="question" defaultValue={question} required className="input" />
        <textarea name="answer" defaultValue={answer} required rows={3} className="input resize-none" />
        <div className="flex gap-2">
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white">
            저장
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-black/10 px-4 py-2 text-xs font-medium text-ink-soft"
          >
            취소
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-ink">Q. {question}</p>
          <p className="mt-1 text-sm text-ink-soft">{answer}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => setEditing(true)} className="text-xs font-medium text-primary hover:underline">
            수정
          </button>
          <form action={boundDelete}>
            <button type="submit" className="text-xs font-medium text-red-400 hover:text-red-500">
              삭제
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
