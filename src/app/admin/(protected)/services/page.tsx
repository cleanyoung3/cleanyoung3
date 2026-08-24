import Image from "next/image";
import Link from "next/link";
import { requireSitePermission } from "@/lib/auth";
import { getAllServicePages } from "@/lib/service-data";

export default async function AdminServicesPage() {
  await requireSitePermission();
  const services = await getAllServicePages();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-xl font-bold text-ink">주요서비스 관리</h1>
      <p className="mt-1 text-sm text-ink-soft">
        에어컨 분해 청소・소파・매트리스 케어・입주・이사 청소 각 서비스 페이지의 이미지와 문구를 수정합니다.
      </p>

      <div className="mt-6 space-y-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/services/${s.slug}/edit`}
            className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={s.heroImage}
              alt=""
              width={100}
              height={90}
              className="h-16 w-20 shrink-0 rounded-lg border border-black/5 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">
                {s.badge} · {s.headline}
              </p>
              <p className="mt-0.5 truncate text-xs text-ink-soft">{s.subCopy}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-primary">수정 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
