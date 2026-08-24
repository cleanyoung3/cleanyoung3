import Image from "next/image";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { StatsBanner } from "@/components/home/StatsBanner";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { getHeroSlides, getSiteSettings, getSiteStats } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [slides, stats, settings, testimonials] = await Promise.all([
    getHeroSlides(),
    getSiteStats(),
    getSiteSettings(),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
  ]);

  const statMap = {
    aircon: stats.aircon,
    sofa_mattress: stats.sofaMattress,
    movein: stats.movein,
    consult: stats.consult,
  };

  return (
    <>
      <HeroCarousel slides={slides} stats={statMap} phone={settings.phone} />

      <StatsBanner
        stats={[
          { label: "에어컨 분해 청소 누적 시공수", value: stats.aircon, suffix: "회" },
          { label: "소파・매트리스 케어 누적 시공수", value: stats.sofaMattress, suffix: "회" },
          { label: "입주・이사 청소 누적 시공수", value: stats.movein, suffix: "회" },
          { label: "상담 및 견적문의 누적 상담수", value: stats.consult, suffix: "건" },
        ]}
      />

      <section className="flex min-h-[1000px] flex-col justify-center bg-slate-50 py-14 md:py-20">
        <div className="mx-auto mb-14 max-w-6xl px-4 md:px-6">
          <p className="text-center font-display text-[21.6px] font-semibold text-primary md:text-[28px]">고객 후기</p>
        </div>
        <TestimonialCarousel items={testimonials} />
      </section>

      <section className="flex min-h-[1000px] flex-col justify-center bg-primary py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 md:grid-cols-[1fr_auto] md:px-6">
          <div className="text-white">
            <h2 className="font-display text-[32px] font-bold leading-snug md:text-[46px]">
              청소청년을 다시 찾아주시는 이유,
              <br />
              고객님들의 진심이 담긴 후기 덕분입니다!
            </h2>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-white/85 md:text-[22px]">
              소중한 고객 후기 덕분에 더욱 정직하고 책임감 있는 서비스를 제공해 드릴 수 있었습니다.
              <br className="hidden md:block" />
              항상 감사한 마음과 초심을 잃지 않고, 더 높은 깨끗함과 더 나은 서비스로 보답하겠습니다.
            </p>
          </div>
          <Image
            src="/images/mascot-thumbsup.png"
            alt=""
            width={680}
            height={680}
            className="h-[340px] w-auto justify-self-center object-contain md:h-[560px]"
          />
        </div>
      </section>
    </>
  );
}
