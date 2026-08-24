import { requireMainAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewAccountForm } from "./NewAccountForm";
import { deleteSubAccount, togglePermission } from "./actions";

export default async function AccountsPage() {
  await requireMainAdmin();
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">계정 관리</h1>
        <p className="mt-1 text-sm text-ink-soft">
          메인 아이디를 포함하여 최대 5개까지 계정을 생성할 수 있습니다. ({users.length} / 5)
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-ink-soft">
              <th className="px-5 py-3 font-medium">이름</th>
              <th className="px-5 py-3 font-medium">아이디</th>
              <th className="px-5 py-3 font-medium">권한</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-black/5 last:border-0">
                <td className="px-5 py-3.5 font-medium text-ink">
                  {u.displayName}
                  {u.isMain && (
                    <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-bold text-primary">
                      메인
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{u.username}</td>
                <td className="px-5 py-3.5">
                  {u.isMain ? (
                    <span className="text-ink-soft">전체 권한</span>
                  ) : (
                    <div className="flex gap-2">
                      <form action={togglePermission.bind(null, u.id, "canManageSite")}>
                        <button
                          type="submit"
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            u.canManageSite ? "bg-secondary/15 text-secondary-dark" : "bg-slate-100 text-ink-soft"
                          }`}
                        >
                          홈페이지관리
                        </button>
                      </form>
                      <form action={togglePermission.bind(null, u.id, "canManageWork")}>
                        <button
                          type="submit"
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            u.canManageWork ? "bg-secondary/15 text-secondary-dark" : "bg-slate-100 text-ink-soft"
                          }`}
                        >
                          업무관리
                        </button>
                      </form>
                    </div>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right">
                  {!u.isMain && (
                    <form action={deleteSubAccount.bind(null, u.id)}>
                      <button type="submit" className="text-xs font-medium text-red-400 hover:text-red-500">
                        삭제
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length < 5 && (
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 font-display text-base font-bold text-ink">새 계정 추가</h2>
          <NewAccountForm />
        </div>
      )}
    </div>
  );
}
