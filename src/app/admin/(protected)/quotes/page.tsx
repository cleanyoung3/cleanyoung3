import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExpandableRow } from "@/components/admin/ExpandableRow";
import { RequestActions } from "@/components/admin/RequestActions";
import { SERVICE_LABEL, type ServiceKey } from "@/lib/quote-config";
import { updateQuoteStatus, deleteQuoteRequest } from "./actions";
import type { QuoteRequest } from "@prisma/client";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

const SECTIONS = [
  { status: "신규접수", title: "신규접수", showStatusButtons: true },
  { status: "상담진행", title: "상담진행", showStatusButtons: false },
  { status: "보류", title: "보류", showStatusButtons: false },
];

function QuoteTable({
  requests,
  showStatusButtons,
}: {
  requests: QuoteRequest[];
  showStatusButtons: boolean;
}) {
  if (requests.length === 0) {
    return <p className="px-3 py-10 text-center text-sm text-ink-soft">해당 항목이 없습니다.</p>;
  }

  return (
    <table className="w-full min-w-[720px] text-sm">
      <thead>
        <tr className="border-b border-black/5 text-left text-ink-soft">
          <th className="px-3 py-3 font-medium">이름</th>
          <th className="px-3 py-3 font-medium">연락처</th>
          <th className="px-3 py-3 font-medium">서비스</th>
          <th className="px-3 py-3 font-medium">지역</th>
          <th className="px-3 py-3 font-medium">접수일</th>
          <th className="px-3 py-3 font-medium text-right">처리</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => {
          const services: ServiceKey[] = JSON.parse(r.services || "[]");
          const details: Record<string, { type?: string; count?: string }> = JSON.parse(
            r.detailAnswers || "{}"
          );
          return (
            <ExpandableRow
              key={r.id}
              colSpan={7}
              summary={
                <>
                  <td className="px-3 py-3.5 font-medium text-ink">{r.name}</td>
                  <td className="px-3 py-3.5">{r.phone}</td>
                  <td className="px-3 py-3.5">{services.map((s) => SERVICE_LABEL[s] ?? s).join(", ")}</td>
                  <td className="px-3 py-3.5">
                    {r.region}
                    {r.regionDetail ? ` (${r.regionDetail})` : ""}
                  </td>
                  <td className="px-3 py-3.5">{formatDate(r.createdAt)}</td>
                  <td className="px-3 py-3.5">
                    <RequestActions
                      id={r.id}
                      showStatusButtons={showStatusButtons}
                      onSetStatus={updateQuoteStatus}
                      onDelete={deleteQuoteRequest}
                    />
                  </td>
                </>
              }
            >
              <div className="space-y-1.5">
                <p>
                  <span className="font-semibold text-ink">희망 일정</span> {r.preferredDate}
                </p>
                {services.map((s) => (
                  <p key={s}>
                    <span className="font-semibold text-ink">{SERVICE_LABEL[s] ?? s}</span>{" "}
                    {details[s]?.type ?? "-"} {details[s]?.count ? `/ ${details[s]?.count}` : ""}
                  </p>
                ))}
              </div>
            </ExpandableRow>
          );
        })}
      </tbody>
    </table>
  );
}

export default async function QuoteRequestsPage() {
  await requireSitePermission();
  const requests = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">고객견적요청</h1>
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
              <QuoteTable requests={filtered} showStatusButtons={section.showStatusButtons} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
