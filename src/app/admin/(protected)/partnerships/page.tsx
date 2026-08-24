import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExpandableRow } from "@/components/admin/ExpandableRow";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

export default async function PartnershipRequestsPage() {
  await requireSitePermission();
  const requests = await prisma.partnershipRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-ink">업무제휴요청</h1>
      <p className="mt-1 text-sm text-ink-soft">총 {requests.length}건</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-ink-soft">
              <th className="px-3 py-3 font-medium">회사명</th>
              <th className="px-3 py-3 font-medium">담당자</th>
              <th className="px-3 py-3 font-medium">연락처</th>
              <th className="px-3 py-3 font-medium">서비스</th>
              <th className="px-3 py-3 font-medium">접수일</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <ExpandableRow
                key={r.id}
                summary={
                  <>
                    <td className="px-3 py-3.5 font-medium text-ink">{r.companyName}</td>
                    <td className="px-3 py-3.5">{r.contactName}</td>
                    <td className="px-3 py-3.5">{r.phone}</td>
                    <td className="px-3 py-3.5">{r.serviceType}</td>
                    <td className="px-3 py-3.5">{formatDate(r.createdAt)}</td>
                  </>
                }
              >
                <p>
                  <span className="font-semibold text-ink">이메일</span> {r.email}
                </p>
                <p className="mt-2 whitespace-pre-wrap">{r.message}</p>
              </ExpandableRow>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-16 text-center text-ink-soft">
                  접수된 업무제휴 요청이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
