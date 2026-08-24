import Link from "next/link";
import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteNotice } from "./actions";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AdminNoticesPage() {
  await requireSitePermission();
  const notices = await prisma.notice.findMany({ orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">공지사항 관리</h1>
        <Link
          href="/admin/notices/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          새 글 작성
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-ink-soft">
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">고정</th>
              <th className="px-4 py-3 font-medium">작성일</th>
              <th className="px-4 py-3 font-medium">조회수</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3.5 font-medium text-ink">{n.title}</td>
                <td className="px-4 py-3.5">{n.isPinned ? "고정" : "-"}</td>
                <td className="px-4 py-3.5 text-ink-soft">{formatDate(n.createdAt)}</td>
                <td className="px-4 py-3.5 text-ink-soft">{n.viewCount}</td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/notices/${n.id}/edit`} className="text-xs font-medium text-primary hover:underline">
                      수정
                    </Link>
                    <form action={deleteNotice.bind(null, n.id)}>
                      <button type="submit" className="text-xs font-medium text-red-400 hover:text-red-500">
                        삭제
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-ink-soft">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
