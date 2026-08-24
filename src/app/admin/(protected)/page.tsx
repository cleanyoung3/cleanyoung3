import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-ink">관리자 홈</h1>
      <p className="mt-1 text-sm text-ink-soft">{session.displayName}님, 환영합니다.</p>

      <div className="mt-8 grid max-w-xl gap-5 sm:grid-cols-2">
        <DashboardCard
          href="/admin/site"
          title="홈페이지 관리"
          desc="메인페이지, 공지사항, 고객센터, 문의 접수 관리"
          disabled={!session.isMain && !session.canManageSite}
        />
        <DashboardCard
          href="/admin/work"
          title="업무 관리"
          desc="내부 업무 관리 (준비중)"
          disabled={!session.isMain && !session.canManageWork}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  title,
  desc,
  disabled,
}: {
  href: string;
  title: string;
  desc: string;
  disabled: boolean;
}) {
  if (disabled) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-6 opacity-50">
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        <p className="mt-1.5 text-xs text-ink-soft">{desc}</p>
        <p className="mt-4 text-xs font-medium text-red-400">권한이 없습니다.</p>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="font-display text-lg font-bold text-primary">{title}</h2>
      <p className="mt-1.5 text-xs text-ink-soft">{desc}</p>
    </Link>
  );
}
