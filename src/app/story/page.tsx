import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { getPageBanner } from "@/lib/site-data";

export const metadata = {
  title: "청년 스토리 | 청소청년",
  description: "청소에 청춘을 건 청년들의 진심과 열정. 청소청년 매니저들이 직접 책임지는 에어컨 청소, 입주・이사 청소 서비스 철학을 소개합니다.",
};
export const dynamic = "force-dynamic";

const PHILOSOPHY = [
  {
    title: "청소청년 매니저",
    desc: "철저한 실습과 경험을 통해 청소청년 매니저가 된 직원만 시공에 참여합니다.",
    image: "/images/mascot-id-card.png",
  },
  {
    title: "정직하고 철저한 견적",
    desc: "정직하게 서비스에 대한 비용만 청구하며, 드린 견적서에서 추가금 또는 비용변동이 없습니다.",
    image: "/images/illustration-consult.png",
  },
  {
    title: "확실한 에프터서비스",
    desc: "고객님이 만족하실때 까지 책임지고 서비스를 제공해 드립니다.",
    image: "/images/illustration-checklist.png",
  },
];

const PROCESS = [
  { title: "상담 및 견적문의", desc: "요청주신서비스에 대해 매니저가 직접 고객님께 연락드려 상담을 진행합니다." },
  { title: "서비스 견적", desc: "고객님의 제품 및 현장상태를 확인하고 필요한 서비스에 대한 견적만 제안드립니다." },
  { title: "매니저 책임 시공", desc: "청소청년 매니저가 직접 제품 및 현장 클린작업을 책임감 있게 시공합니다." },
  { title: "최종 확인", desc: "고객님께 서비스 전 후 모습을 직접 보여드리며, 고객님의 만족시 마무리합니다." },
];

export default async function StoryPage() {
  const banner = await getPageBanner("story");
  return (
    <>
      <PageHero
        eyebrow={banner?.eyebrow ?? "청년 스토리"}
        lead={banner?.lead ?? "청소에 청춘을 건"}
        title={banner?.title ?? ["청년들의 진심과 열정으로", "모인 인연, 청소청년"]}
        mediaType={banner?.mediaType}
        mediaUrl={banner?.mediaUrl}
      />

      <section className="mx-auto flex min-h-[700px] max-w-6xl flex-col justify-center px-4 py-14 md:px-6 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_260px]">
          <div className="space-y-5 text-[16.8px] leading-relaxed text-ink-soft md:text-[15px]">
            <p className="font-semibold text-ink">
              청결과 위생에 누구보다 철저했던 청년들이 &lsquo;청소&rsquo;라는 공통의 관심사로 모여
              지금의 &lsquo;청소청년&rsquo;이 되었습니다.
            </p>
            <p>
              단순한 취미를 넘어 고객에게 신뢰를 주는 전문가가 되기 위해, 수년간 현장 실습과 기술
              연구를 거듭하며 전문성을 쌓아왔습니다.
            </p>
            <p>
              청소의 핵심은 &lsquo;눈에 보이는 깨끗함&rsquo;을 넘어 &lsquo;보이지 않는 공간&rsquo;까지
              케어하는 디테일에 있습니다. 눈에 띄는 곳을 청소하는 것은 누구나 할 수 있지만, 보이지
              않는 곳까지 세심하게 관리하는 것이 바로 청소청년의 철학입니다.
            </p>
            <p>
              청소청년은 단순한 일회성 서비스에 그치지 않고 고객과의 지속적인 신뢰 관계를 최우선으로
              생각합니다. 고객님의 편안한 보금자리가 늘 쾌적하고 깨끗하게 유지될 수 있도록, 오늘도
              저희는 현장을 누비며 정성 어린 시공으로 보답하겠습니다.
            </p>
            <p className="pt-2 text-right font-display font-semibold text-ink">청소청년 매니저 일동</p>
          </div>
          <Image
            src="/images/mascot-arms-crossed.png"
            alt="청소청년 매니저"
            width={669}
            height={1960}
            className="mx-auto h-auto w-40 object-contain md:w-full"
          />
        </div>
      </section>

      <section className="flex min-h-[700px] flex-col justify-center bg-primary py-14 text-white md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <h2 className="text-center font-display text-[28.8px] font-bold md:text-[36px]">
            청소청년의 청소에 대한 변하지 않는 철학!
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PHILOSOPHY.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 text-ink shadow-sm">
                <h3 className="font-display text-[21.6px] font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-[16.8px] leading-relaxed text-ink-soft">{item.desc}</p>
                <Image
                  src={item.image}
                  alt=""
                  width={220}
                  height={220}
                  className="mx-auto mt-4 h-32 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex min-h-[700px] max-w-6xl flex-col justify-center px-4 py-14 md:px-6 md:py-20">
        <h2 className="text-center font-display text-[28.8px] font-bold text-ink md:text-[36px]">
          청소청년의 서비스 과정
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-[16.8px] font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-[19.2px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14.4px] leading-relaxed text-ink-soft">{step.desc}</p>
              </div>
              {i < PROCESS.length - 1 && (
                <div className="absolute right-[-12px] top-5 hidden h-px w-6 bg-secondary/40 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
