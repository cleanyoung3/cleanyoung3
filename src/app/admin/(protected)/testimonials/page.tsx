import Image from "next/image";
import Link from "next/link";
import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  await requireSitePermission();
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">고객후기 관리</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          새 후기 추가
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((t) => (
          <div key={t.id} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4">
            {t.photoUrl ? (
              <Image src={t.photoUrl} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-ink-soft">
                사진 없음
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">
                {t.name} <span className="font-normal text-ink-soft">· {t.tag} · {t.reviewDate} · ★{t.rating}</span>
              </p>
              <p className="mt-0.5 truncate text-xs text-ink-soft">{t.text}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link href={`/admin/testimonials/${t.id}/edit`} className="text-xs font-medium text-primary hover:underline">
                수정
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button type="submit" className="text-xs font-medium text-red-400 hover:text-red-500">
                  삭제
                </button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-ink-soft">등록된 후기가 없습니다.</p>}
      </div>
    </div>
  );
}
