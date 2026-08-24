import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";
import { getPageBanner } from "@/lib/site-data";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const notice = await prisma.notice.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => null);

  if (!notice) notFound();

  const [next, prev, banner] = await Promise.all([
    prisma.notice.findFirst({
      where: { createdAt: { gt: notice.createdAt } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.notice.findFirst({
      where: { createdAt: { lt: notice.createdAt } },
      orderBy: { createdAt: "desc" },
    }),
    getPageBanner("notices"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={banner?.eyebrow ?? "공지사항"}
        lead={banner?.lead ?? "청소청년에 대한"}
        title={banner?.title ?? ["최신 소식과 공지사항을", "알려드립니다."]}
        mediaType={banner?.mediaType}
        mediaUrl={banner?.mediaUrl}
      />

      <section className="mx-auto flex min-h-[700px] max-w-4xl flex-col justify-center px-4 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-[28.8px] font-bold text-ink">{notice.title}</h1>
        <div className="mt-3 flex items-center gap-3 border-b-2 border-primary pb-4 text-[16.8px] text-ink-soft">
          <span className="font-medium text-ink">{notice.authorName}</span>
          <span>{formatDate(notice.createdAt)}</span>
          <span>조회 {notice.viewCount}</span>
        </div>

        <div className="min-h-[200px] whitespace-pre-wrap py-10 text-[16.8px] leading-relaxed text-ink">
          {notice.content}
        </div>

        <div className="border-t-2 border-primary">
          <div className="flex items-center gap-3 border-b border-black/10 py-3.5 text-[16.8px]">
            <span className="flex items-center gap-1 text-ink-soft">
              <ChevronUp className="h-4 w-4" /> 다음글
            </span>
            {next ? (
              <Link href={`/notices/${next.id}`} className="flex-1 truncate font-medium text-ink hover:text-primary">
                {next.title}
              </Link>
            ) : (
              <span className="flex-1 text-ink-soft/50">다음 글이 없습니다.</span>
            )}
          </div>
          <div className="flex items-center gap-3 py-3.5 text-[16.8px]">
            <span className="flex items-center gap-1 text-ink-soft">
              <ChevronDown className="h-4 w-4" /> 이전글
            </span>
            {prev ? (
              <Link href={`/notices/${prev.id}`} className="flex-1 truncate font-medium text-ink hover:text-primary">
                {prev.title}
              </Link>
            ) : (
              <span className="flex-1 text-ink-soft/50">이전 글이 없습니다.</span>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/notices"
            className="inline-block rounded-full border border-ink-soft/30 px-6 py-2.5 text-[16.8px] font-medium text-ink-soft hover:border-primary hover:text-primary"
          >
            목록으로
          </Link>
        </div>
      </section>
    </>
  );
}
