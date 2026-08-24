import { requireSitePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HeroSlideEditor } from "./HeroSlideEditor";
import { StatEditor } from "./StatEditor";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSitePage() {
  await requireSitePermission();
  const [slides, stats, settingRows] = await Promise.all([
    prisma.heroSlide.findMany({ orderBy: { order: "asc" } }),
    prisma.siteStat.findMany(),
    prisma.siteSetting.findMany(),
  ]);
  const settings = Object.fromEntries(settingRows.map((s) => [s.key, s.value]));

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">메인페이지 수정</h1>
        <p className="mt-1 text-sm text-ink-soft">저장 후 실제 사이트에 바로 반영됩니다.</p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-base font-bold text-primary">① 메인 페이지 상단 슬라이드</h2>
        <div className="space-y-3">
          {slides.map((slide, i) => (
            <HeroSlideEditor
              key={slide.id}
              index={i}
              id={slide.id}
              presetKey={slide.presetKey}
              headline={slide.headline}
              subCopy={slide.subCopy}
              bodyText={slide.bodyText}
              imageUrl={slide.imageUrl}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold text-primary">② 메인 페이지 중간 (누적 통계)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s) => (
            <StatEditor key={s.key} statKey={s.key} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold text-primary">③ 사이트 기본 정보 / SNS 링크</h2>
        <SettingsForm settings={settings} />
      </section>
    </div>
  );
}
