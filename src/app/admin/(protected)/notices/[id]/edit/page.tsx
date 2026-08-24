import { notFound } from "next/navigation";
import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateNotice } from "../../actions";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSitePermission();
  const { id } = await params;
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) notFound();

  const boundUpdate = updateNotice.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">공지사항 수정</h1>
      <form action={boundUpdate} className="mt-6 space-y-4">
        <input name="title" required defaultValue={notice.title} placeholder="제목" className="input" />
        <textarea
          name="content"
          required
          rows={10}
          defaultValue={notice.content}
          placeholder="내용"
          className="input resize-none"
        />
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="isPinned" defaultChecked={notice.isPinned} className="h-4 w-4 accent-primary" />{" "}
          상단 고정 (Notice)
        </label>
        <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          저장
        </button>
      </form>
    </div>
  );
}
