import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Counter } from "@/components/site/Counter";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/services";
import { getServicePageBySlug } from "@/lib/service-data";
import { getSiteStats, getPageBanner } from "@/lib/site-data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServicePageBySlug(slug);
  return { title: service ? `${service.headline} | 청소청년` : "청소청년" };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServicePageBySlug(slug);
  if (!service) notFound();

  const [stats, banner] = await Promise.all([getSiteStats(), getPageBanner("services")]);
  const statValue =
    service.statKey === "aircon"
      ? stats.aircon
      : service.statKey === "sofa_mattress"
        ? stats.sofaMattress
        : stats.movein;

  return (
    <>
      <PageHero
        eyebrow={banner?.eyebrow ?? "주요 서비스"}
        lead={banner?.lead ?? "청소청년의"}
        title={banner?.title ?? ["전문성과 정성으로", "완성하는 클린케어"]}
        mediaType={banner?.mediaType}
        mediaUrl={banner?.mediaUrl}
      />

      <section className="flex min-h-[700px] flex-col justify-center bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-[16.8px] font-semibold text-ink-soft">주요 서비스</p>
          <div className="mt-4 grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[14.4px] font-bold text-white">
                {service.badge}
              </span>
              <p className="mt-3 text-[19.2px] font-semibold text-ink">{service.subCopy}</p>
              <h1 className="mt-1 font-display text-[43.2px] font-bold text-primary md:text-[51.8px]">
                {service.headline}
              </h1>

              <div className="mt-5 flex w-fit items-center gap-4 rounded-xl bg-primary px-5 py-3.5 text-white shadow-md">
                <div className="text-[14.4px] leading-tight">
                  <p className="font-medium">누적 시공수</p>
                  <p className="text-[12px] text-white/70">* 2026년 8월 기준</p>
                </div>
                <Counter value={statValue} suffix="회" className="font-display text-[28.8px] font-bold" />
              </div>
            </div>
            <Image
              src={service.heroImage}
              alt={service.headline}
              width={520}
              height={460}
              className="h-[291px] w-auto justify-self-center object-contain md:h-[374px]"
              priority
            />
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-[16.8px] leading-relaxed text-ink-soft md:text-[19.2px]">
            {service.bodyText}
          </p>
        </div>
      </section>

      <section className="flex min-h-[700px] flex-col justify-center bg-slate-50 py-14 md:py-16">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-display text-[24px] font-bold text-ink md:text-[28.8px]">
            이런 고민을 하시는 고객님들께
          </h2>
          <ul className="mt-6 space-y-3">
            {service.worries.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-xl border border-black/5 bg-white px-5 py-4 text-[16.8px] text-ink-soft shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex min-h-[1000px] flex-col justify-center bg-primary py-14 text-white md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <h2 className="text-center font-display text-[28.8px] font-bold md:text-[36px]">
            {service.processTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {service.processSteps.map((step) => (
              <div key={step.title} className="flex flex-col">
                <h3 className="text-center font-display text-[16.8px] font-bold text-white md:text-[18.4px]">
                  {step.title}
                </h3>
                <div className="mt-3 flex flex-1 flex-col rounded-2xl bg-white p-5 text-ink shadow-sm">
                  <p className="text-[14.4px] font-semibold leading-relaxed text-primary">{step.desc}</p>
                  <div className="mt-3 flex flex-1 items-end justify-center">
                    <Image
                      src={step.image || service.heroImage}
                      alt={step.title}
                      width={620}
                      height={430}
                      className="h-[160px] w-auto object-contain md:h-[180px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center">
              <div className="relative inline-block">
                <span className="inline-block rounded-2xl bg-white px-8 py-3 font-display text-[21.6px] font-bold text-primary shadow-sm">
                  {service.featuresTitle}
                </span>
                <span className="absolute -bottom-2 left-9 h-4 w-4 rotate-45 bg-white" />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
              {service.features.map((f) => (
                <div key={f} className="flex flex-col items-center">
                  <div className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-white/60 px-4 text-center">
                    <p className="text-[16.8px] font-bold leading-snug text-white md:text-[18.4px]">{f}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-center">
        <p className="text-[16.8px] text-ink-soft">더 궁금하신 점이 있으신가요?</p>
        <Link
          href="/quote"
          className="mt-4 inline-block rounded-full bg-secondary px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-secondary-dark"
        >
          견적문의 및 상담하기
        </Link>
      </section>
    </>
  );
}
