import { requireSitePermission } from "@/lib/auth";
import { createNotice } from "../actions";

export default async function NewNoticePage() {
  await requireSitePermission();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">새 공지사항 작성</h1>
      <form action={createNotice} className="mt-6 space-y-4">
        <input name="title" required placeholder="제목" className="input" />
        <textarea name="content" required rows={10} placeholder="내용" className="input resize-none" />
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="isPinned" className="h-4 w-4 accent-primary" /> 상단 고정 (Notice)
        </label>
        <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          등록
        </button>
      </form>
    </div>
  );
}
