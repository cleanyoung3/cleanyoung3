import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";
import { getPageBanner } from "@/lib/site-data";

export const metadata = { title: "공지사항 | 청소청년" };

const PAGE_SIZE = 15;

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [notices, total, banner] = await Promise.all([
    prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.notice.count(),
    getPageBanner("notices"),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHero
        eyebrow={banner?.eyebrow ?? "공지사항"}
        lead={banner?.lead ?? "청소청년에 대한"}
        title={banner?.title ?? ["최신 소식과 공지사항을", "알려드립니다."]}
        mediaType={banner?.mediaType}
        mediaUrl={banner?.mediaUrl}
      />

      <section className="mx-auto flex min-h-[700px] max-w-6xl flex-col justify-center px-4 py-12 md:px-6 md:py-16">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[16.8px]">
            <thead>
              <tr className="border-b-2 border-primary text-ink-soft">
                <th className="w-20 py-3 text-center font-medium">번호</th>
                <th className="py-3 text-left font-medium">제목</th>
                <th className="w-28 py-3 text-center font-medium">작성자</th>
                <th className="w-32 py-3 text-center font-medium">작성일</th>
                <th className="w-20 py-3 text-center font-medium">조회수</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n, i) => (
                <tr key={n.id} className="border-b border-black/5 hover:bg-slate-50">
                  <td className="py-3.5 text-center">
                    {n.isPinned ? (
                      <span className="inline-block rounded bg-primary px-2 py-1 text-[13.2px] font-bold text-white">
                        Notice
                      </span>
                    ) : (
                      <span className="text-ink-soft">{total - (page - 1) * PAGE_SIZE - i}</span>
                    )}
                  </td>
                  <td className="py-3.5">
                    <Link href={`/notices/${n.id}`} className="font-medium text-ink hover:text-primary">
                      {n.title}
                    </Link>
                  </td>
                  <td className="py-3.5 text-center text-ink-soft">{n.authorName}</td>
                  <td className="py-3.5 text-center text-ink-soft">{formatDate(n.createdAt)}</td>
                  <td className="py-3.5 text-center text-ink-soft">{n.viewCount}</td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-ink-soft">
                    등록된 공지사항이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link
                key={i}
                href={`/notices?page=${i + 1}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[16.8px] font-medium ${
                  page === i + 1 ? "bg-primary text-white" : "text-ink-soft hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
