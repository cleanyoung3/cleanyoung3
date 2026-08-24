import { PageHero } from "@/components/site/PageHero";
import { FaqAccordion } from "@/components/support/FaqAccordion";
import { prisma } from "@/lib/prisma";
import { getSiteSettings, getPageBanner } from "@/lib/site-data";

export const metadata = { title: "고객센터 | 청소청년" };

export default async function SupportPage() {
  const [faqs, settings, banner] = await Promise.all([
    prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
    getSiteSettings(),
    getPageBanner("support"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={banner?.eyebrow ?? "고객센터"}
        lead={banner?.lead ?? "청소청년에 대한"}
        title={banner?.title ?? ["고객의 목소리에 귀 기울이고,", "더 완벽한 서비스를 만들어가겠습니다."]}
        mediaType={banner?.mediaType}
        mediaUrl={banner?.mediaUrl}
      />

      <section className="mx-auto flex min-h-[700px] max-w-3xl flex-col justify-center px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
          공통질문사항
        </h2>
        <div className="mt-6">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="flex min-h-[700px] flex-col justify-center bg-primary py-14 text-center text-white md:py-16">
        <div className="mx-auto w-full max-w-2xl px-4 md:px-6">
          <p className="font-display text-[21.6px] font-semibold md:text-[24px]">안녕하세요 청소청년입니다.</p>
          <p className="mt-2 text-[16.8px] text-white/85 md:text-[19.2px]">
            서비스에 대해 궁금한 점이 있으시면
            <br />
            아래 카카오톡 또는 CS센터로 언제든 편하게 문의해 주세요.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={settings.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FEE500] px-6 py-2.5 text-[16.8px] font-bold text-[#391B1B]"
            >
              카카오톡 문의
            </a>
            <a
              href={`tel:${settings.phone.replace(/-/g, "")}`}
              className="rounded-full bg-secondary px-6 py-2.5 text-[16.8px] font-bold text-white"
            >
              {settings.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
