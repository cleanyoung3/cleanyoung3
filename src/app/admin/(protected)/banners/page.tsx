import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BannerForm } from "@/components/admin/BannerForm";
import { updatePageBanner } from "./actions";

const LABELS: Record<string, string> = {
  services: "주요 서비스",
  notices: "공지사항",
  support: "고객센터",
  partnership: "업무제휴",
  story: "청년 스토리",
};

const ORDER = ["services", "notices", "support", "partnership", "story"];

export default async function AdminBannersPage() {
  await requireSitePermission();
  const banners = await prisma.pageBanner.findMany();
  const map = Object.fromEntries(banners.map((b) => [b.pageKey, b]));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">페이지 배너 관리</h1>
        <p className="mt-1 text-sm text-ink-soft">
          주요 서비스・공지사항・고객센터・업무제휴・청년 스토리 페이지 최상단 배너의 문구와 배경(이미지/동영상)을
          수정합니다.
        </p>
      </div>

      {ORDER.map((key) => {
        const b = map[key];
        if (!b) return null;
        return (
          <BannerForm
            key={key}
            label={LABELS[key]}
            action={updatePageBanner.bind(null, key)}
            initial={{
              eyebrow: b.eyebrow,
              lead: b.lead,
              titleLine1: b.titleLine1,
              titleLine2: b.titleLine2,
              mediaType: b.mediaType,
              mediaUrl: b.mediaUrl,
            }}
          />
        );
      })}
    </div>
  );
}
