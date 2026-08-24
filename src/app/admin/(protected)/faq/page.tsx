import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createFaq } from "./actions";
import { FaqRow } from "./FaqRow";

export default async function AdminFaqPage() {
  await requireSitePermission();
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">고객센터 관리 (공통질문사항)</h1>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <FaqRow key={item.id} id={item.id} question={item.question} answer={item.answer} />
        ))}
        {items.length === 0 && <p className="text-sm text-ink-soft">등록된 질문이 없습니다.</p>}
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="mb-4 font-display text-base font-bold text-ink">새 질문 추가</h2>
        <form action={createFaq} className="space-y-3">
          <input name="question" required placeholder="질문" className="input" />
          <textarea name="answer" required rows={3} placeholder="답변" className="input resize-none" />
          <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
            추가
          </button>
        </form>
      </div>
    </div>
  );
}
