import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { logoutAction } from "../login/actions";

export const metadata: Metadata = { title: "관리자 페이지 | 청소청년" };

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  const navItems = [
    { href: "/admin", label: "대시보드" },
    ...(session.isMain || session.canManageSite
      ? [
          { href: "/admin/site", label: "메인페이지 수정" },
          { href: "/admin/services", label: "주요서비스 관리" },
          { href: "/admin/banners", label: "페이지 배너 관리" },
          { href: "/admin/testimonials", label: "고객후기 관리" },
          { href: "/admin/notices", label: "공지사항 관리" },
          { href: "/admin/faq", label: "고객센터 관리" },
          { href: "/admin/partnerships", label: "업무제휴요청" },
          { href: "/admin/quotes", label: "고객견적요청" },
        ]
      : []),
    ...(session.isMain ? [{ href: "/admin/accounts", label: "계정 관리" }] : []),
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px-260px)]">
      <aside className="hidden w-56 shrink-0 bg-secondary text-white md:block">
        <div className="border-b border-white/15 px-5 py-5">
          <p className="text-xs text-white/70">{session.displayName}</p>
          <p className="text-sm font-bold">{session.isMain ? "메인 관리자" : "관리자"}</p>
        </div>
        <nav className="flex flex-col py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full px-5 py-3 text-left text-sm font-medium text-white/70 hover:bg-white/10"
            >
              로그아웃
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 bg-slate-50 px-4 py-6 md:px-8 md:py-8">{children}</div>
    </div>
  );
}
