import { requireAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WorkPage() {
  const session = await requireAdminSession();
  if (!session.isMain && !session.canManageWork) {
    redirect("/admin");
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-soft/30 bg-white py-24 text-center">
      <span className="text-4xl">🚧</span>
      <h1 className="mt-4 font-display text-xl font-bold text-ink">업무 관리 페이지 공사중입니다</h1>
      <p className="mt-2 text-sm text-ink-soft">더 나은 기능으로 곧 찾아뵙겠습니다.</p>
    </div>
  );
}
