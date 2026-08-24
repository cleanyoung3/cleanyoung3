import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExpandableRow } from "@/components/admin/ExpandableRow";
import { SERVICE_LABEL, type ServiceKey } from "@/lib/quote-config";

function formatDate(d: Date) {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

export default async function QuoteRequestsPage() {
  await requireSitePermission();
  const requests = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-ink">고객견적요청</h1>
      <p className="mt-1 text-sm text-ink-soft">총 {requests.length}건</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-ink-soft">
              <th className="px-3 py-3 font-medium">이름</th>
              <th className="px-3 py-3 font-medium">연락처</th>
              <th className="px-3 py-3 font-medium">서비스</th>
              <th className="px-3 py-3 font-medium">지역</th>
              <th className="px-3 py-3 font-medium">접수일</th>
              <th />
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
                  summary={
                    <>
                      <td className="px-3 py-3.5 font-medium text-ink">{r.name}</td>
                      <td className="px-3 py-3.5">{r.phone}</td>
                      <td className="px-3 py-3.5">
                        {services.map((s) => SERVICE_LABEL[s] ?? s).join(", ")}
                      </td>
                      <td className="px-3 py-3.5">
                        {r.region}
                        {r.regionDetail ? ` (${r.regionDetail})` : ""}
                      </td>
                      <td className="px-3 py-3.5">{formatDate(r.createdAt)}</td>
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
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-16 text-center text-ink-soft">
                  접수된 견적 요청이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
