import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExpandableRow } from "@/components/admin/ExpandableRow";
import { RequestActions } from "@/components/admin/RequestActions";
import { updatePartnershipStatus, deletePartnershipRequest } from "./actions";
import type { PartnershipRequest } from "@prisma/client";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

const SECTIONS = [
  { status: "신규접수", title: "신규접수", showStatusButtons: true },
  { status: "상담진행", title: "상담진행", showStatusButtons: false },
  { status: "보류", title: "보류", showStatusButtons: false },
];

function PartnershipTable({
  requests,
  showStatusButtons,
}: {
  requests: PartnershipRequest[];
  showStatusButtons: boolean;
}) {
  if (requests.length === 0) {
    return <p className="px-3 py-10 text-center text-sm text-ink-soft">해당 항목이 없습니다.</p>;
  }

  return (
    <table className="w-full min-w-[720px] text-sm">
      <thead>
        <tr className="border-b border-black/5 text-left text-ink-soft">
          <th className="px-3 py-3 font-medium">회사명</th>
          <th className="px-3 py-3 font-medium">담당자</th>
          <th className="px-3 py-3 font-medium">연락처</th>
          <th className="px-3 py-3 font-medium">서비스</th>
          <th className="px-3 py-3 font-medium">접수일</th>
          <th className="px-3 py-3 font-medium text-right">처리</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => (
          <ExpandableRow
            key={r.id}
            colSpan={7}
            summary={
              <>
                <td className="px-3 py-3.5 font-medium text-ink">{r.companyName}</td>
                <td className="px-3 py-3.5">{r.contactName}</td>
                <td className="px-3 py-3.5">{r.phone}</td>
                <td className="px-3 py-3.5">{r.serviceType}</td>
                <td className="px-3 py-3.5">{formatDate(r.createdAt)}</td>
                <td className="px-3 py-3.5">
                  <RequestActions
                    id={r.id}
                    showStatusButtons={showStatusButtons}
                    onSetStatus={updatePartnershipStatus}
                    onDelete={deletePartnershipRequest}
                  />
                </td>
              </>
            }
          >
            <p>
              <span className="font-semibold text-ink">이메일</span> {r.email}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{r.message}</p>
          </ExpandableRow>
        ))}
      </tbody>
    </table>
  );
}

export default async function PartnershipRequestsPage() {
  await requireSitePermission();
  const requests = await prisma.partnershipRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">업무제휴요청</h1>
        <p className="mt-1 text-sm text-ink-soft">총 {requests.length}건</p>
      </div>

      {SECTIONS.map((section) => {
        const filtered = requests.filter((r) => r.status === section.status);
        return (
          <section key={section.status}>
            <h2 className="mb-3 font-display text-base font-bold text-primary">
              {section.title} <span className="text-sm font-normal text-ink-soft">({filtered.length}건)</span>
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
              <PartnershipTable requests={filtered} showStatusButtons={section.showStatusButtons} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
